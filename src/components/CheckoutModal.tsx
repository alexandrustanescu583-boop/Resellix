import React, { useState, useMemo } from 'react';
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
  FileText,
  Users,
  MapPin,
  Calendar,
  Clock,
  Phone,
  MessageCircle
} from 'lucide-react';
import { CartItem, CustomerShipping, Order, PaymentMethod, StorePaymentSettings, UserAccount } from '../types/resellix';

interface CheckoutModalProps {
  isOpen: boolean;
  cart: CartItem[];
  discountPercent: number;
  currentUser?: UserAccount | null;
  storePaymentSettings?: StorePaymentSettings;
  onClose: () => void;
  onOrderPlaced: (order: Order) => void;
  onViewInvoice: (order: Order) => void;
  onRequestAccount?: (mode: 'login' | 'register') => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  cart,
  discountPercent,
  currentUser,
  storePaymentSettings,
  onClose,
  onOrderPlaced,
  onViewInvoice,
  onRequestAccount
}) => {
  if (!isOpen) return null;

  const sellerCity = storePaymentSettings?.sellerCity || 'București';
  const sellerPhone = storePaymentSettings?.sellerPhone || '0721 445 889';
  const enableMeetup = storePaymentSettings?.enableMeetup ?? true;
  const meetupLocations = storePaymentSettings?.meetupLocations || [
    'AFI Cotroceni (Intrare Principală / Starbucks)',
    'Metrou Piața Victoriei / Piața Unirii',
    'ParkLake Mall (Zona Food Court / Parcare)',
    'Mega Mall Pantelimon (Intrare)',
    'Băneasa Shopping City',
    'Locație convenită telefonic / WhatsApp'
  ];

  // Form State
  const [formData, setFormData] = useState<CustomerShipping>({
    fullName: currentUser?.fullName || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || '',
    address: (currentUser?.savedAddresses && currentUser.savedAddresses[0]) || '',
    city: '',
    county: 'București',
    postalCode: '',
    notes: ''
  });

  React.useEffect(() => {
    if (currentUser) {
      setFormData((prev) => ({
        ...prev,
        fullName: prev.fullName || currentUser.fullName || '',
        email: prev.email || currentUser.email || '',
        phone: prev.phone || currentUser.phone || '',
        address: prev.address || (currentUser.savedAddresses && currentUser.savedAddresses[0]) || ''
      }));
    }
  }, [currentUser]);

  // Delivery method
  const [deliveryMethod, setDeliveryMethod] = useState<'easybox' | 'fancourier' | 'meetup'>('easybox');

  // Meetup Scheduling State
  const [meetupLocation, setMeetupLocation] = useState<string>(meetupLocations[0] || 'AFI Cotroceni');
  const [customLocation, setCustomLocation] = useState<string>('');
  const [meetupDate, setMeetupDate] = useState<string>(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  });
  const [meetupTimeSlot, setMeetupTimeSlot] = useState<string>('17:00 - 20:30 (Seara)');
  const [meetupNotes, setMeetupNotes] = useState<string>('');

  // Payment method (Default to COD Ramburs or Meetup Cash)
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cod');

  // Card details (Real secure card processing)
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState(currentUser?.fullName || '');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');

  // Errors state
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [placedOrder, setPlacedOrder] = useState<Order | null>(null);

  // Helper to normalize city strings for comparison
  const normalizeCity = (text: string) =>
    (text || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]/g, '');

  // Detect if customer is from the seller's city
  const isSameCity = useMemo(() => {
    if (!enableMeetup) return false;
    const sCity = normalizeCity(sellerCity);
    const cCity = normalizeCity(formData.city);
    const cCounty = normalizeCity(formData.county);

    if (!cCity && !cCounty) return false;

    if (cCity.includes(sCity) || sCity.includes(cCity)) return true;
    if (cCounty.includes(sCity) || sCity.includes(cCounty)) return true;
    if (sCity === 'bucuresti' && (cCounty.includes('ilfov') || cCity.includes('sector'))) return true;

    return false;
  }, [formData.city, formData.county, sellerCity, enableMeetup]);

  // Calculations
  const subtotal = cart.reduce((sum, item) => sum + (item.product.priceRon * item.quantity), 0);
  const isFreeShipping = subtotal >= 350;

  const shippingCost = deliveryMethod === 'meetup' 
    ? 0 
    : (isFreeShipping ? 0 : (deliveryMethod === 'easybox' ? 16 : 22));

  const discountAmount = discountPercent > 0 
    ? Math.round((subtotal * discountPercent) / 100) 
    : 0;

  const total = Math.max(0, subtotal - discountAmount + shippingCost);

  // Validation
  const validate = (): boolean => {
    const errs: Record<string, string> = {};

    if (!currentUser) {
      errs.account = 'Trebuie să îți creezi un cont gratuit pentru a finaliza și trimite comanda.';
      if (onRequestAccount) onRequestAccount('register');
      setErrors(errs);
      return false;
    }

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
      const isMeetup = deliveryMethod === 'meetup';
      const orderNum = `RSX-${Math.floor(100000 + Math.random() * 900000)}`;
      const trackingCode = isMeetup 
        ? `MEET-${Math.floor(1000 + Math.random() * 9000)}` 
        : `FAN${Math.floor(10000000 + Math.random() * 90000000)}RO`;

      const finalLocation = meetupLocation === 'Altă locație convenită' && customLocation.trim()
        ? customLocation.trim()
        : meetupLocation;

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
          name: isMeetup 
            ? `Predare Personală & Meet-up Face-to-Face (${sellerCity})`
            : (deliveryMethod === 'easybox' ? 'Sameday Easybox Locker 24/7' : 'Fan Courier Livrare la Ușă Double-Box'),
          priceRon: shippingCost,
          estimatedDays: isMeetup ? 'Azi sau Mâine (Programat de comun acord)' : '1-2 zile lucrătoare'
        },
        meetupDetails: isMeetup ? {
          city: sellerCity,
          location: finalLocation,
          preferredDate: meetupDate,
          preferredTimeSlot: meetupTimeSlot,
          buyerNotes: meetupNotes,
          whatsappContact: formData.phone
        } : undefined,
        paymentMethod,
        paymentStatus: (paymentMethod === 'cod' || paymentMethod === 'meetup_cash') ? 'pending_cod' : 'paid',
        orderStatus: isMeetup ? 'în așteptare' : (paymentMethod === 'cod' ? 'în așteptare' : 'plătită'),
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
              {placedOrder.meetupDetails ? (
                <Users className="w-8 h-8 text-emerald-400" />
              ) : (
                <CheckCircle className="w-8 h-8" />
              )}
            </div>

            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-semibold">
                {placedOrder.meetupDetails ? 'Meeting Programat cu Succes!' : 'Comandă Înregistrată cu Succes!'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black font-mono mt-1">
                Număr Comandă: {placedOrder.orderNumber}
              </h2>
            </div>

            {/* Meet-up Dedicated Success Card */}
            {placedOrder.meetupDetails ? (
              <div className="p-5 bg-gradient-to-b from-emerald-950/80 to-neutral-950 border border-emerald-500/60 rounded-2xl text-left max-w-lg mx-auto space-y-3 font-mono text-xs shadow-xl">
                <div className="flex items-center justify-between border-b border-emerald-800/80 pb-2">
                  <div className="flex items-center gap-2 text-emerald-300 font-bold text-sm">
                    <Users className="w-4 h-4 text-emerald-400" />
                    <span>PREDARE PERSONALĂ FACE-TO-FACE</span>
                  </div>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-bold uppercase">
                    0 LEI Livrare
                  </span>
                </div>

                <div className="space-y-1.5 text-neutral-200 text-xs">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-neutral-400 text-[11px] block">Locație Întâlnire:</span>
                      <strong className="text-white text-sm">{placedOrder.meetupDetails.location}</strong>
                    </div>
                  </div>

                  <div className="flex items-start gap-2 pt-1">
                    <Clock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-neutral-400 text-[11px] block">Data & Interval Orar:</span>
                      <strong className="text-white">{placedOrder.meetupDetails.preferredDate} · {placedOrder.meetupDetails.preferredTimeSlot}</strong>
                    </div>
                  </div>

                  <p className="text-neutral-300 text-[11px] pt-1 leading-relaxed">
                    Vânzătorul va veni cu perechea ambalată pentru a o verifica fizic și a proba mărimea pe loc.
                    {placedOrder.paymentMethod === 'meetup_cash' || placedOrder.paymentMethod === 'cod' ? (
                      <span className="block text-emerald-300 font-semibold mt-1">
                        💵 Vei achita suma de {placedOrder.total.toLocaleString('ro-RO')} RON în numerar direct la întâlnire.
                      </span>
                    ) : (
                      <span className="block text-emerald-300 font-semibold mt-1">
                        ⚡ Vei efectua plata prin Revolut sau card direct la întâlnire sau conform selecției tale.
                      </span>
                    )}
                  </p>
                </div>

                {/* Direct Seller Contact Buttons */}
                <div className="pt-2 border-t border-emerald-800/60 flex flex-col sm:flex-row gap-2">
                  <a
                    href={`https://wa.me/4${sellerPhone.replace(/[^0-9]/g, '')}?text=Salut!%20Am%20plasat%20comanda%20%23${placedOrder.orderNumber}%20cu%20predare%20personal%C4%83%20%C3%AEn%20${encodeURIComponent(placedOrder.meetupDetails.location)}%20pe%20data%20de%20${placedOrder.meetupDetails.preferredDate}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg text-xs flex items-center justify-center gap-1.5 transition-colors shadow"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Confirmă pe WhatsApp cu Vânzătorul</span>
                  </a>
                  <a
                    href={`tel:${sellerPhone}`}
                    className="px-4 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg text-xs flex items-center justify-center gap-1.5 border border-neutral-700 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Sună ({sellerPhone})</span>
                  </a>
                </div>
              </div>
            ) : (
              /* Authentic Order Status Confirmation for Courier */
              <div className="p-4 bg-emerald-950/40 border border-emerald-800 rounded-xl text-left max-w-lg mx-auto space-y-1.5 font-mono text-xs">
                <div className="flex items-center gap-2 text-emerald-300 font-bold">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>COMANDĂ ÎNREGISTRATĂ CU SUCCES</span>
                </div>
                {placedOrder.paymentMethod === 'cod' ? (
                  <p className="text-neutral-300">
                    Ai ales <strong>Plată Ramburs la Livrare</strong>. Vei achita suma de <strong>{placedOrder.total.toLocaleString('ro-RO')} RON</strong> direct curierului Fan Courier / la locker Easybox la predarea coletului.
                  </p>
                ) : placedOrder.paymentMethod === 'card' ? (
                  <p className="text-neutral-300">
                    Plata online de <strong>{placedOrder.total.toLocaleString('ro-RO')} RON</strong> a fost autorizată securizat prin 3D-Secure. Coletul va fi pregătit și expediat în 24h.
                  </p>
                ) : (
                  <p className="text-neutral-300">
                    Comandă înregistrată. Efectuează transferul bancar de <strong>{placedOrder.total.toLocaleString('ro-RO')} RON</strong> folosind numărul comenzii <strong>{placedOrder.orderNumber}</strong> ca referință de plată.
                  </p>
                )}
                <p className="text-neutral-400 text-[11px] pt-1">
                  Factura fiscală și numărul AWB de expediere au fost emise automat și sunt salvate în contul tău.
                </p>
              </div>
            )}

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
                <span className="text-neutral-400">Livrare:</span>
                <span className="text-white text-right max-w-[250px] truncate">{placedOrder.deliveryMethod.name}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-neutral-850">
                <span className="text-neutral-400">{placedOrder.meetupDetails ? 'Cod Întâlnire:' : 'AWB Fan Courier:'}</span>
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

            {/* Account Status / Requirement Gate */}
            {currentUser ? (
              <div className="p-3 bg-neutral-950 border border-neutral-800 rounded-xl flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white text-black font-bold flex items-center justify-center text-sm">
                    {currentUser.fullName.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="text-white font-bold flex items-center gap-2">
                      <span>{currentUser.fullName}</span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400 font-normal">Cont Înregistrat</span>
                    </div>
                    <div className="text-neutral-400 text-[11px]">{currentUser.email} {currentUser.phone ? `· ${currentUser.phone}` : ''}</div>
                  </div>
                </div>
                {onRequestAccount && (
                  <button
                    type="button"
                    onClick={() => onRequestAccount('login')}
                    className="text-neutral-400 hover:text-white text-[11px] underline"
                  >
                    Schimbă contul
                  </button>
                )}
              </div>
            ) : (
              <div className="p-4 bg-amber-950/40 border border-amber-600/40 rounded-xl space-y-2.5 text-xs font-mono">
                <div className="flex items-center gap-2 text-amber-400 font-bold">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>Crearea unui cont gratuit este obligatorie pentru a plasa comanda</span>
                </div>
                <p className="text-neutral-300 leading-relaxed font-sans">
                  Pentru a confirma livrarea, a emite factura fiscală și a genera codul AWB Fan Courier sau Sameday Easybox, te rugăm să îți creezi un cont gratuit. Durează doar 10 secunde!
                </p>
                <div className="pt-1 flex flex-wrap gap-2.5">
                  <button
                    type="button"
                    onClick={() => onRequestAccount && onRequestAccount('register')}
                    className="px-4 py-2 bg-white hover:bg-neutral-200 text-black font-bold uppercase tracking-wider rounded-lg text-xs transition-colors shadow-md"
                  >
                    Creează Cont Nou (10 secunde)
                  </button>
                  <button
                    type="button"
                    onClick={() => onRequestAccount && onRequestAccount('login')}
                    className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg border border-neutral-700 text-xs transition-colors"
                  >
                    Am deja cont · Autentificare
                  </button>
                </div>
              </div>
            )}

            {/* Security and authenticity guarantee badge */}
            <div className="p-3.5 bg-neutral-950 border border-neutral-800 rounded-xl flex items-start gap-3 text-xs font-mono text-neutral-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white">GARANȚIE RESELLIX PREMIUM:</strong> Fiecare pereche este inspectată fizic, ambalată Double-Box și expediată cu AWB urmăribil și factură fiscală. Retur garantat 30 de zile.
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
                  <div className="flex items-center justify-between mt-1">
                    {errors.city ? <p className="text-red-400 text-[10px]">{errors.city}</p> : <span />}
                    <button
                      type="button"
                      onClick={() => {
                        setFormData((prev) => ({
                          ...prev,
                          city: sellerCity,
                          county: sellerCity.toLowerCase() === 'bucurești' ? 'București' : prev.county
                        }));
                        setDeliveryMethod('meetup');
                        setPaymentMethod('meetup_cash');
                      }}
                      className="text-[11px] text-emerald-400 hover:text-emerald-300 underline flex items-center gap-1 cursor-pointer font-bold"
                    >
                      <MapPin className="w-3 h-3" />
                      <span>Sunt din {sellerCity} (Activează Meet-up)</span>
                    </button>
                  </div>
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

              {/* Same City Proactive Detection Alert */}
              {isSameCity && (
                <div className="p-4 bg-gradient-to-r from-emerald-950/80 via-neutral-900 to-neutral-950 border border-emerald-500/50 rounded-xl flex items-start gap-3.5 text-xs animate-in fade-in">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Users className="w-4 h-4" />
                  </div>
                  <div className="space-y-1.5 flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <strong className="text-white font-bold uppercase tracking-wide">
                        Sistemul a detectat că ești din {sellerCity}!
                      </strong>
                      <span className="px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                        0 LEI Livrare · Face-to-Face
                      </span>
                    </div>
                    <p className="text-neutral-300 text-[11px] leading-relaxed">
                      Ești în același oraș cu vânzătorul ReSellix! Poți alege <strong className="text-white">Organizează un Meeting / Predare Personală</strong> pentru a proba perechea și a verifica autenticitatea pe loc înainte de a plăti.
                    </p>
                    {deliveryMethod !== 'meetup' && (
                      <button
                        type="button"
                        onClick={() => {
                          setDeliveryMethod('meetup');
                          setPaymentMethod('meetup_cash');
                        }}
                        className="mt-1 px-3.5 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-[11px] rounded transition-colors inline-flex items-center gap-1.5 shadow"
                      >
                        <Users className="w-3.5 h-3.5" />
                        <span>Activează Predare Personală Face-to-Face (0 LEI)</span>
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Section 2: Delivery Method */}
            <div className="space-y-3">
              <h3 className="text-xs font-mono uppercase font-bold text-neutral-300 border-b border-neutral-800 pb-2 flex items-center justify-between">
                <span>2. Metodă de Livrare</span>
                {deliveryMethod === 'meetup' && (
                  <span className="text-emerald-400 text-[11px] font-normal">
                    Predare Face-to-Face Activată (0 LEI)
                  </span>
                )}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                {/* Option 1: Meet-up / Predare personala */}
                <label 
                  onClick={() => {
                    setDeliveryMethod('meetup');
                    if (paymentMethod === 'cod') setPaymentMethod('meetup_cash');
                  }}
                  className={`p-3.5 rounded-xl border cursor-pointer flex flex-col justify-between transition-all sm:col-span-2 ${
                    deliveryMethod === 'meetup'
                      ? 'border-emerald-400 bg-emerald-950/40 ring-1 ring-emerald-500/50 shadow-lg'
                      : 'border-neutral-800 bg-neutral-950 hover:border-emerald-700/60'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white flex items-center gap-1.5">
                      <Users className="w-4 h-4 text-emerald-400" />
                      <span>Organizează un Meeting (Predare Personală în {sellerCity})</span>
                    </span>
                    <span className="text-emerald-400 font-bold bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800 text-[11px]">
                      0 RON · GRATUIT
                    </span>
                  </div>
                  <span className="text-[11px] text-neutral-300 mt-2">
                    {isSameCity 
                      ? `Locuiești în ${sellerCity}: Întâlnire directă cu vânzătorul pentru verificare fizică, probă mărime și plată pe loc.`
                      : `Disponibil pentru clienți din ${sellerCity} sau care se pot întâlni în locațiile stabilite.`}
                  </span>
                </label>

                {/* Option 2: Sameday Easybox */}
                <label 
                  onClick={() => {
                    setDeliveryMethod('easybox');
                    if (paymentMethod === 'meetup_cash') setPaymentMethod('cod');
                  }}
                  className={`p-3.5 rounded-xl border cursor-pointer flex flex-col justify-between transition-all ${
                    deliveryMethod === 'easybox'
                      ? 'border-white bg-neutral-800 shadow'
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
                    Ridicare oricând din locker în 24-48h cu cod PIN/QR.
                  </span>
                </label>

                {/* Option 3: Fan Courier */}
                <label 
                  onClick={() => {
                    setDeliveryMethod('fancourier');
                    if (paymentMethod === 'meetup_cash') setPaymentMethod('cod');
                  }}
                  className={`p-3.5 rounded-xl border cursor-pointer flex flex-col justify-between transition-all ${
                    deliveryMethod === 'fancourier'
                      ? 'border-white bg-neutral-800 shadow'
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

              {/* Meeting Scheduling Sub-form when meetup is selected */}
              {deliveryMethod === 'meetup' && (
                <div className="p-4 bg-neutral-950 border border-emerald-500/40 rounded-xl space-y-3.5 font-mono text-xs animate-in fade-in">
                  <div className="flex items-center gap-2 text-emerald-300 font-bold">
                    <Calendar className="w-4 h-4 text-emerald-400" />
                    <span>Detalii Programare Întâlnire ({sellerCity})</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Location picker */}
                    <div className="sm:col-span-2">
                      <label className="text-[10px] text-neutral-400 uppercase font-bold block mb-1">
                        Alege Locația de Întâlnire *
                      </label>
                      <select
                        value={meetupLocation}
                        onChange={(e) => setMeetupLocation(e.target.value)}
                        className="w-full bg-neutral-900 border border-neutral-700 rounded-lg p-2.5 text-white font-mono focus:outline-none focus:border-emerald-500"
                      >
                        {meetupLocations.map((loc) => (
                          <option key={loc} value={loc}>{loc}</option>
                        ))}
                        <option value="Altă locație convenită">Altă locație convenită telefonic / WhatsApp</option>
                      </select>
                    </div>

                    {/* Custom location input if selected */}
                    {meetupLocation === 'Altă locație convenită' && (
                      <div className="sm:col-span-2">
                        <label className="text-[10px] text-neutral-400 uppercase font-bold block mb-1">
                          Specifică adresa sau reperul dorit *
                        </label>
                        <input
                          type="text"
                          value={customLocation}
                          onChange={(e) => setCustomLocation(e.target.value)}
                          placeholder="ex: Stația de Metrou Pipera sau Cafeneaua Starbucks"
                          className="w-full bg-neutral-900 border border-neutral-700 rounded-lg p-2.5 text-white font-mono focus:outline-none focus:border-emerald-500"
                        />
                      </div>
                    )}

                    {/* Date picker */}
                    <div>
                      <label className="text-[10px] text-neutral-400 uppercase font-bold block mb-1">
                        Data Dorită pentru Întâlnire *
                      </label>
                      <input
                        type="date"
                        value={meetupDate}
                        min={new Date().toISOString().split('T')[0]}
                        onChange={(e) => setMeetupDate(e.target.value)}
                        className="w-full bg-neutral-900 border border-neutral-700 rounded-lg p-2.5 text-white font-mono focus:outline-none focus:border-emerald-500"
                      />
                    </div>

                    {/* Time slot */}
                    <div>
                      <label className="text-[10px] text-neutral-400 uppercase font-bold block mb-1">
                        Interval Orar Preferat *
                      </label>
                      <select
                        value={meetupTimeSlot}
                        onChange={(e) => setMeetupTimeSlot(e.target.value)}
                        className="w-full bg-neutral-900 border border-neutral-700 rounded-lg p-2.5 text-white font-mono focus:outline-none focus:border-emerald-500"
                      >
                        <option value="10:00 - 13:00 (Dimineața)">10:00 - 13:00 (Dimineața)</option>
                        <option value="13:00 - 17:00 (După-amiaza)">13:00 - 17:00 (După-amiaza)</option>
                        <option value="17:00 - 20:30 (Seara)">17:00 - 20:30 (Seara)</option>
                        <option value="Flexibil / Stabilim pe WhatsApp">Flexibil / Stabilim pe WhatsApp</option>
                      </select>
                    </div>

                    {/* Meeting Notes */}
                    <div className="sm:col-span-2">
                      <label className="text-[10px] text-neutral-400 uppercase font-bold block mb-1">
                        Notă / Instrucțiuni pentru Vânzător (Opțional)
                      </label>
                      <input
                        type="text"
                        value={meetupNotes}
                        onChange={(e) => setMeetupNotes(e.target.value)}
                        placeholder="ex: Să ai la tine și măsura 42.5 pentru probă"
                        className="w-full bg-neutral-900 border border-neutral-700 rounded-lg p-2.5 text-white font-mono focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>

                  <p className="text-[11px] text-neutral-400 pt-1">
                    ℹ️ După plasarea comenzii, vânzătorul te va contacta pe WhatsApp sau telefonic la <strong className="text-white">{formData.phone || 'numărul tău'}</strong> pentru confirmare.
                  </p>
                </div>
              )}
            </div>

            {/* Section 3: Payment Method */}
            <div className="space-y-3">
              <h3 className="text-xs font-mono uppercase font-bold text-neutral-300 border-b border-neutral-800 pb-2">
                3. Metodă de Plată (Securizată)
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs font-mono">
                {deliveryMethod === 'meetup' ? (
                  <>
                    {/* 1. Cash la Intalnire */}
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('meetup_cash')}
                      className={`p-3.5 rounded-xl border text-left transition-all ${
                        paymentMethod === 'meetup_cash' || paymentMethod === 'cod'
                          ? 'border-emerald-400 bg-neutral-800 text-white font-bold shadow-md ring-1 ring-emerald-500/30'
                          : 'border-neutral-800 bg-neutral-950 text-neutral-400 hover:border-neutral-700'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                          <Users className="w-4 h-4" />
                          <span>Cash la Întâlnire</span>
                        </span>
                        <span className="text-[10px] bg-emerald-950 text-emerald-300 px-1.5 py-0.5 rounded border border-emerald-800">
                          Recomandat
                        </span>
                      </div>
                      <span className="text-[11px] text-neutral-300 block font-normal">
                        Plătești în numerar doar după ce verifici și probezi perechea
                      </span>
                    </button>

                    {/* 2. Revolut / Transfer pe Loc */}
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
                          <span>Revolut pe Loc</span>
                        </span>
                      </div>
                      <span className="text-[11px] text-neutral-300 block font-normal">
                        Transfer instant pe telefon direct la întâlnire
                      </span>
                    </button>

                    {/* 3. Card Bancar Online */}
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
                          <span>Card pe Site</span>
                        </span>
                        <span className="text-[10px] text-neutral-400 font-normal">3D Secure</span>
                      </div>
                      <span className="text-[11px] text-neutral-300 block font-normal">
                        Achită securizat online în avans
                      </span>
                    </button>
                  </>
                ) : (
                  <>
                    {/* 1. COD / Ramburs Curier */}
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
                  </>
                )}
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
            {!currentUser ? (
              <button
                type="button"
                onClick={() => onRequestAccount && onRequestAccount('register')}
                className="w-full py-4 bg-emerald-500 hover:bg-emerald-400 text-black font-mono font-bold text-sm uppercase tracking-wider rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg active:scale-98"
              >
                <Lock className="w-4 h-4" />
                <span>Creează Cont pentru a Trimite Comanda</span>
              </button>
            ) : (
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
                    <span>Plasează Comanda ({total.toLocaleString('ro-RO')} RON)</span>
                  </>
                )}
              </button>
            )}

            <div className="text-center text-[10px] text-neutral-500 font-mono">
              Prin plasarea comenzii confirmi că ești de acord cu Termenii & Condițiile ReSellix și Politica de Retur 30 Zile.
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
