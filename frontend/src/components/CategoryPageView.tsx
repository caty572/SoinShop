import React, { useState, useEffect } from 'react';
import { Heart, Star, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { Product } from '../data/products';

export interface CategoryPageData {
  id: string;
  title: string;
  heroImage: string;
  description: string;
  products: Product[];
}

interface CategoryPageViewProps {
  category: CategoryPageData;
  onNavigateHome: () => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

export const CategoryPageView: React.FC<CategoryPageViewProps> = ({
  category,
  onNavigateHome,
  onSelectProduct,
  onAddToCart,
}) => {
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  const [addedProductId, setAddedProductId] = useState<string | null>(null);
  // 3 rows of 3 products per page; pages are changed with the pagination bar below
  const pageSize = 9;
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const totalPages = Math.max(1, Math.ceil(category.products.length / pageSize));
  const startIndex = currentPageIndex * pageSize;
  const displayedProducts = category.products.slice(startIndex, startIndex + pageSize);

  // Back to the first page when the category changes
  useEffect(() => {
    setCurrentPageIndex(0);
  }, [category.id]);

  const goToPage = (index: number) => {
    setCurrentPageIndex(index);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleFavorite = (productId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  const handleBuy = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, 1);
    setAddedProductId(product.id);
    setTimeout(() => {
      setAddedProductId(null);
    }, 900);
  };

  const renderCard = (product: Product) => {
    const isFav = favorites[product.id];
    const isJustAdded = addedProductId === product.id;

    return (
        <div
          key={product.id}
          onClick={() => onSelectProduct(product)}
          className="bg-white border border-slate-200 rounded-xs overflow-hidden flex flex-col shadow-xs hover:shadow-md transition-all cursor-pointer group animate-in fade-in duration-300"
        >
          {/* Product Image Box */}
          <div className="relative bg-white p-4 h-[200px] flex items-center justify-center border-b border-slate-100">
            {product.oldPrice && (
              <span className="absolute top-2.5 left-2.5 bg-[#b84e56] text-white text-[9.5px] font-bold px-1.5 py-0.5 rounded-xs uppercase tracking-wider z-10">
                Promo
              </span>
            )}

            {/* Heart button top right */}
            <button
              onClick={(e) => toggleFavorite(product.id, e)}
              className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full bg-white border border-[#438a27] flex items-center justify-center text-[#438a27] hover:bg-emerald-50 transition-colors z-10 cursor-pointer shadow-2xs"
              title="Ajouter aux favoris"
              aria-label="Favoris"
            >
              <Heart
                className={`w-3.5 h-3.5 ${
                  isFav ? 'fill-[#438a27]' : 'stroke-[#438a27]'
                }`}
              />
            </button>

            <img
              src={product.image}
              alt={product.name}
              className="max-h-[160px] max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Rating stars (5 empty/outlined stars as in original) */}
          <div className="bg-[#e4f1e5] px-3 pt-2 pb-1 text-center">
            <div className="flex items-center justify-center gap-0.5 text-slate-400">
              <Star className="w-3 h-3 stroke-slate-400 stroke-1 fill-transparent" />
              <Star className="w-3 h-3 stroke-slate-400 stroke-1 fill-transparent" />
              <Star className="w-3 h-3 stroke-slate-400 stroke-1 fill-transparent" />
              <Star className="w-3 h-3 stroke-slate-400 stroke-1 fill-transparent" />
              <Star className="w-3 h-3 stroke-slate-400 stroke-1 fill-transparent" />
            </div>
          </div>

          {/* Green mint metadata band */}
          <div className="bg-[#e4f1e5] px-3 pb-3 text-center flex-1 flex flex-col justify-between">
            <div>
              {/* Brand */}
              <div className="text-[11px] font-bold text-slate-800 uppercase tracking-wide mb-1">
                {product.brand}
              </div>

              {/* Product Name */}
              <h3 className="text-[10px] sm:text-[10.5px] font-bold text-slate-700 uppercase leading-snug line-clamp-2 mb-2 font-sans">
                {product.name}
              </h3>
            </div>

            {/* Price */}
            <div className="pt-1 flex items-center justify-center gap-2">
              <span className="text-[11.5px] font-bold text-slate-900 font-mono tracking-tight">
                {product.price.toFixed(3)} TND
              </span>
              {product.oldPrice && (
                <span className="text-[10px] text-slate-400 line-through font-mono">
                  {product.oldPrice.toFixed(3)} TND
                </span>
              )}
            </div>
          </div>

          {/* Buy Button ("Acheter") */}
          <button
            type="button"
            onClick={(e) => handleBuy(product, e)}
            className={`w-full py-2 px-3 text-[11.5px] font-bold uppercase tracking-wider text-white transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
              isJustAdded
                ? 'bg-emerald-800'
                : 'bg-[#549a42] hover:bg-[#438334]'
            }`}
          >
            {isJustAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                Ajouté !
              </>
            ) : (
              'Acheter'
            )}
          </button>
        </div>
    );
  };

  return (
    <div className="w-full bg-white select-none">
      {/* Dark green Breadcrumb Bar: Accueil > Category */}
      <div className="w-full bg-[#245423] text-white py-1 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto flex items-center text-[11px] font-medium tracking-wide">
          <button
            onClick={onNavigateHome}
            className="hover:underline text-emerald-100 hover:text-white cursor-pointer"
          >
            Accueil
          </button>
          <span className="mx-1.5 text-emerald-300/80">{'>'}</span>
          <span className="text-white capitalize">{category.title}</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        
        {/* Category Hero Box with green leaf in top right */}
        <div className="relative bg-white border border-slate-200 rounded-sm p-4 sm:p-6 mb-8 shadow-xs">
          {/* Tilted green leaf sprout in top-right corner */}
          <div className="absolute -top-3.5 -right-2 sm:-right-3 z-10 pointer-events-none transform rotate-12">
            <svg
              className="w-8 h-8 text-[#5ca82b] filter drop-shadow-xs"
              viewBox="0 0 32 32"
              fill="currentColor"
            >
              <path d="M24 6C16 8 8 16 8 26C14 25 22 21 24 6Z" />
              <path
                d="M24 6C26 12 25 20 20 23"
                stroke="#438421"
                strokeWidth="1.5"
                fill="none"
              />
            </svg>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Left side: Jasmine blossom + Bold Title */}
            <div className="w-full md:w-5/12 flex flex-col items-center md:items-start text-center md:text-left pl-2 sm:pl-6">
              {/* Jasmine sprig */}
              <div className="w-16 h-12 mb-3">
                <img
                  src="/src/assets/images/jasmine_blossom_sprig_1791376974252.jpg"
                  alt="Jasmin SoinShop"
                  className="w-full h-full object-contain filter drop-shadow-xs"
                />
              </div>

              {/* Category Title in textured green */}
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#3d871d] uppercase font-sans">
                {category.title}
              </h1>
            </div>

            {/* Right side: Category model / photo banner */}
            <div className="w-full md:w-7/12 flex justify-center md:justify-end">
              <div className="w-full max-w-[420px] aspect-16/10 rounded-xs overflow-hidden border border-slate-100 shadow-sm bg-slate-50">
                <img
                  src={category.heroImage}
                  alt={category.title}
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Category Description text */}
        <div className="max-w-3xl mx-auto text-center px-4 mb-8 sm:mb-10">
          <p className="text-xs sm:text-[13px] text-slate-700 leading-relaxed font-sans">
            {category.description}
          </p>
        </div>

        {/* 3 rows of 3 products */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {displayedProducts.map((product) => renderCard(product))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-10 flex items-center justify-center gap-2 text-xs">
              <button
                onClick={() => goToPage(currentPageIndex - 1)}
                disabled={currentPageIndex === 0}
                className="px-3 py-1.5 rounded-xs border border-slate-300 bg-white text-slate-700 hover:bg-slate-100 hover:text-[#186827] transition-colors flex items-center gap-1 cursor-pointer font-medium disabled:opacity-40 disabled:cursor-default"
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Précédent</span>
              </button>

              {Array.from({ length: totalPages }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goToPage(idx)}
                  className={`w-8 h-8 rounded-xs text-xs font-bold transition-all cursor-pointer ${
                    currentPageIndex === idx
                      ? 'bg-[#186827] text-white shadow-xs'
                      : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {idx + 1}
                </button>
              ))}

              <button
                onClick={() => goToPage(currentPageIndex + 1)}
                disabled={currentPageIndex === totalPages - 1}
                className="px-3.5 py-1.5 rounded-xs bg-[#438a27] hover:bg-[#346f1e] text-white font-bold transition-colors flex items-center gap-1 cursor-pointer shadow-xs disabled:opacity-40 disabled:cursor-default"
              >
                <span>Suivant</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
