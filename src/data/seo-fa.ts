/** Persian vocabulary for SEO titles and descriptions of product pages. */
export const FORM_FA: Record<string, string> = {
  INJECTION: 'تزریقی', INJECTABLE: 'تزریقی', TABLET: 'قرص', CAPSULE: 'کپسول', SOLUTION: 'محلول', POWDER: 'پودر', CREAM: 'کرم',
  SUSPENSION: 'سوسپانسیون', SYRUP: 'شربت', SPRAY: 'اسپری', OINTMENT: 'پماد', GEL: 'ژل', SUPPOSITORY: 'شیاف', AEROSOL: 'آئروسل',
  LOTION: 'لوسیون', INHALANT: 'فرآوردهٔ استنشاقی', GRANULE: 'گرانول', GRANULES: 'گرانول', SHAMPOO: 'شامپو', PATCH: 'چسب پوستی', GAS: 'گاز طبی',
  ENEMA: 'انما', ELIXIR: 'الیکسیر', TINCTURE: 'تنتور', SOAP: 'صابون', MOUTHWASH: 'دهان‌شویه', IMPLANT: 'ایمپلنت', DISC: 'دیسک استنشاقی',
  PLASTER: 'چسب', KIT: 'کیت', LOZENGE: 'قرص مکیدنی', LIQUID: 'مایع', STICK: 'استیک', 'NAIL LACQUER': 'لاک ناخن', CONCENTRATE: 'کنسانتره',
  EMULSION: 'امولسیون', OIL: 'روغن', GUM: 'آدامس', DOUCHE: 'دوش واژینال', INSERT: 'اینسرت', PASTE: 'خمیر', DROPS: 'قطره', FILM: 'فیلم',
};
export const ROUTE_FA: Record<string, string> = {
  ORAL: 'خوراکی', PARENTERAL: 'تزریقی', TOPICAL: 'موضعی', RESPIRATORY: 'استنشاقی', OPHTHALMIC: 'چشمی', OTIC: 'گوشی', NASAL: 'بینی',
  RECTAL: 'رکتال', VAGINAL: 'واژینال', TRANSDERMAL: 'ترانس‌درمال', SUBLINGUAL: 'زیرزبانی', BUCCAL: 'باکال (گونه‌ای)', INTRAVESICAL: 'داخل مثانه',
  DENTAL: 'دندانی', INHALATION: 'استنشاقی', INTRATHECAL: 'داخل نخاعی', INTRAVITREAL: 'داخل زجاجیه', CUTANEOUS: 'پوستی', URETHRAL: 'مجرای ادرار',
  IRRIGATION: 'شست‌وشو', HEMODIALYSIS: 'همودیالیز', INTRAMUSCULAR: 'عضلانی', INTRAVENOUS: 'داخل‌وریدی', SUBCUTANEOUS: 'زیرجلدی',
  INTRAPERITONEAL: 'داخل صفاقی', ENDOTRACHEAL: 'داخل نای', INTRADERMAL: 'داخل جلدی', 'INTRA-ARTICULAR': 'داخل مفصلی',
};
export function formFa(form: string, route = ''): string {
  const f = form.toUpperCase();
  const r = route.toUpperCase();
  const site = /OPHTHALMIC/.test(r) ? 'چشمی' : /OTIC|AURICULAR/.test(r) ? 'گوشی' : /NASAL/.test(r) ? 'بینی' : /^ORAL/.test(r) ? 'خوراکی' : '';
  const sr = /EXTENDED RELEASE|PROLONGED|SUSTAINED/.test(f) ? ' پیوسته‌رهش' : '';
  if (/INJECT/.test(f)) {
    const ly = /LYOPHILI/.test(f) ? ' لیوفیلیزه' : '';
    const base = /POWDER/.test(f) ? `پودر${ly} برای تهیهٔ ${/SUSPENSION/.test(f) ? 'سوسپانسیون' : 'محلول'} تزریقی`
      : /SUSPENSION/.test(f) ? 'سوسپانسیون تزریقی'
      : /EMULSION/.test(f) ? 'امولسیون تزریقی'
      : /CONCENTRATE/.test(f) ? 'محلول غلیظ تزریقی'
      : /LIPOSOMAL/.test(f) ? 'فرآوردهٔ تزریقی لیپوزومی'
      : /SOLUTION/.test(f) ? 'محلول تزریقی'
      : /^OIL/.test(f) ? 'محلول روغنی تزریقی' : 'فرآوردهٔ تزریقی';
    return base + sr + (/PREFILLED|SYRINGE/.test(f) ? ' در سرنگ از پیش پرشده' : '');
  }
  if (/DROPS/.test(f) && site) return `قطرهٔ ${site}${/SUSPENSION/.test(f) ? ' (سوسپانسیون)' : ''}`;
  if (/POWDER|GRANULE|TABLET/.test(f) && /FOR (SOLUTION|SUSPENSION)/.test(f)) return `${/GRANULE/.test(f) ? 'گرانول' : /TABLET/.test(f) ? 'قرص' : 'پودر'} برای تهیهٔ ${/SUSPENSION/.test(f) ? 'سوسپانسیون' : 'محلول'}${site ? ' ' + site : ''}`;
  if (/RESPIRATORY|INHALATION/.test(r) && /AEROSOL|SPRAY/.test(f)) return 'اسپری استنشاقی';
  if (/AEROSOL, FOAM/.test(f)) return 'فوم';
  if (/^TABLET/.test(f)) {
    if (/CHEWABLE/.test(f)) return 'قرص جویدنی';
    if (/ORALLY DISINTEGRATING/.test(f)) return 'قرص دهان‌پاش';
    if (/EFFERVESCENT/.test(f)) return 'قرص جوشان';
    if (/SOLUBLE/.test(f)) return 'قرص محلول';
  }
  const head = Object.keys(FORM_FA).sort((a, b) => b.length - a.length).find(k => f.startsWith(k));
  let out = head ? FORM_FA[head] : '';
  if (/FILM COATED|^TABLET, COATED/.test(f)) out += ' روکش‌دار';
  out += sr;
  if (/DELAYED RELEASE|ENTERIC/.test(f)) out += ' تأخیری‌رهش';
  if (/LIPOSOMAL/.test(f)) out += ' لیپوزومی';
  return out.trim();
}
