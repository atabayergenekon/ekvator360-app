/**
 * Single source of truth for all on-page copy.
 * Every locale below must have an identical shape, add a key to all three.
 */

export type Locale = "tr" | "en" | "ru"

export const LOCALES: Locale[] = ["tr", "en", "ru"]

export const LOCALE_LABELS: Record<Locale, string> = {
  tr: "TR",
  en: "EN",
  ru: "RU",
}

export const LOCALE_FULL_LABELS: Record<Locale, string> = {
  tr: "Türkçe",
  en: "English",
  ru: "Русский",
}

export type Dictionary = {
  meta: {
    title: string
    description: string
  }
  nav: {
    about: string
    services: string
    process: string
    whyUs: string
    contact: string
    cta: string
    badge: string
    languageLabel: string
    menuOpen: string
    menuClose: string
  }
  hero: {
    eyebrow: string
    titleStart: string
    titleHighlight: string
    titleEnd: string
    subtitle: string
    ctaPrimary: string
    ctaSecondary: string
    trust: { label: string; caption: string }[]
    sectorsHeading: string
    sectors: string[]
    liveChip: string
    activeMarketsLabel: string
    activeMarketsValue: string
  }
  whatWeDo: {
    eyebrow: string
    titleStart: string
    titleHighlight: string
    titleEnd: string
    subtitle: string
    intro: string
    tags: string[]
    pillars: { title: string; body: string }[]
  }
  problems: {
    eyebrow: string
    titleStart: string
    titleHighlight: string
    titleEnd: string
    subtitle: string
    items: { title: string; body: string }[]
  }
  process: {
    eyebrow: string
    titleStart: string
    titleHighlight: string
    subtitle: string
    engagement: string
    stepLabel: string
    steps: { title: string; body: string }[]
  }
  services: {
    eyebrow: string
    titleStart: string
    titleHighlight: string
    titleEnd: string
    subtitle: string
    flagshipTag: string
    items: { title: string; body: string }[]
  }
  whyUs: {
    eyebrow: string
    titleStart: string
    titleHighlight: string
    subtitle: string
    stats: { value: string; label: string }[]
    quote: string
    quoteAuthor: string
    quoteRole: string
    reasons: { title: string; body: string }[]
  }
  vision: {
    badge: string
    titleLine1: string
    titleLine2: string
    subtitle: string
    regions: { name: string; countries: string }[]
    liveLabel: string
    routesLabel: string
  }
  finalCta: {
    eyebrow: string
    titleStart: string
    titleHighlight: string
    titleEnd: string
    subtitle: string
    ctaPrimary: string
    ctaSecondary: string
    emailLabel: string
    emailValue: string
    phoneLabel: string
    phoneValue: string
    addressLabel: string
    addressValue: string
    londonLabel: string
    londonAddress: string
    note: string
  }
  footer: {
    tagline: string
    offices: { city: string; role: string }[]
    columns: { title: string; links: { label: string; href: string }[] }[]
    rights: string
    statusLine: string
  }
}

/* ─────────────────────────── TÜRKÇE ─────────────────────────── */

const tr: Dictionary = {
  meta: {
    title: "Ekvator360, Uluslararası Satış ve İhracat Yönetimi",
    description:
      "Ekvator360, üreticilerin global satış kanallarını kuran, yabancı alıcı bulan ve ihracat operasyonlarını uçtan uca yöneten premium bir uluslararası satış ve ihracat yönetim firmasıdır.",
  },
  nav: {
    about: "Hakkımızda",
    services: "Hizmetler",
    process: "Süreç",
    whyUs: "Neden Biz",
    contact: "İletişim",
    cta: "Görüşme Talep Et",
    badge: "Q3 Dönem Başvuruları Açıldı",
    languageLabel: "Dil",
    menuOpen: "Menüyü aç",
    menuClose: "Menüyü kapat",
  },
  hero: {
    eyebrow: "Uluslararası Satış Yönetimi · 2007'den beri",
    titleStart: "Üretiminiz gücü ile",
    titleHighlight: "Satışlarınızı artırıyoruz.",
    titleEnd: "",
    subtitle:
      "Ekvator360, ihracat yapmak isteyen üretiler için uluslararası satış departmanıdır. Doğru pazarları seçer, nitelikli alıcılarla görüşmeleri başlatır ve ihracat sürecinizi uçtan uca yönetiriz.",
    ctaPrimary: "Görüşme Başlatın",
    ctaSecondary: "Ne Yaptığımızı İnceleyin",
    trust: [
      { label: "42 ülke", caption: "Aktif ihracat pazarı" },
      { label: "1.200+ alıcı", caption: "Nitelikli ilişki" },
      { label: "18 yıl", caption: "Operasyonel liderlik" },
    ],
    sectorsHeading: "İhracata hazır üreticilerimizin sektörleri",
    sectors: [
      "Makine",
      "Gıda ve İçecek",
      "Yapı Malzemeleri",
      "Tekstil",
      "Kimya",
      "Tüketim Ürünleri",
      "Mobilya",
      "Ambalaj",
      "Plastik",
      "Metal",
      "Otomotiv Yan Sanayi",
      "Elektrik ve Elektronik",
      "Medikal Ürünler",
      "Kozmetik",
      "Ev Gereçleri",
      "Tarım Ekipmanları",
      "Endüstriyel Parçalar",
      "Doğal Taş",
      "Seramik",
      "Savunma ve Güvenlik",
      "Enerji Ekipmanları",
      "Denizcilik",
      "Lojistik Çözümleri",
    ],
    liveChip: "Aktif sevkiyat · 38 hat",
    activeMarketsLabel: "Aktif pazarlar",
    activeMarketsValue: "42 ülke",
  },
  whatWeDo: {
    eyebrow: "Ne Yapıyoruz",
    titleStart: "Premium bir ihracat firması,",
    titleHighlight: "büyümeniz etrafında inşa edildi",
    titleEnd: ", panelleriniz etrafında değil.",
    subtitle:
      "Ekvator360, ihracatta ciddi olan üreticiler için uluslararası satış motorudur. Stratejiyi, operasyonu ve insani ilişkileri biz taşırız, pazarlar, zaman dilimleri ve alıcı profilleri boyunca.",
    intro:
      "Şirketler bizi, ürünleri dünyaya hazır olduğunda ancak satış erişimleri olmadığında işe alır. Liderlik ekibinin bir uzantısı olarak devreye gireriz, kapıları açar, satış hatları inşa eder ve ihracat tutkusunu tekrarlanan uluslararası gelire dönüştüren işi yönetiriz.",
    tags: ["Strateji", "Satış operasyonu", "Alıcı erişimi"],
    pillars: [
      {
        title: "Global Kanal İnşası",
        body: "Ürününüze ve kategorinize uygun uluslararası satış kanallarını, distribütör, acente, doğrudan alıcı, tasarlar ve hayata geçiririz.",
      },
      {
        title: "Alıcı İlişkileri",
        body: "Nitelikli yabancı müşterilerle gerçek görüşmeler. Müzakereyi, toplantıları ve ticaret iletişimini sizin için yürütürüz.",
      },
      {
        title: "İhracat Operasyonları",
        body: "Teklifden teslimata: pipeline yönetimi, evraklar, raporlama ve yurt dışı performansınızın sürekli gözden geçirilmesi.",
      },
      {
        title: "Dış Satış Departmanınız",
        body: "İç ihracat ekibiniz yoksa biz oluruz. Varsa, erişimini ve operasyonel derinliğini biz genişletiriz.",
      },
    ],
  },
  problems: {
    eyebrow: "İhracat büyümesinin tıkandığı yerler",
    titleStart: "Üreticiler için her gün",
    titleHighlight: "çözdüğümüz",
    titleEnd: "problemler.",
    subtitle:
      "Çoğu şirkette eksik olan ürün değil. Eksik olan, bu ürünü doğru alıcıların önüne tutarlı şekilde, doğru dilde, doğru tempoda koyacak uluslararası satış altyapısı.",
    items: [
      {
        title: "Yabancı alıcı bulamamak",
        body: "Üretim hazır. Uluslararası talep var. Ancak fabrikanızdan nitelikli bir yurt dışı müşteriye giden yol belirsiz.",
      },
      {
        title: "Dil ve kültürel engeller",
        body: "Avrupa, Körfez veya Asya alıcılarıyla müzakere çeviriden fazlasını gerektirir. Ton, zamanlama ve ticaret protokolü anlaşmayı belirler.",
      },
      {
        title: "Zayıf uluslararası iletişim",
        body: "Soğuk tanıtımlar tıkanır. Takipler cevapsız kalır. Teklifler beklemede durur. Tutarlı bir varlık olmadan momentum sessizce ölür.",
      },
      {
        title: "İhracat ekibinin olmaması",
        body: "İç satış kadrosu zaten gergin. Tam zamanlı uluslararası yönetici işe almak yavaş, pahalı ve hızlı doğrulanması zordur.",
      },
      {
        title: "İstikrarsız yurt dışı gelir",
        body: "Bir sipariş çıkar, sonra aylarca hiçbir şey. Yurt dışı satışlar yönetilen, tekrarlanabilir bir süreçten çok şansa bağlıdır.",
      },
      {
        title: "Uygulamasız strateji",
        body: "Güzel ülke listeleri. Fuar planları. Ancak planları sevkiyata dönüştüren günlük işi kimse yürütmüyor.",
      },
    ],
  },
  process: {
    eyebrow: "Sürecimiz",
    titleStart: "Sekiz ölçülmüş aşama.",
    titleHighlight: "Tek yönetilen sonuç.",
    subtitle:
      "Gizem yok, doğaçlama yok. İlk görüşmeden devam eden pazar yönetimine kadar her adım belgelenir, gözden geçirilir ve hesap verebilir.",
    engagement: "Tipik angajman: 6–18 ay",
    stepLabel: "Adım",
    steps: [
      {
        title: "Keşif Toplantısı",
        body: "Ürünü, kapasiteyi, ihtirası ve uluslararası büyümenizin gerçekçi şeklini anlamak için liderlikle oturuyoruz.",
      },
      {
        title: "Şirket Analizi",
        body: "Üretim gücü, belgeler, fiyat duruşu, ticari hazırlık, dünyanın sizden gerçekten ne satın alacağını haritalandırırız.",
      },
      {
        title: "Pazar Araştırması",
        body: "Ülke bazlı fırsat boyutlandırma, rakip haritalama, kanal yapısı ve alıcı profili tasarımı.",
      },
      {
        title: "Stratejik Raporlama",
        body: "Net bir ihracat brifi: öncelikli ülkeler, segmentler, konumlandırma, fiyatlama mantığı ve giriş operasyon planı.",
      },
      {
        title: "Pazara Giriş Stratejisi",
        body: "Kanal mimarisi, mesajlama, satış materyalleri, fiyatlama katmanları, şirketinizi uluslararası standartta sunmak için gerekli her şey.",
      },
      {
        title: "Alıcı Hedefleme",
        body: "Doğru ithalatçıları, distribütörleri ve doğrudan müşterileri tespit ederiz. Sonra onlara, adıyla, dillerinde, niyetle, yaklaşırız.",
      },
      {
        title: "Satış Geliştirme",
        body: "Toplantılar, numuneler, fabrika ziyaretleri, müzakereler ve teklifler, uluslararası satış koliniz olarak uçtan uca yürütülür.",
      },
      {
        title: "Sürekli Yönetim",
        body: "Pipeline incelemeleri, performans raporları ve sürekli optimizasyon. İhracat yönetilen, hesap verilebilir bir fonksiyon haline gelir, bir umut değil.",
      },
    ],
  },
  services: {
    eyebrow: "Hizmetler",
    titleStart: "Eksiksiz bir uluslararası",
    titleHighlight: "satış departmanı",
    titleEnd: ", hizmet olarak sunulur.",
    subtitle:
      "Tam bir dış ihracat ekibi mi yoksa belirli aşamaların yürütülmesi mi gerekiyor, her hizmet kıdemli uluslararası satış profesyonelleri tarafından yürütülür, devredilmez.",
    flagshipTag: "Amiral angajman",
    items: [
      {
        title: "İhracat Yönetimi",
        body: "İhracat fonksiyonunuzun uçtan uca işletilmesi, strateji, pipeline ve yurt dışı teslimat, yönetilen bir hizmet olarak.",
      },
      {
        title: "Uluslararası Satış Geliştirme",
        body: "Yurt dışı satış kanallarını tasarlar, distribütör ve acente ağları kurar ve öncelikli pazarlarda geliri büyütürüz.",
      },
      {
        title: "Pazar Araştırması",
        body: "Derin ülke, segment ve rakip zekâsı, giriş stratejisi ve ticari kararlara çevrilmiş.",
      },
      {
        title: "Yurt Dışı Müşteri Edinme",
        body: "Alıcı tespiti, nitelikli erişim, takip ve bir ismi müşteriye dönüştüren insani çalışma.",
      },
      {
        title: "Süreç Yönetimi",
        body: "Her teklif, görüşme ve sevkiyatın raporlanması, yönetişimi ve operasyonel incelemesi, gürültüsüz görünürlük.",
      },
      {
        title: "Ticaret İletişimi",
        body: "Avrupa, Körfez, Asya ve Amerikan alıcılarıyla çok dilli ticari iletişim, uluslararası ton ve tempoda.",
      },
      {
        title: "Müşteri Toplantıları ve Ziyaretleri",
        body: "Yerinde alıcı toplantıları, fabrika ziyaretleri ve fuar temsili, anlaşmaların gerçekten karar verildiği yerde varız.",
      },
      {
        title: "İhracat Stratejisi",
        body: "Ülke önceliklendirmesi, kanal mimarisi, fiyatlama mantığı ve uluslararası genişlemek için savunulabilir bir plan.",
      },
      {
        title: "Satış Ekibi Desteği",
        body: "İhracat ekibiniz varsa, kapasitesini genişletiriz, pazarları, takipleri ve operasyonel omurgayı kapsayarak.",
      },
    ],
  },
  whyUs: {
    eyebrow: "Şirketler neden Ekvator360'ı seçiyor",
    titleStart: "Gerçek operasyonel güç.",
    titleHighlight: "Gerçek hesap verebilirlik.",
    subtitle:
      "Üreticiler bizi, yüzeysel ihracat danışmanlarından bıktıklarında seçiyor. Uluslararası satış motorundan ve onunla gelen sonuçlardan sorumlu oluyoruz.",
    stats: [
      { value: "42", label: "Aktif ihracat pazarı" },
      { value: "1.2B+", label: "Nitelikli yurt dışı alıcı" },
      { value: "%94", label: "Angajman yenileme oranı" },
      { value: "18", label: "Uluslararası faaliyet yılı" },
    ],
    quote:
      "Ekvator360 sekiz haftada ihracat departmanımız oldu. Kurdukları pipeline, kendi başımıza ulaşamayacağımız pazarlarda bizi taşıyor.",
    quoteAuthor: "Cem Yıldız",
    quoteRole: "Genel Müdür · Endüstriyel makine üreticisi",
    reasons: [
      {
        title: "Operasyonel, danışmanlık değil",
        body: "Size sunum verip kaybolmayız. İşi biz işletiriz, toplantılar, takipler, müzakereler, raporlama, hafta hafta.",
      },
      {
        title: "Varsayılan olarak uluslararası",
        body: "Avrupa, Körfez, Asya, Afrika ve Amerika'da deneyimli çok dilli, çok bölgeli ekip. Kültürel akıcılık temel seviyedir.",
      },
      {
        title: "Kıdemli hesap verebilirlik",
        body: "Angajmanınız, sonuçlara kişisel olarak sahip çıkan kıdemli ihracat profesyonelleri tarafından yönetilir. Sessiz devirler yok.",
      },
      {
        title: "Süreç-sınıfı yürütme",
        body: "Her görüşme kaydedilir. Her pipeline incelenir. İhracat şirketinizin içinde enstrümante edilmiş bir fonksiyona dönüşür.",
      },
    ],
  },
  vision: {
    badge: "Uluslararası Vizyon",
    titleLine1: "Buradan üretin.",
    titleLine2: "Dünyaya satış yapın.",
    subtitle:
      "Ekvator360 altı kıtada faaliyet gösterir, ürünlerinizin ihtiyaç duyulduğu pazarlarda varlık inşa eder ve alıcılarla premium uluslararası tedarikçilerin beklendiği şekilde buluşur.",
    regions: [
      { name: "Avrupa", countries: "Almanya · İngiltere · Hollanda · İtalya" },
      { name: "Orta Doğu ve Körfez", countries: "BAE · Suudi Arabistan · Katar · Kuveyt" },
      { name: "Kuzey Amerika", countries: "ABD · Kanada · Meksika" },
      { name: "Asya Pasifik", countries: "Japonya · Singapur · Vietnam · Avustralya" },
      { name: "Afrika", countries: "Mısır · Fas · Güney Afrika · Nijerya" },
      { name: "Latin Amerika", countries: "Brezilya · Şili · Kolombiya" },
    ],
    liveLabel: "Canlı · Ticaret hatları",
    routesLabel: "38 aktif hat · 6 kıta",
  },
  finalCta: {
    eyebrow: "Pazarınızı konuşalım",
    titleStart: "İhracatı",
    titleHighlight: "premium tedarikçilerin yaptığı gibi",
    titleEnd: "işletmeye hazır mısınız?",
    subtitle:
      "Ortaklarımızla gizli bir görüşme planlayın. Şirketiniz, kategoriniz ve hedef pazarlarınız için bir Ekvator360 angajmanının nasıl görüneceğini anlatırız, sunum yok, sadece net bir cevap.",
    ctaPrimary: "Görüşme Başlatın",
    ctaSecondary: "Bir angajman planı görün",
    emailLabel: "Ortaklıklar",
    emailValue: "partners@ekvator360.com",
    phoneLabel: "İstanbul Merkez",
    phoneValue: "0216 606 35 85",
    addressLabel: "Adres",
    addressValue:
      "Maltepe Piazza, Cevizli, Tugay Yolu Cd. No: 69/A, 34846 Maltepe/İstanbul",
    londonLabel: "Londra Ofis",
    londonAddress:
      "182-184 High Street North Office 13564, East Ham, London, England, E6 2JA",
    note: "Gizli alım · Kıdemli ortak bir iş günü içinde yanıt verir.",
  },
  footer: {
    tagline:
      "Ekvator360 bir uluslararası satış ve ihracat yönetim firmasıdır. Global ölçekte büyümeye hazır üreticiler için dış satış departmanı olarak çalışırız.",
    offices: [
      {
        city: "İstanbul",
        role: "Maltepe Piazza, Cevizli, Tugay Yolu Cd. No: 69/A, Maltepe",
      },
      {
        city: "Londra",
        role: "182-184 High Street North Office 13564, East Ham, E6 2JA",
      },
    ],
    columns: [
      {
        title: "Şirket",
        links: [
          { label: "Hakkımızda", href: "#about" },
          { label: "Süreç", href: "#process" },
          { label: "Neden Biz", href: "#why-us" },
          { label: "İletişim", href: "#contact" },
        ],
      },
      {
        title: "Hizmetler",
        links: [
          { label: "İhracat Yönetimi", href: "#services" },
          { label: "Uluslararası Satış", href: "#services" },
          { label: "Pazar Araştırması", href: "#services" },
          { label: "Müşteri Edinme", href: "#services" },
          { label: "Süreç Yönetimi", href: "#services" },
        ],
      },
      {
        title: "Sektörler",
        links: [
          { label: "Makine", href: "#hero" },
          { label: "Gıda ve İçecek", href: "#hero" },
          { label: "Yapı Malzemeleri", href: "#hero" },
          { label: "Tekstil", href: "#hero" },
          { label: "Kimya", href: "#hero" },
          { label: "Tüketim Ürünleri", href: "#hero" },
        ],
      },
      {
        title: "Yasal",
        links: [
          { label: "Gizlilik Politikası", href: "#contact" },
          { label: "Kullanım Şartları", href: "#contact" },
          { label: "Çerezler", href: "#contact" },
          { label: "KVKK", href: "#contact" },
        ],
      },
    ],
    rights: "Tüm hakları saklıdır.",
    statusLine: "42 pazarda faaliyette · 6 kıta",
  },
}

/* ─────────────────────────── ENGLISH ─────────────────────────── */

const en: Dictionary = {
  meta: {
    title: "Ekvator360, International Sales & Export Management",
    description:
      "Ekvator360 is a premium export growth and international sales management firm. We act as your outsourced export department, building global sales channels, finding foreign buyers and operating overseas growth, end to end.",
  },
  nav: {
    about: "About",
    services: "Services",
    process: "Process",
    whyUs: "Why Us",
    contact: "Contact",
    cta: "Start a Conversation",
    badge: "Now accepting Q3 partnerships",
    languageLabel: "Language",
    menuOpen: "Open menu",
    menuClose: "Close menu",
  },
  hero: {
    eyebrow: "International Sales Management · Since 2007",
    titleStart: "Your production is strong.",
    titleHighlight: "Your sales grow worldwide.",
    titleEnd: "",
    subtitle:
      "Ekvator360 is the outsourced international sales department for manufacturers. We select the right markets, open conversations with qualified buyers and manage your export process end to end.",
    ctaPrimary: "Start a Conversation",
    ctaSecondary: "Explore What We Do",
    trust: [
      { label: "42 countries", caption: "Active export markets" },
      { label: "1,200+ buyers", caption: "Qualified relationships" },
      { label: "18 years", caption: "Operational leadership" },
    ],
    sectorsHeading: "Trusted by export-ready manufacturers across",
    sectors: [
      "Machinery",
      "Food & Beverage",
      "Construction Materials",
      "Textiles",
      "Chemicals",
      "Consumer Goods",
      "Furniture",
      "Packaging",
      "Plastics",
      "Metals",
      "Automotive Supply",
      "Electrical & Electronics",
      "Medical Products",
      "Cosmetics",
      "Homeware",
      "Agricultural Equipment",
      "Industrial Parts",
      "Natural Stone",
      "Ceramics",
      "Defense & Security",
      "Energy Equipment",
      "Marine",
      "Logistics Solutions",
    ],
    liveChip: "Live shipments · 38 lanes",
    activeMarketsLabel: "Active markets",
    activeMarketsValue: "42 countries",
  },
  whatWeDo: {
    eyebrow: "What we do",
    titleStart: "A premium export firm,",
    titleHighlight: "built around your growth",
    titleEnd: ", not your dashboard.",
    subtitle:
      "Ekvator360 is the international sales engine for manufacturers serious about exporting. We carry the strategy, the operation and the human relationships, across markets, time zones and buyer profiles.",
    intro:
      "Companies hire us when their product is ready for the world but their sales reach isn't. We step in as an extension of the leadership team, opening doors, building pipelines and managing the work that turns export ambition into recurring international revenue.",
    tags: ["Strategy", "Sales operations", "Buyer access"],
    pillars: [
      {
        title: "Global Channel Building",
        body: "We design and execute international sales channels, distributors, agents, direct buyers, tailored to your product and category.",
      },
      {
        title: "Buyer Relationships",
        body: "Real conversations with qualified overseas customers. We carry the negotiation, the meetings and the trade communication for you.",
      },
      {
        title: "Export Operations",
        body: "From quotation to delivery: pipeline management, documentation, reporting and continuous review of your overseas performance.",
      },
      {
        title: "Your External Sales Department",
        body: "If you don't have an internal export team, we become it. If you do, we extend its reach and operational depth.",
      },
    ],
  },
  problems: {
    eyebrow: "Where export growth gets stuck",
    titleStart: "The problems we",
    titleHighlight: "solve every day",
    titleEnd: "for manufacturers.",
    subtitle:
      "Most companies don't lack a product. They lack the international sales infrastructure to put that product in front of the right buyers, consistently, in the right language, at the right cadence.",
    items: [
      {
        title: "Cannot find foreign buyers",
        body: "Production is ready. The international demand exists. But the path from your factory to a qualified overseas customer is unclear.",
      },
      {
        title: "Language and cultural barriers",
        body: "Negotiations with European, Gulf or Asian buyers require more than translation. Tone, timing and trade protocol decide the deal.",
      },
      {
        title: "Weak international communication",
        body: "Cold introductions stall. Follow-ups go unanswered. Quotations sit. Without consistent presence, momentum quietly dies.",
      },
      {
        title: "No dedicated export team",
        body: "Domestic sales staff are stretched. Hiring full-time international managers is slow, expensive and hard to validate quickly.",
      },
      {
        title: "Unstable overseas revenue",
        body: "One order ships, then nothing for months. Foreign sales depend on chance rather than a managed, repeatable process.",
      },
      {
        title: "Strategy without execution",
        body: "Beautiful country lists. Trade-show plans. But no one is operating the daily work that turns plans into shipments.",
      },
    ],
  },
  process: {
    eyebrow: "Our process",
    titleStart: "Eight measured stages.",
    titleHighlight: "One managed outcome.",
    subtitle:
      "No mystery, no improvisation. From the first conversation to ongoing market management, every step is documented, reviewed and accountable.",
    engagement: "Typical engagement: 6–18 months",
    stepLabel: "Step",
    steps: [
      {
        title: "Discovery Meeting",
        body: "We sit with leadership to understand product, capacity, ambition and the realistic shape of your international growth.",
      },
      {
        title: "Company Analysis",
        body: "Production strength, certifications, pricing posture, commercial readiness, we map what the world will actually buy from you.",
      },
      {
        title: "Market Research",
        body: "Country-by-country opportunity sizing, competitor mapping, channel structure and buyer profile design.",
      },
      {
        title: "Strategic Reporting",
        body: "A clear export brief: priority countries, segments, positioning, pricing logic and the operational plan to enter.",
      },
      {
        title: "Go-to-Market Strategy",
        body: "Channel architecture, messaging, sales collateral, pricing tiers, everything required to present your company at international standard.",
      },
      {
        title: "Buyer Targeting",
        body: "We identify the right importers, distributors and direct customers. Then we approach them, by name, in their language, with intent.",
      },
      {
        title: "Sales Development",
        body: "Meetings, samples, factory visits, negotiations and quotations, operated end-to-end as your international sales arm.",
      },
      {
        title: "Ongoing Management",
        body: "Pipeline reviews, performance reporting and continuous optimisation. Export becomes a managed, accountable function, not a hope.",
      },
    ],
  },
  services: {
    eyebrow: "Services",
    titleStart: "A complete international",
    titleHighlight: "sales department",
    titleEnd: ", delivered as a service.",
    subtitle:
      "Whether you need a full external export team or specific stages handled, every service is operated by senior international sales professionals, not handed off.",
    flagshipTag: "Flagship engagement",
    items: [
      {
        title: "Export Management",
        body: "End-to-end operation of your export function, strategy, pipeline and overseas delivery, run as a managed service.",
      },
      {
        title: "International Sales Development",
        body: "We design overseas sales channels, build distributor and agent networks, and grow revenue across priority markets.",
      },
      {
        title: "Market Research",
        body: "Deep country, segment and competitor intelligence, translated into entry strategy and commercial decisions.",
      },
      {
        title: "Overseas Customer Acquisition",
        body: "Buyer identification, qualified outreach, follow-up and the human work that converts a name into a customer.",
      },
      {
        title: "Process Management",
        body: "Reporting, governance and operational review of every quotation, conversation and shipment, visibility without noise.",
      },
      {
        title: "Trade Communication",
        body: "Multilingual commercial communication with European, Gulf, Asian and American buyers, run at international tone and tempo.",
      },
      {
        title: "Customer Meetings & Visits",
        body: "On-site buyer meetings, factory visits and trade-fair representation, we are present where deals are actually decided.",
      },
      {
        title: "Export Strategy",
        body: "Country prioritisation, channel architecture, pricing logic and a defensible plan to expand internationally with confidence.",
      },
      {
        title: "Sales Team Support",
        body: "If you already have an export team, we extend its capacity, covering markets, follow-ups and the operational backbone.",
      },
    ],
  },
  whyUs: {
    eyebrow: "Why companies choose Ekvator360",
    titleStart: "Real operational power.",
    titleHighlight: "Real accountability.",
    subtitle:
      "Manufacturers choose us when they're done with surface-level export consultants. We become responsible for the international sales engine, and the results that come with it.",
    stats: [
      { value: "42", label: "Active export markets" },
      { value: "1.2K+", label: "Qualified overseas buyers" },
      { value: "94%", label: "Engagement renewal rate" },
      { value: "18", label: "Years operating internationally" },
    ],
    quote:
      "Ekvator360 became our export department in eight weeks. The pipeline they built carries us in markets we couldn't have reached on our own.",
    quoteAuthor: "Cem Yıldız",
    quoteRole: "General Manager · Industrial machinery manufacturer",
    reasons: [
      {
        title: "Operational, not advisory",
        body: "We don't hand you a deck and disappear. We operate the work, meetings, follow-ups, negotiations, reporting, week after week.",
      },
      {
        title: "International by default",
        body: "Multilingual, multi-region team experienced across Europe, the Gulf, Asia, Africa and the Americas. Cultural fluency is the baseline.",
      },
      {
        title: "Senior accountability",
        body: "Your engagement is led by senior export professionals who personally own the outcomes. No silent handoffs, no junior shuffles.",
      },
      {
        title: "Process-grade execution",
        body: "Every conversation is captured. Every pipeline reviewed. Export becomes an instrumented function inside your company.",
      },
    ],
  },
  vision: {
    badge: "International Vision",
    titleLine1: "Make here.",
    titleLine2: "Sell worldwide.",
    subtitle:
      "Ekvator360 operates across six continents, building presence in markets where your products are needed, and meeting buyers the way premium international suppliers are expected to meet them.",
    regions: [
      { name: "Europe", countries: "Germany · UK · Netherlands · Italy" },
      { name: "Middle East & Gulf", countries: "UAE · Saudi Arabia · Qatar · Kuwait" },
      { name: "North America", countries: "USA · Canada · Mexico" },
      { name: "Asia Pacific", countries: "Japan · Singapore · Vietnam · Australia" },
      { name: "Africa", countries: "Egypt · Morocco · South Africa · Nigeria" },
      { name: "Latin America", countries: "Brazil · Chile · Colombia" },
    ],
    liveLabel: "Live · Trade lanes",
    routesLabel: "38 active routes · 6 continents",
  },
  finalCta: {
    eyebrow: "Let's talk about your market",
    titleStart: "Ready to operate exports",
    titleHighlight: "the way premium suppliers do",
    titleEnd: "?",
    subtitle:
      "Book a confidential conversation with our partners. We'll walk you through how an Ekvator360 engagement would look for your company, your category and your target markets, no pitch deck, just a clear answer.",
    ctaPrimary: "Start a Conversation",
    ctaSecondary: "See an engagement plan",
    emailLabel: "Partnerships",
    emailValue: "partners@ekvator360.com",
    phoneLabel: "Istanbul HQ",
    phoneValue: "0216 606 35 85",
    addressLabel: "Address",
    addressValue:
      "Maltepe Piazza, Cevizli, Tugay Yolu Cd. No: 69/A, 34846 Maltepe/Istanbul",
    londonLabel: "London Office",
    londonAddress:
      "182-184 High Street North Office 13564, East Ham, London, England, E6 2JA",
    note: "Confidential intake · Senior partner replies within one business day.",
  },
  footer: {
    tagline:
      "Ekvator360 is an international sales and export management firm. We operate as the external sales department for manufacturers ready to grow globally.",
    offices: [
      {
        city: "Istanbul",
        role: "Maltepe Piazza, Cevizli, Tugay Yolu Cd. No: 69/A, Maltepe",
      },
      {
        city: "London",
        role: "182-184 High Street North Office 13564, East Ham, E6 2JA",
      },
    ],
    columns: [
      {
        title: "Company",
        links: [
          { label: "About", href: "#about" },
          { label: "Process", href: "#process" },
          { label: "Why Us", href: "#why-us" },
          { label: "Contact", href: "#contact" },
        ],
      },
      {
        title: "Services",
        links: [
          { label: "Export Management", href: "#services" },
          { label: "International Sales", href: "#services" },
          { label: "Market Research", href: "#services" },
          { label: "Customer Acquisition", href: "#services" },
          { label: "Process Management", href: "#services" },
        ],
      },
      {
        title: "Sectors",
        links: [
          { label: "Machinery", href: "#hero" },
          { label: "Food & Beverage", href: "#hero" },
          { label: "Construction Materials", href: "#hero" },
          { label: "Textiles", href: "#hero" },
          { label: "Chemicals", href: "#hero" },
          { label: "Consumer Goods", href: "#hero" },
        ],
      },
      {
        title: "Legal",
        links: [
          { label: "Privacy Policy", href: "#contact" },
          { label: "Terms of Service", href: "#contact" },
          { label: "Cookies", href: "#contact" },
          { label: "KVKK", href: "#contact" },
        ],
      },
    ],
    rights: "All rights reserved.",
    statusLine: "Operating across 42 markets · 6 continents",
  },
}

/* ─────────────────────────── РУССКИЙ ─────────────────────────── */

const ru: Dictionary = {
  meta: {
    title: "Ekvator360, Международные продажи и управление экспортом",
    description:
      "Ekvator360, премиум-компания по росту экспорта и управлению международными продажами. Мы становимся вашим внешним экспортным отделом, строим глобальные каналы продаж, находим зарубежных покупателей и управляем экспортными операциями под ключ.",
  },
  nav: {
    about: "О нас",
    services: "Услуги",
    process: "Процесс",
    whyUs: "Почему мы",
    contact: "Контакты",
    cta: "Начать диалог",
    badge: "Открыт набор партнёров на 3-й квартал",
    languageLabel: "Язык",
    menuOpen: "Открыть меню",
    menuClose: "Закрыть меню",
  },
  hero: {
    eyebrow: "Управление международными продажами · с 2007 года",
    titleStart: "Ваше производство сильное.",
    titleHighlight: "Ваши продажи растут по всему миру.",
    titleEnd: "",
    subtitle:
      "Ekvator360 — это внешний отдел международных продаж для производителей. Мы выбираем правильные рынки, начинаем диалог с квалифицированными покупателями и управляем экспортным процессом под ключ.",
    ctaPrimary: "Начать диалог",
    ctaSecondary: "Узнать, что мы делаем",
    trust: [
      { label: "42 страны", caption: "Активные рынки экспорта" },
      { label: "1 200+ покупателей", caption: "Квалифицированные связи" },
      { label: "18 лет", caption: "Операционное лидерство" },
    ],
    sectorsHeading: "Нам доверяют производители, готовые к экспорту",
    sectors: [
      "Машиностроение",
      "Продукты и напитки",
      "Строительные материалы",
      "Текстиль",
      "Химия",
      "Товары народного потребления",
      "Мебель",
      "Упаковка",
      "Пластик",
      "Металл",
      "Автокомпоненты",
      "Электрика и электроника",
      "Медицинские изделия",
      "Косметика",
      "Товары для дома",
      "Сельхозтехника",
      "Промышленные детали",
      "Натуральный камень",
      "Керамика",
      "Оборона и безопасность",
      "Энергетическое оборудование",
      "Морская отрасль",
      "Логистические решения",
    ],
    liveChip: "Активные поставки · 38 маршрутов",
    activeMarketsLabel: "Активные рынки",
    activeMarketsValue: "42 страны",
  },
  whatWeDo: {
    eyebrow: "Чем мы занимаемся",
    titleStart: "Премиум-экспортная компания,",
    titleHighlight: "построена вокруг вашего роста",
    titleEnd: ", а не вокруг вашей панели управления.",
    subtitle:
      "Ekvator360, это машина международных продаж для производителей, серьёзно настроенных на экспорт. Мы берём на себя стратегию, операцию и человеческие отношения, через рынки, часовые пояса и профили покупателей.",
    intro:
      "Компании нанимают нас, когда их продукт готов к миру, но их охват продаж, нет. Мы становимся продолжением команды руководства, открываем двери, выстраиваем воронки и управляем работой, которая превращает экспортные амбиции в повторяющийся международный доход.",
    tags: ["Стратегия", "Операции продаж", "Доступ к покупателям"],
    pillars: [
      {
        title: "Построение глобальных каналов",
        body: "Мы проектируем и реализуем международные каналы продаж, дистрибьюторы, агенты, прямые покупатели, под ваш продукт и категорию.",
      },
      {
        title: "Отношения с покупателями",
        body: "Реальные переговоры с квалифицированными зарубежными клиентами. Мы ведём переговоры, встречи и торговую коммуникацию за вас.",
      },
      {
        title: "Экспортные операции",
        body: "От котировки до поставки: управление воронкой, документация, отчётность и непрерывный анализ ваших зарубежных показателей.",
      },
      {
        title: "Ваш внешний отдел продаж",
        body: "Если внутреннего экспортного отдела нет, мы им становимся. Если есть, мы расширяем его охват и операционную глубину.",
      },
    ],
  },
  problems: {
    eyebrow: "Где буксует экспортный рост",
    titleStart: "Проблемы, которые мы",
    titleHighlight: "решаем каждый день",
    titleEnd: "для производителей.",
    subtitle:
      "У большинства компаний нет недостатка в продукте. Им не хватает международной инфраструктуры продаж, чтобы регулярно показывать этот продукт нужным покупателям, на нужном языке и в нужном ритме.",
    items: [
      {
        title: "Не получается найти зарубежных покупателей",
        body: "Производство готово. Международный спрос существует. Но путь от вашего завода до квалифицированного покупателя за рубежом, туман.",
      },
      {
        title: "Языковые и культурные барьеры",
        body: "Переговоры с европейскими, ближневосточными и азиатскими покупателями требуют большего, чем перевод. Тон, тайминг и торговый протокол решают сделку.",
      },
      {
        title: "Слабая международная коммуникация",
        body: "Холодные представления глохнут. Фоллоу-апы остаются без ответа. Котировки лежат. Без постоянного присутствия инерция тихо умирает.",
      },
      {
        title: "Нет выделенной экспортной команды",
        body: "Внутренние продажники перегружены. Найм международных менеджеров на полную ставку, это долго, дорого и трудно проверяется быстро.",
      },
      {
        title: "Нестабильная зарубежная выручка",
        body: "Один заказ отгружен, потом тишина на месяцы. Зарубежные продажи зависят от случая, а не от управляемого повторяемого процесса.",
      },
      {
        title: "Стратегия без исполнения",
        body: "Красивые списки стран. Планы выставок. Но никто не ведёт ежедневную работу, которая превращает планы в отгрузки.",
      },
    ],
  },
  process: {
    eyebrow: "Наш процесс",
    titleStart: "Восемь измеримых этапов.",
    titleHighlight: "Один управляемый результат.",
    subtitle:
      "Никакой магии и импровизации. От первой беседы до текущего управления рынком, каждый шаг документирован, проверен и подотчётен.",
    engagement: "Типичная вовлечённость: 6–18 месяцев",
    stepLabel: "Шаг",
    steps: [
      {
        title: "Установочная встреча",
        body: "Садимся с руководством, чтобы понять продукт, мощности, амбиции и реальную форму вашего международного роста.",
      },
      {
        title: "Анализ компании",
        body: "Производственная сила, сертификаты, ценовая позиция, коммерческая готовность, мы картируем, что мир действительно купит у вас.",
      },
      {
        title: "Исследование рынка",
        body: "Постраново, размер возможностей, картирование конкурентов, структура каналов и дизайн профилей покупателей.",
      },
      {
        title: "Стратегический отчёт",
        body: "Чёткий экспортный бриф: приоритетные страны, сегменты, позиционирование, ценовая логика и операционный план входа.",
      },
      {
        title: "Стратегия выхода на рынок",
        body: "Архитектура каналов, мессенджинг, торговые материалы, ценовые уровни, всё, чтобы представить вашу компанию на международном уровне.",
      },
      {
        title: "Таргетинг покупателей",
        body: "Мы определяем нужных импортёров, дистрибьюторов и прямых клиентов. Затем подходим к ним, по имени, на их языке, с намерением.",
      },
      {
        title: "Развитие продаж",
        body: "Встречи, образцы, посещения завода, переговоры и котировки, ведутся под ключ как ваш международный отдел продаж.",
      },
      {
        title: "Текущее управление",
        body: "Обзоры воронки, отчёты по эффективности и непрерывная оптимизация. Экспорт становится управляемой подотчётной функцией, не надеждой.",
      },
    ],
  },
  services: {
    eyebrow: "Услуги",
    titleStart: "Полный международный",
    titleHighlight: "отдел продаж",
    titleEnd: ", предоставляемый как сервис.",
    subtitle:
      "Нужна ли вам полностью внешняя экспортная команда или отдельные этапы, каждую услугу ведут старшие специалисты по международным продажам, без передачи на низший уровень.",
    flagshipTag: "Флагманский проект",
    items: [
      {
        title: "Управление экспортом",
        body: "Сквозное ведение экспортной функции, стратегия, воронка и зарубежные поставки как управляемая услуга.",
      },
      {
        title: "Развитие международных продаж",
        body: "Проектируем зарубежные каналы продаж, строим сети дистрибьюторов и агентов, наращиваем выручку на приоритетных рынках.",
      },
      {
        title: "Исследование рынка",
        body: "Глубокая аналитика по странам, сегментам и конкурентам, переведённая в стратегию входа и коммерческие решения.",
      },
      {
        title: "Привлечение зарубежных клиентов",
        body: "Идентификация покупателей, квалифицированный аутрич, фоллоу-апы и человеческая работа, которая превращает имя в клиента.",
      },
      {
        title: "Управление процессом",
        body: "Отчётность, управление и операционный пересмотр каждой котировки, беседы и отгрузки, видимость без шума.",
      },
      {
        title: "Торговая коммуникация",
        body: "Многоязычная коммерческая коммуникация с европейскими, ближневосточными, азиатскими и американскими покупателями, в международном тоне и темпе.",
      },
      {
        title: "Встречи и визиты клиентов",
        body: "Очные встречи с покупателями, визиты на завод и представительство на выставках, мы там, где сделки реально решаются.",
      },
      {
        title: "Стратегия экспорта",
        body: "Приоритизация стран, архитектура каналов, ценовая логика и защищаемый план международного расширения.",
      },
      {
        title: "Поддержка отдела продаж",
        body: "Если у вас уже есть экспортная команда, мы расширяем её мощность: рынки, фоллоу-апы и операционный каркас.",
      },
    ],
  },
  whyUs: {
    eyebrow: "Почему компании выбирают Ekvator360",
    titleStart: "Реальная операционная сила.",
    titleHighlight: "Реальная подотчётность.",
    subtitle:
      "Производители выбирают нас, когда устали от поверхностных экспортных консультантов. Мы берём на себя ответственность за машину международных продаж, и за результаты, которые она приносит.",
    stats: [
      { value: "42", label: "Активных экспортных рынка" },
      { value: "1,2K+", label: "Квалифицированных зарубежных покупателей" },
      { value: "94%", label: "Уровень продления контрактов" },
      { value: "18", label: "Лет международной работы" },
    ],
    quote:
      "Ekvator360 стал нашим экспортным отделом за восемь недель. Построенная ими воронка ведёт нас на рынках, которых мы бы сами не достигли.",
    quoteAuthor: "Джем Йылдыз",
    quoteRole: "Генеральный директор · Производитель промышленного оборудования",
    reasons: [
      {
        title: "Операционно, не консультационно",
        body: "Мы не отдаём вам презентацию и не исчезаем. Мы ведём работу, встречи, фоллоу-апы, переговоры, отчёты, неделя за неделей.",
      },
      {
        title: "Международны по умолчанию",
        body: "Многоязычная мультирегиональная команда с опытом в Европе, Заливе, Азии, Африке и Америках. Культурная свобода, базовый уровень.",
      },
      {
        title: "Старшая ответственность",
        body: "Ваш проект ведут старшие экспортные специалисты, лично владеющие результатами. Никаких тихих передач или замены на джунов.",
      },
      {
        title: "Исполнение процессного уровня",
        body: "Каждая беседа зафиксирована. Каждая воронка проверена. Экспорт превращается в инструментованную функцию внутри вашей компании.",
      },
    ],
  },
  vision: {
    badge: "Международное видение",
    titleLine1: "Производите здесь.",
    titleLine2: "Продавайте по всему миру.",
    subtitle:
      "Ekvator360 работает на шести континентах, строит присутствие на рынках, где нужны ваши продукты, и встречается с покупателями так, как ожидается от премиум-международных поставщиков.",
    regions: [
      { name: "Европа", countries: "Германия · Великобритания · Нидерланды · Италия" },
      { name: "Ближний Восток и Залив", countries: "ОАЭ · Саудовская Аравия · Катар · Кувейт" },
      { name: "Северная Америка", countries: "США · Канада · Мексика" },
      { name: "Азия и Тихий океан", countries: "Япония · Сингапур · Вьетнам · Австралия" },
      { name: "Африка", countries: "Египет · Марокко · ЮАР · Нигерия" },
      { name: "Латинская Америка", countries: "Бразилия · Чили · Колумбия" },
    ],
    liveLabel: "В реальном времени · Торговые маршруты",
    routesLabel: "38 активных маршрутов · 6 континентов",
  },
  finalCta: {
    eyebrow: "Давайте поговорим о вашем рынке",
    titleStart: "Готовы вести экспорт",
    titleHighlight: "так, как это делают премиум-поставщики",
    titleEnd: "?",
    subtitle:
      "Запланируйте конфиденциальную беседу с нашими партнёрами. Мы расскажем, как проект Ekvator360 выглядел бы для вашей компании, вашей категории и ваших целевых рынков, без презентаций, только чёткий ответ.",
    ctaPrimary: "Начать диалог",
    ctaSecondary: "Посмотреть план проекта",
    emailLabel: "Партнёрства",
    emailValue: "partners@ekvator360.com",
    phoneLabel: "Штаб Стамбул",
    phoneValue: "0216 606 35 85",
    addressLabel: "Адрес",
    addressValue:
      "Maltepe Piazza, Cevizli, Tugay Yolu Cd. No: 69/A, 34846 Maltepe/İstanbul",
    londonLabel: "Офис в Лондоне",
    londonAddress:
      "182-184 High Street North Office 13564, East Ham, London, England, E6 2JA",
    note: "Конфиденциальный приём · Старший партнёр отвечает в течение одного рабочего дня.",
  },
  footer: {
    tagline:
      "Ekvator360, компания по международным продажам и управлению экспортом. Мы работаем как внешний отдел продаж для производителей, готовых расти глобально.",
    offices: [
      {
        city: "Стамбул",
        role: "Maltepe Piazza, Cevizli, Tugay Yolu Cd. No: 69/A, Maltepe",
      },
      {
        city: "Лондон",
        role: "182-184 High Street North Office 13564, East Ham, E6 2JA",
      },
    ],
    columns: [
      {
        title: "Компания",
        links: [
          { label: "О нас", href: "#about" },
          { label: "Процесс", href: "#process" },
          { label: "Почему мы", href: "#why-us" },
          { label: "Контакты", href: "#contact" },
        ],
      },
      {
        title: "Услуги",
        links: [
          { label: "Управление экспортом", href: "#services" },
          { label: "Международные продажи", href: "#services" },
          { label: "Исследование рынка", href: "#services" },
          { label: "Привлечение клиентов", href: "#services" },
          { label: "Управление процессом", href: "#services" },
        ],
      },
      {
        title: "Сектора",
        links: [
          { label: "Машиностроение", href: "#hero" },
          { label: "Продукты и напитки", href: "#hero" },
          { label: "Стройматериалы", href: "#hero" },
          { label: "Текстиль", href: "#hero" },
          { label: "Химия", href: "#hero" },
          { label: "Товары потребления", href: "#hero" },
        ],
      },
      {
        title: "Юридическое",
        links: [
          { label: "Политика конфиденциальности", href: "#contact" },
          { label: "Условия использования", href: "#contact" },
          { label: "Cookies", href: "#contact" },
          { label: "KVKK", href: "#contact" },
        ],
      },
    ],
    rights: "Все права защищены.",
    statusLine: "Работаем на 42 рынках · 6 континентов",
  },
}

export const dictionaries: Record<Locale, Dictionary> = { tr, en, ru }

export const DEFAULT_LOCALE: Locale = "tr"
