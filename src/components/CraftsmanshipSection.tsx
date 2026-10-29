import React from 'react';
import { ShieldCheck, Box, Sliders, Check, Quote, Layers } from 'lucide-react';

export const CraftsmanshipSection: React.FC = () => {
  return (
    <section id="craftsmanship" className="py-24 bg-neutral-900 text-neutral-100 relative overflow-hidden border-t border-neutral-800">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-400 mb-3">
            <span className="text-white font-bold">ANATOMIE & STANDARD</span>
            <span aria-hidden="true">·</span>
            <span>POLO STREETWEAR GUIDE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-tight text-white leading-tight">
            De ce șapca Polo rămâne piesa esențială în orice rotație de streetwear.
          </h2>
          <p className="mt-4 text-sm sm:text-base text-neutral-400 leading-relaxed">
            De la ținutele relaxate Yeezy Season, la estetica New York prep Aimé Leon Dore, șapca clasică din bumbac spălat oferă proporția ideală a feței fără rigiditate artificială.
          </p>
        </div>

        {/* 3 Pillars */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="p-7 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-4">
            <div className="w-10 h-10 rounded-xl bg-neutral-800 flex items-center justify-center text-white font-mono font-bold text-xs">
              01
            </div>
            <h3 className="text-lg font-serif font-semibold text-white">
              Calotă Joasă Nestructurată (Dad Hat)
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Spre deosebire de șepcile rigide de baseball cu frontal întărit cu burete, șapca Polo ia forma naturală a capului încă de la prima purtare, oferind acea lejeritate discretă și atemporală.
            </p>
          </div>

          <div className="p-7 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-4">
            <div className="w-10 h-10 rounded-xl bg-neutral-800 flex items-center justify-center text-white font-mono font-bold text-xs">
              02
            </div>
            <h3 className="text-lg font-serif font-semibold text-white">
              Bumbac Washed Chino & Velur Reiat
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Tratament de spălare enzimatică sau minerală cu piatră ponce. Nuanțele nu sunt plate, ci capătă reflexe subtile de grafit, indigo spălat sau chalk ivoriu care arată spectaculos în lumina naturală.
            </p>
          </div>

          <div className="p-7 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-4">
            <div className="w-10 h-10 rounded-xl bg-neutral-800 flex items-center justify-center text-white font-mono font-bold text-xs">
              03
            </div>
            <h3 className="text-lg font-serif font-semibold text-white">
              Sistem de Închidere din Alamă Masivă
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Fără prinderi din plastic casant de tip snapback. Șepcile noastre vin echipate exclusiv cu bentiță reglabilă din bumbac sau piele naturală și cataramă gravată din alamă antichizată cu canal ascuns.
            </p>
          </div>

        </div>

        {/* Streetwear Quote */}
        <div className="mt-14 p-8 rounded-2xl bg-neutral-950 border border-neutral-800 flex flex-col md:flex-row items-center gap-6">
          <div className="shrink-0 p-3 bg-neutral-900 rounded-xl text-neutral-300">
            <Quote className="w-6 h-6" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <p className="text-base sm:text-lg font-serif italic text-neutral-300 leading-relaxed">
              „O șapcă Polo clasică washed, asortată cu un hanorac greu supradimensionat și pantaloni cargo, este definiția minimalismului de lux contemporan.”
            </p>
            <p className="text-xs text-neutral-400 mt-2 font-mono">
              — Ghid Streetwear Contemporan & Co colecții Caps 2026
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
