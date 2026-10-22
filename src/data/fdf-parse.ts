/** Parse the finished-product list strings ("INGREDIENT (AS SALT) FORM ROUTE STRENGTH VOLUME") into fields. */
const FORMS = ['NAIL LACQUER','SOLUTION/DROPS','SOAP','DOUCHE','STICK','DISC','GAS','LACQUER','INJECTABLE','INHALANT','TABLET','CAPSULE','INJECTION','POWDER','SOLUTION','SUSPENSION','SYRUP','CREAM','OINTMENT','GEL','DROPS','SPRAY','INHALER','AEROSOL','PATCH','SUPPOSITORY','EMULSION','LOTION','GRANULES','GRANULE','SACHET','KIT','IMPLANT','FILM','LOZENGE','PESSARY','ENEMA','CONCENTRATE','LIQUID','ELIXIR','SHAMPOO','FOAM','PASTE','INSERT','RING','DEVICE','VIAL','AMPOULE','PEN','CARTRIDGE','DISPERSION','PELLET','SYSTEM','STRIP','SWAB','LYOPHILISATE','MOUTHWASH','PLASTER','OIL','WAFER','GUM','BAR','SPONGE','TINCTURE','CHEWABLE','EFFERVESCENT','ORODISPERSIBLE','BAG','BOTTLE'];
const ROUTES = ['NOT APPLICABLE','AURICULAR \\(OTIC\\)','INTRAPERITONEAL','ENDOTRACHEAL','TRANSTRACHEAL','INTRADERMAL','PERCUTANEOUS','INTRASPINAL','INTRAEPIDERMAL','INTRACAVITARY','INTRA-ARTICULAR','EPIDURAL','INTRAOCULAR','INTRACAVERNOUS','INTRALESIONAL','INTRAUTERINE','PERIODONTAL','EXTRACORPOREAL','INFILTRATION','ORAL','PARENTERAL','TOPICAL','RESPIRATORY','OPHTHALMIC','OTIC','NASAL','RECTAL','VAGINAL','TRANSDERMAL','SUBLINGUAL','BUCCAL','INTRAVESICAL','DENTAL','INHALATION','INTRATHECAL','INTRAVITREAL','CUTANEOUS','URETHRAL','IRRIGATION','HEMODIALYSIS','INTRAMUSCULAR','INTRAVENOUS','SUBCUTANEOUS'];
const formRe = new RegExp('\\b(' + FORMS.join('|').replace(/\//g, '\\/') + ')\\b');
const routeRe = new RegExp('\\b(' + ROUTES.join('|') + ')\\b');

export type Parsed = { ingredient: string; ingredients: string[]; salt: string; form: string; route: string; strength: string; pack: string };

export function parseFdf(name: string): Parsed {
  const m = formRe.exec(name);
  const ingredientRaw = (m ? name.slice(0, m.index) : name).trim().replace(/,$/, '');
  const rest = m ? name.slice(m.index) : '';
  const r = routeRe.exec(rest);
  const form = (r ? rest.slice(0, r.index) : (rest.search(/\s\d/) >= 0 ? rest.slice(0, rest.search(/\s\d/)) : rest)).trim().replace(/,$/, '');
  const route = r ? r[1] : '';
  const firstNum = rest.search(/\s\d/);
  const after = r ? rest.slice(r.index + r[1].length).trim() : (firstNum >= 0 ? rest.slice(firstNum).trim() : '');
  // strength = number+unit groups joined by '/', pack = what follows (e.g. "100 mL")
  const norm = after.replace(/\[iU\]/gi, 'IU').replace(/\[PFU\]/gi, 'PFU').replace(/\{puff\}/gi, 'puff').replace(/\{dose\}/gi, 'dose').replace(/\{([^}]+)\}/g, '$1').replace(/\bmeq\b/g, 'mEq').replace(/\bug\b/g, 'µg');
  const U = '(?:mg|mcg|µg|kg|g|IU|PFU|%|units?|U|TU|MIU|mmol|mEq|mCi|MBq|GBq|mL|L|dose|puff|actuation|cells|cm2?|h)';
  const sm = new RegExp('^((?:[\\d.,]+\\s?' + U + ')(?:\\s?\\/\\s?(?:[\\d.,]*\\s?' + U + '))*)\\s*(.*)$', 'i').exec(norm);
  const strength = sm ? sm[1].replace(/\s?\/\s?/g, '/').trim() : norm;
  const pack = sm ? sm[2].trim() : '';
  const salt = (/\(AS ([^)]+)\)/i.exec(ingredientRaw) || [, ''])[1] || '';
  const ingredient = ingredientRaw.replace(/\(AS [^)]+\)/gi, '').replace(/\s+/g, ' ').trim();
  const ingredients = ingredient.split(/\s*\/\s*|\s+\+\s+/).map(s => s.trim()).filter(Boolean);
  return { ingredient, ingredients, salt, form, route, strength, pack };
}

export function slugify(s: string): string {
  return s.normalize('NFKD').replace(/[^\x00-\x7F]/g, '').replace(/[^a-zA-Z0-9]+/g, '-').replace(/^-|-$/g, '').toLowerCase();
}

export function fdfSlug(entry: { name: string; code: string }): string {
  const p = parseFdf(entry.name);
  return `${slugify(p.ingredient).slice(0, 60)}-${entry.code}`;
}

/** Key used to look up label information: first ingredient, salts stripped, lower case. */
export function infoKey(ingredient: string): string {
  const k = ingredient.toLowerCase()
    .replace(/\(.*?\)/g, '')
    .replace(/\b(sodium|potassium|calcium|magnesium|hydrochloride|dihydrochloride|hydrobromide|mesylate|mesilate|maleate|fumarate|tartrate|bitartrate|succinate|citrate|acetate|sulfate|sulphate|phosphate|besylate|besilate|tosylate|monohydrate|dihydrate|trihydrate|anhydrous|disodium|bromide|chloride|nitrate|lactate|gluconate|pamoate|decanoate|palmitate|valerate|propionate|benzoate|hyclate|xinafoate|furoate|axetil|proxetil|pivoxil|medoxomil|etexilate|alafenamide|disoproxil|malate|camsylate|oxalate|trometamol|tromethamine|meglumine|dimaleate|hydrate|liposome|liposomal|pegylated|human|recombinant)\b/g, '')
    .replace(/[^a-z]+/g, ' ').trim();
  return k || ingredient.toLowerCase().replace(/[^a-z]+/g, ' ').trim();
}

export function prettyName(s: string): string {
  return s.toLowerCase().replace(/(^|[\s(/])([a-z])/g, (m, a, b) => a + b.toUpperCase())
    .replace(/\bMg\b/g, 'mg').replace(/\bMcg\b/g, 'mcg').replace(/\bMl\b/g, 'mL').replace(/\bIu\b/g, 'IU').replace(/\bAs\b/g, 'as').replace(/\bFor\b/g, 'for').replace(/\bOf\b/g, 'of').replace(/\bAnd\b/g, 'and');
}

/** Built once per build: infoKey(ingredient) -> entries. */
let _index: Map<string, { name: string; code: string }[]> | null = null;
export function sameIngredientIndex(all: { name: string; code: string }[]) {
  if (_index) return _index;
  _index = new Map();
  for (const e of all) {
    const k = infoKey(parseFdf(e.name).ingredient);
    const arr = _index.get(k); if (arr) arr.push(e); else _index.set(k, [e]);
  }
  return _index;
}
