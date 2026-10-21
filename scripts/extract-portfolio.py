from pathlib import Path
from collections import Counter
from bs4 import BeautifulSoup
import json
import sys

root = Path(__file__).resolve().parent.parent
source = Path(sys.argv[1]) if len(sys.argv) > 1 else root / 'scripts/source/hanpars-product-portfolio_1.html'
s = BeautifulSoup(source.read_text(), 'html.parser')
text = lambda node: node.get_text(' ', strip=True)
table_codes = {text(row.select('td')[0]): text(row.select('td')[1].code) for row in s.select('#tableview tbody tr')}

groups = []
for index, group in enumerate(s.select('.grp')):
    products = []
    for card in group.select('article.card'):
        origins = []
        for span in card.select('.org span'):
            title = span.get('title', '')
            origins.append(title.removeprefix('Manufactured in ') if title.startswith('Manufactured in ') else text(span))
        form_icons = []
        for svg in card.select('.fis svg'):
            form_icons.append({'id': svg.use['href'].removeprefix('#i-'), 'label': svg.get('title') or text(svg.title)})
        assert form_icons
        name = text(card.h3)
        products.append({
            'name': name,
            'atc': table_codes[name],
            'formIcons': form_icons,
            'forms': [{'form': text(row.select('td')[0]), 'strength': text(row.select('td')[1])} for row in card.select('.forms tr')],
            'origins': origins,
            'status': card['data-s'],
            'statusLabel': 'Available in Iran' if card['data-s'] == 'available' else 'Launching',
        })
    groups.append({'id': f'area-{index+1}', 'title': group['data-grp'], 'kicker': text(group.select_one('.kicker')), 'description': text(group.select_one('.gdesc')), 'products': products})
products = [p for g in groups for p in g['products']]
counts = Counter(p['status'] for p in products)
assert len(products) == 46 and len(groups) == 9 and counts == {'available': 30, 'registered': 16}

# Reuse only the supplied primitive line-icon shapes, never scripts or external SVG resources.
allowed_tags = {'circle', 'path', 'rect', 'line', 'ellipse', 'polyline', 'polygon'}
allowed_attributes = {'cx', 'cy', 'r', 'd', 'fill', 'stroke', 'stroke-width', 'stroke-linecap', 'stroke-linejoin', 'opacity', 'x', 'y', 'width', 'height', 'rx', 'ry', 'transform', 'points'}
icons = {}
for symbol in s.select('symbol'):
    for shape in symbol.find_all():
        assert shape.name in allowed_tags and set(shape.attrs).issubset(allowed_attributes)
    icons[symbol['id'].removeprefix('i-')] = ''.join(str(child) for child in symbol.children if getattr(child, 'name', None))
assert set(icons) == {'tablet', 'capsule', 'vial', 'powder', 'gel', 'inhaler'}
assert all(icon['id'] in icons for p in products for icon in p['formIcons'])

trust = []
for item in s.select('.trust .wrap > div'):
    heading = text(item.b)
    trust.append({'title': heading, 'description': text(item)[len(heading):].strip()})
cta = s.select_one('.cta')
data = {
    'company': text(s.select_one('.hero .kicker')),
    'title': text(s.h1),
    'description': text(s.select_one('.hero .lead')),
    'snapshot': 'October 2026',
    'counts': {'total': 46, 'available': 30, 'launching': 16, 'areas': 9},
    'trust': trust,
    'groups': groups,
    'statusNote': text(s.select_one('.note')),
    'manufacturer': {'title': text(cta.h2), 'description': text(cta.p), 'services': [text(li) for li in cta.select('li')], 'contactHref': cta.a['href'], 'contactLabel': text(cta.a)},
    'sourceFooter': text(s.footer),
}
(root / 'src/data/portfolio.json').write_text(json.dumps(data, ensure_ascii=False, indent=2) + '\n')
(root / 'src/data/dosage-icons.json').write_text(json.dumps(icons, ensure_ascii=False, indent=2) + '\n')
archive = root / 'scripts/source'
archive.mkdir(exist_ok=True)
(archive / source.name).write_bytes(source.read_bytes())
print('Preserved revised portfolio: 46 molecules, 9 areas, 30 available, 16 launching, 6 supplied icon types; ATC codes retained from the table.')
