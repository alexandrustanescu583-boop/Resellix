import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { Product } from '../types/resellix';

interface SearchModalProps {
  isOpen: boolean;
  products: Product[];
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  products,
  onClose,
  onSelectProduct,
}) => {
  if (!isOpen) return null;

  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const filtered = products.filter((p) => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return (
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.model.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.sku.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
    );
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-start justify-center p-4 sm:pt-20">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative bg-neutral-900 rounded-2xl max-w-2xl w-full shadow-2xl border border-neutral-700 z-10 overflow-hidden text-white font-mono">
        
        {/* Search Input bar */}
        <div className="p-4 sm:p-5 border-b border-neutral-800 flex items-center gap-3 bg-neutral-950">
          <Search className="w-5 h-5 text-neutral-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Caută după sneaker, brand (Nike, Adidas, New Balance...), model sau SKU..."
            className="w-full bg-transparent text-sm sm:text-base text-white placeholder-neutral-500 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-neutral-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2.5 py-1 text-xs bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded transition-colors"
          >
            ESC
          </button>
        </div>

        {/* Quick Brands Tags */}
        <div className="px-5 py-2.5 bg-neutral-900 border-b border-neutral-800 flex items-center gap-2 overflow-x-auto text-[11px] text-neutral-400">
          <span className="text-neutral-500">Sugestii:</span>
          {['Nike', 'Dunk', 'New Balance 550', 'Asics Gel', 'Yeezy', 'Essentials', 'Polo'].map(term => (
            <button
              key={term}
              onClick={() => setQuery(term)}
              className="px-2 py-0.5 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition-colors whitespace-nowrap"
            >
              {term}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto divide-y divide-neutral-850 p-2">
          {filtered.length === 0 ? (
            <div className="p-8 text-center text-neutral-400 text-xs">
              Nu am găsit niciun produs care să corespundă căutării "{query}".
            </div>
          ) : (
            filtered.map((product) => (
              <div
                key={product.id}
                onClick={() => {
                  onSelectProduct(product);
                  onClose();
                }}
                className="p-3 hover:bg-neutral-800/60 rounded-xl flex items-center justify-between gap-4 cursor-pointer transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-14 h-14 object-cover rounded-lg bg-neutral-950 border border-neutral-850 shrink-0"
                  />
                  <div>
                    <div className="flex items-center gap-2 text-[10px] text-neutral-400">
                      <span className="text-emerald-400 font-bold uppercase">{product.brand}</span>
                      <span>·</span>
                      <span>{product.category}</span>
                      <span>·</span>
                      <span>SKU: {product.sku}</span>
                    </div>
                    <div className="text-xs font-bold text-white group-hover:text-neutral-200 transition-colors">
                      {product.name}
                    </div>
                    <div className="text-[11px] text-neutral-400 mt-0.5">
                      {product.priceRon.toLocaleString('ro-RO')} RON
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-neutral-500 group-hover:text-white transition-colors pr-2">
                  <span className="text-xs hidden sm:inline">Vezi</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};
