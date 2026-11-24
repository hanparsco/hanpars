// FAQ for the main Regulatory affairs page (visible questions + FAQPage structured data).
export const raFaq: Record<'en' | 'fa' | 'zh' | 'tr', { title: string; items: { q: string; a: string }[] }> = {
  en: { title: 'Common questions', items: [
    { q: 'What regulatory services does Hanpars offer?', a: 'Development strategy and study planning, CTD/eCTD dossier and IMPD writing, dossier review and responses to deficiency letters, GMP inspection readiness, post-approval variations and renewals, and regulatory training. Each core service has its own page.' },
    { q: 'In which countries can you register a medicine or API?', a: 'In any country or region. We work most often with the EMA and EU member states, the MHRA, the Iran FDA, TİTCK, the EAEU and the Gulf authorities, and also with the FDA, NMPA, PMDA and agencies in Latin America and Africa. Where a local company or agent is required, we can help you find one.' },
    { q: 'Can you act as our local company in Iran?', a: 'Yes. Hanpars is an IFDA-licensed importer and can be the applicant, licence holder and importer for a foreign manufacturer, or prepare the dossier only, working with your existing Iranian partner.' },
    { q: 'Can you work on our existing dossier, or only write new ones?', a: 'Both. We review and update existing dossiers for new markets, answer deficiency letters on dossiers written by others, and write new modules or complete dossiers when needed.' },
    { q: 'How do you keep our technical data confidential?', a: 'Technical data is exchanged only after a confidentiality agreement is signed, and access is limited to the people working on your project.' },
    { q: 'How do we start, and what do you need from us?', a: 'Send us the product, the target market and where the dossier stands. A regulatory specialist replies with the likely route, the documents needed and an approximate timeline before any commitment.' },
  ] },
  fa: { title: 'پرسش‌های متداول', items: [
    { q: 'هانیا پرسان دارو چه خدمات رگولاتوری ارائه می‌دهد؟', a: 'راهبرد توسعه و طرح مطالعات، نگارش پروندهٔ CTD/eCTD و IMPD، تجزیه و تحلیل مدارک و پرونده و پاسخ به نامهٔ نقص، آمادگی بازرسی GMP، تغییرات و تمدید پس از تأیید و آموزش رگولاتوری. هر خدمت اصلی صفحهٔ جداگانه دارد.' },
    { q: 'در چه کشورهایی می‌توانید دارو یا مادهٔ اولیه ثبت کنید؟', a: 'در هر کشور یا منطقه‌ای. بیشتر با EMA و کشورهای اتحادیهٔ اروپا، MHRA، سازمان غذا و دارو، TİTCK، اتحادیهٔ اوراسیا و مراجع کشورهای خلیج فارس کار می‌کنیم و همچنین با FDA، NMPA، PMDA و مراجع آمریکای لاتین و آفریقا. هر جا شرکت یا نمایندهٔ محلی لازم باشد، در پیدا کردن آن کمک می‌کنیم.' },
    { q: 'آیا می‌توانید شرکت ایرانی طرف قرارداد ما باشید؟', a: 'بله. هانیا پرسان دارو واردکنندهٔ دارای مجوز از سازمان غذا و دارو است و می‌تواند متقاضی ثبت، صاحب پروانه و واردکنندهٔ فرآوردهٔ تولیدکنندهٔ خارجی باشد، یا فقط کار پرونده را همراه شریک ایرانی فعلی شما انجام دهد.' },
    { q: 'روی پروندهٔ موجود ما کار می‌کنید یا فقط پروندهٔ جدید می‌نویسید؟', a: 'هر دو. پرونده‌های موجود را برای بازار جدید بازبینی و به‌روز می‌کنیم، به نامهٔ نقص پرونده‌هایی که دیگران نوشته‌اند پاسخ می‌دهیم و در صورت نیاز ماژول‌های جدید یا کل پرونده را می‌نویسیم.' },
    { q: 'محرمانه ماندن اطلاعات فنی ما چطور تضمین می‌شود؟', a: 'اطلاعات فنی فقط پس از امضای قرارداد محرمانگی تبادل می‌شود و فقط افرادی که روی پروژهٔ شما کار می‌کنند به آن دسترسی دارند.' },
    { q: 'برای شروع چه کاری باید بکنیم و چه مدارکی لازم است؟', a: 'نام فرآورده، بازار هدف و وضعیت فعلی پرونده را بفرستید. کارشناس رگولاتوری پیش از هر تعهدی، مسیر محتمل ثبت، مدارک لازم و زمان‌بندی تقریبی را اعلام می‌کند.' },
  ] },
  zh: { title: '常见问题', items: [
    { q: '汉帕斯提供哪些注册事务服务？', a: '开发策略与研究计划、CTD/eCTD 资料和 IMPD 撰写、资料审核与缺陷信答复、GMP 检查准备、批准后变更与再注册，以及注册培训。每项核心服务都有独立页面。' },
    { q: '你们可以在哪些国家注册药品或原料药？', a: '任何国家或地区均可。我们最常对接 EMA 及欧盟成员国、英国 MHRA、伊朗 IFDA、土耳其 TİTCK、欧亚经济联盟和海湾国家机构，也对接 FDA、NMPA、PMDA 以及拉丁美洲和非洲的监管机构。需要本地公司或代理时，我们可协助寻找。' },
    { q: '你们能否担任我们在伊朗的本地公司？', a: '可以。汉帕斯是持有 IFDA 许可的进口商，可以作为外国生产企业的申请人、注册证持有人和进口商，也可以只负责注册资料，与您现有的伊朗合作方配合。' },
    { q: '你们能否基于我们现有的资料工作，还是只撰写新资料？', a: '两者皆可。我们可以为新市场审核和更新现有资料，答复他人撰写资料的缺陷信，并在需要时撰写新模块或完整资料。' },
    { q: '如何保证我们的技术资料保密？', a: '技术资料仅在签署保密协议后交换，且只有参与您项目的人员可以接触。' },
    { q: '如何开始合作？需要我们提供什么？', a: '请发送产品、目标市场和资料目前的进展。注册专员会在任何承诺之前告知可能的注册路径、所需文件和大致时间。' },
  ] },
  tr: { title: 'Sık sorulan sorular', items: [
    { q: 'Hanpars hangi ruhsatlandırma hizmetlerini sunuyor?', a: 'Geliştirme stratejisi ve çalışma planlaması, CTD/eCTD dosyası ve IMPD yazımı, dosya incelemesi ve eksiklik yazılarına yanıtlar, GMP denetim hazırlığı, onay sonrası varyasyonlar ve yenilemeler ile ruhsatlandırma eğitimi. Her temel hizmetin ayrı bir sayfası vardır.' },
    { q: 'Hangi ülkelerde ilaç veya etkin madde ruhsatı alabilirsiniz?', a: 'Her ülke veya bölgede. En sık EMA ve AB üye devletleri, MHRA, İran IFDA, TİTCK, AEB ve Körfez otoriteleriyle; ayrıca FDA, NMPA, PMDA ile Latin Amerika ve Afrika otoriteleriyle çalışıyoruz. Yerel bir şirket veya acente gerektiğinde bulmanıza yardımcı oluruz.' },
    { q: 'İran’da yerel şirketimiz olabilir misiniz?', a: 'Evet. Hanpars IFDA lisanslı bir ithalatçıdır; yabancı bir üretici için başvuru sahibi, ruhsat sahibi ve ithalatçı olabilir ya da yalnızca dosyayı hazırlayarak mevcut İranlı ortağınızla birlikte çalışabilir.' },
    { q: 'Mevcut dosyamız üzerinde mi çalışıyorsunuz, yoksa yalnızca yeni dosya mı yazıyorsunuz?', a: 'Her ikisi de. Mevcut dosyaları yeni pazarlar için inceler ve güncelleriz, başkalarının yazdığı dosyalara gelen eksiklik yazılarını yanıtlarız ve gerektiğinde yeni modüller veya dosyanın tamamını yazarız.' },
    { q: 'Teknik verilerimizin gizliliğini nasıl sağlıyorsunuz?', a: 'Teknik veriler yalnızca gizlilik sözleşmesi imzalandıktan sonra paylaşılır ve yalnızca projenizde çalışan kişiler erişebilir.' },
    { q: 'Nasıl başlarız, sizin bizden neye ihtiyacınız var?', a: 'Ürünü, hedef pazarı ve dosyanın bulunduğu aşamayı iletin. Bir ruhsatlandırma uzmanı, herhangi bir taahhütten önce olası yolu, gereken belgeleri ve yaklaşık süreyi bildirir.' },
  ] },
};
