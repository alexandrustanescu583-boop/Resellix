import React, { useState, useEffect, useMemo } from 'react';
import { 
  Sparkles, 
  ShoppingBag, 
  Heart, 
  Search, 
  Truck, 
  ShieldCheck, 
  Filter, 
  SlidersHorizontal, 
  ChevronRight, 
  Flame, 
  RotateCcw, 
  ArrowUpDown,
  X,
  Plus,
  Eye,
  CheckCircle2,
  AlertCircle,
  Camera,
  Package,
  Bell,
  Clock,
  Send
} from 'lucide-react';

import { 
  Product, 
  CartItem, 
  Order, 
  UserAccount, 
  OrderStatus, 
  ProductCategory, 
  BrandName,
  StorePaymentSettings 
} from './types/resellix';

import { 
  INITIAL_PRODUCTS, 
  BRANDS_LIST, 
  CATEGORIES_LIST, 
  SIZES_FILTER_LIST 
} from './data/resellixProducts';

import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { AccountModal } from './components/AccountModal';
import { AdminPanel } from './components/AdminPanel';
import { AddProductModal } from './components/AddProductModal';
import { OrderTrackingModal } from './components/OrderTrackingModal';
import { InvoiceModal } from './components/InvoiceModal';
import { LegalModals, LegalTopic } from './components/LegalModals';
import { WishlistDrawer } from './components/WishlistDrawer';
import { SearchModal } from './components/SearchModal';
import { Footer } from './components/Footer';

export default function App() {
  // PRODUCTS STATE (Empty by default for official store launch - no fake/mock items!)
  const [productsList, setProductsList] = useState<Product[]>(() => {
    const saved = localStorage.getItem('resellix_products_v3');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      } catch (e) {
        console.error('Failed to parse saved products:', e);
      }
    }
    return []; // Empty by default! Ready for owner to upload real inventory
  });

  useEffect(() => {
    localStorage.setItem('resellix_products_v3', JSON.stringify(productsList));
  }, [productsList]);

  // ORDERS STATE (Empty by default)
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('resellix_orders_v3');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      } catch (e) {
        console.error('Failed to parse saved orders:', e);
      }
    }
    return []; // Clean empty orders list
  });

  useEffect(() => {
    localStorage.setItem('resellix_orders_v3', JSON.stringify(orders));
  }, [orders]);

  // CART STATE (Empty by default)
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('resellix_cart_v3');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      } catch (e) {
        console.error('Failed to parse cart:', e);
      }
    }
    return []; // Clean empty cart
  });

  useEffect(() => {
    localStorage.setItem('resellix_cart_v3', JSON.stringify(cart));
  }, [cart]);

  // WISHLIST STATE (Empty by default)
  const [wishlist, setWishlist] = useState<Product[]>(() => {
    const saved = localStorage.getItem('resellix_wishlist_v3');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      } catch (e) {
        console.error('Failed to parse wishlist:', e);
      }
    }
    return []; // Clean empty wishlist
  });

  useEffect(() => {
    localStorage.setItem('resellix_wishlist_v3', JSON.stringify(wishlist));
  }, [wishlist]);

  // STORE PAYMENT & BANK SETTINGS (Configured by owner)
  const [storePaymentSettings, setStorePaymentSettings] = useState<StorePaymentSettings>(() => {
    const saved = localStorage.getItem('resellix_payment_settings_v1');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse payment settings:', e);
      }
    }
    return {
      ownerName: 'Alexandru Stănescu / ReSellix SRL',
      bankName: 'Banca Transilvania',
      iban: 'RO49 BTRL 0000 1209 8831 22XX',
      revolutTag: '@alexandru.resellix',
      enableCod: true,
      enableCard: true,
      enableRevolut: true
    };
  });

  const handleUpdatePaymentSettings = (settings: StorePaymentSettings) => {
    setStorePaymentSettings(settings);
    localStorage.setItem('resellix_payment_settings_v1', JSON.stringify(settings));
    showToast('Datele bancare și setările de plată au fost salvate!');
  };

  // USER ACCOUNT STATE
  const [currentUser, setCurrentUser] = useState<UserAccount | null>({
    id: 'user-01',
    fullName: 'Andrei Popescu',
    email: 'andrei.popescu@gmail.com',
    phone: '0721 123 456',
    role: 'customer',
    savedAddresses: ['Str. Calea Victoriei nr. 120, Bl. C, Ap. 14, București'],
    ordersCount: 1
  });

  // COUPON CODE
  const [couponCode, setCouponCode] = useState<string>('RESELLIX10');
  const [discountPercent, setDiscountPercent] = useState<number>(0);

  // FILTERS STATE
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [selectedSize, setSelectedSize] = useState<string>('all');
  const [priceMax, setPriceMax] = useState<number>(1000);
  const [onlyInStock, setOnlyInStock] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // MODALS STATE
  const [detailProduct, setDetailProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);
  const [activeTrackingAwb, setActiveTrackingAwb] = useState<string | undefined>(undefined);
  const [invoiceOrder, setInvoiceOrder] = useState<Order | null>(null);
  const [legalTopic, setLegalTopic] = useState<LegalTopic | null>(null);

  // TOAST FEEDBACK
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // RESTOCK NOTIFICATION SUBSCRIPTION FOR COMING SOON
  const [notifyContact, setNotifyContact] = useState<string>('');
  const [isSubscribedNotice, setIsSubscribedNotice] = useState<boolean>(false);

  const handleSubscribeNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!notifyContact.trim()) return;
    setIsSubscribedNotice(true);
    showToast('Vă mulțumim sincer! Veți primi notificare cu prioritate când sosește marfa.');
  };

  // Keyboard shortcut Ctrl+K / Cmd+K for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // CART OPERATIONS
  const handleAddToCart = (product: Product, size: string, quantity: number) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedSize === size
      );

      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity
        };
        return next;
      } else {
        return [...prev, { product, selectedSize: size, quantity }];
      }
    });

    showToast(`Adăugat în coș: ${product.name} (Mărime ${size})`);
  };

  const handleUpdateCartQuantity = (productId: string, size: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(productId, size);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId && item.selectedSize === size
          ? { ...item, quantity }
          : item
      )
    );
  };

  const handleRemoveFromCart = (productId: string, size: string) => {
    setCart((prev) =>
      prev.filter((item) => !(item.product.id === productId && item.selectedSize === size))
    );
    showToast('Produs eliminat din coș');
  };

  // WISHLIST TOGGLE
  const handleToggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        showToast(`Eliminat din favorite: ${product.name}`);
        return prev.filter((p) => p.id !== product.id);
      } else {
        showToast(`Salvat la favorite: ${product.name}`);
        return [...prev, product];
      }
    });
  };

  // APPLY COUPON
  const handleApplyCoupon = (code: string): boolean => {
    if (code === 'RESELLIX10' || code === 'POLO10' || code === 'SNEAKERS10') {
      setDiscountPercent(10);
      showToast('Cupon activat! -10% reducere aplicată');
      return true;
    }
    return false;
  };

  // ORDER PLACED (Update per-size inventory!)
  const handleOrderPlaced = (newOrder: Order) => {
    // 1. Decrement inventory stock per size
    setProductsList((prevProducts) =>
      prevProducts.map((p) => {
        const orderedItem = newOrder.items.find((item) => item.product.id === p.id);
        if (!orderedItem) return p;

        const updatedSizes = p.sizes.map((s) => {
          if (s.size === orderedItem.selectedSize) {
            return {
              ...s,
              stock: Math.max(0, s.stock - orderedItem.quantity)
            };
          }
          return s;
        });

        const isOutOfStockNow = updatedSizes.every((s) => s.stock === 0);

        return {
          ...p,
          sizes: updatedSizes,
          status: isOutOfStockNow ? 'epuizat' : p.status
        };
      })
    );

    // 2. Add to orders
    setOrders((prev) => [newOrder, ...prev]);

    // 3. Clear cart
    setCart([]);
    showToast(`Comanda #${newOrder.orderNumber} a fost înregistrată cu succes! Total: ${newOrder.total.toLocaleString('ro-RO')} LEI`);
  };

  // ORDER STATUS UPDATE
  const handleUpdateOrderStatus = (orderId: string, newStatus: OrderStatus, awb?: string) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId
          ? {
              ...o,
              orderStatus: newStatus,
              trackingNumber: awb || o.trackingNumber
            }
          : o
      )
    );
    showToast(`Statusul comenzii a fost actualizat la "${newStatus}"`);
  };

  // PRODUCT MANAGEMENT (ADD / EDIT / DELETE)
  const handleAddProduct = (newProd: Product) => {
    setProductsList((prev) => [newProd, ...prev]);
    showToast(`Produsul "${newProd.name}" a fost adăugat în catalog`);
  };

  const handleUpdateProduct = (updated: Product) => {
    setProductsList((prev) =>
      prev.map((p) => (p.id === updated.id ? updated : p))
    );
    showToast(`Produsul "${updated.name}" a fost actualizat`);
  };

  const handleDeleteProduct = (productId: string) => {
    setProductsList((prev) => prev.filter((p) => p.id !== productId));
    showToast('Produs șters din magazin');
  };

  const handleClearDemoData = () => {
    setProductsList([]);
    setOrders([]);
    setCart([]);
    showToast('Magazinul a fost golit complet pentru lansare oficială!');
  };

  const handleRestoreDemoData = () => {
    setProductsList(INITIAL_PRODUCTS);
    showToast('Produsele demonstrative au fost restaurate pentru testare.');
  };

  // FILTERED CATALOG LOGIC
  const filteredProducts = useMemo(() => {
    return productsList.filter((product) => {
      // Category filter
      if (selectedCategory !== 'all') {
        if (selectedCategory === 'deals') {
          if (!product.originalPriceRon || product.originalPriceRon <= product.priceRon) {
            return false;
          }
        } else if (product.category !== selectedCategory) {
          return false;
        }
      }

      // Brand filter
      if (selectedBrand !== 'all' && selectedBrand !== 'Toate Brandurile') {
        if (product.brand !== selectedBrand) {
          return false;
        }
      }

      // Size filter
      if (selectedSize !== 'all') {
        const hasSize = product.sizes.some(
          (s) => s.size === selectedSize && s.stock > 0
        );
        if (!hasSize) return false;
      }

      // Price max
      if (product.priceRon > priceMax) {
        return false;
      }

      // In stock only
      if (onlyInStock) {
        const inStock = product.status === 'disponibil' && product.sizes.some((s) => s.stock > 0);
        if (!inStock) return false;
      }

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const match =
          product.name.toLowerCase().includes(q) ||
          product.brand.toLowerCase().includes(q) ||
          product.model.toLowerCase().includes(q) ||
          product.sku.toLowerCase().includes(q);
        if (!match) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.priceRon - b.priceRon;
      if (sortBy === 'price-desc') return b.priceRon - a.priceRon;
      if (sortBy === 'rating') return b.rating - a.rating;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [productsList, selectedCategory, selectedBrand, selectedSize, priceMax, onlyInStock, sortBy, searchQuery]);

  // Curated lists
  const popularSneakers = useMemo(() => {
    return productsList.filter((p) => p.tag === 'Popular' || p.rating >= 4.9).slice(0, 4);
  }, [productsList]);

  const latestDrops = useMemo(() => {
    return [...productsList].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    ).slice(0, 4);
  }, [productsList]);

  const specialDeals = useMemo(() => {
    return productsList.filter(
      (p) => p.originalPriceRon && p.originalPriceRon > p.priceRon
    ).slice(0, 4);
  }, [productsList]);

  return (
    <div className="min-h-screen bg-black text-neutral-200 selection:bg-white selection:text-black font-sans antialiased">
      
      {/* Toast Notification Container */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-neutral-900 border border-neutral-700 text-white px-4 py-3 rounded-xl shadow-2xl font-mono text-xs flex items-center gap-2.5 animate-in slide-in-from-bottom-5 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Primary Sticky Header */}
      <Navbar
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        wishlistCount={wishlist.length}
        selectedCategory={selectedCategory}
        selectedBrand={selectedBrand}
        onSelectCategory={(cat) => setSelectedCategory(cat)}
        onSelectBrand={(brand) => setSelectedBrand(brand)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenAccount={() => setIsAccountOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenTracking={() => {
          setActiveTrackingAwb(undefined);
          setIsTrackingOpen(true);
        }}
        onOpenLegal={(topic) => setLegalTopic(topic)}
      />

      {/* Main Hero Banner: "Your Style. Your Rules." */}
      <HeroBanner
        onExploreClick={() => {
          const catalogEl = document.getElementById('catalog-section');
          if (catalogEl) catalogEl.scrollIntoView({ behavior: 'smooth' });
        }}
        onSelectBrand={(brand) => {
          setSelectedBrand(brand);
          const catalogEl = document.getElementById('catalog-section');
          if (catalogEl) catalogEl.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenLegal={(topic) => setLegalTopic(topic)}
      />

      {/* Polite Announcement Section - Marfă în curs de sosire */}
      {productsList.length === 0 ? (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 border-b border-neutral-850">
          <div className="relative overflow-hidden bg-gradient-to-b from-neutral-900/90 via-neutral-950 to-neutral-900 border border-neutral-800 rounded-3xl p-8 sm:p-12 shadow-2xl">
            {/* Subtle glow effect */}
            <div className="absolute top-0 right-1/4 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-neutral-700/15 rounded-full blur-3xl pointer-events-none" />

            <div className="relative max-w-3xl mx-auto text-center space-y-6">
              {/* Polite Status Pill */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-mono text-xs font-semibold uppercase tracking-wider">
                <Clock className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                <span>Recepție Marfă în Curs · Lansare Iminentă</span>
              </div>

              {/* Headline */}
              <div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-mono tracking-tight text-white uppercase leading-tight">
                  Vom aduce marfă curând
                </h2>
                <p className="text-neutral-400 font-mono text-xs sm:text-sm uppercase tracking-widest mt-2">
                  Stoc exclusiv de sneakers & streetwear în pregătire
                </p>
              </div>

              {/* Polite Letter Body */}
              <div className="text-sm sm:text-base text-neutral-300 leading-relaxed font-sans space-y-3.5 bg-neutral-950/70 p-6 sm:p-8 rounded-2xl border border-neutral-800/80 text-left sm:text-center shadow-inner">
                <p className="font-semibold text-white text-base">
                  Stimați clienți și oaspeți ReSellix,
                </p>
                <p>
                  Vă mulțumim că ați trecut pragul magazinului nostru! Vă anunțăm cu mult entuziasm că echipa <strong className="text-white font-mono">ReSellix</strong> recepționează în aceste momente un nou lot fizic exclusiv de sneakers și articole streetwear autentice.
                </p>
                <p className="text-neutral-400 text-xs sm:text-sm">
                  În cel mai scurt timp vom expune pe site selecția proaspătă: <strong className="text-neutral-200">șepci Polo Ralph Lauren</strong>, sneakers originali <strong className="text-neutral-200">Adidas Yeezy, Nike Dunk & Air Jordan, New Balance, Asics</strong> și piese streetwear <strong className="text-neutral-200">Fear of God Essentials</strong>. Fiecare produs trece prin procesul nostru manual de verificare a autenticității înainte de listare.
                </p>

                <div className="pt-3 border-t border-neutral-800 flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-neutral-400">
                  <span className="flex items-center gap-1.5 text-emerald-400">
                    <ShieldCheck className="w-4 h-4" /> 100% Produse Autentice
                  </span>
                  <span className="text-neutral-700 hidden sm:inline">·</span>
                  <span className="flex items-center gap-1.5 text-neutral-300">
                    <Truck className="w-4 h-4 text-neutral-400" /> Livrare Rapidă 24-48h Fan Courier
                  </span>
                  <span className="text-neutral-700 hidden sm:inline">·</span>
                  <span className="flex items-center gap-1.5 text-neutral-300">
                    <Package className="w-4 h-4 text-emerald-400" /> Plată Ramburs la Livrare & Card
                  </span>
                </div>
              </div>

              {/* Subscriber Notification Form */}
              <div className="pt-2 max-w-md mx-auto">
                {isSubscribedNotice ? (
                  <div className="p-4 bg-emerald-950/60 border border-emerald-600/40 rounded-xl text-emerald-300 font-mono text-xs flex items-center justify-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Vă mulțumim sincer! Ați fost înscris pe lista de prioritate VIP. Vă vom notifica imediat ce primul produs este disponibil!</span>
                  </div>
                ) : (
                  <form onSubmit={handleSubscribeNotice} className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="text"
                      required
                      placeholder="Email sau număr de telefon..."
                      value={notifyContact}
                      onChange={(e) => setNotifyContact(e.target.value)}
                      className="flex-1 bg-black/80 border border-neutral-700 rounded-xl px-4 py-3 text-xs sm:text-sm font-mono text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500"
                    />
                    <button
                      type="submit"
                      className="px-6 py-3 bg-white hover:bg-neutral-200 text-black font-mono font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg shrink-0 flex items-center justify-center gap-1.5 active:scale-95"
                    >
                      <Bell className="w-3.5 h-3.5" />
                      <span>Anunță-mă la Drop</span>
                    </button>
                  </form>
                )}
                <p className="text-[11px] text-neutral-500 font-mono mt-2 text-center">
                  Vă respectăm intimitatea. Vă vom contacta exclusiv la deschiderea primului drop de marfă.
                </p>
              </div>

              {/* Discreet Store Owner Panel Link */}
              <div className="pt-6 border-t border-neutral-850 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-neutral-500">
                <span className="text-[11px]">
                  Ești administratorul ReSellix?
                </span>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setIsAdminOpen(true)}
                    className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1.5 font-semibold text-xs"
                  >
                    <Camera className="w-3.5 h-3.5" />
                    <span>📸 Încarcă marfă fizică (AI Photo Lab)</span>
                  </button>
                  <span className="text-neutral-700">|</span>
                  <button
                    onClick={handleRestoreDemoData}
                    className="text-neutral-400 hover:text-white underline text-[11px]"
                  >
                    Restaurează exemple demo
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <>
          {/* SECTION 1: PRODUSE POPULARE (Most wanted kicks) */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-neutral-850">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono uppercase text-emerald-400 font-bold mb-1">
                  <Flame className="w-4 h-4 text-amber-400" />
                  <span>Cele Mai Râvnite</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black font-mono uppercase tracking-tight text-white">
                  Produse Populare ReSellix
                </h2>
              </div>

              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedBrand('all');
                  const catalogEl = document.getElementById('catalog-section');
                  if (catalogEl) catalogEl.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-xs font-mono uppercase font-bold text-neutral-400 hover:text-white flex items-center gap-1 transition-colors self-start sm:self-auto"
              >
                <span>Vezi Tot Catalogul</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {popularSneakers.map((prod) => (
                <ProductCard
                  key={prod.id}
                  product={prod}
                  isWishlisted={wishlist.some((w) => w.id === prod.id)}
                  onSelectProduct={(p) => setDetailProduct(p)}
                  onToggleWishlist={handleToggleWishlist}
                  onQuickAdd={(p) => setDetailProduct(p)}
                />
              ))}
            </div>
          </section>

          {/* SECTION 2: CELE MAI NOI PRODUSE (Fresh Drops) */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-neutral-850">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono uppercase text-neutral-400 font-bold mb-1">
                  <Sparkles className="w-4 h-4 text-white" />
                  <span>Ultimele Adăugiri în Depozit</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black font-mono uppercase tracking-tight text-white">
                  Cele Mai Noi Produse
                </h2>
              </div>

              <div className="text-xs font-mono text-neutral-400">
                Verificate & gata de expediere în 24h
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {latestDrops.map((prod) => (
                <ProductCard
                  key={prod.id}
                  product={prod}
                  isWishlisted={wishlist.some((w) => w.id === prod.id)}
                  onSelectProduct={(p) => setDetailProduct(p)}
                  onToggleWishlist={handleToggleWishlist}
                  onQuickAdd={(p) => setDetailProduct(p)}
                />
              ))}
            </div>
          </section>

          {/* SECTION 3: OFERTE SPECIALE (Deals) */}
          {specialDeals.length > 0 && (
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-neutral-850">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono uppercase text-red-500 font-bold mb-1">
                    <span>Reduceri Limitate</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black font-mono uppercase tracking-tight text-white">
                    Oferte Speciale
                  </h2>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {specialDeals.map((prod) => (
                  <ProductCard
                    key={prod.id}
                    product={prod}
                    isWishlisted={wishlist.some((w) => w.id === prod.id)}
                    onSelectProduct={(p) => setDetailProduct(p)}
                    onToggleWishlist={handleToggleWishlist}
                    onQuickAdd={(p) => setDetailProduct(p)}
                  />
                ))}
              </div>
            </section>
          )}
        </>
      )}

      {/* MAIN CATALOG WITH FILTERS */}
      <section id="catalog-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Section Title & Total Counter */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-850">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black font-mono uppercase tracking-tight text-white">
              Catalog Complet ReSellix
            </h2>
            <p className="text-xs text-neutral-400 font-mono mt-1">
              Filtrează după brand, mărime disponibilă, preț și disponibilitate
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-neutral-400">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'produs găsit' : 'produse găsite'}
            </span>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="py-6 grid grid-cols-1 md:grid-cols-4 gap-4 text-xs font-mono">
          
          {/* Brand Filter */}
          <div>
            <label className="text-neutral-400 uppercase text-[10px] block mb-1.5 font-bold">
              Brand:
            </label>
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="w-full bg-neutral-900 border border-neutral-800 rounded-lg p-2.5 text-white font-mono focus:outline-none focus:border-neutral-600"
            >
              <option value="all">Toate Brandurile</option>
              <option value="Nike">Nike</option>
              <option value="Jordan">Jordan</option>
              <option value="Adidas">Adidas</option>
              <option value="Yeezy">Yeezy</option>
              <option value="New Balance">New Balance</option>
              <option value="Asics">Asics</option>
              <option value="Puma">Puma</option>
              <option value="Fear of God">Fear of God</option>
              <option value="Polo Ralph Lauren">Polo Ralph Lauren</option>
            </select>
          </div>

          {/* Category Filter */}
          <div>
            <label className="text-neutral-400 uppercase text-[10px] block mb-1.5 font-bold">
              Categorie:
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-neutral-900 border border-neutral-800 rounded-lg p-2.5 text-white font-mono focus:outline-none focus:border-neutral-600"
            >
              <option value="all">Toate Categoriile</option>
              <option value="Sneakers">Sneakers</option>
              <option value="Îmbrăcăminte">Îmbrăcăminte</option>
              <option value="Accesorii">Accesorii</option>
              <option value="deals">Oferte Speciale</option>
            </select>
          </div>

          {/* Size Filter */}
          <div>
            <label className="text-neutral-400 uppercase text-[10px] block mb-1.5 font-bold">
              Mărime Disponibilă:
            </label>
            <select
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
              className="w-full bg-neutral-900 border border-neutral-800 rounded-lg p-2.5 text-white font-mono focus:outline-none focus:border-neutral-600"
            >
              <option value="all">Toate Mărimile</option>
              {SIZES_FILTER_LIST.map((sz) => (
                <option key={sz} value={sz}>{sz}</option>
              ))}
            </select>
          </div>

          {/* Sort By */}
          <div>
            <label className="text-neutral-400 uppercase text-[10px] block mb-1.5 font-bold">
              Sortare:
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full bg-neutral-900 border border-neutral-800 rounded-lg p-2.5 text-white font-mono focus:outline-none focus:border-neutral-600"
            >
              <option value="featured">Cele mai noi produse</option>
              <option value="price-asc">Preț: Crescător</option>
              <option value="price-desc">Preț: Descrescător</option>
              <option value="rating">Cele mai apreciate</option>
            </select>
          </div>

        </div>

        {/* Secondary Filter Row: Price Slider & In Stock Toggle */}
        <div className="pb-8 flex flex-wrap items-center justify-between gap-4 text-xs font-mono bg-neutral-950 p-4 rounded-xl border border-neutral-850">
          <div className="flex items-center gap-3">
            <span className="text-neutral-400">Preț Maxim:</span>
            <input
              type="range"
              min="200"
              max="1200"
              step="50"
              value={priceMax}
              onChange={(e) => setPriceMax(Number(e.target.value))}
              className="w-36 sm:w-48 accent-white"
            />
            <span className="font-bold text-white font-mono">{priceMax} RON</span>
          </div>

          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={onlyInStock}
              onChange={(e) => setOnlyInStock(e.target.checked)}
              className="rounded accent-emerald-500 w-4 h-4 bg-neutral-900 border-neutral-700"
            />
            <span className="text-neutral-300">Afișează doar produsele în stoc</span>
          </label>

          {(selectedBrand !== 'all' || selectedCategory !== 'all' || selectedSize !== 'all' || priceMax < 1000 || onlyInStock) && (
            <button
              onClick={() => {
                setSelectedBrand('all');
                setSelectedCategory('all');
                setSelectedSize('all');
                setPriceMax(1000);
                setOnlyInStock(false);
              }}
              className="text-neutral-400 hover:text-white underline text-[11px]"
            >
              Resetează toate filtrele
            </button>
          )}
        </div>

        {/* Catalog Grid */}
        {productsList.length === 0 ? (
          <div className="text-center py-16 p-8 border border-neutral-850 rounded-2xl bg-neutral-950/80 space-y-4 font-mono">
            <div className="w-12 h-12 rounded-full bg-neutral-900 border border-neutral-800 text-emerald-400 flex items-center justify-center mx-auto">
              <Clock className="w-6 h-6 animate-pulse" />
            </div>
            <span className="text-xs uppercase font-bold tracking-widest text-emerald-400 block">
              STOC FIZIC ÎN REPOZITIONARE & AUTENTIFICARE
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-white">
              Vă mulțumim pentru răbdare! Vom aduce marfa în cel mai scurt timp.
            </h3>
            <p className="text-xs text-neutral-400 max-w-lg mx-auto leading-relaxed">
              Stimate vizitator, stocul nostru se reînnoiește periodic. Noul drop ce include șepci Polo Ralph Lauren, sneakers Yeezy, Nike, Jordan și Essentials va fi afișat aici de îndată ce produsele fizice sunt recepționate și fotografiate.
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => setIsAdminOpen(true)}
                className="px-5 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-emerald-400 border border-emerald-500/30 text-xs font-bold uppercase rounded-lg transition-colors flex items-center gap-2"
              >
                <Camera className="w-3.5 h-3.5" />
                <span>Panou Owner: Încarcă Marfă</span>
              </button>
              <button
                onClick={handleRestoreDemoData}
                className="px-5 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white border border-neutral-800 text-xs rounded-lg transition-colors"
              >
                Restaurează Exemple Demo
              </button>
            </div>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20 p-8 border border-neutral-800 rounded-2xl bg-neutral-950 space-y-4 font-mono">
            <AlertCircle className="w-10 h-10 mx-auto text-neutral-600" />
            <h3 className="text-base font-bold text-white">Niciun produs nu corespunde filtrelor selectate</h3>
            <p className="text-xs text-neutral-400 max-w-md mx-auto">
              Încearcă să resetezi filtrele sau să alegi alt brand sau mărime pentru a descoperi colecția ReSellix.
            </p>
            <button
              onClick={() => {
                setSelectedBrand('all');
                setSelectedCategory('all');
                setSelectedSize('all');
                setPriceMax(1000);
                setOnlyInStock(false);
              }}
              className="px-6 py-2.5 bg-white text-black font-bold text-xs uppercase rounded-lg hover:bg-neutral-200 transition-colors"
            >
              Resetează Filtrele
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((prod) => (
              <ProductCard
                key={prod.id}
                product={prod}
                isWishlisted={wishlist.some((w) => w.id === prod.id)}
                onSelectProduct={(p) => setDetailProduct(p)}
                onToggleWishlist={handleToggleWishlist}
                onQuickAdd={(p) => setDetailProduct(p)}
              />
            ))}
          </div>
        )}

      </section>

      {/* FLOATING OWNER SHORTCUT BAR */}
      <div className="fixed bottom-4 left-4 z-40 hidden sm:flex items-center gap-2 bg-neutral-900/90 backdrop-blur-md border border-neutral-700 px-3 py-1.5 rounded-full shadow-2xl text-xs font-mono">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-neutral-400">ReSellix Owner:</span>
        <button
          onClick={() => setIsAdminOpen(true)}
          className="text-white hover:text-emerald-400 font-bold transition-colors underline"
        >
          Panou Admin & AI Photo Lab
        </button>
      </div>

      {/* FOOTER */}
      <Footer
        onOpenTracking={() => {
          setActiveTrackingAwb(undefined);
          setIsTrackingOpen(true);
        }}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          const catalogEl = document.getElementById('catalog-section');
          if (catalogEl) catalogEl.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenLegal={(topic) => setLegalTopic(topic)}
      />

      {/* MODALS */}
      {/* 1. Product Detail Page (Modal) */}
      <ProductDetailModal
        product={detailProduct}
        allProducts={productsList}
        isWishlisted={detailProduct ? wishlist.some((w) => w.id === detailProduct.id) : false}
        onClose={() => setDetailProduct(null)}
        onAddToCart={handleAddToCart}
        onToggleWishlist={handleToggleWishlist}
        onDirectCheckout={(prod, size, qty) => {
          handleAddToCart(prod, size, qty);
          setDetailProduct(null);
          setIsCheckoutOpen(true);
        }}
        onSelectRelatedProduct={(rel) => setDetailProduct(rel)}
      />

      {/* 2. Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        cart={cart}
        onClose={() => setIsCartOpen(false)}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveFromCart}
        onProceedToCheckout={() => setIsCheckoutOpen(true)}
        couponCode={couponCode}
        appliedDiscountPercent={discountPercent}
        onApplyCoupon={handleApplyCoupon}
      />

      {/* 3. Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        cart={cart}
        discountPercent={discountPercent}
        storePaymentSettings={storePaymentSettings}
        onClose={() => setIsCheckoutOpen(false)}
        onOrderPlaced={handleOrderPlaced}
        onViewInvoice={(ord) => setInvoiceOrder(ord)}
      />

      {/* 4. Customer Account Modal */}
      <AccountModal
        isOpen={isAccountOpen}
        user={currentUser}
        userOrders={orders}
        wishlist={wishlist}
        onClose={() => setIsAccountOpen(false)}
        onLogin={(acc) => {
          setCurrentUser(acc);
          showToast(`Bun venit, ${acc.fullName}!`);
        }}
        onLogout={() => {
          setCurrentUser(null);
          showToast('Ai fost deconectat');
        }}
        onTrackOrder={(awb) => {
          setActiveTrackingAwb(awb);
          setIsAccountOpen(false);
          setIsTrackingOpen(true);
        }}
        onViewInvoice={(ord) => setInvoiceOrder(ord)}
        onViewProduct={(prod) => {
          setIsAccountOpen(false);
          setDetailProduct(prod);
        }}
      />

      {/* 5. Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        wishlist={wishlist}
        onClose={() => setIsWishlistOpen(false)}
        onRemoveFromWishlist={handleToggleWishlist}
        onSelectProduct={(p: Product) => {
          setIsWishlistOpen(false);
          setDetailProduct(p);
        }}
      />

      {/* 6. Admin Panel with Inventory & AI Photo Lab & Payment Settings */}
      <AdminPanel
        isOpen={isAdminOpen}
        products={productsList}
        orders={orders}
        storePaymentSettings={storePaymentSettings}
        onClose={() => setIsAdminOpen(false)}
        onAddProduct={handleAddProduct}
        onUpdateProduct={handleUpdateProduct}
        onDeleteProduct={handleDeleteProduct}
        onUpdateOrderStatus={handleUpdateOrderStatus}
        onViewInvoice={(ord) => setInvoiceOrder(ord)}
        onClearDemoData={handleClearDemoData}
        onRestoreDemoData={handleRestoreDemoData}
        onUpdatePaymentSettings={handleUpdatePaymentSettings}
      />

      {/* 7. Manual Add Product Modal */}
      <AddProductModal
        isOpen={isAddProductOpen}
        onClose={() => setIsAddProductOpen(false)}
        onAddProduct={handleAddProduct}
      />

      {/* 8. Order Tracking Modal */}
      <OrderTrackingModal
        isOpen={isTrackingOpen}
        initialOrderNumber={activeTrackingAwb}
        userOrders={orders}
        onClose={() => setIsTrackingOpen(false)}
      />

      {/* 9. Tax Invoice Modal */}
      <InvoiceModal
        order={invoiceOrder}
        onClose={() => setInvoiceOrder(null)}
      />

      {/* 10. Legal & Guarantees Modals */}
      <LegalModals
        topic={legalTopic}
        onClose={() => setLegalTopic(null)}
      />

      {/* 11. Search Modal (Ctrl+K) */}
      <SearchModal
        isOpen={isSearchOpen}
        products={productsList}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={(p) => setDetailProduct(p)}
      />

    </div>
  );
}
