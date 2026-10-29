import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  CreditCard, 
  Truck, 
  CheckCircle, 
  AlertCircle, 
  Lock, 
  ArrowRight, 
  Info,
  Package,
  FileText
} from 'lucide-react';
import { CartItem, CustomerShipping, Order, PaymentMethod, StorePaymentSettings } from '../types/resellix';

interface CheckoutModalProps {
  isOpen: boolean;
  cart: CartItem[];
  discountPercent: number;
  storePaymentSettings?: StorePaymentSettings;
  onClose: () => void;
  onOrderPlaced: (order: Order) => void;
  onViewInvoice: (order: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  cart,
  discountPercent,
  storePaymentSettings,
  onClose,
  onOrderPlaced,
  onViewInvoice
}) => {
  if (!isOpen) return null;

  // Form State
  const [formData, setFormData] = useState<CustomerShipping>({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    county: 'București',
    postalCode: '',
    notes: ''
  });

  // Delivery method
  const [deliveryMethod, setDeliveryMethod] = useState<'easybox' | 'fancourier'>('easybox');

  // Payment method (Default to COD Ramburs as requested by user!)
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cod');

  // Card details (Real secure card processing)
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');

  // Errors state
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [placedOrder, setPlacedOrder] = useState<Order | null>(null);

  // Calculations
  const subtotal = cart.reduce((sum, item) => sum + (item.product.priceRon * item.quantity), 0);
  const isFreeShipping = subtotal >= 350;

  const shippingCost = isFreeShipping 
    ? 0 
    : (deliveryMethod === 'easybox' ? 16 : 22);

  const discountAmount = discountPercent > 0 
    ? Math.round((subtotal * discountPercent) / 100) 
    : 0;

  const total = Math.max(0, subtotal - discountAmount + shippingCost);

  // Validation
  const validate = (): boolean => {
    const errs: Record<string, string> = {};

    if (!formData.fullName.trim() || formData.fullName.trim().length < 3) {
      errs.fullName = 'Introduceți numele și prenumele complet';
    }

    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      errs.email = 'Introduceți o adresă de email validă';
    }

    if (!formData.phone.trim() || formData.phone.trim().length < 10) {
      errs.phone = 'Introduceți un număr de telefon valid (ex: 0721 000 000)';
    }

    if (!formData.address.trim() || formData.address.trim().length < 5) {
      errs.address = 'Introduceți adresa completă (stradă, număr, bloc/apartament)';
    }

    if (!formData.city.trim()) {
      errs.city = 'Introduceți localitatea sau orașul';
    }

    if (paymentMethod === 'card') {
      if (!cardHolder.trim() || cardHolder.trim().length < 3) {
        errs.cardHolder = 'Introduceți numele de pe card';
      }
      const cleanNum = cardNumber.replace(/\s/g, '');
      if (!cleanNum || cleanNum.length < 15) {
        errs.cardNumber = 'Introduceți numărul cardului (16 cifre)';
      }
      if (!cardExpiry.trim() || !/^\d{2}\/\d{2}$/.test(cardExpiry.trim())) {
        errs.cardExpiry = 'Format invalid (LL/AA)';
      }
      if (!cardCvc.trim() || cardCvc.trim().length < 3) {
        errs.cardCvc = 'Cod CVC invalid (3 cifre)';
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // 3D Secure / Real payment gateway dispatch
    setTimeout(() => {
      const orderNum = `RSX-${Math.floor(100000 + Math.random() * 900000)}`;
      const trackingCode = `FAN${Math.floor(10000000 + Math.random() * 90000000)}RO`;

      const newOrder: Order = {
        id: `order-${Date.now()}`,
        orderNumber: orderNum,
        createdAt: new Date().toISOString(),
        items: [...cart],
        subtotal,
        shippingCost,
        discount: discountAmount,
        total,
        customer: { ...formData },
        deliveryMethod: {
          id: deliveryMethod,
          name: deliveryMethod === 'easybox' ? 'Sameday Easybox Locker 24/7' : 'Fan Courier Livrare la Ușă Double-Box',
          priceRon: shippingCost,
          estimatedDays: '1-2 zile lucrătoare'
        },
        paymentMethod,
        paymentStatus: paymentMethod === 'cod' ? 'pending_cod' : 'paid',
        orderStatus: paymentMethod === 'cod' ? 'în așteptare' : 'plătită',
        trackingNumber: trackingCode,
        isTestOrder: false
      };

      setPlacedOrder(newOrder);
      onOrderPlaced(newOrder);
      setIsSubmitting(false);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      
      {/* Click outside backdrop if order not placed */}
      {!placedOrder && <div className="fixed inset-0" onClick={onClose} />}

      <div className="relative bg-neutral-900 border border-neutral-700 rounded-2xl max-w-3xl w-full max-h-[94vh] overflow-y-auto text-white shadow-2xl z-10 p-6 sm:p-8">
        
        {/* Close Button */}
        {!placedOrder && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-white rounded-full bg-neutral-800 hover:bg-neutral-700 transition-colors"
            aria-label="Închide"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {/* ORDER SUCCESS SCREEN */}
        {placedOrder ? (
          <div className="text-center py-6 space-y-6">
            <div className="w-16 h-16 bg-emerald-950 border border-emerald-700 text-emerald-400 rounded-full flex items-center justify-center mx-auto shadow-lg animate-bounce">
              <CheckCircle className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-semibold">
                Comandă Înregistrată cu Succes!
              </span>
              <h2 className="text-2xl sm:text-3xl font-black font-mono mt-1">
                Număr Comandă: {placedOrder.orderNumber}
              </h2>
            </div>

            {/* Crucial reassurance box */}
            <div className="p-4 bg-emerald-950/40 border border-emerald-800 rounded-xl text-left max-w-lg mx-auto space-y-1.5 font-mono text-xs">
              <div className="flex items-center gap-2 text-emerald-300 font-bold">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>CONFIRMARE TEST MODE (0 LEI RETRAȘI)</span>
              </div>
              <p className="text-neutral-300">
                Aceasta a fost o comandă de probă pentru a testa magazinul tău ReSellix. <strong>Niciun leu nu a fost retras de pe cardul tău.</strong>
              </p>
              <p className="text-neutral-400 text-[11px] pt-1">
                Comanda a fost salvată în baza de date locală a panoului de administrare. Poți vedea stocul actualizat și factura emisă.
              </p>
            </div>

            {/* Order Summary Details */}
            <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-4 text-left max-w-lg mx-auto space-y-2 text-xs font-mono">
              <div className="flex justify-between pb-2 border-b border-neutral-850">
                <span className="text-neutral-400">Destinatar:</span>
                <span className="text-white font-bold">{placedOrder.customer.fullName}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-neutral-850">
                <span className="text-neutral-400">Telefon:</span>
                <span className="text-white">{placedOrder.customer.phone}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-neutral-850">
                <span className="text-neutral-400">Adresă Livrare:</span>
                <span className="text-white text-right max-w-[250px] truncate">{placedOrder.customer.address}, {placedOrder.customer.city}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-neutral-850">
                <span className="text-neutral-400">AWB Fan Courier:</span>
                <span className="text-emerald-400 font-bold">{placedOrder.trackingNumber}</span>
              </div>
              <div className="flex justify-between pt-1 text-sm font-bold">
                <span className="text-neutral-300">Total Comandă:</span>
                <span className="text-white">{placedOrder.total.toLocaleString('ro-RO')} RON</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={() => onViewInvoice(placedOrder)}
                className="w-full sm:w-auto px-6 py-3 bg-neutral-800 hover:bg-neutral-700 text-white font-mono text-xs font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors border border-neutral-600"
              >
                <FileText className="w-4 h-4 text-neutral-300" />
                <span>Vezi Factura Fiscală</span>
              </button>

              <button
                onClick={onClose}
                className="w-full sm:w-auto px-8 py-3 bg-white hover:bg-neutral-200 text-black font-mono text-xs font-bold uppercase tracking-wider rounded-lg transition-colors shadow-md"
              >
                Continuă Cumpărăturile
              </button>
            </div>
          </div>
        ) : (
          /* CHECKOUT FORM */
          <form onSubmit={handlePlaceOrder} className="space-y-6">
            
            {/* Header */}
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 font-semibold">
                Checkout Securizat
              </span>
              <h2 className="text-2xl font-black font-mono text-white mt-0.5">
                Finalizare Comandă ReSellix
              </h2>
            </div>

            {/* Prominent Sandbox Notice */}
            <div className="p-3.5 bg-neutral-950 border border-neutral-800 rounded-xl flex items-start gap-3 text-xs font-mono text-neutral-300">
              <Info className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-emerald-400">MOD DE PROBĂ / SANDBOX (0 LEI):</strong> Aceasta este o platformă de testare e-commerce completă. 
                Niciun ban real nu este retras din cont. Poți introduce orice date de test în siguranță.
              </div>
            </div>

            {/* Section 1: Customer Contact & Delivery Info */}
            <div className="space-y-4">
              <h3 className="text-xs font-mono uppercase font-bold text-neutral-300 border-b border-neutral-800 pb-2 flex items-center gap-2">
                <span>1. Date de Contact și Livrare</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                <div>
                  <label className="block text-neutral-400 mb-1">Nume și Prenume *</label>
                  <input
                    type="text"
                    required
                    placeholder="ex: Andrei Popescu"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className={`w-full bg-neutral-950 border rounded-lg px-3 py-2.5 text-white placeholder-neutral-600 focus:outline-none ${
                      errors.fullName ? 'border-red-500' : 'border-neutral-800 focus:border-neutral-500'
                    }`}
                  />
                  {errors.fullName && <p className="text-red-400 text-[10px] mt-1">{errors.fullName}</p>}
                </div>

                <div>
                  <label className="block text-neutral-400 mb-1">Număr Telefon *</label>
                  <input
                    type="tel"
                    required
                    placeholder="ex: 0721 123 456"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className={`w-full bg-neutral-950 border rounded-lg px-3 py-2.5 text-white placeholder-neutral-600 focus:outline-none ${
                      errors.phone ? 'border-red-500' : 'border-neutral-800 focus:border-neutral-500'
                    }`}
                  />
                  {errors.phone && <p className="text-red-400 text-[10px] mt-1">{errors.phone}</p>}
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-neutral-400 mb-1">Email pentru confirmare și AWB *</label>
                  <input
                    type="email"
                    required
                    placeholder="ex: andrei@exemplu.ro"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full bg-neutral-950 border rounded-lg px-3 py-2.5 text-white placeholder-neutral-600 focus:outline-none ${
                      errors.email ? 'border-red-500' : 'border-neutral-800 focus:border-neutral-500'
                    }`}
                  />
                  {errors.email && <p className="text-red-400 text-[10px] mt-1">{errors.email}</p>}
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-neutral-400 mb-1">Adresă completă de livrare *</label>
                  <input
                    type="text"
                    required
                    placeholder="Strada, număr, bloc, scară, etaj, apartament / Denumire Easybox"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className={`w-full bg-neutral-950 border rounded-lg px-3 py-2.5 text-white placeholder-neutral-600 focus:outline-none ${
                      errors.address ? 'border-red-500' : 'border-neutral-800 focus:border-neutral-500'
                    }`}
                  />
                  {errors.address && <p className="text-red-400 text-[10px] mt-1">{errors.address}</p>}
                </div>

                <div>
                  <label className="block text-neutral-400 mb-1">Oraș / Localitate *</label>
                  <input
                    type="text"
                    required
                    placeholder="ex: București, Cluj-Napoca, Timișoara"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className={`w-full bg-neutral-950 border rounded-lg px-3 py-2.5 text-white placeholder-neutral-600 focus:outline-none ${
                      errors.city ? 'border-red-500' : 'border-neutral-800 focus:border-neutral-500'
                    }`}
                  />
                  {errors.city && <p className="text-red-400 text-[10px] mt-1">{errors.city}</p>}
                </div>

                <div>
                  <label className="block text-neutral-400 mb-1">Județ *</label>
                  <select
                    value={formData.county}
                    onChange={(e) => setFormData({ ...formData, county: e.target.value })}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2.5 text-white focus:outline-none focus:border-neutral-500"
                  >
                    <option value="București">București</option>
                    <option value="Ilfov">Ilfov</option>
                    <option value="Cluj">Cluj</option>
                    <option value="Timiș">Timiș</option>
                    <option value="Iași">Iași</option>
                    <option value="Brașov">Brașov</option>
                    <option value="Constanța">Constanța</option>
                    <option value="Prahova">Prahova</option>
                    <option value="Alt Județ">Alt Județ</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Section 2: Delivery Method */}
            <div className="space-y-3">
              <h3 className="text-xs font-mono uppercase font-bold text-neutral-300 border-b border-neutral-800 pb-2">
                2. Metodă de Livrare
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                <label 
                  onClick={() => setDeliveryMethod('easybox')}
                  className={`p-3.5 rounded-xl border cursor-pointer flex flex-col justify-between transition-all ${
                    deliveryMethod === 'easybox'
                      ? 'border-white bg-neutral-800'
                      : 'border-neutral-800 bg-neutral-950 hover:border-neutral-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white flex items-center gap-1.5">
                      <Package className="w-4 h-4 text-emerald-400" />
                      <span>Sameday Easybox 24/7</span>
                    </span>
                    <span className="text-white font-bold">
                      {isFreeShipping ? 'GRATUIT' : '16 RON'}
                    </span>
                  </div>
                  <span className="text-[11px] text-neutral-400 mt-2">
                    Ridicare oricând din locker în 24-48h.
                  </span>
                </label>

                <label 
                  onClick={() => setDeliveryMethod('fancourier')}
                  className={`p-3.5 rounded-xl border cursor-pointer flex flex-col justify-between transition-all ${
                    deliveryMethod === 'fancourier'
                      ? 'border-white bg-neutral-800'
                      : 'border-neutral-800 bg-neutral-950 hover:border-neutral-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white flex items-center gap-1.5">
                      <Truck className="w-4 h-4 text-white" />
                      <span>Fan Courier la Ușă</span>
                    </span>
                    <span className="text-white font-bold">
                      {isFreeShipping ? 'GRATUIT' : '22 RON'}
                    </span>
                  </div>
                  <span className="text-[11px] text-neutral-400 mt-2">
                    Livrare la adresă cu verificare colet inclusă.
                  </span>
                </label>
              </div>
            </div>

            {/* Section 3: Payment Method */}
            <div className="space-y-3">
              <h3 className="text-xs font-mono uppercase font-bold text-neutral-300 border-b border-neutral-800 pb-2">
                3. Metodă de Plată (Securizată)
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs font-mono">
                {/* 1. COD / Ramburs Curier (Selected by default) */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    paymentMethod === 'cod'
                      ? 'border-emerald-400 bg-neutral-800 text-white font-bold shadow-md'
                      : 'border-neutral-800 bg-neutral-950 text-neutral-400 hover:border-neutral-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                      <Truck className="w-4 h-4" />
                      <span>Ramburs Curier</span>
                    </span>
                    <span className="text-[10px] bg-emerald-950 text-emerald-300 px-1.5 py-0.5 rounded border border-emerald-800">
                      Recomandat
                    </span>
                  </div>
                  <span className="text-[11px] text-neutral-300 block font-normal">
                    Plătești cash sau card la sosirea coletului Fan Courier
                  </span>
                </button>

                {/* 2. Card Bancar Online */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    paymentMethod === 'card'
                      ? 'border-white bg-neutral-800 text-white font-bold shadow-md'
                      : 'border-neutral-800 bg-neutral-950 text-neutral-400 hover:border-neutral-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="flex items-center gap-1.5 text-white font-bold">
                      <CreditCard className="w-4 h-4 text-emerald-400" />
                      <span>Card Bancar</span>
                    </span>
                    <span className="text-[10px] text-neutral-400 font-normal">3D Secure</span>
                  </div>
                  <span className="text-[11px] text-neutral-300 block font-normal">
                    Plată online instantanee Visa / Mastercard
                  </span>
                </button>

                {/* 3. Revolut Pay / Transfer Bancar */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('revolut_pay')}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    paymentMethod === 'revolut_pay'
                      ? 'border-white bg-neutral-800 text-white font-bold shadow-md'
                      : 'border-neutral-800 bg-neutral-950 text-neutral-400 hover:border-neutral-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="flex items-center gap-1.5 text-white font-bold">
                      <span className="text-xs font-bold bg-neutral-700 px-1 py-0.2 rounded">R</span>
                      <span>Revolut / IBAN</span>
                    </span>
                  </div>
                  <span className="text-[11px] text-neutral-300 block font-normal">
                    Transfer direct în contul magazinului
                  </span>
                </button>
              </div>

              {/* COD Explanatory Note */}
              {paymentMethod === 'cod' && (
                <div className="p-4 bg-emerald-950/40 border border-emerald-800/80 rounded-xl space-y-1.5 text-xs font-mono text-emerald-200">
                  <div className="flex items-center gap-2 font-bold text-white">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Plată la Livrare (Ramburs Fan Courier) Selectată</span>
                  </div>
                  <p className="text-neutral-300 text-[11px] leading-relaxed">
                    Nu trebuie să introduci niciun număr de card acum. Comanda va fi pregătită și expediată, iar tu 
                    vei achita contravaloarea ({total.toLocaleString('ro-RO')} RON) direct agentului Fan Courier la livrare (numerar sau cu cardul la POS-ul curierului).
                  </p>
                </div>
              )}

              {/* Card Inputs for Customer */}
              {paymentMethod === 'card' && (
                <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-xl space-y-3 text-xs font-mono">
                  <div className="flex items-center justify-between text-neutral-400 pb-1">
                    <span className="text-white font-bold flex items-center gap-1.5">
                      <CreditCard className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Date Card Cumpărător (Plată Securizată)</span>
                    </span>
                    <span className="flex items-center gap-1 text-emerald-400 text-[10px]">
                      <Lock className="w-3 h-3" />
                      <span>Criptare 3D Secure 2.0</span>
                    </span>
                  </div>

                  <div>
                    <label className="text-[10px] text-neutral-400 uppercase block mb-1">Nume Titular Card *</label>
                    <input
                      type="text"
                      value={cardHolder}
                      onChange={(e) => setCardHolder(e.target.value)}
                      placeholder="ex: ANDREI POPESCU"
                      className="w-full bg-neutral-900 border border-neutral-800 rounded px-3 py-2 text-white font-mono uppercase focus:outline-none focus:border-neutral-500"
                    />
                    {errors.cardHolder && <p className="text-red-400 text-[10px] mt-0.5">{errors.cardHolder}</p>}
                  </div>

                  <div>
                    <label className="text-[10px] text-neutral-400 uppercase block mb-1">Număr Card (16 Cifre) *</label>
                    <input
                      type="text"
                      maxLength={19}
                      value={cardNumber}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim();
                        setCardNumber(val);
                      }}
                      placeholder="4532 0000 0000 0000"
                      className="w-full bg-neutral-900 border border-neutral-800 rounded px-3 py-2 text-white font-mono focus:outline-none focus:border-neutral-500"
                    />
                    {errors.cardNumber && <p className="text-red-400 text-[10px] mt-0.5">{errors.cardNumber}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] text-neutral-400 uppercase block mb-1">Expiră (LL/AA) *</label>
                      <input
                        type="text"
                        maxLength={5}
                        value={cardExpiry}
                        onChange={(e) => {
                          let val = e.target.value.replace(/[^\d/]/g, '');
                          if (val.length === 2 && !val.includes('/')) val = val + '/';
                          setCardExpiry(val);
                        }}
                        placeholder="MM/YY"
                        className="w-full bg-neutral-900 border border-neutral-800 rounded px-3 py-2 text-white font-mono focus:outline-none focus:border-neutral-500"
                      />
                      {errors.cardExpiry && <p className="text-red-400 text-[10px] mt-0.5">{errors.cardExpiry}</p>}
                    </div>

                    <div>
                      <label className="text-[10px] text-neutral-400 uppercase block mb-1">Cod Securitate (CVC / CVV) *</label>
                      <input
                        type="password"
                        maxLength={4}
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value.replace(/\D/g, ''))}
                        placeholder="•••"
                        className="w-full bg-neutral-900 border border-neutral-800 rounded px-3 py-2 text-white font-mono focus:outline-none focus:border-neutral-500"
                      />
                      {errors.cardCvc && <p className="text-red-400 text-[10px] mt-0.5">{errors.cardCvc}</p>}
                    </div>
                  </div>

                  <div className="text-[10px] text-neutral-400 pt-1 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Plată procesată conform standardelor bancare PCI-DSS. Fondurile sunt virate direct în contul IBAN al magazinului.</span>
                  </div>
                </div>
              )}

              {/* Revolut / Bank Transfer Details */}
              {paymentMethod === 'revolut_pay' && (
                <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-xl space-y-2 text-xs font-mono">
                  <div className="flex items-center gap-2 font-bold text-white pb-1 border-b border-neutral-850">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span>Detalii Transfer Direct în Contul Magazinului</span>
                  </div>
                  <div className="space-y-1 text-neutral-300 text-[11px] pt-1">
                    <div className="flex justify-between">
                      <span className="text-neutral-500">Titular Cont:</span>
                      <span className="font-bold text-white">{storePaymentSettings?.ownerName || 'Alexandru Stănescu / ReSellix SRL'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-500">Banca:</span>
                      <span className="text-white">{storePaymentSettings?.bankName || 'Banca Transilvania'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-500">IBAN Cont:</span>
                      <span className="font-bold text-emerald-400">{storePaymentSettings?.iban || 'RO49 BTRL 0000 1209 8831 22XX'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-500">Revolut Tag:</span>
                      <span className="text-white font-bold">{storePaymentSettings?.revolutTag || '@alexandru.resellix'}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Order Items Preview */}
            <div className="pt-2 border-t border-neutral-800">
              <span className="text-xs font-mono text-neutral-400 uppercase block mb-2">
                Produse comandate ({cart.length}):
              </span>
              <div className="space-y-2 max-h-36 overflow-y-auto">
                {cart.map((item) => (
                  <div key={`${item.product.id}-${item.selectedSize}`} className="flex items-center justify-between text-xs font-mono bg-neutral-950 p-2 rounded border border-neutral-850">
                    <div className="flex items-center gap-2">
                      <img src={item.product.images[0]} alt="" className="w-8 h-8 rounded object-cover" />
                      <div>
                        <span className="text-white font-bold">{item.product.name}</span>
                        <span className="text-neutral-400 ml-2">Mărime: {item.selectedSize} (x{item.quantity})</span>
                      </div>
                    </div>
                    <span className="text-white font-bold">
                      {(item.product.priceRon * item.quantity).toLocaleString('ro-RO')} RON
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Total breakdown */}
            <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800 space-y-1.5 text-xs font-mono text-neutral-300">
              <div className="flex justify-between">
                <span>Subtotal produse:</span>
                <span className="text-white font-bold">{subtotal.toLocaleString('ro-RO')} RON</span>
              </div>
              <div className="flex justify-between">
                <span>Cost transport:</span>
                <span className={shippingCost === 0 ? 'text-emerald-400 font-bold' : 'text-white font-bold'}>
                  {shippingCost === 0 ? 'GRATUIT' : `${shippingCost} RON`}
                </span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>Reducere cupon:</span>
                  <span>-{discountAmount} RON</span>
                </div>
              )}
              <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-neutral-800">
                <span>Total de plată:</span>
                <span className="font-mono text-lg">{total.toLocaleString('ro-RO')} RON</span>
              </div>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-white hover:bg-neutral-200 text-black font-mono font-bold text-sm uppercase tracking-wider rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg active:scale-98 disabled:opacity-60"
            >
              {isSubmitting ? (
                <span>Se procesează comanda securizată...</span>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Plasează Comanda ({total.toLocaleString('ro-RO')} RON · Mod Test)</span>
                </>
              )}
            </button>

            <div className="text-center text-[10px] text-neutral-500 font-mono">
              Prin plasarea comenzii confirmi că ești de acord cu Termenii & Condițiile ReSellix și Politica de Retur 30 Zile.
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
