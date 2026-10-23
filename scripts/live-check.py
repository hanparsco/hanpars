#!/usr/bin/env python3
"""Live crawl/index health check for hanpars.com (run by .github/workflows/live-check.yml).
Checks status codes and redirects of key URLs, robots.txt, the sitemaps, and a random sample of sitemap URLs:
each sampled page must answer 200, be indexable, carry a self-referencing canonical and hreflang alternates that answer 200."""
import random, re, sys, urllib.request, urllib.error, http.client, ssl, json, time
from urllib.parse import urlsplit
BASE = 'https://hanpars.com'
UA = 'Mozilla/5.0 (compatible; HanparsLiveCheck/1.0)'
ctx = ssl.create_default_context()
problems = []
def req(url, method='GET'):
    """No-redirect request: returns (status, location, body)."""
    u = urlsplit(url)
    C = http.client.HTTPSConnection if u.scheme == 'https' else http.client.HTTPConnection
    c = C(u.netloc, timeout=30, **({'context': ctx} if u.scheme == 'https' else {}))
    c.request(method, (u.path or '/') + (('?' + u.query) if u.query else ''), headers={'User-Agent': UA})
    r = c.getresponse(); body = r.read() if method == 'GET' else b''
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
print('== result:', 'OK' if not problems else f'{len(problems)} problem(s)')
for p in problems: print('  -', p)
