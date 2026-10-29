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
    meta: 'Hanpars’ın IFDA ruhsatlı hastane ve uzmanlık ilaçları portföyüne ve 3.885 bitmiş ürün (FDF) içeren referans listesine göz atın, tedarik talebi hazırlayın.',
    introTitle: 'İki liste, tek bir başlangıç noktası.',
    intro: ['İlk liste kendi portföyümüzdür: İran’daki ruhsatı Hanpars’a ait olan ilaçlar; terapötik alana göre gruplanmış, ruhsatlı farmasötik formları, yitilikleri ve ATC kodlarıyla birlikte.', 'İkinci liste, sizin adınıza tedarik talebinde bulunabileceğimiz bitmiş ürünlerin daha uzun bir referans listesidir. İsimler ve kodlar kayıtlı olduğu şekliyle aynen korunmuştur.'],
  },
  excipient: {
    title: 'Yardımcı maddeler', category: 'Ürünler',
    description: 'Dolgu maddeleri, bağlayıcılar, kaplama maddeleri, çözücüler ve diğerleri: CAS numaralı 1.240 yardımcı maddeden oluşan bir referans listesi. Listede arama yapın, ardından formülasyonunuzun gerektirdiği kaliteyi ve spesifikasyonu bize iletin.',
    meta: 'Hanpars’ın CAS numaralı 1.240 maddelik yardımcı madde referans listesinde arama yapın; kalite, spesifikasyon ve dokümantasyon içeren talep hazırlayın.',
    introTitle: 'Yardımcı maddelerde talebi belirleyen, kalite derecesidir.',
    intro: ['Aynı ada sahip iki yardımcı madde çok farklı davranabilir. Bu nedenle kalite derecesini, farmakope spesifikasyonunu, kullanım alanını ve ihtiyaç duyduğunuz belgeleri bildirin; biz de bunu tedarikçilere iletelim.', 'Aşağıdaki referans listesi, daha önce tedarik ettiğimiz veya hakkında talep aldığımız maddeleri içerir; bir referanstır, stok listesi değildir.'],
  },
  nutrition: {
    title: 'Beslenme ve takviye edici gıda hammaddeleri', category: 'Ürünler',
    description: 'Vitaminler, mineraller, omega-3, probiyotikler, bitkisel ekstreler ve ilaç ile gıda takviyelerinde kullanılan diğer hammaddeler; piyasada işlem gördükleri formlarda.',
    meta: '295 takviye hammaddesinin (vitamin, mineral, omega-3, probiyotik, bitkisel ürün, nutrasötik) referans listesi ve her biri için Hanpars tedarik talebi.',
    introTitle: 'Hammadde ile başlayın.',
    intro: ['Takviye edici ürünler alanındaki çalışmamız ilaç faaliyetlerimizle birlikte, aynı spesifikasyon ve dokümantasyon titizliğiyle yürütülür. Aşağıdaki liste, ilaç ve gıda takviyelerinde kullanılan başlıca hammaddeleri türlerine göre gruplandırır; genellikle işlem gördükleri formları ve her birinin kullanım amacını gösterir.', 'Talep ilettiğinizde hammaddeyi, kalite derecesini, miktarı, pazarı ve dokümantasyon ihtiyaçlarını belirtin.'],
  },
  precursors: {
    title: 'Kimyasal öncüller', category: 'Ürünler',
    description: 'Farmasötik sentez için başlangıç maddeleri, ara ürünler ve reaktifler; nitelikli üreticilerden, düzenlemeye tabi üretimin gerektirdiği belgelerle.',
    meta: 'İran’daki ilaç üretimi için kimyasal öncüller: API başlangıç maddeleri, ileri ara ürünler ve reaktifler; nitelikli üreticilerden, eksiksiz belgelerle.',
    introTitle: 'Etkin maddeden bir adım önce.',
    intro: ['İran’da etkin madde sentezleyen veya son işlemini yapan üreticiler için, başta Çin ve Hindistan olmak üzere nitelikli üreticilerden düzenleyici başlangıç maddeleri, ileri ara ürünler ve proses reaktifleri tedarik ediyoruz.', 'Maddeyi, CAS numarasını, saflığını veya spesifikasyonunu, miktarı ve varış yerini bildirin. Bir tedarikçiye bağlanmadan önce ihtiyaç duyduğunuz belgeleri kontrol ederiz: analiz sertifikası, sentez yolu ve gerektiğinde safsızlık bilgileri.', 'Kontrollü öncüller yalnızca İran’da ve menşe ülkede gerekli lisans ve izinlerle tedarik edilir.'],
    cards: [{ title: 'API başlangıç maddeleri', text: 'Dosyanızda düzenleyici başlangıç maddesi olarak tanımlanan temel yapı taşları; spesifikasyonlar sipariş öncesinde netleştirilir.' }, { title: 'Ara ürünler', text: 'Sonraki sentez adımları için ileri ara ürünler; tedarikçinin sağladığı seri belgeleri ve safsızlık profilleriyle.' }, { title: 'Reaktifler ve çözücüler', text: 'Prosesinize ve kalite gereksinimlerinize uygun farmasötik veya analitik kalitede proses kimyasalları.' }],
  },
  supplies: {
    title: 'Farmasötik malzemeler', category: 'Ürünler',
    description: 'Birincil ambalaj, boş kapsüller ve ilaç üretiminin dayandığı diğer malzemeler; İran’daki üreticiler için spesifikasyona göre tedarik.',
    meta: 'İran için farmasötik malzemeler: flakon, ampul, kapak ve blister folyo gibi birincil ambalaj, boş kapsül ve üretim sarf malzemeleri, spesifikasyona göre.',
    introTitle: 'Bir formülasyonu ilaca dönüştüren malzemeler.',
    intro: ['Hammaddelerin yanı sıra ilacı tamamlayan malzemeleri de tedarik ediyoruz: birincil ambalaj, boş kapsül kabukları ve üretim sarf malzemeleri.', 'Ürünü, spesifikasyonunu veya çizimini, malzeme kalitesini, miktarı ve varış yerini gönderin. Karşılayabilecek tedarikçileri ve sağladıkları belgeleri (analiz sertifikası, DMF mektubu veya gıda temas beyanı gibi) size iletiriz.'],
    cards: [{ title: 'Birincil ambalaj', text: 'Cam flakon ve ampuller, kauçuk tıpalar ve kapaklar, blister ve strip folyolar, ilaçla doğrudan temas eden şişe ve kapaklar.' }, { title: 'Boş kapsüller', text: 'Standart boyut ve renklerde sert jelatin ve HPMC kapsül kabukları.' }, { title: 'Üretim sarf malzemeleri', text: 'Filtreler, laboratuvar ve kalite kontrol sarf malzemeleri ve üretim hattında kullanılan diğer malzemeler.' }],
  },
  'about-us': {
    title: 'Hanpars Hakkında', category: 'Şirket',
    description: 'Tahran merkezli, İran pazarı için ilaç ve hammaddeleri tedarik eden, ithal eden ve ruhsatlandıran bir ilaç ticaret şirketi.',
    meta: 'Hanpars (Haniya Parsan Darou Co.): İran için etkin madde (API), yardımcı madde ve bitmiş ilaç tedarik eden ve ruhsatlandıran Tahran merkezli şirket.',
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
    meta: 'Hanpars, Çin, Hindistan, Türkiye ve Avrupa’daki üreticilerden İran için ilaç tedarik eder ve ruhsatlandırır. Pazara özel talepte nelerin yer alacağı.',
    introTitle: 'Tek bir ana pazar, birden çok kaynak.',
    intro: ['Her şey İran pazarı etrafında şekillenir: IFDA, dağıtım şirketleri ve hastaneler. Tedarik tarafında Çin, Hindistan, Türkiye ve Avrupa’daki üreticilerle çalışırız; bunları ürün ürün, fiyatları kadar dokümantasyonlarına bakarak seçeriz.', 'Varış yerini ve gerektirdiği belgeleri bize iletin; neler yapabileceğimizi somut olarak söyleyelim.'],
    cards: [
      { title: 'Ürün ve spesifikasyon', text: 'Madde, farmasötik form veya hammadde; geçerli olan kalite derecesi, yitilik veya ambalaj büyüklüğüyle birlikte.' },
      { title: 'Varış yeri ve belgeler', text: 'Ürünün nereye gideceği ve beraberinde gelen dosya, sertifika veya regülasyon gereklilikleri.' },
      { title: 'Kapsam ve sonraki adım', text: 'Hanpars’tan ne istediğiniz: tedarik, ruhsatlandırma, koordinasyon veya üçü birden.' },
    ],
  },
  'partners': {
    title: 'Türk ilaç üreticileri için: İran’daki ortağınız', category: 'İş birliği',
    description: 'Lisanslı ithalatçınız, ruhsat sahibiniz ve İran’daki ortağınız: şirket içi ruhsatlandırma, ülke çapında dağıtım, yazılı sorumluluklar, İstanbul ortak ofisi.',
    meta: 'Hanpars, Türk ilaç üreticileri için: IFDA lisanslı ithalatçı ve İran’da ruhsat sahibi, şirket içi ruhsatlandırma ve farmakovijilans, ülke çapında dağıtım, yazılı sorumluluklar; İstanbul’da ortak ofis, Türkçe konuşan ekip.',
    introTitle: 'İran’da lisanslı ve hesap verebilir bir ortak',
    intro: ['Hanpars ithalat iznini ve ürün ruhsatlarını kendi adına taşır, dosyaları şirket içinde hazırlar ve yazılı olarak rapor verir.'],
    cards: [],
  },
  'fdf-cdmo': {
    title: 'Türk ilaç üreticileri için İran: ruhsat ve fason üretim', category: 'Hizmetler',
    description: 'Türk ilaç üreticileri ve CDMO’lar için İran pazarına giriş: pazar değerlendirmesi, IFDA ruhsatı, ithalat ve gerektiğinde İran’da teknoloji transferi, tek ekipten.',
    meta: 'Türk ilaç üreticileri için İran pazarı: Hanpars, İstanbul’daki ortak ofisiyle IFDA ruhsatı, CTD dosyasının uyarlanması, ithalat, lansman ve teknoloji transferini yönetir.',
    introTitle: 'Projeyi biz yürütürüz. Tesisi iş ortakları işletir.',
    intro: ['Formülasyon, analitik çalışmalar, ölçek büyütme, stabilite, ambalajlama ve teknoloji transferi nadiren tek çatı altında bulunur. Hanpars bunları geliştirme ve üretim ortakları arasında koordine eder; hedef pazarın regülasyon gereklilikleri ilk seriden itibaren göz önünde tutulur.', 'Hanpars’ın bir üretim tesisi ve dolayısıyla bir tesis adına GMP sertifikası yoktur; ruhsatlandırma sonucunu da garanti edemez. Sunduğumuz şey koordinasyon, iş ortağı ağı ve dosyadır.'],
    cards: [
      { title: 'Katı oral farmasötik formlar', text: 'Tablet ve kapsüller. Etkin maddeyi, yitiliği, geliştirme aşamasını ve hedef pazarı bize iletin.' },
      { title: 'Enjeksiyonluk preparatlar', text: 'Ampul ve flakonlar. Formülasyonu, sunum şeklini, proje durumunu ve dokümantasyon ihtiyaçlarını belirtin.' },
      { title: 'Sıvı ve yarı katı formlar', text: 'Oral sıvılar ve topikal preparatlar. Formülasyon kapsamı ve kullanım amacıyla başlayın.' },
    ],
  },
};
