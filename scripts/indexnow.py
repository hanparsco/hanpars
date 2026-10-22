#!/usr/bin/env python3
"""Submit all sitemap URLs to IndexNow (Bing, Yandex, Seznam, Naver...). Key file: /073e322f6bc03ab18362bf345339bfa9.txt"""
import json, re, sys, urllib.request
KEY = '073e322f6bc03ab18362bf345339bfa9'
sm = urllib.request.urlopen(urllib.request.Request('https://hanpars.com/sitemap.xml', headers={'User-Agent': 'HanparsBot/1.0'}), timeout=60).read().decode()
urls = re.findall(r'<loc>([^<]+)</loc>', sm)
print(len(urls), 'urls')
for i in range(0, len(urls), 10000):
    body = json.dumps({'host': 'hanpars.com', 'key': KEY, 'keyLocation': f'https://hanpars.com/{KEY}.txt', 'urlList': urls[i:i+10000]}).encode()
    req = urllib.request.Request('https://api.indexnow.org/indexnow', data=body, headers={'Content-Type': 'application/json; charset=utf-8'})
    try:
        with urllib.request.urlopen(req, timeout=60) as r: print('batch', i, r.status)
    except Exception as e: print('batch', i, 'error', e)
