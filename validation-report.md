# Hanpars static review — focused implementation validation

**Scope:** Read-only source, existing validation logs, and `dist` inspection. No browser use, external research/refetch, original-source HTML inspection, edits to app code, asset polling, rebuild, typecheck, or publish/migration activity.

## Result

**Status: needs correction before review sign-off — 1 medium and 1 low implementation issue.** The static review-site architecture is otherwise consistent with the approved no-backend/no-publish scope.

| Severity | Finding | Evidence |
|---|---|---|
| **Medium** | **12 of 20 archived insight records have an empty `excerpt`.** This makes 12 archive cards render an empty summary and produces empty standard, Open Graph, and Twitter descriptions on their corresponding detail pages. The detail route directly supplies `article.excerpt.slice(0,155)` as the description, while the shared layout emits that value in all three metadata fields. | `src/data/articles.json:79,88,97,106,115,124,133,142,151,160,169,178`; `src/components/InsightCard.astro:9`; `src/pages/insights/[slug].astro:16`; `src/layouts/Layout.astro:13,18,23`. Each affected generated detail page has `<meta name="description" content>` in `dist/insights/*/index.html` (12 pages). |
| **Low** | **`/` and `/home` have duplicate title and meta-description values.** Both pages instantiate the same default `Layout` metadata, so metadata is not unique per emitted route. This is limited to the intentional duplicate home content, but does not meet the stated unique-meta check. | `src/pages/index.astro:5`, `src/pages/home.astro:5`, `src/layouts/Layout.astro:6`; identical metadata in `dist/index.html:1` and `dist/home/index.html:1`. |

## Verified implementation evidence

- **Static review site / no backend:** `astro.config.mjs` sets `output: 'static'`; the existing build log reports static output to `dist`. Source inspection found no application `fetch`, XHR, API client, storage, form action, or form method. Contact and newsletter handoffs explicitly target the existing `hanpars.com` channels (`src/data/site.ts:3-4`). No migration/publish mechanism was found.
- **Existing logs:** `/tmp/hanpars-check.log` records **0 errors, 0 warnings, 0 hints**. `/tmp/hanpars-build.log` records a successful static build of **34 HTML files**.
- **Routes:** `dist` contains **33 manifest routes** (the root, all 12 retained original paths including `/home`, and 20 insight details) plus `404.html`; all manifest paths map to generated output. The 20 dated detail routes are present.
- **Dataset preservation:** application JSON and generated catalogue rows both verify **433 FDF**, **1,503 API**, and **20 articles**. `regulatory.json` structure verifies **6 services, 4 stages, 5 markets, 4 audiences, 4 FAQs**. Exact source-text comparison was deliberately not performed under scope.
- **Static HTML and navigation:** every generated HTML file, including 404, has exactly **one H1**. All titles are present; apart from the root/home duplicate above, titles are unique. Parsed internal links: **0 broken**; fragment targets/nonexistent anchors: **0**. `public/manus-routes.json` and `dist/manus-routes.json` agree.
- **Catalogue behavior:** both catalogues render all rows statically. `src/scripts/site.ts:65-102` filters against each row’s search data, resets to page 1 after filtering, renders 25 rows per page, controls next/previous disabled state, updates an `aria-live` status, and handles empty results. The table’s scroll region contains horizontal overflow (`src/styles/global.css:216`), so the wide catalogue is contained.
- **Enquiry workflow:** this is a local brief generator, not a submitted contact form: submit is prevented (`src/scripts/site.ts:152-173`); copy and text-download are local (`:175-192`); catalogue product query parameters prefill the brief (`:149-150`); visible copy says nothing is sent (`src/components/ContactPage.astro:8,20,22`). It then hands users to the existing contact channel.
- **Accessibility/mobile by code inspection:** menu state has `aria-expanded`, Escape handling, and mobile overflow containment (`src/components/Header.astro:11-21`, `src/scripts/site.ts:1-29`, `src/styles/global.css:283-284`); guide/enquiry tabs support ARIA selection and arrow/Home/End keys (`src/scripts/site.ts:31-63,118-148`); FAQs use native `details/summary` (`src/components/RegulatoryPage.astro:11`). Responsive grid breakpoints collapse at 900/640px and current article content contains no tables. No material horizontal-overflow risk found in the reviewed code.
- **Claims and unfinished copy:** focused application-copy scan found no TBC/TODO/lorem/coming-soon placeholder copy and no affirmative invented certification, factory/plant ownership, or financial-commitment claim. CDMO and catalogue copy expressly qualify the role and avoid availability guarantees (`src/data/pages.ts:75`; `src/components/Catalogue.astro:14`).
- **Managed images:** only the two supplied managed async paths are referenced (`src/data/site.ts:1-2`). They were intentionally not polled or otherwise validated.

## Blockers / constraints

1. **Owner input — final-release blocker, not an implementation bug:** publishable financial obligations/commitments are still required, as recorded in `TODO.md:11` and `plan.md:42,80-82`. No financial policy or placeholder was invented, and none is proposed here.
2. **Pre-review correction:** populate the 12 preserved article excerpts (or derive a safe text summary from their already-preserved article content) so archive cards and detail metadata are complete. This does not require new capability claims.
3. **Managed async images:** availability remains unverified by instruction; this is an explicit untested dependency, not a failure recorded by this validation.

## Parent resolution — 21 October 2026

The medium excerpt issue is resolved by src/data/text.ts: missing display excerpts are derived from the first preserved article paragraph; the original dataset is unchanged. Archive cards and article metadata use this helper. All 33 content routes have nonempty description/OG/Twitter descriptions and unique titles. The /home alias now has distinct descriptive metadata. Clean Astro check and static output/data/link checks passed after these corrections. Contact brief preparation is disabled until JS handlers are active to prevent default form transmission; no external submission occurred. No migration or publication. Financial-commitment input remains outstanding.
