#!/usr/bin/env python3
"""Chinese pharma news (global angle) for the Chinese pages of the Hanpars website.

Sources are Chinese-language pharma media; most publish on WeChat or behind JavaScript, so the robot reads them through
Google News' RSS (per-source queries), resolves the publisher URL and takes the publisher's own preview image.
Writes  src/data/news-zh.json  {updated, items:[{title,url,source,date,summary,image,feed,retrieved,imageSource,imageBasis}]}
and     public/news/zh-<hash>.jpg.  Run by .github/workflows/news-zh.yml every four hours; stdlib + Pillow.
"""
from __future__ import annotations
import json, re, html, hashlib, os, sys, datetime as dt, urllib.parse, urllib.request, importlib.util
import xml.etree.ElementTree as ET
from email.utils import parsedate_to_datetime
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT_JSON = ROOT / 'src/data/news-zh.json'
IMG_DIR = ROOT / 'public/news'
NOW = dt.datetime.now(dt.timezone.utc)
MAX_AGE_DAYS = 4
N_ITEMS = 6
# helpers shared with the English robot (Google-link resolution, og:image, image resizing)
_spec = importlib.util.spec_from_file_location('fetch_news', ROOT / 'scripts/fetch-news.py'); _fn = importlib.util.module_from_spec(_spec); _spec.loader.exec_module(_fn)  # type: ignore
fetch, resolve_google = _fn.fetch, _fn.resolve_google
CHROME = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36'


def og_image(url: str) -> str:
    """Publisher preview image: og:image / twitter:image, else the first content image of the article (Chinese sites
    often omit og tags or render them client-side)."""
    try:
        req = urllib.request.Request(url, headers={'User-Agent': CHROME, 'Accept': 'text/html,*/*', 'Accept-Language': 'zh-CN,zh;q=0.9', 'Referer': 'https://www.google.com/'})
        with urllib.request.urlopen(req, timeout=20) as r: raw = r.read()[:600_000].decode('utf-8', 'ignore')
    except Exception as e:
        print(f'  ! page fetch for image failed: {url[:60]} {type(e).__name__}'); return ''
    for pat in (r'<meta[^>]+property=["\']og:image(?::secure_url)?["\'][^>]+content=["\']([^"\']+)', r'<meta[^>]+content=["\']([^"\']+)["\'][^>]+property=["\']og:image',
                r'<meta[^>]+name=["\']twitter:image["\'][^>]+content=["\']([^"\']+)', r'"(?:cover|coverImage|cover_img|thumb|image)"\s*:\s*"(https?:[^"]+\.(?:jpe?g|png|webp)[^"]*)"'):
        m = re.search(pat, raw, re.I)
        if m: return html.unescape(m.group(1)).replace('\\/', '/')
    body = raw.split('<body', 1)[-1]
    for m in re.finditer(r'<img[^>]+(?:data-src|data-original|src)=["\'](https?://[^"\']+\.(?:jpe?g|png|webp)[^"\']*)', body, re.I):
        u = m.group(1)
        if re.search(r'logo|icon|avatar|qrcode|qr_|banner|ad[sv]?[_/.-]|1x1|pixel|emoji', u, re.I): continue
        return html.unescape(u)
    return ''

# (display name, Google News query, accepted <source> names or hosts). Order = editorial preference.
SOURCES = [
    ('医药魔方', 'site:pharmcube.com OR 医药魔方', ('ByDrug', 'pharmcube', '医药魔方')),
    ('医药经济报', 'site:yyjjb.com.cn OR 医药经济报', ('医药经济报', 'yyjjb')),
    ('同写意', '同写意 (医药 OR 药企 OR 创新药 OR 出海)', ('同写意', 'tongxieyi')),
    ('E药经理人', 'E药经理人 (药企 OR 医药 OR 出海)', ('E药经理人', 'y-lp')),
    ('动脉网', 'site:vbdata.cn (医药 OR 药企 OR 创新药 OR 融资)', ('动脉网', 'vbdata', 'vcbeat')),
    ('药智网', 'site:yaozh.com (获批 OR 注册 OR 集采 OR 药企)', ('药智', 'yaozh')),
    ('生物谷', 'site:bioon.com (药企 OR 获批 OR 出海 OR 原料药 OR 制药)', ('生物谷', 'bioon')),
    ('财新', 'site:caixin.com (医药 OR 药企 OR 创新药 OR 原料药)', ('财新', 'caixin')),
    ('界面新闻', 'site:jiemian.com (药企 OR 创新药 OR 医药 OR 原料药) -ETF -板块 -涨停', ('Jiemian', '界面', 'jiemian')),
    ('36氪', 'site:36kr.com (药企 OR 创新药 OR 医药 OR 原料药 OR 出海)', ('36Kr', '36kr', '36氪')),
]
GOOD = {'出海': 6, '授权': 4, 'License': 4, 'BD': 3, '海外': 4, '全球': 3, 'FDA': 4, 'EMA': 4, 'WHO': 3, '并购': 4, '收购': 4, '获批': 4, 'NMPA': 4, '集采': 3, '原料药': 6,
        '制剂': 4, '出口': 5, '跨国': 3, '中东': 6, '伊朗': 8, '一带一路': 4, '注册': 3, 'GMP': 4, '产能': 3, '供应链': 4, '仿制药': 4, '生物类似药': 4, '疫苗': 3, '胰岛素': 3,
        '短缺': 4, '价格': 2, '政策': 2, '医保': 2, '临床': 1, '上市': 2, 'CDMO': 5, 'CRO': 2, '工厂': 3, '合作': 2, '协议': 2, '亿美元': 3, '首付款': 4, '里程碑': 3}
BAD = {'ETF': -12, '板块': -10, '涨停': -12, '涨超': -10, '股价': -6, '研报': -6, '评级': -6, '主力资金': -12, '净流入': -12, '券商': -6, '大宗交易': -12, '龙虎榜': -12,
       '招聘': -10, '活动': -10, '洽谈会': -10, '日报': -6, '早报': -6, '晚报': -6, '周报': -4, '盘点': -3, '峰会': -5, '论坛': -5, '报名': -10, '直播': -8, '征文': -10, '科普': -6, '减肥': -3, '论文': -6, 'Cell': -4, 'Nature': -3, 'Science': -3, '小鼠': -8, '机制': -3,
       '访谈': -3, '观点': -2, '广告': -10, '招商': -8, '免费': -8, '试用': -8, '课程': -10, 'AI营销': -6}


def strip(s: str) -> str:
    s = re.sub(r'<[^>]+>', ' ', s or ''); s = html.unescape(s)
    return re.sub(r'\s+', ' ', s).strip()


def gnews(query: str):
    url = 'https://news.google.com/rss/search?q=' + urllib.parse.quote(query + ' when:4d') + '&hl=zh-CN&gl=CN&ceid=CN:zh-Hans'
    root = ET.fromstring(fetch(url))
    out = []
    for it in root.iter('item'):
        title = strip(it.findtext('title') or ''); link = (it.findtext('link') or '').strip()
        src_el = it.find('source'); src = (src_el.text or '').strip() if src_el is not None else ''
        src_url = src_el.get('url', '') if src_el is not None else ''
        title = re.sub(r'\s*[-–—|]\s*' + re.escape(src) + r'\s*$', '', title) if src else title
        title = re.sub(r'\s*-\s*(36氪|ByDrug|财新网|Jiemian\.com)\s*$', '', title)
        d = None
        try: d = parsedate_to_datetime(it.findtext('pubDate') or '')
        except Exception: pass
        desc = strip(re.sub(r'<a[^>]*>.*?</a>', '', it.findtext('description') or ''))
        out.append({'title': title, 'link': link, 'source': src, 'source_url': src_url, 'date': d, 'summary': desc[:200]})
    return out


def score(it) -> float:
    t = it['title'] + ' ' + it['summary']
    s = sum(v for k, v in GOOD.items() if k in t) + sum(v for k, v in BAD.items() if k in t)
    if it['date']:
        age = (NOW - it['date']).total_seconds() / 86400
        if age > MAX_AGE_DAYS: return -100
        s += max(0.0, 6 - 2 * age)
    else: s -= 3
    if len(it['title']) < 8: return -100
    if not re.search(r'药|医药|制药|医疗|生物|疫苗|胰岛素|临床|FDA|EMA|NMPA|集采|医保|ADC|GLP|CDMO|CRO|仿制|单抗|双抗|细胞|基因|器械|诊断|中药|API|原料', t): return -100
    return s


def main():
    cands = []
    for name, q, accept in SOURCES:
        try: items = gnews(q)
        except Exception as e: print(f'  {name}: query failed: {type(e).__name__}: {str(e)[:80]}'); continue
        kept = [it for it in items if any(a.lower() in (it['source'] + ' ' + it['source_url']).lower() for a in accept)]
        print(f'  {name}: {len(items)} results, {len(kept)} from the source itself')
        for it in kept: it['display'] = name
        cands += kept
    seen, uniq = set(), []
    for it in cands:
        k = re.sub(r'[^\w一-鿿]', '', it['title'])[:40]
        if k in seen: continue
        seen.add(k); uniq.append(it)
    ranked = sorted([it for it in uniq if score(it) > -100], key=score, reverse=True)
    chosen, per = [], {}
    for it in ranked:
        if per.get(it['display'], 0) >= 2: continue
        per[it['display']] = per.get(it['display'], 0) + 1; chosen.append(it)
        if len(chosen) == N_ITEMS: break
    if not chosen: print('nothing selected; keeping previous file'); return 0
    previous = {}
    if OUT_JSON.exists():
        try: previous = {it['url']: it for it in json.load(open(OUT_JSON, encoding='utf-8')).get('items', [])}
        except Exception: previous = {}
    prev_by_title = {re.sub(r'[^\w一-鿿]', '', v['title'])[:40]: v for v in previous.values()}
    out = []
    for it in chosen:
        prev = prev_by_title.get(re.sub(r'[^\w一-鿿]', '', it['title'])[:40])
        url = prev['url'] if prev else resolve_google(it['link'])
        if 'news.google.com' in url: url = it['source_url'] or url
        slug = 'zh-' + hashlib.sha1(url.encode()).hexdigest()[:10]
        if prev and prev.get('image') and (ROOT / 'public' / prev['image'].lstrip('/')).exists(): image, img_src = prev['image'], prev.get('imageSource', '')
        else:
            img_src = og_image(url) if 'news.google.com' not in url else ''
            image = _fn.save_image(img_src, slug) if img_src else ''
        out.append({'title': it['title'], 'url': url, 'source': it['display'], 'date': (it['date'] or NOW).astimezone(dt.timezone.utc).strftime('%Y-%m-%d'),
                    'summary': it['summary'] if it['summary'] and it['summary'] != it['title'] else '', 'image': image,
                    'feed': 'Google News RSS (zh-CN)', 'retrieved': (prev or {}).get('retrieved') or NOW.strftime('%Y-%m-%dT%H:%M:%SZ'),
                    'imageSource': img_src, 'imageBasis': 'publisher preview image (og:image), shown as a linked thumbnail with attribution; removed on request' if image else ''})
    if [o['url'] for o in out] == list(previous.keys()) and os.environ.get('FORCE') != '1':
        print('same stories as before; nothing to write'); return 0
    keep = {ROOT / 'public' / o['image'].lstrip('/') for o in out if o['image']}
    for f in IMG_DIR.glob('zh-*.jpg'):
        if f not in keep: f.unlink()
    OUT_JSON.write_text(json.dumps({'updated': NOW.strftime('%Y-%m-%dT%H:%M:%SZ'), 'items': out}, ensure_ascii=False, indent=1) + '\n', encoding='utf-8')
    for o in out: print(f"  {o['date']} {o['source']}: {o['title']}  [{'img' if o['image'] else 'no img'}]")
    return 0


if __name__ == '__main__':
    sys.exit(main())
