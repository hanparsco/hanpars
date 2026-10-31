#!/usr/bin/env python3
"""Submit all sitemap URLs to IndexNow (Bing, Yandex, Seznam, Naver...). Key file: /073e322f6bc03ab18362bf345339bfa9.txt"""
import json, re, sys, urllib.request
KEY = '073e322f6bc03ab18362bf345339bfa9'
get = lambda u: urllib.request.urlopen(urllib.request.Request(u, headers={'User-Agent': 'HanparsBot/1.0'}), timeout=60).read().decode()
sm = get('https://hanpars.com/sitemap.xml')
urls = []
if '<sitemapindex' in sm:
    for child in re.findall(r'<loc>([^<]+)</loc>', sm): urls += re.findall(r'<loc>([^<]+)</loc>', get(child))
else:
    urls = re.findall(r'<loc>([^<]+)</loc>', sm)
print(len(urls), 'urls')
for i in range(0, len(urls), 10000):
    body = json.dumps({'host': 'hanpars.com', 'key': KEY, 'keyLocation': f'https://hanpars.com/{KEY}.txt', 'urlList': urls[i:i+10000]}).encode()
    req = urllib.request.Request('https://api.indexnow.org/indexnow', data=body, headers={'Content-Type': 'application/json; charset=utf-8'})
    try:
        with urllib.request.urlopen(req, timeout=60) as r: print('batch', i, r.status)
    except Exception as e: print('batch', i, 'error', e)

# Baidu 主动推送: only when a token from ziyuan.baidu.com is provided (secret BAIDU_PUSH_TOKEN); Chinese pages first.
import os
token = os.environ.get('BAIDU_PUSH_TOKEN', '').strip()
if token:
    zh = [u for u in urls if '/zh' in u] + [u for u in urls if '/zh' not in u]
    sent = 0
    for i in range(0, min(len(zh), 2000), 100):   # daily quota is set by Baidu per site; stay well under it
        body = '\n'.join(zh[i:i+100]).encode()
        req = urllib.request.Request(f'https://data.zz.baidu.com/urls?site=https://hanpars.com&token={token}', data=body, headers={'Content-Type': 'text/plain'})
        try:
            with urllib.request.urlopen(req, timeout=60) as r: res = json.loads(r.read().decode()); sent += res.get('success', 0); rem = res.get('remain')
            if rem is not None and rem <= 0: break
        except Exception as e: print('baidu push error', e); break
    print('baidu push: submitted', sent)
else:
    print('baidu push: no BAIDU_PUSH_TOKEN, skipped')
