/** Turkish vocabulary for SEO titles and descriptions of product pages (Turkish KÜB dosage-form terms). */
export const FORM_TR: Record<string, string> = {
  INJECTION: 'enjeksiyonluk', INJECTABLE: 'enjeksiyonluk', TABLET: 'tablet', CAPSULE: 'kapsül', SOLUTION: 'çözelti', POWDER: 'toz', CREAM: 'krem',
  SUSPENSION: 'süspansiyon', SYRUP: 'şurup', SPRAY: 'sprey', OINTMENT: 'merhem', GEL: 'jel', SUPPOSITORY: 'süpozituvar', AEROSOL: 'aerosol',
  LOTION: 'losyon', INHALANT: 'inhalasyon preparatı', GRANULE: 'granül', GRANULES: 'granül', SHAMPOO: 'şampuan', PATCH: 'flaster', GAS: 'tıbbi gaz',
  ENEMA: 'lavman', ELIXIR: 'eliksir', TINCTURE: 'tentür', SOAP: 'sabun', MOUTHWASH: 'gargara', IMPLANT: 'implant', DISC: 'inhalasyon diski',
  PLASTER: 'flaster', KIT: 'kit', LOZENGE: 'pastil', LIQUID: 'sıvı', STICK: 'stik', 'NAIL LACQUER': 'tırnak cilası', CONCENTRATE: 'konsantre',
  EMULSION: 'emülsiyon', OIL: 'yağ', GUM: 'sakız', DOUCHE: 'vajinal duş', INSERT: 'insert', PASTE: 'macun', DROPS: 'damla', FILM: 'film',
};
export const ROUTE_TR: Record<string, string> = {
  ORAL: 'oral', PARENTERAL: 'parenteral', TOPICAL: 'topikal', RESPIRATORY: 'solunum yolu', OPHTHALMIC: 'oftalmik', OTIC: 'otik', NASAL: 'nazal',
  RECTAL: 'rektal', VAGINAL: 'vajinal', TRANSDERMAL: 'transdermal', SUBLINGUAL: 'sublingual', BUCCAL: 'bukkal', INTRAVESICAL: 'intravezikal',
  DENTAL: 'dental', INHALATION: 'inhalasyon', INTRATHECAL: 'intratekal', INTRAVITREAL: 'intravitreal', CUTANEOUS: 'kutanöz', URETHRAL: 'üretral',
  IRRIGATION: 'irigasyon', HEMODIALYSIS: 'hemodiyaliz', INTRAMUSCULAR: 'intramüsküler', INTRAVENOUS: 'intravenöz', SUBCUTANEOUS: 'subkutan',
  INTRAPERITONEAL: 'intraperitoneal', ENDOTRACHEAL: 'endotrakeal', INTRADERMAL: 'intradermal', 'INTRA-ARTICULAR': 'intraartiküler',
};
export function formTr(form: string, route = ''): string {
  const f = form.toUpperCase(); const r = route.toUpperCase();
  const head = Object.keys(FORM_TR).sort((a, b) => b.length - a.length).find(k => f.startsWith(k));
  let out = head ? FORM_TR[head] : '';
  const inh = r === 'RESPIRATORY' || r === 'INHALATION';
  const lyo = /LYOPHILI[SZ]/.test(f) ? 'liyofilize ' : '';
  // TİTCK / KÜB pharmaceutical-form names ("enjeksiyonluk çözelti için toz", "göz damlası, çözelti", "burun spreyi" ...).
  if (head === 'INJECTION' || head === 'INJECTABLE') {
    if (/POWDER|LYOPHILI[SZ]/.test(f)) out = /SUSPENSION/.test(f) ? `enjeksiyonluk süspansiyon için ${lyo}toz` : /SOLUTION/.test(f) ? `enjeksiyonluk çözelti için ${lyo}toz` : `enjeksiyonluk ${lyo}toz`;
    else if (/CONCENTRATE/.test(f)) out = 'infüzyonluk çözelti için konsantre';
    else if (/SUSPENSION/.test(f)) out = 'enjeksiyonluk süspansiyon';
    else if (/EMULSION/.test(f)) out = 'enjeksiyonluk emülsiyon';
    else if (/SOLUTION/.test(f)) out = 'enjeksiyonluk çözelti';
    else if (head === 'INJECTION') out = 'enjeksiyon';
  } else if (/DROPS/.test(f)) {
    out = r === 'OPHTHALMIC' ? 'göz damlası' : r === 'OTIC' ? 'kulak damlası' : r === 'NASAL' ? 'burun damlası' : 'oral damla';
    if (/SUSPENSION/.test(f)) out += ', süspansiyon'; else if (/SOLUTION/.test(f)) out += ', çözelti';
  } else if (head === 'POWDER') {
    const oral = r === 'ORAL' ? 'oral ' : '';
    out = inh ? 'inhalasyon tozu' : /SUSPENSION/.test(f) ? `${oral}süspansiyon için ${lyo}toz` : /SOLUTION/.test(f) ? `${oral}çözelti için ${lyo}toz` : `${oral}${lyo}toz`;
  } else if (head === 'SOLUTION' && /CONCENTRATE/.test(f)) {
    out = r === 'HEMODIALYSIS' ? 'hemodiyaliz konsantresi' : 'infüzyonluk çözelti için konsantre';
  } else if (head === 'SOLUTION' || head === 'SUSPENSION') {
    if (r === 'ORAL') out = `oral ${out}`;
    else if (inh) out = head === 'SOLUTION' ? 'inhalasyon çözeltisi' : 'inhalasyon süspansiyonu';
    else if (r === 'OPHTHALMIC') out = `göz damlası, ${out}`;
  } else if (head === 'SPRAY') {
    out = r === 'NASAL' ? 'burun spreyi' : r === 'SUBLINGUAL' ? 'dil altı sprey' : r === 'ORAL' ? 'oral sprey' : inh ? 'inhalasyon spreyi' : r === 'TOPICAL' || r === 'CUTANEOUS' ? 'kutanöz sprey' : out;
  } else if (head === 'AEROSOL') {
    out = /FOAM/.test(f) ? (r === 'RECTAL' ? 'rektal köpük' : 'kutanöz köpük') : inh ? 'inhalasyon aerosolü' : out;
  } else if (head === 'SUPPOSITORY') {
    out = r === 'VAGINAL' ? 'vajinal ovül' : 'rektal süpozituvar';
  } else if (head === 'OINTMENT' && r === 'OPHTHALMIC') out = 'göz merhemi';
  else if (head === 'GEL' && r === 'OPHTHALMIC') out = 'göz jeli';
  else if ((head === 'CREAM' || head === 'GEL') && r === 'VAGINAL') out = `vajinal ${out}`;
  else if (head === 'TABLET' && r === 'VAGINAL') out = 'vajinal tablet';
  else if (head === 'TABLET' && r === 'SUBLINGUAL') out = 'dil altı tablet';
  else if (head === 'CAPSULE' && inh) out = 'inhalasyon tozu içeren kapsül';
  else if (head === 'CAPSULE' && /LIQUID FILLED/.test(f)) out = 'yumuşak kapsül';
  else if (head === 'PATCH') out = r === 'TRANSDERMAL' ? 'transdermal flaster' : 'flaster';
  if (head === 'TABLET' && /CHEWABLE/.test(f)) out = 'çiğneme tableti';
  const mods: string[] = [];
  if (/PREFILLED|SYRINGE/.test(f)) mods.push('kullanıma hazır dolu enjektörde');
  if (/FILM COATED/.test(f)) mods.push('film kaplı');
  else if (head === 'TABLET' && /\bCOATED\b/.test(f)) mods.push('kaplı');
  if (/EXTENDED RELEASE|PROLONGED|SUSTAINED/.test(f)) mods.push('uzatılmış salımlı');
  if (/DELAYED RELEASE|ENTERIC/.test(f)) mods.push('gastro-rezistan');
  if (/ORALLY DISINTEGRATING|ORODISPERSIBLE/.test(f)) mods.push('ağızda dağılan');
  if (/EFFERVESCENT/.test(f)) mods.push('efervesan');
  if (lyo && !out.includes('liyofilize')) mods.push('liyofilize');
  if (/LIPOSOMAL/.test(f)) mods.push('lipozomal');
  return [...mods, out].join(' ').trim();
}
