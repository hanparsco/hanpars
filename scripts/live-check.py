#!/usr/bin/env python3
"""Live crawl/index health check for hanpars.com (run by .github/workflows/live-check.yml).
Checks status codes and redirects of key URLs, robots.txt, the sitemaps, and a random sample of sitemap URLs:
each sampled page must answer 200, be indexable, carry a self-referencing canonical and hreflang alternates that answer 200."""
import urllib.parse, random, re, sys, urllib.request, urllib.error, http.client, ssl, json, time
from urllib.parse import urlsplit
BASE = 'https://hanpars.com'
UA = 'Mozilla/5.0 (compatible; HanparsLiveCheck/1.0)'
ctx = ssl.create_default_context()
problems = []
def req(url, method='GET', _retry=2):
    """No-redirect request: returns (status, location, body). A 5xx (GitHub Pages hiccup right after a deploy) is retried."""
    u = urlsplit(url)
    C = http.client.HTTPSConnection if u.scheme == 'https' else http.client.HTTPConnection
    c = C(u.netloc, timeout=30, **({'context': ctx} if u.scheme == 'https' else {}))
    c.request(method, (u.path or '/') + (('?' + u.query) if u.query else ''), headers={'User-Agent': UA})
    r = c.getresponse(); body = r.read() if method == 'GET' else b''
    if r.status >= 500 and _retry > 0:
        time.sleep(15); return req(url, method, _retry - 1)
    return r.status, r.getheader('Location') or '', body
def expect(url, status, loc=None):
    try: s, l, b = req(url)
    except Exception as e: problems.append(f'{url}: {e}'); print(f'  ERR {url} {e}'); return None
    ok = s == status and (loc is None or l.rstrip('/') == loc.rstrip('/'))
    print(f"  {'ok ' if ok else 'BAD'} {s} {url}{' -> ' + l if l else ''}")
    if not ok: problems.append(f'{url}: got {s} {l}, expected {status} {loc or ""}')
    return b
print('== key URLs')
for u, s, l in [
    (BASE + '/', 200, None), ('http://hanpars.com/', 301, BASE + '/'), ('https://www.hanpars.com/', 301, BASE + '/'),
    (BASE + '/fa', 200, None), (BASE + '/zh', 200, None), (BASE + '/tr', 200, None),
    (BASE + '/fdf', 200, None), (BASE + '/api', 200, None), (BASE + '/fa/fdf', 200, None),
    (BASE + '/robots.txt', 200, None), (BASE + '/sitemap.xml', 200, None), (BASE + '/this-page-does-not-exist', 404, None),
]: expect(u, s, l)
for u in [BASE + '/fdf/', BASE + '/fa/', BASE + '/fdf.html', BASE + '/home']:
    try:
        s, l, b = req(u); print(f'  info {s} {u}{" -> " + l if l else ""}{" (meta refresh)" if b"http-equiv=\"refresh\"" in b else ""}')
    except Exception as e: print(f'  info ERR {u} {e}')
print('== sitemaps')
urls = []
s, l, b = req(BASE + '/sitemap.xml')
for sm in re.findall(r'<loc>([^<]+)</loc>', b.decode()):
    s2, l2, b2 = req(sm); locs = re.findall(r'<loc>([^<]+)</loc>', b2.decode())
    print(f'  {s2} {sm}: {len(locs)} URLs'); urls += locs
    if s2 != 200: problems.append(f'{sm}: {s2}')
print(f'  total {len(urls)} URLs, {len(set(urls))} unique')
if len(urls) != len(set(urls)): problems.append('duplicate URLs in sitemaps')
random.seed(int(time.time()) // 86400)
sample = [u for u in urls if u.count('/') <= 4][:40] + random.sample(urls, min(160, len(urls)))
print(f'== sample of {len(sample)} sitemap URLs')
alts_checked = set()
for u in sample:
    try: s, l, b = req(u)
    except Exception as e: problems.append(f'{u}: {e}'); continue
    h = b.decode('utf-8', 'replace')
    canon = re.search(r'<link rel="canonical" href="([^"]+)"', h)
    robots = re.search(r'<meta name="robots" content="([^"]+)"', h)
    issues = []
    if s != 200: issues.append(f'status {s} {l}')
    if 'http-equiv="refresh"' in h: issues.append('meta refresh')
    if robots and 'noindex' in robots.group(1): issues.append('noindex')
    if not canon or canon.group(1).rstrip('/') != u.rstrip('/'): issues.append(f'canonical {canon.group(1) if canon else None}')
    for code, href in re.findall(r'<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"', h):
        if href in alts_checked: continue
        alts_checked.add(href)
        try:
            s3, l3, _ = req(href, 'HEAD')
            if s3 != 200: issues.append(f'hreflang {code} {href} -> {s3} {l3}')
        except Exception as e: issues.append(f'hreflang {code} {href} {e}')
    if issues: problems.append(f'{u}: ' + '; '.join(issues)); print(f'  BAD {u}: ' + '; '.join(issues))
print(f'  checked {len(sample)} pages and {len(alts_checked)} alternates')
# External links shown on the site (regulatory watch, news, webmail): warnings only — many agency sites block bots,
# so a 403/429 is reported as "blocked" rather than as a problem.
print('== external links (warnings only)')
ext_urls = []
try:
    w = json.load(open('src/data/regulatory-watch.json', encoding='utf-8'))
    ext_urls += [('watch', i['url']) for i in w.get('items', [])]
    print(f"  regulatory watch as of {w.get('asOf')}: {len(w.get('items', []))} items")
except Exception as e: print('  could not read regulatory-watch.json', e)
try:
    n = json.load(open('src/data/news.json', encoding='utf-8'))
    ext_urls += [('news', i['url']) for k in ('global', 'china') for i in n.get(k, [])]
    print(f"  news updated {n.get('updated')}")
except Exception as e: print('  could not read news.json', e)
ext_urls.append(('webmail', 'https://secureserver.titan.email/mail/'))
warnings = []
for kind, eu in ext_urls:
    status = None
    for _ in range(3):  # follow up to 3 redirects
        try: status, loc, _b = req(eu)
        except Exception as e: status, loc = f'ERR {e.__class__.__name__}', ''
        if isinstance(status, int) and 300 <= status < 400 and loc:
            eu = loc if loc.startswith('http') else urllib.parse.urljoin(eu, loc); continue
        break
    botwall = status in (202, 401, 403, 429) or any(k in eu for k in ('apology', 'abuse-detection', 'captcha', 'challenge'))
    tag = 'ok ' if status == 200 and not botwall else ('blocked' if botwall else 'WARN')
    print(f'  {tag} {status} [{kind}] {eu}')
    if tag == 'WARN': warnings.append(f'[{kind}] {eu} -> {status}')
if warnings: print(f'  {len(warnings)} external link warning(s)')
print('== result:', 'OK' if not problems else f'{len(problems)} problem(s)')
for p in problems: print('  -', p)
sys.exit(1 if problems else 0)
