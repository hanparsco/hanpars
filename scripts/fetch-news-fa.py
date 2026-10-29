#!/usr/bin/env python3
"""Persian pharma news for the Persian pages of the Hanpars website.

Reads the public RSS feeds of Persian pharma news sites, keeps the newest newsworthy items and writes
  src/data/news-fa.json     – {updated, items:[{title,url,source,date,summary,image,category}]}
  public/news/fa-<hash>.jpg – the story's own preview image, resized
Run by .github/workflows/news-fa.yml every four hours; standard library + Pillow only.

Sources are tried in order; a source that cannot be reached (an Iranian host that only answers
Iranian IP addresses, say) is skipped and reported in the log, and the others are used.
"""
from __future__ import annotations
import json, re, html, hashlib, io, os, sys, datetime as dt, urllib.request, urllib.error
import xml.etree.ElementTree as ET
from email.utils import parsedate_to_datetime
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT_JSON = ROOT / 'src/data/news-fa.json'
IMG_DIR = ROOT / 'public/news'
UA = 'Mozilla/5.0 (compatible; HanparsNewsBot/1.0; +https://hanpars.com)'
NOW = dt.datetime.now(dt.timezone.utc)
MAX_AGE_DAYS = 5
N_ITEMS = 6

# (display name, feed URL, homepage). The feed is a WordPress RSS feed unless noted.
SOURCES = [
    ('دوشنبه‌های دارویی', 'https://doshanbehayedarouei.ir/feed/', 'https://doshanbehayedarouei.ir/'),
    # daroovasalamat.ir answers Iranian IP addresses only (connection timeout from GitHub); kept so that it is used
    # automatically whenever the robot runs from a network that can reach it.
    ('دارو و سلامت', 'https://www.daroovasalamat.ir/rss', 'https://www.daroovasalamat.ir/'),
    ('دارو و سلامت', 'https://www.daroovasalamat.ir/feed', 'https://www.daroovasalamat.ir/'),
]
# categories/tags that mark non-news posts (galleries, videos, polls, advertising, columns)
SKIP_CATS = ('عکس', 'ویدیو', 'ویدئو', 'پادکست', 'نظرسنجی', 'آگهی', 'تبلیغ', 'رویداد', 'گزارش تصویری')
SKIP_TITLE = ('گزارش تصویری', '+ عکس', '+عکس', '+ فیلم', '+فیلم', 'ویدیو', 'ویدئو', 'پادکست', 'نظرسنجی', 'آگهی')
# words that mark the news Hanpars' readers care about (supply, registration, pricing, shortages, imports, the regulator)
GOOD = {'کمبود': 5, 'واردات': 5, 'وارد': 3, 'سازمان غذا و دارو': 5, 'غذا و دارو': 4, 'قیمت': 4, 'ارز': 4, 'تأمین': 3, 'تامین': 3,
        'مواد اولیه': 5, 'ماده اولیه': 4, 'مواد مؤثره': 5, 'تولید': 3, 'دارو': 2, 'بیمه': 3, 'یارانه': 3, 'ثبت': 3, 'پروانه': 3, 'مجوز': 3,
        'پخش': 2, 'داروخانه': 2, 'صادرات': 3, 'تحریم': 4, 'گمرک': 4, 'تعرفه': 3, 'بیمارستان': 2, 'وزارت بهداشت': 3, 'وزیر بهداشت': 2,
        'مجلس': 2, 'کمیسیون بهداشت': 2, 'ابلاغ': 3, 'بخشنامه': 4, 'دستورالعمل': 4, 'فهرست': 2, 'ژنریک': 3, 'بیوسیمیلار': 3, 'واکسن': 3, 'انسولین': 3}
BAD = {'تسلیت': -10, 'درگذشت': -8, 'تبریک': -8, 'انتصاب': -3, 'پژوهشگر': -3, 'مصاحبه': -2, 'یادداشت': -2, 'گفتگو': -2, 'گفت‌وگو': -2}


def fetch(url: str, timeout: int = 25) -> bytes:
    req = urllib.request.Request(url, headers={'User-Agent': UA, 'Accept': '*/*'})
    with urllib.request.urlopen(req, timeout=timeout) as r:
        return r.read()


def strip_html(s: str) -> str:
    s = re.sub(r'<[^>]+>', ' ', s or '')
    s = html.unescape(s)
    s = s.replace('[…]', '').replace('[&#8230;]', '').replace('&#8230;', '…')
    s = re.sub(r'نوشته\s.*?پدیدار شد\.?', '', s)           # WordPress "The post X appeared first on Y."
    s = re.sub(r'^\s*به گزارش\s+[^،,:]+[،,:]\s*', '', s)     # "According to <site>, " lead-in
    return re.sub(r'\s+', ' ', s).strip()


def clean_title(t: str) -> str:
    t = html.unescape(t or '').strip()
    t = re.sub(r'\s*\+\s*(عکس|فیلم|ویدیو|ویدئو)\s*$', '', t)
    return re.sub(r'\s+', ' ', t)


def el_text(item, tag):
    for child in item.iter():
        if child.tag.split('}')[-1] == tag:
            t = ''.join(child.itertext()).strip()
            if t: return t
    return ''


def parse_feed(source: str, url: str):
    raw = fetch(url)
    root = ET.fromstring(raw)
    items = []
    for it in root.iter():
        if it.tag.split('}')[-1] not in ('item', 'entry'): continue
        title = clean_title(el_text(it, 'title'))
        link = el_text(it, 'link') or next((c.get('href') for c in it if c.tag.split('}')[-1] == 'link' and c.get('href')), '')
        cats = [''.join(c.itertext()).strip() for c in it if c.tag.split('}')[-1] == 'category']
        desc = el_text(it, 'description') or el_text(it, 'summary')
        content = el_text(it, 'encoded') or ''
        date = None
        for tag in ('pubDate', 'published', 'updated', 'date'):
            d = el_text(it, tag)
            if d:
                try: date = parsedate_to_datetime(d)
                except Exception:
                    try: date = dt.datetime.fromisoformat(d.replace('Z', '+00:00'))
                    except Exception: date = None
                if date:
                    if date.tzinfo is None: date = date.replace(tzinfo=dt.timezone.utc)
                    break
        img = ''
        for blob in (content, desc):
            m = re.search(r'<img[^>]+src=["\']([^"\']+)', blob or '')
            if m: img = html.unescape(m.group(1)); break
        if not img:
            for c in it.iter():
                if c.tag.split('}')[-1] in ('content', 'thumbnail', 'enclosure') and c.get('url'):
                    img = c.get('url'); break
        if title and link:
            items.append({'title': title, 'url': link.strip(), 'source': source, 'date': date, 'summary': strip_html(desc)[:260], 'image': img, 'cats': cats})
    print(f'  {source}: {len(items)} items from {url}')
    return items


def score(it) -> float:
    if any(k in c for c in it['cats'] for k in SKIP_CATS): return -100
    if any(k in it['title'] for k in SKIP_TITLE): return -100
    t = it['title'] + ' ' + it['summary']
    s = sum(v for k, v in GOOD.items() if k in t) + sum(v for k, v in BAD.items() if k in t)
    if it['date']:
        age = (NOW - it['date']).total_seconds() / 86400
        if age > MAX_AGE_DAYS: return -100
        s += max(0.0, 8 - 2.5 * age)   # the newest items first; the score only breaks ties among same-day stories
    else:
        s -= 3
    return s


def og_image(url: str) -> str:
    try:
        raw = fetch(url, 20).decode('utf-8', 'replace')
    except Exception:
        return ''
    m = re.search(r'<meta[^>]+property=["\']og:image(?::secure_url)?["\'][^>]+content=["\']([^"\']+)', raw, re.I) or \
        re.search(r'<meta[^>]+content=["\']([^"\']+)["\'][^>]+property=["\']og:image', raw, re.I)
    return html.unescape(m.group(1)) if m else ''


def save_image(url: str, slug: str) -> str:
    if not url: return ''
    try:
        from PIL import Image
        raw = fetch(url, 25)
        im = Image.open(io.BytesIO(raw)).convert('RGB')
        w, h = im.size
        if w < 300 or h < 150: return ''
        target = 1200 / 750
        if w / h > target: nw = int(h * target); im = im.crop(((w - nw) // 2, 0, (w - nw) // 2 + nw, h))
        else: nh = int(w / target); im = im.crop((0, (h - nh) // 2, w, (h - nh) // 2 + nh))
        im = im.resize((1200, 750), Image.LANCZOS)
        IMG_DIR.mkdir(parents=True, exist_ok=True)
        out = IMG_DIR / f'{slug}.jpg'
        im.save(out, 'JPEG', quality=78, optimize=True)
        return f'/news/{slug}.jpg'
    except Exception as e:
        print(f'  image failed for {slug}: {e}')
        return ''


def main():
    items, reached = [], set()
    for name, url, _home in SOURCES:
        try:
            got = parse_feed(name, url)
            items += got; reached.add(name)
        except Exception as e:
            print(f'  {name}: unreachable ({url}): {type(e).__name__}: {str(e)[:120]}')
    if not items:
        print('no source reachable; keeping the previous file'); return 0
    seen, uniq = set(), []
    for it in items:
        key = re.sub(r'[^\w]', '', it['title'])[:60]
        if it['url'] in seen or key in seen: continue
        seen.add(it['url']); seen.add(key); uniq.append(it)
    ranked = sorted(uniq, key=score, reverse=True)
    ranked = [it for it in ranked if score(it) > -100]
    # at most 4 per source when more than one source answered, so one site does not fill the whole block
    chosen, per = [], {}
    for it in ranked:
        if len(reached) > 1 and per.get(it['source'], 0) >= 4: continue
        per[it['source']] = per.get(it['source'], 0) + 1
        chosen.append(it)
        if len(chosen) == N_ITEMS: break
    previous = {}
    if OUT_JSON.exists():
        try: previous = {it['url']: it for it in json.load(open(OUT_JSON, encoding='utf-8')).get('items', [])}
        except Exception: previous = {}
    out = []
    for it in chosen:
        slug = 'fa-' + hashlib.sha1(it['url'].encode()).hexdigest()[:10]
        prev = previous.get(it['url'])
        if prev and prev.get('image') and (ROOT / 'public' / prev['image'].lstrip('/')).exists(): image = prev['image']
        else: image = save_image(it['image'] or og_image(it['url']), slug)
        out.append({'title': it['title'], 'url': it['url'], 'source': it['source'], 'date': (it['date'] or NOW).astimezone(dt.timezone.utc).strftime('%Y-%m-%d'),
                    'summary': it['summary'], 'image': image, 'category': next((c for c in it['cats'] if c in ('صنعت دارو', 'اخبار شرکت ها', 'اقتصاد و مدیریت')), '')})
    old_urls = [it['url'] for it in previous.values()] if previous else []
    if [it['url'] for it in out] == old_urls and os.environ.get('FORCE') != '1':
        print('same six stories as before; nothing to write'); return 0
    data = {'updated': NOW.strftime('%Y-%m-%dT%H:%M:%SZ'), 'items': out}
    keep = {ROOT / 'public' / it['image'].lstrip('/') for it in out if it['image']}
    for f in IMG_DIR.glob('fa-*.jpg'):
        if f not in keep: f.unlink()
    OUT_JSON.write_text(json.dumps(data, ensure_ascii=False, indent=1) + '\n', encoding='utf-8')
    for it in out: print(f"  {it['date']} {it['source']}: {it['title']}")
    return 0


if __name__ == '__main__':
    sys.exit(main())
