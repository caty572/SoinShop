import React from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, Truck } from 'lucide-react';
import { Product } from '../data/products';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
}) => {
  if (!isOpen) return null;

  const FREE_SHIPPING_THRESHOLD = 99.0;
  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const shippingCost = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : 7.0;
  const total = subtotal + shippingCost;
  const freeShippingProgress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col transform transition-transform">
        
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#186827]" />
            <h3 className="font-bold text-slate-900 text-base">
              Votre Panier ({cart.reduce((c, i) => c + i.quantity, 0)})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-500 hover:text-slate-800 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Meter */}
        <div className="px-5 py-3 bg-[#eef7ee] border-b border-[#d8ecd8]">
          <div className="flex items-center gap-2 text-xs font-medium text-[#186827] mb-1.5">
            <Truck className="w-4 h-4 shrink-0" />
            {remainingForFreeShipping > 0 ? (
              <span>
                Plus que <strong className="font-mono">{remainingForFreeShipping.toFixed(3)} TND</strong> pour la livraison gratuite !
              </span>
            ) : (
              <span>Livraison gratuite activée sur votre commande ! 🎉</span>
            )}
          </div>
          <div className="w-full bg-[#d0e9d0] h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-[#3e8a20] h-full transition-all duration-300"
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto px-5 py-4 divide-y divide-slate-100">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12 text-slate-400">
              <ShoppingBag className="w-12 h-12 stroke-[1.2] mb-3 text-slate-300" />
              <p className="text-sm font-medium text-slate-600 mb-1">Votre panier est vide</p>
              <p className="text-xs text-slate-400 max-w-xs mb-4">
                Découvrez nos vitamines Kenko, protections solaires et coffrets cadeaux.
              </p>
              <button
                onClick={onClose}
                className="text-xs font-semibold text-[#186827] hover:underline cursor-pointer"
              >
                Explorer la boutique
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.product.id} className="py-3.5 flex gap-3 items-center">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-16 h-16 object-contain rounded bg-slate-50 border border-slate-100 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-slate-800 truncate">
                    {item.product.name}
                  </h4>
                  <div className="text-[11px] text-slate-500 mb-2">
                    {item.product.brand} · <span className="font-mono text-emerald-800 font-semibold">{item.product.price.toFixed(3)} TND</span>
                  </div>

                  <div className="flex items-center justify-between">
                    {/* Stepper */}
                    <div className="flex items-center border border-slate-200 rounded text-xs">
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, -1)}
                        className="px-2 py-0.5 text-slate-600 hover:bg-slate-100"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 font-mono font-semibold text-slate-800 min-w-6 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, 1)}
                        className="px-2 py-0.5 text-slate-600 hover:bg-slate-100"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Total item price */}
                    <span className="text-xs font-bold font-mono text-slate-900">
                      {(item.product.price * item.quantity).toFixed(3)} TND
                    </span>

                    {/* Delete */}
                    <button
                      onClick={() => onRemoveItem(item.product.id)}
                      className="text-slate-400 hover:text-red-600 p-1 transition-colors"
                      title="Supprimer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer with totals and checkout button */}
        {cart.length > 0 && (
          <div className="border-t border-slate-100 px-5 py-4 bg-slate-50 space-y-2">
            <div className="flex justify-between text-xs text-slate-600">
              <span>Sous-total</span>
              <span className="font-mono font-medium">{subtotal.toFixed(3)} TND</span>
            </div>
            <div className="flex justify-between text-xs text-slate-600">
              <span>Frais de livraison (Tunisie)</span>
              <span className="font-mono font-medium">
                {shippingCost === 0 ? (
                  <span className="text-emerald-700 font-semibold">Gratuit</span>
                ) : (
                  `${shippingCost.toFixed(3)} TND`
                )}
              </span>
            </div>
            <div className="border-t border-slate-200 pt-2 flex justify-between text-base font-bold text-slate-900">
              <span>Total à payer</span>
              <span className="font-mono text-emerald-800">{total.toFixed(3)} TND</span>
            </div>

            <button
              onClick={onProceedToCheckout}
              className="w-full mt-3 bg-[#438a27] hover:bg-[#346f1e] text-white py-3 px-4 rounded-sm text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md cursor-pointer transition-colors"
            >
              Commander (Paiement à la livraison)
              <ArrowRight className="w-4 h-4" />
            </button>
            <p className="text-[10px] text-center text-slate-400">
              Paiement en espèces lors de la réception de votre colis.
            </p>
          </div>
        )}

      </div>
    </div>
  );
};
