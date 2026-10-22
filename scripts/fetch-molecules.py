#!/usr/bin/env python3
"""Build molecule detail data for the API reference range from PubChem (PUG REST / PUG View).

Reads  src/data/apis.json           [{name, cas}]
Writes src/data/molecules.json      {slug: {...}}   (merged; existing entries are kept unless --refresh)
       public/molecules/<cid>.png    2D structure drawings
Rate: PubChem allows 5 requests/s; we stay well under it. Run by .github/workflows/molecules.yml.
"""
import json, re, sys, time, urllib.request, urllib.parse, unicodedata
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
APIS = ROOT / 'src/data/apis.json'
OUT = ROOT / 'src/data/molecules.json'
IMG = ROOT / 'public/molecules'
UA = 'HanparsCatalogue/1.0 (+https://hanpars.com; contact@hanpars.com)'
CAS = re.compile(r'^\d{2,7}-\d{2}-\d$')
PROPS = 'MolecularFormula,MolecularWeight,IUPACName,CanonicalSMILES,InChIKey,XLogP,HBondDonorCount,HBondAcceptorCount,TPSA,RotatableBondCount,Charge'


def slugify(name: str) -> str:
    s = unicodedata.normalize('NFKD', name).encode('ascii', 'ignore').decode()
    s = re.sub(r'[^a-zA-Z0-9]+', '-', s).strip('-').lower()
    return s


def get(url, binary=False, tries=3):
    for i in range(tries):
        try:
            req = urllib.request.Request(url, headers={'User-Agent': UA})
            with urllib.request.urlopen(req, timeout=40) as r:
                data = r.read()
                return data if binary else json.loads(data.decode())
        except urllib.error.HTTPError as e:
            if e.code == 404: return None
            if e.code in (429, 503): time.sleep(2 + 2 * i); continue
            raise
        except Exception:
            if i == tries - 1: raise
            time.sleep(1.5)
    return None


def cas_valid(cas):
    d = cas.replace('-', '')
    return sum(int(x) * (i + 1) for i, x in enumerate(reversed(d[:-1]))) % 10 == int(d[-1])


def query_names(name):
    q = re.sub(r'\bHCl\b', 'hydrochloride', name, flags=re.I)
    q = re.sub(r'\bDiHCl\b', 'dihydrochloride', q, flags=re.I)
    yield q
    base = re.sub(r'[,(].*$', '', q).strip()
    if base and base != q: yield base
    # strip common salt words to reach the parent molecule
    parent = re.sub(r'\b(sodium|potassium|calcium|magnesium|hydrochloride|dihydrochloride|hydrobromide|mesylate|mesilate|maleate|fumarate|tartrate|bitartrate|succinate|citrate|acetate|sulfate|sulphate|phosphate|besylate|tosylate|dipivoxil|monohydrate|dihydrate|trihydrate|hemihydrate|anhydrous|disodium|dipotassium|bromide|chloride|nitrate|lactate|gluconate|pamoate|decanoate|palmitate|valerate|propionate|benzoate|salicylate|aspartate|orotate|hyclate|xinafoate|furoate|caproate|enanthate|undecylate|axetil|proxetil|pivoxil|cilexetil|medoxomil|etexilate|alafenamide|disoproxil|malate|camsylate|oxalate|edisylate|isethionate|napsylate|stearate|trometamol|tromethamine|meglumine|dimaleate|dimesylate|difumarate|hydrate)\b', '', base, flags=re.I)
    parent = re.sub(r'\s+', ' ', parent).strip(' ,')
    if parent and parent.lower() != base.lower(): yield parent


def lookup(name, cas=''):
    """Return (record, matched_query, is_parent_match)."""
    for i, q in enumerate(query_names(name)):
        data = get(f'https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/{urllib.parse.quote(q)}/property/{PROPS}/JSON')
        time.sleep(0.25)
        if data and data.get('PropertyTable', {}).get('Properties'):
            return data['PropertyTable']['Properties'][0], q, i == 2
    if cas:
        data = get(f'https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/{cas}/property/{PROPS}/JSON')
        time.sleep(0.25)
        if data and data.get('PropertyTable', {}).get('Properties'):
            return data['PropertyTable']['Properties'][0], cas, False
    return None, '', False


def synonyms(cid):
    data = get(f'https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/{cid}/synonyms/JSON')
    time.sleep(0.22)
    if not data: return [], []
    syns = data['InformationList']['Information'][0].get('Synonym', [])
    cas = [s for s in syns if CAS.match(s) and cas_valid(s)]
    names = []
    for s in syns:
        if CAS.match(s) or re.match(r'^(CHEMBL|CHEBI|DTXSID|SCHEMBL|UNII|HMS|NSC|DB\d|BRD-|CAS-|EINECS|EC \d|MFCD|AKOS|Q\d{3,})', s, re.I): continue
        if re.search(r'\d{4,}|[\[\]{}]|^[A-Z0-9-]{10,}$', s): continue
        if len(s) > 60: continue
        if s.lower() in [n.lower() for n in names]: continue
        names.append(s)
        if len(names) >= 8: break
    return cas, names


def description(cid):
    data = get(f'https://pubchem.ncbi.nlm.nih.gov/rest/pug_view/data/compound/{cid}/JSON?heading=Record+Description')
    time.sleep(0.22)
    if not data: return '', ''
    best = None
    for sec in data.get('Record', {}).get('Section', []):
        for info in sec.get('Information', []):
            txt = ' '.join(m.get('String', '') for m in info.get('Value', {}).get('StringWithMarkup', []))
            src = info.get('ReferenceNumber')
            if txt and len(txt) > 40 and (best is None or len(txt) > len(best[0])) and len(txt) < 900:
                best = (txt, src)
    if not best: return '', ''
    refs = {r['ReferenceNumber']: r.get('SourceName', '') for r in data['Record'].get('Reference', [])}
    return best[0].strip(), refs.get(best[1], '')


def main():
    refresh = '--refresh' in sys.argv
    apis = json.loads(APIS.read_text())
    out = {} if (refresh or not OUT.exists()) else json.loads(OUT.read_text())
    IMG.mkdir(parents=True, exist_ok=True)
    todo = [a for a in apis if slugify(a['name']) not in out]
    print(f'{len(apis)} APIs, {len(todo)} to fetch')
    done = 0; failed = []
    for n, a in enumerate(todo):
        slug = slugify(a['name'])
        try:
            rec, q, parent = lookup(a['name'], a.get('cas', ''))
            if not rec:
                failed.append(a['name']); out[slug] = {'name': a['name'], 'cas': a.get('cas', ''), 'cid': None}
                continue
            cid = rec['CID']
            cas_list, syn = synonyms(cid)
            desc, src = description(cid)
            cas = a.get('cas') or (cas_list[0] if cas_list else '')
            png = IMG / f'{cid}.png'
            if not png.exists():
                data = get(f'https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/{cid}/PNG?image_size=320x320', binary=True)
                time.sleep(0.22)
                if data: png.write_bytes(data)
            out[slug] = {
                'name': a['name'], 'cas': cas, 'cid': cid, 'matched': q, 'parentMatch': parent,
                'formula': rec.get('MolecularFormula', ''), 'mw': rec.get('MolecularWeight', ''), 'iupac': rec.get('IUPACName', ''),
                'smiles': rec.get('CanonicalSMILES', ''), 'inchikey': rec.get('InChIKey', ''), 'xlogp': rec.get('XLogP'),
                'hbd': rec.get('HBondDonorCount'), 'hba': rec.get('HBondAcceptorCount'), 'tpsa': rec.get('TPSA'), 'rotb': rec.get('RotatableBondCount'),
                'synonyms': syn, 'otherCas': [c for c in cas_list if c != cas][:4], 'description': desc, 'descriptionSource': src,
                'image': f'/molecules/{cid}.png' if png.exists() else '',
            }
            if not a.get('cas') and cas: a['cas'] = cas
            done += 1
        except Exception as e:
            print(f'  ! {a["name"]}: {type(e).__name__}: {e}', file=sys.stderr)
            failed.append(a['name'])
        if n % 50 == 0:
            print(f'  {n}/{len(todo)} fetched={done}')
            OUT.write_text(json.dumps(out, ensure_ascii=False, indent=0) + '\n')
            APIS.write_text(json.dumps(apis, ensure_ascii=False, indent=0) + '\n')
    OUT.write_text(json.dumps(out, ensure_ascii=False, indent=0) + '\n')
    APIS.write_text(json.dumps(apis, ensure_ascii=False, indent=0) + '\n')
    print(f'done: fetched {done}, failed {len(failed)}')
    for f in failed[:60]: print('  -', f)


if __name__ == '__main__':
    main()
