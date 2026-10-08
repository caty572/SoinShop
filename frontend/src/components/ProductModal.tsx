import React, { useState } from 'react';
import { X, Check, ShieldCheck, Truck, Plus, Minus, ShoppingBag } from 'lucide-react';
import { Product } from '../data/products';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [addedAnimation, setAddedAnimation] = useState(false);

  if (!product) return null;

  const handleAdd = () => {
    onAddToCart(product, quantity);
    setAddedAnimation(true);
    setTimeout(() => {
      setAddedAnimation(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="bg-white rounded-lg shadow-2xl max-w-2xl w-full overflow-hidden relative max-h-[92vh] flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-20 p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
          aria-label="Fermer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Product Image Section */}
        <div className="w-full md:w-1/2 bg-[#f9faf8] p-6 flex items-center justify-center border-b md:border-b-0 md:border-r border-slate-100 relative">
          <img
            src={product.image}
            alt={product.name}
            className="max-h-[260px] md:max-h-[320px] object-contain drop-shadow-md"
          />
          {product.oldPrice && (
            <div className="absolute top-4 left-4 bg-[#b84e56] text-white text-[11px] font-bold px-2 py-0.5 rounded-xs uppercase">
              Promo
            </div>
          )}
        </div>

        {/* Details Section */}
        <div className="w-full md:w-1/2 p-6 flex flex-col justify-between overflow-y-auto">
          <div>
            {/* Brand and category */}
            <div className="text-[11px] uppercase tracking-wider font-semibold text-emerald-800 mb-1">
              {product.brand} · {product.categoryLabel}
            </div>

            <h3 className="text-xl font-bold text-slate-900 leading-snug mb-2 font-sans">
              {product.name}
            </h3>

            {product.subtitle && (
              <p className="text-xs text-slate-500 mb-3">{product.subtitle}</p>
            )}

            {/* Price */}
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-2xl font-bold text-slate-950 font-mono">
                {product.price.toFixed(3)} TND
              </span>
              {product.oldPrice && (
                <span className="text-sm text-slate-400 line-through font-mono">
                  {product.oldPrice.toFixed(3)} TND
                </span>
              )}
            </div>

            {/* In stock tag */}
            <div className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-sm mb-4">
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span>En stock - Livraison 48h</span>
            </div>

            {/* Description */}
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              {product.description}
            </p>

            <div className="text-[11px] text-slate-500 bg-slate-50 p-2.5 rounded border border-slate-100 mb-4">
              <span className="font-semibold text-slate-700">Utilisation : </span>
              {product.details}
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-3 border-t border-slate-100">
            <div className="flex items-center gap-3 mb-3">
              {/* Quantity Stepper */}
              <div className="flex items-center border border-slate-300 rounded-sm">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-2.5 py-1 text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-3 py-1 text-sm font-semibold text-slate-800 min-w-8 text-center font-mono">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-2.5 py-1 text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Add to Cart CTA */}
              <button
                type="button"
                onClick={handleAdd}
                className={`flex-1 py-2.5 px-4 rounded-sm text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs ${
                  addedAnimation
                    ? 'bg-emerald-700 text-white'
                    : 'bg-[#438a27] hover:bg-[#36731d] text-white'
                }`}
              >
                {addedAnimation ? (
                  <>
                    <Check className="w-4 h-4" />
                    Ajouté !
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    Ajouter au panier
                  </>
                )}
              </button>
            </div>

            {/* Trust notes */}
            <div className="flex items-center justify-between text-[10px] text-slate-400">
              <span className="flex items-center gap-1">
                <Truck className="w-3 h-3 text-emerald-600" /> Livraison Tunisie
              </span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-600" /> Paiement à la réception
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
