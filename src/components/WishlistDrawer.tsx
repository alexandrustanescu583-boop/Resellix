import React from 'react';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { Product } from '../types/resellix';

interface WishlistDrawerProps {
  isOpen: boolean;
  wishlist: Product[];
  onClose: () => void;
  onRemoveFromWishlist: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  wishlist,
  onClose,
  onRemoveFromWishlist,
  onSelectProduct,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-neutral-900 shadow-2xl flex flex-col justify-between border-l border-neutral-800 text-white font-mono">
          
          {/* Header */}
          <div className="p-5 border-b border-neutral-800 flex items-center justify-between bg-neutral-950">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-500 fill-red-500" />
              <h2 className="text-sm font-bold uppercase tracking-wide">
                Produse Favorite ({wishlist.length})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto p-5 space-y-3">
            {wishlist.length === 0 ? (
              <div className="py-24 text-center text-neutral-500 space-y-3">
                <Heart className="w-12 h-12 stroke-1 mx-auto text-neutral-700" />
                <p className="text-xs">Nu ai adăugat încă niciun produs la favorite.</p>
                <button
                  onClick={onClose}
                  className="px-5 py-2 bg-white text-black font-bold text-xs uppercase rounded-lg hover:bg-neutral-200"
                >
                  Explorează Colecția
                </button>
              </div>
            ) : (
              wishlist.map((product) => (
                <div
                  key={product.id}
                  className="p-3 bg-neutral-950 border border-neutral-800 rounded-xl flex items-center justify-between gap-3"
                >
                  <div 
                    onClick={() => {
                      onSelectProduct(product);
                      onClose();
                    }}
                    className="flex items-center gap-3 cursor-pointer group flex-1"
                  >
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-14 h-14 object-cover rounded-lg bg-neutral-900 border border-neutral-800 shrink-0"
                    />
                    <div className="truncate">
                      <span className="text-[10px] text-neutral-500 uppercase block font-bold">{product.brand}</span>
                      <h4 className="text-xs font-bold text-white group-hover:text-neutral-300 truncate">
                        {product.name}
                      </h4>
                      <div className="text-xs font-bold text-white mt-1">
                        {product.priceRon.toLocaleString('ro-RO')} RON
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => {
                        onSelectProduct(product);
                        onClose();
                      }}
                      className="p-2 bg-white text-black hover:bg-neutral-200 rounded-lg text-xs"
                      title="Alege mărime & cumpără"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => onRemoveFromWishlist(product)}
                      className="p-2 text-neutral-500 hover:text-red-400 hover:bg-neutral-800 rounded-lg"
                      title="Șterge"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {wishlist.length > 0 && (
            <div className="p-5 border-t border-neutral-800 bg-neutral-950">
              <button
                onClick={onClose}
                className="w-full py-3 bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-xs uppercase rounded-lg transition-colors"
              >
                Continuă Navigarea
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
