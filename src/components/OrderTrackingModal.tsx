import React, { useState } from 'react';
import { X, Search, Truck, CheckCircle2, Clock, PackageCheck, MapPin, Copy, Check, Users } from 'lucide-react';
import { Order } from '../types/resellix';

interface OrderTrackingModalProps {
  isOpen: boolean;
  initialOrderNumber?: string;
  userOrders: Order[];
  onClose: () => void;
}

export const OrderTrackingModal: React.FC<OrderTrackingModalProps> = ({
  isOpen,
  initialOrderNumber,
  userOrders,
  onClose,
}) => {
  if (!isOpen) return null;

  const defaultNum = initialOrderNumber || (userOrders.length > 0 ? userOrders[userOrders.length - 1].orderNumber : 'RSX-492102');
  const [searchQuery, setSearchQuery] = useState(defaultNum);
  const [copied, setCopied] = useState(false);

  // Look for match in userOrders or fallback to demo order
  const matchedOrder = userOrders.find(
    (o) => o.orderNumber.toLowerCase() === searchQuery.trim().toLowerCase() ||
           (o.trackingNumber && o.trackingNumber.toLowerCase() === searchQuery.trim().toLowerCase())
  );

  const isMeetup = Boolean(matchedOrder?.meetupDetails);

  const displayData = matchedOrder ? {
    orderNumber: matchedOrder.orderNumber,
    date: matchedOrder.createdAt,
    status: matchedOrder.orderStatus,
    trackingNumber: matchedOrder.trackingNumber || (isMeetup ? 'MEET-7721' : 'FAN98421049RO'),
    courier: matchedOrder.deliveryMethod.name,
    estimatedDelivery: isMeetup 
      ? `${matchedOrder.meetupDetails?.preferredDate} (${matchedOrder.meetupDetails?.preferredTimeSlot})`
      : 'În 24-48 ore lucrătoare',
    destination: isMeetup 
      ? `${matchedOrder.meetupDetails?.location}, ${matchedOrder.meetupDetails?.city}`
      : `${matchedOrder.customer.city}, ${matchedOrder.customer.county}`,
    customerName: matchedOrder.customer.fullName,
    itemsCount: matchedOrder.items.reduce((s, i) => s + i.quantity, 0),
    total: `${matchedOrder.total.toLocaleString('ro-RO')} RON`,
    meetupDetails: matchedOrder.meetupDetails
  } : {
    orderNumber: 'RSX-492102',
    date: new Date().toISOString(),
    status: 'în procesare',
    trackingNumber: 'FAN98421049RO',
    courier: 'Fan Courier Livrare la Ușă Double-Box',
    estimatedDelivery: 'Mâine, între 10:00 și 16:00',
    destination: 'București, Sector 1',
    customerName: 'Andrei Popescu',
    itemsCount: 1,
    total: '690 RON',
    meetupDetails: undefined
  };

  const handleCopyAwb = () => {
    navigator.clipboard.writeText(displayData.trackingNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative bg-neutral-900 border border-neutral-700 rounded-2xl max-w-xl w-full shadow-2xl z-10 p-6 sm:p-8 text-white font-mono">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-white rounded-full bg-neutral-800 hover:bg-neutral-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-2.5 pb-4 border-b border-neutral-800">
          {isMeetup ? (
            <Users className="w-5 h-5 text-emerald-400" />
          ) : (
            <Truck className="w-5 h-5 text-emerald-400" />
          )}
          <h2 className="text-base font-bold uppercase tracking-wide">
            {isMeetup ? 'Urmărire Meet-up & Predare Personală' : 'Urmărire Colet ReSellix · Fan Courier & Easybox'}
          </h2>
        </div>

        {/* Search Query Input */}
        <div className="my-5">
          <label className="text-[11px] text-neutral-400 block mb-1">
            Număr Comandă (ex: RSX-492102) sau cod identificare:
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="RSX-..."
              className="flex-1 bg-neutral-950 border border-neutral-800 rounded-lg px-3.5 py-2 text-xs text-white uppercase focus:outline-none focus:border-neutral-600"
            />
            <button
              onClick={() => {}}
              className="px-4 py-2 bg-white text-black font-bold text-xs uppercase rounded-lg hover:bg-neutral-200"
            >
              Caută
            </button>
          </div>
        </div>

        {/* Live Tracking Card */}
        <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-xl space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-neutral-850">
            <div>
              <div className="text-xs text-neutral-500">Număr Comandă:</div>
              <div className="text-sm font-bold text-white">#{displayData.orderNumber}</div>
            </div>

            <div className="text-right">
              <span className="px-2.5 py-1 rounded text-[10px] uppercase font-bold bg-emerald-950 border border-emerald-800 text-emerald-400">
                {displayData.status}
              </span>
            </div>
          </div>

          {/* AWB or Meeting Code info */}
          <div className="flex items-center justify-between text-xs pt-1">
            <div>
              <span className="text-[10px] text-neutral-500 block">
                {isMeetup ? 'Cod Programare Meeting:' : 'Cod AWB Curier:'}
              </span>
              <span className="text-white font-bold">{displayData.trackingNumber}</span>
            </div>
            <button
              onClick={handleCopyAwb}
              className="flex items-center gap-1 px-2.5 py-1 bg-neutral-800 hover:bg-neutral-700 rounded text-[11px] text-neutral-300 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copiat!' : 'Copiază'}</span>
            </button>
          </div>

          {/* Timeline Milestones */}
          <div className="pt-3 border-t border-neutral-850 space-y-4">
            <span className="text-[10px] text-neutral-500 uppercase block font-bold">
              {isMeetup ? 'Pași Întâlnire & Predare Personală:' : 'Istoric Tranzit Colet:'}
            </span>
            
            <div className="space-y-3 relative before:absolute before:inset-0 before:left-3 before:w-0.5 before:bg-neutral-800">
              
              {isMeetup ? (
                <>
                  <div className="relative flex items-start gap-3 pl-2">
                    <div className="w-6 h-6 rounded-full bg-emerald-500 text-black flex items-center justify-center shrink-0 z-10 text-[10px] font-bold">
                      ✓
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">Solicitare Meeting Înregistrată în Sistem</div>
                      <div className="text-[10px] text-neutral-500">Locație: {displayData.destination}</div>
                    </div>
                  </div>

                  <div className="relative flex items-start gap-3 pl-2">
                    <div className="w-6 h-6 rounded-full bg-emerald-500 text-black flex items-center justify-center shrink-0 z-10 text-[10px] font-bold">
                      ✓
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">Verificare pereche în stoc & pregătire probă</div>
                      <div className="text-[10px] text-neutral-500">Ambalaj original cu toate accesoriile</div>
                    </div>
                  </div>

                  <div className="relative flex items-start gap-3 pl-2">
                    <div className="w-6 h-6 rounded-full bg-neutral-800 border border-emerald-400 text-emerald-400 flex items-center justify-center shrink-0 z-10 text-[10px] animate-pulse">
                      •
                    </div>
                    <div>
                      <div className="text-xs font-bold text-emerald-300">Întâlnire la {displayData.destination}</div>
                      <div className="text-[10px] text-neutral-400">Data & Ora: {displayData.estimatedDelivery}</div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="relative flex items-start gap-3 pl-2">
                    <div className="w-6 h-6 rounded-full bg-emerald-500 text-black flex items-center justify-center shrink-0 z-10 text-[10px] font-bold">
                      ✓
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">Comandă verificată & ambalată Double-Box</div>
                      <div className="text-[10px] text-neutral-500">Depozit ReSellix București</div>
                    </div>
                  </div>

                  <div className="relative flex items-start gap-3 pl-2">
                    <div className="w-6 h-6 rounded-full bg-emerald-500 text-black flex items-center justify-center shrink-0 z-10 text-[10px] font-bold">
                      ✓
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">Preluat de curier {displayData.courier.includes('Easybox') ? 'Sameday' : 'Fan Courier'}</div>
                      <div className="text-[10px] text-neutral-500">Scanat în HUB Logistic Tranzit</div>
                    </div>
                  </div>

                  <div className="relative flex items-start gap-3 pl-2">
                    <div className="w-6 h-6 rounded-full bg-neutral-800 border border-neutral-600 text-neutral-300 flex items-center justify-center shrink-0 z-10 text-[10px]">
                      •
                    </div>
                    <div>
                      <div className="text-xs font-bold text-neutral-300">În curs de livrare către {displayData.destination}</div>
                      <div className="text-[10px] text-neutral-500">Estimare: {displayData.estimatedDelivery}</div>
                    </div>
                  </div>
                </>
              )}

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
