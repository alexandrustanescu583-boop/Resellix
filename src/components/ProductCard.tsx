import React from 'react';
import { Heart, ShoppingBag, Eye, ShieldCheck, Check } from 'lucide-react';
import { Product } from '../types/resellix';

interface ProductCardProps {
  product: Product;
  isWishlisted: boolean;
  onSelectProduct: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  onQuickAdd: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isWishlisted,
  onSelectProduct,
  onToggleWishlist,
  onQuickAdd
}) => {
  const isOutOfStock = product.status === 'epuizat' || product.sizes.every(s => s.stock <= 0);

  // Compute available sizes count
  const availableSizes = product.sizes.filter(s => s.stock > 0);

  // Discount percentage if available
  const discountPercent = product.originalPriceRon && product.originalPriceRon > product.priceRon
    ? Math.round(((product.originalPriceRon - product.priceRon) / product.originalPriceRon) * 100)
    : 0;

  return (
    <div className="group relative bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden hover:border-neutral-600 transition-all duration-300 flex flex-col justify-between">
      
      {/* Top Media Area */}
      <div className="relative aspect-square w-full bg-neutral-950 overflow-hidden cursor-pointer" onClick={() => onSelectProduct(product)}>
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Badges Overlay */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.tag && (
            <span className={`text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded tracking-wider shadow-sm ${
              product.tag === 'Nou' ? 'bg-white text-black' :
              product.tag === 'Reducere' ? 'bg-red-600 text-white' :
              'bg-neutral-800 text-neutral-200 border border-neutral-700'
            }`}>
              {product.tag}
            </span>
          )}

          {discountPercent > 0 && (
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-red-600 text-white tracking-wider">
              -{discountPercent}%
            </span>
          )}

          {product.condition && (
            <span className="text-[9px] font-mono font-medium px-2 py-0.5 rounded bg-black/80 text-neutral-300 border border-neutral-800 backdrop-blur-xs">
              Deadstock
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-colors z-10 ${
            isWishlisted
              ? 'bg-red-600 text-white'
              : 'bg-black/60 text-white hover:bg-black/90'
          }`}
          aria-label={isWishlisted ? "Șterge de la favorite" : "Adaugă la favorite"}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Out of Stock Overlay */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-black/75 backdrop-blur-[2px] flex items-center justify-center p-4">
            <span className="px-3 py-1 bg-red-950 border border-red-800 text-red-200 text-xs font-mono font-bold uppercase tracking-wider rounded">
              Stoc Epuizat
            </span>
          </div>
        )}
      </div>

      {/* Product Details Area */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-3">
        
        <div>
          {/* Brand Kicker & Condition */}
          <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-1">
            <span className="text-white font-bold">{product.brand}</span>
            <span className="text-neutral-500 truncate max-w-[140px] text-right">
              {product.category}
            </span>
          </div>

          {/* Product Name */}
          <h3 
            onClick={() => onSelectProduct(product)}
            className="text-sm font-semibold text-white group-hover:text-neutral-200 transition-colors line-clamp-2 cursor-pointer leading-snug"
            title={product.name}
          >
            {product.name}
          </h3>

          {/* Available Sizes Pills Preview */}
          <div className="mt-2.5 flex items-center gap-1.5 flex-wrap">
            <span className="text-[10px] font-mono text-neutral-500 uppercase mr-1">
              Mărimi:
            </span>
            {product.sizes.slice(0, 4).map((s) => (
              <span
                key={s.size}
                className={`text-[10px] font-mono px-1.5 py-0.5 rounded border ${
                  s.stock > 0
                    ? 'border-neutral-700 bg-neutral-800 text-neutral-300'
                    : 'border-neutral-850 bg-neutral-950 text-neutral-600 line-through'
                }`}
              >
                {s.size.replace('EU ', '')}
              </span>
            ))}
            {product.sizes.length > 4 && (
              <span className="text-[10px] font-mono text-neutral-500">
                +{product.sizes.length - 4}
              </span>
            )}
          </div>
        </div>

        {/* Price & Action */}
        <div className="pt-3 border-t border-neutral-800/80 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-base font-bold font-mono text-white">
                {product.priceRon.toLocaleString('ro-RO')} RON
              </span>
              {product.originalPriceRon && product.originalPriceRon > product.priceRon && (
                <span className="text-xs font-mono text-neutral-500 line-through">
                  {product.originalPriceRon.toLocaleString('ro-RO')}
                </span>
              )}
            </div>
            <span className="text-[10px] text-neutral-500 font-mono block">
              TVA inclus · Cutie originală
            </span>
          </div>

          <button
            onClick={() => onSelectProduct(product)}
            disabled={isOutOfStock}
            className={`px-3 py-1.5 rounded text-xs font-mono font-medium transition-all flex items-center gap-1.5 ${
              isOutOfStock
                ? 'bg-neutral-800 text-neutral-600 cursor-not-allowed'
                : 'bg-white hover:bg-neutral-200 text-black active:scale-95'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Detalii</span>
          </button>
        </div>

      </div>

    </div>
  );
};
