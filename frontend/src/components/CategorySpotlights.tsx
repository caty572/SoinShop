import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Product } from '../data/products';

interface CategorySpotlightsProps {
  onSelectCategory: (category: string) => void;
  onSelectProduct: (product: Product) => void;
  allProducts: Product[];
}

const discountOf = (p: Product) => (p.oldPrice ? 1 - p.price / p.oldPrice : 0);

// Best sellers first, then biggest discounts, so the first product shown is the most attractive;
// then keep one product per distinct picture so every switch is visible
const uniqueByImage = (items: Product[], firstId?: string) => {
  const sorted = [...items].sort(
    (a, b) =>
      Number(b.id === firstId) - Number(a.id === firstId) ||
      Number(!!b.isBestSeller) - Number(!!a.isBestSeller) ||
      discountOf(b) - discountOf(a)
  );
  const seen = new Set<string>();
  return sorted.filter((p) => (seen.has(p.image) ? false : (seen.add(p.image), true)));
};

/** Shows one product at a time; the arrows step through the list. */
const ProductRotator: React.FC<{
  products: Product[];
  onSelectProduct: (product: Product) => void;
}> = ({ products, onSelectProduct }) => {
  const [index, setIndex] = useState(0);

  if (products.length === 0) return null;
  const active = index % products.length;
  const current = products[active];

  const step = (delta: number) => (e: React.MouseEvent) => {
    e.stopPropagation();
    setIndex((i) => (i + delta + products.length) % products.length);
  };

  const arrowClass =
    'absolute top-[40%] -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white border border-slate-300 text-slate-700 hover:text-[#186827] hover:border-[#186827] shadow-md flex items-center justify-center cursor-pointer active:scale-95 transition-all z-10';

  return (
    <div className="relative w-[240px] sm:w-[320px] max-w-full">
      {products.length > 1 && (
        <>
          <button
            type="button"
            onClick={step(-1)}
            aria-label="Produit précédent"
            className={`${arrowClass} -left-5 sm:-left-12`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={step(1)}
            aria-label="Produit suivant"
            className={`${arrowClass} -right-5 sm:-right-12`}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}

      <div onClick={() => onSelectProduct(current)} className="cursor-pointer">
        <div className="relative w-full aspect-square">
          {/* soft green glow behind the product */}
          <div
            aria-hidden="true"
            className="absolute inset-[6%] rounded-full bg-[radial-gradient(circle,rgba(92,168,43,0.22)_0%,rgba(92,168,43,0.08)_55%,transparent_72%)]"
          />
          {/* badges */}
          <div className="absolute top-1 left-1 z-10 flex flex-col items-start gap-1">
            {current.isBestSeller && (
              <span className="bg-[#e8a317] text-white text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md">
                ★ Best Seller
              </span>
            )}
            {current.oldPrice && (
              <span className="bg-[#b84e56] text-white text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md">
                -{Math.round(discountOf(current) * 100)}%
              </span>
            )}
          </div>
          {products.map((p, i) => (
            <img
              key={p.id}
              src={p.image}
              alt={p.name}
              className={`absolute inset-0 w-full h-full object-contain filter drop-shadow-md transition-opacity duration-300 ${
                i === active ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ))}
        </div>

        <div className="text-center mt-2 min-h-[56px]">
          <p className="text-[11px] sm:text-xs font-bold text-slate-700 uppercase leading-snug line-clamp-2">
            {current.name}
          </p>
          <p className="text-sm sm:text-base font-bold text-[#186827] font-mono">
            {current.price.toFixed(3)} TND
            {current.oldPrice && (
              <span className="ml-2 text-xs text-slate-400 line-through font-normal">
                {current.oldPrice.toFixed(3)} TND
              </span>
            )}
          </p>
        </div>
      </div>

      {products.length > 1 && (
        <div className="flex justify-center gap-1.5 mt-1">
          {products.map((p, i) => (
            <span
              key={p.id}
              className={`w-1.5 h-1.5 rounded-full transition-colors ${
                i === active ? 'bg-[#438a27]' : 'bg-slate-300'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const SpotlightTitle: React.FC<{
  title: string;
  text: string;
  onClick: () => void;
}> = ({ title, text, onClick }) => (
  <div className="w-full sm:w-auto flex flex-col items-center sm:items-start text-center sm:text-left">
    <button
      onClick={onClick}
      className="group flex flex-col items-center sm:items-start cursor-pointer focus:outline-none"
    >
      <div className="w-16 h-12 mb-2 flex items-center justify-center transition-transform group-hover:scale-110">
        <img
          src="/src/assets/images/jasmine_blossom_sprig_1791376974252.jpg"
          alt="Fleur de jasmin naturelle"
          className="w-full h-full object-contain filter drop-shadow-xs"
        />
      </div>
      <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#3b871f] group-hover:text-[#2d6b15] transition-colors">
        {title}
      </h2>
      <p className="text-xs text-slate-500 mt-1 max-w-xs hidden sm:block">{text}</p>
    </button>
  </div>
);

export const CategorySpotlights: React.FC<CategorySpotlightsProps> = ({
  onSelectCategory,
  onSelectProduct,
  allProducts,
}) => {
  const promos = uniqueByImage(
    allProducts.filter((p) => p.category === 'promotions' || p.oldPrice),
    'isdin-fotoprotector-duo'
  );
  const coffrets = [...allProducts.filter((p) => p.category === 'coffrets')].sort(
    (a, b) => Number(!!b.isBestSeller) - Number(!!a.isBestSeller) || discountOf(b) - discountOf(a)
  );
  const beaute = uniqueByImage(
    allProducts.filter(
      (p) => p.category === 'beaute' || p.category === 'solaire' || p.id === 'svr-ampoule-anti-ox'
    ),
    'svr-ampoule-anti-ox'
  );

  const rowClass = 'items-center justify-center gap-10 sm:gap-24 lg:gap-32';

  return (
    <section className="w-full bg-white py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 space-y-16 sm:space-y-24">
        {/* ROW 1: products left | "Nos Promotions" right */}
        <div className={`flex flex-col sm:flex-row ${rowClass}`}>
          <ProductRotator products={promos} onSelectProduct={onSelectProduct} />
          <SpotlightTitle
            title="Nos Promotions"
            text="Jusqu'à -40% sur les duos dermo-cosmétiques & protections solaires"
            onClick={() => onSelectCategory('promotions')}
          />
        </div>

        {/* ROW 2: "Coffrets et Cadeaux" left | products right */}
        <div className={`flex flex-col-reverse sm:flex-row ${rowClass}`}>
          <SpotlightTitle
            title="Coffrets et Cadeaux"
            text="Rituels d'exception, trousses beauté & huiles précieuses prêtes à offrir"
            onClick={() => onSelectCategory('coffrets')}
          />
          <ProductRotator products={coffrets} onSelectProduct={onSelectProduct} />
        </div>

        {/* ROW 3: products left | "Beauté" right */}
        <div className={`flex flex-col sm:flex-row ${rowClass}`}>
          <ProductRotator products={beaute} onSelectProduct={onSelectProduct} />
          <SpotlightTitle
            title="Beauté"
            text="Sublimez votre grain de peau avec les technologies dermatologiques expertes"
            onClick={() => onSelectCategory('beaute')}
          />
        </div>
      </div>
    </section>
  );
};
