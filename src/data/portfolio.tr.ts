/** Turkish text for the portfolio component. Product names, strengths, ATC codes stay as licensed (Latin). */
export const portfolioTr = {
  snapshot: 'Ekim 2026',
  description: 'İran Gıda ve İlaç İdaresi (IFDA) nezdinde ruhsatlı olan ve HANPARS tarafından Türkiye, Çin ve Hindistan’daki GMP sertifikalı üreticilerden ithal edilen hastane ve uzmanlık ilaçları. Terapötik alana göre, WHO ATC kodları, farmasötik formlar ve dozlarla listelenmiştir.',
  trust: [
    { title: 'IFDA lisanslı ithalatçı', description: 'Listelenen tüm ürünlerin ruhsat sahibi; dosya, IRC lisanslaması ve farmakovijilans şirket içinde yürütülür.' },
    { title: 'Stratejik İlaç Rezervi tedarikçisi', description: 'Nalokson, misoprostol, hidrokortizon, etomidat ve kontrast maddeler için ulusal rezerv programı kapsamında IFDA’nın sözleşmeli tedarikçisi.' },
    { title: 'Ülke çapında dağıtım', description: 'Pakhsh Razi, Darougostar Tooba ve Dey Darou Omid aracılığıyla hastane ve eczane kapsama alanı.' },
    { title: 'Denetlenen tedarik zinciri', description: 'GMP sertifikalı kaynaklar, her sevkiyat için dosyada tutulan seri analiz sertifikaları, biyolojik ürünler ve heparin için soğuk zincir.' },
  ],
  groups: {
    'area-1': { title: 'Kontrast maddeler', kicker: 'Tanısal görüntüleme', description: 'BT, anjiyografi ve ürografi için iyotlu ve iyonik kontrast ajanlar; ülke genelindeki görüntüleme merkezlerine ve hastanelere tedarik edilir.' },
    'area-2': { title: 'Hormonlar ve endokrinoloji', kicker: 'Endokrin, jinekoloji ve onkoloji desteği', description: 'Kortikosteroidler, östrojenler, antiandrojen kombinasyonları ve kalsiyum düzenleyici hormonlar.' },
    'area-3': { title: 'Merkezi sinir sistemi ve psikiyatri', kicker: 'Nöroloji ve ruh sağlığı', description: 'Antidepresanlar, antipsikotikler, antikonvülsanlar ve antiparkinson ilaçlar; portföyün en hızlı büyüyen bölümü.' },
    'area-4': { title: 'Kardiyovasküler', kicker: 'Antitrombotik, antiaritmik ve diüretik tedavi', description: 'Kronik kardiyovasküler bakım için trombosit inhibitörleri, beta blokerler ve kıvrım diüretikleri.' },
    'area-5': { title: 'Anti-enfektifler', kicker: 'Antibakteriyeller, antitüberkülozlar ve antimalaryaller', description: 'Enjektabl ve oral antibiyotikler, birinci basamak tüberküloz tedavisi ve aminokinolinler.' },
    'area-6': { title: 'Acil ve yoğun bakım', kicker: 'Anestezi, resüsitasyon ve solunum', description: 'Acil servisler, ameliyathaneler ve yoğun bakım üniteleri için ürünler; bunların birkaçı ulusal Stratejik İlaç Rezervi kapsamında tedarik edilmektedir.' },
    'area-7': { title: 'İmmünoloji ve onkoloji destek', kicker: 'Biyolojik ürünler ve kemoproteksiyon', description: 'Anti-TNF biyolojik tedavi ve folinat kurtarma tedavisi.' },
    'area-8': { title: 'Gastroenteroloji ve kadın sağlığı', kicker: 'Hepatobiliyer ve obstetrik bakım', description: 'Obstetrik endikasyonlar için safra asidi tedavisi ve prostaglandin analoğu.' },
    'area-9': { title: 'Kemik ve metabolizma', kicker: 'Osteoporoz', description: 'Haftalık bisfosfonat tedavisi.' },
  } as Record<string, { title: string; kicker: string; description: string }>,
  forms: {
    'Powder for injection': 'Enjeksiyonluk toz', 'Capsule': 'Kapsül', 'Metered-dose inhaler': 'Ölçülü doz inhaler', 'Gel': 'Jel', 'Tablet': 'Tablet', 'Solution for injection': 'Enjeksiyonluk çözelti', 'Extended-release Tablet': 'Uzatılmış salımlı tablet',
  } as Record<string, string>,
  origins: { 'India': 'Hindistan', 'China': 'Çin', 'Türkiye': 'Türkiye', 'Origin on request': 'Menşei talep üzerine' } as Record<string, string>,
  manufacturer: {
    title: 'Üreticiler: ürünlerinizi tek bir iş ortağıyla İran’a taşıyın',
    description: 'Yetkilendirme Mektubu’ndan (LoA) eczane rafına kadar: HANPARS, IFDA dosyasını hazırlar ve sunar, IRC ruhsatını alır, döviz tahsisini ve ithalatı yönetir ve ürünü ulusal dağıtıcılara ulaştırır. Türkiye ve Avrupa tedarikçi ağımızı aktif olarak genişletiyoruz.',
    services: ['Dosya hazırlama ve IFDA’ya sunum', 'IRC lisanslaması ve yenilemeler', 'Döviz tahsisi ve ithalat lojistiği', 'Ulusal toptancılar aracılığıyla dağıtım', 'Pazarlama sonrası gözetim ve raporlama'],
  },
};
