import React from 'react';
import { X, ShieldCheck, Truck, RotateCcw, FileText, CheckCircle2 } from 'lucide-react';

export type LegalTopic = 'auth' | 'delivery' | 'return' | 'terms' | 'privacy';

interface LegalModalsProps {
  topic: LegalTopic | null;
  onClose: () => void;
}

export const LegalModals: React.FC<LegalModalsProps> = ({ topic, onClose }) => {
  if (!topic) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative bg-neutral-900 border border-neutral-700 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto text-white shadow-2xl z-10 p-6 sm:p-8">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-white rounded-full bg-neutral-800 hover:bg-neutral-700 transition-colors"
          aria-label="Închide"
        >
          <X className="w-5 h-5" />
        </button>

        {topic === 'auth' && (
          <div className="space-y-4 font-mono text-xs text-neutral-300">
            <div className="flex items-center gap-2 text-emerald-400 pb-2 border-b border-neutral-800">
              <ShieldCheck className="w-6 h-6" />
              <h2 className="text-lg font-bold text-white uppercase">Protocolul de Autenticitate ReSellix (100% Legit)</h2>
            </div>
            <p className="leading-relaxed">
              La ReSellix, toleranța pentru produse contrafăcute este absolut zero. Fiecare sneaker, hanorac sau șapcă 
              este inspectat manual de către verificatorii noștri certificați înainte de a primi sigiliul de securitate ReSellix.
            </p>
            <div className="space-y-2 pt-2">
              <div className="p-3 bg-neutral-950 rounded-lg border border-neutral-850">
                <strong className="text-white block mb-1">1. Cusături și Structură</strong>
                Frecvența cusăturilor pe centimetru, uniformitatea aței și unghiurile de îmbinare conform standardelor de fabrică Nike, Adidas, New Balance și Asics.
              </div>
              <div className="p-3 bg-neutral-950 rounded-lg border border-neutral-850">
                <strong className="text-white block mb-1">2. Cutie Originală și Coduri de Bare</strong>
                Eticheta cutiei este verificată cu privire la fonturi, spațiere, coduri UPC/EAN și aliniere la milimetru.
              </div>
              <div className="p-3 bg-neutral-950 rounded-lg border border-neutral-850">
                <strong className="text-white block mb-1">3. Lumină UV și Test Miros Adeziv</strong>
                Adezivul utilizat în fabricile autorizate are un miros distinct și nu lasă urme fluorescente haotice la lumina ultravioletă.
              </div>
            </div>
          </div>
        )}

        {topic === 'delivery' && (
          <div className="space-y-4 font-mono text-xs text-neutral-300">
            <div className="flex items-center gap-2 text-white pb-2 border-b border-neutral-800">
              <Truck className="w-6 h-6 text-emerald-400" />
              <h2 className="text-lg font-bold uppercase">Livrare Double-Boxed & Curierat</h2>
            </div>
            <p className="leading-relaxed">
              Expediem în toată România prin partenerii noștri oficiali Fan Courier și Sameday Easybox.
            </p>
            <div className="space-y-2.5 pt-2">
              <div className="p-3.5 bg-neutral-950 rounded-lg border border-neutral-850">
                <div className="flex justify-between font-bold text-white mb-1">
                  <span>Fan Courier la Ușă</span>
                  <span>22 RON (Gratuit peste 350 RON)</span>
                </div>
                <p className="text-neutral-400">
                  Timp de tranzit 24-48 ore. Coletul vine cu opțiunea de Verificare la Livrare înainte de a semna.
                </p>
              </div>

              <div className="p-3.5 bg-neutral-950 rounded-lg border border-neutral-850">
                <div className="flex justify-between font-bold text-white mb-1">
                  <span>Sameday Easybox Locker 24/7</span>
                  <span>16 RON (Gratuit peste 350 RON)</span>
                </div>
                <p className="text-neutral-400">
                  Ridicare flexibilă oricând din locker-ul selectat. Notificare prin SMS și cod PIN la sosire.
                </p>
              </div>

              <div className="p-3 bg-neutral-950 rounded-lg border border-neutral-850">
                <strong className="text-emerald-400 block mb-1">Standard Double-Box:</strong>
                Cutia originală a sneakerilor este introdusă într-o a doua cutie robustă din carton ondulat de 5 straturi, garantând că sosește intactă.
              </div>
            </div>
          </div>
        )}

        {topic === 'return' && (
          <div className="space-y-4 font-mono text-xs text-neutral-300">
            <div className="flex items-center gap-2 text-white pb-2 border-b border-neutral-800">
              <RotateCcw className="w-6 h-6 text-emerald-400" />
              <h2 className="text-lg font-bold uppercase">Politică de Retur 30 de Zile Garantat</h2>
            </div>
            <p className="leading-relaxed">
              Ai la dispoziție 30 de zile calendaristice de la primirea coletului pentru a returna produsul dacă mărimea nu ți se potrivește 
              sau dacă te-ai răzgândit.
            </p>
            <div className="space-y-2 pt-2">
              <div className="p-3 bg-neutral-950 rounded-lg border border-neutral-850">
                <strong className="text-white block mb-1">Condiții de Retur:</strong>
                Produsul trebuie să fie în aceeași stare în care a fost livrat (nepurtat la exterior, cu sigiliul de securitate ReSellix intact și în cutia originală cu toate accesoriile).
              </div>
              <div className="p-3 bg-neutral-950 rounded-lg border border-neutral-850">
                <strong className="text-white block mb-1">Rambursare Rapidă:</strong>
                Banii sunt returnați în contul tău bancar sau pe cardul utilizat în termen de maxim 48 de ore de la recepționarea și verificarea returului în depozit.
              </div>
            </div>
          </div>
        )}

        {topic === 'terms' && (
          <div className="space-y-4 font-mono text-xs text-neutral-300">
            <div className="flex items-center gap-2 text-white pb-2 border-b border-neutral-800">
              <FileText className="w-6 h-6 text-neutral-400" />
              <h2 className="text-lg font-bold uppercase">Termeni și Condiții & Confidențialitate</h2>
            </div>
            <div className="space-y-3 leading-relaxed">
              <p>
                <strong>1. Despre Platformă:</strong> ReSellix operează ca magazin specializat în vânzarea de articole de colecție originale Deadstock.
              </p>
              <p>
                <strong>2. Prețuri și Plăți:</strong> Toate prețurile afișate sunt exprimate în LEI (RON) și includ toate taxele aplicabile. Plățile online sunt procesate securizat prin protocoale 3D Secure 2.0.
              </p>
              <p>
                <strong>3. Protecția Datelor (GDPR):</strong> Datele dumneavoastră personale (nume, adresă, număr de telefon) sunt colectate exclusiv pentru facturare și livrarea comenzilor prin curierat autorizat și nu sunt transmise terților neautorizați.
              </p>
            </div>
          </div>
        )}

        <div className="pt-6 border-t border-neutral-800 text-right">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-white text-black font-mono text-xs font-bold uppercase rounded-lg hover:bg-neutral-200 transition-colors"
          >
            Am Înțeles
          </button>
        </div>

      </div>
    </div>
  );
};
