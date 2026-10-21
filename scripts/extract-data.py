#!/usr/bin/env python3
"""Deterministically extract Hanpars audit data without evaluating source JavaScript.

Inputs are local, untrusted HTML/JavaScript literals.  This program uses
BeautifulSoup for HTML and a deliberately narrow literal parser for the JS
arrays; it never invokes a JS runtime or evaluates a source expression.
"""
from __future__ import annotations

import hashlib
import json
import re
import sys
from collections import Counter
from pathlib import Path
from typing import Any

from bs4 import BeautifulSoup

PROJECT_ROOT = Path(__file__).resolve().parents[1]
AUDIT_ROOT = Path("/home/ubuntu/hanpars-rebuild/audit")
OUTPUT_ROOT = PROJECT_ROOT / "src" / "data"

FDF_SOURCE = AUDIT_ROOT / "fdf-source.html"
API_SOURCE = AUDIT_ROOT / "api-iframe-0.html"
BLOG_SOURCES = [
    AUDIT_ROOT / "blog-iframe-1.html",
    AUDIT_ROOT / "blog-iframe-2.html",
]


class LiteralParseError(ValueError):
    """A source value was not in the limited, non-executing literal grammar."""


class JavaScriptLiteralParser:
    """Parse only strings, template literals without interpolation, arrays and objects.

    The accepted grammar is intentionally smaller than JavaScript.  Any
    expression, template interpolation, spread, function call, or computed
    property fails instead of being executed or guessed.
    """

    def __init__(self, source: str, position: int = 0) -> None:
        self.source = source
        self.pos = position

    def error(self, message: str) -> LiteralParseError:
        return LiteralParseError(f"{message} at character {self.pos}")

    def skip_trivia(self) -> None:
        while self.pos < len(self.source):
            if self.source[self.pos].isspace():
                self.pos += 1
                continue
            if self.source.startswith("//", self.pos):
                line_end = self.source.find("\n", self.pos + 2)
                self.pos = len(self.source) if line_end == -1 else line_end + 1
                continue
            if self.source.startswith("/*", self.pos):
                end = self.source.find("*/", self.pos + 2)
                if end == -1:
                    raise self.error("Unterminated block comment")
                self.pos = end + 2
                continue
            return

    def expect(self, value: str) -> None:
        self.skip_trivia()
        if not self.source.startswith(value, self.pos):
            raise self.error(f"Expected {value!r}")
        self.pos += len(value)

    def parse_identifier(self) -> str:
        self.skip_trivia()
        match = re.match(r"[A-Za-z_$][A-Za-z0-9_$]*", self.source[self.pos :])
        if not match:
            raise self.error("Expected identifier")
        self.pos += len(match.group(0))
        return match.group(0)

    def parse_escape(self) -> str:
        """Decode one JavaScript string escape after its backslash."""
        if self.pos >= len(self.source):
            raise self.error("Unterminated escape")
        char = self.source[self.pos]
        self.pos += 1
        simple = {
            "b": "\b",
            "f": "\f",
            "n": "\n",
            "r": "\r",
            "t": "\t",
            "v": "\v",
            "0": "\0",
        }
        if char in simple:
            return simple[char]
        if char == "\n":
            return ""
        if char == "\r":
            if self.pos < len(self.source) and self.source[self.pos] == "\n":
                self.pos += 1
            return ""
        if char == "x":
            digits = self.source[self.pos : self.pos + 2]
            if len(digits) != 2 or not re.fullmatch(r"[0-9A-Fa-f]{2}", digits):
                raise self.error("Invalid hexadecimal escape")
            self.pos += 2
            return chr(int(digits, 16))
        if char == "u":
            if self.pos < len(self.source) and self.source[self.pos] == "{":
                end = self.source.find("}", self.pos + 1)
                if end == -1:
                    raise self.error("Unterminated Unicode code-point escape")
                digits = self.source[self.pos + 1 : end]
                if not digits or not re.fullmatch(r"[0-9A-Fa-f]+", digits):
                    raise self.error("Invalid Unicode code-point escape")
                codepoint = int(digits, 16)
                if codepoint > 0x10FFFF:
                    raise self.error("Unicode code point out of range")
                self.pos = end + 1
                return chr(codepoint)
            digits = self.source[self.pos : self.pos + 4]
            if len(digits) != 4 or not re.fullmatch(r"[0-9A-Fa-f]{4}", digits):
                raise self.error("Invalid Unicode escape")
            self.pos += 4
            return chr(int(digits, 16))
        # In non-strict JavaScript, an unrecognised escaped character is that
        # character.  The audit literals are read, not evaluated.
        return char

    def parse_string(self) -> str:
        self.skip_trivia()
        if self.pos >= len(self.source) or self.source[self.pos] not in "'\"`":
            raise self.error("Expected a string literal")
        delimiter = self.source[self.pos]
        self.pos += 1
        parts: list[str] = []
        while self.pos < len(self.source):
            char = self.source[self.pos]
            self.pos += 1
            if char == delimiter:
                return "".join(parts)
            if char == "\\":
                parts.append(self.parse_escape())
                continue
            if char == "\n" and delimiter != "`":
                raise self.error("Unescaped newline in string literal")
            if delimiter == "`" and char == "$" and self.pos < len(self.source) and self.source[self.pos] == "{":
                raise self.error("Template interpolation is not accepted")
            parts.append(char)
        raise self.error("Unterminated string literal")

    def parse_value(self) -> str:
        # Article and API data are deliberately constrained to string values.
        return self.parse_string()

    def parse_array_of_strings(self) -> list[str]:
        self.expect("[")
        values: list[str] = []
        self.skip_trivia()
        if self.pos < len(self.source) and self.source[self.pos] == "]":
            self.pos += 1
            return values
        while True:
            values.append(self.parse_string())
            self.skip_trivia()
            if self.pos < len(self.source) and self.source[self.pos] == "]":
                self.pos += 1
                return values
            self.expect(",")
            self.skip_trivia()
            if self.pos < len(self.source) and self.source[self.pos] == "]":
                self.pos += 1
                return values

    def parse_object(self) -> dict[str, str]:
        self.expect("{")
        result: dict[str, str] = {}
        self.skip_trivia()
        if self.pos < len(self.source) and self.source[self.pos] == "}":
            self.pos += 1
            return result
        while True:
            self.skip_trivia()
            key = self.parse_string() if self.pos < len(self.source) and self.source[self.pos] in "'\"" else self.parse_identifier()
            self.expect(":")
            if key in result:
                raise self.error(f"Duplicate object key {key!r}")
            result[key] = self.parse_value()
            self.skip_trivia()
            if self.pos < len(self.source) and self.source[self.pos] == "}":
                self.pos += 1
                return result
            self.expect(",")
            self.skip_trivia()
            if self.pos < len(self.source) and self.source[self.pos] == "}":
                self.pos += 1
                return result

    def parse_array_of_objects(self) -> list[dict[str, str]]:
        self.expect("[")
        values: list[dict[str, str]] = []
        self.skip_trivia()
        if self.pos < len(self.source) and self.source[self.pos] == "]":
            self.pos += 1
            return values
        while True:
            values.append(self.parse_object())
            self.skip_trivia()
            if self.pos < len(self.source) and self.source[self.pos] == "]":
                self.pos += 1
                return values
            self.expect(",")
            self.skip_trivia()
            if self.pos < len(self.source) and self.source[self.pos] == "]":
                self.pos += 1
                return values


def source_hash(path: Path) -> dict[str, Any]:
    payload = path.read_bytes()
    return {
        "path": str(path),
        "bytes": len(payload),
        "sha256": hashlib.sha256(payload).hexdigest(),
    }


def parser_at_declaration(source: str, declaration: str) -> JavaScriptLiteralParser:
    match = re.search(rf"\bconst\s+{re.escape(declaration)}\s*=", source)
    if not match:
        raise LiteralParseError(f"Could not find const declaration for {declaration!r}")
    position = source.find("[", match.end())
    if position == -1:
        raise LiteralParseError(f"Could not find array literal for {declaration!r}")
    return JavaScriptLiteralParser(source, position)


def extract_fdf(path: Path) -> list[dict[str, str]]:
    outer = BeautifulSoup(path.read_text(encoding="utf-8"), "html.parser")
    iframe = outer.find("iframe", id="iframe-0145679") or outer.find("iframe", attrs={"srcdoc": True})
    if iframe is None or not iframe.get("srcdoc"):
        raise ValueError("FDF source has no iframe srcdoc catalogue")
    inner = BeautifulSoup(str(iframe.get("srcdoc")), "html.parser")
    table = inner.find("table", id="innTable")
    if table is None:
        raise ValueError("FDF srcdoc has no #innTable")
    rows: list[dict[str, str]] = []
    for row_number, tr in enumerate(table.select("tbody > tr"), start=1):
        cells = tr.find_all("td", recursive=False)
        if len(cells) != 2:
            raise ValueError(f"FDF row {row_number} has {len(cells)} cells, expected 2")
        # The cells are data, not free-form prose. Fail closed if a source value
        # has leading/trailing characters that would otherwise be "corrected".
        name = cells[0].get_text()
        code = cells[1].get_text()
        if name != name.strip() or code != code.strip():
            raise ValueError(f"FDF row {row_number} has boundary whitespace; refusing to alter source text")
        if not name or not code:
            raise ValueError(f"FDF row {row_number} contains an empty name or code")
        rows.append({"name": name, "code": code})
    return rows


def extract_apis(path: Path) -> list[str]:
    parser = parser_at_declaration(path.read_text(encoding="utf-8"), "allPharmaSubstances")
    values = parser.parse_array_of_strings()
    if any(not isinstance(value, str) for value in values):
        raise ValueError("API source array contains a non-string value")
    return values


def sanitize_article_html(markup: str) -> tuple[str, dict[str, int]]:
    """Remove active/structural content while preserving article prose and markup."""
    soup = BeautifulSoup(markup, "html.parser")
    counts: Counter[str] = Counter()
    for tag_name in ("script", "style", "nav", "iframe"):
        for tag in soup.find_all(tag_name):
            tag.decompose()
            counts[f"removed_{tag_name}"] += 1
    # A form wrapper is removed while its article children/prose are retained.
    for tag in soup.find_all("form"):
        tag.unwrap()
        counts["unwrapped_form"] += 1
    for tag in soup.find_all(True):
        for attribute in list(tag.attrs):
            lower = attribute.lower()
            value = tag.attrs.get(attribute)
            if lower.startswith("on"):
                del tag.attrs[attribute]
                counts["removed_event_attributes"] += 1
            elif lower in {"href", "src", "action", "formaction"} and isinstance(value, str) and re.match(r"^\s*(?:javascript|vbscript):", value, re.I):
                del tag.attrs[attribute]
                counts["removed_unsafe_uri_attributes"] += 1
    return soup.decode_contents(), dict(sorted(counts.items()))


def deterministic_slug(title: str, date: str, seen: set[str]) -> str:
    # Keep the source title untouched; only its separate URL-safe identifier is normalised.
    base = re.sub(r"[^a-z0-9]+", "-", title.casefold()).strip("-") or "article"
    slug = base
    if slug in seen:
        slug = f"{base}-{hashlib.sha256((title + chr(0) + date).encode('utf-8')).hexdigest()[:8]}"
    suffix = 2
    while slug in seen:
        slug = f"{base}-{suffix}"
        suffix += 1
    seen.add(slug)
    return slug


def extract_articles(paths: list[Path]) -> tuple[list[dict[str, str]], dict[str, Any]]:
    source_records: list[tuple[Path, int, dict[str, str]]] = []
    raw_count_by_source: dict[str, int] = {}
    for path in paths:
        parser = parser_at_declaration(path.read_text(encoding="utf-8"), "blogPosts")
        posts = parser.parse_array_of_objects()
        raw_count_by_source[str(path)] = len(posts)
        for index, post in enumerate(posts, start=1):
            source_records.append((path, index, post))

    articles: list[dict[str, str]] = []
    seen_title_date: dict[tuple[str, str], dict[str, Any]] = {}
    seen_slugs: set[str] = set()
    duplicates: list[dict[str, Any]] = []
    sanitizer_totals: Counter[str] = Counter()
    missing_category: list[dict[str, Any]] = []
    omitted_full_image: list[dict[str, Any]] = []
    required = {"title", "date", "content"}

    for path, index, post in source_records:
        absent = sorted(required - set(post))
        if absent:
            raise ValueError(f"Article {path.name} #{index} is missing required field(s): {', '.join(absent)}")
        title = post["title"]
        date = post["date"]
        dedupe_key = (title, date)
        if dedupe_key in seen_title_date:
            kept = seen_title_date[dedupe_key]
            duplicates.append(
                {
                    "discarded": {"source": str(path), "sourceIndex": index},
                    "kept": kept,
                    "match": {"title": title, "date": date},
                }
            )
            continue
        category = post.get("category")
        if category is None or category == "":
            category = "Pharmaceutical insights"
            missing_category.append({"source": str(path), "sourceIndex": index, "title": title, "date": date})
        content, sanitizer_counts = sanitize_article_html(post["content"])
        sanitizer_totals.update(sanitizer_counts)
        if "fullImage" in post:
            omitted_full_image.append({"source": str(path), "sourceIndex": index, "title": title, "date": date})
        article = {
            "slug": deterministic_slug(title, date, seen_slugs),
            "title": title,
            "date": date,
            "category": category,
            "excerpt": post.get("excerpt", ""),
            "content": content,
            "image": post.get("image", ""),
        }
        seen_title_date[dedupe_key] = {"source": str(path), "sourceIndex": index, "slug": article["slug"]}
        articles.append(article)

    metadata = {
        "sourceArticleCounts": raw_count_by_source,
        "sourceArticleCount": len(source_records),
        "deduplicatedArticleCount": len(articles),
        "duplicatesRemovedByExactTitleAndDate": duplicates,
        "categoriesDefaulted": missing_category,
        "sanitizerRemovals": dict(sorted(sanitizer_totals.items())),
        "recordsWithFullImageNotRepresentedBySchema": omitted_full_image,
    }
    return articles, metadata


def write_json(path: Path, value: Any) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    temporary = path.with_suffix(path.suffix + ".tmp")
    temporary.write_text(json.dumps(value, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    temporary.replace(path)


def main() -> int:
    required_paths = [FDF_SOURCE, API_SOURCE, *BLOG_SOURCES]
    missing = [str(path) for path in required_paths if not path.is_file()]
    if missing:
        raise FileNotFoundError("Missing input source(s): " + ", ".join(missing))

    fdf = extract_fdf(FDF_SOURCE)
    apis = extract_apis(API_SOURCE)
    articles, article_metadata = extract_articles(BLOG_SOURCES)

    expected_counts = {"fdfRows": 433, "apiOriginalStrings": 1503}
    actual_counts = {"fdfRows": len(fdf), "apiOriginalStrings": len(apis)}
    discrepancies: list[dict[str, Any]] = []
    for label, expected in expected_counts.items():
        actual = actual_counts[label]
        if actual != expected:
            discrepancies.append({"type": "count_mismatch", "dataset": label, "expected": expected, "actual": actual})
    if article_metadata["duplicatesRemovedByExactTitleAndDate"]:
        discrepancies.append({
            "type": "article_duplicates_removed",
            "count": len(article_metadata["duplicatesRemovedByExactTitleAndDate"]),
            "details": article_metadata["duplicatesRemovedByExactTitleAndDate"],
        })
    if article_metadata["categoriesDefaulted"]:
        discrepancies.append({
            "type": "missing_article_categories_defaulted",
            "default": "Pharmaceutical insights",
            "details": article_metadata["categoriesDefaulted"],
        })
    if article_metadata["sanitizerRemovals"]:
        discrepancies.append({
            "type": "article_content_sanitizer_removals",
            "details": article_metadata["sanitizerRemovals"],
        })
    if article_metadata["recordsWithFullImageNotRepresentedBySchema"]:
        discrepancies.append({
            "type": "article_fullImage_source_field_not_represented",
            "resolution": "The required schema permits only image; image retains the original image field. fullImage remains in the local audit source.",
            "details": article_metadata["recordsWithFullImageNotRepresentedBySchema"],
        })

    write_json(OUTPUT_ROOT / "fdf.json", fdf)
    write_json(OUTPUT_ROOT / "apis.json", apis)
    write_json(OUTPUT_ROOT / "articles.json", articles)
    report = {
        "extractor": {
            "path": str(Path(__file__).resolve()),
            "method": "BeautifulSoup HTML parsing plus a narrow non-executing JavaScript literal parser",
            "sourceExecution": "none",
        },
        "sourceProvenance": [source_hash(path) for path in required_paths],
        "originalArticleSources": {
            "paths": [str(path) for path in BLOG_SOURCES],
            "preservation": "Sources remain at the listed local audit paths; no duplicate large source copies were created in the public application tree.",
        },
        "outputDatasets": {
            "fdf": {"path": str(OUTPUT_ROOT / "fdf.json"), "shape": "Array<{name: string, code: string}>", "count": len(fdf)},
            "apis": {"path": str(OUTPUT_ROOT / "apis.json"), "shape": "string[]", "count": len(apis)},
            "articles": {"path": str(OUTPUT_ROOT / "articles.json"), "shape": "Array<{slug: string, title: string, date: string, category: string, excerpt: string, content: string, image: string}>", "count": len(articles)},
        },
        "expectedCounts": expected_counts,
        "actualCounts": {**actual_counts, "articles": len(articles)},
        "articleExtraction": article_metadata,
        "discrepancies": discrepancies,
    }
    write_json(OUTPUT_ROOT / "extraction-report.json", report)

    if discrepancies and any(item["type"] == "count_mismatch" for item in discrepancies):
        print(json.dumps(report["actualCounts"], sort_keys=True), file=sys.stderr)
        return 2
    print(json.dumps(report["actualCounts"], sort_keys=True))
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except Exception as exc:  # Fail closed rather than emitting guessed data.
        print(f"Extraction failed: {exc}", file=sys.stderr)
        raise SystemExit(1)
