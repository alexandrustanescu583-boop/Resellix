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
      { size: 'EU 42.5', stock: 0 }, // Out of stock to test validation!
      { size: 'EU 43', stock: 3 },
      { size: 'EU 44', stock: 2 },
      { size: 'EU 45', stock: 1 }
    ],
    images: [
      '/src/assets/images/resellix_nike_dunk_retro_1793216616580.jpg'
    ],
    description: 'Cel mai râvnit colorway clasic din cultura streetwear. Piele naturală netedă alb-negru de calitate superioară, talpă intermediară din spumă pentru amortizare ușoară și talpă din cauciuc durabil cu cerc de pivotare specific baschetului clasic.',
    status: 'disponibil',
    tag: 'Popular',
    rating: 4.9,
    reviewCount: 142,
    condition: 'Nou (DS - Deadstock în cutie originală)',
    materials: ['Piele naturală bovină', 'Cauciuc vulcanizat', 'Căptușeală textilă respirabilă'],
    isDemonstrative: true,
    createdAt: '2026-10-20'
  },
  {
    id: 'resellix-prod-02',
    sku: 'NB-550-GRN-02',
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
      { size: 'EU 43', stock: 0 }, // Out of stock test
      { size: 'EU 44', stock: 2 },
      { size: 'EU 45', stock: 2 }
    ],
    images: [
      '/src/assets/images/resellix_new_balance_550_1793216616500.jpg'
    ],
    description: 'Omagiu adus modelului original de baschet din 1989. Partea superioară combină piele albă perforată cu inserții verde pădure vintage și o talpă ușor îngălbenită pentru un aspect retro autentic îndrăgit de comunitatea streetwear.',
    status: 'disponibil',
    tag: 'Reducere',
    rating: 4.8,
    reviewCount: 96,
    condition: 'Nou (DS - Deadstock cu etichete)',
    materials: ['Piele naturală perforată', 'Talpă din cauciuc rezistent', 'Spumă EVA'],
    isDemonstrative: true,
    createdAt: '2026-10-22'
  },
  {
    id: 'resellix-prod-03',
    sku: 'AS-GEL-KAY-03',
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
    description: 'Estetică retro-futuristă tehnică din anii 2000. Stratificare de plasă respirabilă și suprapuneri metalice argintii, combinată cu tehnologia iconică de amortizare cu GEL în călcâi și antepicior pentru stabilitate desăvârșită.',
    status: 'disponibil',
    tag: 'Nou',
    rating: 5.0,
    reviewCount: 68,
    condition: 'Nou (DS - Cutie intactă cu accesorii)',
    materials: ['Mesh tehnic', 'Suprapuneri sintetice metalizate', 'Amortizare GEL'],
    isDemonstrative: true,
    createdAt: '2026-10-26'
  },
  {
    id: 'resellix-prod-04',
    sku: 'AD-YZY-FOAM-04',
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
    isDemonstrative: true,
    createdAt: '2026-10-18'
  },
  {
    id: 'resellix-prod-05',
    sku: 'FOG-ESS-HD-05',
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
    isDemonstrative: true,
    createdAt: '2026-10-15'
  },
  {
    id: 'resellix-prod-06',
    sku: 'POLO-CAP-NV-06',
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
    isDemonstrative: true,
    createdAt: '2026-10-12'
  },
  {
    id: 'resellix-prod-07',
    sku: 'PM-SUD-CL-07',
    name: 'Puma Suede Classic XXI · Black & White',
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
      '/src/assets/images/product_polo_washed_black_onyx_1793215304084.jpg'
    ],
    description: 'Piesă legendară de streetwear din piele întoarsă naturală velur. Bandă Formstrip albă contrastantă și talpă din cauciuc alb aderentă cu profil clasic b-boy.',
    status: 'disponibil',
    tag: 'Reducere',
    rating: 4.7,
    reviewCount: 51,
    condition: 'Nou (DS în cutie originală)',
    materials: ['Piele întoarsă (suede) 100%', 'Talpă cauciuc'],
    isDemonstrative: true,
    createdAt: '2026-10-10'
  },
  {
    id: 'resellix-prod-08',
    sku: 'JD-AJ1-CHI-08',
    name: 'Air Jordan 1 Retro High OG · Chicago Lost & Found',
    brand: 'Jordan',
    model: 'Air Jordan 1 High OG',
    category: 'Sneakers',
    priceRon: 1450,
    originalPriceRon: 1650,
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
      '/src/assets/images/resellix_nike_dunk_retro_1793216616580.jpg'
    ],
    description: 'Silueta care a schimbat cultura sneakers pentru totdeauna. Aspect vintage cu piele crăpată la guler, cutie retro replică 1985 cu bon fiscal de epocă și colorway legendar Varsity Red/Black/Sail.',
    status: 'disponibil',
    tag: 'Popular',
    rating: 5.0,
    reviewCount: 188,
    condition: 'Nou (DS - Deadstock complet cu bon retro și accesorii)',
    materials: ['Piele naturală premium finisaj vintage', 'Talpă Nike Air', 'Cauciuc durabil'],
    isDemonstrative: true,
    createdAt: '2026-10-28'
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
  'EU 42',
  'EU 43',
  'EU 44',
  'EU 45',
  'S',
  'M',
  'L',
  'XL',
  'One Size (Reglabil)'
];
