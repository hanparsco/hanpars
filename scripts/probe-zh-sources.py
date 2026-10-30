import urllib.request, urllib.parse, re, ssl
UA='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36'
ctx=ssl.create_default_context(); ctx.check_hostname=False; ctx.verify_mode=ssl.CERT_NONE
def get(u):
    r=urllib.request.urlopen(urllib.request.Request(u,headers={'User-Agent':UA,'Accept':'*/*','Accept-Language':'zh-CN,zh;q=0.9'}),timeout=25,context=ctx); return r.read().decode('utf-8','replace')
Q={'pharmcube':'site:pharmcube.com','tongxieyi':'同写意 医药','e-pharma':'E药经理人','yyjjb':'site:yyjjb.com.cn OR 医药经济报','vbdata':'site:vbdata.cn','yaozh':'site:yaozh.com','bioon':'site:bioon.com','caixin':'site:caixin.com 医药 OR 药企 OR 创新药','jiemian':'site:jiemian.com 医药 OR 药企','36kr':'site:36kr.com 医药 OR 药企 OR 创新药','mix':'(创新药 OR 原料药 OR 药企 OR 出海 OR 集采 OR NMPA) when:2d'}
for k,q in Q.items():
    u='https://news.google.com/rss/search?q='+urllib.parse.quote(q+' when:7d')+'&hl=zh-CN&gl=CN&ceid=CN:zh-Hans'
    try:
        t=get(u); items=re.findall(r'<item>(.*?)</item>',t,flags=re.S)
        print(f'== {k}: {len(items)} items')
        for it in items[:3]:
            ti=re.search(r'<title>(.*?)</title>',it,flags=re.S); d=re.search(r'<pubDate>(.*?)</pubDate>',it); src=re.search(r'<source[^>]*>(.*?)</source>',it)
            print('   ',(d.group(1)[5:16] if d else ''),'|',src.group(1) if src else '','|',ti.group(1)[:70] if ti else '')
    except Exception as e: print('==',k,'ERR',str(e)[:80])
# pharmcube own pages
for u in ['https://www.pharmcube.com/','https://www.pharmcube.com/news/list','https://www.pharmcube.com/home/news','https://www.pharmcube.com/news/index']:
    try:
        t=get(u); print('== pc',u,len(t)); print('   hrefs:',sorted(set(re.findall(r'href="(/[a-zA-Z]+[^"]{0,40})"',t)))[:25])
        m=re.search(r'<script type="application/ld\+json">(.*?)</script>',t,flags=re.S); print('   ld:',(m.group(1)[:300] if m else None))
    except Exception as e: print('== pc',u,'ERR',str(e)[:60])
# yaozh / bioon structure for dates
for u in ['https://news.yaozh.com/','https://news.bioon.com/industry/']:
    t=get(u); i=t.find('/archive/') if 'yaozh' in u else t.find('/article/'); print('== struct',u); print(t[max(0,i-600):i+300].replace('\n',' ')[:900])
