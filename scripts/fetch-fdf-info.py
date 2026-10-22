#!/usr/bin/env python3
"""Drug information for the finished-product pages, from US FDA labelling (openFDA drug/label, public domain).

Reads  src/data/fdf.json
Writes src/data/fdf-info.json  {key: {generic, brand, pharmClass[], moa, indications, dosage, contraindications, warnings, boxed, routes, forms, setId, effective}}
Run by .github/workflows/fdf-info.yml.
"""
import json, re, sys, time, urllib.request, urllib.parse
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
FDF = ROOT / 'src/data/fdf.json'
OUT = ROOT / 'src/data/fdf-info.json'
UA = 'HanparsCatalogue/1.0 (+https://hanpars.com; contact@hanpars.com)'
SALTS = r'\b(sodium|potassium|calcium|magnesium|hydrochloride|dihydrochloride|hydrobromide|mesylate|mesilate|maleate|fumarate|tartrate|bitartrate|succinate|citrate|acetate|sulfate|sulphate|phosphate|besylate|besilate|tosylate|monohydrate|dihydrate|trihydrate|anhydrous|disodium|bromide|chloride|nitrate|lactate|gluconate|pamoate|decanoate|palmitate|valerate|propionate|benzoate|hyclate|xinafoate|furoate|axetil|proxetil|pivoxil|medoxomil|etexilate|alafenamide|disoproxil|malate|camsylate|oxalate|trometamol|tromethamine|meglumine|dimaleate|hydrate|liposome|liposomal|pegylated|human|recombinant)\b'
FORMS = r'\b(NAIL LACQUER|SOLUTION/DROPS|SOAP|DOUCHE|STICK|DISC|GAS|LACQUER|INJECTABLE|INHALANT|TABLET|CAPSULE|INJECTION|POWDER|SOLUTION|SUSPENSION|SYRUP|CREAM|OINTMENT|GEL|DROPS|SPRAY|INHALER|AEROSOL|PATCH|SUPPOSITORY|EMULSION|LOTION|GRANULES|GRANULE|SACHET|KIT|IMPLANT|FILM|LOZENGE|PESSARY|ENEMA|CONCENTRATE|LIQUID|ELIXIR|SHAMPOO|FOAM|PASTE|INSERT|RING|DEVICE|VIAL|AMPOULE|PEN|CARTRIDGE|DISPERSION|PELLET|SYSTEM|STRIP|SWAB|LYOPHILISATE|MOUTHWASH|PLASTER|OIL|WAFER|GUM|BAR|SPONGE|TINCTURE|CHEWABLE|EFFERVESCENT|ORODISPERSIBLE|BAG|BOTTLE)\b'
# British/INN -> US spellings used in FDA labels
US = {'paracetamol': 'acetaminophen', 'aciclovir': 'acyclovir', 'salbutamol': 'albuterol', 'adrenaline': 'epinephrine', 'noradrenaline': 'norepinephrine',
      'glibenclamide': 'glyburide', 'pethidine': 'meperidine', 'cefalexin': 'cephalexin', 'rifampicin': 'rifampin', 'beclometasone': 'beclomethasone',
      'ciclosporin': 'cyclosporine', 'indometacin': 'indomethacin', 'clomifene': 'clomiphene', 'phytomenadione': 'phytonadione', 'thiamazole': 'methimazole',
      'colecalciferol': 'cholecalciferol', 'hydroxycarbamide': 'hydroxyurea', 'glyceryl trinitrate': 'nitroglycerin', 'chlorphenamine': 'chlorpheniramine',
      'suxamethonium': 'succinylcholine', 'lidocaine': 'lidocaine', 'furosemide': 'furosemide', 'hyoscine': 'scopolamine', 'mesalazine': 'mesalamine',
      'dicycloverine': 'dicyclomine', 'trihexyphenidyl': 'trihexyphenidyl', 'amoxycillin': 'amoxicillin', 'tioguanine': 'thioguanine', 'folinic acid': 'leucovorin',
      'calcium folinate': 'leucovorin', 'dactinomycin': 'dactinomycin', 'methylergometrine': 'methylergonovine', 'asa': 'aspirin', 'acetylsalicylic acid': 'aspirin',
      'salbutamol sulfate': 'albuterol sulfate', 'levothyroxine': 'levothyroxine', 'valproate': 'valproate', 'sodium valproate': 'valproate',
      'dexamethasone sodium': 'dexamethasone', 'tenofovir': 'tenofovir', 'oestradiol': 'estradiol', 'ergometrine': 'ergonovine', 'ketotifen': 'ketotifen'}


def key_of(ingredient):
    k = re.sub(r'\(.*?\)', '', ingredient.lower())
    k = re.sub(SALTS, '', k)
    return re.sub(r'[^a-z]+', ' ', k).strip()


def get(url, tries=3):
    for i in range(tries):
        try:
            req = urllib.request.Request(url, headers={'User-Agent': UA})
            with urllib.request.urlopen(req, timeout=40) as r:
                return json.loads(r.read().decode())
        except urllib.error.HTTPError as e:
            if e.code == 404: return None
            if e.code == 429: time.sleep(5 + 5 * i); continue
            raise
        except Exception:
            if i == tries - 1: raise
            time.sleep(2)
    return None


def clean(txt, limit):
    if not txt: return ''
    t = txt if isinstance(txt, str) else ' '.join(txt)
    t = re.sub(r'^\s*\d+(\.\d+)*\s+[A-Z][A-Z &/-]+\s', '', t)          # strip "1 INDICATIONS AND USAGE"
    t = re.sub(r'\b\d+(\.\d+)+\s+(?=[A-Z])', '', t)                         # section numbers
    t = re.sub(r'\[see [^\]]*\]', '', t, flags=re.I)
    t = re.sub(r'\(\s*\d+(\.\d+)*\s*\)', '', t)
    t = re.sub(r'\s+', ' ', t).strip()
    if len(t) > limit:
        cut = t[:limit]
        cut = cut[:max(cut.rfind('. '), cut.rfind('; '))] + '.' if max(cut.rfind('. '), cut.rfind('; ')) > limit * 0.5 else cut + '…'
        t = cut
    return t


def components(generic):
    g = generic.lower()
    parts = re.split(r',\s*|\s+and\s+|\s*/\s*', g)
    return sorted({key_of(p) for p in parts if key_of(p)})


def matches(r, wanted):
    """True when the label's active ingredients are exactly the wanted set (salts ignored)."""
    of = r.get('openfda', {})
    for g in of.get('generic_name', []):
        comp = components(g)
        if comp == wanted: return True
        # tolerate first-word match per component (e.g. 'amlodipine' vs 'amlodipine besylate' already stripped)
        if len(comp) == len(wanted) and all(any(c.split(' ')[0] == w.split(' ')[0] for c in comp) for w in wanted): return True
    return False


def fetch_label(name, wanted=None):
    wanted = wanted or sorted({key_of(p) for p in re.split(r'\s+and\s+', name)})
    found = []
    for field in ('openfda.generic_name', 'openfda.substance_name'):
        q = urllib.parse.quote(f'{field}:"{name}"')
        data = get(f'https://api.fda.gov/drug/label.json?search={q}&limit=40')
        time.sleep(0.3)
        if data and data.get('results'):
            found = [r for r in data['results'] if matches(r, wanted)]
            if found: break
    if not found: return None
    def rank(r):
        pt = (r.get('openfda', {}).get('product_type', [''])[0] or '')
        return (0 if pt.startswith('HUMAN PRESCRIPTION') else 1, 0 if r.get('indications_and_usage') else 1, 0 if r.get('mechanism_of_action') else 1,
                -len(r.get('indications_and_usage', [''])[0] if r.get('indications_and_usage') else ''))
    r = sorted(found, key=rank)[0]
    if 'HOMEOPATHIC' in ' '.join(r.get('openfda', {}).get('product_type', [])).upper(): return None
    of = r.get('openfda', {})
    return {
        'generic': (of.get('generic_name') or [name])[0].title(),
        'brand': (of.get('brand_name') or [''])[0].title(),
        'pharmClass': [c for c in of.get('pharm_class_epc', [])][:3],
        'moaClass': [c for c in of.get('pharm_class_moa', [])][:3],
        'routes': of.get('route', []), 'forms': of.get('dosage_form', []),
        'moa': clean(r.get('mechanism_of_action'), 700),
        'indications': clean(r.get('indications_and_usage'), 1100),
        'dosage': clean(r.get('dosage_and_administration'), 700),
        'contraindications': clean(r.get('contraindications'), 500),
        'warnings': clean(r.get('warnings_and_cautions') or r.get('warnings'), 600),
        'boxed': clean(r.get('boxed_warning'), 400),
        'pregnancy': clean(r.get('pregnancy'), 350),
        'storage': clean(r.get('storage_and_handling') or r.get('how_supplied'), 350),
        'setId': r.get('set_id', ''), 'effective': r.get('effective_time', ''),
    }


def main():
    fdf = json.loads(FDF.read_text())
    out = json.loads(OUT.read_text()) if OUT.exists() else {}
    keys = {}
    for e in fdf:
        m = re.search(FORMS, e['name'])
        ing = (e['name'][:m.start()] if m else e['name']).strip(' ,')
        parts = [p for p in re.split(r'\s*/\s*', ing) if key_of(p)]
        for part in parts:
            keys.setdefault(key_of(part), part)
        if len(parts) > 1:
            keys.setdefault(' + '.join(sorted(key_of(p) for p in parts)), ing)
    # revalidate cached entries: a label whose ingredients differ from the key is refetched
    for k, v in list(out.items()):
        if v.get('missing'): continue
        wanted = sorted(k.split(' + ')) if ' + ' in k else [k]
        wanted = [key_of(US.get(w, w)) for w in wanted]
        if components(v.get('generic', '')) != wanted and not (len(wanted) == 1 and components(v.get('generic', '')) and components(v.get('generic', ''))[0].split(' ')[0] == wanted[0].split(' ')[0] and len(components(v.get('generic', ''))) == 1):
            del out[k]
    todo = [k for k in keys if k not in out]
    print(f'{len(keys)} ingredients, {len(todo)} to fetch')
    ok = 0
    for i, k in enumerate(todo):
        if ' + ' in k:
            comps = [US.get(c, c) for c in k.split(' + ')]
            name = ' and '.join(comps); wanted = sorted(key_of(c) for c in comps)
        else:
            name = US.get(k, k); wanted = [key_of(name)]
        try:
            info = fetch_label(name, wanted)
            if not info and ' + ' in k:
                info = fetch_label(comps[0], wanted)
            out[k] = info or {'generic': keys[k].title(), 'missing': True}
            ok += bool(info)
        except Exception as e:
            print(f'  ! {k}: {type(e).__name__}: {e}', file=sys.stderr)
            out[k] = {'generic': keys[k].title(), 'missing': True}
        if i % 25 == 0:
            print(f'  {i}/{len(todo)} ok={ok}')
            OUT.write_text(json.dumps(out, ensure_ascii=False, indent=0) + '\n')
    OUT.write_text(json.dumps(out, ensure_ascii=False, indent=0) + '\n')
    print(f'done: {ok} found, {sum(1 for v in out.values() if v.get("missing"))} without a label')
    for k, v in out.items():
        if v.get('missing'): print('  -', k)


if __name__ == '__main__':
    main()
