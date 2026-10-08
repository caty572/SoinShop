import React, { useState } from 'react';
import { User, ShoppingBag, Search, X } from 'lucide-react';
import { Product } from '../data/products';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenAccount: () => void;
  onSelectProduct: (product: Product) => void;
  onNavigateHome?: () => void;
  allProducts: Product[];
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  onOpenCart,
  onOpenAccount,
  onSelectProduct,
  onNavigateHome,
  allProducts,
}) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = searchQuery.trim()
    ? allProducts.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <header className="w-full bg-white relative z-30">
      {/* Top green announcement bar */}
      <div className="w-full bg-[#186827] text-white py-2 px-4 text-center">
        <p className="text-[13px] md:text-[15px] font-medium tracking-wide">
          La vitalité s'invite chez vous
        </p>
      </div>

      {/* Main header row */}
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between">
        {/* Brand Logo Lockup */}
        <div className="flex items-center gap-3">
          {/* Modern Botanical Pharmacy Emblem Badge */}
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-br from-[#1b6b2a] to-[#2e8a3f] p-0.5 shadow-md flex items-center justify-center shrink-0 cursor-pointer group hover:scale-105 transition-transform">
            <div className="w-full h-full rounded-full bg-white flex items-center justify-center relative overflow-hidden">
              <svg
                className="w-6 h-6"
                viewBox="0 0 36 36"
                fill="none"
              >
                {/* Subtle soft radial green glow in background */}
                <circle cx="18" cy="18" r="14" fill="#f0f7f1" />

                {/* Harmonious Pharmacy Cross + Botanical Leaf Fusion */}
                {/* Vertical bar of soft cross */}
                <rect x="16" y="9" width="4" height="18" rx="2" fill="#1b6b2a" opacity="0.9" />
                {/* Horizontal bar of soft cross */}
                <rect x="9" y="16" width="18" height="4" rx="2" fill="#1b6b2a" opacity="0.9" />

                {/* Elegant organic botanical leaf curving across */}
                <path
                  d="M18 10C24 10 27 16 26 23C21 24 15 21 15 15C15 12 16.5 10.5 18 10Z"
                  fill="#489b33"
                />

                {/* Leaf central vein in golden sunlight tint */}
                <path
                  d="M16 21C18 18 21 15 24 13"
                  stroke="#ffffff"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />

                {/* Purity droplet accent */}
                <circle cx="12" cy="12" r="2" fill="#388e3c" opacity="0.8" />
              </svg>
            </div>
          </div>

          {/* Brand Name Typography: Deep Forest Green 'Soin' + Vibrant Nature Green 'Shop' */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (onNavigateHome) onNavigateHome();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="select-none flex items-baseline cursor-pointer group"
          >
            <span className="text-[26px] sm:text-[28px] font-extrabold tracking-tight text-[#165a26] group-hover:text-[#11461d] transition-colors font-sans">
              Soin
            </span>
            <span className="text-[26px] sm:text-[28px] font-extrabold tracking-tight text-[#438a27] group-hover:text-[#36731d] transition-colors font-sans ml-0.5">
              Shop
            </span>
          </a>
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Search Toggle */}
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="p-2 text-slate-600 hover:text-[#186827] rounded-full hover:bg-slate-100 transition-colors"
            title="Rechercher un produit"
            aria-label="Recherche"
          >
            <Search className="w-5 h-5 text-slate-700" />
          </button>

          {/* Account Profile / Dashboard Button */}
          <button
            onClick={onOpenAccount}
            className="flex items-center gap-1.5 py-1 px-2.5 rounded-full hover:bg-emerald-50 text-[#186827] transition-all border border-emerald-200/80 hover:border-[#186827] cursor-pointer shadow-2xs group"
            title="Tableau de Bord & Espace Client SoinShop"
            aria-label="Tableau de bord et profil utilisateur"
          >
            <User className="w-5 h-5 stroke-[2.2] text-[#186827] group-hover:scale-105 transition-transform" />
            <span className="hidden sm:inline text-xs font-bold tracking-tight text-[#186827]">
              Mon Espace
            </span>
          </button>

          {/* Shopping Cart Button */}
          <button
            onClick={onOpenCart}
            className="relative p-2 text-slate-700 hover:text-[#186827] rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
            title="Panier"
            aria-label="Panier d'achat"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-[#186827] text-white text-[11px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Expandable search bar */}
      {isSearchOpen && (
        <div className="border-t border-slate-100 bg-[#fafafa] py-3 px-4 shadow-inner">
          <div className="max-w-xl mx-auto relative">
            <div className="flex items-center bg-white rounded-lg border border-slate-300 px-3 py-2 shadow-xs">
              <Search className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher crème solaire, vitamine C, sérum, SVR, Kenko..."
                className="w-full text-sm outline-none bg-transparent text-slate-800 placeholder-slate-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="p-1 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Live Search Results Dropdown */}
            {searchQuery.trim().length > 0 && (
              <div className="absolute left-0 right-0 top-full mt-1.5 bg-white rounded-lg shadow-xl border border-slate-200 z-50 max-h-72 overflow-y-auto divide-y divide-slate-100">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => {
                        onSelectProduct(p);
                        setIsSearchOpen(false);
                        setSearchQuery('');
                      }}
                      className="w-full text-left px-4 py-2.5 hover:bg-emerald-50/60 flex items-center gap-3 transition-colors"
                    >
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-10 h-10 object-contain rounded bg-slate-50 border border-slate-100 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-slate-800 truncate">
                          {p.name}
                        </p>
                        <p className="text-[11px] text-slate-500">
                          {p.brand} · <span className="text-emerald-700 font-medium">{p.price.toFixed(3)} TND</span>
                        </p>
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="px-4 py-6 text-center text-xs text-slate-500">
                    Aucun produit trouvé pour "{searchQuery}".
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
