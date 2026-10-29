import React from 'react';
import { 
  ArrowDown, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  CheckCircle2, 
  Sparkles, 
  Flame,
  ArrowRight
} from 'lucide-react';

interface HeroBannerProps {
  onExploreClick: () => void;
  onSelectBrand: (brand: string) => void;
  onOpenLegal: (topic: 'auth' | 'delivery' | 'return' | 'terms') => void;
}

const FEATURED_BRANDS = [
  { name: 'Nike', sub: 'Dunk, Air Max, Cortez' },
  { name: 'Jordan', sub: 'Air Jordan 1, 4, 11 Retro' },
  { name: 'Adidas', sub: 'Samba, Campus, Gazelle' },
  { name: 'Yeezy', sub: 'Boost 350, Foam Runner, Slide' },
  { name: 'New Balance', sub: '550, 990, 1906R, 2002R' },
  { name: 'Asics', sub: 'Gel-Kayano 14, GT-2160' },
  { name: 'Puma', sub: 'Suede XXI, Palermo' },
  { name: 'Fear of God', sub: 'Essentials Apparel' },
  { name: 'Polo Ralph Lauren', sub: 'Classic Washed Caps' }
];

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onExploreClick,
  onSelectBrand,
  onOpenLegal
}) => {
  return (
    <section className="relative bg-black text-white overflow-hidden border-b border-neutral-800">
      
      {/* Background Subtle Gradient & Grid Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#262626_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-neutral-800/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-neutral-900/60 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 md:pt-24 md:pb-28">
        
        {/* Top Kicker Tag & Restock Notice */}
        <div className="flex flex-wrap items-center gap-2.5 mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-neutral-900 border border-neutral-800 rounded-full text-xs font-mono text-neutral-300 tracking-wide">
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            <span>AUTENTICITATE GARANTATĂ 100% · DEADSTOCK SELECTION</span>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-950/50 border border-emerald-600/40 rounded-full text-xs font-mono text-emerald-300 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Recepționăm marfă nouă · Drop în curând</span>
          </div>
        </div>

        {/* Main Headline & Subtitle */}
        <div className="max-w-4xl">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tighter uppercase font-mono leading-[1.05] text-white">
            Your Style.<br />
            <span className="text-neutral-400">Your Rules.</span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-neutral-300 max-w-2xl leading-relaxed">
            Destinația românească de resell pentru sneakers rari și piese streetwear autentice. 
            Modele verificate fizic manual de experți, cutii originale intacte și livrare sigură în 24-48h.
          </p>
        </div>

        {/* Functional CTAs */}
        <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4">
          <button
            onClick={onExploreClick}
            className="flex items-center gap-2 px-8 py-4 bg-white text-black hover:bg-neutral-200 font-bold text-sm uppercase tracking-wider rounded-lg transition-all shadow-lg hover:shadow-xl active:scale-95"
          >
            <span>Explorează Produsele</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => onOpenLegal('auth')}
            className="flex items-center gap-2 px-6 py-4 bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-neutral-700 font-medium text-sm rounded-lg transition-all"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Procesul de Autentificare</span>
          </button>
        </div>

        {/* Brand Selector Ticker / Interactive Bar */}
        <div id="brands-section" className="mt-16 pt-10 border-t border-neutral-850">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs uppercase tracking-widest font-mono text-neutral-400 font-semibold">
              Branduri Disponibile în Stoc:
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
                className="group p-3 bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-600 rounded-lg text-left transition-all"
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
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-10 border-t border-neutral-850 text-neutral-300">
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 bg-neutral-900 border border-neutral-800 rounded-lg shrink-0 text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white font-mono">100% Autentic Verificat</h4>
              <p className="text-xs text-neutral-400 mt-1 leading-normal">
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
              <p className="text-xs text-neutral-400 mt-1 leading-normal">
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
              <p className="text-xs text-neutral-400 mt-1 leading-normal">
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
              <p className="text-xs text-neutral-400 mt-1 leading-normal">
                Afișăm doar stocul disponibil pe fiecare mărime în parte. Fără surprize la checkout.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
