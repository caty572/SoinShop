/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { PRODUCTS as STATIC_PRODUCTS, BRANDS, Product } from './data/products';
import { Header } from './components/Header';
import { CategoryNav } from './components/CategoryNav';
import { HeroBanner } from './components/HeroBanner';
import { CategorySpotlights } from './components/CategorySpotlights';
import { CategoryPageView, CategoryPageData } from './components/CategoryPageView';
import { InfoPageView } from './components/InfoPageView';
import { BrandsSection } from './components/BrandsSection';
import { TrustBadges } from './components/TrustBadges';
import { Footer } from './components/Footer';
import { ProductModal } from './components/ProductModal';
import { CartDrawer, CartItem } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { CatalogModal } from './components/CatalogModal';
import { AccountModal } from './components/AccountModal';
import { OrderSuccessModal } from './components/OrderSuccessModal';

export default function App() {
  // Products are loaded from the backend (MySQL); the static list is used if the API is not running
  const [products, setProducts] = useState<Product[]>(STATIC_PRODUCTS);
  useEffect(() => {
    fetch('/api/products')
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .then((data: Product[]) => data.length > 0 && setProducts(data))
      .catch(() => console.warn('API indisponible : produits statiques utilisés'));
  }, []);

  // Navigation State
  const [currentPage, setCurrentPage] = useState<string>('home');

  // Shopping Cart & Modal State
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [orderConfirmation, setOrderConfirmation] = useState<any | null>(null);

  // Catalog modal state (for secondary collections and search)
  const [catalogState, setCatalogState] = useState<{
    isOpen: boolean;
    title: string;
    subtitle?: string;
    products: Product[];
  }>({
    isOpen: false,
    title: '',
    subtitle: '',
    products: [],
  });


  // Specific category and brand page configurations
  const ALL_PAGES: Record<string, CategoryPageData> = {
    visage: {
      id: 'visage',
      title: 'VISAGE',
      heroImage: '/src/assets/images/visage_hero_model_1791377828055.jpg',
      description:
        'Des gestes et des soins beauté qui apportent beauté, éclat et santé à votre visage. Prendre soin de sa peau au quotidien est nécessaire avec les agressions quotidiennes.',
      products: products.filter((p) => p.category === 'visage'),
    },
    cheveux: {
      id: 'cheveux',
      title: 'CHEVEUX',
      heroImage: '/src/assets/images/cheveux_hero_haircare_1791377840681.jpg',
      description:
        'Shampooings, après shampooing, colorations, masques, huiles, ... Tous les produits nécessaires pour une chevelure forte, brillante et saine. Soinshop.tn offre les soins adéquats selon la nature des cheveux et variés selon les différents traitements et gouts.',
      products: products.filter((p) => p.category === 'cheveux'),
    },
    solaire: {
      id: 'solaire',
      title: 'SOLAIRE',
      heroImage: '/src/assets/images/solaire_hero_beach_sun_1791377852704.jpg',
      description:
        'Explorez notre vaste sélection d\'écrans solaires et de produits de protection solaire, conçus pour vous offrir une défense efficace contre les rayons nocifs du soleil. Notre catégorie dédiée à la protection solaire propose une gamme complète de solutions pour protéger votre peau des effets néfastes du soleil et maintenir une peau saine et éclatante.',
      products: products.filter((p) => p.category === 'solaire'),
    },
    promotions: {
      id: 'promotions',
      title: 'PROMOTIONS',
      heroImage: '/src/assets/images/promotions_hero_1791378380040.jpg',
      description:
        'Profitez des meilleures réductions de parapharmacie en Tunisie : packs avantageux, duos nettoyant & solaire, et remises exceptionnelles sur les plus grandes marques dermatologiques.',
      products: products.filter((p) => p.category === 'promotions' || p.oldPrice),
    },
    coffrets: {
      id: 'coffrets',
      title: 'COFFRETS ET CADEAUX',
      heroImage: '/src/assets/images/coffrets_hero_1791378391951.jpg',
      description:
        'Pour offrir ou se faire plaisir, explorez nos trousses cadeaux de prestige, coffrets bien-être aux huiles naturelles précieuses, bougies d\'ambiance et rituels cocooning complets.',
      products: products.filter((p) => p.category === 'coffrets'),
    },
    beaute: {
      id: 'beaute',
      title: 'BEAUTÉ',
      heroImage: '/src/assets/images/beaute_hero_1791378403869.jpg',
      description:
        'Sublimez votre grain de peau avec nos innovations dermo-cosmétiques expertes : sérums anti-taches, formules repulpantes à l\'acide hyaluronique pur et soins illuminateurs de teint.',
      products: products.filter((p) => p.category === 'beaute'),
    },
    complements: {
      id: 'complements',
      title: 'COMPLÉMENTS & VITALITÉ',
      heroImage: '/src/assets/images/complements_hero_1791378413213.jpg',
      description:
        'Retrouvez énergie et équilibre avec nos compléments alimentaires sélectionnés : complexe multivitaminé, vitamine C bio-assimilable et magnésium marin contre la fatigue.',
      products: products.filter((p) => p.category === 'complements'),
    },

    // Brand Pages
    alania: {
      id: 'alania',
      title: 'MARQUE : ALANIA',
      heroImage: '/src/assets/images/visage_hero_model_1791377828055.jpg',
      description:
        'Laboratoire dermatologique d\'excellence formulant des soins ciblés haute tolérance à l\'acide hyaluronique et aux actifs régénérants pour toutes les peaux sensibles.',
      products: products.filter((p) => p.brand.toLowerCase().includes('alania')),
    },
    alliance: {
      id: 'alliance',
      title: 'MARQUE : ALLIANCE PHARMA',
      heroImage: '/src/assets/images/beaute_hero_1791378403869.jpg',
      description:
        'Solutions de référence internationale en dermatologie médicale, protections solaires et soins capillaires avancés recommandés par les dermatologues.',
      products: products.filter((p) => p.brand.toLowerCase().includes('alliance')),
    },
    almaflore: {
      id: 'almaflore',
      title: 'MARQUE : ALMAFLORE',
      heroImage: '/src/assets/images/coffrets_hero_1791378391951.jpg',
      description:
        'Pionnier de la phytothérapie et aromathérapie en Tunisie : huiles végétales vierges pures 100% bio, eaux florales précieuses et rituels sensoriels authentiques.',
      products: products.filter((p) => p.brand.toLowerCase().includes('almaflore')),
    },
    alvityl: {
      id: 'alvityl',
      title: 'MARQUE : ALVITYL',
      heroImage: '/src/assets/images/complements_hero_1791378413213.jpg',
      description:
        'Depuis plus de 60 ans, Alvityl accompagne petits et grands avec des formules multivitaminées et minérales parfaitement dosées pour booster la vitalité quotidienne.',
      products: products.filter((p) => p.brand.toLowerCase().includes('alvityl')),
    },
  };

  // Cart operations
  const handleAddToCart = (product: Product, quantity: number = 1) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.product.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { product, quantity }];
    });
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
  };

  // Nav selection
  const handleSelectNavCategory = (categoryId: string) => {
    if (ALL_PAGES[categoryId]) {
      setCurrentPage(categoryId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Homepage category spotlights click handler
  const handleSpotlightSelectCategory = (categoryId: string) => {
    if (ALL_PAGES[categoryId]) {
      setCurrentPage(categoryId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    let title = '';
    let subtitle = '';
    let filtered: Product[] = [];

    switch (categoryId) {
      case 'promotions':
        title = 'Nos Promotions';
        subtitle = 'Offres spéciales, duos et remises exclusives';
        filtered = products.filter((p) => p.category === 'promotions' || p.oldPrice);
        break;
      case 'coffrets':
        title = 'Coffrets et Cadeaux';
        subtitle = 'Trousses de beauté, bougies bien-être et rituels complets';
        filtered = products.filter((p) => p.category === 'coffrets');
        break;
      case 'beaute':
        title = 'Beauté & Cosmétique';
        subtitle = 'Technologies innovantes pour sublimer le grain de peau';
        filtered = products.filter((p) => p.category === 'beaute' || p.category === 'solaire');
        break;
      default:
        title = 'Nos Produits';
        filtered = products;
    }

    setCatalogState({
      isOpen: true,
      title,
      subtitle,
      products: filtered,
    });
  };

  // Brand selection handler
  const handleSelectBrand = (brandId: string) => {
    if (ALL_PAGES[brandId]) {
      setCurrentPage(brandId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const brand = BRANDS.find((b) => b.id === brandId);
    if (!brand) return;

    const filtered = products.filter((p) =>
      p.brand.toLowerCase().includes(brand.name.toLowerCase())
    );

    setCatalogState({
      isOpen: true,
      title: `Marque : ${brand.name}`,
      subtitle: `${brand.subtitle} - ${brand.description}`,
      products: filtered.length > 0 ? filtered : products,
    });
  };

  const handleOrderSuccess = (orderId: string, details: any) => {
    setCart([]);
    setIsCheckoutOpen(false);
    setOrderConfirmation(details);
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans">
      {/* 1. Header (Top bar + SoinShop brand logo + search + account + cart) */}
      <Header
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAccount={() => setIsAccountOpen(true)}
        onSelectProduct={(p) => setSelectedProduct(p)}
        onNavigateHome={() => {
          setCurrentPage('home');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        allProducts={products}
      />

      {/* 2. Category Nav (Visage | Cheveux | Solaire | Promotions | Coffrets | Beauté | Compléments) */}
      <CategoryNav
        activeCategory={currentPage === 'home' ? null : currentPage}
        onSelectCategory={handleSelectNavCategory}
      />

      {/* 3. Main Page Content */}
      <main className="flex-1">
        {currentPage === 'home' ? (
          /* HOMEPAGE VIEW */
          <>
            {/* Hero Foliage Banner matching user's upload */}
            <HeroBanner />

            {/* Alternating Category Spotlights (Promotions, Coffrets et Cadeaux, Beauté) */}
            <CategorySpotlights
              onSelectCategory={handleSpotlightSelectCategory}
              onSelectProduct={(p) => setSelectedProduct(p)}
              allProducts={products}
            />
          </>
        ) : currentPage === 'about' || currentPage === 'delivery' || currentPage === 'contact' ? (
          /* INFORMATIONAL PAGES */
          <InfoPageView
            type={currentPage as 'about' | 'delivery' | 'contact'}
            onNavigateHome={() => {
              setCurrentPage('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        ) : ALL_PAGES[currentPage] ? (
          /* DEDICATED CATEGORY OR BRAND PAGE VIEW */
          <CategoryPageView
            category={ALL_PAGES[currentPage]}
            onNavigateHome={() => {
              setCurrentPage('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onSelectProduct={(p) => setSelectedProduct(p)}
            onAddToCart={(p, qty) => handleAddToCart(p, qty)}
          />
        ) : null}

        {/* 4. "Nos marques" Section */}
        <BrandsSection onSelectBrand={handleSelectBrand} />

        {/* 5. The 4 Trust Guarantees */}
        <TrustBadges />
      </main>

      {/* 6. Footer (Double leaf sprout & SUIVEZ NOUS & Info Links) */}
      <Footer
        onNavigateInfo={(infoPage) => {
          setCurrentPage(infoPage);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Modals and Drawers */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={(prod, qty) => handleAddToCart(prod, qty)}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        onOrderSuccess={handleOrderSuccess}
      />

      <CatalogModal
        isOpen={catalogState.isOpen}
        onClose={() => setCatalogState((prev) => ({ ...prev, isOpen: false }))}
        title={catalogState.title}
        subtitle={catalogState.subtitle}
        products={catalogState.products}
        onSelectProduct={(p) => setSelectedProduct(p)}
        onAddToCart={(p, qty) => handleAddToCart(p, qty)}
      />

      <AccountModal
        isOpen={isAccountOpen}
        onClose={() => setIsAccountOpen(false)}
        onSelectProduct={(p) => setSelectedProduct(p)}
        onAddToCart={(p, qty) => handleAddToCart(p, qty)}
      />

      <OrderSuccessModal
        isOpen={Boolean(orderConfirmation)}
        onClose={() => setOrderConfirmation(null)}
        orderDetails={orderConfirmation}
      />
    </div>
  );
}

