import React, { useState } from 'react';
import { X, Plus, Sparkles, Image, Check, Tag, ShieldCheck, Layers } from 'lucide-react';
import { Product, BrandName, ProductCategory, SizeStock } from '../types/resellix';

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProduct: (newProduct: Product) => void;
  initialProduct?: Product | null;
}

const PRESET_SNEAKER_IMAGES = [
  { name: 'Nike Dunk Low Panda', url: '/src/assets/images/resellix_nike_dunk_retro_1793216616580.jpg' },
  { name: 'New Balance 550 White/Green', url: '/src/assets/images/resellix_new_balance_550_1793216616500.jpg' },
  { name: 'Asics Gel-Kayano 14 Silver', url: '/src/assets/images/resellix_asics_gel_kayano_1793216617655.jpg' },
  { name: 'Adidas Yeezy Foam Runner', url: '/src/assets/images/product_yeezy_foam_sneakers_1793216003748.jpg' },
  { name: 'Essentials FOG Hoodie Taupe', url: '/src/assets/images/product_essentials_hoodie_taupe_1793216003370.jpg' },
  { name: 'Polo Ralph Lauren Chino Cap', url: '/src/assets/images/product_polo_washed_cap_navy_1793215302214.jpg' }
];

export const AddProductModal: React.FC<AddProductModalProps> = ({
  isOpen,
  onClose,
  onAddProduct,
  initialProduct
}) => {
  if (!isOpen) return null;

  const [name, setName] = useState(initialProduct?.name || '');
  const [brand, setBrand] = useState<BrandName>(initialProduct?.brand || 'Nike');
  const [model, setModel] = useState(initialProduct?.model || '');
  const [category, setCategory] = useState<ProductCategory>(initialProduct?.category || 'Sneakers');
  const [priceRon, setPriceRon] = useState<number>(initialProduct?.priceRon || 650);
  const [originalPriceRon, setOriginalPriceRon] = useState<number>(initialProduct?.originalPriceRon || 0);
  const [sku, setSku] = useState(initialProduct?.sku || `RSX-${brand.substring(0,3).toUpperCase()}-${Math.floor(100+Math.random()*900)}`);
  const [description, setDescription] = useState(initialProduct?.description || '');
  const [selectedImage, setSelectedImage] = useState(initialProduct?.images[0] || PRESET_SNEAKER_IMAGES[0].url);
  const [customImageUrl, setCustomImageUrl] = useState('');
  
  // Sizes & Stock
  const defaultSneakerSizes: SizeStock[] = [
    { size: 'EU 40', stock: 2 },
    { size: 'EU 41', stock: 4 },
    { size: 'EU 42', stock: 5 },
    { size: 'EU 43', stock: 3 },
    { size: 'EU 44', stock: 2 }
  ];

  const [sizes, setSizes] = useState<SizeStock[]>(
    initialProduct?.sizes && initialProduct.sizes.length > 0 ? initialProduct.sizes : defaultSneakerSizes
  );

  const handleUpdateSizeStock = (sizeName: string, newStock: number) => {
    setSizes(sizes.map(s => s.size === sizeName ? { ...s, stock: Math.max(0, newStock) } : s));
  };

  const handleAddCustomSize = (sizeName: string) => {
    if (!sizeName || sizes.some(s => s.size === sizeName)) return;
    setSizes([...sizes, { size: sizeName, stock: 2 }]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const finalImage = customImageUrl.trim() || selectedImage;

    const newProduct: Product = {
      id: initialProduct?.id || `prod-${Date.now()}`,
      sku: sku.trim() || `RSX-${Date.now().toString().slice(-6)}`,
      name: name.trim(),
      brand,
      model: model.trim() || name.trim(),
      category,
      priceRon: Number(priceRon),
      originalPriceRon: originalPriceRon > 0 ? Number(originalPriceRon) : undefined,
      sizes: sizes,
      images: [finalImage],
      description: description.trim() || 'Produs 100% autentic verificat în depozitul ReSellix. Livrat în cutie originală intactă.',
      status: 'disponibil',
      tag: 'Nou',
      rating: 5.0,
      reviewCount: 1,
      condition: 'Nou (DS - Deadstock original)',
      materials: ['Piele naturală', 'Talpă cauciuc rezistent'],
      isDemonstrative: false,
      createdAt: new Date().toISOString().split('T')[0]
    };

    onAddProduct(newProduct);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative bg-neutral-900 border border-neutral-700 rounded-2xl max-w-2xl w-full max-h-[92vh] overflow-y-auto text-white shadow-2xl z-10 p-6 sm:p-8 font-mono">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-white rounded-full bg-neutral-800 hover:bg-neutral-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-2 pb-4 border-b border-neutral-800">
          <Plus className="w-5 h-5 text-emerald-400" />
          <h2 className="text-base font-bold uppercase tracking-wide">
            {initialProduct ? 'Editează Produs ReSellix' : 'Adaugă Produs Nou în Stoc'}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4 text-xs">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-neutral-400 block mb-1">Brand *</label>
              <select
                value={brand}
                onChange={(e) => setBrand(e.target.value as BrandName)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-white"
              >
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

            <div>
              <label className="text-neutral-400 block mb-1">Categorie *</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as ProductCategory)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-white"
              >
                <option value="Sneakers">Sneakers</option>
                <option value="Îmbrăcăminte">Îmbrăcăminte</option>
                <option value="Accesorii">Accesorii</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-neutral-400 block mb-1">Nume Produs Complet *</label>
            <input
              type="text"
              required
              placeholder="ex: Nike Dunk Low Retro Panda"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-neutral-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-neutral-400 block mb-1">Model</label>
              <input
                type="text"
                placeholder="ex: Dunk Low Retro"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-white"
              />
            </div>

            <div>
              <label className="text-neutral-400 block mb-1">Preț de Vânzare (RON) *</label>
              <input
                type="number"
                required
                value={priceRon}
                onChange={(e) => setPriceRon(Number(e.target.value))}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-white font-bold"
              />
            </div>

            <div>
              <label className="text-neutral-400 block mb-1">Preț Vechi / Reducere (RON)</label>
              <input
                type="number"
                value={originalPriceRon}
                onChange={(e) => setOriginalPriceRon(Number(e.target.value))}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-white"
              />
            </div>
          </div>

          {/* Sizes and Stock Configuration */}
          <div className="pt-2 border-t border-neutral-800">
            <span className="text-neutral-300 font-bold block mb-2 uppercase text-[11px]">
              Gestiune Stoc per Mărime:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {sizes.map((s) => (
                <div key={s.size} className="p-2 bg-neutral-950 border border-neutral-800 rounded-lg text-center">
                  <span className="font-bold text-white block text-xs">{s.size}</span>
                  <div className="flex items-center justify-center gap-1 mt-1">
                    <button
                      type="button"
                      onClick={() => handleUpdateSizeStock(s.size, s.stock - 1)}
                      className="px-1.5 py-0.5 bg-neutral-800 hover:bg-neutral-700 rounded text-neutral-300 text-xs"
                    >
                      -
                    </button>
                    <span className="font-bold text-emerald-400 px-1">{s.stock}</span>
                    <button
                      type="button"
                      onClick={() => handleUpdateSizeStock(s.size, s.stock + 1)}
                      className="px-1.5 py-0.5 bg-neutral-800 hover:bg-neutral-700 rounded text-neutral-300 text-xs"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image Picker */}
          <div className="pt-2 border-t border-neutral-800">
            <span className="text-neutral-300 font-bold block mb-2 uppercase text-[11px]">
              Alege Imagine Studio sau Introdu URL:
            </span>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-2">
              {PRESET_SNEAKER_IMAGES.map((img) => (
                <button
                  type="button"
                  key={img.name}
                  onClick={() => {
                    setSelectedImage(img.url);
                    setCustomImageUrl('');
                  }}
                  className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === img.url && !customImageUrl ? 'border-white scale-105' : 'border-neutral-800 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img.url} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            <input
              type="url"
              placeholder="Sau lipește un link imagine extern (URL direct)..."
              value={customImageUrl}
              onChange={(e) => setCustomImageUrl(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-white text-xs mt-1"
            />
          </div>

          <div>
            <label className="text-neutral-400 block mb-1">Descriere Produs</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Detalii despre piele, talpă, model, istoric..."
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-white text-xs"
            />
          </div>

          <div className="pt-4 border-t border-neutral-800 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-lg uppercase"
            >
              Anulează
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-white text-black font-bold uppercase rounded-lg hover:bg-neutral-200 shadow-md"
            >
              Salvează Produsul
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
