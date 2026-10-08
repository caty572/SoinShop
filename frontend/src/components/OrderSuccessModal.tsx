import React from 'react';
import { CheckCircle2, PackageCheck, PhoneCall, ArrowRight } from 'lucide-react';

interface OrderSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderDetails: any;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({
  isOpen,
  onClose,
  orderDetails,
}) => {
  if (!isOpen || !orderDetails) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs animate-in zoom-in-95 duration-200">
      <div className="bg-white rounded-lg shadow-2xl max-w-md w-full overflow-hidden p-6 text-center">
        
        {/* Success Icon */}
        <div className="w-16 h-16 mx-auto mb-4 bg-emerald-100 rounded-full flex items-center justify-center text-[#186827]">
          <CheckCircle2 className="w-10 h-10 stroke-[2.2]" />
        </div>

        <h3 className="text-xl font-bold text-slate-900 mb-1">
          Commande Confirmée avec Succès !
        </h3>
        <p className="text-xs text-slate-500 mb-4">
          Référence de commande : <span className="font-mono font-bold text-slate-800">{orderDetails.orderId}</span>
        </p>

        {/* Details card */}
        <div className="bg-slate-50 border border-slate-200 rounded p-4 text-left text-xs space-y-2 mb-5">
          <div className="flex justify-between">
            <span className="text-slate-500">Destinataire :</span>
            <span className="font-semibold text-slate-800">{orderDetails.fullName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Téléphone :</span>
            <span className="font-semibold text-slate-800">{orderDetails.phone}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Gouvernorat :</span>
            <span className="font-semibold text-slate-800">{orderDetails.governorate}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Mode de règlement :</span>
            <span className="font-semibold text-emerald-800">Espèces à la livraison</span>
          </div>
          <div className="flex justify-between border-t border-slate-200 pt-2 font-bold text-sm">
            <span className="text-slate-800">Montant total :</span>
            <span className="font-mono text-emerald-800">{orderDetails.total.toFixed(3)} TND</span>
          </div>
        </div>

        <div className="bg-emerald-50 text-emerald-900 text-xs p-3 rounded mb-5 flex items-start gap-2 text-left">
          <PhoneCall className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
          <span>
            Notre service client vous contactera sous peu pour confirmer l'expédition. Livraison prévue sous <strong>48 à 72 heures</strong>.
          </span>
        </div>

        <button
          onClick={onClose}
          className="w-full bg-[#438a27] hover:bg-[#346f1e] text-white py-3 rounded-sm text-xs font-bold uppercase tracking-wider transition-colors shadow-sm cursor-pointer"
        >
          Continuer mes achats
        </button>

      </div>
    </div>
  );
};
