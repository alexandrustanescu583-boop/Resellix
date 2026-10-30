import React, { useState } from 'react';
import { 
  ArrowDown, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  CheckCircle2, 
  Sparkles, 
  Flame,
  ArrowRight,
  ChevronRight,
  Package,
  Lock
} from 'lucide-react';

interface HeroBannerProps {
  onExploreClick: () => void;
  onSelectBrand: (brand: string) => void;
  onOpenLegal: (topic: 'auth' | 'delivery' | 'return' | 'terms') => void;
  productsCount?: number;
}

const FEATURED_BRANDS = [
  { name: 'Nike', sub: 'Dunk Low, Air Max, Cortez' },
  { name: 'Jordan', sub: 'Air Jordan 1, 4 Retro' },
  { name: 'Adidas', sub: 'Samba OG, Campus, Gazelle' },
  { name: 'Yeezy', sub: 'Boost 350 V2, Foam Runner' },
  { name: 'New Balance', sub: '550, 2002R, 1906R' },
  { name: 'Asics', sub: 'Gel-Kayano 14, GT-2160' },
  { name: 'Puma', sub: 'Suede Classic XXI' },
  { name: 'Fear of God', sub: 'Essentials Apparel' },
  { name: 'Polo Ralph Lauren', sub: 'Classic Washed Caps' }
];

const HERO_SHOWCASE_KICKS = [
  {
    name: 'Air Jordan 4 Retro Military Black',
    brand: 'Jordan',
    priceRon: 1890,
    tag: 'Celebru',
    image: '/src/assets/images/jordan_four_sneaker_1793352227330.jpg'
  },
  {
    name: 'Air Jordan 1 High OG Chicago Lost & Found',
    brand: 'Jordan',
    priceRon: 1550,
    tag: 'Legendă',
    image: '/src/assets/images/jordan_one_chicago_1793352227958.jpg'
  },
  {
    name: 'Adidas Samba OG Cloud White',
    brand: 'Adidas',
    priceRon: 560,
    tag: 'Trending',
    image: '/src/assets/images/adidas_samba_sneaker_1793352226140.jpg'
  },
  {
    name: 'Yeezy Boost 350 V2 Onyx',
    brand: 'Yeezy',
    priceRon: 1250,
    tag: 'All-Black',
    image: '/src/assets/images/yeezy_boost_sneaker_1793352228646.jpg'
  }
];

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onExploreClick,
  onSelectBrand,
  onOpenLegal,
  productsCount = 0
}) => {
  const [activeKickIndex, setActiveKickIndex] = useState(0);
  const activeKick = HERO_SHOWCASE_KICKS[activeKickIndex];
  const hasProducts = productsCount > 0;

  return (
    <section className="relative bg-black text-white overflow-hidden border-b border-neutral-800">
      
      {/* Background Subtle Gradient & Grid Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#262626_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-neutral-800/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-neutral-900/50 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 md:pt-20 md:pb-24">
        
        {/* Main 2-Column Split: Editorial Left & Showcase Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Top Kicker Tags */}
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-neutral-900 border border-neutral-800 rounded-full text-xs font-mono text-neutral-300 tracking-wide">
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                <span>100% AUTENTIC VERIFICAT MANUAL · DEADSTOCK</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-neutral-900 border border-neutral-700/80 rounded-full text-xs font-mono text-emerald-400 font-medium">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span>{hasProducts ? 'Stoc fizic disponibil · Expediere în 24-48h' : 'Recepție marfă fizică în curs · Drop 01'}</span>
              </div>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tighter uppercase font-mono leading-[1.02] text-white">
              Your Style.<br />
              <span className="text-neutral-400">Your Rules.</span>
            </h1>

            <p className="mt-6 text-base sm:text-lg text-neutral-300 max-w-xl leading-relaxed font-sans">
              {hasProducts 
                ? 'Destinația românească de resell pentru sneakers originali și piese streetwear autentice. Fiecare pereche trece prin verificare fizică detaliată de experți, cu cutie originală intactă și ambalare Double-Box.'
                : 'Destinația românească de resell pentru sneakers originali și piese streetwear autentice. Pregătim primul drop oficial cu marfă fizică verificată manual. Fără produse inventate — doar articole 100% originale.'}
            </p>

            {/* Functional CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                onClick={onExploreClick}
                className="flex items-center gap-2 px-8 py-4 bg-white text-black hover:bg-neutral-200 font-bold text-sm uppercase font-mono tracking-wider rounded-lg transition-all shadow-lg hover:shadow-xl active:scale-95 cursor-pointer"
              >
                <span>{hasProducts ? 'Explorează Catalogul' : 'Vezi Statusul Dropului'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onOpenLegal('auth')}
                className="flex items-center gap-2 px-6 py-4 bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-neutral-700 font-medium text-sm font-mono rounded-lg transition-all cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Verificarea Autenticității</span>
              </button>
            </div>

            {/* Quick Guarantees Row */}
            <div className="mt-8 pt-6 border-t border-neutral-800/80 flex flex-wrap items-center gap-6 text-xs font-mono text-neutral-400">
              <span className="flex items-center gap-1.5 text-neutral-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Cutii originale intacte
              </span>
              <span className="flex items-center gap-1.5 text-neutral-300">
                <Truck className="w-4 h-4 text-white" /> Fan Courier & Sameday Easybox
              </span>
              <span className="flex items-center gap-1.5 text-neutral-300">
                <RotateCcw className="w-4 h-4 text-emerald-400" /> Retur 30 Zile Garantat
              </span>
            </div>

          </div>

          {/* Right Column: Interactive Sneaker Showcase or Drop 01 Vault Teaser */}
          <div className="lg:col-span-5">
            {hasProducts ? (
              <div className="relative bg-neutral-900/90 border border-neutral-800 rounded-2xl p-5 shadow-2xl backdrop-blur-sm">
                
                {/* Image Frame */}
                <div className="relative aspect-square rounded-xl overflow-hidden bg-neutral-950 border border-neutral-800 flex items-center justify-center group">
                  <img
                    src={activeKick.image}
                    alt={activeKick.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  <span className="absolute top-3 left-3 bg-white text-black text-[11px] font-mono font-bold uppercase px-2.5 py-1 rounded shadow">
                    {activeKick.tag}
                  </span>

                  <span className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-sm text-emerald-400 text-[10px] font-mono px-2.5 py-1 rounded border border-neutral-700 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>100% Autentic Garantat</span>
                  </span>
                </div>

                {/* Sneaker Info & Selector */}
                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-widest block">
                      {activeKick.brand}
                    </span>
                    <h3 className="text-sm font-mono font-bold text-white mt-0.5 line-clamp-1">
                      {activeKick.name}
                    </h3>
                  </div>
                  <div className="text-right">
                    <span className="text-base font-mono font-bold text-white block">
                      {activeKick.priceRon.toLocaleString('ro-RO')} RON
                    </span>
                    <span className="text-[10px] font-mono text-neutral-500">
                      Stoc fizic imediat
                    </span>
                  </div>
                </div>

                {/* Showcase Thumbnail Switcher */}
                <div className="mt-4 pt-3 border-t border-neutral-800 flex items-center gap-2">
                  {HERO_SHOWCASE_KICKS.map((kick, idx) => (
                    <button
                      key={kick.name}
                      onClick={() => setActiveKickIndex(idx)}
                      className={`relative flex-1 aspect-square rounded-lg overflow-hidden border transition-all ${
                        activeKickIndex === idx
                          ? 'border-white ring-2 ring-white/20'
                          : 'border-neutral-800 opacity-60 hover:opacity-100 hover:border-neutral-600'
                      }`}
                    >
                      <img src={kick.image} alt={kick.name} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>

              </div>
            ) : (
              /* High-End Vault Teaser (Zero fake or unowned product photos) */
              <div className="relative bg-gradient-to-b from-neutral-900 via-neutral-950 to-neutral-900 border border-neutral-800 rounded-2xl p-6 sm:p-7 shadow-2xl backdrop-blur-sm space-y-6">
                <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                      ReSellix Vault · Status Depozit
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded font-semibold uppercase">
                    Recepție Marfă
                  </span>
                </div>

                {/* Vault Intake Graphic & Monogram (No fake photos) */}
                <div className="relative rounded-xl overflow-hidden bg-black/90 border border-neutral-800 p-6 flex flex-col items-center justify-center text-center space-y-3">
                  <div className="absolute inset-0 bg-[radial-gradient(#262626_1px,transparent_1px)] [background-size:16px_16px] opacity-30 pointer-events-none" />
                  
                  <div className="relative w-16 h-16 rounded-2xl bg-neutral-900 border border-neutral-700/80 flex items-center justify-center shadow-xl">
                    <Package className="w-8 h-8 text-emerald-400" />
                  </div>

                  <div className="relative">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold block">
                      DROP 01 ÎN PREGĂTIRE
                    </span>
                    <h3 className="text-lg font-black font-mono text-white uppercase tracking-tight mt-0.5">
                      Fără Poze Fictive
                    </h3>
                    <p className="text-xs text-neutral-400 font-mono mt-1 max-w-xs leading-relaxed">
                      Toate produsele sunt fotografiate fizic și listate numai după recepția în depozit.
                    </p>
                  </div>
                </div>

                {/* Pipeline Steps */}
                <div className="space-y-2 font-mono text-xs">
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-neutral-900/60 border border-neutral-800/80">
                    <span className="text-neutral-300 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      1. Livrare & Recepție Fizică
                    </span>
                    <span className="text-emerald-400 text-[11px] font-bold">În Curs</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-neutral-900/60 border border-neutral-800/80">
                    <span className="text-neutral-300 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                      2. Verificare Autenticitate 10 Puncte
                    </span>
                    <span className="text-amber-300 text-[11px] font-bold">Garantat</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-neutral-900/60 border border-neutral-800/80">
                    <span className="text-neutral-400 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-neutral-600" />
                      3. Fotografiere Reală & Listare Mărimi
                    </span>
                    <span className="text-neutral-500 text-[11px]">Urmează</span>
                  </div>
                </div>

                {/* Security and physical guarantee footer */}
                <div className="pt-2 border-t border-neutral-800/80 flex items-center justify-between text-[11px] font-mono text-neutral-400">
                  <span className="flex items-center gap-1.5 text-neutral-300">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> 100% Deadstock
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1.5 text-neutral-300">
                    <Truck className="w-3.5 h-3.5 text-white" /> Fan Courier & Easybox
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1.5 text-neutral-300">
                    <Lock className="w-3.5 h-3.5 text-emerald-400" /> Plăți Reale
                  </span>
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Brand Selector Ticker / Interactive Bar */}
        <div id="brands-section" className="mt-14 pt-10 border-t border-neutral-800">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs uppercase tracking-widest font-mono text-neutral-400 font-semibold">
              {hasProducts ? 'Branduri Disponibile în Stoc:' : 'Branduri Selectate pentru Drop:'}
            </span>
            <span className="text-xs text-neutral-500 font-mono hidden sm:inline">
              Filtrează rapid colecția
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-9 gap-2.5">
            {FEATURED_BRANDS.map((brand) => (
              <button
                key={brand.name}
                onClick={() => {
                  onSelectBrand(brand.name);
                  onExploreClick();
                }}
                className="group p-3 bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-600 rounded-lg text-left transition-all cursor-pointer"
              >
                <div className="text-sm font-mono font-bold text-white group-hover:text-emerald-400 transition-colors">
                  {brand.name}
                </div>
                <div className="text-[11px] text-neutral-500 truncate mt-0.5">
                  {brand.sub}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* 4 Guarantees Strip */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-10 border-t border-neutral-800 text-neutral-300">
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 bg-neutral-900 border border-neutral-800 rounded-lg shrink-0 text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white font-mono">100% Autentic Verificat</h4>
              <p className="text-xs text-neutral-400 mt-1 leading-normal font-sans">
                Fiecare pereche trece prin verificare riguroasă: etichetă, cusături, miros, cutie și accesorii.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-2.5 bg-neutral-900 border border-neutral-800 rounded-lg shrink-0 text-white">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white font-mono">Livrare 24-48h Double-Box</h4>
              <p className="text-xs text-neutral-400 mt-1 leading-normal font-sans">
                Curier rapid Fan Courier sau Sameday Easybox. Cutia originală protejată într-o a doua cutie rigidă.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-2.5 bg-neutral-900 border border-neutral-800 rounded-lg shrink-0 text-white">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white font-mono">Retur Garantat 30 Zile</h4>
              <p className="text-xs text-neutral-400 mt-1 leading-normal font-sans">
                Dacă mărimea nu ți se potrivește, schimbi sau primești banii înapoi fără bătăi de cap.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-2.5 bg-neutral-900 border border-neutral-800 rounded-lg shrink-0 text-emerald-400">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white font-mono">Stoc Fizic Real & Mărimi</h4>
              <p className="text-xs text-neutral-400 mt-1 leading-normal font-sans">
                Afișăm doar stocul disponibil pe fiecare mărime în parte. Fără surprize la checkout.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
