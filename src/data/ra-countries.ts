// Drug registration by country (/regulatory-affairs/drug-registration): main markets + other regions.
export type RegLang = 'en' | 'fa' | 'zh' | 'tr';

export const raMarkets: { slug: string; t: Record<RegLang, { name: string; text: string }> }[] = [
 {
  "slug": "iran",
  "t": {
   "en": {
    "name": "Drug registration in Iran",
    "text": "For foreign manufacturers: registration of finished products and APIs with the Iran Food and Drug Administration, with Hanpars as your local company or as dossier support for your existing partner."
   },
   "fa": {
    "name": "ثبت دارو در ایران",
    "text": "ثبت فرآورده و مادهٔ اولیهٔ تولیدکنندگان خارجی در سازمان غذا و دارو؛ هانیا پرسان دارو می‌تواند شرکت ایرانی طرف قرارداد شما باشد یا فقط کار پرونده را برای شریک فعلی‌تان انجام دهد."
   },
   "zh": {
    "name": "伊朗药品注册",
    "text": "面向希望进入伊朗市场的中国制药企业：在伊朗食品药品监督管理局注册制剂和原料药。汉帕斯可作为您在伊朗的本地公司，也可只为您现有的伊朗合作方提供注册资料支持。"
   },
   "tr": {
    "name": "İran’da ilaç ruhsatı",
    "text": "İran pazarına girmek isteyen Türk üreticiler için İran Gıda ve İlaç Kurumu nezdinde ruhsat. Hanpars İran’daki yerel şirketiniz olabilir veya yalnızca mevcut İranlı ortağınızla dosya desteği verebilir."
   }
  }
 },
 {
  "slug": "eu",
  "t": {
   "en": {
    "name": "Drug registration in the EU",
    "text": "Choosing the route, preparing the eCTD dossier and supporting the procedure with the EMA and national competent authorities."
   },
   "fa": {
    "name": "ثبت دارو در اتحادیهٔ اروپا",
    "text": "انتخاب مسیر ثبت، تهیهٔ پروندهٔ eCTD و همراهی در فرایند ارزیابی EMA و مراجع ملی کشورهای عضو."
   },
   "zh": {
    "name": "欧盟药品注册",
    "text": "选择注册路径、准备 eCTD 资料，并支持与 EMA 及各成员国主管机构的审评程序。"
   },
   "tr": {
    "name": "AB’de ilaç ruhsatı",
    "text": "Yolun seçilmesi, eCTD dosyasının hazırlanması ve EMA ile ulusal yetkili otoriteler nezdindeki sürecin desteklenmesi."
   }
  }
 },
 {
  "slug": "uk",
  "t": {
   "en": {
    "name": "Drug registration in the UK",
    "text": "UK-wide marketing authorisation through the International Recognition Procedure or the national route, with dossier, submission and assessment support."
   },
   "fa": {
    "name": "ثبت دارو در بریتانیا",
    "text": "اخذ پروانهٔ فروش برای کل بریتانیا از مسیر شناسایی بین‌المللی یا مسیر ملی، همراه با تهیهٔ پرونده، ارسال و پیگیری ارزیابی."
   },
   "zh": {
    "name": "英国药品注册",
    "text": "通过国际认可程序或国家路径获得覆盖全英国的上市许可，提供资料、递交和审评支持。"
   },
   "tr": {
    "name": "Birleşik Krallık’ta ilaç ruhsatı",
    "text": "Uluslararası Tanıma Prosedürü veya ulusal yolla tüm Birleşik Krallık için ruhsat; dosya, başvuru ve değerlendirme desteği."
   }
  }
 },
 {
  "slug": "turkiye",
  "t": {
   "en": {
    "name": "Drug registration in Türkiye",
    "text": "Licensing of imported medicines with the Turkish Medicines and Medical Devices Agency, from the dossier and GMP certificate to price approval."
   },
   "fa": {
    "name": "ثبت دارو در ترکیه",
    "text": "صدور پروانهٔ داروهای وارداتی در سازمان دارو و تجهیزات پزشکی ترکیه، از پرونده و گواهی GMP تا تأیید قیمت."
   },
   "zh": {
    "name": "土耳其药品注册",
    "text": "在土耳其药品和医疗器械管理局办理进口药品许可，从注册资料和 GMP 证书到价格批准。"
   },
   "tr": {
    "name": "Türkiye’de ilaç ruhsatı",
    "text": "İthal ilaçların Türkiye İlaç ve Tıbbi Cihaz Kurumu’nda ruhsatlandırılması; dosya ve GMP sertifikasından fiyat onayına kadar."
   }
  }
 },
 {
  "slug": "russia-eaeu",
  "t": {
   "en": {
    "name": "Drug registration in Russia and the EAEU",
    "text": "Registration under the common rules of the EAEU (Russia, Belarus, Kazakhstan, Armenia and Kyrgyzstan), with Russia or another member state as the reference state."
   },
   "fa": {
    "name": "ثبت دارو در روسیه و اوراسیا",
    "text": "ثبت طبق قواعد مشترک EAEU (روسیه، بلاروس، قزاقستان، ارمنستان و قرقیزستان)، با روسیه یا یکی دیگر از اعضا به‌عنوان کشور مرجع."
   },
   "zh": {
    "name": "俄罗斯及欧亚经济联盟药品注册",
    "text": "按欧亚经济联盟（俄罗斯、白俄罗斯、哈萨克斯坦、亚美尼亚和吉尔吉斯斯坦）统一规则注册，以俄罗斯或其他成员国作为参考国。"
   },
   "tr": {
    "name": "Rusya ve AEB’de ilaç ruhsatı",
    "text": "AEB’nin (Rusya, Belarus, Kazakistan, Ermenistan ve Kırgızistan) ortak kurallarına göre ruhsat; referans devlet olarak Rusya veya başka bir üye."
   }
  }
 },
 {
  "slug": "gcc",
  "t": {
   "en": {
    "name": "Drug registration in the GCC",
    "text": "Centralised registration through the Gulf Health Council, or national registration with the SFDA, the UAE and the other Gulf authorities."
   },
   "fa": {
    "name": "ثبت دارو در کشورهای خلیج فارس",
    "text": "ثبت متمرکز از طریق شورای سلامت خلیج (GHC) یا ثبت ملی در SFDA عربستان، امارات و دیگر مراجع منطقه."
   },
   "zh": {
    "name": "海湾国家药品注册",
    "text": "通过海湾卫生理事会（GHC）集中注册，或在沙特 SFDA、阿联酋及其他海湾监管机构进行国家注册。"
   },
   "tr": {
    "name": "Körfez ülkelerinde ilaç ruhsatı",
    "text": "Körfez Sağlık Konseyi (GHC) üzerinden merkezi kayıt veya SFDA, BAE ve diğer Körfez otoriteleri nezdinde ulusal kayıt."
   }
  }
 }
];

export const raRegHub: Record<RegLang, { nav: string; metaTitle: string; metaDesc: string; title: string; lead: string; detailTitle: string; detailLede: string; otherTitle: string; otherLede: string; regions: { h: string; p: string }[]; note: string }> = {
 "en": {
  "nav": "Drug registration by country",
  "metaTitle": "Drug registration by country and region: EU, UK, Iran, Türkiye, EAEU, GCC and more | Hanpars",
  "metaDesc": "Drug and API registration worldwide: EU, UK, Iran, Türkiye, Russia/EAEU and the GCC, and also the US, China, Japan, Latin America, Africa and other markets. Dossiers, submissions and local partner support.",
  "title": "Drug registration by country and region",
  "lead": "We register medicines and APIs in any country or region: our main markets and many others.",
  "detailTitle": "Main markets",
  "detailLede": "Markets where we are asked most often for registration support.",
  "otherTitle": "Other countries and regions",
  "otherLede": "These are examples. We also prepare dossiers, manage submissions and help find local partners and agents in other markets, including:",
  "regions": [
   {
    "h": "United States (FDA)",
    "p": "NDA, ANDA and BLA strategy, DMF filings and eCTD submissions."
   },
   {
    "h": "Canada and Switzerland",
    "p": "Health Canada and Swissmedic applications, including reliance on existing approvals."
   },
   {
    "h": "China (NMPA)",
    "p": "Imported drug registration, API registration and the China Module 1."
   },
   {
    "h": "Japan and South Korea",
    "p": "PMDA and MFDS applications with local partner support."
   },
   {
    "h": "Southeast Asia and Australia",
    "p": "ASEAN ACTD submissions and TGA applications."
   },
   {
    "h": "Latin America",
    "p": "ANVISA (Brazil), COFEPRIS (Mexico), ANMAT (Argentina), INVIMA (Colombia) and other agencies."
   },
   {
    "h": "Africa",
    "p": "SAHPRA (South Africa), EDA (Egypt), NAFDAC (Nigeria) and other national and regional authorities."
   },
   {
    "h": "Central and South Asia, Caucasus",
    "p": "National registrations in Central Asia, the Caucasus and South Asia."
   }
  ],
  "note": "Your market is not listed? Tell us the country and the product; the approach is the same: route, dossier, submission and, where needed, a local partner or agent."
 },
 "fa": {
  "nav": "ثبت دارو در کشورهای مختلف",
  "metaTitle": "ثبت دارو در کشورها و مناطق مختلف: اروپا، بریتانیا، ایران، ترکیه، اوراسیا، خلیج فارس و… | هانیا پرسان دارو",
  "metaDesc": "ثبت دارو و مادهٔ اولیه در کشورهای مختلف: اتحادیهٔ اروپا، بریتانیا، ایران، ترکیه، روسیه و اوراسیا، کشورهای خلیج فارس و همچنین آمریکا، چین، ژاپن، آمریکای لاتین، آفریقا و بازارهای دیگر.",
  "title": "ثبت دارو در کشورها و مناطق مختلف",
  "lead": "ثبت دارو و مادهٔ اولیه را در هر کشور یا منطقه‌ای انجام می‌دهیم؛ هم در بازارهای اصلی و هم در بسیاری از کشورهای دیگر.",
  "detailTitle": "بازارهای اصلی",
  "detailLede": "بازارهایی که بیشتر برای ثبت در آن‌ها از ما کمک خواسته می‌شود.",
  "otherTitle": "سایر کشورها و مناطق",
  "otherLede": "این‌ها فقط نمونه‌اند. در بازارهای دیگر هم پرونده را آماده می‌کنیم، ارسال را پیگیری می‌کنیم و در پیدا کردن شریک و نمایندهٔ محلی کمک می‌کنیم؛ از جمله:",
  "regions": [
   {
    "h": "آمریکا (FDA)",
    "p": "راهبرد NDA، ANDA و BLA، ثبت DMF و ارسال eCTD."
   },
   {
    "h": "کانادا و سوئیس",
    "p": "درخواست به Health Canada و Swissmedic، از جمله با اتکا به تأییدیه‌های موجود."
   },
   {
    "h": "چین (NMPA)",
    "p": "ثبت داروی وارداتی، ثبت مادهٔ اولیه و ماژول ۱ چین."
   },
   {
    "h": "ژاپن و کرهٔ جنوبی",
    "p": "درخواست به PMDA و MFDS با همکاری شریک محلی."
   },
   {
    "h": "جنوب شرق آسیا و استرالیا",
    "p": "ارسال پرونده با ACTD کشورهای آسه‌آن و درخواست به TGA."
   },
   {
    "h": "آمریکای لاتین",
    "p": "ANVISA (برزیل)، COFEPRIS (مکزیک)، ANMAT (آرژانتین)، INVIMA (کلمبیا) و مراجع دیگر."
   },
   {
    "h": "آفریقا",
    "p": "SAHPRA (آفریقای جنوبی)، EDA (مصر)، NAFDAC (نیجریه) و دیگر مراجع ملی و منطقه‌ای."
   },
   {
    "h": "آسیای مرکزی و جنوبی، قفقاز",
    "p": "ثبت ملی در کشورهای آسیای مرکزی، قفقاز و جنوب آسیا."
   }
  ],
  "note": "بازار موردنظرتان در فهرست نیست؟ کشور و فرآورده را بگویید. روش کار همین است: انتخاب مسیر، تهیهٔ پرونده، ارسال و در صورت نیاز، شریک یا نمایندهٔ محلی."
 },
 "zh": {
  "nav": "各国药品注册",
  "metaTitle": "各国及地区药品注册：欧盟、英国、伊朗、土耳其、欧亚经济联盟、海湾国家等 | 汉帕斯",
  "metaDesc": "全球药品和原料药注册：欧盟、英国、伊朗、土耳其、俄罗斯/欧亚经济联盟、海湾国家，以及美国、中国、日本、拉丁美洲、非洲等市场。资料准备、递交和本地合作伙伴支持。",
  "title": "各国及地区药品注册",
  "lead": "我们可在任何国家或地区注册药品和原料药，包括主要市场及其他众多市场。",
  "detailTitle": "主要市场",
  "detailLede": "客户最常咨询注册支持的市场。",
  "otherTitle": "其他国家和地区",
  "otherLede": "以上仅为示例。我们同样在其他市场准备注册资料、办理递交，并协助寻找本地合作伙伴和代理，包括：",
  "regions": [
   {
    "h": "美国（FDA）",
    "p": "NDA、ANDA 和 BLA 策略、DMF 备案及 eCTD 递交。"
   },
   {
    "h": "加拿大和瑞士",
    "p": "向加拿大卫生部和 Swissmedic 申请，包括依赖已有批准。"
   },
   {
    "h": "中国（NMPA）",
    "p": "进口药品注册、原料药登记及中国模块 1。"
   },
   {
    "h": "日本和韩国",
    "p": "在本地合作伙伴支持下向 PMDA 和 MFDS 申请。"
   },
   {
    "h": "东南亚和澳大利亚",
    "p": "东盟 ACTD 递交及 TGA 申请。"
   },
   {
    "h": "拉丁美洲",
    "p": "巴西 ANVISA、墨西哥 COFEPRIS、阿根廷 ANMAT、哥伦比亚 INVIMA 及其他机构。"
   },
   {
    "h": "非洲",
    "p": "南非 SAHPRA、埃及 EDA、尼日利亚 NAFDAC 及其他国家和地区机构。"
   },
   {
    "h": "中亚、南亚和高加索",
    "p": "中亚、高加索和南亚国家的国家注册。"
   }
  ],
  "note": "您的目标市场不在列表中？请告诉我们国家和产品，方法相同：选择路径、准备资料、递交，并在需要时提供本地合作伙伴或代理。"
 },
 "tr": {
  "nav": "Ülkelere göre ilaç ruhsatı",
  "metaTitle": "Ülke ve bölgelere göre ilaç ruhsatı: AB, Birleşik Krallık, İran, Türkiye, AEB, Körfez ve diğerleri | Hanpars",
  "metaDesc": "Dünya genelinde ilaç ve etkin madde ruhsatı: AB, Birleşik Krallık, İran, Türkiye, Rusya/AEB ve Körfez ülkeleri ile ABD, Çin, Japonya, Latin Amerika, Afrika ve diğer pazarlar. Dosya, başvuru ve yerel ortak desteği.",
  "title": "Ülke ve bölgelere göre ilaç ruhsatı",
  "lead": "İlaç ve etkin maddeleri her ülke veya bölgede ruhsatlandırıyoruz: ana pazarlarımızda ve birçok başka pazarda.",
  "detailTitle": "Ana pazarlar",
  "detailLede": "Ruhsat desteği için en sık başvurulan pazarlar.",
  "otherTitle": "Diğer ülke ve bölgeler",
  "otherLede": "Bunlar yalnızca örnektir. Diğer pazarlarda da dosya hazırlar, başvuruları yürütür ve yerel ortak ve acente bulmanıza yardımcı oluruz; örneğin:",
  "regions": [
   {
    "h": "ABD (FDA)",
    "p": "NDA, ANDA ve BLA stratejisi, DMF başvuruları ve eCTD gönderimleri."
   },
   {
    "h": "Kanada ve İsviçre",
    "p": "Mevcut onaylara güvene dayalı yollar dahil Health Canada ve Swissmedic başvuruları."
   },
   {
    "h": "Çin (NMPA)",
    "p": "İthal ilaç ruhsatı, etkin madde kaydı ve Çin Modül 1."
   },
   {
    "h": "Japonya ve Güney Kore",
    "p": "Yerel ortak desteğiyle PMDA ve MFDS başvuruları."
   },
   {
    "h": "Güneydoğu Asya ve Avustralya",
    "p": "ASEAN ACTD başvuruları ve TGA başvuruları."
   },
   {
    "h": "Latin Amerika",
    "p": "ANVISA (Brezilya), COFEPRIS (Meksika), ANMAT (Arjantin), INVIMA (Kolombiya) ve diğer otoriteler."
   },
   {
    "h": "Afrika",
    "p": "SAHPRA (Güney Afrika), EDA (Mısır), NAFDAC (Nijerya) ve diğer ulusal ve bölgesel otoriteler."
   },
   {
    "h": "Orta ve Güney Asya, Kafkasya",
    "p": "Orta Asya, Kafkasya ve Güney Asya ülkelerinde ulusal ruhsatlar."
   }
  ],
  "note": "Pazarınız listede yok mu? Ülkeyi ve ürünü bize bildirin; yaklaşım aynıdır: yol seçimi, dosya, başvuru ve gerekirse yerel ortak veya acente."
 }
};
