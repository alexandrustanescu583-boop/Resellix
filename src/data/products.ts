import { Product, DeliveryOption } from '../types/ecommerce';

export const HERO_IMAGE = '/src/assets/images/hero_streetwear_caps_vault_1793215301250.jpg';

export const PRODUCTS: Product[] = [
  {
    id: 'polo-washed-navy',
    name: 'Șapcă Polo Ralph Lauren Washed Twill · Vintage Navy',
    category: 'polo_caps',
    categoryLabel: 'Șepci Polo',
    subtitle: 'Bumbac pieptănat 100% · Logo brodat tonal · Închidere cataramă alamă',
    priceRon: 280,
    priceEur: 56,
    rating: 4.9,
    reviewCount: 78,
    inStock: true,
    stockCount: 14,
    badge: 'Iconic Classic',
    image: '/src/assets/images/product_polo_washed_cap_navy_1793215302214.jpg',
    description: 'Piesa de căpătâi a culturii streetwear și a stilului prep vintage. Realizată din bumbac twill dens spălat enzimatic pentru o textură moale și o nuanță autentică de bleumarin vintage. Calotă joasă nestructurată (dad hat) cu cozoroc precurbat și cataramă gravată din alamă antichizată.',
    materials: ['100% Bumbac Chino Twill spălat', 'Broderie de înaltă densitate (Pony Logo)', 'Cataramă glisantă din alamă solidă', 'Bandă interioară absorbantă din bumbac'],
    dimensions: 'Circumferință reglabilă 54 - 61 cm (One Size Fits All)',
    warranty: 'Garanție de autenticitate 100% verificată',
    origin: 'Polo Ralph Lauren Archive · Import Original',
    features: [
      'Calotă nestructurată cu profil redus (6 panouri clasice)',
      'Finisaj washed cu aspect vintage autentic',
      'Curea reglabilă din același material cu ascundere a capătului',
      'Livrat în cutie rigidă de protecție (Double-Boxed) împotriva deformării'
    ],
    sku: 'POLO-TW-001',
    colors: ['Vintage Navy', 'Royal Indigo']
  },
  {
    id: 'yeezy-foam-runner',
    name: 'Yeezy Foam Runner · Sand & Bone Cream',
    category: 'footwear',
    categoryLabel: 'Încălțăminte',
    subtitle: 'Spumă injectată EVA & algă marină recoltată · Design sculptural futurist',
    priceRon: 690,
    priceEur: 139,
    rating: 5.0,
    reviewCount: 92,
    inStock: true,
    stockCount: 5,
    badge: 'Yeezy Vault Grail',
    image: '/src/assets/images/product_yeezy_foam_sneakers_1793216003748.jpg',
    description: 'Piesa iconică ce a redefinit silueta încălțămintei contemporane. Realizată dintr-o singură piesă injectată de spumă EVA inovatoare combinată cu biomasă de algă marină ecologică. Decupaje anatomice plasate strategic pentru ventilație maximă și un confort de neegalat la mers.',
    materials: ['Spumă EVA de amortizare premium', 'Material bio pe bază de alge', 'Talpă cu striații dinamice anti-alunecare'],
    dimensions: 'Mărimi disponibile: 40, 41, 42, 43, 44, 45 EU (Fit recomandat: +1 mărime)',
    warranty: '100% Autenticitate verificată cu legit check certificat',
    origin: 'Yeezy Design Studio · Deadstock Original',
    features: [
      'Construcție fără cusături și fără adezivi (monobloc)',
      'Greutate ultra-ușoară: sub 220g pe pantof',
      'Design ergonomic ce preia forma tălpii',
      'Cutie originală cu etichete de autenticitate'
    ],
    sku: 'YZY-FR-092',
    colors: ['Sand Bone Cream', 'Onyx Mineral']
  },
  {
    id: 'essentials-hoodie-taupe',
    name: 'Fear of God Essentials Hoodie · Heavyweight Taupe',
    category: 'essentials',
    categoryLabel: 'Essentials FOG',
    subtitle: 'Fleece dens 380 GSM · Croială boxy supradimensionată · Logo siliconic pe glugă',
    priceRon: 490,
    priceEur: 99,
    rating: 4.9,
    reviewCount: 64,
    inStock: true,
    stockCount: 9,
    badge: 'Essentials Classic',
    image: '/src/assets/images/product_essentials_hoodie_taupe_1793216003370.jpg',
    description: 'Hanoracul esențial în orice garderobă modernă de streetwear. Bumbac fleece de densitate mare 380 GSM cu interior pieptănat extrem de moale. Umerii căzuți și croiala generoasă tip boxy conferă drapajul perfect popularizat de Jerry Lorenzo.',
    materials: ['80% Bumbac pieptănat dens 380 GSM', '20% Poliester pentru rezistență la spălare', 'Emblemă cauciucată ESSENTIALS aplicată pe piept și glugă'],
    dimensions: 'Mărimi disponibile: S, M, L, XL (Croială relaxată supradimensionată)',
    warranty: 'Garanție cusături & material',
    origin: 'Fear of God Essentials · Import Direct',
    features: [
      'Glugă generoasă dublată fără șireturi pentru un look curat',
      'Manșete și betelie din tricot elastic canelat rezistent',
      'Păstrează forma neschimbată după spălare repetată',
      'Ambalaj original zip-lock holografic Essentials'
    ],
    sku: 'FOG-ESS-380',
    colors: ['Taupe Pământiu', 'Oatmeal Heather', 'Iron Black']
  },
  {
    id: 'polo-chalk-beige-leather',
    name: 'Șapcă Polo Minimalist Chalk Beige · Leather Strap Edition',
    category: 'polo_caps',
    categoryLabel: 'Șepci Polo',
    subtitle: 'Nuanță neutră desert chalk · Curea spate din piele naturală veritabilă',
    priceRon: 295,
    priceEur: 59,
    rating: 5.0,
    reviewCount: 46,
    inStock: true,
    stockCount: 8,
    badge: 'Yeezy Aesthetic',
    image: '/src/assets/images/product_polo_cap_chalk_beige_1793215302883.jpg',
    description: 'Estetică puristă neutră inspirată din paleta pământie Yeezy Season & Aimé Leon Dore. Bumbacul ivoriu spălat este completat de o curea de reglare din piele naturală coniac cu feronerie din bronz antichizat. O piesă ultra-versatilă pentru ținute minimaliste.',
    materials: ['Bumbac pieptănat greu 280g/mp', 'Curea din piele naturală tăbăcită vegetal', 'Broderie minimalistă ton-pe-ton', 'Ocheți de aerisire brodați'],
    dimensions: 'Circumferință 54 - 60.5 cm reglabilă',
    warranty: 'Verificare meticuloasă a calității cusăturilor',
    origin: 'Ediție Specială Polo Streetwear',
    features: [
      'Nuanță curată ivoriu calcar / chalk beige',
      'Curea premium din piele naturală cu cataramă inscripționată',
      'Cozoroc cu arcadă anatomică perfectă',
      'Etichetă interioară originală cu cod de verificare'
    ],
    sku: 'POLO-LTH-014',
    colors: ['Chalk Beige / Piele Coniac']
  },
  {
    id: 'polo-corduroy-forest',
    name: 'Șapcă Polo Wide-Wale Corduroy · Pădure Vintage',
    category: 'polo_caps',
    categoryLabel: 'Șepci Polo',
    subtitle: 'Textură reiată groasă 8-wale · Nuanță verde pădure adânc',
    priceRon: 320,
    priceEur: 64,
    rating: 4.9,
    reviewCount: 52,
    inStock: true,
    stockCount: 6,
    badge: 'Drop de Toamnă/Iarnă',
    image: '/src/assets/images/product_polo_corduroy_forest_1793215303088.jpg',
    description: 'O piesă rară din velur reiat gros (wide-wale corduroy) cu o textură tactilă spectaculoasă. Broderia iconică este realizată cu ață satinată contrastantă. Oferă o ținută termică excelentă și un profil retro inconfundabil.',
    materials: ['100% Bumbac Corduroy 8-Wale catifelat', 'Broderie în relief', 'Curea reglabilă din velur cu cataramă din alamă mată'],
    dimensions: 'Reglabil 54 - 61 cm',
    warranty: '100% Autenticitate garantată',
    origin: 'Polo Archive Vintage Drop',
    features: [
      'Material greu, rezistent și extrem de confortabil',
      'Nu își pierde forma la purtare frecventă',
      'Căptușeală frontală moale pentru confort maxim pe frunte',
      'Ambalare premium antistatică'
    ],
    sku: 'POLO-CRD-022',
    colors: ['Deep Forest Green', 'Olive Khaki']
  },
  {
    id: 'polo-mineral-black-onyx',
    name: 'Șapcă Polo Mineral Washed Onyx · Faded Black',
    category: 'polo_caps',
    categoryLabel: 'Șepci Polo',
    subtitle: 'Spălare acid wash cu minerale · Negru cărbune decolorat industrial',
    priceRon: 285,
    priceEur: 57,
    rating: 4.8,
    reviewCount: 63,
    inStock: true,
    stockCount: 11,
    badge: 'Bestseller Streetwear',
    image: '/src/assets/images/product_polo_washed_black_onyx_1793215304084.jpg',
    description: 'Aspect brut, industrial, similar colecțiilor Yeezy și Balenciaga. Fiecare șapcă are un model de decolorare minerală unic pe suprafața bumbacului, completat de o broderie discretă monocromă pe panoul frontal.',
    materials: ['Bumbac 100% supus tratamentului mineral enzyme-stone', 'Feronerie din oțel brunat', 'Fir de bumbac ranforsat'],
    dimensions: 'Reglabil 54 - 61 cm',
    warranty: 'Certificat de autenticitate',
    origin: 'Streetwear Vintage Vault',
    features: [
      'Tratament de spălare industrială pentru patină unică de grafit',
      'Broderie neagră ton-pe-ton pentru un look discret și curat',
      'Bumbac moale pre-strâns care nu intră la apă',
      'Profil clasic unstructured'
    ],
    sku: 'POLO-MIN-089',
    colors: ['Faded Onyx Black', 'Washed Charcoal']
  }
];

export const DELIVERY_OPTIONS: DeliveryOption[] = [
  {
    id: 'fan_courier',
    name: 'Curier Rapid 24-48h (Fan Courier)',
    description: 'Livrare directă în cutie rigidă de protecție (Double Boxed) cu verificare la livrare',
    priceRon: 22,
    priceEur: 4.5,
    estimatedDays: '1-2 zile lucrătoare'
  },
  {
    id: 'sameday_easybox',
    name: 'Sameday Easybox Locker',
    description: 'Ridicare autonomă 24/7 din lockere din toată România',
    priceRon: 16,
    priceEur: 3.5,
    estimatedDays: '1-2 zile lucrătoare'
  },
  {
    id: 'curier_vip',
    name: 'Same-Day Courier București & Ilfov',
    description: 'Livrare expres în aceeași zi, probare șapcă la fața locului',
    priceRon: 35,
    priceEur: 7,
    estimatedDays: 'Aceeași zi (comenzi până în 14:00)'
  }
];

export const COUPON_CODES: Record<string, { percent: number; label: string }> = {
  'POLO10': { percent: 10, label: '10% Reducere Primul Drop' },
  'YZY15': { percent: 15, label: '15% Reducere Membru Vault' },
  'ESSENTIALS': { percent: 12, label: '12% Reducere Streetwear' }
};

export const INITIAL_DEMO_ORDER = {
  orderNumber: 'VAULT-91024',
  date: '28 Octombrie 2026',
  status: 'in_transit' as const,
  trackingNumber: 'FAN-CAP-749102',
  estimatedDelivery: '30 Octombrie 2026',
  courier: 'Fan Courier Express',
  city: 'București, Sector 2',
  itemsTotal: '690 RON',
  itemsSummary: '1x Yeezy Foam Runner · Sand & Bone Cream'
};
