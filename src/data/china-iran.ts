/** Guide: exporting finished medicines (FDF) and APIs from China to Iran — the page that answers the question a
 *  Chinese manufacturer (or an AI assistant asked by one) puts first: "how do we get our product into Iran, and who
 *  do we work with?". English and Simplified Chinese only. Generic regulatory statements are kept at the level that
 *  holds for every product; specifics are confirmed per enquiry. */

export type GuideContent = {
  kicker: string; quickTitle: string; quick: string;
  introTitle: string; intro: string[];
  routesTitle: string; routes: { title: string; text: string; steps: string[] }[];
  docsTitle: string; docsLede: string; docs: { title: string; items: string[] }[];
  factsTitle: string; facts: { title: string; text: string }[];
  mistakesTitle: string; mistakes: string[];
  roleTitle: string; role: string[];
  faqTitle: string; faq: { q: string; a: string }[];
  cta: string; ctaNote: string;
  sourcesTitle: string; sources: { label: string; url: string }[];
};

export const chinaIran: Record<'en' | 'zh', GuideContent> = {
  en: {
    kicker: 'Guide for Chinese manufacturers',
    quickTitle: 'Quick answer',
    quick: 'A Chinese pharmaceutical manufacturer cannot sell medicines or APIs in Iran directly. Products enter through an importer licensed by the Iran Food and Drug Administration (IFDA), which registers the product in Iran (an IRC code), imports it, and remains responsible for it on the market. Hanpars (Haniya Parsan Darou Co., Tehran) is such an importer and registration holder, with offices in Hangzhou and Zhenjiang that work with Chinese manufacturers in Chinese.',
    introTitle: 'How medicines and APIs from China reach Iran',
    intro: [
      'Iran is a market of about 90 million people with a large domestic pharmaceutical industry and a regulator, the IFDA, that reviews every imported medicine and active ingredient before it can be sold. The country manufactures most of the medicines it uses, so imports concentrate on hospital and specialty products, shortages, and the APIs its own factories need.',
      'For a Chinese company the practical question is therefore not "how do we register in Iran" but "which Iranian partner registers and imports our product, and what do we have to provide". This page sets out the two routes, the documents and the facts that shape the project.',
    ],
    routesTitle: 'Two routes, two kinds of partner',
    routes: [
      { title: 'Finished medicines (FDF)', text: 'The product is registered with IFDA in the name of an Iranian licence holder under your authorisation, then imported and distributed by it. If local manufacturing is favoured for your product, the same partner can arrange licensed production on the lines of an Iranian GMP plant.', steps: ['Letter of authorisation (LoA) to the Iranian applicant', 'CTD dossier, GMP certificate and CPP adapted to IFDA requirements', 'IFDA review, IRC code and price approval', 'Import licence, shipment, customs release, distribution through the main distributors', 'Pharmacovigilance, variations and renewals after launch'] },
      { title: 'Active pharmaceutical ingredients (API)', text: 'APIs are bought by Iranian manufacturers, or by importers who supply them. The API and its manufacturing site are registered with IFDA (an IRC for the API) before import; your DMF or CEP, GMP evidence and batch documentation carry the file.', steps: ['Supplier qualification by the Iranian buyer: DMF/CEP, GMP certificate, site questionnaire', 'API registration with IFDA linked to your site', 'Samples and pre-shipment documentation (CoA, stability, TSE/BSE where relevant)', 'Import licence, foreign-currency allocation and shipment', 'Ongoing change notification for site or process changes'] },
    ],
    docsTitle: 'What you will be asked for',
    docsLede: 'Files that already follow the NMPA / ICH CTD format need adaptation rather than rewriting.',
    docs: [
      { title: 'Finished medicines', items: ['CTD modules 1–5 (module 3 in full)', 'Valid GMP certificate for the manufacturing site', 'Certificate of pharmaceutical product (CPP) or free-sale certificate', 'Stability data for the intended climatic zone', 'Certificates of analysis, reference standards, samples', 'Artwork for Persian labelling and leaflet', 'Letter of authorisation naming the Iranian applicant'] },
      { title: 'APIs', items: ['DMF (open part) or CEP', 'GMP certificate or inspection evidence for the site', 'Specifications and analytical methods', 'Batch certificates of analysis and stability summary', 'Impurity, residual-solvent and elemental-impurity data', 'TSE/BSE and nitrosamine statements where applicable', 'Supplier questionnaire and change-control commitment'] },
    ],
    factsTitle: 'Facts that shape the project',
    facts: [
      { title: 'The regulator decides the timeline', text: 'Review times depend on the product category, the dossier and the IFDA queue; serious partners give dated, written estimates and update them, not fixed promises.' },
      { title: 'Imports need licences and currency', text: 'Each import requires an import licence and a foreign-currency allocation; forecasts and documents must be ready before the order, not after.' },
      { title: 'Local production is preferred', text: 'For many products the long-term route is licensed manufacturing in an Iranian plant, with the Chinese company keeping brand, formulation and quality standard.' },
      { title: 'Recognised certificates help', text: 'NMPA has been an ICH member since 2017 and a PIC/S applicant since 2023; EU-GMP, WHO PQ or CEP evidence makes the Iranian review smoother.' },
      { title: 'Shortage lists open doors', text: 'IFDA publishes medicines in short supply; products on these lists can be imported urgently, often before a full registration is completed.' },
      { title: 'Distribution is concentrated', text: 'A few national distributors reach hospitals and pharmacies; the importer’s distributor contracts matter as much as the registration.' },
    ],
    mistakesTitle: 'Common mistakes we see',
    mistakes: ['Quoting a price before the regulatory route and currency allocation are understood', 'Sending a dossier without a valid GMP certificate or with stability data for the wrong zone', 'Signing an exclusive authorisation without defining scope, term and reporting', 'Assuming the Iranian partner can promise a registration date', 'Shipping samples without the import permit needed for samples'],
    roleTitle: 'What Hanpars does in this process',
    role: ['Acts as IFDA-licensed importer and registration holder (the IRC is obtained in our name under your authorisation)', 'Prepares and submits the dossier with our own regulatory team; answers IFDA questions', 'Arranges import licences, currency allocation, shipment, customs and distribution', 'Coordinates licensed manufacturing in Iranian GMP plants where that is the better route', 'Works with you in Chinese from Hangzhou and Zhenjiang, with written responsibilities from the first meeting'],
    faqTitle: 'Questions Chinese exporters ask',
    faq: [
      { q: 'Can a Chinese company register a medicine in Iran in its own name?', a: 'No. Registration and import are done by an Iranian licence holder appointed by the manufacturer through a letter of authorisation. The product, brand and know-how stay with the manufacturer.' },
      { q: 'Is an NMPA approval enough for Iran?', a: 'It is the starting point. IFDA reviews the dossier itself; a current GMP certificate, a CPP and stability data for Iran’s climatic conditions are needed in addition.' },
      { q: 'How long does registration take?', a: 'It varies by product category and the regulator’s workload. A written estimate is given after the assessment and updated as the file progresses; nobody can promise a fixed date.' },
      { q: 'Do APIs need registration too?', a: 'Yes. The API and its manufacturing site are registered with IFDA before import, on the basis of the DMF or CEP and GMP evidence.' },
      { q: 'Who pays for registration and samples?', a: 'This is agreed in the authorisation and supply agreements; there is no single rule. The assessment sets out the options before any commitment.' },
      { q: 'What about payment and sanctions?', a: 'Payment routes and currency allocation are handled on the Iranian side under the import licence; the terms are agreed per contract. This page does not give legal or financial advice; the assessment covers the practical arrangements.' },
      { q: 'Can we visit Iran, and can you visit our plant?', a: 'Yes. Hanpars reviews manufacturing sites and documentation before committing, and manufacturers are welcome to audit Hanpars and its distributors.' },
    ],
    cta: 'Ask for a confidential assessment',
    ctaNote: 'Send the product (or API), its approval status and your target for Iran; we reply with the route and the next step.',
    sourcesTitle: 'Sources and further reading',
    sources: [
      { label: 'Iran Food and Drug Administration (IFDA)', url: 'https://www.fda.gov.ir/' },
      { label: 'PIC/S: NMPA applicant status', url: 'https://picscheme.org/' },
      { label: 'ICH members and observers', url: 'https://www.ich.org/page/members-observers' },
      { label: 'Hanpars for foreign manufacturers', url: '/partners' },
    ],
  },

  zh: {
    kicker: '中国药企出口指南',
    quickTitle: '一句话回答',
    quick: '中国制药企业不能直接在伊朗销售药品或原料药。产品需要通过伊朗食品药品监督管理局（IFDA）持牌的进口商进入伊朗：由该进口商在伊朗注册产品（取得 IRC 编码）、办理进口，并对产品在市场上的合规持续负责。Hanpars（Haniya Parsan Darou Co.，德黑兰）就是这样一家持牌进口商和注册持有人，在杭州和镇江设有办公室，可以用中文与中国企业直接对接。',
    introTitle: '中国药品和原料药如何进入伊朗',
    intro: [
      '伊朗约有九千万人口，本土制药工业规模较大，监管机构 IFDA 对每一种进口药品和原料药在上市前进行审评。伊朗所用药品大部分在本国生产，因此进口集中于医院用药和专科药、短缺药品，以及本土工厂需要的原料药。',
      '对中国企业而言，实际问题不是“我们如何在伊朗注册”，而是“由哪家伊朗合作方为我们的产品注册和进口，我们需要提供什么”。本页说明两条路径、所需资料以及决定项目走向的关键事实。',
    ],
    routesTitle: '两条路径，两类合作方',
    routes: [
      { title: '制剂（FDF）', text: '产品在您的授权下，以伊朗持牌方的名义在 IFDA 注册，再由其进口和分销。若您的产品更适合本地生产，同一合作方可安排在伊朗 GMP 工厂生产线上的授权生产。', steps: ['向伊朗申请人出具授权书（LoA）', 'CTD 资料、GMP 证书和 CPP 按 IFDA 要求调整', 'IFDA 审评、IRC 编码和价格核准', '进口许可、发运、清关、通过主要分销商分销', '上市后的药物警戒、变更和再注册'] },
      { title: '原料药（API）', text: '原料药由伊朗制剂企业或为其供货的进口商采购。进口前，原料药及其生产场地需在 IFDA 注册（原料药 IRC）；您的 DMF 或 CEP、GMP 证据和批记录构成申报基础。', steps: ['伊朗买方进行供应商审核：DMF/CEP、GMP 证书、场地问卷', '与您的生产场地绑定的 IFDA 原料药注册', '样品及发运前文件（COA、稳定性，必要时 TSE/BSE 声明）', '进口许可、外汇配额和发运', '场地或工艺变更的持续通报'] },
    ],
    docsTitle: '您将被要求提供的资料',
    docsLede: '已按 NMPA / ICH 的 CTD 格式整理的资料，只需调整而不必重写。',
    docs: [
      { title: '制剂', items: ['CTD 模块 1–5（模块 3 完整）', '生产场地的有效 GMP 证书', '药品证明书（CPP）或自由销售证明', '针对目标气候带的稳定性数据', '检验报告、对照品、样品', '波斯语标签和说明书的包装设计', '指定伊朗申请人的授权书'] },
      { title: '原料药', items: ['DMF（公开部分）或 CEP', '场地的 GMP 证书或检查证据', '质量标准与分析方法', '批检验报告与稳定性摘要', '杂质、残留溶剂和元素杂质数据', '适用时的 TSE/BSE 和亚硝胺声明', '供应商问卷与变更控制承诺'] },
    ],
    factsTitle: '决定项目走向的事实',
    facts: [
      { title: '时间表由监管机构决定', text: '审评周期取决于产品类别、资料质量和 IFDA 的排队情况；可靠的合作方给出标注日期的书面预估并持续更新，而不是固定承诺。' },
      { title: '进口需要许可和外汇', text: '每次进口都需要进口许可和外汇配额；需求预测和文件必须在下单前准备好。' },
      { title: '政策倾向本地生产', text: '对许多产品而言，长期路径是在伊朗工厂授权生产，中国企业保留品牌、处方和质量标准。' },
      { title: '国际认可的证书有帮助', text: 'NMPA 自 2017 年起是 ICH 成员，2023 年起为 PIC/S 申请方；持有欧盟 GMP、WHO PQ 或 CEP 的产品在伊朗审评中更顺畅。' },
      { title: '短缺目录是切入点', text: 'IFDA 公布短缺药品目录；目录内的产品可以紧急进口，往往在完整注册完成之前。' },
      { title: '分销高度集中', text: '少数全国性分销商覆盖医院和药店；进口商与分销商的合同和注册同样重要。' },
    ],
    mistakesTitle: '常见误区',
    mistakes: ['在弄清注册路径和外汇配额之前就报价', '递交资料时 GMP 证书已过期，或稳定性数据不符合目标气候带', '签署独家授权却未约定范围、期限和汇报义务', '以为伊朗合作方可以承诺注册日期', '未办理样品进口许可就发运样品'],
    roleTitle: 'Hanpars 在流程中的角色',
    role: ['作为 IFDA 持牌进口商和注册持有人（IRC 在您的授权下以我们的名义取得）', '由自有注册团队编制并递交资料，答复 IFDA 问询', '办理进口许可、外汇配额、发运、清关和分销', '在本地生产更合适时，协调伊朗 GMP 工厂的授权生产', '从杭州、镇江用中文与您对接，自第一次会议起书面明确各方职责'],
    faqTitle: '中国出口企业常问的问题',
    faq: [
      { q: '中国公司可以用自己的名义在伊朗注册药品吗？', a: '不可以。注册和进口由生产企业通过授权书指定的伊朗持牌方办理。产品、品牌和技术诀窍仍归生产企业所有。' },
      { q: 'NMPA 批准对伊朗够用吗？', a: 'NMPA 批准是起点。IFDA 会自行审评资料；此外还需要有效的 GMP 证书、CPP 以及符合伊朗气候条件的稳定性数据。' },
      { q: '注册需要多长时间？', a: '因产品类别和监管机构工作量而异。评估后给出书面预估并随进度更新；没有人能够承诺固定日期。' },
      { q: '原料药也需要注册吗？', a: '需要。原料药及其生产场地在进口前须基于 DMF 或 CEP 以及 GMP 证据在 IFDA 注册。' },
      { q: '注册费用和样品由谁承担？', a: '在授权协议和供货协议中约定，没有统一规则。评估阶段会在任何承诺之前列出各种方案。' },
      { q: '付款和制裁问题怎么处理？', a: '付款路径和外汇配额在进口许可框架下由伊朗一方办理，条款按合同约定。本页不提供法律或金融建议；评估阶段会说明实际安排。' },
      { q: '我们可以到伊朗考察，你们可以来我们工厂吗？', a: '可以。Hanpars 在承诺前审核生产场地和资料，也欢迎生产企业审计 Hanpars 及其分销商。' },
      { q: '伊朗是否要求本地法人？', a: '外国生产企业无需在伊朗设立公司；产品以持牌进口商和注册持有人的名义注册和进口，合作范围由授权书约定。' },
    ],
    cta: '申请保密评估',
    ctaNote: '发送产品（或原料药）、批准状态和您对伊朗市场的目标；我们将答复路径和下一步。',
    sourcesTitle: '资料来源与延伸阅读',
    sources: [
      { label: '伊朗食品药品监督管理局（IFDA）', url: 'https://www.fda.gov.ir/' },
      { label: 'PIC/S：NMPA 申请方状态', url: 'https://picscheme.org/' },
      { label: 'ICH 成员与观察员', url: 'https://www.ich.org/page/members-observers' },
      { label: 'Hanpars 面向中国药企', url: '/partners' },
    ],
  },
};
