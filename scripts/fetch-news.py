#!/usr/bin/env python3
"""Daily pharma news digest for the Hanpars website.

Reads public RSS feeds, scores recent stories, and writes
  src/data/news.json        – 3 global pharma stories + 3 China API/FDF stories
  public/news/<slug>.jpg    – the story's own preview image (og:image), resized
Run by .github/workflows/news.yml every morning; no API keys needed.
Only the Python standard library + Pillow (for image resizing) are used.
"""
from __future__ import annotations
import json, re, html, hashlib, io, sys, time, datetime as dt, urllib.request, urllib.parse, urllib.error
import xml.etree.ElementTree as ET
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT_JSON = ROOT / 'src/data/news.json'
IMG_DIR = ROOT / 'public/news'
UA = 'Mozilla/5.0 (compatible; HanparsNewsBot/1.0; +https://hanpars.com)'
NOW = dt.datetime.now(dt.timezone.utc)
MAX_AGE_DAYS = 4

GLOBAL_FEEDS = [
    ('Fierce Pharma', 'https://www.fiercepharma.com/rss/xml'),
    ('BioPharma Dive', 'https://www.biopharmadive.com/feeds/news/'),
    ('Endpoints News', 'https://endpts.com/feed/'),
    ('European Pharmaceutical Review', 'https://www.europeanpharmaceuticalreview.com/feed/'),
    ('Pharmaceutical Technology', 'https://www.pharmaceutical-technology.com/feed/'),
    ('STAT', 'https://www.statnews.com/category/pharma/feed/'),
    ('Pharmaphorum', 'https://pharmaphorum.com/feed'),
    ('Reuters via Google News', 'https://news.google.com/rss/search?q=pharmaceutical+when:2d+site:reuters.com&hl=en-US&gl=US&ceid=US:en'),
]
CHINA_FEEDS = GLOBAL_FEEDS + [
    ('BioSpectrum Asia', 'https://www.biospectrumasia.com/rss'),
    ('Google News', 'https://news.google.com/rss/search?q=China+(API+OR+%22active+pharmaceutical+ingredient%22+OR+generic+OR+%22finished+dosage%22+OR+pharmaceutical+manufacturing)+when:3d&hl=en-US&gl=US&ceid=US:en'),
]

CHINA_TERMS = ['china', 'chinese', 'beijing', 'shanghai', 'nmpa', 'sinopharm', 'hengrui', 'wuxi', 'beigene', 'zhejiang',
               'jiangsu', 'guangdong', 'hong kong', 'shenzhen', 'hangzhou', 'cspc', 'fosun', 'zhongshan', 'prc', 'suzhou', 'qilu', 'huadong', 'hansoh', 'innovent', 'junshi', 'akeso', 'kelun', 'shijiazhuang']
APIFDF_TERMS = ['api', 'active pharmaceutical ingredient', 'active ingredient', 'generic', 'generics', 'formulation', 'finished dosage',
                'manufactur', 'plant', 'facility', 'cdmo', 'cmo', 'biosimilar', 'supply', 'export', 'tariff', 'gmp', 'quality', 'raw material', 'intermediate', 'drug', 'pharma']
GOOD = {'approv': 5, 'fda': 4, 'ema': 4, 'chmp': 4, 'mhra': 3, 'who ': 2, 'acqui': 4, 'buy': 3, 'deal': 3, 'billion': 4, 'merger': 4,
        'recall': 4, 'shortage': 5, 'warning letter': 5, 'import alert': 5, 'gmp': 4, 'inspection': 3, 'tariff': 4, 'price': 3,
        'biosimilar': 3, 'generic': 3, 'api': 3, 'launch': 3, 'phase 3': 2, 'phase iii': 2, 'supply': 3, 'manufactur': 3, 'plant': 2, 'export': 2, 'sanction': 3, 'ban': 2}
BAD = {'webinar': -10, 'sponsored': -10, 'podcast': -8, 'whitepaper': -10, 'white paper': -10, 'opinion': -3, 'job': -4, 'conference': -4, 'award': -4, 'event': -3, 'newsletter': -6}


def fetch(url: str, timeout: int = 25) -> bytes:
    req = urllib.request.Request(url, headers={'User-Agent': UA, 'Accept': '*/*'})
    with urllib.request.urlopen(req, timeout=timeout) as r:
        return r.read()


def text(el, *names):
    for n in names:
        for child in el.iter():
            tag = child.tag.split('}')[-1]
            if tag == n and (child.text or '').strip():
                return child.text.strip()
    return ''


def parse_date(s: str):
    if not s: return None
    from email.utils import parsedate_to_datetime
    try:
        d = parsedate_to_datetime(s)
    except Exception:
        try:
            d = dt.datetime.fromisoformat(s.replace('Z', '+00:00'))
        except Exception:
            return None
    if d.tzinfo is None: d = d.replace(tzinfo=dt.timezone.utc)
    return d.astimezone(dt.timezone.utc)


def strip_html(s: str) -> str:
    s = re.sub(r'<[^>]+>', ' ', s or '')
    s = html.unescape(s)
    return re.sub(r'\s+', ' ', s).strip()


def parse_feed(source: str, url: str):
    try:
        raw = fetch(url)
        root = ET.fromstring(raw)
    except Exception as e:
        print(f'  ! {source}: {e}', file=sys.stderr)
        return []
    items = []
    for item in root.iter():
        tag = item.tag.split('}')[-1]
        if tag not in ('item', 'entry'): continue
        title = strip_html(text(item, 'title'))
        link = text(item, 'link')
        if not link:
            for child in item:
                if child.tag.split('}')[-1] == 'link': link = child.get('href') or ''
        summary = strip_html(text(item, 'description', 'summary', 'content'))
        date = parse_date(text(item, 'pubDate', 'published', 'updated', 'date'))
        src = source
        gsrc = text(item, 'source')
        if 'Google News' in source and gsrc: src = gsrc
        if 'Google News' in source:
            title = re.sub(r'\s+-\s+[^-]+$', '', title)  # strip " - Publisher"
        img = ''
        for child in item.iter():
            t = child.tag.split('}')[-1]
            if t in ('content', 'thumbnail') and child.get('url') and (child.get('medium') in (None, 'image')):
                img = child.get('url'); break
            if t == 'enclosure' and (child.get('type') or '').startswith('image/'):
                img = child.get('url'); break
        if title and link:
            items.append({'title': title, 'url': link, 'summary': summary, 'date': date, 'source': src, 'image': img})
    print(f'  {source}: {len(items)} items')
    return items


def score(item, china=False):
    t = (item['title'] + ' ' + item['summary'][:300]).lower()
    s = 0.0
    for k, v in GOOD.items():
        if k in t: s += v
    for k, v in BAD.items():
        if k in t: s += v
    if item['date']:
        age = (NOW - item['date']).total_seconds() / 86400
        if age > MAX_AGE_DAYS: return -100
        s += max(0, 6 - 2 * age)
    else:
        s -= 2
    if china:
        if not any(k in t for k in CHINA_TERMS): return -100
        if not any(k in t for k in APIFDF_TERMS): s -= 4
        s += 3
    if item['image']: s += 1
    return s


def og_image(url: str) -> str:
    try:
        raw = fetch(url, 20)[:400_000].decode('utf-8', 'ignore')
    except Exception:
        return ''
    m = re.search(r'<meta[^>]+property=["\']og:image(?::secure_url)?["\'][^>]+content=["\']([^"\']+)', raw, re.I) or \
        re.search(r'<meta[^>]+content=["\']([^"\']+)["\'][^>]+property=["\']og:image', raw, re.I) or \
        re.search(r'<meta[^>]+name=["\']twitter:image["\'][^>]+content=["\']([^"\']+)', raw, re.I)
    return html.unescape(m.group(1)) if m else ''


def save_image(url: str, slug: str) -> str:
    if not url: return ''
    try:
        from PIL import Image
        data = fetch(url, 25)
        im = Image.open(io.BytesIO(data)).convert('RGB')
        im.thumbnail((1200, 1200))
        w, h = im.size
        target = 16 / 10
        if w / h > target:
            nw = int(h * target); im = im.crop(((w - nw) // 2, 0, (w - nw) // 2 + nw, h))
        else:
            nh = int(w / target); im = im.crop((0, (h - nh) // 2, w, (h - nh) // 2 + nh))
        IMG_DIR.mkdir(parents=True, exist_ok=True)
        out = IMG_DIR / f'{slug}.jpg'
        im.save(out, 'JPEG', quality=78, optimize=True)
        return f'/news/{slug}.jpg'
    except Exception as e:
        print(f'  ! image {url[:80]}: {e}', file=sys.stderr)
        return ''


def pick(items, n, china=False):
    ranked = sorted(((score(i, china), i) for i in items), key=lambda x: -x[0])
    out, seen_src, seen_title = [], set(), set()
    for s, it in ranked:
        if s <= -50: break
        key = re.sub(r'[^a-z0-9]', '', it['title'].lower())[:50]
        if key in seen_title or it['source'] in seen_src: continue
        seen_title.add(key); seen_src.add(it['source'])
        out.append(it)
        if len(out) == n: break
    return out


def main():
    print('global feeds')
    g_items = [i for s, u in GLOBAL_FEEDS for i in parse_feed(s, u)]
    print('china feeds')
    c_items = [i for s, u in CHINA_FEEDS for i in parse_feed(s, u)]
    # de-duplicate by url
    def dedupe(items):
        seen, out = set(), []
        for i in items:
            if i['url'] in seen: continue
            seen.add(i['url']); out.append(i)
        return out
    g_items, c_items = dedupe(g_items), dedupe(c_items)
    china = pick(c_items, 3, china=True)
    china_urls = {i['url'] for i in china}
    world = pick([i for i in g_items if i['url'] not in china_urls], 3)

    previous = {}
    if OUT_JSON.exists():
        try:
            for sec in ('global', 'china'):
                for it in json.load(open(OUT_JSON)).get(sec, []): previous[it['url']] = it
        except Exception: pass

    def finish(items, prefix):
        done = []
        for k, it in enumerate(items):
            slug = f"{prefix}-{hashlib.sha1(it['url'].encode()).hexdigest()[:10]}"
            prev = previous.get(it['url'])
            image = prev['image'] if prev and prev.get('image') and (ROOT / 'public' / prev['image'].lstrip('/')).exists() else ''
            if not image:
                image = save_image(it['image'] or og_image(it['url']), slug)
            done.append({
                'title': it['title'], 'url': it['url'], 'source': it['source'],
                'date': it['date'].strftime('%Y-%m-%d') if it['date'] else NOW.strftime('%Y-%m-%d'),
                'summary': (it['summary'][:280] + ('…' if len(it['summary']) > 280 else '')) if it['summary'] else '',
                'image': image,
            })
        return done

    data = {'updated': NOW.strftime('%Y-%m-%dT%H:%M:%SZ'), 'global': finish(world, 'g'), 'china': finish(china, 'c')}
    if not data['global'] and not data['china']:
        print('nothing fetched; keeping previous file', file=sys.stderr)
        return 0
    # tidy image folder: keep only referenced images
    keep = {ROOT / 'public' / it['image'].lstrip('/') for sec in ('global', 'china') for it in data[sec] if it['image']}
    if IMG_DIR.exists():
        for f in IMG_DIR.glob('*.jpg'):
            if f not in keep: f.unlink()
    OUT_JSON.write_text(json.dumps(data, ensure_ascii=False, indent=1) + '\n', encoding='utf-8')
    for sec in ('global', 'china'):
        print(sec)
        for it in data[sec]: print('  -', it['source'], '|', it['title'][:70], '|', 'img' if it['image'] else 'no image')
    return 0


if __name__ == '__main__':
    sys.exit(main())
