from pathlib import Path
from bs4 import BeautifulSoup
import json

source = Path('/home/ubuntu/hanpars-regulatory-embed.html')
s = BeautifulSoup(source.read_text(), 'html.parser')
text = lambda el: el.get_text(' ', strip=True)
data = {
    'intro': text(s.select_one('.hero-text')),
    'facts': [{'label':text(f.small),'value':text(f.b)} for f in s.select('.fact')],
    'whyTitle': text(s.select_one('#why-title')),
    'why': [text(p) for p in s.select('.intro-copy p')],
    'services': [{'title':text(c.h3),'description':text(c.p)} for c in s.select('.service-card')],
    'processTitle': text(s.select_one('#process-title')),
    'process': [{'title':text(c.h3),'description':text(c.p)} for c in s.select('.stage')],
    'marketIntro': text(s.select_one('.markets p')),
    'markets': [text(c) for c in s.select('.market-list li')],
    'audiences': [str(p.select_one('span:not(.dash)')) for p in s.select('.audience-list p')],
    'faq': [{'question':text(c.h3),'answer':text(c.p)} for c in s.select('.faq')],
    'ctaTitle': text(s.select_one('#cta-title')),
    'ctaText': text(s.select_one('.cta-copy p')),
}
assert len(data['services']) == 6 and len(data['process']) == 4 and len(data['faq']) == 4
Path('src/data/regulatory.json').write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n')
print('Regulatory source preserved: 6 services, 4 stages, 5 markets, 4 audiences, 4 FAQs')
