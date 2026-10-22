#!/usr/bin/env python3
"""Look up CAS registry numbers for the API reference range via PubChem (PUG REST).
Reads src/data/apis.json (list of names, or list of {name, cas}) and writes it back as
[{name, cas}], keeping any CAS already present. Run by .github/workflows/cas.yml."""
import json, re, sys, time, urllib.request, urllib.parse
from pathlib import Path
ROOT = Path(__file__).resolve().parent.parent
P = ROOT / 'src/data/apis.json'
CAS = re.compile(r'^\d{2,7}-\d{2}-\d$')
UA = 'HanparsCatalogue/1.0 (+https://hanpars.com)'

def get(url):
    req = urllib.request.Request(url, headers={'User-Agent': UA})
    with urllib.request.urlopen(req, timeout=30) as r:
        return json.loads(r.read().decode())

def valid(cas):
    digits = cas.replace('-', '')
    body, check = digits[:-1], int(digits[-1])
    return sum(int(d) * (i + 1) for i, d in enumerate(reversed(body))) % 10 == check

def lookup(name):
    q = re.sub(r'\bHCl\b', 'hydrochloride', name, flags=re.I)
    q = re.sub(r'\bDiHCl\b', 'dihydrochloride', q, flags=re.I)
    for attempt in (q, re.sub(r'[,(].*$', '', q).strip()):
        if not attempt: continue
        try:
            data = get(f'https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/{urllib.parse.quote(attempt)}/synonyms/JSON')
            syns = data['InformationList']['Information'][0]['Synonym']
            cas = [s for s in syns if CAS.match(s) and valid(s)]
            if cas: return cas[0], attempt != q
        except Exception as e:
            if '404' not in str(e): print(f'  ! {attempt}: {e}', file=sys.stderr)
        time.sleep(0.25)
    return '', False

def main():
    data = json.loads(P.read_text())
    items = [{'name': x, 'cas': ''} if isinstance(x, str) else x for x in data]
    todo = [it for it in items if not it.get('cas')]
    print(f'{len(items)} entries, {len(todo)} without CAS')
    found = approx = 0
    for i, it in enumerate(todo):
        cas, was_base = lookup(it['name'])
        if cas:
            it['cas'] = cas; found += 1; approx += was_base
        if i % 50 == 0: print(f'  {i}/{len(todo)} … found {found}')
        time.sleep(0.22)
    print(f'found {found} ({approx} via base name)')
    P.write_text(json.dumps(items, ensure_ascii=False, indent=0) + '\n')

if __name__ == '__main__':
    main()
