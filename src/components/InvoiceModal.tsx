import React from 'react';
import { X, Printer, CheckCircle, ShieldCheck } from 'lucide-react';
import { Order } from '../types/resellix';

interface InvoiceModalProps {
  order: Order | null;
  onClose: () => void;
}

export const InvoiceModal: React.FC<InvoiceModalProps> = ({ order, onClose }) => {
  if (!order) return null;

  const handlePrint = () => {
    window.print();
  };

  const tvaRate = 0.19;
  const netAmount = Math.round(order.total / (1 + tvaRate));
  const tvaAmount = order.total - netAmount;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 print:p-0 print:bg-white">
      
      <div className="fixed inset-0 print:hidden" onClick={onClose} />

      <div className="relative bg-white rounded-2xl max-w-3xl w-full shadow-2xl border border-neutral-300 z-10 p-6 sm:p-10 text-neutral-900 print:shadow-none print:border-none print:p-0 font-sans">
        
        {/* Actions bar */}
        <div className="flex items-center justify-between pb-6 mb-6 border-b border-neutral-200 print:hidden">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-bold tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200 flex items-center gap-1.5 font-mono">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
              Factură Fiscală ReSellix
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 text-xs font-semibold bg-black hover:bg-neutral-800 text-white rounded-lg transition-colors flex items-center gap-1.5 font-mono shadow-sm"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Imprimă / Salvează PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-neutral-500 hover:text-black rounded-full hover:bg-neutral-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Invoice Header */}
        <div className="flex flex-col sm:flex-row items-start justify-between gap-6 pb-8 border-b border-neutral-200">
          <div>
            <span className="text-2xl font-black font-mono tracking-tight text-black">
              ReSellix<span className="text-emerald-500">.</span>
            </span>
            <p className="text-xs text-neutral-500 font-mono mt-1">
              RESELLIX SNEAKERS & STREETWEAR S.R.L.
            </p>
            <div className="text-xs text-neutral-600 space-y-0.5 mt-2">
              <p>C.U.I.: RO 49201931 · Reg. Com.: J40/12948/2026</p>
              <p>Sediu: Bd. Aviatorilor nr. 42, Sector 1, București</p>
              <p>Cont IBAN: RO49 BTRL 0000 1209 8831 22XX</p>
              <p>Banca: Banca Transilvania S.A.</p>
            </div>
          </div>

          <div className="text-left sm:text-right font-mono">
            <div className="text-lg font-bold text-neutral-900">
              SERIA RSX · NR. {order.orderNumber.replace('RSX-', '')}
            </div>
            <p className="text-xs text-neutral-500 mt-1">
              Data emiterii: {new Date(order.createdAt).toLocaleDateString('ro-RO')}
            </p>
            <p className="text-xs text-neutral-500">
              Scadență: La livrare (Achitat)
            </p>
            <div className="mt-2 text-xs font-semibold text-emerald-700 bg-emerald-50 inline-block px-2 py-0.5 rounded border border-emerald-200">
              Status: {order.orderStatus.toUpperCase()} ({order.paymentMethod.toUpperCase()})
            </div>
          </div>
        </div>

        {/* Client & Shipping info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 py-6 border-b border-neutral-200 text-xs">
          <div>
            <span className="font-mono text-neutral-400 uppercase text-[10px] block mb-1">Cumpărător / Destinatar:</span>
            <div className="font-bold text-sm text-neutral-900">{order.customer.fullName}</div>
            <p className="text-neutral-600 mt-1">Telefon: {order.customer.phone}</p>
            <p className="text-neutral-600">Email: {order.customer.email}</p>
          </div>

          <div>
            <span className="font-mono text-neutral-400 uppercase text-[10px] block mb-1">Adresă de Livrare:</span>
            <p className="text-neutral-800">{order.customer.address}</p>
            <p className="text-neutral-800">{order.customer.city}, Județul {order.customer.county}</p>
            <p className="text-neutral-600 mt-1">Curier: {order.deliveryMethod.name}</p>
            {order.trackingNumber && (
              <p className="text-emerald-700 font-mono font-bold mt-1">
                AWB Fan Courier: {order.trackingNumber}
              </p>
            )}
          </div>
        </div>

        {/* Invoice Items Table */}
        <div className="py-6 border-b border-neutral-200">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-neutral-300 text-neutral-500 uppercase text-[10px]">
                <th className="pb-2">Produs & Specificații</th>
                <th className="pb-2">Mărime</th>
                <th className="pb-2 text-center">Cant.</th>
                <th className="pb-2 text-right">Preț Unitar</th>
                <th className="pb-2 text-right">Valoare (RON)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {order.items.map((it, idx) => (
                <tr key={idx} className="py-2.5">
                  <td className="py-3">
                    <span className="font-bold text-neutral-900 block">{it.product.name}</span>
                    <span className="text-[10px] text-neutral-500">Brand: {it.product.brand} · SKU: {it.product.sku}</span>
                  </td>
                  <td className="py-3 text-neutral-700 font-bold">{it.selectedSize}</td>
                  <td className="py-3 text-center text-neutral-700">{it.quantity}</td>
                  <td className="py-3 text-right text-neutral-700">{it.product.priceRon.toLocaleString('ro-RO')}</td>
                  <td className="py-3 text-right font-bold text-neutral-900">
                    {(it.product.priceRon * it.quantity).toLocaleString('ro-RO')}
                  </td>
                </tr>
              ))}

              {/* Shipping row */}
              <tr className="py-2.5 text-neutral-600">
                <td className="py-3" colSpan={3}>
                  <span>Serviciu de Livrare ({order.deliveryMethod.name})</span>
                </td>
                <td className="py-3 text-right">1</td>
                <td className="py-3 text-right font-bold text-neutral-900">
                  {order.shippingCost === 0 ? '0 (Gratuit)' : `${order.shippingCost}`}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Invoice Summary */}
        <div className="pt-6 flex flex-col items-end text-xs font-mono">
          <div className="w-64 space-y-1.5 text-neutral-600">
            <div className="flex justify-between">
              <span>Bază Impozabilă Netă:</span>
              <span>{netAmount.toLocaleString('ro-RO')} RON</span>
            </div>
            <div className="flex justify-between">
              <span>TVA (19% inclus):</span>
              <span>{tvaAmount.toLocaleString('ro-RO')} RON</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-emerald-600 font-bold">
                <span>Discount aplicat:</span>
                <span>-{order.discount.toLocaleString('ro-RO')} RON</span>
              </div>
            )}
            <div className="flex justify-between text-base font-bold text-neutral-900 pt-2 border-t border-neutral-300">
              <span>TOTAL FACTURĂ:</span>
              <span className="text-lg">{order.total.toLocaleString('ro-RO')} RON</span>
            </div>
          </div>
        </div>

        {/* Footer Notes */}
        <div className="mt-8 pt-6 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500 font-mono">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Factura este valabilă fără ștampilă conform Codului Fiscal art. 319 alin. 29.</span>
          </div>
          <div>
            Retur garantat 30 zile · contact@resellix.ro
          </div>
        </div>

      </div>
    </div>
  );
};
