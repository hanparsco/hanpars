import kwZh from './keywords.zh.json';
import kwTr from './keywords.tr.json';
import type { Lang } from '../i18n';
/** Keyword sets per page (meta keywords; also the vocabulary used in titles, descriptions and copy). */
const brandFa = ['هانیا پرسان دارو', 'شرکت هانیا پرسان دارو', 'هانپارس', 'Hanpars'];
const brandZh = ['Hanpars', 'HANPARS', 'Haniya Parsan Darou', '伊朗 Hanpars', '哈尼亚·帕尔桑制药'];
const brandTr = ['Hanpars', 'HANPARS', 'Haniya Parsan Darou', 'Hanpars İran'];
const brandEn = ['Hanpars', 'HANPARS', 'Haniya Parsan Darou', 'Haniya Parsan Darou Co.', 'هانیا پرسان دارو'];

const fa: Record<string, string[]> = {
  home: ['واردات دارو', 'واردات دارو ایران', 'واردات دارو به ایران', 'واردات مواد اولیه', 'دارو فوریتی', 'داروی فوریتی', 'داروی نهایی', 'دارو ساخته شده', 'داروی ساخته‌شده', 'دارو خارجی', 'داروی خارجی', 'واردات اکسیپینت', 'اکسیپینت', 'ویتامین', 'مواد اولیه جانبی', 'واردکننده دارو', 'شرکت واردات دارو', 'واردات فوریتی دارو', 'تأمین دارو', 'تامین دارو', 'بازرگانی دارویی', 'شرکت بازرگانی دارو', 'مواد اولیه دارویی', 'ماده موثره دارویی', 'API', 'مواد جانبی دارویی', 'مواد اولیه مکمل', 'ثبت دارو', 'ثبت دارو در سازمان غذا و دارو', 'امور رگولاتوری', 'داروی بیمارستانی', 'داروی تخصصی', 'واردات دارو از ترکیه', 'واردات دارو از چین', 'واردات دارو از هند', 'واردات دارو از اروپا', 'شرکت دارویی تهران'],
  fdf: ['واردات دارو', 'واردات دارو ایران', 'واردات دارو به ایران', 'دارو فوریتی', 'داروی فوریتی', 'داروی نهایی', 'دارو ساخته شده', 'دارو خارجی', 'داروی خارجی', 'داروهای ساخته شده', 'داروی ساخته‌شده', 'FDF', 'واردات فوریتی دارو', 'داروهای کمیاب', 'کمبود دارو', 'داروی بیمارستانی', 'داروی تخصصی', 'داروی ژنریک', 'خرید دارو عمده', 'استعلام قیمت دارو', 'فهرست داروهای ایران', 'لیست داروهای رسمی ایران', 'داروی تزریقی', 'قرص', 'کپسول', 'آمپول', 'ویال', 'سرم'],
  api: ['واردات مواد اولیه', 'واردات مواد اولیه دارویی', 'مواد اولیه جانبی', 'واردات دارو ایران', 'مواد اولیه دارویی', 'ماده اولیه دارو', 'ماده موثره', 'مادهٔ مؤثرهٔ دارویی', 'API', 'Active Pharmaceutical Ingredient', 'خرید مواد اولیه دارویی', 'قیمت مواد اولیه دارویی', 'تامین کننده مواد اولیه دارویی', 'مواد اولیه دارویی چین', 'مواد اولیه دارویی هند', 'شماره CAS', 'DMF', 'CEP', 'GMP', 'پودر دارویی'],
  excipient: ['اکسیپینت', 'واردات اکسیپینت', 'مواد اولیه جانبی', 'واردات مواد اولیه', 'داروی نهایی', 'مواد جانبی دارویی', 'اکسیپیان', 'اکسیپیانت', 'Excipient', 'مواد کمکی دارویی', 'پرکننده قرص', 'اتصال دهنده', 'بایندر', 'بازکننده', 'دیس‌اینتگرنت', 'روان کننده', 'منیزیم استئارات', 'میکروکریستالین سلولز', 'لاکتوز', 'پوویدون', 'HPMC', 'پوشش فیلم قرص', 'خرید مواد جانبی دارویی', 'واردات مواد جانبی'],
  nutrition: ['ویتامین', 'واردات ویتامین', 'مواد اولیه ویتامین', 'واردات مواد اولیه', 'اکسیپینت', 'مواد اولیه مکمل', 'مکمل غذایی', 'مکمل دارویی', 'مواد معدنی', 'امگا ۳', 'پروبیوتیک', 'کلاژن', 'عصاره گیاهی', 'نوتراسوتیکال', 'ویتامین D3', 'ویتامین C', 'روی', 'منیزیم', 'آهن', 'خرید مواد اولیه مکمل', 'واردات مکمل'],
  'regulatory-affairs': ['امور رگولاتوری', 'رگولاتوری دارو', 'ثبت دارو', 'ثبت دارو در ایران', 'ثبت دارو در سازمان غذا و دارو', 'کد IRC', 'پروانه ورود دارو', 'تشکیل پرونده دارو', 'CTD', 'eCTD', 'GMP', 'ثبت مواد اولیه دارویی', 'مشاوره رگولاتوری', 'ثبت دارو در ترکیه', 'TİTCK', 'EMA', 'FDA', 'فارماکوویژیلانس'],
  'fdf-cdmo': ['CDMO', 'تولید قراردادی دارو', 'تولید دارو سفارشی', 'توسعه فرمولاسیون', 'تولید تحت لیسانس', 'انتقال تکنولوژی دارو', 'تولید دارو در ترکیه', 'تولید دارو در چین'],
  'about-us': ['شرکت هانیا پرسان دارو', 'درباره هانیا پرسان دارو', 'واردکننده دارو تهران', 'شرکت بازرگانی دارویی تهران'],
  markets: ['واردات دارو از ترکیه', 'واردات دارو از چین', 'واردات دارو از هند', 'واردات دارو از اروپا', 'تامین کنندگان دارو', 'پخش دارو'],
  culture: ['شرکت دارویی معتبر', 'تامین دارو با مستندات'],
  'contact-us-1': ['تماس با هانیا پرسان دارو', 'استعلام قیمت دارو', 'استعلام مواد اولیه دارویی', 'سفارش دارو', 'آدرس شرکت دارویی تهران'],
  news: ['اخبار دارو', 'اخبار داروسازی', 'اخبار صنعت داروسازی', 'اخبار مواد اولیه دارویی چین', 'اخبار FDA'],
  'blog-1': ['مقالات دارویی', 'بازار مواد اولیه دارویی چین', 'صنعت API چین'],
};
const en: Record<string, string[]> = {
  home: ['pharmaceutical importer Iran', 'drug importer Iran', 'medicine import Iran', 'urgent medicine import', 'emergency drug import Iran', 'API supplier Iran', 'active pharmaceutical ingredients', 'excipients supplier', 'supplement ingredients', 'drug registration Iran', 'IFDA registration', 'Iran FDA', 'regulatory affairs Iran', 'pharmaceutical trading company Tehran', 'hospital medicines', 'specialty medicines'],
  fdf: ['finished dosage forms', 'FDF', 'urgent medicine import', 'emergency drug import Iran', 'hospital medicines Iran', 'specialty drugs Iran', 'generic medicines', 'drug shortage Iran', 'Iran drug list', 'medicine supplier Iran', 'injectables', 'tablets', 'capsules'],
  api: ['active pharmaceutical ingredient', 'API', 'API supplier', 'API supplier Iran', 'API import', 'pharmaceutical raw materials', 'drug substance', 'CAS number', 'DMF', 'CEP', 'GMP API manufacturer', 'China API', 'India API'],
  excipient: ['pharmaceutical excipients', 'excipient supplier', 'fillers', 'binders', 'disintegrants', 'lubricants', 'magnesium stearate', 'microcrystalline cellulose', 'lactose', 'povidone', 'HPMC', 'film coating'],
  nutrition: ['supplement ingredients', 'nutraceutical ingredients', 'vitamins', 'minerals', 'omega-3', 'probiotics', 'collagen', 'botanical extracts', 'vitamin D3', 'food supplement raw materials'],
  'regulatory-affairs': ['regulatory affairs', 'drug registration Iran', 'IFDA', 'Iran FDA registration', 'IRC code', 'CTD', 'eCTD', 'dossier preparation', 'GMP', 'EMA', 'FDA', 'TİTCK', 'pharmacovigilance', 'regulatory consulting'],
  'fdf-cdmo': ['CDMO', 'contract manufacturing', 'contract development', 'formulation development', 'technology transfer', 'licensed manufacturing'],
  'about-us': ['Hanpars', 'Haniya Parsan Darou', 'pharmaceutical importer Tehran'],
  markets: ['pharmaceutical suppliers China', 'pharmaceutical suppliers India', 'pharmaceutical suppliers Türkiye', 'pharmaceutical suppliers Europe', 'drug distribution Iran'],
  culture: ['pharmaceutical sourcing', 'documented supply'],
  'contact-us-1': ['contact Hanpars', 'medicine enquiry', 'API enquiry', 'pharmaceutical quote Iran'],
  news: ['pharma news', 'pharmaceutical industry news', 'China API news', 'FDA news'],
  'blog-1': ['China API market', 'pharmaceutical market insights'],
};
export function pageKeywords(page: string, lang: Lang): string {
  const sets: Record<Lang, Record<string, string[]>> = { en, fa, zh: kwZh as Record<string, string[]>, tr: kwTr as Record<string, string[]> };
  const brands: Record<Lang, string[]> = { en: brandEn, fa: brandFa, zh: brandZh, tr: brandTr };
  const list = sets[lang][page] || [];
  return [...new Set([...list, ...brands[lang]])].join(lang === 'fa' ? '، ' : lang === 'zh' ? '，' : ', ');
}
