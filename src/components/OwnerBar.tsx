import React from 'react';
import { Sparkles, Plus, Eye, ShieldCheck, TrendingUp, Package, Box, Layers, UserCheck } from 'lucide-react';
import { Product, Order, Currency } from '../types/ecommerce';

interface OwnerBarProps {
  isOwnerMode: boolean;
  onToggleOwnerMode: () => void;
  onOpenAiPhotoLab: () => void;
  onOpenAddProduct: () => void;
  productsCount: number;
  userOrders: Order[];
  currency: Currency;
}

export const OwnerBar: React.FC<OwnerBarProps> = ({
  isOwnerMode,
  onToggleOwnerMode,
  onOpenAiPhotoLab,
  onOpenAddProduct,
  productsCount,
  userOrders,
  currency,
}) => {
  if (!isOwnerMode) {
    return (
      <div className="fixed bottom-4 left-4 z-40">
        <button
          onClick={onToggleOwnerMode}
          className="px-3.5 py-2 rounded-xl bg-neutral-900/95 text-white border border-neutral-700 shadow-xl text-xs font-mono flex items-center gap-2 hover:bg-neutral-800 transition-all hover:scale-105 backdrop-blur-md"
          title="Deschide panoul de proprietar pentru încărcat produse fizice cu AI"
        >
          <UserCheck className="w-4 h-4 text-emerald-400" />
          <span className="font-bold">Panou Owner</span>
        </button>
      </div>
    );
  }

  const totalSales = userOrders.reduce((acc, o) => acc + o.total, 0);

  return (
    <aside aria-label="Panou de Administrare Proprietar" className="bg-neutral-950 border-b border-neutral-800 text-white py-3 px-4 sm:px-6 relative z-40 shadow-lg">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
        
        {/* Owner status and metrics */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-6">
          <div className="flex items-center gap-2 font-mono">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <strong className="text-white uppercase tracking-wider">Panou Owner Activ</strong>
          </div>

          <div className="flex items-center gap-4 text-neutral-400 font-mono">
            <div className="flex items-center gap-1.5">
              <Package className="w-3.5 h-3.5 text-neutral-400" />
              <span>Stoc: <strong className="text-white">{productsCount} produse</strong></span>
            </div>
            <div className="flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
              <span>Comenzi: <strong className="text-white">{userOrders.length}</strong></span>
            </div>
          </div>
        </div>

        {/* Owner Action Buttons */}
        <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
          {/* Main AI Photo Lab Button */}
          <button
            onClick={onOpenAiPhotoLab}
            className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-amber-500 hover:from-emerald-400 hover:to-amber-400 text-neutral-950 font-bold rounded-xl shadow-md transition-all flex items-center gap-1.5 hover:scale-105"
          >
            <Sparkles className="w-4 h-4" />
            <span>AI Photo Lab (Poză Fizică ➔ Studio 8K)</span>
          </button>

          <button
            onClick={onOpenAddProduct}
            className="px-3.5 py-2 bg-neutral-800 hover:bg-neutral-700 text-white font-medium rounded-xl border border-neutral-700 transition-colors flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5 text-neutral-300" />
            <span>Adăugare Rapidă</span>
          </button>

          <button
            onClick={onToggleOwnerMode}
            className="px-3 py-2 text-neutral-400 hover:text-white rounded-xl hover:bg-neutral-900 border border-neutral-800 transition-colors"
            title="Ascunde panoul de owner pentru a previzualiza magazinul ca un client"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </aside>
  );
};
