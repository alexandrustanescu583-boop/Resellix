import React from 'react';
import { ArrowRight, Plus, ShieldCheck, Box, Sparkles, CheckCircle2 } from 'lucide-react';
import { HERO_IMAGE } from '../data/products';

interface HeroProps {
  onExploreClick: () => void;
  onOpenAddProduct: () => void;
  onSelectCategory: (category: 'twill' | 'corduroy' | 'mineral' | 'limited' | 'all') => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onOpenAddProduct, onSelectCategory }) => {
  return (
    <section id="hero" className="relative pt-6 pb-20 overflow-hidden bg-neutral-950 text-white">
      
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-neutral-800/40 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 2-column split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          
          {/* Left Column: Streetwear Statement */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            
            {/* Unboxed subtle kicker */}
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-400 mb-4">
              <span className="text-white font-bold">VAULT ARCHIVE</span>
              <span aria-hidden="true">·</span>
              <span>POLO STREETWEAR</span>
              <span aria-hidden="true">·</span>
              <span>DROP 2026</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight leading-[1.1] mb-6 text-balance">
              Șepci Polo clasice & piese de colecție streetwear.
            </h1>

            <p className="text-base sm:text-lg text-neutral-400 mb-8 leading-relaxed max-w-xl">
              Estetică brută inspirată de culturile Yeezy și Aimé Leon Dore: bumbac washed twill dens, velur corduroy vintage, decolorări minerale și catarame din alamă masivă. Fiecare piesă este verificată minuțios și livrată în cutie dublă de protecție.
            </p>

            <div className="flex flex-wrap items-center gap-3.5 mb-8">
              <button
                onClick={onExploreClick}
                className="flex items-center gap-2.5 px-6 py-3.5 text-sm font-semibold text-neutral-950 bg-white rounded-xl hover:bg-neutral-200 transition-all hover:translate-y-[-1px] shadow-sm whitespace-nowrap"
              >
                <span>Explorează Drop-urile</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              
              <button
                onClick={onOpenAddProduct}
                className="flex items-center gap-2 px-5 py-3.5 text-sm font-semibold text-white bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 rounded-xl transition-colors whitespace-nowrap"
              >
                <Plus className="w-4 h-4 text-emerald-400" />
                <span>Adaugă Șapcă în Magazin</span>
              </button>
            </div>

            {/* Proof indicators */}
            <div className="pt-6 border-t border-neutral-800 grid grid-cols-2 gap-4 text-xs text-neutral-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>100% Autenticitate Verificată</span>
              </div>
              <div className="flex items-center gap-2">
                <Box className="w-4 h-4 text-white shrink-0" />
                <span>Ambalare Double-Boxed Rigidă</span>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-7">
            <div className="relative group rounded-3xl overflow-hidden bg-neutral-900 border border-neutral-800 shadow-2xl aspect-[16/10] sm:aspect-[16/9]">
              <img
                src={HERO_IMAGE}
                alt="Polo cap on concrete blocks in a brutalist streetwear setting"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                referrerPolicy="no-referrer"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent" />
              
              {/* Overlay info */}
              <div className="absolute bottom-6 left-6 right-6 text-white flex items-end justify-between gap-4">
                <div>
                  <span className="text-xs uppercase tracking-widest text-neutral-400 font-mono">The Iconic Silhouette</span>
                  <p className="text-xl sm:text-2xl font-serif font-semibold mt-1">Washed Twill Dad Cap pe Soclu Brutalist</p>
                </div>
                <button
                  onClick={() => onSelectCategory('twill')}
                  className="px-4 py-2 text-xs font-semibold bg-white text-neutral-950 hover:bg-neutral-200 rounded-lg shadow-sm transition-colors whitespace-nowrap shrink-0"
                >
                  Vezi Modelul
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* 4 Pillars Strip */}
        <div className="mt-14 pt-8 border-t border-neutral-800 grid grid-cols-2 md:grid-cols-4 gap-6 text-neutral-300">
          <div className="space-y-1">
            <p className="text-sm font-semibold text-white">Livrare Double-Boxed 24h</p>
            <p className="text-xs text-neutral-500">Cozorocul și coroana șepcii nu se deformează niciodată în transport.</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-semibold text-white">Plată Sigură 3D Secure / Ramburs</p>
            <p className="text-xs text-neutral-500">Card bancar online, Apple Pay, Revolut sau plată numerar direct la curier.</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-semibold text-white">Mărime Universală Ajustabilă</p>
            <p className="text-xs text-neutral-500">Cataramă glisantă metalică pentru reglare precisă (54 - 61 cm).</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-semibold text-white">Verificare Colet la Livrare</p>
            <p className="text-xs text-neutral-500">Deschizi și inspectezi șapca înainte de a achita curierului.</p>
          </div>
        </div>

      </div>
    </section>
  );
};
