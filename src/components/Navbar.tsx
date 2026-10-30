import React, { useState } from 'react';
import { 
  Search, 
  Heart, 
  ShoppingBag, 
  User, 
  ShieldCheck, 
  SlidersHorizontal, 
  Menu, 
  X, 
  Sparkles, 
  Package, 
  Truck,
  CheckCircle2
} from 'lucide-react';
import { ProductCategory, BrandName, UserAccount } from '../types/resellix';

interface NavbarProps {
  cartCount: number;
  wishlistCount: number;
  productsCount?: number;
  currentUser?: UserAccount | null;
  selectedCategory: string;
  selectedBrand: string;
  onSelectCategory: (category: string) => void;
  onSelectBrand: (brand: string) => void;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenSearch: () => void;
  onOpenAccount: () => void;
  onOpenAdmin: () => void;
  onOpenTracking: () => void;
  onOpenLegal: (topic: 'auth' | 'delivery' | 'return' | 'terms') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  wishlistCount,
  productsCount = 0,
  currentUser,
  selectedCategory,
  selectedBrand,
  onSelectCategory,
  onSelectBrand,
  onOpenCart,
  onOpenWishlist,
  onOpenSearch,
  onOpenAccount,
  onOpenAdmin,
  onOpenTracking,
  onOpenLegal
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const hasProducts = productsCount > 0;

  const navCategories: { label: string; value: string }[] = [
    { label: 'Toate', value: 'all' },
    { label: 'Sneakers', value: 'Sneakers' },
    { label: 'Îmbrăcăminte', value: 'Îmbrăcăminte' },
    { label: 'Accesorii', value: 'Accesorii' },
    { label: 'Oferte Speciale', value: 'deals' }
  ];

  const handleNavClick = (value: string) => {
    onSelectCategory(value);
    setMobileMenuOpen(false);
    const catalogEl = document.getElementById('catalog-section');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Top Announcement Bar - Active In-Stock Collection or Drop Preparation */}
      <div className="bg-gradient-to-r from-neutral-900 via-neutral-950 to-neutral-900 text-neutral-200 text-xs py-2 px-4 border-b border-neutral-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-mono text-[11px] font-semibold tracking-wider uppercase">
              <Sparkles className="w-3 h-3 text-emerald-400 shrink-0" />
              <span>{hasProducts ? 'Stoc Activ' : 'Drop 01 în Pregătire'}</span>
            </span>
            <span className="text-xs text-neutral-300 font-medium font-mono">
              {hasProducts 
                ? 'Nike, Jordan, Adidas Samba, Yeezy & New Balance disponibile imediat. Livrare rapidă 24-48h.'
                : 'Recepționăm marfa fizică originală. Înscrie-te pentru notificare VIP și acces prioritar la lansare.'}
            </span>
          </div>

          <div className="flex items-center gap-3 text-[11px] text-neutral-400 shrink-0 font-mono">
            <span className="flex items-center gap-1 text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>100% Autentic Verificat</span>
            </span>
            <span className="text-neutral-700">·</span>
            <span className="flex items-center gap-1 text-neutral-300">
              <Truck className="w-3.5 h-3.5 text-neutral-400" />
              <span>Fan Courier & Sameday Easybox</span>
            </span>
          </div>
        </div>
      </div>


      {/* Main Sticky Header */}
      <header className="sticky top-0 z-40 bg-black/95 backdrop-blur-md border-b border-neutral-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4 sm:gap-8">
          
          {/* Logo & Tagline */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => {
                onSelectCategory('all');
                onSelectBrand('all');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-left group focus-visible:outline-none"
            >
              <span className="text-2xl sm:text-3xl font-black tracking-tight text-white font-mono uppercase group-hover:text-neutral-300 transition-colors">
                ReSellix<span className="text-emerald-400">.</span>
              </span>
              <span className="hidden lg:block text-[10px] tracking-widest text-neutral-500 uppercase font-mono font-medium -mt-1">
                Sneakers & Streetwear Vault
              </span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-neutral-300">
            {navCategories.map((cat) => {
              const isActive = selectedCategory === cat.value;
              return (
                <button
                  key={cat.value}
                  onClick={() => handleNavClick(cat.value)}
                  className={`relative py-1 transition-colors whitespace-nowrap ${
                    isActive ? 'text-white font-semibold' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {cat.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-white" />
                  )}
                </button>
              );
            })}

            <button
              onClick={() => {
                const brandsEl = document.getElementById('brands-section');
                if (brandsEl) brandsEl.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-neutral-400 hover:text-white transition-colors whitespace-nowrap"
            >
              Branduri
            </button>
          </nav>

          {/* Action Icons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="p-2.5 text-neutral-400 hover:text-white hover:bg-neutral-900 rounded-full transition-colors relative"
              title="Căutare produse (Ctrl+K)"
              aria-label="Căutare"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist */}
            <button
              onClick={onOpenWishlist}
              className="p-2.5 text-neutral-400 hover:text-white hover:bg-neutral-900 rounded-full transition-colors relative"
              title="Favorite"
              aria-label="Favorite"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 bg-white text-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center font-mono">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Account */}
            <button
              onClick={onOpenAccount}
              className="p-2.5 text-neutral-400 hover:text-white hover:bg-neutral-900 rounded-full transition-colors relative"
              title={currentUser ? `Contul Meu: ${currentUser.fullName}` : 'Autentificare / Creează Cont'}
              aria-label="Contul Meu"
            >
              <User className="w-5 h-5" />
              {currentUser && (
                <span className="absolute bottom-1 right-1 w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-neutral-950" />
              )}
            </button>

            {/* Cart Trigger */}
            <button
              onClick={onOpenCart}
              className="flex items-center gap-2 px-3.5 py-2 bg-white text-black hover:bg-neutral-200 rounded-full font-medium text-sm transition-all shadow-sm"
              aria-label="Coș de cumpărături"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline font-mono text-xs font-bold">Coș</span>
              <span className="bg-black text-white text-[11px] font-mono px-1.5 py-0.2 rounded-full font-bold">
                {cartCount}
              </span>
            </button>

            {/* Owner / Admin Toggle */}
            <button
              onClick={onOpenAdmin}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-700 rounded-full text-xs font-mono transition-colors"
              title="Deschide Panoul de Administrare Magazin și AI Photo Lab"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-emerald-400" />
              <span>Admin / Stoc</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-neutral-400 hover:text-white hover:bg-neutral-900 rounded-lg transition-colors"
              aria-label="Meniu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-neutral-950 border-b border-neutral-800 px-4 py-6 space-y-4 animate-in slide-in-from-top duration-200">
            <div className="grid grid-cols-2 gap-2 text-sm">
              {navCategories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => handleNavClick(cat.value)}
                  className={`p-3 text-left rounded-lg transition-colors ${
                    selectedCategory === cat.value
                      ? 'bg-neutral-800 text-white font-semibold'
                      : 'bg-neutral-900 text-neutral-300 hover:bg-neutral-850'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="pt-4 border-t border-neutral-800 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="w-full flex items-center justify-between p-3 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 rounded-lg text-xs font-mono text-white"
              >
                <span className="flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-emerald-400" />
                  <span>Panou Administrare & AI Photo Lab</span>
                </span>
                <span className="text-[10px] bg-neutral-800 px-2 py-0.5 rounded text-neutral-400">Owner</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenTracking();
                }}
                className="w-full flex items-center gap-2 p-3 bg-neutral-900 text-neutral-300 hover:text-white rounded-lg text-xs"
              >
                <Truck className="w-4 h-4 text-neutral-400" />
                <span>Urmărește AWB Colet Fan Courier</span>
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
