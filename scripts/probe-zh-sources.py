import urllib.request, re, json, ssl, sys
UA='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36'
C={
 'pharmcube':['https://www.pharmcube.com/','https://www.pharmcube.com/news','https://news.pharmcube.com/','https://www.pharmcube.com/rss','https://www.pharmcube.com/feed'],
 'tongxieyi':['https://www.tongxieyi.com/','https://tongxieyi.com/','https://www.tongxieyi.com/feed','https://www.tongxieyi.com/rss'],
 'e-pharma':['https://www.y-lp.com/','https://y-lp.com/','https://www.y-lp.cn/','https://www.y-lp.com/feed'],
 'yyjjb':['https://www.yyjjb.com.cn/','http://www.yyjjb.com.cn/','https://www.yyjjb.com.cn/rss.xml','https://www.yyjjb.com.cn/yyjjb/'],
 'vbdata':['https://www.vbdata.cn/','https://vcbeat.top/','https://www.vbdata.cn/rss','https://vcbeat.top/feed'],
 'yaozh':['https://news.yaozh.com/','https://www.yaozh.com/','https://news.yaozh.com/rss','https://news.yaozh.com/feed'],
 'bioon':['https://news.bioon.com/','https://www.bioon.com/','https://news.bioon.com/rss','https://www.bioon.com/rss/','https://news.bioon.com/industry/'],
 'caixin':['https://www.caixin.com/rss/','https://health.caixin.com/','https://www.caixin.com/rss/finance.xml','https://health.caixin.com/rss/'],
 'jiemian':['https://www.jiemian.com/lists/3.html','https://www.jiemian.com/','https://a.jiemian.com/index.php?m=lists&a=rss&cid=3','https://www.jiemian.com/rss/health.xml'],
 '36kr':['https://36kr.com/feed','https://36kr.com/information/web_news/latest','https://36kr.com/feed-newsflash'],
}
ctx=ssl.create_default_context(); ctx.check_hostname=False; ctx.verify_mode=ssl.CERT_NONE
def get(u):
    r=urllib.request.urlopen(urllib.request.Request(u,headers={'User-Agent':UA,'Accept':'*/*','Accept-Language':'zh-CN,zh;q=0.9'}),timeout=25,context=ctx)
    return r.status, r.headers.get('content-type',''), r.read(400000), r.geturl()
for name,urls in C.items():
    for u in urls:
        try:
            st,ct,b,fin=get(u); t=b.decode('utf-8','replace')
            kind='RSS' if ('<rss' in t[:2000] or '<feed' in t[:2000]) else 'HTML'
            print(f'== {name} {u} -> {st} {ct[:40]} {len(b)}B {kind} final={fin}')
            if kind=='RSS':
                print('   items:',len(re.findall(r'<item>|<entry>',t)),'|',re.findall(r'<title>(?:<!\[CDATA\[)?([^<\]]{6,80})',t)[1:4])
            else:
                links=re.findall(r'<a[^>]+href="([^"]+)"[^>]*>([^<]{10,60})</a>',t)
                links=[(h,x.strip()) for h,x in links if re.search(r'[一-鿿]{6,}',x)]
                print('   article-like links:',len(links),links[:4])
                print('   meta refresh/js-only:', 'http-equiv="refresh"' in t, '| <article>' in t, '| json-ld:', 'application/ld+json' in t)
        except Exception as e:
            print(f'== {name} {u} -> ERR {type(e).__name__}: {str(e)[:80]}')
