from pathlib import Path
from urllib.parse import urlsplit, unquote
from bs4 import BeautifulSoup
import json

root=Path(__file__).resolve().parent.parent
manifest=json.loads((root/'public/manus-routes.json').read_text())['routes']
paths={row['path'] for row in manifest}
errors=[]
for row in manifest:
    path=row['path']
    file=root/'dist'/path.lstrip('/')/'index.html'
    if not file.exists():
        errors.append(f'Missing output: {path}')
        continue
    soup=BeautifulSoup(file.read_text(),'html.parser')
    if len(soup.select('h1')) != 1: errors.append(f'H1 count: {path} = {len(soup.select("h1"))}')
    if not soup.title or not soup.title.get_text(strip=True): errors.append(f'Missing title: {path}')
    if not soup.select_one('meta[name="description"][content]'): errors.append(f'Missing description: {path}')
    if not soup.select_one('main') or len(soup.select_one('main').get_text(' ',strip=True))<100: errors.append(f'Empty body: {path}')
    for a in soup.select('a[href]'):
        link=urlsplit(a['href'])
        if not link.scheme and not link.netloc:
            destination=unquote(link.path) or path
            if destination.startswith('/') and destination not in paths: errors.append(f'Broken route in {path}: {a["href"]}')
            if link.fragment and (not link.path or link.path==path):
                if not soup.find(id=link.fragment): errors.append(f'Broken same-page anchor: {path}#{link.fragment}')
for file,count,kind in [('fdf.json',433,'fdf'),('apis.json',1503,'api')]:
    data=json.loads((root/'src/data'/file).read_text())
    assert len(data)==count,(file,len(data))
    soup=BeautifulSoup((root/'dist'/kind/'index.html').read_text(),'html.parser')
    rows=soup.select('[data-catalogue-row]')
    assert len(rows)==count,(kind,len(rows))
    extracted=[row.select_one('td').get_text() for row in rows]
    expected=[entry['name'] for entry in data] if kind=='fdf' else data
    assert extracted==expected, f'{kind} source-text mismatch'
ra=json.loads((root/'src/data/regulatory.json').read_text())
assert len(ra['services'])==6 and len(ra['process'])==4 and len(ra['faq'])==4
assert len(json.loads((root/'src/data/articles.json').read_text()))==20
report={'routes_checked':len(manifest),'fdf_rows':626,'api_entries':1453,'articles':20,'regulatory_services':6,'errors':sorted(set(errors))}
(root/'scripts/static-check-results.json').write_text(json.dumps(report,indent=2)+'\n')
print(json.dumps(report,indent=2))
if errors: raise SystemExit(1)
