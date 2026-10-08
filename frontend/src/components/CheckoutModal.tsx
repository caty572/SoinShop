import React, { useState } from 'react';
import { X, CheckCircle, Truck, Phone, MapPin, User, ShieldCheck } from 'lucide-react';
import { CartItem } from './CartDrawer';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onOrderSuccess: (orderId: string, orderDetails: any) => void;
}

const TUNISIAN_GOVERNORATES = [
  'Ariana', 'Béja', 'Ben Arous', 'Bizerte', 'Gabès', 'Gafsa', 'Jendouba',
  'Kairouan', 'Kasserine', 'Kébili', 'Le Kef', 'Mahdia', 'La Manouba',
  'Médenine', 'Monastir', 'Nabeul', 'Sfax', 'Sidi Bouzid', 'Siliana',
  'Sousse', 'Tataouine', 'Tozeur', 'Tunis', 'Zaghouan'
];

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cart,
  onOrderSuccess,
}) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [governorate, setGovernorate] = useState('Tunis');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const FREE_SHIPPING_THRESHOLD = 99.0;
  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const shippingCost = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : 7.0;
  const total = subtotal + shippingCost;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim() || !address.trim()) return;

    setIsSubmitting(true);
    setError('');
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          phone,
          governorate,
          address,
          notes,
          items: cart.map((item) => ({ productId: item.product.id, quantity: item.quantity })),
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      const saved = await res.json();
      onOrderSuccess(saved.orderId, {
        orderId: saved.orderId,
        fullName,
        phone,
        governorate,
        address,
        notes,
        cart,
        total: saved.total,
      });
    } catch {
      setError("La commande n'a pas pu être enregistrée. Vérifiez que le serveur est démarré et réessayez.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-lg shadow-2xl max-w-lg w-full overflow-hidden my-6">
        
        {/* Header */}
        <div className="px-6 py-4 bg-[#186827] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Truck className="w-5 h-5 text-white" />
            <h3 className="font-bold text-base">Finaliser la commande</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-white/80 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded text-xs text-emerald-900 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>
              <strong>Paiement à la livraison :</strong> Vous réglerez en espèces à la réception de votre colis.
            </span>
          </div>

          {/* Form fields */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Nom et Prénom *
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Ex. Mohamed Ben Salem"
                className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded focus:border-[#186827] focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Numéro de téléphone *
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Ex. 98 123 456"
                  className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded focus:border-[#186827] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Gouvernorat *
              </label>
              <select
                value={governorate}
                onChange={(e) => setGovernorate(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded bg-white focus:border-[#186827] focus:outline-none"
              >
                {TUNISIAN_GOVERNORATES.map((gov) => (
                  <option key={gov} value={gov}>
                    {gov}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Adresse complète de livraison *
            </label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <textarea
                required
                rows={2}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Rue, numéro, appartement, ville ou repère..."
                className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded focus:border-[#186827] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Note pour le livreur (Optionnel)
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Ex. Appeler avant de venir, livrer l'après-midi..."
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded focus:border-[#186827] focus:outline-none"
            />
          </div>

          {/* Recap */}
          <div className="bg-slate-50 p-3 rounded border border-slate-200 text-xs space-y-1">
            <div className="flex justify-between text-slate-600">
              <span>Articles ({cart.length}) :</span>
              <span className="font-mono">{subtotal.toFixed(3)} TND</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Livraison à domicile :</span>
              <span className="font-mono">
                {shippingCost === 0 ? 'Gratuite' : `${shippingCost.toFixed(3)} TND`}
              </span>
            </div>
            <div className="flex justify-between font-bold text-slate-900 border-t border-slate-200 pt-1 text-sm">
              <span>Total :</span>
              <span className="font-mono text-emerald-800">{total.toFixed(3)} TND</span>
            </div>
          </div>

          {error && (
            <p className="text-xs text-red-700 bg-red-50 border border-red-200 rounded p-2">{error}</p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#438a27] hover:bg-[#346f1e] text-white py-3 rounded-sm text-xs font-bold uppercase tracking-wider transition-colors shadow-sm cursor-pointer disabled:opacity-50"
          >
            {isSubmitting ? 'Traitement en cours...' : `Confirmer la commande (${total.toFixed(3)} TND)`}
          </button>
        </form>

      </div>
    </div>
  );
};
