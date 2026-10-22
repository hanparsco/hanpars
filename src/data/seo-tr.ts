/** Turkish vocabulary for SEO titles and descriptions of product pages (Turkish KÜB dosage-form terms). */
export const FORM_TR: Record<string, string> = {
  INJECTION: 'enjeksiyonluk', INJECTABLE: 'enjektabl', TABLET: 'tablet', CAPSULE: 'kapsül', SOLUTION: 'çözelti', POWDER: 'toz', CREAM: 'krem',
  SUSPENSION: 'süspansiyon', SYRUP: 'şurup', SPRAY: 'sprey', OINTMENT: 'merhem', GEL: 'jel', SUPPOSITORY: 'fitil', AEROSOL: 'aerosol',
  LOTION: 'losyon', INHALANT: 'inhalasyon preparatı', GRANULE: 'granül', GRANULES: 'granül', SHAMPOO: 'şampuan', PATCH: 'transdermal flaster', GAS: 'tıbbi gaz',
  ENEMA: 'lavman', ELIXIR: 'eliksir', TINCTURE: 'tentür', SOAP: 'sabun', MOUTHWASH: 'gargara', IMPLANT: 'implant', DISC: 'inhalasyon diski',
  PLASTER: 'flaster', KIT: 'kit', LOZENGE: 'pastil', LIQUID: 'sıvı', STICK: 'stik', 'NAIL LACQUER': 'oje (tırnak cilası)', CONCENTRATE: 'konsantre',
  EMULSION: 'emülsiyon', OIL: 'yağ', GUM: 'sakız', DOUCHE: 'vajinal duş', INSERT: 'insert', PASTE: 'macun', DROPS: 'damla', FILM: 'film',
};
export const ROUTE_TR: Record<string, string> = {
  ORAL: 'oral', PARENTERAL: 'parenteral', TOPICAL: 'topikal', RESPIRATORY: 'solunum yolu', OPHTHALMIC: 'oftalmik', OTIC: 'otik', NASAL: 'nazal',
  RECTAL: 'rektal', VAGINAL: 'vajinal', TRANSDERMAL: 'transdermal', SUBLINGUAL: 'sublingual', BUCCAL: 'bukkal', INTRAVESICAL: 'intravezikal',
  DENTAL: 'dental', INHALATION: 'inhalasyon', INTRATHECAL: 'intratekal', INTRAVITREAL: 'intravitreal', CUTANEOUS: 'kutanöz', URETHRAL: 'üretral',
  IRRIGATION: 'irigasyon', HEMODIALYSIS: 'hemodiyaliz', INTRAMUSCULAR: 'intramüsküler', INTRAVENOUS: 'intravenöz', SUBCUTANEOUS: 'subkutan',
  INTRAPERITONEAL: 'intraperitoneal', ENDOTRACHEAL: 'endotrakeal', INTRADERMAL: 'intradermal', 'INTRA-ARTICULAR': 'intraartiküler',
};
export function formTr(form: string): string {
  const f = form.toUpperCase();
  const head = Object.keys(FORM_TR).sort((a, b) => b.length - a.length).find(k => f.startsWith(k));
  let out = head ? FORM_TR[head] : '';
  // KÜB wording: an injection form is named by its pharmaceutical form ("enjeksiyonluk çözelti", "enjeksiyonluk toz").
  if (head === 'INJECTION' || head === 'INJECTABLE') {
    if (/POWDER/.test(f)) out = 'enjeksiyonluk toz';
    else if (/SUSPENSION/.test(f)) out = 'enjeksiyonluk süspansiyon';
    else if (/EMULSION/.test(f)) out = 'enjeksiyonluk emülsiyon';
    else if (/SOLUTION/.test(f)) out = 'enjeksiyonluk çözelti';
    else if (head === 'INJECTION') out = 'enjeksiyon';
  }
  const mods: string[] = [];
  if (/FILM COATED/.test(f)) mods.push('film kaplı');
  if (/EXTENDED RELEASE|PROLONGED|SUSTAINED/.test(f)) mods.push('uzatılmış salımlı');
  if (/DELAYED RELEASE|ENTERIC/.test(f)) mods.push('gastro-rezistan');
  if (/ORALLY DISINTEGRATING/.test(f)) mods.push('ağızda dağılan');
  if (/EFFERVESCENT/.test(f)) mods.push('efervesan');
  if (/LYOPHILIZED/.test(f)) mods.push('liyofilize');
  if (/LIPOSOMAL/.test(f)) mods.push('lipozomal');
  if (/PREFILLED|SYRINGE/.test(f)) mods.push('dolu enjektör');
  return [...mods, out].join(' ').trim();
}
