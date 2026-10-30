import React from 'react';
import { Lock, Mail, Phone, MapPin, Truck, ShieldCheck, Box, RotateCcw } from 'lucide-react';

interface FooterProps {
  onOpenTracking: () => void;
  onSelectCategory: (cat: string) => void;
  onOpenLegal: (topic: 'auth' | 'delivery' | 'return' | 'terms') => void;
}

export const Footer: React.FC<FooterProps> = ({ 
  onOpenTracking, 
  onSelectCategory,
  onOpenLegal 
}) => {
  return (
    <footer className="bg-black border-t border-neutral-800 text-neutral-400 text-xs font-mono">
      
      {/* Top Footer Strip: Accepted Payment Methods */}
      <div className="border-b border-neutral-800 bg-neutral-950 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-white font-medium text-xs">
            <Lock className="w-4 h-4 text-emerald-400" />
            <span>Plăți securizate 3D Secure 2.0 & Livrare cu verificare colet</span>
          </div>

          {/* Payment Badges */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-1 bg-neutral-900 border border-neutral-800 rounded font-bold text-[11px] text-white">
              VISA
            </span>
            <span className="px-2.5 py-1 bg-neutral-900 border border-neutral-800 rounded font-bold text-[11px] text-white">
              Mastercard
            </span>
            <span className="px-2.5 py-1 bg-neutral-900 border border-neutral-800 rounded font-bold text-[11px] text-white font-sans">
               Pay
            </span>
            <span className="px-2.5 py-1 bg-neutral-900 border border-neutral-800 rounded font-bold text-[11px] text-white font-sans">
              G Pay
            </span>
            <span className="px-2.5 py-1 bg-neutral-900 border border-neutral-800 rounded font-bold text-[11px] text-white">
              Revolut Pay
            </span>
            <span className="px-2.5 py-1 bg-neutral-900 border border-neutral-800 rounded font-medium text-[11px] text-white">
              Ramburs Fan Courier
            </span>
            <span className="px-2.5 py-1 bg-emerald-950/80 border border-emerald-800/80 rounded font-medium text-[11px] text-emerald-300">
              🤝 Meet-up Face-to-Face (0 LEI)
            </span>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand Col */}
        <div className="space-y-3">
          <div className="text-xl font-black text-white tracking-tight uppercase">
            ReSellix<span className="text-emerald-400">.</span>
          </div>
          <p className="text-neutral-400 leading-relaxed text-xs">
            Magazin online premium de resell sneakers, încălțăminte sportivă rară și streetwear autentic de la branduri de top precum Nike, Adidas, New Balance, Asics și Puma.
          </p>
          <div className="space-y-1 text-neutral-500 pt-2 text-[11px]">
            <p>RESELLIX SNEAKERS & STREETWEAR S.R.L.</p>
            <p>C.U.I. RO 49201931 · București, România</p>
          </div>
        </div>

        {/* Drops & Categories */}
        <div className="space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-white block">
            Categorii Magazin
          </span>
          <ul className="space-y-2 text-neutral-400 text-xs">
            <li>
              <button 
                onClick={() => onSelectCategory('Sneakers')}
                className="hover:text-white transition-colors"
              >
                Sneakers & Încălțăminte Sport
              </button>
            </li>
            <li>
              <button 
                onClick={() => onSelectCategory('Îmbrăcăminte')}
                className="hover:text-white transition-colors"
              >
                Hanorace & Streetwear Essentials
              </button>
            </li>
            <li>
              <button 
                onClick={() => onSelectCategory('Accesorii')}
                className="hover:text-white transition-colors"
              >
                Șepci Polo Ralph Lauren
              </button>
            </li>
            <li>
              <button 
                onClick={() => onSelectCategory('deals')}
                className="hover:text-white transition-colors text-emerald-400"
              >
                Oferte Speciale & Reduceri
              </button>
            </li>
          </ul>
        </div>

        {/* Client Support */}
        <div className="space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-white block">
            Suport & Garanții
          </span>
          <ul className="space-y-2 text-neutral-400 text-xs">
            <li>
              <button 
                onClick={() => onOpenLegal('auth')}
                className="hover:text-white transition-colors flex items-center gap-1.5"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Garanție Autenticitate 100%</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => onOpenLegal('delivery')}
                className="hover:text-white transition-colors flex items-center gap-1.5"
              >
                <Truck className="w-3.5 h-3.5 text-white" />
                <span>Livrare 24-48h Fan Courier & Easybox</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => onOpenLegal('return')}
                className="hover:text-white transition-colors flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5 text-white" />
                <span>Politică de Retur 30 Zile</span>
              </button>
            </li>
            <li>
              <button 
                onClick={onOpenTracking}
                className="hover:text-white transition-colors"
              >
                Urmărește AWB Colet
              </button>
            </li>
          </ul>
        </div>

        {/* Legal & Sandbox */}
        <div className="space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-white block">
            Informații Legale
          </span>
          <ul className="space-y-2 text-neutral-400 text-xs">
            <li>
              <button 
                onClick={() => onOpenLegal('terms')}
                className="hover:text-white transition-colors"
              >
                Termeni și Condiții
              </button>
            </li>
            <li>
              <button 
                onClick={() => onOpenLegal('terms')}
                className="hover:text-white transition-colors"
              >
                Politică de Confidențialitate (GDPR)
              </button>
            </li>
            <li>
              <span className="text-neutral-500">ANPC: 0800 080 999</span>
            </li>
            <li>
              <span className="text-neutral-500">Soluționarea Litigiilor Online (SOL)</span>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom Copyright */}
      <div className="border-t border-neutral-900 py-6 bg-black text-center text-[11px] text-neutral-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            © {new Date().getFullYear()} ReSellix. Toate drepturile rezervate.
          </div>
          <div className="text-neutral-400 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Mediu Sandbox Activ · 0 LEI retrași</span>
          </div>
        </div>
      </div>

    </footer>
  );
};
