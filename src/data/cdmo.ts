/** Contract development & manufacturing (CDMO) page — content per language.
 *  en: general; fa: formal standard Persian for Iranian sponsors and partners;
 *  zh: addressed to Chinese manufacturers going abroad (出海); tr: addressed to Turkish pharmaceutical manufacturers.
 *  Facts used: NMPA ICH member since 2017 and PIC/S applicant since Nov 2023 (picscheme.org);
 *  TİTCK PIC/S participating authority since 1 Jan 2018; Turkish pharma exports USD 2.51 bn in 2025 to ~185 countries (İEİS, Turkish Pharmaceutical Industry 2025).
 *  Hanpars does not own a plant: keep the role statement in every language. */

export type CdmoContent = {
  kicker: string;
  introTitle: string; intro: string[];
  routesTitle: string; routesLede: string;
  routes: { tag: string; title: string; text: string; points: string[] }[];
  servicesTitle: string;
  services: { title: string; text: string }[];
  formsTitle: string;
  forms: { title: string; text: string }[];
  stepsTitle: string; stepsLede: string;
  steps: { title: string; text: string }[];
  focusTitle: string; focusLede: string;
  focus: { value: string; label: string; text: string }[];
  focusNote?: string;
  licTitle: string; licLede: string;
  licWhy: { title: string; text: string }[];
  licScope: { title: string; items: string[] }[];
  licNote: string;
  rolesTitle: string;
  weDo: { title: string; items: string[] };
  partnersDo: { title: string; items: string[] };
  limits: string;
  briefTitle: string; brief: string[]; briefCta: string;
};

export const cdmo: Record<'en' | 'fa' | 'zh' | 'tr', CdmoContent> = {
  en: {
    kicker: 'Contract development and manufacturing',
    introTitle: 'One accountable coordinator from formulation to an approved product in Iran.',
    intro: [
      'A finished dosage form reaches patients only when formulation, analytical methods, scale-up, stability, packaging, regulatory approval and supply all line up. Hanpars puts one project team in charge of that chain and works with qualified development and manufacturing partners in China, Türkiye, India, Europe and Iran.',
      'We plan every project around the market it is meant for, so the batches, the stability programme and the dossier are built for IFDA review from the start rather than adapted afterwards.',
    ],
    routesTitle: 'Three ways we work',
    routesLede: 'Most projects start from one of three positions. The work behind both is the same: a clear brief, the right partner and a dossier built for Iran.',
    routes: [
      { tag: 'Foreign manufacturers', title: 'Bring an existing product to Iran', text: 'For manufacturers with an approved product who want registration and sales in Iran, through import or, where policy favours it, local manufacturing by an Iranian partner.', points: ['Market and regulatory route assessment', 'Letter of authorisation, IFDA dossier and IRC', 'Technology transfer to an Iranian GMP plant when local production is the better route'] },
      { tag: 'Iranian sponsors', title: 'Develop or manufacture a product abroad', text: 'For Iranian companies that need a formulation developed, a product manufactured under contract, or a second source qualified outside Iran.', points: ['Selection and qualification of a CDMO partner', 'Development, validation and stability batches', 'Supply, documentation and import into Iran'] },
      { tag: 'Multinational and large foreign companies', title: 'Licensed manufacturing in Iran', text: 'For originator and large generic companies whose products are better placed being manufactured under licence on the lines of an Iranian GMP plant: the licensor keeps the brand and the know-how, the Iranian plant manufactures, and Hanpars structures and runs the arrangement.', points: ['Selection of an Iranian plant with the right line, capacity and inspection history', 'Licence, quality and supply agreements; technology transfer and validation', 'IFDA registration as a locally manufactured product under the licensor\'s name'] },
    ],
    servicesTitle: 'What the project covers',
    services: [
      { title: 'Feasibility and regulatory route', text: 'Reference product, patent and data position, IFDA requirements, pricing context and the most realistic path to approval.' },
      { title: 'Partner selection and qualification', text: 'Shortlist of GMP sites with the right technology and capacity, document review and audit coordination before any commitment.' },
      { title: 'Formulation and analytical development', text: 'Pre-formulation, formulation, method development and validation, comparative dissolution and bioequivalence planning.' },
      { title: 'Technology transfer and scale-up', text: 'Transfer protocols, exhibit and process-validation batches, with change control and records kept to one standard.' },
      { title: 'Stability and dossier', text: 'Stability studies for the intended climate and shelf life, and a CTD dossier assembled for IFDA review.' },
      { title: 'Registration, launch and lifecycle', text: 'IFDA submission and IRC, launch supply, variations, renewals and pharmacovigilance after approval.' },
    ],
    formsTitle: 'Dosage forms',
    forms: [
      { title: 'Oral solids', text: 'Immediate- and modified-release tablets, film-coated and orally disintegrating tablets, hard capsules.' },
      { title: 'Sterile injectables', text: 'Ampoules, vials and lyophilised powders; prefilled syringes with suitable partners.' },
      { title: 'Liquids and semi-solids', text: 'Oral solutions, suspensions and syrups; creams, ointments and gels.' },
    ],
    stepsTitle: 'How a project runs',
    stepsLede: 'Every project passes through the same five gates. Each one ends with a written decision before money is committed to the next.',
    steps: [
      { title: 'Brief and confidentiality', text: 'Product, strength, target market, volumes and timeline; NDA signed before technical data is shared.' },
      { title: 'Feasibility and route', text: 'Regulatory route, partner shortlist, indicative timeline and the main risks, in writing.' },
      { title: 'Partner and plan', text: 'Partner qualified, responsibilities and quality agreement set out, transfer and development plan agreed.' },
      { title: 'Batches and dossier', text: 'Development, exhibit and validation batches; stability started; dossier compiled section by section.' },
      { title: 'Approval and supply', text: 'IFDA submission, questions answered, IRC issued, launch supply and lifecycle management.' },
    ],
    focusTitle: 'Where our partners are',
    focusLede: 'We work where the technology and the regulatory record are strongest for each product.',
    focus: [
      { value: 'China', label: 'Hangzhou and Zhenjiang offices', text: 'Large-scale CDMO capacity and API integration; NMPA has been an ICH member since 2017.' },
      { value: 'Türkiye', label: 'Istanbul partner office', text: 'TİTCK has been a PIC/S participating authority since 2018; short land logistics to Iran.' },
      { value: 'Iran', label: 'Tehran head office', text: 'Local GMP manufacturers for technology transfer and production under licence.' },
    ],
    licTitle: 'Licensed manufacturing on Iranian lines',
    licLede: 'Iran manufactures most of the medicines it uses, and policy consistently favours local production. For many foreign products the realistic long-term route is therefore not import but manufacture under licence by an Iranian GMP plant, with the foreign company remaining the owner of the brand, the formulation and the quality standard.',
    licWhy: [
      { title: 'Policy and pricing', text: 'Locally manufactured products are treated more favourably in registration priority, pricing and insurance coverage than the same product imported.' },
      { title: 'Supply continuity', text: 'Production inside the country shortens lead times and removes the product from import-licence and foreign-currency cycles.' },
      { title: 'Control for the licensor', text: 'The licensor approves the site, the transferred process and every change; batch release follows its specifications and audit rights are written into the agreement.' },
      { title: 'A base of qualified plants', text: 'Iran has a large base of GMP-licensed manufacturers covering oral solids, injectables, liquids and semi-solids, several with experience of manufacturing for international licensors.' },
    ],
    licScope: [
      { title: 'Hanpars structures the arrangement', items: ['Shortlist and qualification of Iranian plants against the licensor\'s audit standard', 'Term sheet, licence, quality and supply agreements between the licensor and the plant', 'Regulatory route with IFDA: local manufacture under licence, registration and IRC', 'Project management of technology transfer, validation and launch; lifecycle afterwards'] },
      { title: 'The licensor and the plant deliver', items: ['Licensor: formulation, specifications, methods, reference standards and training', 'Plant: transfer batches, process validation, stability, manufacturing and batch release', 'Both: change control and the quality agreement throughout the product life', 'API and key materials may come from the licensor or from sources it approves'] },
    ],
    licNote: 'Hanpars is the coordinator and, where agreed, the licensee or commercial partner; manufacturing responsibility stays with the licensed Iranian plant under its own manufacturing licence.',
    rolesTitle: 'Who does what',
    weDo: { title: 'Hanpars', items: ['Project management and a single point of contact', 'Partner search, qualification and audit coordination', 'Regulatory strategy, CTD dossier and IFDA submission', 'Import, launch supply and lifecycle management'] },
    partnersDo: { title: 'Manufacturing partners', items: ['Development, manufacturing and quality control at their GMP sites', 'Batch release under their own manufacturing licence', 'Process validation and stability testing', 'Site inspections and GMP certificates'] },
    limits: 'Hanpars does not own a manufacturing plant, does not hold a GMP certificate for one and cannot guarantee a regulatory outcome. Responsibilities are written down in the quality and supply agreements before work starts.',
    briefTitle: 'What to send for a first assessment',
    brief: ['Product, strength and dosage form', 'Development stage and existing documentation', 'Target market and expected annual volume', 'Preferred timeline and any partner already in mind'],
    briefCta: 'Discuss a project',
  },

  fa: {
    kicker: 'توسعه و تولید قراردادی',
    introTitle: 'یک هماهنگ‌کنندهٔ پاسخ‌گو، از فرمولاسیون تا فرآوردهٔ ثبت‌شده در ایران',
    intro: [
      'فرآوردهٔ دارویی تنها زمانی به دست بیمار می‌رسد که فرمولاسیون، روش‌های آنالیز، افزایش مقیاس، مطالعات پایداری، بسته‌بندی، ثبت و تأمین همگی به‌درستی پیش بروند. هانیا پرسان دارو مدیریت این زنجیره را به یک تیم پروژه می‌سپارد و با شرکای توسعه و تولید دارای صلاحیت در چین، ترکیه، هند، اروپا و ایران همکاری می‌کند.',
      'برنامهٔ هر پروژه از ابتدا بر اساس بازار هدف تنظیم می‌شود؛ بنابراین بچ‌ها، برنامهٔ پایداری و پرونده از همان آغاز مطابق الزامات سازمان غذا و دارو تهیه می‌شوند، نه این‌که بعداً اصلاح شوند.',
    ],
    routesTitle: 'سه مسیر همکاری',
    routesLede: 'بیشتر پروژه‌ها از یکی از این سه نقطه آغاز می‌شوند. اساس کار در هر دو یکسان است: شرح روشن پروژه، شریک مناسب و پرونده‌ای که برای ایران تهیه شده باشد.',
    routes: [
      { tag: 'تولیدکنندگان خارجی', title: 'ورود فرآوردهٔ موجود به بازار ایران', text: 'برای تولیدکنندگانی که فرآوردهٔ تأییدشده دارند و خواهان ثبت و فروش آن در ایران هستند؛ از راه واردات یا، در مواردی که سیاست‌های کشور تولید داخل را ترجیح می‌دهد، از راه تولید توسط شریک ایرانی.', points: ['بررسی بازار و مسیر رگولاتوری', 'نامهٔ نمایندگی، پروندهٔ سازمان غذا و دارو و کد IRC', 'انتقال فناوری به کارخانهٔ دارای GMP در ایران، در صورت مناسب‌تر بودن تولید داخل'] },
      { tag: 'شرکت‌های ایرانی', title: 'توسعه یا تولید فرآورده در خارج از کشور', text: 'برای شرکت‌های ایرانی که به توسعهٔ فرمولاسیون، تولید قراردادی یا تأیید منبع دوم تولید در خارج از ایران نیاز دارند.', points: ['انتخاب و ارزیابی صلاحیت شریک CDMO', 'بچ‌های توسعه، اعتبارسنجی و پایداری', 'تأمین، مستندات و واردات به ایران'] },
      { tag: 'شرکت‌های بزرگ و چندملیتی', title: 'تولید تحت لیسانس در ایران', text: 'برای شرکت‌های اصیل‌ساز و ژنریک‌سازان بزرگ خارجی که تولید فرآورده‌شان در خطوط کارخانه‌های دارای GMP در ایران مناسب‌تر است: برند و دانش فنی نزد صاحب لیسانس می‌ماند، کارخانهٔ ایرانی تولید می‌کند و هانیا پرسان دارو ساختار همکاری را تنظیم و اجرا می‌کند.', points: ['انتخاب کارخانهٔ ایرانی با خط، ظرفیت و سابقهٔ بازرسی مناسب', 'قراردادهای لیسانس، کیفیت و تأمین؛ انتقال فناوری و اعتبارسنجی', 'ثبت در سازمان غذا و دارو به‌عنوان فرآوردهٔ تولید داخل با نام صاحب لیسانس'] },
    ],
    servicesTitle: 'دامنهٔ خدمات پروژه',
    services: [
      { title: 'امکان‌سنجی و مسیر رگولاتوری', text: 'بررسی فرآوردهٔ مرجع، وضعیت پتنت و داده، الزامات سازمان غذا و دارو، شرایط قیمت‌گذاری و واقع‌بینانه‌ترین مسیر ثبت.' },
      { title: 'انتخاب و ارزیابی صلاحیت شریک', text: 'معرفی کارخانه‌های دارای GMP با فناوری و ظرفیت مناسب، بررسی مستندات و هماهنگی ممیزی پیش از هرگونه تعهد.' },
      { title: 'توسعهٔ فرمولاسیون و روش‌های آنالیز', text: 'پیش‌فرمولاسیون، فرمولاسیون، توسعه و اعتبارسنجی روش، انحلال مقایسه‌ای و برنامه‌ریزی مطالعهٔ هم‌ارزی زیستی.' },
      { title: 'انتقال فناوری و افزایش مقیاس', text: 'پروتکل‌های انتقال، بچ‌های نمایشی و اعتبارسنجی فرایند، با کنترل تغییرات و سوابق یکپارچه.' },
      { title: 'پایداری و پرونده', text: 'مطالعات پایداری متناسب با شرایط اقلیمی و عمر قفسه‌ای هدف، و تدوین پروندهٔ CTD برای ارزیابی سازمان غذا و دارو.' },
      { title: 'ثبت، عرضه و چرخهٔ عمر', text: 'ارسال پرونده به سازمان غذا و دارو و اخذ کد IRC، تأمین محمولهٔ اولیه، تغییرات، تمدید پروانه و فارماکوویژیلانس.' },
    ],
    formsTitle: 'اشکال دارویی',
    forms: [
      { title: 'اشکال جامد خوراکی', text: 'قرص‌های آزادسازی فوری و تعدیل‌شده، قرص روکش‌دار و دهان‌پاش، کپسول سخت.' },
      { title: 'فرآورده‌های تزریقی استریل', text: 'آمپول، ویال و پودر لیوفیلیزه؛ سرنگ از پیش پرشده با شرکای دارای امکانات لازم.' },
      { title: 'مایعات و فرآورده‌های نیمه‌جامد', text: 'محلول، سوسپانسیون و شربت خوراکی؛ کرم، پماد و ژل.' },
    ],
    stepsTitle: 'مراحل اجرای پروژه',
    stepsLede: 'هر پروژه از پنج مرحلهٔ مشخص می‌گذرد و هر مرحله پیش از تخصیص هزینه به مرحلهٔ بعد، با تصمیمی مکتوب به پایان می‌رسد.',
    steps: [
      { title: 'شرح پروژه و محرمانگی', text: 'فرآورده، دوز، بازار هدف، حجم و زمان‌بندی؛ امضای توافق‌نامهٔ محرمانگی پیش از تبادل اطلاعات فنی.' },
      { title: 'امکان‌سنجی و تعیین مسیر', text: 'مسیر رگولاتوری، فهرست کوتاه شرکا، زمان‌بندی تقریبی و ریسک‌های اصلی، به‌صورت مکتوب.' },
      { title: 'انتخاب شریک و برنامه', text: 'ارزیابی صلاحیت شریک، تعیین مسئولیت‌ها و توافق‌نامهٔ کیفیت، و توافق بر برنامهٔ انتقال و توسعه.' },
      { title: 'بچ‌ها و پرونده', text: 'بچ‌های توسعه، نمایشی و اعتبارسنجی؛ آغاز مطالعات پایداری؛ تدوین بخش‌به‌بخش پرونده.' },
      { title: 'ثبت و تأمین', text: 'ارسال پرونده به سازمان غذا و دارو، پاسخ به پرسش‌ها، صدور کد IRC، تأمین اولیه و مدیریت چرخهٔ عمر.' },
    ],
    focusTitle: 'شبکهٔ شرکای ما',
    focusLede: 'برای هر فرآورده، با شریکی کار می‌کنیم که فناوری و سابقهٔ رگولاتوری آن برای همان فرآورده قوی‌تر است.',
    focus: [
      { value: 'چین', label: 'دفاتر هانگژو و ژن‌جیانگ', text: 'ظرفیت گستردهٔ CDMO و دسترسی یکپارچه به مادهٔ مؤثره؛ سازمان دارویی چین (NMPA) از سال ۲۰۱۷ عضو ICH است.' },
      { value: 'ترکیه', label: 'دفتر شریک در استانبول', text: 'سازمان دارو و تجهیزات پزشکی ترکیه (TİTCK) از سال ۲۰۱۸ عضو PIC/S است؛ مسیر حمل زمینی کوتاه تا ایران.' },
      { value: 'ایران', label: 'دفتر مرکزی تهران', text: 'تولیدکنندگان داخلی دارای GMP برای انتقال فناوری و تولید تحت لیسانس.' },
    ],
    licTitle: 'تولید قراردادی تحت لیسانس در خطوط کارخانه‌های داروسازی ایران',
    licLede: 'بخش عمدهٔ داروی مصرفی ایران در داخل کشور تولید می‌شود و سیاست‌های دارویی کشور به‌طور پیوسته تولید داخل را ترجیح می‌دهند. از این رو برای بسیاری از فرآورده‌های خارجی، مسیر واقع‌بینانه و پایدار نه واردات، بلکه تولید تحت لیسانس در کارخانهٔ دارای GMP ایرانی است؛ به‌گونه‌ای که شرکت خارجی همچنان مالک برند، فرمولاسیون و استاندارد کیفیت باقی می‌ماند.',
    licWhy: [
      { title: 'سیاست‌گذاری و قیمت‌گذاری', text: 'فرآوردهٔ تولید داخل در اولویت ثبت، قیمت‌گذاری و پوشش بیمه‌ای، نسبت به همان فرآوردهٔ وارداتی، در جایگاه مساعدتری قرار دارد.' },
      { title: 'تداوم تأمین', text: 'تولید در داخل کشور زمان تحویل را کوتاه می‌کند و فرآورده را از چرخهٔ مجوز واردات و تخصیص ارز خارج می‌سازد.' },
      { title: 'کنترل کامل برای صاحب لیسانس', text: 'صاحب لیسانس کارخانه، فرایند منتقل‌شده و هر تغییر را تأیید می‌کند؛ آزادسازی بچ بر اساس مشخصات او انجام می‌شود و حق ممیزی در قرارداد درج می‌گردد.' },
      { title: 'شبکهٔ گستردهٔ کارخانه‌های واجد شرایط', text: 'ایران شمار زیادی تولیدکنندهٔ دارای پروانهٔ GMP در اشکال جامد خوراکی، تزریقی، مایع و نیمه‌جامد دارد که برخی از آن‌ها سابقهٔ تولید برای صاحبان لیسانس بین‌المللی را دارند.' },
    ],
    licScope: [
      { title: 'نقش هانیا پرسان دارو', items: ['فهرست کوتاه و ارزیابی صلاحیت کارخانه‌های ایرانی مطابق استاندارد ممیزی صاحب لیسانس', 'تنظیم تفاهم‌نامه و قراردادهای لیسانس، کیفیت و تأمین میان صاحب لیسانس و کارخانه', 'تعیین مسیر رگولاتوری در سازمان غذا و دارو: تولید داخل تحت لیسانس، ثبت و اخذ کد IRC', 'مدیریت پروژهٔ انتقال فناوری، اعتبارسنجی و عرضه؛ سپس مدیریت چرخهٔ عمر'] },
      { title: 'نقش صاحب لیسانس و کارخانه', items: ['صاحب لیسانس: فرمولاسیون، مشخصات، روش‌های آنالیز، استانداردهای مرجع و آموزش', 'کارخانه: بچ‌های انتقال، اعتبارسنجی فرایند، پایداری، تولید و آزادسازی بچ', 'هر دو: کنترل تغییرات و اجرای توافق‌نامهٔ کیفیت در سراسر عمر فرآورده', 'مادهٔ مؤثره و مواد کلیدی از صاحب لیسانس یا منابع مورد تأیید او تأمین می‌شود'] },
    ],
    licNote: 'هانیا پرسان دارو هماهنگ‌کننده و، در صورت توافق، دارندهٔ لیسانس یا شریک تجاری است؛ مسئولیت تولید نزد کارخانهٔ ایرانی دارای پروانهٔ تولید باقی می‌ماند.',
    rolesTitle: 'تقسیم مسئولیت‌ها',
    weDo: { title: 'هانیا پرسان دارو', items: ['مدیریت پروژه و نقطهٔ تماس واحد', 'یافتن و ارزیابی صلاحیت شرکا و هماهنگی ممیزی', 'راهبرد رگولاتوری، پروندهٔ CTD و ثبت در سازمان غذا و دارو', 'واردات، تأمین اولیه و مدیریت چرخهٔ عمر'] },
    partnersDo: { title: 'شرکای تولیدی', items: ['توسعه، تولید و کنترل کیفیت در کارخانه‌های دارای GMP', 'آزادسازی بچ بر اساس پروانهٔ تولید خود', 'اعتبارسنجی فرایند و آزمون‌های پایداری', 'بازرسی کارخانه و گواهی GMP'] },
    limits: 'هانیا پرسان دارو کارخانهٔ تولیدی ندارد، گواهی GMP برای کارخانه‌ای در اختیار ندارد و نتیجهٔ ثبت را تضمین نمی‌کند. مسئولیت‌ها پیش از آغاز کار در توافق‌نامه‌های کیفیت و تأمین مکتوب می‌شود.',
    briefTitle: 'اطلاعات لازم برای ارزیابی اولیه',
    brief: ['فرآورده، دوز و شکل دارویی', 'مرحلهٔ توسعه و مستندات موجود', 'بازار هدف و حجم سالانهٔ مورد انتظار', 'زمان‌بندی مطلوب و شریک احتمالی مورد نظر'],
    briefCta: 'گفت‌وگو دربارهٔ پروژه',
  },

  zh: {
    kicker: '面向中国药企 · 伊朗市场准入与合同开发生产',
    introTitle: '中国药企“出海”伊朗，由一个团队负责到底。',
    intro: [
      '伊朗拥有约九千万人口，医院用药和专科药需求旺盛，监管体系以 CTD 资料为基础。对于已在国内或国际市场获批的中国制剂企业，伊朗是“出海”布局中值得重视的市场，但注册、定价、进口和上市各环节都需要熟悉当地规则的合作方。',
      'Hanpars 总部位于德黑兰，并在杭州、镇江设有办公室。我们作为伊朗进口商和注册代理，为中国企业统筹从市场评估、伊朗食品药品监督管理局（IFDA）注册到进口上市的全过程；在当地政策更倾向本地生产时，也可协调向伊朗 GMP 工厂进行技术转移和授权生产。',
    ],
    routesTitle: '三种合作方式',
    routesLede: '无论哪种方式，基础都相同：清晰的项目需求、合适的合作伙伴，以及按伊朗要求准备的注册资料。',
    routes: [
      { tag: '中国制剂企业', title: '已获批产品进入伊朗市场', text: '适用于已取得 NMPA、欧盟、WHO PQ 或其他主要市场批准的制剂产品，通过进口或授权当地生产进入伊朗。', points: ['市场与注册路径评估', '授权书（LoA）、IFDA 注册资料与 IRC 编码', '在本地生产更具优势时，向伊朗 GMP 工厂进行技术转移'] },
      { tag: '中国 CDMO 企业', title: '为伊朗客户提供开发与生产', text: '适用于具备制剂开发和商业化生产能力的中国 CDMO，承接伊朗药企的处方开发、合同生产或第二供应源项目。', points: ['由 Hanpars 对接伊朗申办方并明确需求', '开发、验证及稳定性批次的资料要求', '供货、文件与伊朗进口'] },
      { tag: '大型及跨国制药企业', title: '在伊朗工厂授权生产', text: '适用于原研企业和大型仿制药企业：产品在伊朗 GMP 工厂的生产线上授权生产，品牌与专有技术仍归许可方所有，由伊朗工厂负责生产，Hanpars 负责搭建并执行整个合作框架。', points: ['筛选生产线、产能和检查记录合适的伊朗工厂', '许可、质量与供货协议；技术转移与验证', '以许可方名义在 IFDA 注册为本地生产产品'] },
    ],
    servicesTitle: '项目服务范围',
    services: [
      { title: '可行性与注册路径', text: '参比制剂、专利与数据保护、IFDA 技术要求、定价环境，以及最可行的获批路径。' },
      { title: '伊朗合作方匹配', text: '为中国企业匹配伊朗进口、分销或本地生产伙伴，并在承诺前完成资料审核与沟通。' },
      { title: '注册资料本地化', text: '在 NMPA/ICH 格式基础上，按 IFDA 要求补充和调整 CTD 资料，包括波斯语标签和说明书。' },
      { title: '技术转移与放大', text: '需要在伊朗本地生产时，协调技术转移方案、展示批和工艺验证批，统一变更控制与记录。' },
      { title: '稳定性与质量文件', text: '按目标气候带和有效期设计稳定性研究；整理 GMP 证书、CoA 及工艺验证等质量文件。' },
      { title: '注册、上市与生命周期', text: 'IFDA 提交与 IRC 编码、首批供货、变更、再注册及上市后药物警戒。' },
    ],
    formsTitle: '剂型范围',
    forms: [
      { title: '口服固体制剂', text: '普通片、缓控释片、薄膜衣片、口崩片及硬胶囊。' },
      { title: '无菌注射剂', text: '安瓿、西林瓶及冻干粉针；具备条件的合作伙伴可提供预灌封注射器。' },
      { title: '液体及半固体制剂', text: '口服溶液、混悬剂和糖浆；乳膏、软膏和凝胶。' },
    ],
    stepsTitle: '项目推进流程',
    stepsLede: '每个项目都经过五个阶段，每个阶段均以书面结论收尾，再决定下一阶段的投入。',
    steps: [
      { title: '需求与保密', text: '产品、规格、目标市场、预计销量和时间表；交换技术资料前签署保密协议。' },
      { title: '可行性与路径', text: '书面给出注册路径、合作方建议、预估时间表和主要风险。' },
      { title: '合作方与计划', text: '确认伊朗合作方，明确各方职责并签署质量协议，确定注册资料或技术转移计划。' },
      { title: '批次与资料', text: '必要时生产展示批和验证批，启动稳定性研究，逐模块完成注册资料。' },
      { title: '获批与供货', text: '提交 IFDA、答复问询、取得 IRC 编码，首批供货并进入生命周期管理。' },
    ],
    focusTitle: '为什么现在布局伊朗',
    focusLede: '中国药企的监管基础和产能优势，与伊朗市场的需求正相契合。',
    focus: [
      { value: '2017', label: 'NMPA 加入 ICH', text: '中国药品注册体系与国际接轨，CTD 资料可直接作为伊朗注册的基础。' },
      { value: '2023', label: 'NMPA 申请加入 PIC/S', text: 'NMPA 自 2023 年 11 月起成为 PIC/S 申请方，中国 GMP 检查体系正进一步与国际标准趋同。' },
      { value: '约 9000 万', label: '伊朗人口', text: '医院用药、专科药及短缺药紧急进口需求持续存在。' },
    ],
    focusNote: '持有欧盟 GMP、WHO PQ 或 CEP 的产品，在伊朗注册时通常资料更完整、评审更顺畅。',
    licTitle: '在伊朗制药企业生产线上授权生产',
    licLede: '伊朗所用药品的大部分在本国生产，药品政策长期倾向本地制造。对于许多中国产品，长期可行的路径不是进口，而是在伊朗 GMP 工厂授权生产——中国企业仍是品牌、处方和质量标准的所有者。这与中国药企从“产品出海”走向“产能与标准出海”的方向一致。',
    licWhy: [
      { title: '政策与定价', text: '本地生产产品在注册优先级、定价和医保覆盖方面，比同一产品进口更具优势。' },
      { title: '供应连续性', text: '在伊朗境内生产可缩短交付周期，并使产品不受进口许可和外汇配额周期的影响。' },
      { title: '许可方保持控制', text: '许可方审核工厂、转移的工艺和每一项变更；批放行依据许可方的质量标准，审计权写入协议。' },
      { title: '成熟的 GMP 生产基础', text: '伊朗拥有数量众多、持有 GMP 许可的制药企业，覆盖口服固体、注射剂、液体和半固体制剂，其中若干家已有为国际许可方生产的经验。' },
    ],
    licScope: [
      { title: 'Hanpars 负责搭建合作框架', items: ['按照中国许可方的审计标准筛选并评估伊朗工厂', '起草条款清单及许可、质量与供货协议', '确定 IFDA 注册路径：授权本地生产、注册与 IRC 编码', '技术转移、验证和上市的项目管理，以及上市后的生命周期管理'] },
      { title: '许可方与工厂各司其职', items: ['中国许可方：处方、质量标准、分析方法、对照品与人员培训', '伊朗工厂：转移批、工艺验证、稳定性、生产与批放行', '双方：产品全生命周期内的变更控制与质量协议', '原料药及关键物料可由许可方供应，或来自其认可的供应商'] },
    ],
    licNote: 'Hanpars 是协调方，经约定也可作为被许可方或商业合作伙伴；生产责任由持有生产许可证的伊朗工厂承担。',
    rolesTitle: '各方职责',
    weDo: { title: 'Hanpars', items: ['伊朗市场评估与项目管理，单一对接窗口', 'IFDA 注册策略、资料本地化与申报', '进口、清关、首批供货与生命周期管理', '在杭州、镇江与中国团队直接沟通'] },
    partnersDo: { title: '中国合作企业', items: ['在其 GMP 工厂完成开发、生产和质量控制', '依据自身生产许可证放行批次', '工艺验证与稳定性研究', '接受现场检查并持有 GMP 证书'] },
    limits: 'Hanpars 不拥有生产工厂，不持有任何工厂的 GMP 证书，也不能保证注册结果。各方职责在项目启动前写入质量协议和供货协议。',
    briefTitle: '初步评估需要的信息',
    brief: ['产品、规格和剂型', '国内外获批情况（NMPA、欧盟、WHO PQ 等）及现有资料', '目标适应症、预计年销量', '期望时间表及合作方式（进口或本地生产）'],
    briefCta: '洽谈项目',
  },

  tr: {
    kicker: 'Türk ilaç üreticileri için · İran pazarı ve fason geliştirme/üretim',
    introTitle: 'Türk ilaç üreticileri için İran’a uzanan en kısa yol.',
    intro: [
      'Türk ilaç sektörü 2025’te yaklaşık 185 ülkeye 2,51 milyar ABD doları ihracat yaptı (İEİS). Yaklaşık 90 milyon nüfusu, güçlü hastane ve uzmanlık ilacı talebi ve kara yoluyla kısa lojistik mesafesiyle İran, bu büyümenin doğal bir sonraki adımıdır; ancak ruhsatlandırma, fiyatlandırma ve ithalat yerel deneyim gerektirir.',
      'Merkezi Tahran’da bulunan Hanpars, İstanbul’daki ortak ofisiyle birlikte Türk üreticiler adına ithalatçı ve ruhsat temsilcisi olarak çalışır: pazar değerlendirmesinden İran Gıda ve İlaç İdaresi (IFDA) ruhsatına, ithalattan piyasaya sunuma kadar tüm süreci tek ekip yürütür. Yerel üretimin öncelikli olduğu durumlarda İranlı GMP tesislerine teknoloji transferi ve lisanslı üretimi de koordine ederiz.',
    ],
    routesTitle: 'Üç iş birliği modeli',
    routesLede: 'Her iki modelin temeli aynıdır: net bir proje tanımı, doğru ortak ve İran gerekliliklerine göre hazırlanmış bir dosya.',
    routes: [
      { tag: 'Türk ilaç üreticileri', title: 'Ruhsatlı ürünlerinizi İran’a taşıyın', text: 'TİTCK veya diğer büyük otoritelerce onaylanmış bitmiş ürünler için; ithalat yoluyla ya da yerel bir ortakla lisanslı üretim yoluyla İran pazarına giriş.', points: ['Pazar ve ruhsatlandırma yolu değerlendirmesi', 'Yetki belgesi (LoA), IFDA dosyası ve IRC kodu', 'Yerel üretim daha avantajlıysa İranlı GMP tesisine teknoloji transferi'] },
      { tag: 'Türk fason üreticiler (CMO/CDMO)', title: 'İranlı firmalar için geliştirme ve üretim', text: 'Formülasyon geliştirme ve ticari üretim kapasitesine sahip Türk CDMO’lar için; İranlı ilaç firmalarının geliştirme, fason üretim veya ikinci kaynak projeleri.', points: ['İranlı sponsorla bağlantı ve ihtiyaçların netleştirilmesi', 'Geliştirme, validasyon ve stabilite serileri için doküman gereklilikleri', 'Tedarik, dokümantasyon ve İran’a ithalat'] },
      { tag: 'Büyük ve çok uluslu ilaç şirketleri', title: 'İran’da lisanslı üretim', text: 'Orijinal ürün sahipleri ve büyük jenerik üreticileri için: ürün, İran’daki GMP tesislerinin hatlarında lisans altında üretilir; marka ve teknik bilgi lisans verende kalır, İranlı tesis üretir, Hanpars iş birliğinin yapısını kurar ve yürütür.', points: ['Uygun hat, kapasite ve denetim geçmişine sahip İranlı tesisin seçimi', 'Lisans, kalite ve tedarik sözleşmeleri; teknoloji transferi ve validasyon', 'IFDA’da lisans verenin adıyla yerli üretim ürünü olarak ruhsat'] },
    ],
    servicesTitle: 'Projenin kapsamı',
    services: [
      { title: 'Fizibilite ve ruhsat yolu', text: 'Referans ürün, patent ve veri koruması, IFDA teknik gereklilikleri, fiyatlandırma ortamı ve en gerçekçi onay yolu.' },
      { title: 'İranlı ortak eşleştirme', text: 'Türk üreticiler için ithalat, dağıtım veya yerel üretim ortaklarının belirlenmesi; taahhüt öncesi doküman incelemesi.' },
      { title: 'Dosyanın İran’a uyarlanması', text: 'TİTCK / AB CTD dosyası temelinde IFDA gerekliliklerine göre uyarlama; Farsça etiket ve kullanma talimatı dahil.' },
      { title: 'Teknoloji transferi ve ölçek büyütme', text: 'Yerel üretim gerektiğinde transfer protokolleri, sergi ve proses validasyon serileri; tek standartta değişiklik kontrolü.' },
      { title: 'Stabilite ve kalite dokümanları', text: 'Hedef iklim kuşağına ve raf ömrüne uygun stabilite çalışmaları; GMP sertifikası, analiz sertifikası ve validasyon dokümanları.' },
      { title: 'Ruhsat, lansman ve yaşam döngüsü', text: 'IFDA başvurusu ve IRC kodu, ilk sevkiyat, varyasyonlar, ruhsat yenileme ve farmakovijilans.' },
    ],
    formsTitle: 'Dozaj formları',
    forms: [
      { title: 'Katı oral formlar', text: 'Hemen ve modifiye salımlı tabletler, film kaplı ve ağızda dağılan tabletler, sert kapsüller.' },
      { title: 'Steril enjektabller', text: 'Ampul, flakon ve liyofilize tozlar; uygun ortaklarla kullanıma hazır enjektörler.' },
      { title: 'Sıvı ve yarı katı formlar', text: 'Oral çözelti, süspansiyon ve şuruplar; krem, merhem ve jeller.' },
    ],
    stepsTitle: 'Proje nasıl ilerler',
    stepsLede: 'Her proje beş aşamadan geçer; her aşama bir sonraki aşamaya kaynak ayrılmadan önce yazılı bir kararla tamamlanır.',
    steps: [
      { title: 'Proje tanımı ve gizlilik', text: 'Ürün, doz, hedef pazar, hacim ve takvim; teknik veriler paylaşılmadan önce gizlilik sözleşmesi.' },
      { title: 'Fizibilite ve yol', text: 'Ruhsat yolu, ortak önerileri, tahmini takvim ve başlıca riskler yazılı olarak sunulur.' },
      { title: 'Ortak ve plan', text: 'İranlı ortak teyit edilir, sorumluluklar ve kalite anlaşması belirlenir, dosya veya transfer planı kararlaştırılır.' },
      { title: 'Seriler ve dosya', text: 'Gerektiğinde sergi ve validasyon serileri, stabilitenin başlatılması, dosyanın modül modül tamamlanması.' },
      { title: 'Onay ve tedarik', text: 'IFDA başvurusu, soruların yanıtlanması, IRC kodu, ilk sevkiyat ve yaşam döngüsü yönetimi.' },
    ],
    focusTitle: 'Neden şimdi İran',
    focusLede: 'Türk ilaç sektörünün kalite altyapısı ve coğrafi yakınlığı, İran pazarının ihtiyaçlarıyla örtüşüyor.',
    focus: [
      { value: '2018', label: 'TİTCK PIC/S üyesi', text: 'Türk GMP denetim sistemi uluslararası standartlarla uyumlu; bu, İran ruhsat dosyasında güçlü bir kanıttır.' },
      { value: '2,51 milyar $', label: '2025 ilaç ihracatı', text: 'Yaklaşık 185 ülkeye ihracat yapan sektör (İEİS, 2025).' },
      { value: '~90 milyon', label: 'İran nüfusu', text: 'Hastane ve uzmanlık ilaçlarında, ayrıca kıtlık durumunda acil ithalatta sürekli talep.' },
    ],
    focusNote: 'AB-GMP sertifikalı tesislerde üretilen ürünlerin İran ruhsat süreci genellikle daha hızlı ve sorunsuz ilerler.',
    licTitle: 'İran’daki ilaç tesislerinin hatlarında lisanslı fason üretim',
    licLede: 'İran’da kullanılan ilaçların büyük bölümü ülke içinde üretilir ve ilaç politikası istikrarlı biçimde yerli üretimi önceler. Bu nedenle birçok Türk ürünü için uzun vadede gerçekçi yol ithalat değil, İranlı bir GMP tesisinde lisans altında üretimdir; Türk şirketi marka, formülasyon ve kalite standardının sahibi olmaya devam eder. Bu model, Türk ilaç sanayisinin üretim ve kalite altyapısını ihracatın ötesinde değerlendirmenin de bir yoludur.',
    licWhy: [
      { title: 'Politika ve fiyatlandırma', text: 'Yerli üretilen ürün; ruhsat önceliği, fiyatlandırma ve geri ödeme kapsamında aynı ürünün ithal edilmesine göre daha avantajlı konumdadır.' },
      { title: 'Tedarik sürekliliği', text: 'Ülke içinde üretim teslim sürelerini kısaltır ve ürünü ithalat izni ile döviz tahsisi döngülerinin dışına çıkarır.' },
      { title: 'Lisans verenin kontrolü', text: 'Lisans veren tesisi, aktarılan prosesi ve her değişikliği onaylar; seri serbest bırakma onun spesifikasyonlarına göre yapılır, denetim hakkı sözleşmeye yazılır.' },
      { title: 'Nitelikli tesis tabanı', text: 'İran’da katı oral, enjektabl, sıvı ve yarı katı formları kapsayan çok sayıda GMP lisanslı üretici bulunur; bazıları uluslararası lisans verenler için üretim deneyimine sahiptir.' },
    ],
    licScope: [
      { title: 'Hanpars yapıyı kurar', items: ['Türk lisans verenin denetim standardına göre İranlı tesislerin kısa listesi ve yeterlilik değerlendirmesi', 'Lisans veren ile tesis arasında ön protokol, lisans, kalite ve tedarik sözleşmeleri', 'IFDA ruhsat yolu: lisans altında yerli üretim, ruhsat ve IRC kodu', 'Teknoloji transferi, validasyon ve lansmanın proje yönetimi; ardından yaşam döngüsü yönetimi'] },
      { title: 'Lisans veren ve tesis uygular', items: ['Türk lisans veren: formülasyon, spesifikasyonlar, analitik yöntemler, referans standartlar ve eğitim', 'İranlı tesis: transfer serileri, proses validasyonu, stabilite, üretim ve seri serbest bırakma', 'Her ikisi: ürün ömrü boyunca değişiklik kontrolü ve kalite anlaşması', 'Etkin madde ve kritik malzemeler lisans verenden ya da onayladığı kaynaklardan temin edilebilir'] },
    ],
    licNote: 'Hanpars koordinatördür ve anlaşmaya bağlı olarak lisans alan veya ticari ortak olabilir; üretim sorumluluğu kendi üretim iznine sahip İranlı tesiste kalır.',
    rolesTitle: 'Kim ne yapar',
    weDo: { title: 'Hanpars', items: ['İran pazar değerlendirmesi ve proje yönetimi, tek iletişim noktası', 'IFDA ruhsat stratejisi, dosya uyarlaması ve başvuru', 'İthalat, gümrük, ilk sevkiyat ve yaşam döngüsü yönetimi', 'İstanbul’daki ortak ofis üzerinden Türk ekiplerle doğrudan iletişim'] },
    partnersDo: { title: 'Türk iş ortakları', items: ['GMP tesislerinde geliştirme, üretim ve kalite kontrol', 'Kendi üretim izinleri kapsamında seri serbest bırakma', 'Proses validasyonu ve stabilite çalışmaları', 'Tesis denetimleri ve GMP sertifikaları'] },
    limits: 'Hanpars’ın bir üretim tesisi yoktur, bir tesis adına GMP sertifikası taşımaz ve ruhsat sonucunu garanti edemez. Sorumluluklar çalışma başlamadan önce kalite ve tedarik anlaşmalarında yazılı hale getirilir.',
    briefTitle: 'İlk değerlendirme için gerekenler',
    brief: ['Ürün, doz ve dozaj formu', 'Ruhsat durumu (TİTCK, AB vb.) ve mevcut dokümanlar', 'Hedef endikasyon ve tahmini yıllık hacim', 'Tercih edilen takvim ve model (ithalat veya yerel üretim)'],
    briefCta: 'Projeyi görüşelim',
  },
};
