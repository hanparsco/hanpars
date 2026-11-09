// FAQ for the FDF CDMO page (rendered as visible questions and as FAQPage structured data).
// Claims stay within what the CDMO page itself states; no timelines or guarantees.
export const cdmoFaq: Record<'en' | 'fa' | 'zh' | 'tr', { title: string; items: { q: string; a: string }[] }> = {
  en: {
    title: 'FDF CDMO services: common questions',
    items: [
      { q: 'What FDF CDMO services does Hanpars offer?', a: 'Hanpars coordinates contract development and manufacturing of finished dosage forms: feasibility and regulatory route, selection and qualification of a GMP partner, formulation and analytical development, technology transfer and scale-up, stability studies, a CTD dossier for IFDA review, registration (IRC), launch supply and lifecycle management.' },
      { q: 'Does Hanpars own a manufacturing plant?', a: 'No. Development and manufacturing take place at the GMP sites of qualified partners in China, Türkiye, India, Europe and Iran, who release batches under their own manufacturing licences. Hanpars manages the project, the dossier and the registration, and responsibilities are written into the quality and supply agreements before work starts.' },
      { q: 'Which dosage forms can be developed or manufactured?', a: 'Oral solids (immediate- and modified-release tablets, film-coated and orally disintegrating tablets, hard capsules), sterile injectables (ampoules, vials, lyophilised powders and, with suitable partners, prefilled syringes), and liquids and semi-solids (solutions, suspensions, syrups, creams, ointments and gels).' },
      { q: 'Can a foreign product be manufactured under licence in Iran?', a: 'Yes. For many foreign products the realistic long-term route is manufacture under licence by an Iranian GMP plant. The licensor keeps the brand, formulation and quality standard; the plant manufactures and releases batches; Hanpars selects the plant, structures the licence, quality and supply agreements, and runs technology transfer and IFDA registration.' },
      { q: 'What do you need for a first assessment?', a: 'The product, strength and dosage form; development stage and existing documentation; target market and expected annual volume; preferred timeline and any partner already in mind. A confidentiality agreement is signed before technical data is shared.' },
    ],
  },
  fa: {
    title: 'پرسش‌های متداول دربارهٔ توسعه و تولید قراردادی (CDMO)',
    items: [
      { q: 'هانیا پرسان دارو چه خدمات CDMO ارائه می‌دهد؟', a: 'هماهنگی کامل توسعه و تولید قراردادی فرآورده‌های دارویی: امکان‌سنجی و مسیر رگولاتوری، انتخاب و ارزیابی شریک دارای GMP، توسعهٔ فرمولاسیون و روش‌های آنالیز، انتقال فناوری و افزایش مقیاس، مطالعات پایداری، تهیهٔ پروندهٔ CTD برای سازمان غذا و دارو، ثبت و اخذ IRC، تأمین برای عرضه و مدیریت چرخهٔ عمر محصول.' },
      { q: 'آیا هانیا پرسان دارو کارخانهٔ تولیدی دارد؟', a: 'خیر. توسعه و تولید در سایت‌های دارای GMP شرکای ارزیابی‌شده در چین، ترکیه، هند، اروپا و ایران انجام می‌شود و آزادسازی بچ با پروانهٔ تولید خود آن‌هاست. مدیریت پروژه، پرونده و ثبت با هانیا پرسان داروست و مسئولیت‌ها پیش از شروع کار در قراردادهای کیفیت و تأمین نوشته می‌شود.' },
      { q: 'چه اشکال دارویی قابل توسعه یا تولید است؟', a: 'جامدات خوراکی (قرص‌های آزادسازی فوری و تعدیل‌شده، قرص روکش‌دار و دهان‌پاش، کپسول سخت)، تزریقی‌های استریل (آمپول، ویال، پودر لیوفیلیزه و با شریک مناسب، سرنگ پیش‌پرشده) و مایعات و نیمه‌جامدات (محلول، سوسپانسیون، شربت، کرم، پماد و ژل).' },
      { q: 'آیا محصول خارجی را می‌توان تحت لیسانس در ایران تولید کرد؟', a: 'بله. برای بسیاری از محصولات خارجی، مسیر واقع‌بینانهٔ بلندمدت تولید تحت لیسانس در یک کارخانهٔ دارای GMP در ایران است. صاحب لیسانس مالک برند، فرمولاسیون و استاندارد کیفیت می‌ماند، کارخانه تولید و آزادسازی می‌کند و هانیا پرسان دارو انتخاب کارخانه، قراردادها، انتقال فناوری و ثبت در سازمان غذا و دارو را پیش می‌برد.' },
      { q: 'برای ارزیابی اولیه چه اطلاعاتی لازم است؟', a: 'نام محصول، قدرت و شکل دارویی؛ مرحلهٔ توسعه و مستندات موجود؛ بازار هدف و حجم سالانهٔ مورد انتظار؛ زمان‌بندی مطلوب و شریک احتمالی. پیش از تبادل اطلاعات فنی، قرارداد محرمانگی امضا می‌شود.' },
    ],
  },
  zh: {
    title: '制剂 CDMO 服务常见问题',
    items: [
      { q: '汉帕斯提供哪些制剂 CDMO 服务？', a: '汉帕斯统筹制剂的合同研发与生产：可行性与注册路径评估，GMP 合作工厂的筛选与资质审核，处方与分析方法开发，技术转移与放大，稳定性研究，按伊朗食品药品监督管理局（IFDA）要求编写 CTD 资料，注册取得 IRC，上市供货及产品生命周期管理。' },
      { q: '汉帕斯自己有生产工厂吗？', a: '没有。研发和生产在中国、土耳其、印度、欧洲和伊朗经过审核的合作方 GMP 工厂进行，批次放行由合作方依其生产许可负责。汉帕斯负责项目管理、注册资料与注册申报，各方职责在开工前写入质量协议和供货协议。' },
      { q: '可以开发或生产哪些剂型？', a: '口服固体制剂（普通片、缓控释片、薄膜衣片、口腔崩解片、硬胶囊），无菌注射剂（安瓿、西林瓶、冻干粉针，以及与合适伙伴合作的预灌封注射器），液体和半固体制剂（溶液剂、混悬剂、糖浆剂、乳膏、软膏和凝胶）。' },
      { q: '外国产品可以在伊朗授权生产吗？', a: '可以。对许多外国产品来说，长期更现实的路径是由伊朗 GMP 工厂授权生产。许可方保留品牌、处方和质量标准；工厂负责生产和批次放行；汉帕斯负责选厂、拟定许可、质量和供货协议，并推进技术转移和 IFDA 注册。' },
      { q: '初步评估需要提供哪些信息？', a: '产品名称、规格和剂型；研发阶段和现有资料；目标市场和预计年需求量；期望时间表以及已考虑的合作方。在交换技术资料前双方签署保密协议。' },
    ],
  },
  tr: {
    title: 'FDF CDMO hizmetleri: sık sorulan sorular',
    items: [
      { q: 'Hanpars hangi FDF CDMO hizmetlerini sunuyor?', a: 'Bitmiş ürünlerin sözleşmeli geliştirme ve üretimini koordine ediyoruz: fizibilite ve ruhsat yolu, GMP ortağının seçimi ve yeterlilik değerlendirmesi, formülasyon ve analitik geliştirme, teknoloji transferi ve ölçek büyütme, stabilite çalışmaları, IFDA incelemesi için CTD dosyası, ruhsatlandırma (IRC), lansman tedariki ve yaşam döngüsü yönetimi.' },
      { q: 'Hanpars’ın kendi üretim tesisi var mı?', a: 'Hayır. Geliştirme ve üretim; Çin, Türkiye, Hindistan, Avrupa ve İran’daki yeterliliği onaylanmış ortakların GMP tesislerinde yapılır ve seri serbest bırakma onların üretim izniyle olur. Proje yönetimi, dosya ve ruhsatlandırma Hanpars’tadır; sorumluluklar işe başlamadan kalite ve tedarik sözleşmelerine yazılır.' },
      { q: 'Hangi dozaj formları geliştirilebilir veya üretilebilir?', a: 'Oral katılar (hızlı ve değiştirilmiş salımlı tabletler, film kaplı ve ağızda dağılan tabletler, sert kapsüller), steril enjektabller (ampul, flakon, liyofilize toz ve uygun ortaklarla kullanıma hazır şırınga) ile sıvı ve yarı katı formlar (çözelti, süspansiyon, şurup, krem, merhem ve jel).' },
      { q: 'Yabancı bir ürün İran’da lisans altında üretilebilir mi?', a: 'Evet. Pek çok yabancı ürün için uzun vadede gerçekçi yol, İran’daki bir GMP tesisinde lisans altında üretimdir. Lisans veren marka, formülasyon ve kalite standardının sahibi kalır; tesis üretir ve seriyi serbest bırakır; Hanpars tesisi seçer, sözleşmeleri kurar, teknoloji transferini ve IFDA ruhsatını yürütür.' },
      { q: 'İlk değerlendirme için ne gerekiyor?', a: 'Ürün, doz ve dozaj formu; geliştirme aşaması ve mevcut belgeler; hedef pazar ve beklenen yıllık hacim; tercih edilen takvim ve düşünülen bir ortak varsa adı. Teknik veriler paylaşılmadan önce gizlilik sözleşmesi imzalanır.' },
    ],
  },
};
