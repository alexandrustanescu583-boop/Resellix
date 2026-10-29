import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  ShoppingBag, 
  ArrowRight, 
  Truck, 
  ShieldCheck, 
  Tag, 
  Info,
  Check
} from 'lucide-react';
import { CartItem } from '../types/resellix';

interface CartDrawerProps {
  isOpen: boolean;
  cart: CartItem[];
  onClose: () => void;
  onUpdateQuantity: (productId: string, size: string, quantity: number) => void;
  onRemoveItem: (productId: string, size: string) => void;
  onProceedToCheckout: () => void;
  couponCode: string;
  appliedDiscountPercent: number;
  onApplyCoupon: (code: string) => boolean;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  cart,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  couponCode,
  appliedDiscountPercent,
  onApplyCoupon
}) => {
  if (!isOpen) return null;

  const [inputCoupon, setInputCoupon] = useState('');
  const [couponError, setCouponError] = useState<string | null>(null);

  // Subtotal in RON
  const subtotal = cart.reduce((sum, item) => sum + (item.product.priceRon * item.quantity), 0);
  
  // Free delivery threshold: 350 RON
  const FREE_SHIPPING_THRESHOLD = 350;
  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0;
  const defaultShippingCost = isFreeShipping ? 0 : 22;

  // Discount calculation
  const discountAmount = appliedDiscountPercent > 0 
    ? Math.round((subtotal * appliedDiscountPercent) / 100) 
    : 0;

  const total = Math.max(0, subtotal - discountAmount + defaultShippingCost);

  const handleCouponSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCoupon.trim()) return;
    const ok = onApplyCoupon(inputCoupon.trim().toUpperCase());
    if (!ok) {
      setCouponError('Cod invalid. Încearcă RESELLIX10');
    } else {
      setCouponError(null);
      setInputCoupon('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Container */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-neutral-900 border-l border-neutral-800 text-white flex flex-col justify-between shadow-2xl">
          
          {/* Header */}
          <div className="p-6 border-b border-neutral-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-white" />
              <h2 className="text-lg font-mono font-bold tracking-tight uppercase">
                Coșul Tău ({cart.reduce((a, b) => a + b.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
              aria-label="Închide coș"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Test Mode Reassurance Alert */}
          <div className="bg-neutral-950 px-6 py-2.5 border-b border-neutral-800 flex items-center gap-2 text-xs text-neutral-400 font-mono">
            <Info className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Mediu de testare activ · <strong>0 LEI retrași de pe card</strong></span>
          </div>

          {/* Free shipping progress bar */}
          <div className="bg-neutral-850 px-6 py-3 border-b border-neutral-800">
            {isFreeShipping ? (
              <div className="flex items-center gap-2 text-xs text-emerald-400 font-mono font-medium">
                <Truck className="w-4 h-4" />
                <span>Felicitări! Te califici pentru Livrare Gratuită</span>
              </div>
            ) : (
              <div className="space-y-1.5 text-xs font-mono">
                <div className="flex justify-between text-neutral-400">
                  <span>Mai adaugă <strong>{(FREE_SHIPPING_THRESHOLD - subtotal).toLocaleString('ro-RO')} RON</strong> pt livrare gratuită</span>
                  <span>{Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100)}%</span>
                </div>
                <div className="w-full bg-neutral-800 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-white h-full transition-all duration-300"
                    style={{ width: `${Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100)}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <div className="w-16 h-16 rounded-full bg-neutral-800 flex items-center justify-center mx-auto text-neutral-500">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <p className="text-neutral-400 font-mono text-sm">Coșul tău este gol momentan.</p>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 bg-white text-black font-mono text-xs uppercase font-bold rounded-lg hover:bg-neutral-200 transition-colors"
                >
                  Explorează Sneakers
                </button>
              </div>
            ) : (
              cart.map((item) => {
                const maxStock = item.product.sizes.find(s => s.size === item.selectedSize)?.stock || 10;
                return (
                  <div 
                    key={`${item.product.id}-${item.selectedSize}`}
                    className="flex gap-4 p-3 bg-neutral-950 border border-neutral-800 rounded-xl"
                  >
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-20 h-20 object-cover rounded-lg bg-neutral-900 border border-neutral-800 shrink-0"
                    />

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-1">
                          <h4 className="text-xs font-mono font-bold text-white line-clamp-1">
                            {item.product.name}
                          </h4>
                          <button
                            onClick={() => onRemoveItem(item.product.id, item.selectedSize)}
                            className="text-neutral-500 hover:text-red-400 p-1"
                            title="Șterge"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="flex items-center gap-2 mt-1 text-[11px] font-mono text-neutral-400">
                          <span className="px-1.5 py-0.5 bg-neutral-800 rounded border border-neutral-700 text-white font-semibold">
                            Mărime: {item.selectedSize}
                          </span>
                          <span>{item.product.brand}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-neutral-850">
                        {/* Quantity Counter */}
                        <div className="flex items-center border border-neutral-800 rounded bg-neutral-900">
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, item.selectedSize, item.quantity - 1)}
                            className="px-2 py-0.5 text-neutral-400 hover:text-white font-mono text-xs"
                          >
                            -
                          </button>
                          <span className="px-2 py-0.5 text-xs font-mono font-bold text-white">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, item.selectedSize, item.quantity + 1)}
                            disabled={item.quantity >= maxStock}
                            className="px-2 py-0.5 text-neutral-400 hover:text-white font-mono text-xs disabled:opacity-30"
                          >
                            +
                          </button>
                        </div>

                        {/* Price */}
                        <span className="text-sm font-mono font-bold text-white">
                          {(item.product.priceRon * item.quantity).toLocaleString('ro-RO')} RON
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer & Checkout Area */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-neutral-800 bg-neutral-950 space-y-4">
              
              {/* Coupon Code Input */}
              <form onSubmit={handleCouponSubmit} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Cod cupon (ex: RESELLIX10)"
                  value={inputCoupon}
                  onChange={(e) => setInputCoupon(e.target.value)}
                  className="flex-1 bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-xs font-mono text-white placeholder-neutral-500 uppercase focus:outline-none focus:border-neutral-600"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white font-mono text-xs rounded-lg transition-colors"
                >
                  Aplică
                </button>
              </form>
              {couponError && (
                <div className="text-[11px] font-mono text-red-400">{couponError}</div>
              )}
              {appliedDiscountPercent > 0 && (
                <div className="flex items-center justify-between text-xs font-mono text-emerald-400">
                  <span className="flex items-center gap-1">
                    <Tag className="w-3.5 h-3.5" />
                    <span>Cupon activ ({appliedDiscountPercent}% reducere)</span>
                  </span>
                  <span>-{discountAmount} RON</span>
                </div>
              )}

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs font-mono text-neutral-400 pt-2 border-t border-neutral-850">
                <div className="flex justify-between">
                  <span>Subtotal produse:</span>
                  <span className="text-white font-bold">{subtotal.toLocaleString('ro-RO')} RON</span>
                </div>

                <div className="flex justify-between">
                  <span>Livrare estimată:</span>
                  <span className={defaultShippingCost === 0 ? 'text-emerald-400 font-bold' : 'text-white'}>
                    {defaultShippingCost === 0 ? 'GRATUIT' : `${defaultShippingCost} RON`}
                  </span>
                </div>

                <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-neutral-800">
                  <span>Total Final:</span>
                  <span className="font-mono text-lg">{total.toLocaleString('ro-RO')} RON</span>
                </div>
              </div>

              {/* Checkout Trigger */}
              <button
                onClick={() => {
                  onClose();
                  onProceedToCheckout();
                }}
                className="w-full py-4 bg-white hover:bg-neutral-200 text-black font-mono font-bold text-sm uppercase tracking-wider rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg active:scale-98"
              >
                <span>Finalizează Comanda</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-neutral-500 font-mono text-center">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Checkout criptat SSL · 0 LEI retrași în modul de testare</span>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
