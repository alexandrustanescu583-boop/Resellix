import { Product } from '../types/resellix';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'resellix-prod-01',
    sku: 'NK-DNK-PND-01',
    name: 'Nike Dunk Low Retro Panda (Black/White)',
    brand: 'Nike',
    model: 'Dunk Low Retro',
    category: 'Sneakers',
    priceRon: 690,
    originalPriceRon: 790,
    sizes: [
      { size: 'EU 39', stock: 2 },
      { size: 'EU 40', stock: 4 },
      { size: 'EU 41', stock: 6 },
      { size: 'EU 42', stock: 5 },
      { size: 'EU 42.5', stock: 0 },
      { size: 'EU 43', stock: 3 },
      { size: 'EU 44', stock: 2 },
      { size: 'EU 45', stock: 1 }
    ],
    images: [
      '/src/assets/images/resellix_nike_dunk_retro_1793216616580.jpg'
    ],
    description: 'Cel mai căutat colorway clasic din cultura streetwear. Piele naturală netedă alb-negru de calitate superioară, talpă intermediară din spumă pentru amortizare ușoară și talpă din cauciuc durabil cu cerc de pivotare specific baschetului clasic.',
    status: 'disponibil',
    tag: 'Popular',
    rating: 4.9,
    reviewCount: 142,
    condition: 'Nou (DS - Deadstock în cutie originală)',
    materials: ['Piele naturală netedă', 'Cauciuc vulcanizat', 'Căptușeală textilă respirabilă'],
    isDemonstrative: false,
    createdAt: '2026-10-20'
  },
  {
    id: 'resellix-prod-02',
    sku: 'JD-AJ4-MIL-02',
    name: 'Air Jordan 4 Retro Military Black',
    brand: 'Jordan',
    model: 'Air Jordan 4 Retro',
    category: 'Sneakers',
    priceRon: 1890,
    originalPriceRon: 2100,
    sizes: [
      { size: 'EU 40', stock: 2 },
      { size: 'EU 41', stock: 3 },
      { size: 'EU 42', stock: 4 },
      { size: 'EU 42.5', stock: 2 },
      { size: 'EU 43', stock: 3 },
      { size: 'EU 44', stock: 1 },
      { size: 'EU 45', stock: 1 }
    ],
    images: [
      '/src/assets/images/jordan_four_sneaker_1793352227330.jpg'
    ],
    description: 'Una dintre cele mai apreciate siluete Jordan din toate timpurile. Bază din piele albă netedă, apărătoare de noroi din piele întoarsă gri deschis, accente negre contrastante la aripi și călcâi, și unitate Air-Sole vizibilă.',
    status: 'disponibil',
    tag: 'Popular',
    rating: 5.0,
    reviewCount: 215,
    condition: 'Nou (DS - Deadstock cu cutie originală)',
    materials: ['Piele naturală premium', 'Piele întoarsă fină (suede)', 'Unitate Nike Air vizibilă'],
    isDemonstrative: false,
    createdAt: '2026-10-25'
  },
  {
    id: 'resellix-prod-03',
    sku: 'JD-AJ1-CHI-03',
    name: 'Air Jordan 1 Retro High OG Chicago Lost & Found',
    brand: 'Jordan',
    model: 'Air Jordan 1 High OG',
    category: 'Sneakers',
    priceRon: 1550,
    originalPriceRon: 1750,
    sizes: [
      { size: 'EU 40', stock: 1 },
      { size: 'EU 41', stock: 2 },
      { size: 'EU 42', stock: 3 },
      { size: 'EU 42.5', stock: 2 },
      { size: 'EU 43', stock: 2 },
      { size: 'EU 44', stock: 1 },
      { size: 'EU 45', stock: 1 }
    ],
    images: [
      '/src/assets/images/jordan_one_chicago_1793352227958.jpg'
    ],
    description: 'Silueta care a schimbat cultura sneakers pentru totdeauna. Aspect vintage cu piele crăpată la gulerul căptușit, cutie retro replică a celei din 1985 cu chitanță de epocă și colorway legendar Varsity Red, White & Black.',
    status: 'disponibil',
    tag: 'Popular',
    rating: 5.0,
    reviewCount: 198,
    condition: 'Nou (DS - Deadstock complet cu bon retro și accesorii)',
    materials: ['Piele naturală finisaj vintage', 'Talpă amortizată Air', 'Cauciuc durabil'],
    isDemonstrative: false,
    createdAt: '2026-10-28'
  },
  {
    id: 'resellix-prod-04',
    sku: 'AD-SAMB-OG-04',
    name: 'Adidas Samba OG Cloud White & Core Black',
    brand: 'Adidas',
    model: 'Samba OG',
    category: 'Sneakers',
    priceRon: 560,
    originalPriceRon: 650,
    sizes: [
      { size: 'EU 38', stock: 3 },
      { size: 'EU 39', stock: 4 },
      { size: 'EU 40', stock: 5 },
      { size: 'EU 41', stock: 6 },
      { size: 'EU 42', stock: 8 },
      { size: 'EU 43', stock: 5 },
      { size: 'EU 44', stock: 3 }
    ],
    images: [
      '/src/assets/images/adidas_samba_sneaker_1793352226140.jpg'
    ],
    description: 'Regele incontestabil al ținutelor streetwear minimaliste. Partea superioară din piele de vițel de calitate superioară, inserție T-toe din piele întoarsă gri, cele trei dungi zimțate negre și talpa din cauciuc natural gum sole.',
    status: 'disponibil',
    tag: 'Popular',
    rating: 4.9,
    reviewCount: 167,
    condition: 'Nou (DS - Deadstock în cutie albastră originală)',
    materials: ['Piele netedă moale', 'Piele întoarsă la vârf', 'Talpă de cauciuc gum'],
    isDemonstrative: false,
    createdAt: '2026-10-22'
  },
  {
    id: 'resellix-prod-05',
    sku: 'YZY-350-ONX-05',
    name: 'Yeezy Boost 350 V2 Onyx',
    brand: 'Yeezy',
    model: 'Yeezy Boost 350 V2',
    category: 'Sneakers',
    priceRon: 1250,
    originalPriceRon: 1400,
    sizes: [
      { size: 'EU 40', stock: 2 },
      { size: 'EU 41.5', stock: 3 },
      { size: 'EU 42', stock: 4 },
      { size: 'EU 43', stock: 4 },
      { size: 'EU 44', stock: 2 },
      { size: 'EU 45', stock: 1 }
    ],
    images: [
      '/src/assets/images/yeezy_boost_sneaker_1793352228646.jpg'
    ],
    description: 'Ediția monocromă all-black a celebrului model proiectat de Kanye West. Căpută tricotată Primeknit respirabilă, bandă laterală monofilament semi-transparentă și tehnologia completă Boost încorporată în talpa canelată din TPU.',
    status: 'disponibil',
    tag: 'Popular',
    rating: 5.0,
    reviewCount: 174,
    condition: 'Nou (DS - Deadstock original cu etichetă)',
    materials: ['Material Primeknit adaptabil', 'Amortizare Boost întreagă lungime', 'Carcasă TPU'],
    isDemonstrative: false,
    createdAt: '2026-10-24'
  },
  {
    id: 'resellix-prod-06',
    sku: 'NB-2002R-PRT-06',
    name: 'New Balance 2002R Protection Pack Rain Cloud',
    brand: 'New Balance',
    model: '2002R Protection Pack',
    category: 'Sneakers',
    priceRon: 890,
    originalPriceRon: 990,
    sizes: [
      { size: 'EU 40', stock: 2 },
      { size: 'EU 41', stock: 4 },
      { size: 'EU 42', stock: 5 },
      { size: 'EU 43', stock: 3 },
      { size: 'EU 44', stock: 2 },
      { size: 'EU 45', stock: 1 }
    ],
    images: [
      '/src/assets/images/new_balance_protection_1793352242159.jpg'
    ],
    description: 'Estetică deconstructed celebrată la nivel mondial. Suprapuneri de piele întoarsă aspră cu margini franjurate, plasă gri aerată și talpă cu tehnologiile N-ergy și ABZORB pentru amortizare la standarde de top.',
    status: 'disponibil',
    tag: 'Nou',
    rating: 4.9,
    reviewCount: 88,
    condition: 'Nou (DS - În cutie originală New Balance)',
    materials: ['Piele întoarsă premium franjurată', 'Mesh respirabil', 'Talpă N-ergy / ABZORB'],
    isDemonstrative: false,
    createdAt: '2026-10-27'
  },
  {
    id: 'resellix-prod-07',
    sku: 'NB-550-GRN-07',
    name: 'New Balance 550 White & Vintage Green',
    brand: 'New Balance',
    model: '550 Heritage',
    category: 'Sneakers',
    priceRon: 620,
    originalPriceRon: 720,
    sizes: [
      { size: 'EU 40', stock: 3 },
      { size: 'EU 41', stock: 4 },
      { size: 'EU 42', stock: 5 },
      { size: 'EU 43', stock: 0 },
      { size: 'EU 44', stock: 2 },
      { size: 'EU 45', stock: 2 }
    ],
    images: [
      '/src/assets/images/resellix_new_balance_550_1793216616500.jpg'
    ],
    description: 'Omagiu adus modelului original de baschet din 1989. Partea superioară combină piele albă perforată cu inserții verde pădure vintage și o talpă cu profil retro îndrăgit de comunitatea internațională.',
    status: 'disponibil',
    tag: 'Reducere',
    rating: 4.8,
    reviewCount: 96,
    condition: 'Nou (DS - Deadstock cu etichete)',
    materials: ['Piele naturală perforată', 'Talpă din cauciuc rezistent', 'Spumă EVA'],
    isDemonstrative: false,
    createdAt: '2026-10-22'
  },
  {
    id: 'resellix-prod-08',
    sku: 'AS-GEL-KAY-08',
    name: 'Asics Gel-Kayano 14 Silver Metallic & Cream',
    brand: 'Asics',
    model: 'Gel-Kayano 14',
    category: 'Sneakers',
    priceRon: 840,
    sizes: [
      { size: 'EU 40', stock: 2 },
      { size: 'EU 41.5', stock: 3 },
      { size: 'EU 42', stock: 4 },
      { size: 'EU 43', stock: 4 },
      { size: 'EU 44', stock: 1 },
      { size: 'EU 45', stock: 0 }
    ],
    images: [
      '/src/assets/images/resellix_asics_gel_kayano_1793216617655.jpg'
    ],
    description: 'Estetică retro-futuristă tehnică din anii 2000. Stratificare de plasă respirabilă și suprapuneri metalice argintii, combinată cu tehnologia iconică de amortizare cu GEL în călcâi și antepicior.',
    status: 'disponibil',
    tag: 'Nou',
    rating: 5.0,
    reviewCount: 68,
    condition: 'Nou (DS - Cutie intactă cu accesorii)',
    materials: ['Mesh tehnic', 'Suprapuneri sintetice metalizate', 'Amortizare GEL'],
    isDemonstrative: false,
    createdAt: '2026-10-26'
  },
  {
    id: 'resellix-prod-09',
    sku: 'AD-YZY-FOAM-09',
    name: 'Yeezy Foam Runner Sand Cream',
    brand: 'Yeezy',
    model: 'Foam Runner',
    category: 'Sneakers',
    priceRon: 790,
    originalPriceRon: 890,
    sizes: [
      { size: 'EU 40', stock: 1 },
      { size: 'EU 41', stock: 2 },
      { size: 'EU 42', stock: 3 },
      { size: 'EU 43', stock: 3 },
      { size: 'EU 44', stock: 2 }
    ],
    images: [
      '/src/assets/images/product_yeezy_foam_sneakers_1793216003748.jpg'
    ],
    description: 'Siluetă sculpturală monobloc injectată din spumă EVA reciclată și alge marine. Decupaje ergonomice plasate precis pentru ventilare optimă și confort futurist la mers.',
    status: 'disponibil',
    tag: 'Popular',
    rating: 4.9,
    reviewCount: 110,
    condition: 'Nou (DS - Deadstock original)',
    materials: ['Spumă EVA biologică', 'Biomasă alge'],
    isDemonstrative: false,
    createdAt: '2026-10-18'
  },
  {
    id: 'resellix-prod-10',
    sku: 'PM-SUD-CL-10',
    name: 'Puma Suede Classic XXI Black & White',
    brand: 'Puma',
    model: 'Suede Classic XXI',
    category: 'Sneakers',
    priceRon: 390,
    originalPriceRon: 460,
    sizes: [
      { size: 'EU 40', stock: 3 },
      { size: 'EU 41', stock: 4 },
      { size: 'EU 42', stock: 6 },
      { size: 'EU 43', stock: 4 },
      { size: 'EU 44', stock: 2 }
    ],
    images: [
      '/src/assets/images/puma_suede_black_1793352287677.jpg'
    ],
    description: 'Piesă legendară de streetwear din piele întoarsă naturală velur de un negru intens. Bandă Formstrip albă contrastantă și talpă din cauciuc alb aderentă cu profil clasic b-boy.',
    status: 'disponibil',
    tag: 'Reducere',
    rating: 4.7,
    reviewCount: 51,
    condition: 'Nou (DS în cutie originală)',
    materials: ['Piele întoarsă (suede) naturală 100%', 'Talpă cauciuc vulcanizat'],
    isDemonstrative: false,
    createdAt: '2026-10-10'
  },
  {
    id: 'resellix-prod-11',
    sku: 'FOG-ESS-HD-11',
    name: 'Fear of God Essentials Fleece Hoodie · Taupe',
    brand: 'Fear of God',
    model: 'Essentials Pullover Hoodie',
    category: 'Îmbrăcăminte',
    priceRon: 520,
    originalPriceRon: 580,
    sizes: [
      { size: 'S', stock: 4 },
      { size: 'M', stock: 6 },
      { size: 'L', stock: 5 },
      { size: 'XL', stock: 2 }
    ],
    images: [
      '/src/assets/images/product_essentials_hoodie_taupe_1793216003370.jpg'
    ],
    description: 'Hanorac supradimensionat (boxy fit) din bumbac fleece dens 380 GSM. Drapaj curat fără șireturi la glugă, umeri căzuți și emblemă cauciucată ESSENTIALS aplicată pe piept și glugă.',
    status: 'disponibil',
    tag: 'Popular',
    rating: 4.9,
    reviewCount: 84,
    condition: 'Nou (DS - În pungă sigilată zip-lock originală)',
    materials: ['80% Bumbac pieptănat dens', '20% Poliester'],
    isDemonstrative: false,
    createdAt: '2026-10-15'
  },
  {
    id: 'resellix-prod-12',
    sku: 'POLO-CAP-NV-12',
    name: 'Polo Ralph Lauren Washed Chino Cap · Vintage Navy',
    brand: 'Polo Ralph Lauren',
    model: 'Classic Dad Cap',
    category: 'Accesorii',
    priceRon: 280,
    sizes: [
      { size: 'One Size (Reglabil)', stock: 12 }
    ],
    images: [
      '/src/assets/images/product_polo_washed_cap_navy_1793215302214.jpg'
    ],
    description: 'Șapcă iconică unstructured din bumbac chino spălat cu profil jos. Broderie Pony la milimetru pe panoul frontal și cataramă metalică gravată din alamă antichizată la spate.',
    status: 'disponibil',
    tag: 'Popular',
    rating: 5.0,
    reviewCount: 93,
    condition: 'Nou (DS cu etichete originale)',
    materials: ['100% Bumbac Chino Twill', 'Feronerie alamă masivă'],
    isDemonstrative: false,
    createdAt: '2026-10-12'
  }
];

export const BRANDS_LIST = [
  'Toate Brandurile',
  'Nike',
  'Jordan',
  'Adidas',
  'Yeezy',
  'New Balance',
  'Asics',
  'Puma',
  'Fear of God',
  'Polo Ralph Lauren'
] as const;

export const CATEGORIES_LIST = [
  'Toate Categoriile',
  'Sneakers',
  'Îmbrăcăminte',
  'Accesorii'
] as const;

export const SIZES_FILTER_LIST = [
  'EU 38',
  'EU 39',
  'EU 40',
  'EU 41',
  'EU 41.5',
  'EU 42',
  'EU 42.5',
  'EU 43',
  'EU 44',
  'EU 45',
  'S',
  'M',
  'L',
  'XL',
  'One Size (Reglabil)'
];
