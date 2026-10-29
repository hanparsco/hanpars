/** Simplified Chinese text for the portfolio component. Product names, strengths, ATC codes stay as licensed (Latin). */
export const portfolioZh = {
  snapshot: '2026年10月',
  description: '在伊朗食品药品监督管理局（IFDA）注册的医院用药及专科用药，由Hanpars从土耳其、中国和印度持有GMP证书的生产企业进口。按治疗领域列出，并附WHO ATC编码、剂型和规格。',
  trust: [
    { title: '获IFDA许可的进口商', description: '清单中所有产品的上市许可持有人；注册资料、IRC编码和药物警戒均由自有团队完成。' },
    { title: '国家战略药品储备供应商', description: '依据国家储备计划，为IFDA供应纳洛酮、米索前列醇、氢化可的松、依托咪酯和造影剂的合同供应商。' },
    { title: '全国分销', description: '通过伊朗主要医药分销商覆盖医院和药店。' },
    { title: '经审计的供应链', description: '所有供应商均持有GMP证书，每批货物均留存批检验报告，生物制品和肝素采用冷链运输。' },
  ],
  groups: {
    'area-1': { title: '造影剂', kicker: '诊断影像', description: '用于CT、血管造影和尿路造影的含碘造影剂及离子型造影剂，供应全国影像中心和医院。' },
    'area-2': { title: '激素与内分泌', kicker: '内分泌、妇科及肿瘤支持', description: '皮质类固醇、雌激素、抗雄激素复方制剂及钙调节激素。' },
    'area-3': { title: '中枢神经系统与精神科', kicker: '神经科与精神健康', description: '抗抑郁药、抗精神病药、抗惊厥药和抗帕金森病药；产品组合中增长最快的领域。' },
    'area-4': { title: '心血管系统', kicker: '抗血栓、抗心律失常及利尿治疗', description: '用于慢性心血管疾病治疗的抗血小板药、β受体阻滞剂和袢利尿剂。' },
    'area-5': { title: '抗感染药', kicker: '抗菌、抗结核及抗疟', description: '注射及口服抗生素、一线抗结核治疗药物和氨基喹啉类药物。' },
    'area-6': { title: '急诊与重症监护', kicker: '麻醉、复苏及呼吸', description: '用于急诊科、手术室和重症监护室的产品，其中数种在国家战略药品储备框架内供应。' },
    'area-7': { title: '免疫与肿瘤支持治疗', kicker: '生物制剂与化疗保护', description: '抗TNF生物制剂治疗及亚叶酸钙解救治疗。' },
    'area-8': { title: '消化系统与妇女健康', kicker: '肝胆及产科用药', description: '胆汁酸治疗药物及用于产科适应症的前列腺素类似物。' },
    'area-9': { title: '骨骼与代谢', kicker: '骨质疏松', description: '每周一次的双膦酸盐治疗。' },
  } as Record<string, { title: string; kicker: string; description: string }>,
  forms: {
    'Powder for injection': '注射用无菌粉末', 'Capsule': '胶囊', 'Metered-dose inhaler': '定量吸入气雾剂', 'Gel': '凝胶剂', 'Tablet': '片剂', 'Solution for injection': '注射液', 'Extended-release Tablet': '缓释片',
  } as Record<string, string>,
  origins: { 'India': '印度', 'China': '中国', 'Türkiye': '土耳其', 'Origin on request': '产地可应要求提供' } as Record<string, string>,
  manufacturer: {
    title: '致生产企业：一家合作伙伴，即可将您的产品引入伊朗',
    description: '从授权书到药店货架：Hanpars负责编制并向IFDA提交注册资料，办理IRC编码，管理外汇额度和进口事宜，并将产品交由全国性分销商销售。我们正在积极拓展土耳其和欧洲的供应商网络。',
    services: ['注册资料编制及向IFDA提交', 'IRC编码办理及再注册', '外汇额度及进口物流', '通过全国性分销商分销', '上市后监测与报告'],
  },
};
