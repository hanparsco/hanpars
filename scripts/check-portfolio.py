from pathlib import Path
from collections import Counter
from bs4 import BeautifulSoup
import json

root = Path(__file__).resolve().parent.parent
source = BeautifulSoup((root / 'scripts/source/hanpars-product-portfolio_1.html').read_text(), 'html.parser')
data = json.loads((root / 'src/data/portfolio.json').read_text())
page = (root / 'dist/fdf/index.html').read_text()
soup = BeautifulSoup(page, 'html.parser')
portfolio = soup.select_one('[data-portfolio]')
assert portfolio and len(soup.select('h1')) == 1
assert page.index('data-portfolio') < page.index('data-catalogue')
assert soup.find(id='fdf-reference')
text = lambda node: node.get_text(' ', strip=True)
source_codes = {text(row.select('td')[0]): text(row.select('td')[1].code) for row in source.select('#tableview tbody tr')}
rendered_codes = {text(row.select('td')[0]): text(row.select('td')[1].code) for row in portfolio.select('[data-portfolio-row]')}
source_cards = source.select('.grp article.card')
rendered = portfolio.select('[data-portfolio-card]')
flat = [p for g in data['groups'] for p in g['products']]
assert len(source_cards) == len(flat) == len(rendered) == 46
for original, entry, card in zip(source_cards, flat, rendered):
    assert text(original.h3) == entry['name'] == text(card.h4)
    assert source_codes[entry['name']] == entry['atc'] == rendered_codes[entry['name']]
    assert not card.select('.portfolio-card-top code')
    expected_icons = [(svg.use['href'].removeprefix('#i-'), svg.get('title') or text(svg.title)) for svg in original.select('.fis svg')]
    assert expected_icons == [(icon['id'], icon['label']) for icon in entry['formIcons']]
    assert expected_icons == [(svg['data-dosage-form'], svg['aria-label']) for svg in card.select('[data-dosage-form]')]
    forms = [(text(r.select('td')[0]), text(r.select('td')[1])) for r in original.select('.forms tr')]
    assert forms == [(x['form'], x['strength']) for x in entry['forms']]
    assert forms == [(text(x.dt), text(x.dd)) for x in card.select('.portfolio-forms > div')]
    assert original['data-s'] == entry['status']
    assert entry['statusLabel'] == text(card.select_one('.portfolio-badge'))
assert Counter(p['status'] for p in flat) == {'available': 30, 'registered': 16}
assert Counter(svg['data-dosage-form'] for svg in portfolio.select('[data-dosage-form]')) == {'tablet': 25, 'vial': 10, 'powder': 6, 'capsule': 3, 'gel': 1, 'inhaler': 1}
assert len(portfolio.select('[data-portfolio-group]')) == 9
assert len(portfolio.select('[data-portfolio-row]')) == 46
assert len(portfolio.select('[data-portfolio-area]')) == 10
assert len(portfolio.select('[data-portfolio-view]')) == 2
assert len(portfolio.select('.portfolio-capabilities article')) == 4
assert len(portfolio.select('.portfolio-manufacturer li')) == 5
assert 'October 2026' in portfolio.get_text()
assert len(soup.select('[data-catalogue-row]')) == 433
catalogue_data = json.loads((root / 'src/data/fdf.json').read_text())
assert [row.select_one('td').get_text() for row in soup.select('[data-catalogue-row]')] == [entry['name'] for entry in catalogue_data]
assert not BeautifulSoup((root / 'dist/api/index.html').read_text(), 'html.parser').select_one('[data-portfolio]')
assert not BeautifulSoup((root / 'dist/index.html').read_text(), 'html.parser').select_one('[data-portfolio]')
assert (root / 'scripts/source/hanpars-product-portfolio.html').exists()
print('PASS: all 46 revised product/icon assignments preserved; 6 accessible supplied icon types; ATC codes retained in Table view; 9 areas and 30/16 statuses unchanged; portfolio remains above the original 433-row catalogue; previous attachment archived.')
