import { parseFdf, infoKey, prettyName } from './fdf-parse';
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
  const title = lang === 'fa'
    ? `${nameFa ? nameFa + ' (' + name + ')' : name} ${fForm}${strength ? ' ' + strength : ''} | واردات و تأمین | هانیا پرسان دارو`
    : `${name} ${prettyName(p.form).split(',')[0]}${strength ? ' ' + strength : ''} | Supply and import | Hanpars`;
  const ind = lang === 'fa' ? (fa?.indications || '') : (en?.indications || '');
  const description = lang === 'fa'
    ? clip(`${nameFa ? nameFa + ' — ' + name : name} (${fForm}${fRoute ? ' ' + fRoute : ''}${strength ? '، ' + strength : ''}${p.pack ? '، ' + p.pack : ''}): ${ind ? 'موارد مصرف: ' + ind + ' ' : ''}تأمین، واردات و ثبت در ایران توسط شرکت هانیا پرسان دارو؛ کد ${entry.code}.`, 158)
    : clip(`${name} ${prettyName(p.form)}${strength ? ' ' + strength : ''}${p.pack ? ', ' + p.pack : ''}. ${ind ? 'Indications: ' + ind + ' ' : ''}Sourcing, import and registration in Iran by Hanpars, code ${entry.code}.`, 158);
  const schema = {
    '@context': 'https://schema.org', '@type': 'Drug', name: `${name} ${prettyName(p.form)}${strength ? ' ' + strength : ''}`,
    nonProprietaryName: name, activeIngredient: p.ingredients.map(i => prettyName(i)).join(', '),
    dosageForm: prettyName(p.form), administrationRoute: p.route ? prettyName(p.route) : undefined, availableStrength: strength ? { '@type': 'DrugStrength', description: strength } : undefined,
    drugClass: en?.pharmClass?.length ? { '@type': 'DrugClass', name: en.pharmClass[0].replace(/\s*\[EPC\]/, '') } : undefined,
    description: ind ? clip(ind, 300) : undefined, inLanguage: lang === 'fa' ? 'fa-IR' : 'en', identifier: entry.code,
    manufacturer: undefined, offers: { '@type': 'Offer', availability: 'https://schema.org/InStoreOnly', seller: { '@id': 'https://hanpars.com/#organization' } },
  };
  if (nameFa && lang === 'fa') (schema as any).alternateName = nameFa;
  return { title, description, schema, name, nameFa };
}

export function moleculeSeo(slug: string, mol: any, lang: 'en' | 'fa', faDesc: string) {
  const pretty = (n: string) => /[a-z]/.test(n) ? n : n.charAt(0) + n.slice(1).toLowerCase().replace(/\bhcl\b/g, 'HCl');
  const name = pretty(mol.name);
  const nameFa = faName(name);
  const title = lang === 'fa'
    ? `${nameFa ? nameFa + ' — ' : ''}${name}${mol.cas ? ' (CAS ' + mol.cas + ')' : ''} | مادهٔ مؤثرهٔ دارویی — تأمین API | هانیا پرسان دارو`
    : `${name}${mol.cas ? ' (CAS ' + mol.cas + ')' : ''} | API supply | Hanpars`;
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
  return { title, description, schema, name, nameFa };
}
