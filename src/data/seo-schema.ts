import { parseFdf, infoKey, prettyName } from './fdf-parse';
import fdfAll from './fdf.json';
import { formFa, ROUTE_FA } from './seo-fa';
import namesFa from './names.fa.json';
export const faName = (en: string) => ((namesFa as Record<string, string>)[en] || '').trim();

const clip = (s: string, n: number) => { const t = s.replace(/\s+/g, ' ').trim(); return t.length <= n ? t : t.slice(0, t.lastIndexOf(' ', n)) + '…'; };

export function productSeo(entry: { name: string; code: string }, lang: 'en' | 'fa', info: Record<string, any>, infoFa: Record<string, any>) {
  const p = parseFdf(entry.name);
  const name = prettyName(p.ingredient);
  const strength = p.strength.replace(/\bug\b/g, 'µg');
  const keys = p.ingredients.length > 1 ? [p.ingredients.map(i => infoKey(i)).sort().join(' + ')] : [infoKey(p.ingredient)];
  const key = keys.find(k => info[k] && !info[k].missing);
  const en = key ? info[key] : null;
  const fa = key ? infoFa[key] : null;
  const fForm = formFa(p.form);
  const fRouteRaw = ROUTE_FA[p.route] || '';
  const fRoute = fForm.includes(fRouteRaw) ? '' : fRouteRaw;
  const nameFa = faName(name);
  const fFormShort = fForm || prettyName(p.form).split(',')[0];
  const eForm = prettyName(p.form).split(',')[0];
  const dupe = duplicateInfo(entry);
  const extraFa = dupe.pack && p.pack ? ' ' + p.pack : ''; const extraEn = extraFa;
  const codeFa = dupe.code ? ` کد ${entry.code}` : ''; const codeEn = dupe.code ? ` (code ${entry.code})` : '';
  const pick = (c: string[]) => c.find(x => x.length <= 66) || c[c.length - 1];
  const core = `${nameFa || name} ${fFormShort}${strength ? ' ' + strength : ''}${extraFa}${codeFa}`.replace(/\s+/g, ' ').trim();
  const coreEn = `${name} ${eForm}${strength ? ' ' + strength : ''}${extraEn}${codeEn}`.replace(/\s+/g, ' ').trim();
  const title = lang === 'fa'
    ? pick([nameFa ? `${nameFa} (${name}) ${fFormShort}${strength ? ' ' + strength : ''}${extraFa}${codeFa} | هانیا پرسان دارو` : '', `${core} | تأمین و واردات | هانیا پرسان دارو`, `${core} | هانیا پرسان دارو`, `${core} | تأمین و واردات`, core].filter(Boolean))
    : pick([`${coreEn} | Supplier in Iran | Hanpars`, `${coreEn} | Hanpars`, coreEn]);
  const ind0 = lang === 'fa' ? (fa?.indications || '') : (en?.indications || '');
  const ind = ind0.replace(/^\s*(موارد مصرف|Indications(?: and usage)?)\s*[:：]\s*/i, '');
  const description = lang === 'fa'
    ? clip(`${nameFa ? nameFa + ' (' + name + ')' : name}، کد ${entry.code}، ${fForm}${fRoute ? ' ' + fRoute : ''}${strength ? '، ' + strength : ''}${p.pack ? '، ' + p.pack : ''}. ${ind ? 'موارد مصرف: ' + ind + ' ' : ''}تأمین و واردات توسط هانیا پرسان دارو.`, 158)
    : clip(`${name} (code ${entry.code}) ${prettyName(p.form)}${strength ? ' ' + strength : ''}${p.pack ? ', ' + p.pack : ''}. ${ind ? 'Indications: ' + ind + ' ' : ''}Sourcing and import in Iran by Hanpars.`, 158);
  const keywords = lang === 'fa'
    ? [nameFa, name, `${nameFa || name} ${fFormShort}`, `خرید ${nameFa || name}`, `قیمت ${nameFa || name}`, `واردات ${nameFa || name}`, `تأمین ${nameFa || name}`, `${nameFa || name} ${strength}`, 'واردات دارو', 'واردات فوریتی دارو', 'هانیا پرسان دارو'].filter(Boolean).join('، ')
    : [name, `${name} ${eForm}`, `${name} ${strength}`, `${name} supplier`, `${name} import Iran`, `buy ${name}`, 'pharmaceutical importer Iran', 'Hanpars'].join(', ');
  const schema = {
    '@context': 'https://schema.org', '@type': 'Drug', name: `${name} ${prettyName(p.form)}${strength ? ' ' + strength : ''}`,
    nonProprietaryName: name, activeIngredient: p.ingredients.map(i => prettyName(i)).join(', '),
    dosageForm: prettyName(p.form), administrationRoute: p.route ? prettyName(p.route) : undefined, availableStrength: strength ? { '@type': 'DrugStrength', description: strength } : undefined,
    drugClass: en?.pharmClass?.length ? { '@type': 'DrugClass', name: en.pharmClass[0].replace(/\s*\[EPC\]/, '') } : undefined,
    description: ind ? clip(ind, 300) : undefined, inLanguage: lang === 'fa' ? 'fa-IR' : 'en', identifier: entry.code,
    manufacturer: undefined, offers: { '@type': 'Offer', availability: 'https://schema.org/InStoreOnly', seller: { '@id': 'https://hanpars.com/#organization' } },
  };
  if (nameFa && lang === 'fa') (schema as any).alternateName = nameFa;
  return { title, description, schema, name, nameFa, keywords };
}

export function moleculeSeo(slug: string, mol: any, lang: 'en' | 'fa', faDesc: string) {
  const pretty = (n: string) => /[a-z]/.test(n) ? n : n.charAt(0) + n.slice(1).toLowerCase().replace(/\bhcl\b/g, 'HCl');
  const name = pretty(mol.name);
  const nameFa = faName(name);
  const pick = (c: string[]) => c.find(x => x.length <= 66) || c[c.length - 1];
  const cas = mol.cas ? ` CAS ${mol.cas}` : '';
  const title = lang === 'fa'
    ? pick([nameFa ? `${nameFa} (${name})${cas} | تأمین API | هانیا پرسان دارو` : '', nameFa ? `${nameFa} (${name})${cas} | تأمین API` : '', `${nameFa || name}${cas} | مادهٔ مؤثره | هانیا پرسان دارو`, `${nameFa || name}${cas} | تأمین API`, `${nameFa || name}${cas}`].filter(Boolean))
    : pick([`${name}${cas ? ' (' + cas.trim() + ')' : ''} | API supplier | Hanpars`, `${name}${cas ? ' (' + cas.trim() + ')' : ''} | Hanpars`, `${name}${cas ? ' (' + cas.trim() + ')' : ''}`]);
  const keywords = lang === 'fa'
    ? [nameFa, name, mol.cas, `خرید ${nameFa || name}`, `قیمت ${nameFa || name}`, `ماده اولیه ${nameFa || name}`, `پودر ${nameFa || name}`, `API ${name}`, 'مواد اولیه دارویی', 'تأمین API', 'هانیا پرسان دارو'].filter(Boolean).join('، ')
    : [name, mol.cas, `${name} API`, `${name} API supplier`, `${name} powder`, `${name} CAS ${mol.cas || ''}`.trim(), `${name} manufacturer`, 'API supplier Iran', 'Hanpars'].filter(Boolean).join(', ');
  const description = lang === 'fa'
    ? clip(`${nameFa ? nameFa + ' (' + name + ')' : name}${mol.cas ? '، شمارهٔ CAS ' + mol.cas : ''}${mol.formula ? '، فرمول ' + mol.formula : ''}. ${faDesc ? faDesc + ' ' : ''}تأمین مادهٔ مؤثره (API) با مستندات DMF/CEP و GMP توسط هانیا پرسان دارو.`, 158)
    : clip(`${name}${mol.cas ? ', CAS ' + mol.cas : ''}${mol.formula ? ', ' + mol.formula : ''}. ${mol.description ? mol.description + ' ' : ''}API sourcing with DMF/CEP and GMP documentation by Hanpars.`, 158);
  const schema = mol.cid ? {
    '@context': 'https://schema.org', '@type': 'ChemicalSubstance', name, identifier: mol.cas || undefined,
    alternateName: [...(nameFa ? [nameFa] : []), ...(mol.synonyms || []).slice(0, 5)], molecularFormula: mol.formula || undefined, molecularWeight: mol.mw ? `${mol.mw} g/mol` : undefined,
    iupacName: mol.iupac || undefined, inChIKey: mol.inchikey || undefined, image: mol.image ? `https://hanpars.com${mol.image}` : undefined,
    description: (lang === 'fa' ? faDesc : mol.description) ? clip(lang === 'fa' ? faDesc : mol.description, 300) : undefined,
    sameAs: [`https://pubchem.ncbi.nlm.nih.gov/compound/${mol.cid}`], inLanguage: lang === 'fa' ? 'fa-IR' : 'en',
  } : null;
  return { title, description, schema, name, nameFa, keywords };
}

let _dup: Map<string, { names: number; packs: Map<string, number> }> | null = null;
function baseKey(e: { name: string }) { const p = parseFdf(e.name); return `${p.ingredient}|${p.form.split(',')[0].trim()}|${p.strength}`; }
function duplicateInfo(entry: { name: string; code: string }) {
  if (!_dup) {
    _dup = new Map();
    for (const e of fdfAll as { name: string; code: string }[]) {
      const k = baseKey(e); const p = parseFdf(e.name).pack;
      const v = _dup.get(k) || { names: 0, packs: new Map() }; v.names++; v.packs.set(p, (v.packs.get(p) || 0) + 1); _dup.set(k, v);
    }
  }
  const v = _dup.get(baseKey(entry))!; const p = parseFdf(entry.name).pack;
  return { pack: v.names > 1, code: (v.packs.get(p) || 0) > 1 };
}

/** Molecule entries that share a CAS number: the first slug (alphabetical) is canonical. */
let _casPrimary: Map<string, string> | null = null;
export function canonicalMolecule(slug: string, all: Record<string, { cas?: string; cid?: number | null }>): string {
  if (!_casPrimary) {
    _casPrimary = new Map();
    for (const k of Object.keys(all).sort()) { const c = all[k].cas; if (c && all[k].cid && !_casPrimary.has(c)) _casPrimary.set(c, k); }
  }
  const c = all[slug]?.cas; return (c && _casPrimary.get(c)) || slug;
}
