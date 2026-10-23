/** Simplified Chinese vocabulary for SEO titles and descriptions of product pages. */
export const FORM_ZH: Record<string, string> = {
  INJECTION: '注射液', INJECTABLE: '注射剂', TABLET: '片', CAPSULE: '胶囊', SOLUTION: '溶液剂', POWDER: '散剂', CREAM: '乳膏',
  SUSPENSION: '混悬液', SYRUP: '糖浆', SPRAY: '喷雾剂', OINTMENT: '软膏', GEL: '凝胶剂', SUPPOSITORY: '栓剂', AEROSOL: '气雾剂',
  LOTION: '洗剂', INHALANT: '吸入剂', GRANULE: '颗粒', GRANULES: '颗粒', SHAMPOO: '洗发剂', PATCH: '贴剂', GAS: '医用气体',
  ENEMA: '灌肠剂', ELIXIR: '酏剂', TINCTURE: '酊剂', SOAP: '药皂', MOUTHWASH: '含漱液', IMPLANT: '植入剂', DISC: '吸入粉雾剂',
  PLASTER: '贴膏', KIT: '药盒', LOZENGE: '含片', LIQUID: '液体制剂', STICK: '棒剂', 'NAIL LACQUER': '甲用涂剂', CONCENTRATE: '浓溶液',
  EMULSION: '乳剂', OIL: '油剂', GUM: '咀嚼胶', DOUCHE: '阴道冲洗剂', INSERT: '栓', PASTE: '糊剂', DROPS: '滴剂', FILM: '膜剂',
};
export const ROUTE_ZH: Record<string, string> = {
  TRANSTRACHEAL: '经气管给药', PERCUTANEOUS: '经皮给药', INTRASPINAL: '椎管内给药', INTRAEPIDERMAL: '表皮内给药', INTRACAVITARY: '腔内给药',
  ORAL: '口服', PARENTERAL: '注射给药', TOPICAL: '外用', RESPIRATORY: '呼吸道给药', OPHTHALMIC: '眼用', OTIC: '耳用', NASAL: '鼻用',
  RECTAL: '直肠给药', VAGINAL: '阴道给药', TRANSDERMAL: '透皮给药', SUBLINGUAL: '舌下给药', BUCCAL: '颊黏膜给药', INTRAVESICAL: '膀胱内给药',
  DENTAL: '牙科用', INHALATION: '吸入给药', INTRATHECAL: '鞘内注射', INTRAVITREAL: '玻璃体内注射', CUTANEOUS: '皮肤用', URETHRAL: '尿道给药',
  IRRIGATION: '冲洗', HEMODIALYSIS: '血液透析', INTRAMUSCULAR: '肌内注射', INTRAVENOUS: '静脉给药', SUBCUTANEOUS: '皮下注射',
  INTRAPERITONEAL: '腹腔内给药', ENDOTRACHEAL: '气管内给药', INTRADERMAL: '皮内注射', 'INTRA-ARTICULAR': '关节腔内注射',
};
export function formZh(form: string, route = ''): string {
  const f = form.toUpperCase(); const r = route.toUpperCase();
  // Injections: Chinese package-insert names depend on the physical form
  if (/^INJECT/.test(f)) {
    if (/POWDER|LYOPHILIZED/.test(f)) return /LYOPHILIZED/.test(f) ? '注射用冻干粉末' : /EXTENDED RELEASE/.test(f) ? '注射用缓释微球' : '注射用无菌粉末';
    if (/CONCENTRATE/.test(f)) return '注射用浓溶液';
    if (/EMULSION/.test(f)) return '注射用乳剂';
    if (/SUSPENSION/.test(f)) return /EXTENDED RELEASE/.test(f) ? '长效混悬注射液' : '混悬注射液';
    if (/LIPOSOM/.test(f)) return '脂质体注射液';
    return /PREFILLED|SYRINGE/.test(f) ? '注射液（预充式）' : '注射液';
  }
  // Drops: route decides 滴眼液 / 滴耳液 / 滴鼻液
  if (/DROPS/.test(f) || /^SOLUTION\/DROPS/.test(f)) {
    const susp = /SUSPENSION/.test(f);
    if (/OPHTHALMIC/.test(r)) return susp ? '混悬滴眼液' : '滴眼液';
    if (/OTIC|AURICULAR/.test(r)) return '滴耳液';
    if (/NASAL/.test(r)) return '滴鼻液';
    return susp ? '混悬滴剂' : '滴剂';
  }
  if (/^SOLUTION/.test(f) || /^SUSPENSION/.test(f)) {
    if (/OPHTHALMIC/.test(r)) return /SUSPENSION/.test(f) ? '混悬滴眼液' : '滴眼液';
    if (/NASAL/.test(r) && /SPRAY/.test(f)) return '鼻喷雾剂';
    if (/INHALATION|RESPIRATORY/.test(r)) return /SUSPENSION/.test(f) ? '吸入用混悬液' : '吸入用溶液';
  }
  if (/^POWDER/.test(f) && /FOR SUSPENSION/.test(f) && /ORAL/.test(r)) return '干混悬剂';
  if (/^CAPSULE/.test(f) && /LIQUID FILLED|SOFT/.test(f)) return '软胶囊';
  if (/^AEROSOL/.test(f) && /METERED/.test(f)) return '吸入气雾剂';
  if (/^AEROSOL/.test(f) && /FOAM/.test(f)) return '泡沫剂';
  if (/^SPRAY/.test(f) && /METERED/.test(f)) return /NASAL/.test(r) ? '鼻喷雾剂' : '定量喷雾剂';
  const head = Object.keys(FORM_ZH).sort((a, b) => b.length - a.length).find(k => f.startsWith(k));
  const base = head ? FORM_ZH[head] : '';
  // Chinese puts modifiers before the dosage form: 薄膜衣片, 缓释片, 肠溶胶囊 ...
  let pre = '';
  if (/FILM COATED/.test(f)) pre += '薄膜衣';
  else if (/SUGAR COATED/.test(f)) pre += '糖衣';
  else if (/^TABLET, COATED/.test(f)) pre += '包衣';
  if (/EXTENDED RELEASE|PROLONGED|SUSTAINED/.test(f)) pre += '缓释';
  if (/ENTERIC|DELAYED RELEASE/.test(f)) pre += '肠溶';
  if (/ORALLY DISINTEGRATING|ORODISPERSIBLE/.test(f)) pre += '口崩';
  if (/CHEWABLE/.test(f)) pre += '咀嚼';
  if (/EFFERVESCENT/.test(f)) pre += '泡腾';
  if (/^TABLET/.test(f) && /FOR SUSPENSION|DISPERSIBLE/.test(f)) pre += '分散';
  if (/^TABLET/.test(f) && /SOLUBLE/.test(f)) pre += '可溶';
  if (/VAGINAL/.test(r) && /^TABLET/.test(f)) return '阴道片';
  if (/VAGINAL/.test(r) && /^(SUPPOSITORY|INSERT)/.test(f)) return '阴道栓';
  if (/SUBLINGUAL/.test(r) && /^TABLET/.test(f)) return '舌下片';
  return (pre + base).trim();
}
