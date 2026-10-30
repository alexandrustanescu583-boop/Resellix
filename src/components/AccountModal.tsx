import React, { useState } from 'react';
import { 
  X, 
  User, 
  Package, 
  Clock, 
  MapPin, 
  Lock, 
  LogOut, 
  CheckCircle, 
  Truck, 
  FileText,
  Heart,
  Eye
} from 'lucide-react';
import { UserAccount, Order, Product } from '../types/resellix';

interface AccountModalProps {
  isOpen: boolean;
  user: UserAccount | null;
  userOrders: Order[];
  wishlist: Product[];
  initialMode?: 'login' | 'register';
  checkoutPrompt?: string | null;
  onClose: () => void;
  onLogin: (account: UserAccount) => void;
  onLogout: () => void;
  onTrackOrder: (awb: string) => void;
  onViewInvoice: (order: Order) => void;
  onViewProduct: (product: Product) => void;
}

export const AccountModal: React.FC<AccountModalProps> = ({
  isOpen,
  user,
  userOrders,
  wishlist,
  initialMode = 'login',
  checkoutPrompt,
  onClose,
  onLogin,
  onLogout,
  onTrackOrder,
  onViewInvoice,
  onViewProduct
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'orders' | 'profile' | 'wishlist'>('orders');
  const [authMode, setAuthMode] = useState<'login' | 'register'>(user ? 'login' : initialMode);

  // Form states for login / register (clean defaults for guests)
  const [emailInput, setEmailInput] = useState(user?.email || '');
  const [nameInput, setNameInput] = useState(user?.fullName || '');
  const [phoneInput, setPhoneInput] = useState(user?.phone || '');
  const [addressInput, setAddressInput] = useState(user?.savedAddresses?.[0] || '');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginSuccessNotice, setLoginSuccessNotice] = useState<string | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);

  React.useEffect(() => {
    if (!user) {
      setAuthMode(initialMode);
    }
  }, [initialMode, user, isOpen]);

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);

    if (!emailInput.trim() || !/^\S+@\S+\.\S+$/.test(emailInput.trim())) {
      setAuthError('Introduceți o adresă de email validă.');
      return;
    }

    if (authMode === 'register') {
      if (!nameInput.trim() || nameInput.trim().length < 3) {
        setAuthError('Introduceți numele și prenumele complet.');
        return;
      }
      if (!phoneInput.trim() || phoneInput.trim().length < 9) {
        setAuthError('Introduceți un număr de telefon valid pentru curier.');
        return;
      }
      if (!passwordInput.trim() || passwordInput.trim().length < 4) {
        setAuthError('Parola trebuie să aibă minimum 4 caractere.');
        return;
      }
    } else {
      if (!passwordInput.trim()) {
        setAuthError('Introduceți parola contului.');
        return;
      }
    }

    const savedAddrList = addressInput.trim() 
      ? [addressInput.trim()] 
      : (user?.savedAddresses || []);

    const account: UserAccount = {
      id: user ? user.id : `user-${Date.now()}`,
      fullName: nameInput.trim() || (authMode === 'login' ? (emailInput.split('@')[0] || 'Client ReSellix') : 'Client ReSellix'),
      email: emailInput.trim(),
      phone: phoneInput.trim() || '0721 000 000',
      role: 'customer',
      savedAddresses: savedAddrList,
      ordersCount: user ? userOrders.length : 0
    };

    setLoginSuccessNotice(authMode === 'register' ? 'Cont creat cu succes!' : 'Conectare reușită!');
    setTimeout(() => {
      onLogin(account);
      setLoginSuccessNotice(null);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      
      {/* Backdrop */}
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative bg-neutral-900 border border-neutral-700 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto text-white shadow-2xl z-10 p-6 sm:p-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-white rounded-full bg-neutral-800 hover:bg-neutral-700 transition-colors"
          aria-label="Închide"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 border-b border-neutral-800 pb-5">
          <div className="w-12 h-12 rounded-xl bg-white text-black font-mono font-bold flex items-center justify-center text-lg shadow-sm">
            {user ? user.fullName.charAt(0).toUpperCase() : (authMode === 'register' ? '+' : 'R')}
          </div>
          <div>
            <h2 className="text-xl font-mono font-bold text-white">
              {user 
                ? user.fullName 
                : (authMode === 'register' ? 'Creează Cont ReSellix' : 'Autentificare Cont ReSellix')}
            </h2>
            <p className="text-xs font-mono text-neutral-400">
              {user 
                ? user.email 
                : 'Necesar pentru plasarea comenzilor, factură și urmărire AWB curier'}
            </p>
          </div>
        </div>

        {/* Not logged in: Show Login / Register form */}
        {!user ? (
          <div className="mt-6 space-y-6">
            
            {/* Prominent Checkout Alert Banner if redirected from checkout */}
            {checkoutPrompt && (
              <div className="bg-emerald-950/40 border border-emerald-500/40 rounded-xl p-4 flex items-start gap-3">
                <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-lg shrink-0 mt-0.5">
                  <Package className="w-4 h-4" />
                </div>
                <div className="space-y-1 font-mono text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white uppercase tracking-wider">Pas Necesar Comandă</span>
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.2 rounded font-semibold">10 Secunde</span>
                  </div>
                  <p className="text-neutral-300 leading-relaxed font-sans">
                    {checkoutPrompt}
                  </p>
                </div>
              </div>
            )}

            <div className="flex border-b border-neutral-800 text-xs font-mono">
              <button
                type="button"
                onClick={() => {
                  setAuthMode('register');
                  setAuthError(null);
                }}
                className={`pb-3 px-5 border-b-2 font-medium transition-colors ${
                  authMode === 'register' ? 'border-white text-white font-bold' : 'border-transparent text-neutral-500 hover:text-neutral-300'
                }`}
              >
                Creează Cont Nou (Recomandat)
              </button>
              <button
                type="button"
                onClick={() => {
                  setAuthMode('login');
                  setAuthError(null);
                }}
                className={`pb-3 px-5 border-b-2 font-medium transition-colors ${
                  authMode === 'login' ? 'border-white text-white font-bold' : 'border-transparent text-neutral-500 hover:text-neutral-300'
                }`}
              >
                Am Deja Cont · Conectare
              </button>
            </div>

            <form onSubmit={handleAuthSubmit} className="space-y-4 text-xs font-mono">
              {authMode === 'register' && (
                <div>
                  <label className="block text-neutral-400 mb-1">Nume și Prenume *</label>
                  <input
                    type="text"
                    required
                    placeholder="ex: Alexandru Popescu"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2.5 text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-500"
                  />
                </div>
              )}

              <div>
                <label className="block text-neutral-400 mb-1">Adresă de Email *</label>
                <input
                  type="email"
                  required
                  placeholder="ex: alexandru@exemplu.ro"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2.5 text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-500"
                />
              </div>

              {authMode === 'register' && (
                <div>
                  <label className="block text-neutral-400 mb-1">Număr de Telefon (pentru livrare / curier) *</label>
                  <input
                    type="tel"
                    required
                    placeholder="ex: 0721 123 456"
                    value={phoneInput}
                    onChange={(e) => setPhoneInput(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2.5 text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-500"
                  />
                </div>
              )}

              {authMode === 'register' && (
                <div>
                  <label className="block text-neutral-400 mb-1">Adresă de Livrare Principală (opțional)</label>
                  <input
                    type="text"
                    placeholder="ex: Str. Victoriei nr. 12, Bloc A, Ap. 5, București"
                    value={addressInput}
                    onChange={(e) => setAddressInput(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2.5 text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-500"
                  />
                </div>
              )}

              <div>
                <label className="block text-neutral-400 mb-1">Parolă de Securitate *</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2.5 text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-500"
                />
              </div>

              {authError && (
                <div className="p-3 bg-red-950/40 border border-red-800 text-red-400 rounded-lg text-xs font-mono">
                  {authError}
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3.5 bg-white hover:bg-neutral-200 text-black font-mono font-bold uppercase tracking-wider rounded-lg transition-colors mt-2 shadow-lg active:scale-98"
              >
                {authMode === 'login' ? 'Intră în Cont' : 'Creează Cont & Continuă Comanda'}
              </button>

              <div className="text-center pt-2">
                {authMode === 'login' ? (
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMode('register');
                      setAuthError(null);
                    }}
                    className="text-neutral-400 hover:text-white text-xs underline"
                  >
                    Nu ai cont încă? Creează un cont nou în 10 secunde
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMode('login');
                      setAuthError(null);
                    }}
                    className="text-neutral-400 hover:text-white text-xs underline"
                  >
                    Ai deja cont? Autentifică-te aici
                  </button>
                )}
              </div>

              {loginSuccessNotice && (
                <div className="text-center text-emerald-400 text-xs py-1 font-bold animate-pulse">
                  {loginSuccessNotice}
                </div>
              )}
            </form>
          </div>
        ) : (
          /* Logged In View */
          <div className="mt-6 space-y-6">
            
            {/* Tabs */}
            <div className="flex border-b border-neutral-800 text-xs font-mono">
              <button
                onClick={() => setActiveTab('orders')}
                className={`pb-3 px-4 border-b-2 font-medium flex items-center gap-1.5 transition-colors ${
                  activeTab === 'orders' ? 'border-white text-white font-bold' : 'border-transparent text-neutral-500 hover:text-neutral-300'
                }`}
              >
                <Package className="w-3.5 h-3.5" />
                <span>Comenzile Mele ({userOrders.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('profile')}
                className={`pb-3 px-4 border-b-2 font-medium flex items-center gap-1.5 transition-colors ${
                  activeTab === 'profile' ? 'border-white text-white font-bold' : 'border-transparent text-neutral-500 hover:text-neutral-300'
                }`}
              >
                <User className="w-3.5 h-3.5" />
                <span>Profil & Adrese</span>
              </button>

              <button
                onClick={() => setActiveTab('wishlist')}
                className={`pb-3 px-4 border-b-2 font-medium flex items-center gap-1.5 transition-colors ${
                  activeTab === 'wishlist' ? 'border-white text-white font-bold' : 'border-transparent text-neutral-500 hover:text-neutral-300'
                }`}
              >
                <Heart className="w-3.5 h-3.5" />
                <span>Favorite ({wishlist.length})</span>
              </button>
            </div>

            {/* TAB: ORDERS */}
            {activeTab === 'orders' && (
              <div className="space-y-4">
                {userOrders.length === 0 ? (
                  <div className="text-center py-12 text-neutral-400 font-mono text-xs">
                    <Package className="w-8 h-8 mx-auto mb-2 text-neutral-600" />
                    <p>Nu ai plasat nicio comandă până acum.</p>
                  </div>
                ) : (
                  userOrders.map((ord) => (
                    <div key={ord.id} className="p-4 bg-neutral-950 border border-neutral-800 rounded-xl space-y-3 font-mono text-xs">
                      
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-850 pb-2">
                        <div>
                          <span className="text-white font-bold text-sm block">#{ord.orderNumber}</span>
                          <span className="text-neutral-500 text-[10px]">
                            {new Date(ord.createdAt).toLocaleDateString('ro-RO', { day: '2-digit', month: 'long', year: 'numeric' })}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded bg-emerald-950 border border-emerald-800 text-emerald-400 text-[10px] uppercase font-bold">
                            {ord.orderStatus}
                          </span>
                          <span className="text-white font-bold text-sm">
                            {ord.total.toLocaleString('ro-RO')} RON
                          </span>
                        </div>
                      </div>

                      {/* Items */}
                      <div className="space-y-2">
                        {ord.items.map((it) => (
                          <div key={`${it.product.id}-${it.selectedSize}`} className="flex items-center justify-between text-neutral-300 text-[11px]">
                            <div className="flex items-center gap-2">
                              <img src={it.product.images[0]} alt="" className="w-7 h-7 rounded object-cover" />
                              <span>{it.product.name} (Mărime: {it.selectedSize}) x{it.quantity}</span>
                            </div>
                            <span className="text-neutral-400">{(it.product.priceRon * it.quantity).toLocaleString('ro-RO')} RON</span>
                          </div>
                        ))}
                      </div>

                      {/* AWB & Actions */}
                      <div className="pt-2 border-t border-neutral-850 flex flex-wrap items-center justify-between gap-2">
                        {ord.trackingNumber && (
                          <button
                            onClick={() => onTrackOrder(ord.trackingNumber!)}
                            className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors text-[11px] underline"
                          >
                            <Truck className="w-3.5 h-3.5" />
                            <span>AWB Fan Courier: {ord.trackingNumber}</span>
                          </button>
                        )}

                        <button
                          onClick={() => onViewInvoice(ord)}
                          className="flex items-center gap-1 px-2.5 py-1 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 border border-neutral-700 rounded text-[11px] transition-colors"
                        >
                          <FileText className="w-3 h-3" />
                          <span>Vezi Factura</span>
                        </button>
                      </div>

                    </div>
                  ))
                )}
              </div>
            )}

            {/* TAB: PROFILE & ADDRESSES */}
            {activeTab === 'profile' && (
              <div className="space-y-4 font-mono text-xs">
                <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-xl space-y-2">
                  <span className="text-neutral-500 uppercase text-[10px] block font-semibold">Date Personale</span>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Nume:</span>
                    <span className="text-white font-bold">{user.fullName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Email:</span>
                    <span className="text-white">{user.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Telefon:</span>
                    <span className="text-white">{user.phone || '0722 345 678'}</span>
                  </div>
                </div>

                <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-xl space-y-2">
                  <span className="text-neutral-500 uppercase text-[10px] block font-semibold">Adrese Salvate de Livrare</span>
                  {user.savedAddresses.map((addr, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-neutral-300 pt-1">
                      <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{addr}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2">
                  <button
                    onClick={onLogout}
                    className="flex items-center gap-2 px-4 py-2 text-red-400 hover:text-red-300 hover:bg-red-950/30 rounded-lg transition-colors border border-red-900/40"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Deconectare Cont</span>
                  </button>
                </div>
              </div>
            )}

            {/* TAB: WISHLIST */}
            {activeTab === 'wishlist' && (
              <div className="space-y-3 font-mono text-xs">
                {wishlist.length === 0 ? (
                  <div className="text-center py-10 text-neutral-400">
                    <Heart className="w-8 h-8 mx-auto mb-2 text-neutral-600" />
                    <p>Nu ai niciun produs salvat la favorite.</p>
                  </div>
                ) : (
                  wishlist.map((prod) => (
                    <div key={prod.id} className="p-3 bg-neutral-950 border border-neutral-800 rounded-xl flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <img src={prod.images[0]} alt="" className="w-12 h-12 rounded object-cover" />
                        <div>
                          <h4 className="text-white font-bold text-xs">{prod.name}</h4>
                          <span className="text-neutral-400 text-[11px]">{prod.priceRon.toLocaleString('ro-RO')} RON</span>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          onClose();
                          onViewProduct(prod);
                        }}
                        className="px-3 py-1.5 bg-white text-black font-bold rounded hover:bg-neutral-200 transition-colors flex items-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Vezi</span>
                      </button>
                    </div>
                  ))
                )}
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
};
