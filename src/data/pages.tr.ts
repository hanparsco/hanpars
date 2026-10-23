import type { PageKey } from './pages';

type LPage = { title:string; category:string; description:string; meta:string; introTitle:string; intro:readonly string[]; databaseLabel?:string; cards?:readonly {title:string; text:string; link?:string}[] };

export const pagesTr: Record<PageKey, LPage> = {
  api: {
    title: 'Etkin maddeler (API)', category: 'Ürünler',
    description: 'Hakkında en sık bilgi istenen maddelerden oluşan bir referans listesi. Maddenizi bulun, spesifikasyonu ve hedef pazarı bize iletin; üreticilerimizin neler sunabileceğiyle size geri dönelim.',
    meta: 'Hanpars API referans listesindeki 1.582 maddeyi arayın ve spesifikasyonunuz ile hedef pazarınızı belirterek bir tedarik talebi hazırlayın.',
    introTitle: 'Madde ile başlayın.',
    intro: ['Listede arama yapın, ardından farmakope kalite derecesini (grade), miktarı, varış yerini ve ihtiyaç duyacağınız belgeleri iletin: analiz sertifikaları, DMF veya CEP referansları, GMP sertifikaları.', 'İsimler, çalışma listemizdeki haliyle aynen korunmuştur. Listede yer alan bir kalem, o ürün için tedarik talebinde bulunabileceğimiz anlamına gelir; stokta olduğu veya ruhsatlı olduğu anlamına gelmez.'],
  },
  fdf: {
    title: 'Bitmiş ürünler (FDF)', category: 'Ürünler',
    description: 'Hanpars’ın İran’da ruhsatlandırdığı hastane ve uzmanlık ilaçları, ardından tedarik edebileceğimiz bitmiş ürünlerin daha kapsamlı referans listesi.',
    meta: 'Hanpars’ın İran Gıda ve İlaç Kurumu (IFDA) tarafından ruhsatlandırılmış hastane ve uzmanlık ilaçları portföyüne ve 3.885 bitmiş ürün (FDF) içeren referans listesine göz atın, ardından bir tedarik talebi hazırlayın.',
    introTitle: 'İki liste, tek bir başlangıç noktası.',
    intro: ['İlk liste kendi portföyümüzdür: İran’daki ruhsatı Hanpars’a ait olan ilaçlar; terapötik alana göre gruplanmış, ruhsatlı farmasötik formları, yitilikleri ve ATC kodlarıyla birlikte.', 'İkinci liste, sizin adınıza tedarik talebinde bulunabileceğimiz bitmiş ürünlerin daha uzun bir referans listesidir. İsimler ve kodlar kayıtlı olduğu şekliyle aynen korunmuştur.'],
  },
  excipient: {
    title: 'Yardımcı maddeler', category: 'Ürünler',
    description: 'Dolgu maddeleri, bağlayıcılar, kaplama maddeleri, çözücüler ve diğerleri: CAS numaralı 1.241 yardımcı maddeden oluşan bir referans listesi. Listede arama yapın, ardından formülasyonunuzun gerektirdiği kaliteyi ve spesifikasyonu bize iletin.',
    meta: 'Hanpars’ın CAS numaralı 1.241 maddelik yardımcı madde referans listesinde arama yapın ve formülasyonunuzun gerektirdiği kalite, spesifikasyon ve dokümantasyonu içeren bir talep hazırlayın.',
    introTitle: 'Yardımcı maddelerde talebi belirleyen, kalite derecesidir.',
    intro: ['Aynı ada sahip iki yardımcı madde çok farklı davranabilir. Bu nedenle kalite derecesini, farmakope spesifikasyonunu, kullanım alanını ve ihtiyaç duyduğunuz belgeleri bildirin; biz de bunu tedarikçilere iletelim.', 'Aşağıdaki referans listesi, daha önce tedarik ettiğimiz veya hakkında talep aldığımız maddeleri içerir; bir referanstır, stok listesi değildir.'],
  },
  nutrition: {
    title: 'Beslenme ve takviye edici gıda hammaddeleri', category: 'Ürünler',
    description: 'Vitaminler, mineraller, omega-3, probiyotikler, bitkisel ekstreler ve ilaç ile gıda takviyelerinde kullanılan diğer hammaddeler; piyasada işlem gördükleri formlarda.',
    meta: '295 takviye edici hammaddenin (vitaminler, mineraller, omega-3, probiyotikler, bitkisel ürünler, nutrasötikler) yaygın form ve kullanımlarıyla referans listesi ve her biri için Hanpars tedarik talebi.',
    introTitle: 'Hammadde ile başlayın.',
    intro: ['Takviye edici ürünler alanındaki çalışmamız ilaç faaliyetlerimizle birlikte, aynı spesifikasyon ve dokümantasyon titizliğiyle yürütülür. Aşağıdaki liste, ilaç ve gıda takviyelerinde kullanılan başlıca hammaddeleri türlerine göre gruplandırır; genellikle işlem gördükleri formları ve her birinin kullanım amacını gösterir.', 'Talep ilettiğinizde hammaddeyi, kalite derecesini, miktarı, pazarı ve dokümantasyon ihtiyaçlarını belirtin.'],
  },
  'about-us': {
    title: 'Hanpars Hakkında', category: 'Şirket',
    description: 'Tahran merkezli, İran pazarı için ilaç ve hammaddeleri tedarik eden, ithal eden ve ruhsatlandıran bir ilaç ticaret şirketi.',
    meta: 'Hanpars (Haniya Parsan Darou Co.) hakkında: İran için etkin madde (API), yardımcı madde ve bitmiş ilaçları tedarik eden, ithal eden ve ruhsatlandıran, Tahran merkezli bir ilaç ticaret şirketi.',
    introTitle: 'Kimiz ve kim değiliz.',
    intro: ['Hanpars, Tahran’da Zafar Caddesi’nde yer alan Haniya Parsan Darou Co. şirketinin ticari adıdır. İran için etkin madde, yardımcı madde ve bitmiş ürün tedarik ediyoruz, ithal ettiğimiz hastane ilaçlarının pazarlama ruhsatlarına sahibiz ve yurt dışındaki üreticilerin İran’daki yerel regülasyon muhatabı olarak görev yapıyoruz. Tedarikçilerimiz Çin, Hindistan, Türkiye ve Avrupa’da; müşterilerimiz ise hastaneler, ilaç dağıtım şirketleri ve kendi ürünlerini geliştiren firmalar.', 'Üretici değiliz. Tedarik eder, ruhsatlandırır ve koordine ederiz; bir proje için üretim tesisi gerektiğinde bir iş ortağını sürece dahil eder, kimin neyden sorumlu olduğunu yazılı hale getiririz.'],
    cards: [
      { title: 'Önce ürün', text: 'Etkin maddeler, yardımcı maddeler ve bitmiş ürünler; her gün. Beslenme hammaddelerinin kendi veri tabanı vardır ve aynı yaklaşım geçerlidir.', link: 'Portföyü görüntüleyin' },
      { title: 'Ruhsatlandırma şirket içinde', text: 'İthalatımıza ait dosya, IRC ruhsatı ve farmakovijilans işlemleri, üçüncü taraflar adına da başvuru yapan kendi regülasyon ekibimiz tarafından yürütülür.', link: 'Ruhsatlandırma ve Regülasyon' },
      { title: 'Tek sorumlu muhatap', text: 'Her talebin Hanpars’ta tek bir sorumlusu vardır; ilk brifingden teslimata veya onaya kadar.', link: 'Görüşme başlatın' },
    ],
  },
  culture: {
    title: 'Çalışma Şeklimiz', category: 'Şirket',
    description: 'Tek bir API talebinden çok yıllı bir ruhsatlandırma programına kadar her talebi şekillendiren birkaç yalın ilke.',
    meta: 'Hanpars’ın çalışma ilkeleri: net bir brifing, açıkça tanımlanmış sorumluluklar ve teknik ile ticari soruların aynı görüşmede ele alınması.',
    introTitle: 'Önce netlik, sonra hız.',
    intro: ['İlaç tedarikindeki gecikmelerin çoğu, başlangıçta kimsenin sormadığı sorulardan kaynaklanır: hangi farmakope, hangi dosya formatı, başvuruyu kim yapacak, harcı kim ödeyecek. Bu nedenle zamanlamayı konuşmadan önce ihtiyacı ve sorumluluk dağılımını yazılı hale getiririz.', 'Dürüstlük, kalite odaklı çalışma, iş birliği ve teknik gelişim, Hanpars’ın hep dile getirdiği değerlerdir; burada bunlar birer slogan değil, alışkanlıktır.'],
    cards: [
      { title: 'İhtiyacı net belirtin', text: 'Ürün, spesifikasyon, miktar, pazar ve aşama; yöntemi konuşmadan önce yazılı olarak.' },
      { title: 'Sorumlulukları görünür tutun', text: 'Tedarik ve koordinasyon bize aittir. Üretim üreticinin, onay ise yetkili otoritenin sorumluluğundadır.' },
      { title: 'Tek bir görüşme yürütün', text: 'Ticari, dokümantasyon ve teknik sorular bir arada ele alınır; böylece dosyanın desteklemediği hiçbir şey üzerinde mutabık kalınmaz.' },
    ],
  },
  markets: {
    title: 'Pazarlar ve Tedarik', category: 'Şirket',
    description: 'İran, tedarik ettiğimiz ve ruhsatlandırma yaptığımız pazardır. Tedarik ağımız Çin, Hindistan, Türkiye ve Avrupa’daki üreticilere uzanır.',
    meta: 'Hanpars, İran’da ilaç ürünleri tedarik eder ve ruhsatlandırır; Çin, Hindistan, Türkiye ve Avrupa’daki üreticilerden temin eder. Pazara özel bir talepte nelerin yer alması gerektiği.',
    introTitle: 'Tek bir ana pazar, birden çok kaynak.',
    intro: ['Her şey İran pazarı etrafında şekillenir: IFDA, dağıtım şirketleri ve hastaneler. Tedarik tarafında Çin, Hindistan, Türkiye ve Avrupa’daki üreticilerle çalışırız; bunları ürün ürün, fiyatları kadar dokümantasyonlarına bakarak seçeriz.', 'Varış yerini ve gerektirdiği belgeleri bize iletin; neler yapabileceğimizi somut olarak söyleyelim.'],
    cards: [
      { title: 'Ürün ve spesifikasyon', text: 'Madde, farmasötik form veya hammadde; geçerli olan kalite derecesi, yitilik veya ambalaj büyüklüğüyle birlikte.' },
      { title: 'Varış yeri ve belgeler', text: 'Ürünün nereye gideceği ve beraberinde gelen dosya, sertifika veya regülasyon gereklilikleri.' },
      { title: 'Kapsam ve sonraki adım', text: 'Hanpars’tan ne istediğiniz: tedarik, ruhsatlandırma, koordinasyon veya üçü birden.' },
    ],
  },
  'fdf-cdmo': {
    title: 'Bitmiş Ürün Geliştirme', category: 'Hizmetler',
    description: 'Tablet, kapsül, enjeksiyonluk, sıvı ve yarı katı formlar için geliştirme ve üretim iş birlikleri. Projeyi Hanpars koordine eder; üretimi iş ortakları yapar.',
    meta: 'Hanpars ile bitmiş ürün CDMO projenizi görüşün: formülasyon, analitik geliştirme, ölçek büyütme, stabilite, teknoloji transferi ve iş ortağı koordinasyonu.',
    introTitle: 'Projeyi biz yürütürüz. Tesisi iş ortakları işletir.',
    intro: ['Formülasyon, analitik çalışmalar, ölçek büyütme, stabilite, ambalajlama ve teknoloji transferi nadiren tek çatı altında bulunur. Hanpars bunları geliştirme ve üretim ortakları arasında koordine eder; hedef pazarın regülasyon gereklilikleri ilk seriden itibaren göz önünde tutulur.', 'Hanpars’ın bir üretim tesisi ve dolayısıyla bir tesis adına GMP sertifikası yoktur; ruhsatlandırma sonucunu da garanti edemez. Sunduğumuz şey koordinasyon, iş ortağı ağı ve dosyadır.'],
    cards: [
      { title: 'Katı oral farmasötik formlar', text: 'Tablet ve kapsüller. Etkin maddeyi, yitiliği, geliştirme aşamasını ve hedef pazarı bize iletin.' },
      { title: 'Enjeksiyonluk preparatlar', text: 'Ampul ve flakonlar. Formülasyonu, sunum şeklini, proje durumunu ve dokümantasyon ihtiyaçlarını belirtin.' },
      { title: 'Sıvı ve yarı katı formlar', text: 'Oral sıvılar ve topikal preparatlar. Formülasyon kapsamı ve kullanım amacıyla başlayın.' },
    ],
  },
};
