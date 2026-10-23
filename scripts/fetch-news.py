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
    ('Pharmaceutical Executive', 'https://www.pharmexec.com/rss'),
    ('BioPharma Dive', 'https://www.biopharmadive.com/feeds/news/'),
    ('Endpoints News', 'https://endpts.com/feed/'),
    ('Google News', 'https://news.google.com/rss/search?q=pharma+OR+drugmaker+(Reuters+OR+%22Financial+Times%22)+when:2d&hl=en-US&gl=US&ceid=US:en'),
    ('Pharmaceutical Technology', 'https://www.pharmaceutical-technology.com/feed/'),
    ('STAT', 'https://www.statnews.com/category/pharma/feed/'),
    ('Pharmaphorum', 'https://pharmaphorum.com/rss.xml'),
    ('Google News', 'https://news.google.com/rss/search?q=pharmaceutical+(FDA+OR+EMA+OR+acquisition+OR+shortage+OR+recall+OR+tariff)+when:2d&hl=en-US&gl=US&ceid=US:en'),
]
CHINA_FEEDS = GLOBAL_FEEDS + [
    ('Google News', 'https://news.google.com/rss/search?q=China+pharmaceutical+(API+OR+generic+OR+NMPA+OR+%22volume-based+procurement%22)+when:7d&hl=en-US&gl=US&ceid=US:en'),
    ('Google News', 'https://news.google.com/rss/search?q=China+%22active+pharmaceutical+ingredient%22+OR+%22API+manufacturer%22+OR+%22API+exports%22+when:4d&hl=en-US&gl=US&ceid=US:en'),
    ('Google News', 'https://news.google.com/rss/search?q=China+generic+drugs+(NMPA+OR+manufacturing+OR+exports+OR+procurement+OR+GMP)+when:4d&hl=en-US&gl=US&ceid=US:en'),
    ('Google News', 'https://news.google.com/rss/search?q=Chinese+pharmaceutical+(plant+OR+factory+OR+CDMO+OR+tariff+OR+%22supply+chain%22)+when:4d&hl=en-US&gl=US&ceid=US:en'),
]

CHINA_TERMS = ['china', 'chinese', 'beijing', 'shanghai', 'nmpa', 'sinopharm', 'hengrui', 'wuxi', 'beigene', 'zhejiang',
               'jiangsu', 'guangdong', 'hong kong', 'shenzhen', 'hangzhou', 'cspc', 'fosun', 'zhongshan', 'prc', 'suzhou', 'qilu', 'huadong', 'hansoh', 'innovent', 'junshi', 'akeso', 'kelun', 'shijiazhuang']
APIFDF_TERMS = [' api', 'apis', 'active pharmaceutical ingredient', 'active ingredient', 'generic', 'formulation', 'finished dosage', 'dosage form',
                'manufactur', 'plant', 'factory', 'facility', 'cdmo', 'cmo', 'biosimilar', 'supply chain', 'export', 'tariff', 'gmp', 'inspection',
                'raw material', 'intermediate', 'procurement', 'vbp', 'nmpa', 'price cut', 'production', 'capacity', 'shortage', 'quality']
GOOD = {'approv': 5, 'fda': 4, 'ema': 4, 'chmp': 4, 'mhra': 3, 'who ': 2, 'acqui': 4, 'buy': 3, 'deal': 3, 'billion': 4, 'merger': 4,
        'recall': 4, 'shortage': 5, 'warning letter': 5, 'import alert': 5, 'gmp': 4, 'inspection': 3, 'tariff': 4, 'price': 3,
        'biosimilar': 3, 'generic': 3, 'api': 3, 'launch': 3, 'phase 3': 2, 'phase iii': 2, 'supply': 3, 'manufactur': 3, 'plant': 2, 'export': 2, 'sanction': 3, 'ban': 2}
BAD = {'webinar': -10, 'sponsored': -10, 'podcast': -8, 'whitepaper': -10, 'white paper': -10, 'opinion': -3, 'job': -4, 'conference': -4, 'award': -4, 'event': -3, 'newsletter': -6,
       'pharmalittle': -12, "we're reading": -12, 'we’re reading': -12, 'roundup': -8, 'round-up': -8, 'things to know': -8, 'weekly': -5, 'digest': -8, 'stat+': -6, 'q&a': -5, 'interview': -4, 'stock': -3, 'shares': -2, 'veterinary': -8, 'animal health': -6, 'make acquisitions;': -4}


def fetch(url: str, timeout: int = 25) -> bytes:
    req = urllib.request.Request(url, headers={'User-Agent': UA, 'Accept': '*/*'})
    with urllib.request.urlopen(req, timeout=timeout) as r:
        return r.read()


def text(el, *names):
    for n in names:
        for child in el.iter():
            tag = child.tag.split('}')[-1]
            if tag == n:
                t = ''.join(child.itertext()).strip()
                if t: return t
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
            d = None
            for fmt in ('%b %d, %Y %I:%M%p', '%B %d, %Y %I:%M%p', '%b %d, %Y', '%B %d, %Y', '%Y-%m-%d %H:%M:%S'):
                try:
                    d = dt.datetime.strptime(s.strip().upper().replace('  ', ' ').title().replace('Am', 'AM').replace('Pm', 'PM'), fmt); break
                except Exception:
                    continue
            if d is None: return None
    if d.tzinfo is None: d = d.replace(tzinfo=dt.timezone.utc)
    return d.astimezone(dt.timezone.utc)


def strip_html(s: str) -> str:
    # some feeds (PharmExec) double-escape CDATA, so the wrapper arrives as literal text: keep its content
    s = re.sub(r'<!\[CDATA\[(.*?)\]\]>', r'\1', s or '', flags=re.S)
    s = re.sub(r'<[^>]+>', ' ', s)
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
                if child.tag.split('}')[-1] == 'link':
                    link = child.get('href') or (child.tail or '').strip() or ''
                    if link: break
        if not link:
            g = text(item, 'guid')
            if g.startswith('http'): link = g
        summary = strip_html(text(item, 'description', 'summary', 'content'))
        date = parse_date(text(item, 'pubDate', 'published', 'updated', 'date'))
        src = source
        gsrc = text(item, 'source')
        if 'Google News' in source and gsrc: src = gsrc
        if 'Google News' in source:
            title = re.sub(r'\s+-\s+[^-]+$', '', title)  # strip " - Publisher"
        title = re.sub(r'\s+\|\s+[^|]+$', '', title)  # strip " | Publisher"
        img = ''
        for child in item.iter():
            t = child.tag.split('}')[-1]
            if t in ('content', 'thumbnail') and child.get('url') and (child.get('medium') in (None, 'image')):
                img = child.get('url'); break
            if t == 'enclosure' and (child.get('type') or '').startswith('image/'):
                img = child.get('url'); break
        if title and link:
            items.append({'title': title, 'url': link, 'summary': summary, 'date': date, 'source': src, 'image': img})
    n_el = sum(1 for e in root.iter() if e.tag.split('}')[-1] in ('item', 'entry'))
    first = next((e for e in root.iter() if e.tag.split('}')[-1] in ('item', 'entry')), None)
    why = '' if items else (f' ({n_el} <item> elements dropped; first: {ET.tostring(first)[:300]!r})' if first is not None else f' (no <item> elements; root <{root.tag}>, {len(raw)} bytes, start {raw[:240]!r})')
    print(f'  {source}: {len(items)} items' + why)
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
        title = item['title'].lower()
        if not any(k in title for k in CHINA_TERMS): return -100
        if not any(k in t for k in APIFDF_TERMS): return -100
        if not any(k in title for k in ('pharma', 'drug', ' api', 'apis', 'generic', 'medicine', 'biosimilar', 'cdmo', 'ingredient', 'excipient', 'nmpa', 'gmp')): return -100
        s += sum(2 for k in APIFDF_TERMS if k in t)
        for k in ('biotech', 'clinical data', 'phase 1', 'phase 2', 'rna', 'licensing', 'antibody', 'oncology'):
            if k in t: s -= 3
    if item['image']: s += 1
    return s


def resolve_google(url: str) -> str:
    """Turn a news.google.com/rss/articles/... link into the publisher URL."""
    if 'news.google.com' not in url: return url
    try:
        import base64
        m = re.search(r'/articles/([^?/]+)', url)
        if not m: return url
        gid = m.group(1)
        raw = base64.urlsafe_b64decode(gid + '=' * (-len(gid) % 4))
        if not raw.startswith(b'AU_yqL'):
            # legacy format: length-prefixed url inside the protobuf
            txt = raw.decode('latin-1')
            found = re.findall(r'https?://[\x21-\x7e]+', txt)
            if found: return found[0]
        page = fetch(f'https://news.google.com/articles/{gid}', 20).decode('utf-8', 'ignore')
        sig = re.search(r'data-n-a-sg="([^"]+)"', page); ts = re.search(r'data-n-a-ts="([^"]+)"', page)
        if not (sig and ts): return url
        payload = json.dumps([[['Fbv4je', json.dumps(['garturlreq', [['X', 'X', ['X', 'X'], None, None, 1, 1, 'US:en', None, 1, None, None, None, None, None, 0, 1], 'X', 'X', 1, [1, 1, 1], 1, 1, None, 0, 0, None, 0], gid, ts.group(1), sig.group(1)]), None, 'generic']]])
        body = urllib.parse.urlencode({'f.req': payload}).encode()
        req = urllib.request.Request('https://news.google.com/_/DotsSplashUi/data/batchexecute', data=body,
                                     headers={'User-Agent': UA, 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'})
        with urllib.request.urlopen(req, timeout=20) as r:
            resp = r.read().decode('utf-8', 'ignore')
        body_txt = resp.split('\n', 2)[-1]
        try:
            outer = json.loads(body_txt)
            inner = json.loads(outer[0][2])
            return inner[1]
        except Exception:
            m2 = re.search(r'https?:\\?/\\?/[^"\\\s]+', body_txt)
            if m2 and 'google.com' not in m2.group(0): return m2.group(0).replace('\\/', '/')
            print(f'  ! google resolve: no url in response for {gid[:12]}…: {body_txt[:160]!r}', file=sys.stderr)
            return url
    except Exception as e:
        print(f'  ! google resolve: {type(e).__name__}: {e}', file=sys.stderr)
        return url


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


GENERIC = set('''a an the and or of in on for to with by from at as is are be will new over after amid into its their than more
fda ema nmpa who chmp mhra eu us usa uk china chinese india indian europe european global world drug drugs drugmaker drugmakers pharma pharmaceutical
pharmaceuticals medicine medicines generic generics biosimilar api apis cdmo cmo plant plants factory facility site manufacturing manufacturer
production capacity supply chain export exports import imports tariff tariffs price prices deal deals billion million invest invests investment
expand expands expansion approve approves approved approval launch launches phase trial data study company companies market markets report
says said year years first make makes inc ltd co corp group biotech treatment therapy patients disease cancer'''.split())


STOP = set('the and for with from into over after amid its their than more will new says said this that how why what are has have was not but'.split())


def _toks(title):
    return {w.rstrip('s') for w in re.findall(r'[a-z0-9]+', title.lower()) if len(w) > 2 and not w.isdigit() and w not in STOP}


def same_story(a, b):
    ta, tb = _toks(a), _toks(b)
    if not ta or not tb: return False
    shared = ta & tb
    distinct = {w for w in shared if w not in GENERIC and w.rstrip('s') not in GENERIC}
    return bool(distinct) and len(shared) / min(len(ta), len(tb)) >= 0.35


def pick(items, n, china=False, exclude_titles=()):
    ranked = sorted(((score(i, china), i) for i in items), key=lambda x: -x[0])
    shortlist, seen_title = [], set()
    for s, it in ranked:
        if s <= -50 or len(shortlist) >= 16: break
        key = re.sub(r'[^a-z0-9]', '', it['title'].lower())[:50]
        if key in seen_title: continue
        seen_title.add(key)
        it['url'] = resolve_google(it['url'])
        if 'news.google.com' in it['url']: continue
        if not it['image']: it['image'] = og_image(it['url'])
        shortlist.append((s + (3 if it['image'] else -6), it))
    shortlist.sort(key=lambda x: -x[0])
    out, seen_src, seen_host = [], set(), set()
    # a story with a photo always beats one without
    shortlist.sort(key=lambda x: (0 if x[1]['image'] else 1, -x[0]))
    for s, it in shortlist:
        host = urllib.parse.urlparse(it['url']).hostname or ''
        if it['source'] in seen_src or host in seen_host: continue
        if any(same_story(it['title'], o['title']) for o in out) or any(same_story(it['title'], t) for t in exclude_titles): continue
        seen_src.add(it['source']); seen_host.add(host)
        out.append(it)
        if len(out) == n: break
    return out


def main():
    import os
    tehran_today = (NOW + dt.timedelta(hours=3, minutes=30)).strftime('%Y-%m-%d')
    if OUT_JSON.exists() and os.environ.get('FORCE') != '1':
        try:
            upd = dt.datetime.fromisoformat(json.load(open(OUT_JSON))['updated'].replace('Z', '+00:00'))
            if (upd + dt.timedelta(hours=3, minutes=30)).strftime('%Y-%m-%d') == tehran_today:
                print(f'digest already updated today ({tehran_today}, Tehran); nothing to do')
                return 0
        except Exception: pass
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
    world = pick([i for i in g_items if i['url'] not in china_urls], 3, exclude_titles=[i['title'] for i in china])

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
            source = it['source']
            if source in ('Google News', '') : source = (urllib.parse.urlparse(it['url']).hostname or '').replace('www.', '')
            done.append({
                'title': it['title'], 'url': it['url'], 'source': source,
                'date': it['date'].strftime('%Y-%m-%d') if it['date'] else NOW.strftime('%Y-%m-%d'),
                'summary': (it['summary'][:280] + ('…' if len(it['summary']) > 280 else '')) if it['summary'] else '',
                'image': image,
            })
        return done

    data = {'updated': NOW.strftime('%Y-%m-%dT%H:%M:%SZ'), 'global': finish(world, 'g'), 'china': finish(china, 'c')}
    # thin day: keep the freshest earlier stories (up to 7 days old, with photo) so each section stays at 3
    try:
        old = json.load(open(OUT_JSON)) if OUT_JSON.exists() else {}
    except Exception: old = {}
    for sec in ('global', 'china'):
        for it in old.get(sec, []):
            if len(data[sec]) >= 3: break
            fresh = (NOW.date() - dt.date.fromisoformat(it['date'])).days <= 7
            if fresh and it.get('image') and all(it['url'] != o['url'] and not same_story(it['title'], o['title']) for s2 in ('global', 'china') for o in data[s2]):
                data[sec].append(it)
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
