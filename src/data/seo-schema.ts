import { parseFdf, infoKey, prettyName, labelUsable } from './fdf-parse';
import fdfAll from './fdf.json';
import editorialAll from './fdf-editorial.json';
import { formL, ROUTE_L, locName } from './locale';
import { hreflangOf, type Lang } from '../i18n';
export const faName = (en: string) => locName('fa', en).trim();

const clip = (s: string, n: number) => { const t = s.replace(/\s+/g, ' ').trim(); return t.length <= n ? t : t.slice(0, t.lastIndexOf(' ', n)) + '…'; };

export function productSeo(entry: { name: string; code: string }, lang: Lang, info: Record<string, any>, infoFa: Record<string, any>) {
  const p = parseFdf(entry.name);
  const name = prettyName(p.ingredient);
  const strength = p.strength.replace(/\bug\b/g, 'µg');
  const keys = p.ingredients.length > 1 ? [p.ingredients.map(i => infoKey(i)).sort().join(' + ')] : [infoKey(p.ingredient)];
  const key = keys.find(k => labelUsable(k, info[k], p));
  const edAll = editorialAll as Record<string, any>;
  const edKey = keys[0];
  const en = key ? info[key] : (edAll[edKey]?.en || null);
  const fa = lang === 'en' ? null : key ? infoFa[key] : (edAll[edKey]?.[lang] || null);
  const fForm = lang === 'en' ? '' : formL[lang](p.form, p.route);
  const fRouteRaw = lang === 'en' ? '' : (ROUTE_L[lang][p.route] || '');
  const fRoute = lang === 'tr' || fForm.includes(fRouteRaw) ? '' : fRouteRaw;  // Turkish KÜB form names already carry the route
  const nameFa = (lang === 'tr' ? ((x: string) => x.charAt(0).toLocaleUpperCase('tr') + x.slice(1)) : (x: string) => x)(locName(lang, name).trim());
  const fFormShort = fForm || prettyName(p.form).split(',')[0];
  const eForm = prettyName(p.form).split(',')[0];
  const dupe = duplicateInfo(entry);
  const extraFa = dupe.pack && p.pack ? ' ' + p.pack : ''; const extraEn = extraFa;
  const codeFa = dupe.code ? ` کد ${entry.code}` : ''; const codeEn = dupe.code ? ` (code ${entry.code})` : '';
  const pick = (c: string[]) => c.find(x => x.length <= 66) || c[c.length - 1];
  const core = `${nameFa || name} ${fFormShort}${strength ? ' ' + strength : ''}${extraFa}${codeFa}`.replace(/\s+/g, ' ').trim();
  const coreEn = `${name} ${eForm}${strength ? ' ' + strength : ''}${extraEn}${codeEn}`.replace(/\s+/g, ' ').trim();
  const sz = strength ? ' ' + strength : '';
  const title = lang === 'zh'
    ? pick([nameFa ? `${nameFa}（${name}）${fFormShort}${sz}${extraFa}${dupe.code ? ' 编号' + entry.code : ''} | 伊朗供应 | Hanpars` : '', `${nameFa || name} ${fFormShort}${sz}${extraFa}${dupe.code ? ' 编号' + entry.code : ''} | Hanpars`].filter(Boolean))
    : lang === 'tr'
    ? pick([`${nameFa || name} ${fFormShort}${sz}${extraFa}${dupe.code ? ' kod ' + entry.code : ''} | İran tedarikçisi | Hanpars`, `${nameFa || name} ${fFormShort}${sz}${extraFa}${dupe.code ? ' kod ' + entry.code : ''} | Hanpars`, `${nameFa || name} ${fFormShort}${sz}`])
    : lang === 'fa'
    ? pick([nameFa ? `${nameFa} (${name}) ${fFormShort}${strength ? ' ' + strength : ''}${extraFa}${codeFa} | هانیا پرسان دارو` : '', `${core} | تأمین و واردات | هانیا پرسان دارو`, `${core} | هانیا پرسان دارو`, `${core} | تأمین و واردات`, core].filter(Boolean))
    : pick([`${coreEn} | Supplier in Iran | Hanpars`, `${coreEn} | Hanpars`, coreEn]);
  const ind0 = lang === 'en' ? (en?.indications || '') : (fa?.indications || en?.indications || '');
  const ind = ind0.replace(/^\s*(موارد مصرف|适应症|Endikasyonlar|Indications(?: and usage)?)\s*[:：]\s*/i, '');
  const description = lang === 'zh'
    ? clip(`${nameFa ? nameFa + '（' + name + '）' : name}，编号 ${entry.code}，${fForm}${fRoute ? ' ' + fRoute : ''}${strength ? '，' + strength : ''}${p.pack ? '，' + p.pack : ''}。${ind ? '适应症：' + ind + ' ' : ''}Hanpars 负责伊朗市场的采购与进口。`, 110)
    : lang === 'tr'
    ? clip(`${nameFa ? nameFa + ' (' + name + ')' : name}, kod ${entry.code}, ${fForm}${fRoute ? ' ' + fRoute : ''}${strength ? ', ' + strength : ''}${p.pack ? ', ' + p.pack : ''}. ${ind ? 'Endikasyonlar: ' + ind + ' ' : ''}İran’da tedarik ve ithalat: Hanpars.`, 158)
    : lang === 'fa'
    ? clip(`${nameFa ? nameFa + ' (' + name + ')' : name}، کد ${entry.code}، ${fForm}${fRoute ? ' ' + fRoute : ''}${strength ? '، ' + strength : ''}${p.pack ? '، ' + p.pack : ''}. ${ind ? 'موارد مصرف: ' + ind + ' ' : ''}تأمین و واردات توسط هانیا پرسان دارو.`, 158)
    : clip(`${name} (code ${entry.code}) ${prettyName(p.form)}${strength ? ' ' + strength : ''}${p.pack ? ', ' + p.pack : ''}. ${ind ? 'Indications: ' + ind + ' ' : ''}Sourcing and import in Iran by Hanpars.`, 158);
  const nl = nameFa || name;
  const keywords = lang === 'zh'
    ? [nameFa, name, `${nl}${fFormShort}`, `${nl}供应商`, `${nl}出口伊朗`, `伊朗${nl}进口`, `${nl} ${strength}`, '伊朗药品进口', '伊朗药品注册', 'Hanpars'].filter(Boolean).join('，')
    : lang === 'tr'
    ? [nameFa, name, `${nl} ${fFormShort}`, `${nl} tedarikçisi`, `${nl} İran ihracatı`, `${nl} ${strength}`, 'İran’a ilaç ihracatı', 'İran ilaç ithalatı', 'Hanpars'].filter(Boolean).join(', ')
    : lang === 'fa'
    ? [nameFa, name, `${nameFa || name} ${fFormShort}`, `خرید ${nameFa || name}`, `قیمت ${nameFa || name}`, `واردات ${nameFa || name}`, `تأمین ${nameFa || name}`, `${nameFa || name} ${strength}`, `داروی ${nameFa || name}`, `${nameFa || name} خارجی`, `${nameFa || name} اصل`, `موارد مصرف ${nameFa || name}`, `عوارض ${nameFa || name}`, `${name} ${fFormShort}`, 'واردات دارو', 'داروی خارجی', 'داروی فوریتی', 'لیست داروهای وارداتی', 'هانیا پرسان دارو'].filter(Boolean).join('، ')
    : [name, `${name} ${eForm}`, `${name} ${strength}`, `${name} supplier`, `${name} import Iran`, `buy ${name}`, 'pharmaceutical importer Iran', 'Hanpars'].join(', ');
  // Not typed as Drug/Product: schema.org Drug is a Product subtype, and Google then demands a price, ratings and
  // reviews (product snippets). Hanpars publishes no prices, so the page is described as a medical page about the medicine.
  const drugName = `${name} ${prettyName(p.form)}${strength ? ' ' + strength : ''}`;
  const facts = [prettyName(p.form), p.route ? prettyName(p.route) : '', strength, en?.pharmClass?.length ? (Array.isArray(en.pharmClass) ? en.pharmClass[0] : en.pharmClass).replace(/\s*\[EPC\]/, '') : ''].filter(Boolean).join(' · ');
  const schema = {
    '@context': 'https://schema.org', '@type': 'MedicalWebPage', name: drugName, inLanguage: hreflangOf[lang],
    description: ind ? clip(ind, 300) : undefined, publisher: { '@id': 'https://hanpars.com/#organization' },
    about: {
      '@type': 'MedicalEntity', additionalType: 'https://schema.org/Drug', name: drugName, identifier: entry.code,
      description: facts || undefined,
      code: { '@type': 'MedicalCode', codeValue: entry.code, codingSystem: 'Iran drug list' },
    },
    mentions: p.ingredients.map(i => ({ '@type': 'ChemicalSubstance', name: prettyName(i) })),
  };
  if (nameFa && lang !== 'en') (schema.about as any).alternateName = nameFa;
  return { title, description, schema, name, nameFa, keywords };
}

export function moleculeSeo(slug: string, mol: any, lang: Lang, faDesc: string) {
  const pretty = (n: string) => /[a-z]/.test(n) ? n : n.charAt(0) + n.slice(1).toLowerCase().replace(/\bhcl\b/g, 'HCl');
  const name = pretty(mol.name);
  const nameFa = (lang === 'tr' ? ((x: string) => x.charAt(0).toLocaleUpperCase('tr') + x.slice(1)) : (x: string) => x)(locName(lang, name).trim() || locName(lang, mol.name).trim());
  const pick = (c: string[]) => c.find(x => x.length <= 66) || c[c.length - 1];
  const cas = mol.cas ? ` CAS ${mol.cas}` : '';
  const title = lang === 'zh'
    ? pick([nameFa ? `${nameFa}（${name}）${cas} | 原料药供应 | Hanpars` : '', `${nameFa || name}${cas} | 原料药 | Hanpars`, `${nameFa || name}${cas}`].filter(Boolean))
    : lang === 'tr'
    ? pick([nameFa && nameFa.toLowerCase() !== name.toLowerCase() ? `${nameFa} (${name})${cas} | Hanpars` : '', `${nameFa || name}${cas} | Etkin madde tedariki | Hanpars`, `${nameFa || name}${cas} | Hanpars`, `${nameFa || name}${cas}`].filter(Boolean))
    : lang === 'fa'
    ? pick([nameFa ? `${nameFa} (${name})${cas} | تأمین API | هانیا پرسان دارو` : '', nameFa ? `${nameFa} (${name})${cas} | تأمین API` : '', `${nameFa || name}${cas} | مادهٔ مؤثره | هانیا پرسان دارو`, `${nameFa || name}${cas} | تأمین API`, `${nameFa || name}${cas}`].filter(Boolean))
    : pick([`${name}${cas ? ' (' + cas.trim() + ')' : ''} | API supplier | Hanpars`, `${name}${cas ? ' (' + cas.trim() + ')' : ''} | Hanpars`, `${name}${cas ? ' (' + cas.trim() + ')' : ''}`]);
  const keywords = lang === 'zh'
    ? [nameFa, name, mol.cas, `${nameFa || name}原料药`, `${nameFa || name}原料药供应商`, `${nameFa || name} CAS ${mol.cas || ''}`.trim(), `${nameFa || name}出口伊朗`, '原料药出口伊朗', 'Hanpars'].filter(Boolean).join('，')
    : lang === 'tr'
    ? [nameFa, name, mol.cas, `${nameFa || name} etkin madde`, `${nameFa || name} tedarikçisi`, `${nameFa || name} CAS ${mol.cas || ''}`.trim(), 'İran’a hammadde ihracatı', 'Hanpars'].filter(Boolean).join(', ')
    : lang === 'fa'
    ? [nameFa, name, mol.cas, `خرید ${nameFa || name}`, `قیمت ${nameFa || name}`, `ماده اولیه ${nameFa || name}`, `پودر ${nameFa || name}`, `API ${name}`, `${name} powder`, `واردات ${nameFa || name}`, `مادهٔ مؤثرهٔ ${nameFa || name}`, `${nameFa || name} CAS`, 'مواد اولیه دارویی', 'واردات مواد اولیه', 'تأمین API', 'هانیا پرسان دارو'].filter(Boolean).join('، ')
    : [name, mol.cas, `${name} API`, `${name} API supplier`, `${name} powder`, `${name} CAS ${mol.cas || ''}`.trim(), `${name} manufacturer`, 'API supplier Iran', 'Hanpars'].filter(Boolean).join(', ');
  // head + (first sentence of the description, only if it fits whole) + sourcing line — never cut mid-sentence
  const compose = (head: string, d: string, tail: string, n: number, sp = ' ') => {
    const first = (d || '').replace(/\s+/g, ' ').trim().match(/^.*?[.。!?](?=\s|$)/)?.[0] || '';
    const withD = `${head}${sp}${first}${sp}${tail}`.replace(/\s+/g, ' ').trim();
    if (first && withD.length <= n) return withD;
    const plain = `${head}${sp}${tail}`.trim();
    return plain.length <= n ? plain : clip(plain, n);
  };
  const description = lang === 'zh'
    ? compose(`${nameFa ? nameFa + '（' + name + '）' : name}${mol.cas ? '，CAS 号 ' + mol.cas : ''}${mol.formula ? '，分子式 ' + mol.formula : ''}。`, faDesc, 'Hanpars 提供附 DMF/CEP 和 GMP 文件的原料药供应。', 120, '')
    : lang === 'tr'
    ? compose(`${nameFa ? nameFa + ' (' + name + ')' : name}${mol.cas ? ', CAS ' + mol.cas : ''}${mol.formula ? ', ' + mol.formula : ''}.`, faDesc, 'DMF/CEP ve GMP belgeli etkin madde tedariki: Hanpars.', 160)
    : lang === 'fa'
    ? compose(`${nameFa ? nameFa + ' (' + name + ')' : name}${mol.cas ? '، شمارهٔ CAS ' + mol.cas : ''}${mol.formula ? '، فرمول ' + mol.formula : ''}.`, faDesc, 'تأمین مادهٔ مؤثره (API) با مستندات DMF/CEP و GMP توسط هانیا پرسان دارو.', 160)
    : compose(`${name}${mol.cas ? ', CAS ' + mol.cas : ''}${mol.formula ? ', ' + mol.formula : ''}.`, mol.description, 'API sourcing with DMF/CEP and GMP documentation by Hanpars.', 160);
  const schema = mol.cid ? {
    '@context': 'https://schema.org', '@type': 'ChemicalSubstance', name, identifier: mol.cas || undefined,
    alternateName: [...(nameFa ? [nameFa] : []), ...(mol.synonyms || []).slice(0, 5)], molecularFormula: mol.formula || undefined, molecularWeight: mol.mw ? `${mol.mw} g/mol` : undefined,
    iupacName: mol.iupac || undefined, inChIKey: mol.inchikey || undefined, image: mol.image ? `https://hanpars.com${mol.image}` : undefined,
    description: (lang !== 'en' && faDesc ? faDesc : mol.description) ? clip(lang !== 'en' && faDesc ? faDesc : mol.description, 300) : undefined,
    sameAs: [`https://pubchem.ncbi.nlm.nih.gov/compound/${mol.cid}`], inLanguage: lang !== 'en' && faDesc ? hreflangOf[lang] : 'en',
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
