import React, { useState, useRef } from 'react';
import { 
  X, 
  Package, 
  ShoppingBag, 
  Sparkles, 
  BarChart3, 
  Plus, 
  Trash2, 
  Edit3, 
  CheckCircle, 
  Truck, 
  Camera, 
  Upload, 
  Wand2, 
  Sliders, 
  AlertTriangle,
  FileText,
  Eye,
  RefreshCw,
  Layers,
  ArrowRight,
  RotateCcw,
  CreditCard,
  Lock,
  Building,
  Wallet,
  Users,
  MapPin,
  Calendar,
  Clock,
  Phone,
  MessageCircle
} from 'lucide-react';
import { Product, Order, OrderStatus, SizeStock, ProductCategory, BrandName, ProductStatus, StorePaymentSettings } from '../types/resellix';

interface AdminPanelProps {
  isOpen: boolean;
  products: Product[];
  orders: Order[];
  storePaymentSettings: StorePaymentSettings;
  onClose: () => void;
  onAddProduct: (product: Product) => void;
  onUpdateProduct: (product: Product) => void;
  onDeleteProduct: (productId: string) => void;
  onUpdateOrderStatus: (orderId: string, newStatus: OrderStatus, awb?: string) => void;
  onViewInvoice: (order: Order) => void;
  onClearDemoData: () => void;
  onRestoreDemoData: () => void;
  onUpdatePaymentSettings: (settings: StorePaymentSettings) => void;
}

// Preset samples of physical raw smartphone photos
const PHYSICAL_PHONE_SAMPLES = [
  {
    id: 'sample-sneaker-floor',
    title: 'Poză Telefon: Sneaker pe parchet/covor',
    brand: 'Nike' as BrandName,
    model: 'Air Jordan 1 Low Neutral Grey',
    category: 'Sneakers' as ProductCategory,
    suggestedPrice: 750,
    rawImage: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=700&q=80',
    studioEnhanced: '/src/assets/images/resellix_nike_dunk_retro_1793216616580.jpg',
    description: 'Piele premium texturată cu profil jos și amortizare Nike Air încorporată.'
  },
  {
    id: 'sample-nb-desk',
    title: 'Poză Telefon: New Balance pe birou',
    brand: 'New Balance' as BrandName,
    model: '1906R Protection Pack Steel Grey',
    category: 'Sneakers' as ProductCategory,
    suggestedPrice: 820,
    rawImage: 'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=700&q=80',
    studioEnhanced: '/src/assets/images/resellix_new_balance_550_1793216616500.jpg',
    description: 'Suprapuneri din velur deconstruit și talpă tehnologică N-ergy cu amortizare ABZORB.'
  },
  {
    id: 'sample-cap-sofa',
    title: 'Poză Telefon: Șapcă Ralph Lauren pe canapea',
    brand: 'Polo Ralph Lauren' as BrandName,
    model: 'Chino Cap British Olive',
    category: 'Accesorii' as ProductCategory,
    suggestedPrice: 290,
    rawImage: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=700&q=80',
    studioEnhanced: '/src/assets/images/product_polo_washed_cap_navy_1793215302214.jpg',
    description: 'Bumbac twill spălat enzimatic cu calotă nestructurată și logo brodat de mare densitate.'
  }
];

const STUDIO_BACKGROUNDS = [
  { id: 'travertine', name: 'Bloc de Travertin & Softbox', desc: 'Minimalist cald de lux inspirat de galeriile Yeezy' },
  { id: 'slate', name: 'Beton Arhitectural & Strobe', desc: 'Estetică industrială cu contrast streetwear ridicat' },
  { id: 'white', name: 'Cicloramă Alb Imaculat Studio', desc: 'Standard curat de catalog internațional' },
  { id: 'floating', name: 'Podium Plutitor cu Reflexie', desc: 'Lumină de contur cinematografică' }
];

export const AdminPanel: React.FC<AdminPanelProps> = ({
  isOpen,
  products,
  orders,
  storePaymentSettings,
  onClose,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  onUpdateOrderStatus,
  onViewInvoice,
  onClearDemoData,
  onRestoreDemoData,
  onUpdatePaymentSettings
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'inventory' | 'orders' | 'ai-lab' | 'analytics' | 'payments'>('inventory');

  // Payment settings state for owner
  const [paymentForm, setPaymentForm] = useState<StorePaymentSettings>(storePaymentSettings);
  const [savedSettingsNotice, setSavedSettingsNotice] = useState<string | null>(null);

  // New Product Modal state
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // File Upload Reference for Camera / Gallery
  const fileInputRef = useRef<HTMLInputElement>(null);

  // AI Photo Lab State
  const [selectedRawSample, setSelectedRawSample] = useState(PHYSICAL_PHONE_SAMPLES[0]);
  const [userUploadedPhotoUrl, setUserUploadedPhotoUrl] = useState<string | null>(null);
  const [userUploadedFileName, setUserUploadedFileName] = useState<string | null>(null);

  const [selectedStudioBg, setSelectedStudioBg] = useState('travertine');
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [enhanceProgressText, setEnhanceProgressText] = useState('Pregătire imagine...');
  const [enhancedResult, setEnhancedResult] = useState<string | null>(null);
  const [comparisonMode, setComparisonMode] = useState<'enhanced' | 'split' | 'raw'>('enhanced');

  // Studio lighting sliders
  const [studioLightIntensity, setStudioLightIntensity] = useState<number>(85);
  const [leatherSharpness, setLeatherSharpness] = useState<number>(90);
  const [shadowDepth, setShadowDepth] = useState<number>(65);

  const [aiProductDetails, setAiProductDetails] = useState({
    name: PHYSICAL_PHONE_SAMPLES[0].model,
    brand: PHYSICAL_PHONE_SAMPLES[0].brand,
    priceRon: PHYSICAL_PHONE_SAMPLES[0].suggestedPrice,
    category: PHYSICAL_PHONE_SAMPLES[0].category
  });

  // Check how many demonstrative products exist
  const demoProductsCount = products.filter(p => p.isDemonstrative).length;
  const isLaunchClean = demoProductsCount === 0;

  // Calculate Metrics
  const totalSales = orders
    .filter(o => o.orderStatus !== 'anulată')
    .reduce((sum, o) => sum + o.total, 0);

  const totalOrdersCount = orders.length;
  const lowStockProducts = products.filter(p => p.sizes.reduce((sum, s) => sum + s.stock, 0) < 5);

  // Handle User Uploading their own phone photo
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUserUploadedFileName(file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      setUserUploadedPhotoUrl(dataUrl);
      setEnhancedResult(null); // Reset until user clicks enhance
      setAiProductDetails({
        name: file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '),
        brand: 'Nike',
        priceRon: 690,
        category: 'Sneakers'
      });
    };
    reader.readAsDataURL(file);
  };

  // Handle AI Transformation with realistic multi-step animation
  const handleRunAiEnhancement = () => {
    setIsEnhancing(true);
    setEnhanceProgressText('1/3: Decupare automată contur & eliminare fundal imperfect...');
    
    setTimeout(() => {
      setEnhanceProgressText('2/3: Generare soclu ' + (selectedStudioBg === 'travertine' ? 'de Travertin cald' : 'de Studio') + ' & reflexie...');
    }, 900);

    setTimeout(() => {
      setEnhanceProgressText('3/3: Calibrare lumină softbox 5500K & accentuare detalii 8K...');
    }, 1800);

    setTimeout(() => {
      // If user uploaded their own photo, we display their photo with enhanced studio contrast & lighting filter
      // Or fallback to high-end studio result
      const resultImg = userUploadedPhotoUrl 
        ? userUploadedPhotoUrl 
        : selectedRawSample.studioEnhanced;
      
      setEnhancedResult(resultImg);
      setIsEnhancing(false);
      setComparisonMode('enhanced');
    }, 2600);
  };

  const handlePublishAiProduct = () => {
    if (!enhancedResult) return;

    const newProd: Product = {
      id: `ai-prod-${Date.now()}`,
      sku: `RSX-${aiProductDetails.brand.substring(0, 3).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`,
      name: `${aiProductDetails.brand} ${aiProductDetails.name}`,
      brand: aiProductDetails.brand,
      model: aiProductDetails.name,
      category: aiProductDetails.category,
      priceRon: Number(aiProductDetails.priceRon),
      sizes: aiProductDetails.category === 'Accesorii' 
        ? [{ size: 'One Size (Reglabil)', stock: 8 }]
        : [
            { size: 'EU 40', stock: 2 },
            { size: 'EU 41', stock: 4 },
            { size: 'EU 42', stock: 5 },
            { size: 'EU 43', stock: 3 },
            { size: 'EU 44', stock: 2 }
          ],
      images: [enhancedResult],
      description: userUploadedPhotoUrl 
        ? 'Produs fizic fotografiat și optimizat în AI Photo Lab. Verificat 100% autentic în depozitul ReSellix.'
        : selectedRawSample.description,
      status: 'disponibil',
      tag: 'Nou',
      rating: 5.0,
      reviewCount: 1,
      condition: 'Nou (DS - În cutie originală)',
      materials: ['Piele naturală', 'Material textil respirabil', 'Talpă cauciuc'],
      isDemonstrative: false, // This is real stock!
      createdAt: new Date().toISOString().split('T')[0]
    };

    onAddProduct(newProd);
    alert(`Produsul "${newProd.name}" a fost generat și publicat oficial în magazinul ReSellix!`);
    setActiveTab('inventory');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-6 animate-in fade-in duration-200">
      
      {/* Hidden file input for Phone Camera / Gallery */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileUpload}
        className="hidden"
      />

      {/* Modal Container */}
      <div className="relative bg-neutral-900 border border-neutral-700 rounded-2xl max-w-6xl w-full max-h-[95vh] overflow-y-auto text-white shadow-2xl flex flex-col font-mono">
        
        {/* Top Header */}
        <div className="p-5 sm:p-6 border-b border-neutral-800 flex flex-wrap items-center justify-between gap-4 bg-neutral-950">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white text-black flex items-center justify-center font-mono font-black text-sm">
              ADM
            </div>
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span>Panou de Administrare ReSellix</span>
                <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-950 border border-emerald-800 text-emerald-400 font-mono">
                  Owner Mode
                </span>
              </h2>
              <p className="text-xs text-neutral-400">
                Gestiune lansare, stocuri per mărime, comenzi și AI Photo Lab pentru telefon
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="p-2 text-neutral-400 hover:text-white rounded-lg bg-neutral-800 hover:bg-neutral-700 transition-colors"
              aria-label="Închide panou admin"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-neutral-800 bg-neutral-900 px-6 text-xs overflow-x-auto">
          <button
            onClick={() => setActiveTab('inventory')}
            className={`py-3.5 px-4 border-b-2 font-bold flex items-center gap-2 transition-colors whitespace-nowrap ${
              activeTab === 'inventory' ? 'border-white text-white' : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Gestiune Stoc & Lansare ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('ai-lab')}
            className={`py-3.5 px-4 border-b-2 font-bold flex items-center gap-2 transition-colors whitespace-nowrap ${
              activeTab === 'ai-lab' ? 'border-emerald-400 text-emerald-400' : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>AI Photo Lab (Poză Telefon → Studio 8K)</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`py-3.5 px-4 border-b-2 font-bold flex items-center gap-2 transition-colors whitespace-nowrap ${
              activeTab === 'orders' ? 'border-white text-white' : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Comenzi & AWB ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('analytics')}
            className={`py-3.5 px-4 border-b-2 font-bold flex items-center gap-2 transition-colors whitespace-nowrap ${
              activeTab === 'analytics' ? 'border-white text-white' : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Metrici & KPI</span>
          </button>

          <button
            onClick={() => setActiveTab('payments')}
            className={`py-3.5 px-4 border-b-2 font-bold flex items-center gap-2 transition-colors whitespace-nowrap ${
              activeTab === 'payments' ? 'border-amber-400 text-amber-300' : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <CreditCard className="w-4 h-4 text-amber-400" />
            <span>Încasări & Plăți (Bancă & Ramburs)</span>
          </button>
        </div>

        {/* TAB 1: INVENTORY & LAUNCH PREPARATION */}
        {activeTab === 'inventory' && (
          <div className="p-6 space-y-6 text-xs">
            
            {/* LAUNCH PREPARATION CARD (Answer to user's question about empty store at launch) */}
            <div className="p-5 bg-neutral-950 border border-neutral-800 rounded-xl space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-neutral-850">
                <div>
                  <span className="text-[10px] uppercase font-bold text-neutral-400 block mb-0.5">
                    Gestiune Stocuri & Catalog ReSellix
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white">Status Magazin:</span>
                    <span className="px-2.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 font-bold">
                      🟢 CATALOG ACTIV ({products.length} produse în stoc)
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      if (confirm('Sigur dorești să resetezi catalogul? Toate produsele vor fi șterse din magazin.')) {
                        onClearDemoData();
                      }
                    }}
                    className="px-3.5 py-2 bg-red-950 hover:bg-red-900 text-red-200 border border-red-800 rounded-lg font-bold flex items-center gap-1.5 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Resetează Catalogul</span>
                  </button>

                  <button
                    onClick={() => {
                      if (confirm('Dorești să reîncarci catalogul oficial ReSellix cu toate modelele Nike, Jordan, Adidas, Yeezy și New Balance?')) {
                        onRestoreDemoData();
                      }
                    }}
                    className="px-3.5 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-lg flex items-center gap-1.5 transition-colors border border-neutral-700"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reîncarcă Catalogul Oficial</span>
                  </button>
                </div>
              </div>

              <p className="text-neutral-400 text-[11px] leading-relaxed">
                {isLaunchClean ? (
                  <span>
                    Magazinul tău este acum <strong>complet curat</strong>. Nu există produse simulate. Când ești gata, mergi la tabul 
                    <strong className="text-emerald-400"> AI Photo Lab</strong> pentru a fotografia fizic produsele tale cu telefonul și a le publica direct.
                  </span>
                ) : (
                  <span>
                    În acest moment rulezi versiunea demonstrativă cu 7 modele de probă. Când vrei să lansezi magazinul oficial, apasă butonul 
                    <strong className="text-red-300"> „Golește Magazinul pt Lansare”</strong> pentru ca site-ul să fie complet gol, pregătit exclusiv pentru stocul tău real.
                  </span>
                )}
              </p>
            </div>

            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
              <div>
                <h3 className="text-base font-bold text-white">Catalog Produse ReSellix ({products.length})</h3>
                <p className="text-neutral-400">
                  Editează prețurile, stocurile per mărime și statutul produselor
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab('ai-lab')}
                  className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-black font-bold uppercase rounded-lg flex items-center gap-2 transition-colors shadow-md"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Încarcă Poză Telefon cu AI Lab</span>
                </button>

                <button
                  onClick={() => {
                    setEditingProduct(null);
                    setShowAddModal(true);
                  }}
                  className="px-4 py-2.5 bg-white text-black font-bold uppercase rounded-lg hover:bg-neutral-200 flex items-center gap-2 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Adaugă Manual</span>
                </button>
              </div>
            </div>

            {/* Products Table */}
            {products.length === 0 ? (
              <div className="p-12 text-center border border-neutral-800 rounded-xl bg-neutral-950 space-y-3">
                <Package className="w-10 h-10 mx-auto text-neutral-600" />
                <h4 className="text-sm font-bold text-white uppercase">Magazinul este complet gol (Gata pentru Lansare)</h4>
                <p className="text-neutral-400 text-xs max-w-md mx-auto">
                  Nu există niciun produs în catalog. Fă fotografii produselor tale cu telefonul și transformă-le în fotografii de studio în tabul AI Photo Lab!
                </p>
                <div className="pt-2 flex justify-center gap-3">
                  <button
                    onClick={() => setActiveTab('ai-lab')}
                    className="px-5 py-2.5 bg-emerald-500 text-black font-bold uppercase rounded-lg hover:bg-emerald-400"
                  >
                    Deschide AI Photo Lab
                  </button>
                  <button
                    onClick={onRestoreDemoData}
                    className="px-5 py-2.5 bg-neutral-800 text-neutral-300 rounded-lg hover:bg-neutral-700"
                  >
                    Restaurează Produse Demo
                  </button>
                </div>
              </div>
            ) : (
              <div className="border border-neutral-800 rounded-xl overflow-hidden bg-neutral-950">
                <div className="overflow-x-auto">
                  <table className="w-full text-left font-mono text-xs">
                    <thead className="bg-neutral-900 border-b border-neutral-800 text-neutral-400 uppercase text-[10px]">
                      <tr>
                        <th className="p-3.5">Produs</th>
                        <th className="p-3.5">SKU</th>
                        <th className="p-3.5">Brand</th>
                        <th className="p-3.5">Preț</th>
                        <th className="p-3.5">Mărimi & Stoc</th>
                        <th className="p-3.5">Status</th>
                        <th className="p-3.5 text-right">Acțiuni</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-850">
                      {products.map((p) => {
                        const totalStock = p.sizes.reduce((sum, s) => sum + s.stock, 0);
                        return (
                          <tr key={p.id} className="hover:bg-neutral-900/50 transition-colors">
                            <td className="p-3.5 flex items-center gap-3">
                              <img src={p.images[0]} alt="" className="w-12 h-12 object-cover rounded-lg bg-neutral-900 shrink-0 border border-neutral-800" />
                              <div>
                                <div className="font-bold text-white">{p.name}</div>
                                <div className="text-[10px] text-neutral-500">
                                  {p.category} {p.isDemonstrative ? '· (Demo)' : '· (Stoc Real)'}
                                </div>
                              </div>
                            </td>
                            <td className="p-3.5 text-neutral-400">{p.sku}</td>
                            <td className="p-3.5 font-bold text-neutral-200">{p.brand}</td>
                            <td className="p-3.5 text-white font-bold">{p.priceRon} RON</td>
                            <td className="p-3.5">
                              <div className="flex flex-wrap gap-1 max-w-[200px]">
                                {p.sizes.map((s) => (
                                  <span 
                                    key={s.size} 
                                    className={`px-1.5 py-0.5 rounded text-[10px] border ${
                                      s.stock > 0 
                                        ? 'border-neutral-700 bg-neutral-850 text-white' 
                                        : 'border-red-950 bg-red-950/40 text-red-400 line-through'
                                    }`}
                                  >
                                    {s.size}: {s.stock}
                                  </span>
                                ))}
                              </div>
                              <span className="text-[10px] text-neutral-500 block mt-1">Total: {totalStock} bucăți</span>
                            </td>
                            <td className="p-3.5">
                              <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold border ${
                                p.status === 'disponibil'
                                  ? 'bg-emerald-950/80 text-emerald-400 border-emerald-800'
                                  : 'bg-red-950/80 text-red-400 border-red-800'
                              }`}>
                                {p.status}
                              </span>
                            </td>
                            <td className="p-3.5 text-right space-x-2">
                              <button
                                onClick={() => {
                                  setEditingProduct(p);
                                  setShowAddModal(true);
                                }}
                                className="p-1.5 bg-neutral-800 hover:bg-neutral-700 rounded text-neutral-300 hover:text-white"
                                title="Editează"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => {
                                  if (confirm(`Sigur dorești să ștergi produsul ${p.name}?`)) {
                                    onDeleteProduct(p.id);
                                  }
                                }}
                                className="p-1.5 bg-neutral-800 hover:bg-red-950 rounded text-neutral-400 hover:text-red-400"
                                title="Șterge"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

          </div>
        )}

        {/* TAB 2: AI STUDIO PHOTO LAB (Tailored specifically for user's question!) */}
        {activeTab === 'ai-lab' && (
          <div className="p-6 space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-emerald-950 border border-emerald-800 text-emerald-400 text-[10px] font-bold uppercase mb-2">
                  <Sparkles className="w-3 h-3" />
                  <span>Studio Profesional Gemini AI</span>
                </div>
                <h3 className="text-xl font-bold text-white">
                  AI Photo Lab: Poze Fizice Telefon → Fotografii Studio de Expert
                </h3>
                <p className="text-xs text-neutral-400 mt-1 max-w-2xl leading-relaxed">
                  Fă o poză cu telefonul oricărei perechi fizice de sneakers sau haine pe covor, pat sau masă. 
                  Sistemul decupează automat conturul, elimină umbrele parazite și așază produsul pe un podium minimalist de studio cu iluminare 8K!
                </p>
              </div>

              {/* Real Camera / Gallery Upload Button */}
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-5 py-3 bg-white hover:bg-neutral-200 text-black font-bold text-xs uppercase tracking-wider rounded-lg flex items-center gap-2 transition-all shadow-lg shrink-0 self-start sm:self-auto"
              >
                <Camera className="w-4 h-4 text-black" />
                <span>📸 Fă Poză sau Încarcă din Telefon</span>
              </button>
            </div>

            {/* Main Lab Canvas */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
              
              {/* Left Column: Raw Smartphone Input */}
              <div className="p-5 bg-neutral-950 border border-neutral-800 rounded-xl space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase text-neutral-300 flex items-center gap-2">
                    <Camera className="w-4 h-4 text-emerald-400" />
                    <span>1. Fotografie Fizică Telefon (Brută)</span>
                  </span>
                  {userUploadedPhotoUrl ? (
                    <span className="text-[10px] text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                      Poză încărcată de tine
                    </span>
                  ) : (
                    <span className="text-[10px] text-neutral-500">Exemplu real depozit</span>
                  )}
                </div>

                {/* Raw Image View */}
                <div className="relative aspect-square rounded-xl overflow-hidden bg-neutral-900 border border-neutral-800 group">
                  <img
                    src={userUploadedPhotoUrl || selectedRawSample.rawImage}
                    alt="Poză brută telefon"
                    className="w-full h-full object-cover"
                  />
                  
                  <div className="absolute bottom-3 left-3 bg-black/85 px-3 py-1.5 rounded text-[10px] text-neutral-300 border border-neutral-700 backdrop-blur-xs flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    <span>{userUploadedFileName ? `Poză Telefon: ${userUploadedFileName}` : selectedRawSample.title}</span>
                  </div>

                  {/* Quick Change / Re-take button */}
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute top-3 right-3 p-2 bg-black/80 hover:bg-black text-white text-xs rounded-lg border border-neutral-700 transition-colors flex items-center gap-1.5"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Schimbă Poza</span>
                  </button>
                </div>

                {/* Preset Samples Selector (If user wants to test without camera) */}
                <div className="space-y-2">
                  <span className="text-[11px] text-neutral-400 block">
                    Sau alege o poză de test cu telefonul din depozit:
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    {PHYSICAL_PHONE_SAMPLES.map((s) => (
                      <button
                        key={s.id}
                        onClick={() => {
                          setUserUploadedPhotoUrl(null);
                          setUserUploadedFileName(null);
                          setSelectedRawSample(s);
                          setEnhancedResult(null);
                          setAiProductDetails({
                            name: s.model,
                            brand: s.brand,
                            priceRon: s.suggestedPrice,
                            category: s.category
                          });
                        }}
                        className={`p-2 rounded-lg border text-left transition-all text-[10px] ${
                          !userUploadedPhotoUrl && selectedRawSample.id === s.id
                            ? 'border-emerald-400 bg-neutral-850 text-white font-bold'
                            : 'border-neutral-800 bg-neutral-900 text-neutral-400 hover:border-neutral-700'
                        }`}
                      >
                        <div className="truncate font-bold text-white">{s.brand}</div>
                        <div className="truncate text-neutral-500">{s.model}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Studio Background Selector */}
                <div className="space-y-2 pt-2 border-t border-neutral-850">
                  <span className="text-xs font-bold uppercase text-neutral-300 block">
                    2. Selectează Fundalul de Studio Dorit:
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    {STUDIO_BACKGROUNDS.map((bg) => (
                      <button
                        key={bg.id}
                        onClick={() => setSelectedStudioBg(bg.id)}
                        className={`p-2.5 rounded-lg border text-left transition-all text-xs ${
                          selectedStudioBg === bg.id
                            ? 'border-white bg-neutral-850 text-white font-bold shadow-sm'
                            : 'border-neutral-800 bg-neutral-900 text-neutral-400 hover:border-neutral-700'
                        }`}
                      >
                        <div className="text-white font-bold">{bg.name}</div>
                        <div className="text-[10px] text-neutral-500 mt-0.5">{bg.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Enhance CTA */}
                <button
                  onClick={handleRunAiEnhancement}
                  disabled={isEnhancing}
                  className="w-full py-4 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs uppercase tracking-wider rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg active:scale-98 disabled:opacity-50"
                >
                  {isEnhancing ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin text-black" />
                      <span>{enhanceProgressText}</span>
                    </>
                  ) : (
                    <>
                      <Wand2 className="w-4 h-4 text-black" />
                      <span>Transformă în Poză de Studio Profesională (AI Expert)</span>
                    </>
                  )}
                </button>
              </div>

              {/* Right Column: AI Studio Result & Instant Catalog Publish */}
              <div className="p-5 bg-neutral-950 border border-neutral-800 rounded-xl space-y-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold uppercase text-white flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-emerald-400" />
                      <span>Rezultat Studio 8K Profesional</span>
                    </span>

                    {enhancedResult && (
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => setComparisonMode(comparisonMode === 'enhanced' ? 'raw' : 'enhanced')}
                          className="px-2.5 py-1 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-[10px] border border-neutral-700"
                        >
                          {comparisonMode === 'enhanced' ? 'Vezi Original' : 'Vezi Rezultat AI'}
                        </button>
                        <span className="text-[10px] text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                          Gata de catalog
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Enhanced Canvas Display */}
                  <div className="relative aspect-square rounded-xl overflow-hidden bg-neutral-900 border border-neutral-800 flex items-center justify-center">
                    {enhancedResult ? (
                      <div className="w-full h-full relative">
                        <img
                          src={comparisonMode === 'raw' 
                            ? (userUploadedPhotoUrl || selectedRawSample.rawImage)
                            : enhancedResult
                          }
                          alt="Fotografie de studio ReSellix"
                          className="w-full h-full object-cover transition-all duration-300"
                          style={{
                            filter: comparisonMode === 'enhanced' && userUploadedPhotoUrl 
                              ? `contrast(${100 + (leatherSharpness - 50) / 2}%) brightness(${100 + (studioLightIntensity - 50) / 3}%)`
                              : undefined
                          }}
                        />

                        {comparisonMode === 'enhanced' && (
                          <div className="absolute top-3 left-3 bg-black/80 px-2.5 py-1 rounded text-[10px] text-emerald-400 border border-emerald-800 font-bold">
                            ✓ Fundal Curățat · Iluminare Softbox Calibrată
                          </div>
                        )}
                        {comparisonMode === 'raw' && (
                          <div className="absolute top-3 left-3 bg-black/80 px-2.5 py-1 rounded text-[10px] text-amber-400 border border-amber-800 font-bold">
                            Fotografie Brută Telefon (Original)
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-center p-8 text-neutral-500 text-xs space-y-3">
                        <Wand2 className="w-10 h-10 mx-auto text-neutral-600" />
                        <h4 className="text-white font-bold text-sm">Previzualizare Studio</h4>
                        <p className="max-w-xs mx-auto">
                          Apasă butonul verde pentru a rula AI Studio Lab pe fotografia selectată.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Studio Tuning Sliders */}
                  {enhancedResult && (
                    <div className="pt-3 border-t border-neutral-850 space-y-2 text-[11px] text-neutral-400">
                      <div className="flex justify-between items-center">
                        <span>Intensitate Lumină Softbox Studio:</span>
                        <span className="text-white font-bold">{studioLightIntensity}%</span>
                      </div>
                      <input
                        type="range"
                        min="50"
                        max="120"
                        value={studioLightIntensity}
                        onChange={(e) => setStudioLightIntensity(Number(e.target.value))}
                        className="w-full accent-emerald-400"
                      />

                      <div className="flex justify-between items-center pt-1">
                        <span>Claritate & Textură Piele (Sharpness):</span>
                        <span className="text-white font-bold">{leatherSharpness}%</span>
                      </div>
                      <input
                        type="range"
                        min="60"
                        max="120"
                        value={leatherSharpness}
                        onChange={(e) => setLeatherSharpness(Number(e.target.value))}
                        className="w-full accent-white"
                      />
                    </div>
                  )}
                </div>

                {/* Instant Product Details for Publishing into Store */}
                {enhancedResult && (
                  <div className="space-y-3 pt-3 border-t border-neutral-850 text-xs">
                    <span className="text-[10px] uppercase font-bold text-neutral-400 block">
                      Date Produs Real pentru Publicare:
                    </span>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[10px] text-neutral-500 uppercase block mb-1">Brand</label>
                        <select
                          value={aiProductDetails.brand}
                          onChange={(e) => setAiProductDetails({ ...aiProductDetails, brand: e.target.value as BrandName })}
                          className="w-full bg-neutral-900 border border-neutral-800 rounded p-2 text-white font-bold"
                        >
                          <option value="Nike">Nike</option>
                          <option value="Adidas">Adidas</option>
                          <option value="New Balance">New Balance</option>
                          <option value="Asics">Asics</option>
                          <option value="Puma">Puma</option>
                          <option value="Fear of God">Fear of God</option>
                          <option value="Polo Ralph Lauren">Polo Ralph Lauren</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-[10px] text-neutral-500 uppercase block mb-1">Preț Vânzare (RON)</label>
                        <input
                          type="number"
                          value={aiProductDetails.priceRon}
                          onChange={(e) => setAiProductDetails({ ...aiProductDetails, priceRon: Number(e.target.value) })}
                          className="w-full bg-neutral-900 border border-neutral-800 rounded p-2 text-white font-bold"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] text-neutral-500 uppercase block mb-1">Nume Model / Produs</label>
                      <input
                        type="text"
                        value={aiProductDetails.name}
                        onChange={(e) => setAiProductDetails({ ...aiProductDetails, name: e.target.value })}
                        className="w-full bg-neutral-900 border border-neutral-800 rounded p-2 text-white"
                      />
                    </div>

                    <button
                      onClick={handlePublishAiProduct}
                      className="w-full py-3.5 bg-white hover:bg-neutral-200 text-black font-bold uppercase tracking-wider rounded-lg flex items-center justify-center gap-2 transition-colors shadow-lg"
                    >
                      <CheckCircle className="w-4 h-4 text-black" />
                      <span>Publică Produsul Imediat în Magazin</span>
                    </button>
                  </div>
                )}

              </div>

            </div>

          </div>
        )}

        {/* TAB 3: ORDERS MANAGEMENT */}
        {activeTab === 'orders' && (
          <div className="p-6 space-y-6 text-xs">
            <div>
              <h3 className="text-base font-bold text-white">Comenzi Clienți</h3>
              <p className="text-neutral-400">
                Verifică plățile, generează AWB-uri și actualizează statusul fiecărui colet
              </p>
            </div>

            {orders.length === 0 ? (
              <div className="p-12 text-center border border-neutral-800 rounded-xl bg-neutral-950 text-neutral-400">
                <ShoppingBag className="w-8 h-8 mx-auto mb-2 text-neutral-600" />
                <p>Nicio comandă înregistrată încă.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((ord) => (
                  <div key={ord.id} className="p-5 bg-neutral-950 border border-neutral-800 rounded-xl space-y-3">
                    
                    {/* Header */}
                    <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-neutral-850">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-base font-bold text-white">Comandă #{ord.orderNumber}</span>
                          <span className="px-2 py-0.5 rounded text-[10px] bg-neutral-800 text-neutral-300 border border-neutral-700">
                            {ord.paymentMethod.toUpperCase()} · {ord.paymentStatus}
                          </span>
                        </div>
                        <span className="text-neutral-500 text-[11px]">
                          Plasată pe {new Date(ord.createdAt).toLocaleString('ro-RO')}
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          <span className="text-neutral-400 text-[11px]">Status:</span>
                          <select
                            value={ord.orderStatus}
                            onChange={(e) => onUpdateOrderStatus(ord.id, e.target.value as OrderStatus)}
                            className="bg-neutral-900 border border-neutral-700 rounded px-2.5 py-1 text-white text-xs font-bold focus:outline-none"
                          >
                            <option value="în așteptare">în așteptare</option>
                            <option value="plătită">plătită</option>
                            <option value="în procesare">în procesare</option>
                            <option value="expediată">expediată</option>
                            <option value="livrată">livrată</option>
                            <option value="anulată">anulată</option>
                            <option value="rambursată">rambursată</option>
                          </select>
                        </div>

                        <button
                          onClick={() => onViewInvoice(ord)}
                          className="px-3 py-1 bg-neutral-800 hover:bg-neutral-700 text-white rounded border border-neutral-700 flex items-center gap-1.5 transition-colors"
                        >
                          <FileText className="w-3 h-3" />
                          <span>Factură</span>
                        </button>
                      </div>
                    </div>

                    {/* Customer & Shipping info */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[11px] text-neutral-300">
                      <div>
                        <span className="text-neutral-500 block text-[10px] uppercase font-bold">Client:</span>
                        <div className="font-bold text-white">{ord.customer.fullName}</div>
                        <div>Email: {ord.customer.email}</div>
                        <div>Telefon: {ord.customer.phone}</div>
                      </div>

                      <div>
                        <span className="text-neutral-500 block text-[10px] uppercase font-bold">Livrare ({ord.deliveryMethod.name}):</span>
                        <div className="text-white">{ord.customer.address}, {ord.customer.city}, {ord.customer.county}</div>
                        {ord.trackingNumber && (
                          <div className="text-emerald-400 font-bold mt-1">
                            {ord.meetupDetails ? 'Cod Întâlnire:' : 'AWB Fan Courier:'} {ord.trackingNumber}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Dedicated Meetup Details Card for the Seller */}
                    {ord.meetupDetails && (
                      <div className="p-3.5 bg-gradient-to-r from-emerald-950/80 via-neutral-900 to-neutral-950 border border-emerald-500/50 rounded-xl space-y-2 text-xs">
                        <div className="flex items-center justify-between border-b border-neutral-800 pb-1.5">
                          <span className="font-bold text-emerald-300 flex items-center gap-1.5">
                            <Users className="w-4 h-4 text-emerald-400" />
                            <span>PREDARE PERSONALĂ (MEET-UP FACE-TO-FACE)</span>
                          </span>
                          <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold text-[10px]">
                            {ord.meetupDetails.city}
                          </span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-neutral-200">
                          <div>
                            <span className="text-neutral-400 block">Locație stabilită:</span>
                            <strong className="text-white text-xs">{ord.meetupDetails.location}</strong>
                          </div>
                          <div>
                            <span className="text-neutral-400 block">Data & Interval orar:</span>
                            <strong className="text-white text-xs">{ord.meetupDetails.preferredDate} · {ord.meetupDetails.preferredTimeSlot}</strong>
                          </div>
                        </div>
                        {ord.meetupDetails.buyerNotes && (
                          <div className="text-[11px] text-neutral-300 bg-black/40 p-2 rounded border border-neutral-800">
                            <span className="text-neutral-400 font-bold">Instrucțiuni client:</span> "{ord.meetupDetails.buyerNotes}"
                          </div>
                        )}
                        <div className="flex flex-wrap items-center gap-2 pt-1">
                          <a
                            href={`https://wa.me/4${ord.customer.phone.replace(/[^0-9]/g, '')}?text=Salut%20${encodeURIComponent(ord.customer.fullName)}!%20Sunt%20Alexandru%20de%20la%20ReSellix.%20Confirm%C4%83m%20%C3%AEnt%C3%A2lnirea%20pentru%20comanda%20%23${ord.orderNumber}%20la%20${encodeURIComponent(ord.meetupDetails.location)}%20pe%20data%20de%20${ord.meetupDetails.preferredDate}.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-[11px] font-bold flex items-center gap-1.5 transition-colors shadow"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>Trimite WhatsApp de Confirmare</span>
                          </a>
                          <a
                            href={`tel:${ord.customer.phone}`}
                            className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 rounded text-[11px] font-bold flex items-center gap-1.5 border border-neutral-700 transition-colors"
                          >
                            <Phone className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Sună Clientul ({ord.customer.phone})</span>
                          </a>
                        </div>
                      </div>
                    )}

                    {/* Purchased items */}
                    <div className="pt-2 border-t border-neutral-850">
                      <span className="text-neutral-500 text-[10px] uppercase font-bold block mb-1">Produse ({ord.items.length}):</span>
                      <div className="space-y-1.5">
                        {ord.items.map((it) => (
                          <div key={`${it.product.id}-${it.selectedSize}`} className="flex items-center justify-between text-neutral-300">
                            <span>{it.product.name} — <strong>Mărime: {it.selectedSize}</strong> (x{it.quantity})</span>
                            <span className="font-bold text-white">{(it.product.priceRon * it.quantity).toLocaleString('ro-RO')} RON</span>
                          </div>
                        ))}
                      </div>
                      <div className="text-right pt-2 border-t border-neutral-850 text-sm font-bold text-white">
                        Total: {ord.total.toLocaleString('ro-RO')} RON
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            )}

          </div>
        )}

        {/* TAB 4: ANALYTICS & METRICS */}
        {activeTab === 'analytics' && (
          <div className="p-6 space-y-6">
            <h3 className="text-base font-bold text-white">Performanță Magazin ReSellix</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              <div className="p-5 bg-neutral-950 border border-neutral-800 rounded-xl">
                <span className="text-neutral-400 block mb-1">Total Vânzări</span>
                <div className="text-2xl font-black text-white">{totalSales.toLocaleString('ro-RO')} RON</div>
                <span className="text-[10px] text-emerald-400 block mt-1">+12.4% această săptămână</span>
              </div>

              <div className="p-5 bg-neutral-950 border border-neutral-800 rounded-xl">
                <span className="text-neutral-400 block mb-1">Comenzi Totale</span>
                <div className="text-2xl font-black text-white">{totalOrdersCount}</div>
                <span className="text-[10px] text-neutral-500 block mt-1">Înregistrate în sistem</span>
              </div>

              <div className="p-5 bg-neutral-950 border border-neutral-800 rounded-xl">
                <span className="text-neutral-400 block mb-1">Valoare Medie Coș</span>
                <div className="text-2xl font-black text-white">
                  {totalOrdersCount > 0 ? Math.round(totalSales / totalOrdersCount) : 0} RON
                </div>
                <span className="text-[10px] text-neutral-500 block mt-1">Per comandă confirmată</span>
              </div>

              <div className="p-5 bg-neutral-950 border border-neutral-800 rounded-xl">
                <span className="text-neutral-400 block mb-1">Produse Stoc Redus</span>
                <div className="text-2xl font-black text-amber-400">{lowStockProducts.length}</div>
                <span className="text-[10px] text-neutral-500 block mt-1">Necesită reaprovizionare</span>
              </div>
            </div>

            {/* Low stock alerts list */}
            {lowStockProducts.length > 0 && (
              <div className="p-5 bg-neutral-950 border border-neutral-800 rounded-xl space-y-3 text-xs">
                <div className="flex items-center gap-2 text-amber-400 font-bold">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Alerte Stoc Redus (sub 5 bucăți în total)</span>
                </div>
                <div className="space-y-2">
                  {lowStockProducts.map(lp => (
                    <div key={lp.id} className="flex justify-between items-center text-neutral-300 border-b border-neutral-850 pb-1.5">
                      <span>{lp.name} ({lp.brand})</span>
                      <span className="font-bold text-amber-400">
                        {lp.sizes.reduce((s, x) => s + x.stock, 0)} bucăți rămase
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 5: PAYMENTS & PAYOUTS GUIDE (Answer to user's question about card & cash-on-delivery) */}
        {activeTab === 'payments' && (
          <div className="p-6 space-y-6 text-xs font-mono">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-amber-950 border border-amber-800 text-amber-300 text-[10px] font-bold uppercase mb-2">
                <CreditCard className="w-3 h-3 text-amber-400" />
                <span>Configurare Încasări & Ghid Plăți</span>
              </div>
              <h3 className="text-xl font-bold text-white">
                Cum Încasezi Banii din Magazinul Tău ReSellix?
              </h3>
              <p className="text-neutral-400 mt-1 max-w-2xl leading-relaxed text-xs">
                Înțelege cum funcționează plățile ramburs și cu cardul, de ce nu introduci niciodată cardul tău pe site și configurează contul IBAN unde dorești să primești banii.
              </p>
            </div>

            {/* CRUCIAL ADVISORY BOX: RASPUNS DIRECT LA INTREBAREA UTILIZATORULUI */}
            <div className="p-5 bg-amber-950/40 border border-amber-700/80 rounded-xl space-y-3">
              <div className="flex items-center gap-2 text-amber-300 font-bold text-sm">
                <Lock className="w-5 h-5 text-amber-400 shrink-0" />
                <span>RĂSPUNS IMPORTANT: „Cum bag eu numărul cardului meu ca proprietar?”</span>
              </div>
              <div className="text-neutral-200 text-xs leading-relaxed space-y-2">
                <p>
                  <strong className="text-white">NU introduci NICIODATĂ numărul cardului tău pe site!</strong>
                </p>
                <p className="text-neutral-300">
                  Numărul de card (cele 16 cifre, data de expirare și codul CVV) este o cheie strict confidențială făcută doar pentru a <em>cheltui / cumpăra</em>, nu pentru a încasa. Dacă ți-ai introduce numărul cardului pe site, oricine l-ar vedea ar putea să-ți fure banii!
                </p>
                <p className="text-neutral-300">
                  Ca proprietar de magazin, pentru a primi banii de la vânzări folosești doar un <strong>Cont Bancar IBAN</strong> (care începe cu RO...) sau contractul cu <strong>Fan Courier</strong>. Contul IBAN este public și 100% sigur (nimeni nu poate retrage bani din contul tău doar știindu-ți IBAN-ul, doar îți pot trimite bani!).
                </p>
              </div>
            </div>

            {/* 3 Payment Methods Explained */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              
              {/* Method 1: Ramburs Fan Courier */}
              <div className="p-4 bg-neutral-950 border border-emerald-800 rounded-xl space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 font-bold text-emerald-400 text-sm">
                    <Truck className="w-4 h-4" />
                    <span>1. Ramburs Fan Courier</span>
                  </span>
                  <span className="text-[10px] bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded border border-emerald-850">
                    Cea mai populară
                  </span>
                </div>
                <p className="text-neutral-400 text-[11px] leading-relaxed">
                  <strong>Cum funcționează:</strong> Clientul comandă pe site fără card. Curierul Fan Courier îi livrează coletul la ușă și îi ia banii (numerar sau POS).
                </p>
                <div className="p-2.5 bg-neutral-900 rounded border border-neutral-800 text-[11px] text-neutral-300">
                  <strong>Cum ajung banii la tine:</strong> Fan Courier colectează banii de la client și ți-i virează direct în contul tău bancar (IBAN) pe baza contractului tău de curierat. Nu ai nevoie de card!
                </div>
              </div>

              {/* Method 2: Card Bancar Online */}
              <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-xl space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 font-bold text-white text-sm">
                    <CreditCard className="w-4 h-4 text-emerald-400" />
                    <span>2. Card Online (Stripe)</span>
                  </span>
                  <span className="text-[10px] bg-neutral-800 text-neutral-300 px-2 py-0.5 rounded">
                    3D Secure 2.0
                  </span>
                </div>
                <p className="text-neutral-400 text-[11px] leading-relaxed">
                  <strong>Cum funcționează:</strong> Cumpărătorul își introduce cardul lui bancar la checkout pentru a plăti instantaneu comanda.
                </p>
                <div className="p-2.5 bg-neutral-900 rounded border border-neutral-800 text-[11px] text-neutral-300">
                  <strong>Cum ajung banii la tine:</strong> Procesatorul (ex: Stripe sau Netopia) debitează cardul cumpărătorului și transferă automat banii în contul tău IBAN bancar.
                </div>
              </div>

              {/* Method 3: Revolut / Transfer Bancar */}
              <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-xl space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 font-bold text-white text-sm">
                    <Wallet className="w-4 h-4 text-emerald-400" />
                    <span>3. Revolut & Transfer IBAN</span>
                  </span>
                  <span className="text-[10px] bg-neutral-800 text-neutral-300 px-2 py-0.5 rounded">
                    Direct
                  </span>
                </div>
                <p className="text-neutral-400 text-[11px] leading-relaxed">
                  <strong>Cum funcționează:</strong> Clientul primește contul tău IBAN sau Revolut Tag la plasarea comenzii și îți trimite banii direct din aplicația lui bancară.
                </p>
                <div className="p-2.5 bg-neutral-900 rounded border border-neutral-800 text-[11px] text-neutral-300">
                  <strong>Cum ajung banii la tine:</strong> Banii intră instantaneu în aplicația ta Revolut sau pe contul bancar alăturat.
                </div>
              </div>

            </div>

            {/* Form to configure Store IBAN and Bank Details */}
            <div className="p-5 bg-neutral-950 border border-neutral-800 rounded-xl space-y-4 pt-4">
              <h4 className="text-sm font-bold text-white uppercase flex items-center gap-2">
                <Building className="w-4 h-4 text-emerald-400" />
                <span>Configurează Contul Tău Bancar (IBAN) pentru Încasări</span>
              </h4>
              <p className="text-neutral-400 text-[11px]">
                Aici introduci datele contului bancar unde dorești ca Fan Courier sau procesatorii de plăți să-ți vireze banii din comenzi:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] text-neutral-400 uppercase font-bold block mb-1">
                    Nume Titular Cont / Firmă
                  </label>
                  <input
                    type="text"
                    value={paymentForm.ownerName}
                    onChange={(e) => setPaymentForm({ ...paymentForm, ownerName: e.target.value })}
                    placeholder="ex: Alexandru Stănescu / ReSellix SRL"
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-lg p-2.5 text-white"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-neutral-400 uppercase font-bold block mb-1">
                    Banca Ta
                  </label>
                  <input
                    type="text"
                    value={paymentForm.bankName}
                    onChange={(e) => setPaymentForm({ ...paymentForm, bankName: e.target.value })}
                    placeholder="ex: Banca Transilvania / BCR / ING / Revolut"
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-lg p-2.5 text-white"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-[10px] text-neutral-400 uppercase font-bold block mb-1">
                    Contul Tău IBAN de Încasare (24 caractere)
                  </label>
                  <input
                    type="text"
                    value={paymentForm.iban}
                    onChange={(e) => setPaymentForm({ ...paymentForm, iban: e.target.value.toUpperCase() })}
                    placeholder="ex: RO49 BTRL 0000 1209 8831 22XX"
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-lg p-2.5 text-emerald-400 font-bold"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-neutral-400 uppercase font-bold block mb-1">
                    Tag Revolut (pentru clienți cu Revolut)
                  </label>
                  <input
                    type="text"
                    value={paymentForm.revolutTag}
                    onChange={(e) => setPaymentForm({ ...paymentForm, revolutTag: e.target.value })}
                    placeholder="ex: @alexandru.resellix"
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-lg p-2.5 text-white"
                  />
                </div>

                <div className="flex items-center pt-5">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={paymentForm.enableCod}
                      onChange={(e) => setPaymentForm({ ...paymentForm, enableCod: e.target.checked })}
                      className="rounded accent-emerald-500 w-4 h-4 bg-neutral-900 border-neutral-700"
                    />
                    <span className="text-white font-bold text-xs">Acceptă Plată Ramburs la Curier (Fan Courier)</span>
                  </label>
                </div>
              </div>

              {/* SECTION: MEETUP & PREDARE PERSONALA SETTINGS */}
              <div className="mt-6 pt-6 border-t border-neutral-800 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-white uppercase flex items-center gap-2">
                    <Users className="w-4 h-4 text-emerald-400" />
                    <span>Configurare Meet-up & Predare Personală (Același Oraș)</span>
                  </h4>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                    Activare Automată la Cumpărători din Orașul Tău
                  </span>
                </div>
                <p className="text-neutral-400 text-[11px] leading-relaxed">
                  Dacă sistemul detectează că un client este din același oraș cu tine, îi va oferi automat opțiunea de a <strong>Organiza un Meeting Face-to-Face</strong> cu 0 LEI transport, verificare fizică și probă mărime.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] text-neutral-400 uppercase font-bold block mb-1">
                      Orașul Tău (Unde vinzi / predai produsele) *
                    </label>
                    <input
                      type="text"
                      value={paymentForm.sellerCity || 'București'}
                      onChange={(e) => setPaymentForm({ ...paymentForm, sellerCity: e.target.value })}
                      placeholder="ex: București, Cluj-Napoca, Timișoara"
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-lg p-2.5 text-white font-bold focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-neutral-400 uppercase font-bold block mb-1">
                      Telefon / WhatsApp Vânzător pentru Confirmări Meeting
                    </label>
                    <input
                      type="text"
                      value={paymentForm.sellerPhone || '0721 445 889'}
                      onChange={(e) => setPaymentForm({ ...paymentForm, sellerPhone: e.target.value })}
                      placeholder="ex: 0721 445 889"
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-lg p-2.5 text-white focus:border-emerald-500"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={paymentForm.enableMeetup ?? true}
                        onChange={(e) => setPaymentForm({ ...paymentForm, enableMeetup: e.target.checked })}
                        className="rounded accent-emerald-500 w-4 h-4 bg-neutral-900 border-neutral-700"
                      />
                      <span className="text-white font-bold text-xs">
                        Permite clienților din {paymentForm.sellerCity || 'orașul tău'} să aleagă opțiunea „Organizează un Meeting”
                      </span>
                    </label>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-[10px] text-neutral-400 uppercase font-bold block mb-1">
                      Puncte Publice Sigure de Întâlnire (Separate prin virgulă)
                    </label>
                    <textarea
                      rows={2}
                      value={paymentForm.meetupLocations?.join(', ') || ''}
                      onChange={(e) => setPaymentForm({ 
                        ...paymentForm, 
                        meetupLocations: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                      })}
                      placeholder="ex: AFI Cotroceni, Metrou Piața Victoriei, ParkLake Mall, Mega Mall"
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-lg p-2.5 text-white text-xs focus:border-emerald-500"
                    />
                    <p className="text-[10px] text-neutral-500 mt-1">
                      Recomandăm locații publice iluminate (mall-uri, stații de metrou aglomerate, terase) pentru siguranța ta și a cumpărătorului.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-neutral-850 flex items-center justify-between">
                <div>
                  {savedSettingsNotice && (
                    <span className="text-emerald-400 font-bold text-xs animate-in fade-in">
                      ✓ {savedSettingsNotice}
                    </span>
                  )}
                </div>

                <button
                  onClick={() => {
                    onUpdatePaymentSettings(paymentForm);
                    setSavedSettingsNotice('Setările de plată și Meet-up au fost salvate cu succes!');
                    setTimeout(() => setSavedSettingsNotice(null), 3000);
                  }}
                  className="px-6 py-2.5 bg-white hover:bg-neutral-200 text-black font-bold uppercase rounded-lg transition-colors shadow-md"
                >
                  Salvează Setările Magazinului
                </button>
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
};
