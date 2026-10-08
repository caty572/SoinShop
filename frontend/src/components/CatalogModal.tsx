import React from 'react';
import { X, ShoppingBag, Eye, ArrowLeft } from 'lucide-react';
import { Product } from '../data/products';

interface CatalogModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

export const CatalogModal: React.FC<CatalogModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  products,
  onSelectProduct,
  onAddToCart,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden my-4">
        
        {/* Header */}
        <div className="px-6 py-4 bg-[#f4f7f4] border-b border-slate-200 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-slate-900 font-sans">{title}</h3>
            {subtitle && (
              <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-200 text-slate-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Product Grid */}
        <div className="flex-1 overflow-y-auto p-6">
          {products.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              Aucun produit disponible dans cette catégorie actuellement.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((p) => (
                <div
                  key={p.id}
                  className="bg-white border border-slate-200 rounded-sm overflow-hidden flex flex-col group hover:shadow-lg transition-all duration-300"
                >
                  {/* Image container */}
                  <div
                    onClick={() => onSelectProduct(p)}
                    className="relative aspect-4/3 bg-[#fbfbfa] p-4 flex items-center justify-center cursor-pointer overflow-hidden border-b border-slate-100"
                  >
                    <img
                      src={p.image}
                      alt={p.name}
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                    {p.oldPrice && (
                      <span className="absolute top-2 left-2 bg-[#b84e56] text-white text-[10px] font-bold px-1.5 py-0.5 uppercase rounded-xs">
                        Promo
                      </span>
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-semibold text-emerald-800 tracking-wider">
                        {p.brand}
                      </span>
                      <h4
                        onClick={() => onSelectProduct(p)}
                        className="text-xs font-bold text-slate-800 line-clamp-2 hover:text-[#186827] cursor-pointer mt-1"
                      >
                        {p.name}
                      </h4>
                      <p className="text-[11px] text-slate-500 line-clamp-2 mt-1">
                        {p.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 mt-3 flex items-center justify-between">
                      <div>
                        <div className="text-sm font-bold text-slate-900 font-mono">
                          {p.price.toFixed(3)} TND
                        </div>
                        {p.oldPrice && (
                          <div className="text-[10px] text-slate-400 line-through font-mono">
                            {p.oldPrice.toFixed(3)} TND
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => onSelectProduct(p)}
                          className="p-1.5 rounded text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
                          title="Détails"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onAddToCart(p, 1)}
                          className="bg-[#438a27] hover:bg-[#346f1e] text-white p-1.5 px-2.5 rounded-sm text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                          title="Ajouter au panier"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Ajouter</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-200 rounded cursor-pointer transition-colors"
          >
            Fermer
          </button>
        </div>

      </div>
    </div>
  );
};
