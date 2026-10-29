import React, { useState, useEffect } from 'react';
import { 
  X, 
  Heart, 
  ShoppingBag, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Check, 
  AlertCircle, 
  Sparkles, 
  Share2,
  Box,
  Layers,
  ArrowRight
} from 'lucide-react';
import { Product } from '../types/resellix';

interface ProductDetailModalProps {
  product: Product | null;
  allProducts: Product[];
  isWishlisted: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, size: string, quantity: number) => void;
  onToggleWishlist: (product: Product) => void;
  onDirectCheckout: (product: Product, size: string, quantity: number) => void;
  onSelectRelatedProduct: (product: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  allProducts,
  isWishlisted,
  onClose,
  onAddToCart,
  onToggleWishlist,
  onDirectCheckout,
  onSelectRelatedProduct
}) => {
  if (!product) return null;

  // Selected size state - pick first available size with stock > 0 by default
  const [selectedSize, setSelectedSize] = useState<string>(() => {
    const firstInStock = product.sizes.find(s => s.stock > 0);
    return firstInStock ? firstInStock.size : (product.sizes[0]?.size || '');
  });

  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'authenticity' | 'shipping'>('details');
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  // Update selected size when product changes
  useEffect(() => {
    if (product) {
      const firstInStock = product.sizes.find(s => s.stock > 0);
      setSelectedSize(firstInStock ? firstInStock.size : (product.sizes[0]?.size || ''));
      setQuantity(1);
      setActiveImageIndex(0);
    }
  }, [product]);

  // Current selected size stock object
  const currentSizeObj = product.sizes.find(s => s.size === selectedSize);
  const isSelectedSizeAvailable = currentSizeObj ? currentSizeObj.stock > 0 : false;
  const currentStock = currentSizeObj ? currentSizeObj.stock : 0;

  const discountPercent = product.originalPriceRon && product.originalPriceRon > product.priceRon
    ? Math.round(((product.originalPriceRon - product.priceRon) / product.originalPriceRon) * 100)
    : 0;

  // Related products from same brand or category
  const related = allProducts
    .filter(p => p.id !== product.id && (p.brand === product.brand || p.category === product.category))
    .slice(0, 3);

  const handleAdd = () => {
    if (!selectedSize) {
      setFeedbackMsg('Te rugăm să selectezi o mărime');
      return;
    }
    if (!isSelectedSizeAvailable) {
      setFeedbackMsg('Această mărime este epuizată');
      return;
    }
    onAddToCart(product, selectedSize, quantity);
    setFeedbackMsg('Adăugat în coș cu succes!');
    setTimeout(() => setFeedbackMsg(null), 2500);
  };

  const handleBuyNow = () => {
    if (!selectedSize || !isSelectedSizeAvailable) {
      setFeedbackMsg('Selectează o mărime disponibilă pentru cumpărare');
      return;
    }
    onDirectCheckout(product, selectedSize, quantity);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      
      {/* Click outside backdrop */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Card */}
      <div className="relative bg-neutral-900 border border-neutral-700 rounded-2xl max-w-4xl w-full max-h-[92vh] overflow-y-auto text-white shadow-2xl z-10 flex flex-col md:flex-row">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 text-neutral-400 hover:text-white bg-black/60 rounded-full hover:bg-black/90 transition-colors"
          aria-label="Închide"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Side: Images & Gallery */}
        <div className="md:w-1/2 bg-neutral-950 p-6 sm:p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-neutral-800">
          <div>
            {/* Main Showcase Image */}
            <div className="relative aspect-square rounded-xl overflow-hidden bg-neutral-900 border border-neutral-800">
              <img
                src={product.images[activeImageIndex] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover"
              />

              {product.tag && (
                <span className="absolute top-3 left-3 bg-white text-black text-[11px] font-mono font-bold uppercase px-2.5 py-1 rounded">
                  {product.tag}
                </span>
              )}

              {product.isDemonstrative && (
                <span className="absolute bottom-3 left-3 bg-black/80 text-neutral-400 text-[10px] font-mono px-2 py-0.5 rounded border border-neutral-700">
                  Model Demonstrativ Demo
                </span>
              )}
            </div>

            {/* Gallery Thumbnails if multiple images */}
            {product.images.length > 1 && (
              <div className="mt-4 flex items-center gap-2 overflow-x-auto pb-1">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-16 h-16 rounded-lg overflow-hidden border-2 shrink-0 transition-all ${
                      activeImageIndex === idx ? 'border-white scale-105' : 'border-neutral-800 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Quick Confidence Strip */}
          <div className="mt-6 pt-6 border-t border-neutral-850 space-y-2 text-xs text-neutral-400 font-mono">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Verificare fizică înainte de expediere</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-white shrink-0" />
              <span>Fan Courier 24-48h · Sameday Easybox</span>
            </div>
            <div className="flex items-center gap-2">
              <RotateCcw className="w-4 h-4 text-white shrink-0" />
              <span>Retur 30 zile · Schimb facil de mărime</span>
            </div>
          </div>
        </div>

        {/* Right Side: Information & Size Selection */}
        <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between">
          
          <div className="space-y-5">
            {/* Kicker & SKU */}
            <div className="flex items-center justify-between text-xs font-mono uppercase text-neutral-400">
              <span className="text-emerald-400 font-bold">{product.brand}</span>
              <span>SKU: {product.sku}</span>
            </div>

            {/* Title */}
            <h1 className="text-xl sm:text-2xl font-bold font-mono tracking-tight text-white leading-tight">
              {product.name}
            </h1>

            {/* Price block */}
            <div className="flex items-baseline gap-3">
              <span className="text-2xl sm:text-3xl font-black font-mono text-white">
                {product.priceRon.toLocaleString('ro-RO')} RON
              </span>
              {product.originalPriceRon && product.originalPriceRon > product.priceRon && (
                <>
                  <span className="text-sm font-mono text-neutral-500 line-through">
                    {product.originalPriceRon.toLocaleString('ro-RO')} RON
                  </span>
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-red-600 text-white">
                    -{discountPercent}%
                  </span>
                </>
              )}
            </div>

            {/* Condition & Status */}
            <div className="flex flex-wrap gap-2 text-xs font-mono">
              <span className="px-2.5 py-1 rounded bg-neutral-800 text-neutral-300 border border-neutral-700">
                Condiție: {product.condition}
              </span>
              <span className={`px-2.5 py-1 rounded border ${
                product.status === 'disponibil'
                  ? 'bg-emerald-950/60 text-emerald-300 border-emerald-800'
                  : 'bg-red-950/60 text-red-300 border-red-800'
              }`}>
                Status: {product.status === 'disponibil' ? 'În Stoc Depozit' : 'Epuizat'}
              </span>
            </div>

            {/* SIZE SELECTOR - Crucial Functionality */}
            <div className="pt-2">
              <div className="flex items-center justify-between mb-2.5">
                <label className="text-xs font-mono uppercase tracking-wider text-neutral-300 font-semibold flex items-center gap-1.5">
                  <span>Selectează Mărimea:</span>
                  <span className="text-white font-bold">{selectedSize}</span>
                </label>
                
                {currentSizeObj && (
                  <span className={`text-xs font-mono font-medium ${
                    currentStock > 0 ? 'text-emerald-400' : 'text-red-400'
                  }`}>
                    {currentStock > 0 ? `În stoc: ${currentStock} buc.` : 'Mărime epuizată'}
                  </span>
                )}
              </div>

              {/* Size buttons grid */}
              <div className="grid grid-cols-4 gap-2">
                {product.sizes.map((s) => {
                  const isSelected = selectedSize === s.size;
                  const isAvailable = s.stock > 0;

                  return (
                    <button
                      key={s.size}
                      type="button"
                      onClick={() => {
                        setSelectedSize(s.size);
                        setQuantity(1);
                      }}
                      className={`py-2.5 px-2 rounded-lg text-xs font-mono font-medium border text-center transition-all ${
                        isSelected
                          ? 'border-white bg-white text-black font-bold shadow-md'
                          : isAvailable
                          ? 'border-neutral-700 bg-neutral-800/80 text-white hover:border-neutral-500'
                          : 'border-neutral-850 bg-neutral-950 text-neutral-600 line-through cursor-not-allowed opacity-60'
                      }`}
                    >
                      <div>{s.size}</div>
                      <div className="text-[10px] opacity-75 font-normal">
                        {isAvailable ? `${s.stock} buc` : '0 stoc'}
                      </div>
                    </button>
                  );
                })}
              </div>

              {!isSelectedSizeAvailable && (
                <div className="mt-2 text-xs text-amber-400 flex items-center gap-1.5 font-mono">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>Această mărime nu este momentan în stoc. Selectează altă mărime.</span>
                </div>
              )}
            </div>

            {/* Quantity Selector */}
            {isSelectedSizeAvailable && (
              <div className="flex items-center gap-4 pt-1">
                <span className="text-xs font-mono text-neutral-400 uppercase">Cantitate:</span>
                <div className="flex items-center border border-neutral-700 rounded-lg overflow-hidden bg-neutral-800">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1.5 text-neutral-300 hover:text-white hover:bg-neutral-700 font-mono transition-colors"
                  >
                    -
                  </button>
                  <span className="px-4 py-1.5 text-sm font-mono font-bold text-white">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(currentStock, quantity + 1))}
                    disabled={quantity >= currentStock}
                    className="px-3 py-1.5 text-neutral-300 hover:text-white hover:bg-neutral-700 font-mono transition-colors disabled:opacity-40"
                  >
                    +
                  </button>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-2.5 pt-3">
              <div className="flex items-center gap-3">
                <button
                  onClick={handleAdd}
                  disabled={!isSelectedSizeAvailable}
                  className={`flex-1 py-3.5 px-4 rounded-lg font-mono text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                    isSelectedSizeAvailable
                      ? 'bg-white text-black hover:bg-neutral-200 active:scale-98 shadow-md'
                      : 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
                  }`}
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Adaugă în Coș</span>
                </button>

                <button
                  onClick={() => onToggleWishlist(product)}
                  className={`p-3.5 rounded-lg border transition-colors ${
                    isWishlisted
                      ? 'border-red-600 bg-red-600/20 text-red-400'
                      : 'border-neutral-700 bg-neutral-800 text-neutral-300 hover:text-white'
                  }`}
                  title={isWishlisted ? 'Șterge din favorite' : 'Adaugă la favorite'}
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current text-red-500' : ''}`} />
                </button>
              </div>

              <button
                onClick={handleBuyNow}
                disabled={!isSelectedSizeAvailable}
                className="w-full py-3 px-4 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white border border-neutral-600 font-mono text-xs font-semibold uppercase tracking-wider transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cumpără Acum (Direct Checkout)
              </button>

              {feedbackMsg && (
                <div className="text-center text-xs font-mono text-emerald-400 py-1 animate-in fade-in">
                  {feedbackMsg}
                </div>
              )}
            </div>

            {/* Info Tabs */}
            <div className="pt-4 border-t border-neutral-800">
              <div className="flex border-b border-neutral-800 text-xs font-mono">
                <button
                  onClick={() => setActiveTab('details')}
                  className={`pb-2 px-3 border-b-2 font-medium transition-colors ${
                    activeTab === 'details' ? 'border-white text-white' : 'border-transparent text-neutral-500 hover:text-neutral-300'
                  }`}
                >
                  Descriere & Materiale
                </button>
                <button
                  onClick={() => setActiveTab('authenticity')}
                  className={`pb-2 px-3 border-b-2 font-medium transition-colors ${
                    activeTab === 'authenticity' ? 'border-white text-white' : 'border-transparent text-neutral-500 hover:text-neutral-300'
                  }`}
                >
                  Autentificare
                </button>
                <button
                  onClick={() => setActiveTab('shipping')}
                  className={`pb-2 px-3 border-b-2 font-medium transition-colors ${
                    activeTab === 'shipping' ? 'border-white text-white' : 'border-transparent text-neutral-500 hover:text-neutral-300'
                  }`}
                >
                  Livrare & Retur
                </button>
              </div>

              <div className="pt-3 text-xs text-neutral-400 leading-relaxed min-h-[90px]">
                {activeTab === 'details' && (
                  <div className="space-y-2">
                    <p>{product.description}</p>
                    <div className="pt-1">
                      <span className="text-neutral-300 font-mono font-semibold block mb-1">Materiale:</span>
                      <ul className="list-disc list-inside space-y-0.5 text-neutral-400">
                        {product.materials.map((m, i) => (
                          <li key={i}>{m}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {activeTab === 'authenticity' && (
                  <div className="space-y-2">
                    <p>
                      Fiecare produs listat pe ReSellix trece prin protocolul nostru de verificare în 8 pași:
                    </p>
                    <ul className="space-y-1 text-neutral-300 font-mono text-[11px]">
                      <li>✓ Verificare font și cod de bare cutie originală</li>
                      <li>✓ Inspectare cusături la lumină UV</li>
                      <li>✓ Testare miros de adeziv și greutate la gram</li>
                      <li>✓ Scanare cod QR intern și etichetă de fabricație</li>
                    </ul>
                  </div>
                )}

                {activeTab === 'shipping' && (
                  <div className="space-y-2">
                    <p>
                      <strong className="text-white">Fan Courier Livrare la Ușă:</strong> 22 RON (Gratuit peste 350 RON). Livrare estimată în 24-48 ore.
                    </p>
                    <p>
                      <strong className="text-white">Sameday Easybox:</strong> 16 RON (Gratuit peste 350 RON). Disponibil 24/7 la locker-ul ales.
                    </p>
                    <p>
                      <strong className="text-white">Retur:</strong> 30 de zile calendaristice pentru schimb de mărime sau rambursare integrală.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Related products */}
            {related.length > 0 && (
              <div className="pt-4 border-t border-neutral-800">
                <span className="text-xs font-mono uppercase text-neutral-400 block mb-3 font-semibold">
                  Alte modele similare:
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {related.map(rel => (
                    <button
                      key={rel.id}
                      onClick={() => onSelectRelatedProduct(rel)}
                      className="p-2 bg-neutral-950 border border-neutral-800 rounded-lg text-left hover:border-neutral-600 transition-all group"
                    >
                      <img src={rel.images[0]} alt="" className="aspect-square object-cover rounded bg-neutral-900 mb-1.5" />
                      <div className="text-[11px] font-mono text-white font-semibold truncate group-hover:text-emerald-400">
                        {rel.name}
                      </div>
                      <div className="text-[10px] font-mono text-neutral-400">
                        {rel.priceRon} RON
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};
