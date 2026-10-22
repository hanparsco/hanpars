/** Simplified Chinese vocabulary for SEO titles and descriptions of product pages. */
export const FORM_ZH: Record<string, string> = {
  INJECTION: '注射液', INJECTABLE: '注射剂', TABLET: '片', CAPSULE: '胶囊', SOLUTION: '溶液', POWDER: '粉剂', CREAM: '乳膏',
  SUSPENSION: '混悬液', SYRUP: '糖浆', SPRAY: '喷雾剂', OINTMENT: '软膏', GEL: '凝胶', SUPPOSITORY: '栓剂', AEROSOL: '气雾剂',
  LOTION: '洗剂', INHALANT: '吸入剂', GRANULE: '颗粒', GRANULES: '颗粒', SHAMPOO: '洗发剂', PATCH: '贴剂', GAS: '医用气体',
  ENEMA: '灌肠剂', ELIXIR: '酏剂', TINCTURE: '酊剂', SOAP: '皂', MOUTHWASH: '漱口水', IMPLANT: '植入剂', DISC: '吸入盘',
  PLASTER: '贴膏', KIT: '药盒', LOZENGE: '含片', LIQUID: '液体', STICK: '棒剂', 'NAIL LACQUER': '甲用涂剂', CONCENTRATE: '浓缩液',
  EMULSION: '乳剂', OIL: '油剂', GUM: '口香糖剂', DOUCHE: '阴道冲洗剂', INSERT: '植入片', PASTE: '糊剂', DROPS: '滴剂', FILM: '膜剂',
};
export const ROUTE_ZH: Record<string, string> = {
  ORAL: '口服', PARENTERAL: '注射给药', TOPICAL: '外用', RESPIRATORY: '呼吸道给药', OPHTHALMIC: '眼用', OTIC: '耳用', NASAL: '鼻用',
  RECTAL: '直肠给药', VAGINAL: '阴道给药', TRANSDERMAL: '透皮给药', SUBLINGUAL: '舌下给药', BUCCAL: '含服', INTRAVESICAL: '膀胱内给药',
  DENTAL: '牙科用', INHALATION: '吸入', INTRATHECAL: '鞘内注射', INTRAVITREAL: '玻璃体内注射', CUTANEOUS: '皮肤用', URETHRAL: '尿道给药',
  IRRIGATION: '冲洗', HEMODIALYSIS: '血液透析', INTRAMUSCULAR: '肌内注射', INTRAVENOUS: '静脉注射', SUBCUTANEOUS: '皮下注射',
  INTRAPERITONEAL: '腹腔内给药', ENDOTRACHEAL: '气管内给药', INTRADERMAL: '皮内注射', 'INTRA-ARTICULAR': '关节腔内注射',
};
export function formZh(form: string): string {
  const head = Object.keys(FORM_ZH).sort((a, b) => b.length - a.length).find(k => form.toUpperCase().startsWith(k));
  const base = head ? FORM_ZH[head] : '';
  const f = form.toUpperCase();
  // Chinese puts modifiers before the dosage form: 薄膜衣片, 缓释片, 注射用冻干粉针 ...
  let pre = '';
  if (/FILM COATED/.test(f)) pre += '薄膜衣';
  if (/EXTENDED RELEASE|PROLONGED|SUSTAINED/.test(f)) pre += '缓释';
  if (/ENTERIC/.test(f)) pre += '肠溶';
  else if (/DELAYED RELEASE/.test(f)) pre += '迟释';
  if (/ORALLY DISINTEGRATING/.test(f)) pre += '口腔崩解';
  if (/EFFERVESCENT/.test(f)) pre += '泡腾';
  if (/LYOPHILIZED/.test(f)) pre += '冻干';
  if (/LIPOSOMAL/.test(f)) pre += '脂质体';
  if (/PREFILLED|SYRINGE/.test(f)) pre += '预充式';
  return (pre + base).trim();
}
