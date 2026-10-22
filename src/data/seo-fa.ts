/** Persian vocabulary for SEO titles and descriptions of product pages. */
export const FORM_FA: Record<string, string> = {
  INJECTION: 'تزریقی', INJECTABLE: 'تزریقی', TABLET: 'قرص', CAPSULE: 'کپسول', SOLUTION: 'محلول', POWDER: 'پودر', CREAM: 'کرم',
  SUSPENSION: 'سوسپانسیون', SYRUP: 'شربت', SPRAY: 'اسپری', OINTMENT: 'پماد', GEL: 'ژل', SUPPOSITORY: 'شیاف', AEROSOL: 'افشانه',
  LOTION: 'لوسیون', INHALANT: 'استنشاقی', GRANULE: 'گرانول', GRANULES: 'گرانول', SHAMPOO: 'شامپو', PATCH: 'چسب پوستی', GAS: 'گاز طبی',
  ENEMA: 'انما', ELIXIR: 'الیکسیر', TINCTURE: 'تنتور', SOAP: 'صابون', MOUTHWASH: 'دهان‌شویه', IMPLANT: 'ایمپلنت', DISC: 'دیسک استنشاقی',
  PLASTER: 'چسب', KIT: 'کیت', LOZENGE: 'قرص مکیدنی', LIQUID: 'مایع', STICK: 'استیک', 'NAIL LACQUER': 'لاک ناخن', CONCENTRATE: 'کنسانتره',
  EMULSION: 'امولسیون', OIL: 'روغن', GUM: 'آدامس', DOUCHE: 'دوش واژینال', INSERT: 'اینسرت', PASTE: 'خمیر', DROPS: 'قطره', FILM: 'فیلم',
};
export const ROUTE_FA: Record<string, string> = {
  ORAL: 'خوراکی', PARENTERAL: 'تزریقی', TOPICAL: 'موضعی', RESPIRATORY: 'تنفسی', OPHTHALMIC: 'چشمی', OTIC: 'گوشی', NASAL: 'بینی',
  RECTAL: 'رکتال', VAGINAL: 'واژینال', TRANSDERMAL: 'پوستی', SUBLINGUAL: 'زیرزبانی', BUCCAL: 'دهانی', INTRAVESICAL: 'داخل مثانه',
  DENTAL: 'دندانی', INHALATION: 'استنشاقی', INTRATHECAL: 'داخل نخاعی', INTRAVITREAL: 'داخل زجاجیه', CUTANEOUS: 'پوستی', URETHRAL: 'مجرای ادرار',
  IRRIGATION: 'شستشو', HEMODIALYSIS: 'همودیالیز', INTRAMUSCULAR: 'عضلانی', INTRAVENOUS: 'وریدی', SUBCUTANEOUS: 'زیرجلدی',
  INTRAPERITONEAL: 'داخل صفاقی', ENDOTRACHEAL: 'داخل نای', INTRADERMAL: 'داخل جلدی', 'INTRA-ARTICULAR': 'داخل مفصلی',
};
export function formFa(form: string): string {
  const head = Object.keys(FORM_FA).sort((a, b) => b.length - a.length).find(k => form.toUpperCase().startsWith(k));
  let out = head ? FORM_FA[head] : '';
  const f = form.toUpperCase();
  if (/FILM COATED/.test(f)) out += ' روکش‌دار';
  if (/EXTENDED RELEASE|PROLONGED|SUSTAINED/.test(f)) out += ' پیوسته‌رهش';
  if (/DELAYED RELEASE|ENTERIC/.test(f)) out += ' تأخیری';
  if (/ORALLY DISINTEGRATING/.test(f)) out += ' بازشونده در دهان';
  if (/EFFERVESCENT/.test(f)) out += ' جوشان';
  if (/LYOPHILIZED/.test(f)) out += ' لیوفیلیزه';
  if (/LIPOSOMAL/.test(f)) out += ' لیپوزومی';
  if (/PREFILLED|SYRINGE/.test(f)) out += ' سرنگ آماده';
  return out.trim();
}
