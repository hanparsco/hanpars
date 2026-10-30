/** "For foreign manufacturers" page — the trust page addressed to pharmaceutical companies abroad that consider
 *  Hanpars as their importer, registration holder and partner in Iran.
 *  Every figure shown on the page is read from the data files (portfolio.json, imports-2026.json) at build time;
 *  the texts below only state what the company already publishes elsewhere on the site. */

export type PartnersContent = {
  kicker: string; introTitle: string; intro: string[];
  statsTitle: string;
  stats: { key: 'registered' | 'available' | 'units' | 'molecules' | 'shipments'; label: string }[];
  statsNote: string;
  whyTitle: string; why: { title: string; text: string }[];
  stepsTitle: string; stepsLede: string; steps: { title: string; text: string }[];
  askTitle: string; ask: string[];
  giveTitle: string; give: string[];
  officesTitle: string; offices: { city: string; role: string; text: string }[];
  limits: string;
  faqTitle: string; faq: { q: string; a: string }[];
  cta: string; ctaNote: string;
};

export const partners: Record<'en' | 'fa' | 'zh' | 'tr', PartnersContent> = {
  en: {
    kicker: 'For foreign manufacturers',
    introTitle: 'A licensed, accountable partner for your products in Iran.',
    intro: [
      'Hanpars is the trading name of Haniya Parsan Darou Co., a pharmaceutical importer in Tehran licensed by the Iran Food and Drug Administration (IFDA). We hold the marketing authorisations for the hospital and specialty medicines we import, prepare the dossiers ourselves and manage pharmacovigilance after approval.',
      'For a foreign manufacturer this means one counterpart in Iran who is legally responsible for the product, answers to the regulator in your name, and reports back to you in writing. The figures below are the ones we publish on this site and keep up to date.',
    ],
    statsTitle: 'What we can show you',
    stats: [
      { key: 'registered', label: 'medicines registered with IFDA under our licence' },
      { key: 'available', label: 'of them on the Iranian market today' },
      { key: 'units', label: 'units imported in 2026' },
      { key: 'molecules', label: 'molecules imported in 2026' },
    ],
    statsNote: 'Portfolio snapshot and 2026 import activity, from our own records; the full lists are on the portfolio and import-activity pages.',
    whyTitle: 'Why manufacturers work with us',
    why: [
      { title: 'We are the licence holder', text: 'Import licence, product registrations and IRC codes are in our name. There is no intermediary between you, us and the regulator.' },
      { title: 'Regulatory work stays in-house', text: 'Dossiers, submissions, variations, renewals and pharmacovigilance are done by our own regulatory team, which also files for third-party manufacturers.' },
      { title: 'Written responsibilities', text: 'Every project starts with a confidentiality agreement and a written division of responsibilities; quality and supply agreements follow before the first shipment.' },
      { title: 'Nationwide distribution', text: 'Hospital and pharmacy coverage through Iran’s main pharmaceutical distributors; cold chain for biologics.' },
      { title: 'A supplier to the national reserve', text: 'Contracted supplier to the IFDA under the Strategic Medicine Reserve programme for several critical medicines.' },
      { title: 'A team that speaks your language', text: 'Offices in Istanbul, Hangzhou and Zhenjiang, and staff who work in English, Turkish, Chinese and Persian.' },
    ],
    stepsTitle: 'How a product reaches Iran with us',
    stepsLede: 'Six stages, each closed with a written decision before the next one starts.',
    steps: [
      { title: 'Confidential assessment', text: 'NDA, then a written assessment: regulatory route, pricing context, competing products, realistic timeline.' },
      { title: 'Letter of authorisation', text: 'You appoint Hanpars as your applicant and importer for Iran; the scope of the LoA is defined together.' },
      { title: 'Dossier and submission', text: 'Your CTD, GMP certificate and CPP are adapted to IFDA requirements, with Persian labelling, and submitted in our name.' },
      { title: 'Registration and IRC', text: 'We answer the regulator’s questions, arrange any samples or inspections, and obtain the IRC code and pricing approval.' },
      { title: 'Import and launch', text: 'Import licence, foreign-currency allocation, shipment, customs and release; distribution through the main distributors.' },
      { title: 'Lifecycle', text: 'Pharmacovigilance, variations, renewals, forecasts and reporting back to you.' },
    ],
    askTitle: 'What we ask from you',
    ask: ['A letter of authorisation for Iran, with the agreed scope', 'The CTD dossier (modules 1–5) and a current GMP certificate', 'Certificate of pharmaceutical product (CPP) or equivalent free-sale evidence', 'Certificates of analysis, stability data and reference standards for testing', 'Samples and artwork for the Persian labelling', 'A named contact for regulatory and quality questions'],
    giveTitle: 'What you can expect from us',
    give: ['One accountable project manager and status reports at an agreed rhythm', 'Submissions and correspondence with IFDA in your name, shared with you', 'Pharmacovigilance reporting in line with IFDA requirements and your own procedures', 'Audit access to our premises, records and distributors', 'Forecasts and import plans agreed in advance', 'Clear written notice of what we cannot promise: timelines and regulatory outcomes'],
    officesTitle: 'Where to find us',
    offices: [
      { city: 'Tehran', role: 'Head office', text: 'Licence holder, regulatory team, import operations.' },
      { city: 'Istanbul', role: 'Partner office', text: 'Turkish manufacturers and the land route to Iran.' },
      { city: 'Hangzhou', role: 'Office', text: 'Chinese manufacturers and CDMO partners.' },
      { city: 'Zhenjiang', role: 'Exclusive wholesaler office', text: 'Chinese sourcing and quality follow-up.' },
    ],
    limits: 'Hanpars does not own a manufacturing plant and cannot guarantee a regulatory outcome or a timeline; the regulator decides. We say so at the first meeting, and we put every responsibility in writing.',
    faqTitle: 'Questions manufacturers ask us',
    faq: [
      { q: 'Who holds the registration in Iran?', a: 'Hanpars, as the IFDA-licensed importer and applicant, under the authorisation you give us. The product remains yours; the scope and term of the authorisation are agreed in the LoA.' },
      { q: 'How long does registration take?', a: 'It depends on the product category, the dossier and the regulator’s queue. We give a written, dated estimate after the assessment and update it as the file progresses; we do not quote fixed timelines in advance.' },
      { q: 'Can you audit us, and can we audit you?', a: 'Yes, both. We review your GMP status and documentation before we commit; you are welcome to audit our premises, records and the distributors we use.' },
      { q: 'Do you also handle local manufacturing?', a: 'Where local production is the better route, we coordinate licensed manufacturing on the lines of an Iranian GMP plant; see the contract development and manufacturing page.' },
    ],
    cta: 'Start a confidential assessment',
    ctaNote: 'Send the product, its registration status and your target for Iran. We reply with the next step.',
  },

  fa: {
    kicker: 'همکاری با تولیدکنندگان خارجی',
    introTitle: 'شریکی دارای مجوز و پاسخ‌گو برای فرآورده‌های شما در ایران',
    intro: [
      'هانیا پرسان دارو واردکنندهٔ دارو با مجوز سازمان غذا و دارو در تهران است. پروانهٔ فرآورده‌های بیمارستانی و تخصصی وارداتی به نام این شرکت است، پرونده‌ها در داخل شرکت تهیه می‌شود و فارماکوویژیلانس پس از ثبت نیز بر عهدهٔ همین تیم است.',
      'برای تولیدکنندهٔ خارجی این یعنی یک طرف حساب در ایران که مسئولیت قانونی فرآورده را بر عهده دارد، در برابر سازمان غذا و دارو به نام او پاسخ می‌دهد و به‌صورت مکتوب به او گزارش می‌کند. ارقام زیر همان‌هایی است که در این وب‌سایت منتشر و به‌روز نگه داشته می‌شود.',
    ],
    statsTitle: 'آنچه می‌توانیم نشان دهیم',
    stats: [
      { key: 'registered', label: 'داروی ثبت‌شده در سازمان غذا و دارو با پروانهٔ ما' },
      { key: 'available', label: 'قلم از آن‌ها هم‌اکنون در بازار ایران' },
      { key: 'units', label: 'واحد وارداتی در سال ۲۰۲۶' },
      { key: 'molecules', label: 'مولکول وارداتی در سال ۲۰۲۶' },
    ],
    statsNote: 'وضعیت سبد محصولات و فعالیت واردات ۲۰۲۶ بر اساس سوابق خود شرکت؛ فهرست کامل در صفحه‌های سبد محصولات و گزارش فعالیت.',
    whyTitle: 'چرا تولیدکنندگان با ما کار می‌کنند',
    why: [
      { title: 'دارندهٔ پروانه خود ما هستیم', text: 'مجوز واردات، ثبت فرآورده‌ها و کدهای IRC به نام هانیا پرسان دارو است؛ واسطه‌ای میان شما، ما و سازمان وجود ندارد.' },
      { title: 'امور رگولاتوری در داخل شرکت', text: 'تدوین پرونده، ارسال، تغییرات، تمدید و فارماکوویژیلانس توسط تیم رگولاتوری خود شرکت انجام می‌شود که برای تولیدکنندگان ثالث نیز پرونده تشکیل می‌دهد.' },
      { title: 'مسئولیت‌های مکتوب', text: 'هر پروژه با توافق‌نامهٔ محرمانگی و تقسیم مکتوب مسئولیت‌ها آغاز می‌شود؛ توافق‌نامه‌های کیفیت و تأمین پیش از نخستین محموله امضا می‌شود.' },
      { title: 'توزیع سراسری', text: 'پوشش بیمارستان‌ها و داروخانه‌ها از طریق شرکت‌های پخش اصلی کشور؛ زنجیرهٔ سرد برای فرآورده‌های بیولوژیک.' },
      { title: 'تأمین‌کنندهٔ ذخایر راهبردی', text: 'تأمین‌کنندهٔ طرف قرارداد سازمان غذا و دارو در برنامهٔ ذخایر راهبردی دارویی برای چند داروی حیاتی.' },
      { title: 'تیمی به زبان شما', text: 'دفاتر استانبول، هانگژو و ژن‌جیانگ و کارکنانی که به انگلیسی، ترکی، چینی و فارسی کار می‌کنند.' },
    ],
    stepsTitle: 'مسیر ورود فرآورده به ایران با ما',
    stepsLede: 'شش مرحله که هر یک پیش از آغاز مرحلهٔ بعد با تصمیمی مکتوب بسته می‌شود.',
    steps: [
      { title: 'ارزیابی محرمانه', text: 'توافق‌نامهٔ محرمانگی و سپس ارزیابی مکتوب: مسیر ثبت، شرایط قیمت‌گذاری، فرآورده‌های رقیب و زمان‌بندی واقع‌بینانه.' },
      { title: 'نامهٔ نمایندگی', text: 'هانیا پرسان دارو به‌عنوان متقاضی و واردکنندهٔ شما در ایران تعیین می‌شود؛ دامنهٔ نمایندگی مشترکاً تعریف می‌شود.' },
      { title: 'پرونده و ارسال', text: 'پروندهٔ CTD، گواهی GMP و CPP شما مطابق الزامات سازمان غذا و دارو تنظیم و با برچسب فارسی به نام ما ارسال می‌شود.' },
      { title: 'ثبت و کد IRC', text: 'پاسخ به پرسش‌های سازمان، هماهنگی نمونه یا بازرسی، و اخذ کد IRC و قیمت مصوب.' },
      { title: 'واردات و عرضه', text: 'مجوز واردات، تخصیص ارز، حمل، ترخیص و آزادسازی؛ توزیع از طریق پخش‌های اصلی.' },
      { title: 'چرخهٔ عمر', text: 'فارماکوویژیلانس، تغییرات، تمدید، پیش‌بینی تقاضا و گزارش به شما.' },
    ],
    askTitle: 'آنچه از شما می‌خواهیم',
    ask: ['نامهٔ نمایندگی برای ایران با دامنهٔ توافق‌شده', 'پروندهٔ CTD (ماژول‌های ۱ تا ۵) و گواهی GMP معتبر', 'گواهی فرآوردهٔ دارویی (CPP) یا مدرک معادل فروش آزاد', 'گواهی آنالیز، داده‌های پایداری و استانداردهای مرجع برای آزمون', 'نمونه و طرح بسته‌بندی برای برچسب فارسی', 'یک نفر رابط برای پرسش‌های رگولاتوری و کیفیت'],
    giveTitle: 'آنچه از ما انتظار دارید',
    give: ['یک مدیر پروژهٔ پاسخ‌گو و گزارش وضعیت با دوره‌ای توافق‌شده', 'مکاتبات با سازمان غذا و دارو به نام شما و در اختیار شما', 'گزارش فارماکوویژیلانس مطابق الزامات سازمان و رویه‌های خودتان', 'امکان ممیزی دفتر، سوابق و شرکت‌های پخش ما', 'پیش‌بینی تقاضا و برنامهٔ واردات با توافق قبلی', 'اعلام صریح آنچه نمی‌توانیم تضمین کنیم: زمان‌بندی و نتیجهٔ ثبت'],
    officesTitle: 'دفاتر ما',
    offices: [
      { city: 'تهران', role: 'دفتر مرکزی', text: 'دارندهٔ پروانه، تیم رگولاتوری، عملیات واردات.' },
      { city: 'استانبول', role: 'دفتر شریک', text: 'تولیدکنندگان ترکیه و مسیر زمینی به ایران.' },
      { city: 'هانگژو', role: 'دفتر', text: 'تولیدکنندگان و شرکای CDMO چینی.' },
      { city: 'ژن‌جیانگ', role: 'دفتر عمده‌فروش انحصاری', text: 'تأمین از چین و پیگیری کیفیت.' },
    ],
    limits: 'هانیا پرسان دارو کارخانهٔ تولیدی ندارد و نتیجهٔ ثبت یا زمان‌بندی را تضمین نمی‌کند؛ تصمیم با سازمان غذا و دارو است. این را در نخستین جلسه می‌گوییم و هر مسئولیتی را مکتوب می‌کنیم.',
    faqTitle: 'پرسش‌های رایج تولیدکنندگان',
    faq: [
      { q: 'پروانهٔ ثبت در ایران به نام چه کسی است؟', a: 'به نام هانیا پرسان دارو، به‌عنوان واردکنندهٔ دارای مجوز و متقاضی، بر اساس نمایندگی‌ای که شما می‌دهید. فرآورده متعلق به شماست و دامنه و مدت نمایندگی در نامهٔ نمایندگی توافق می‌شود.' },
      { q: 'ثبت چقدر طول می‌کشد؟', a: 'به دستهٔ فرآورده، پرونده و صف سازمان بستگی دارد. پس از ارزیابی، برآورد مکتوب و تاریخ‌دار می‌دهیم و با پیشرفت پرونده به‌روز می‌کنیم؛ از پیش زمان قطعی اعلام نمی‌کنیم.' },
      { q: 'امکان ممیزی متقابل هست؟', a: 'بله. ما وضعیت GMP و مستندات شما را پیش از تعهد بررسی می‌کنیم و شما می‌توانید دفتر، سوابق و شرکت‌های پخش ما را ممیزی کنید.' },
      { q: 'تولید داخل هم انجام می‌دهید؟', a: 'در مواردی که تولید داخل مسیر مناسب‌تری باشد، تولید تحت لیسانس در خطوط کارخانهٔ دارای GMP ایرانی را هماهنگ می‌کنیم؛ صفحهٔ توسعه و تولید قراردادی را ببینید.' },
    ],
    cta: 'آغاز ارزیابی محرمانه',
    ctaNote: 'فرآورده، وضعیت ثبت و هدف شما برای ایران را بفرستید؛ گام بعدی را اعلام می‌کنیم.',
  },

  zh: {
    kicker: '面向中国药企',
    introTitle: '中国药企在伊朗的持牌、负责到底的合作伙伴。',
    intro: [
      '汉帕斯（汉尼亚帕尔桑药业有限公司）是位于德黑兰、持有伊朗食品药品监督管理局（IFDA）进口许可的药品进口商。我们进口的医院用药和专科药均以本公司名义持有上市许可，注册资料由自有团队编制，获批后的药物警戒也由同一团队负责。',
      '对正在“出海”的中国药企而言，这意味着在伊朗有一个唯一对接方：对产品承担法律责任，以您的名义面对监管机构，并以书面形式向您汇报。以下数据均在本站公开并持续更新。',
    ],
    statsTitle: '可供核实的数据',
    stats: [
      { key: 'registered', label: '以本公司名义在 IFDA 注册的药品' },
      { key: 'available', label: '其中已在伊朗市场供应' },
      { key: 'units', label: '2026 年进口单位数' },
      { key: 'molecules', label: '2026 年进口分子数' },
    ],
    statsNote: '产品组合快照与 2026 年进口数据来自本公司记录；完整清单见产品组合和进口动态页面。',
    whyTitle: '中国药企为什么选择我们',
    why: [
      { title: '许可在我们名下', text: '进口许可、产品注册和 IRC 编码均以 汉帕斯 名义持有；您、我们和监管机构之间没有中间环节。' },
      { title: '注册工作不外包', text: '资料编制、申报、变更、再注册和药物警戒由本公司注册团队完成，该团队同时为第三方生产企业申报。' },
      { title: '职责书面化', text: '每个项目以保密协议和书面职责划分开始；首批发运前签署质量协议和供货协议。' },
      { title: '全国分销', text: '通过伊朗主要医药分销商覆盖医院和药店；生物制品全程冷链。' },
      { title: '国家战略储备供应商', text: '在 IFDA 战略药品储备计划下，是多种关键药品的签约供应商。' },
      { title: '中文团队与中国办公室', text: '杭州办公室和镇江独家批发办公室，团队可用中文直接沟通，并有对接 NMPA/ICH 格式 CTD 资料的经验。' },
    ],
    stepsTitle: '产品进入伊朗的流程',
    stepsLede: '六个阶段，每个阶段均以书面结论收尾，再进入下一阶段。',
    steps: [
      { title: '保密评估', text: '签署保密协议后出具书面评估：注册路径、定价环境、竞争产品和现实的时间表。' },
      { title: '授权书（LoA）', text: '您授权 汉帕斯 作为在伊朗的申请人和进口商；授权范围由双方共同确定。' },
      { title: '资料与申报', text: '将您的 CTD、GMP 证书和 CPP 按 IFDA 要求调整，配以波斯语标签，以我们的名义申报。' },
      { title: '注册与 IRC 编码', text: '答复监管问询，安排样品或检查，取得 IRC 编码和核准价格。' },
      { title: '进口与上市', text: '进口许可、外汇配额、发运、清关和放行；通过主要分销商分销。' },
      { title: '生命周期', text: '药物警戒、变更、再注册、需求预测和定期汇报。' },
    ],
    askTitle: '需要您提供',
    ask: ['针对伊朗、范围明确的授权书', 'CTD 资料（模块 1–5）和有效的 GMP 证书', '药品证明书（CPP）或等效的自由销售证明', '检验报告、稳定性数据和用于检测的对照品', '样品及用于波斯语标签的包装设计', '负责注册和质量问题的指定联系人'],
    giveTitle: '您可以从我们获得',
    give: ['一位负责到底的项目经理，按约定周期提交进展报告', '以您的名义向 IFDA 提交的申报及往来文件，均与您共享', '符合 IFDA 要求和贵公司程序的药物警戒报告', '对我们办公场所、记录和分销商的审计权', '事先商定的需求预测和进口计划', '明确告知我们不能承诺的事项：时间表和注册结果'],
    officesTitle: '我们的办公室',
    offices: [
      { city: '德黑兰', role: '总部', text: '许可持有人、注册团队、进口运营。' },
      { city: '杭州', role: '办公室', text: '对接中国制剂企业和 CDMO 合作伙伴。' },
      { city: '镇江', role: '独家批发办公室', text: '中国采购和质量跟进。' },
      { city: '伊斯坦布尔', role: '合作办公室', text: '对接土耳其生产企业；经陆路通往伊朗。' },
    ],
    limits: '汉帕斯 不拥有生产工厂，也不能保证注册结果或时间表，决定权在监管机构。我们会在第一次会议上说明这一点，并将每一项职责写入书面文件。',
    faqTitle: '中国药企常问的问题',
    faq: [
      { q: '伊朗注册证在谁名下？', a: '在 汉帕斯 名下：汉帕斯 依据您出具的授权书，作为 IFDA 持牌进口商和申请人持有注册证。产品仍归您所有；授权的范围和期限在 LoA 中约定。' },
      { q: '注册需要多长时间？', a: '取决于产品类别、资料质量和监管机构的排队情况。评估后我们给出书面、标注日期的预估，并随进度更新；我们不会事先承诺固定时间。' },
      { q: '可以互相审计吗？', a: '可以。承诺前我们会审核您的 GMP 状态和资料；您也可以审计我们的办公场所、记录和所用分销商。' },
      { q: '是否承接本地生产？', a: '当本地生产是更合适的路径时，我们协调在伊朗 GMP 工厂生产线上的授权生产；详见制剂 CDMO 页面。' },
      { q: '伊朗药品注册需要哪些资料？', a: '通常需要：授权书（LoA）、CTD 资料（模块 1–5）、有效的 GMP 证书、药品证明书（CPP）或自由销售证明、检验报告与稳定性数据、样品和包装设计。资料若已按 NMPA/ICH 的 CTD 格式整理，调整工作量会明显减少。' },
      { q: '伊朗的 IRC 编码是什么？', a: 'IRC（Iran Registration Code）是 IFDA 对每个获批药品发放的注册编码，是进口、定价、医保和市场销售的前提。IRC 以申请人（汉帕斯）名义取得，并与您的授权书绑定。' },
      { q: '在伊朗需要有本地法人才能销售药品吗？', a: '外国生产企业无需在伊朗设立公司；药品以持牌进口商和注册持有人（汉帕斯）的名义注册和进口，您保留产品、品牌和技术的所有权，并通过授权书约定合作范围。' },
    ],
    cta: '启动保密评估',
    ctaNote: '请告知产品、注册状态和您对伊朗市场的目标，我们将回复下一步安排。',
  },

  tr: {
    kicker: 'Türk ilaç üreticileri için',
    introTitle: 'Ürünleriniz için İran’da lisanslı ve hesap verebilir bir ortak.',
    intro: [
      'Hanpars, Tahran merkezli Haniya Parsan Darou Co.’nun ticari adıdır; İran Gıda ve İlaç İdaresi (IFDA) tarafından lisanslanmış bir ilaç ithalatçısıdır. İthal ettiğimiz hastane ve uzmanlık ilaçlarının ruhsatları kendi adımızadır, dosyalar kendi ekibimizce hazırlanır ve onay sonrası farmakovijilans da aynı ekip tarafından yürütülür.',
      'Bir Türk üretici için bu, İran’da ürünün yasal sorumluluğunu taşıyan, düzenleyici kurum karşısında sizin adınıza cevap veren ve size yazılı olarak rapor veren tek bir muhatap demektir. Aşağıdaki rakamlar bu sitede yayımladığımız ve güncel tuttuğumuz rakamlardır.',
    ],
    statsTitle: 'Size gösterebileceklerimiz',
    stats: [
      { key: 'registered', label: 'lisansımız altında IFDA’da ruhsatlı ilaç' },
      { key: 'available', label: 'bunlardan bugün İran pazarında' },
      { key: 'units', label: '2026’da ithal edilen birim' },
      { key: 'molecules', label: '2026’da ithal edilen molekül' },
    ],
    statsNote: 'Portföy anlık görüntüsü ve 2026 ithalat verileri kendi kayıtlarımızdan; tam listeler portföy ve ithalat faaliyeti sayfalarında.',
    whyTitle: 'Üreticiler neden bizimle çalışıyor',
    why: [
      { title: 'Ruhsat sahibi biziz', text: 'İthalat izni, ürün ruhsatları ve IRC kodları Hanpars adınadır; siz, biz ve düzenleyici kurum arasında aracı yoktur.' },
      { title: 'Ruhsat işleri şirket içinde', text: 'Dosya, başvuru, varyasyon, yenileme ve farmakovijilans kendi ruhsatlandırma ekibimizce yürütülür; bu ekip üçüncü taraf üreticiler için de başvuru yapar.' },
      { title: 'Yazılı sorumluluklar', text: 'Her proje gizlilik sözleşmesi ve yazılı bir sorumluluk paylaşımıyla başlar; ilk sevkiyattan önce kalite ve tedarik sözleşmeleri imzalanır.' },
      { title: 'Ülke çapında dağıtım', text: 'İran’ın başlıca ilaç dağıtım şirketleri üzerinden hastane ve eczane erişimi; biyolojikler için soğuk zincir.' },
      { title: 'Ulusal stratejik rezerv tedarikçisi', text: 'Birkaç kritik ilaç için IFDA Stratejik İlaç Rezervi programının sözleşmeli tedarikçisi.' },
      { title: 'İstanbul’da bir ofis, Türkçe konuşan ekip', text: 'İstanbul ortak ofisi; TİTCK formatındaki CTD dosyalarıyla ve LoA süreciyle deneyim; İran’a kısa kara yolu.' },
    ],
    stepsTitle: 'Bir ürün bizimle İran’a nasıl ulaşır',
    stepsLede: 'Altı aşama; her biri bir sonrakine geçmeden önce yazılı bir kararla kapanır.',
    steps: [
      { title: 'Gizli değerlendirme', text: 'Gizlilik sözleşmesi, ardından yazılı değerlendirme: ruhsat yolu, fiyatlandırma ortamı, rakip ürünler, gerçekçi takvim.' },
      { title: 'Yetki belgesi (LoA)', text: 'Hanpars’ı İran için başvuru sahibi ve ithalatçınız olarak atarsınız; LoA’nın kapsamı birlikte belirlenir.' },
      { title: 'Dosya ve başvuru', text: 'CTD dosyanız, GMP sertifikanız ve CPP’niz IFDA gerekliliklerine uyarlanır, Farsça etiketle adımıza sunulur.' },
      { title: 'Ruhsat ve IRC kodu', text: 'Kurumun sorularını yanıtlar, numune veya denetimi düzenler, IRC kodunu ve fiyat onayını alırız.' },
      { title: 'İthalat ve lansman', text: 'İthalat izni, döviz tahsisi, sevkiyat, gümrük ve serbest bırakma; başlıca dağıtıcılar üzerinden dağıtım.' },
      { title: 'Yaşam döngüsü', text: 'Farmakovijilans, varyasyonlar, yenilemeler, talep tahminleri ve size raporlama.' },
    ],
    askTitle: 'Sizden istediklerimiz',
    ask: ['İran için kapsamı belirlenmiş bir yetki belgesi (LoA)', 'CTD dosyası (modül 1–5) ve geçerli GMP sertifikası', 'Farmasötik ürün sertifikası (CPP) veya eşdeğer serbest satış belgesi', 'Analiz sertifikaları, stabilite verileri ve test için referans standartlar', 'Numuneler ve Farsça etiket için ambalaj tasarımı', 'Ruhsat ve kalite soruları için bir irtibat kişisi'],
    giveTitle: 'Bizden bekleyebilecekleriniz',
    give: ['Sorumlu bir proje yöneticisi ve kararlaştırılan sıklıkta durum raporları', 'IFDA ile sizin adınıza yapılan ve sizinle paylaşılan başvuru ve yazışmalar', 'IFDA gerekliliklerine ve kendi prosedürlerinize uygun farmakovijilans raporlaması', 'Ofisimizi, kayıtlarımızı ve dağıtıcılarımızı denetleme hakkı', 'Önceden mutabık kalınan talep tahminleri ve ithalat planları', 'Söz veremeyeceklerimizin açıkça yazılı bildirimi: takvimler ve ruhsat sonuçları'],
    officesTitle: 'Bizi nerede bulursunuz',
    offices: [
      { city: 'Tahran', role: 'Merkez ofis', text: 'Ruhsat sahibi, ruhsatlandırma ekibi, ithalat operasyonları.' },
      { city: 'İstanbul', role: 'Ortak ofis', text: 'Türk üreticiler ve İran’a kara yolu.' },
      { city: 'Hangzhou', role: 'Ofis', text: 'Çinli üreticiler ve CDMO ortakları.' },
      { city: 'Zhenjiang', role: 'Münhasır toptancı ofisi', text: 'Çin kaynaklı tedarik ve kalite takibi.' },
    ],
    limits: 'Hanpars’ın üretim tesisi yoktur; ruhsat sonucunu veya takvimi garanti edemez, karar düzenleyici kuruma aittir. Bunu ilk toplantıda söyler ve her sorumluluğu yazılı hale getiririz.',
    faqTitle: 'Üreticilerin bize sorduğu sorular',
    faq: [
      { q: 'İran’daki ruhsat kimin adına?', a: 'Verdiğiniz yetkiye dayanarak, IFDA lisanslı ithalatçı ve başvuru sahibi olarak Hanpars adına. Ürün sizindir; yetkinin kapsamı ve süresi LoA’da kararlaştırılır.' },
      { q: 'Ruhsat ne kadar sürer?', a: 'Ürün kategorisine, dosyaya ve kurumun iş yüküne bağlıdır. Değerlendirmeden sonra yazılı ve tarihli bir tahmin verir, dosya ilerledikçe güncelleriz; önceden kesin süre vermeyiz.' },
      { q: 'Karşılıklı denetim mümkün mü?', a: 'Evet. Taahhütten önce GMP durumunuzu ve dokümanlarınızı inceleriz; siz de ofisimizi, kayıtlarımızı ve kullandığımız dağıtıcıları denetleyebilirsiniz.' },
      { q: 'Yerel üretimi de üstleniyor musunuz?', a: 'Yerel üretim daha uygun yolsa, İranlı bir GMP tesisinin hatlarında lisanslı üretimi koordine ederiz; fason geliştirme ve üretim sayfasına bakınız.' },
    ],
    cta: 'Gizli değerlendirme başlatın',
    ctaNote: 'Ürünü, ruhsat durumunu ve İran hedefinizi gönderin; bir sonraki adımla yanıt veririz.',
  },
};
