import React, { useState } from 'react';
import {
  X,
  User,
  Package,
  MapPin,
  Phone,
  Heart,
  Truck,
  CheckCircle2,
  Clock,
  Sparkles,
  Award,
  AlertTriangle,
  FileText,
  RotateCcw,
  ShoppingBag,
  TrendingUp,
  Store,
  Layers,
  ChevronRight,
  ShieldCheck,
  Plus,
  Trash2,
  Check,
} from 'lucide-react';
import { Product, PRODUCTS } from '../data/products';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct?: (product: Product) => void;
  onAddToCart?: (product: Product, quantity: number) => void;
}

export const AccountModal: React.FC<AccountModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
  onAddToCart,
}) => {
  // Mode: 'customer' or 'admin'
  const [activeMode, setActiveMode] = useState<'customer' | 'admin'>('customer');

  // Customer Tabs
  const [activeCustomerTab, setActiveCustomerTab] = useState<
    'overview' | 'orders' | 'favorites' | 'addresses' | 'routine'
  >('overview');

  // Admin orders state with live status updating
  const [adminOrders, setAdminOrders] = useState([
    {
      id: 'SOIN-2026-8942',
      customer: 'Syrine Ben Ali',
      city: 'Tunis (Lac 2)',
      total: 106.4,
      items: 'SVR Duo Sebiaclear + Kenko Vitamine C',
      time: 'Il y a 35 min',
      status: 'En transit',
      carrier: 'Aramex Express',
    },
    {
      id: 'SOIN-2026-8941',
      customer: 'Karim Mansouri',
      city: 'Sousse (Kantaoui)',
      total: 78.5,
      items: 'Ducray Anaphase + Shampooing Pharmaceris',
      time: 'Il y a 1h 15 min',
      status: 'À préparer',
      carrier: 'Colissimo Tunisie',
    },
    {
      id: 'SOIN-2026-8940',
      customer: 'Amira Dridi',
      city: 'Sfax (Ville Nouvelle)',
      total: 142.0,
      items: 'Coffret Prestige Almaflore + Eau Micellaire',
      time: 'Il y a 2h',
      status: 'Livrée',
      carrier: 'Aramex Express',
    },
    {
      id: 'SOIN-2026-8939',
      customer: 'Youssef Trabelsi',
      city: 'Nabeul (Hammamet)',
      total: 62.0,
      items: 'CeraVe Baume Hydratant 454g',
      time: 'Il y a 3h',
      status: 'Livrée',
      carrier: 'Express Livraison',
    },
  ]);

  // Stock inventory alerts with live restock button
  const [stockAlerts, setStockAlerts] = useState([
    { id: 'kenko-vitamine-c', name: 'Kenko Power Vitamine C 1000mg', stock: 4, minThreshold: 10 },
    { id: 'svr-promo-duo', name: 'Pack Duo SVR Sebiaclear & Sun Secure', stock: 6, minThreshold: 15 },
    { id: 'isdin-fotoprotector-duo', name: 'ISDIN Fusion Water Magic SPF 50+', stock: 5, minThreshold: 12 },
  ]);

  // Saved addresses state
  const [addresses, setAddresses] = useState([
    {
      id: 'addr-1',
      title: 'Domicile (Par défaut)',
      recipient: 'Syrine Ben Ali',
      phone: '+216 29 450 120',
      street: 'Résidence Les Jardins, Apt B4, Les Berges du Lac 2',
      city: 'Tunis',
      zip: '1053',
      isDefault: true,
    },
    {
      id: 'addr-2',
      title: 'Bureau',
      recipient: 'Syrine Ben Ali',
      phone: '+216 71 888 999',
      street: 'Immeuble Alyssa, 3ème étage, Centre Urbain Nord',
      city: 'Tunis',
      zip: '1082',
      isDefault: false,
    },
  ]);

  const [newAddressFormOpen, setNewAddressFormOpen] = useState(false);
  const [newAddress, setNewAddress] = useState({
    title: '',
    recipient: 'Syrine Ben Ali',
    phone: '+216 29 450 120',
    street: '',
    city: 'Tunis',
    zip: '',
  });

  // Re-order confirmation toast
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setActionMessage(msg);
    setTimeout(() => setActionMessage(null), 3000);
  };

  const handleRestock = (itemIndex: number) => {
    setStockAlerts((prev) =>
      prev.map((item, idx) => (idx === itemIndex ? { ...item, stock: item.stock + 20 } : item))
    );
    showNotification('Stock réapprovisionné avec succès (+20 unités) !');
  };

  const handleCycleOrderStatus = (orderId: string) => {
    setAdminOrders((prev) =>
      prev.map((ord) => {
        if (ord.id === orderId) {
          const nextStatus =
            ord.status === 'À préparer'
              ? 'En transit'
              : ord.status === 'En transit'
              ? 'Livrée'
              : 'À préparer';
          return { ...ord, status: nextStatus };
        }
        return ord;
      })
    );
    showNotification('Statut de commande mis à jour avec succès.');
  };

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddress.street || !newAddress.title) return;
    setAddresses((prev) => [
      ...prev,
      {
        id: `addr-${Date.now()}`,
        ...newAddress,
        isDefault: false,
      },
    ]);
    setNewAddressFormOpen(false);
    setNewAddress({
      title: '',
      recipient: 'Syrine Ben Ali',
      phone: '+216 29 450 120',
      street: '',
      city: 'Tunis',
      zip: '',
    });
    showNotification('Nouvelle adresse enregistrée !');
  };

  // Sample favorite products
  const favoriteProducts = PRODUCTS.slice(0, 4);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden border border-slate-200">
        
        {/* Top Header Bar */}
        <div className="px-5 py-3.5 bg-gradient-to-r from-[#165a26] to-[#256c36] text-white flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center backdrop-blur-xs border border-white/20">
              <Sparkles className="w-4 h-4 text-emerald-200" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-extrabold text-base tracking-tight">Tableau de Bord SoinShop</h2>
                <span className="bg-emerald-400/20 text-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-300/30">
                  {activeMode === 'customer' ? 'Espace Client' : 'Gestion Parapharmacie'}
                </span>
              </div>
              <p className="text-[11px] text-emerald-100/80 font-medium">
                Parapharmacie & Soins de Beauté Certifiés · Tunisie
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Mode Switcher Toggle */}
            <div className="flex items-center bg-black/20 p-1 rounded-lg border border-white/10 text-xs">
              <button
                type="button"
                onClick={() => setActiveMode('customer')}
                className={`px-2.5 py-1 rounded-md font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeMode === 'customer'
                    ? 'bg-white text-[#186827] shadow-xs'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                <User className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Espace Client</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveMode('admin')}
                className={`px-2.5 py-1 rounded-md font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeMode === 'admin'
                    ? 'bg-white text-[#186827] shadow-xs'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                <Store className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Gestion Boutique</span>
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-white/80 hover:text-white hover:bg-white/15 transition-colors cursor-pointer"
              title="Fermer"
              aria-label="Fermer le tableau de bord"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Action toast message if any */}
        {actionMessage && (
          <div className="bg-[#edf6ed] border-b border-emerald-200 px-4 py-2 text-xs font-semibold text-[#186827] flex items-center justify-between animate-in slide-in-from-top-1">
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-[#186827]" />
              {actionMessage}
            </span>
            <button
              onClick={() => setActionMessage(null)}
              className="text-emerald-700 hover:text-emerald-900"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* MAIN BODY: CUSTOMER MODE */}
        {activeMode === 'customer' ? (
          <div className="flex-1 overflow-y-auto">
            
            {/* User Profile Banner & Key Metrics */}
            <div className="bg-gradient-to-b from-[#f8faf8] to-white border-b border-slate-100 p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                
                {/* Profile Identity */}
                <div className="flex items-center gap-3.5">
                  <div className="relative">
                    <div className="w-14 h-14 rounded-full bg-[#186827] text-white flex items-center justify-center font-bold text-xl shadow-md border-2 border-white">
                      SB
                    </div>
                    <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white" />
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-extrabold text-slate-900">Syrine Ben Ali</h3>
                      <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-800 text-[10.5px] font-bold px-2 py-0.5 rounded-full border border-amber-200 shadow-2xs">
                        <Award className="w-3 h-3 text-amber-600" />
                        SoinClub Gold
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Client vérifié · +216 29 450 120 · Tunis, Tunisie
                    </p>
                  </div>
                </div>

                {/* VIP Coupon Banner */}
                <div className="bg-emerald-50 border border-emerald-200/80 rounded-lg p-2.5 sm:p-3 flex items-center gap-3">
                  <div className="p-2 rounded-md bg-[#186827] text-white shrink-0">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] font-semibold text-emerald-800 uppercase tracking-wide">
                      Remise Exclusive VIP -15%
                    </div>
                    <div className="text-xs text-slate-700">
                      Code : <code className="bg-white px-1.5 py-0.5 rounded font-mono font-bold text-[#186827] border border-emerald-300">SOINGOLD15</code>
                    </div>
                  </div>
                </div>

              </div>

              {/* 4 KPI Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-5">
                <div className="bg-white rounded-lg p-3 border border-slate-200/90 shadow-2xs flex items-center gap-3">
                  <div className="p-2 rounded-md bg-blue-50 text-blue-700 shrink-0">
                    <Package className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-lg font-black text-slate-900 leading-tight">1</div>
                    <div className="text-[11px] text-slate-500 font-medium">Commande active</div>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-3 border border-slate-200/90 shadow-2xs flex items-center gap-3">
                  <div className="p-2 rounded-md bg-amber-50 text-amber-700 shrink-0">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-lg font-black text-slate-900 leading-tight">185 pts</div>
                    <div className="text-[11px] text-slate-500 font-medium">= 18,500 TND</div>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-3 border border-slate-200/90 shadow-2xs flex items-center gap-3">
                  <div className="p-2 rounded-md bg-emerald-50 text-emerald-700 shrink-0">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-lg font-black text-slate-900 leading-tight">42,500 TND</div>
                    <div className="text-[11px] text-slate-500 font-medium">Économies promos</div>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-3 border border-slate-200/90 shadow-2xs flex items-center gap-3">
                  <div className="p-2 rounded-md bg-rose-50 text-rose-700 shrink-0">
                    <Heart className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-lg font-black text-slate-900 leading-tight">4</div>
                    <div className="text-[11px] text-slate-500 font-medium">Favoris enregistrés</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Tabs Bar */}
            <div className="px-4 sm:px-6 border-b border-slate-200 bg-white sticky top-0 z-10">
              <div className="flex items-center gap-2 sm:gap-6 overflow-x-auto py-2 scrollbar-none text-xs">
                <button
                  onClick={() => setActiveCustomerTab('overview')}
                  className={`pb-2 pt-1 font-bold tracking-tight border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                    activeCustomerTab === 'overview'
                      ? 'border-[#186827] text-[#186827]'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <Truck className="w-3.5 h-3.5" />
                  Suivi en Direct & Aperçu
                </button>

                <button
                  onClick={() => setActiveCustomerTab('orders')}
                  className={`pb-2 pt-1 font-bold tracking-tight border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                    activeCustomerTab === 'orders'
                      ? 'border-[#186827] text-[#186827]'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <Package className="w-3.5 h-3.5" />
                  Mes Commandes (3)
                </button>

                <button
                  onClick={() => setActiveCustomerTab('favorites')}
                  className={`pb-2 pt-1 font-bold tracking-tight border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                    activeCustomerTab === 'favorites'
                      ? 'border-[#186827] text-[#186827]'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <Heart className="w-3.5 h-3.5" />
                  Mes Favoris ({favoriteProducts.length})
                </button>

                <button
                  onClick={() => setActiveCustomerTab('addresses')}
                  className={`pb-2 pt-1 font-bold tracking-tight border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                    activeCustomerTab === 'addresses'
                      ? 'border-[#186827] text-[#186827]'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <MapPin className="w-3.5 h-3.5" />
                  Adresses Tunisie ({addresses.length})
                </button>

                <button
                  onClick={() => setActiveCustomerTab('routine')}
                  className={`pb-2 pt-1 font-bold tracking-tight border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                    activeCustomerTab === 'routine'
                      ? 'border-[#186827] text-[#186827]'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Conseil Dermo & Routine
                </button>
              </div>
            </div>

            {/* TAB CONTENTS */}
            <div className="p-4 sm:p-6 space-y-6">

              {/* 1. OVERVIEW & LIVE TRACKER */}
              {activeCustomerTab === 'overview' && (
                <div className="space-y-6">
                  
                  {/* Live Delivery Tracker Box */}
                  <div className="bg-white rounded-xl border border-emerald-200/80 shadow-xs overflow-hidden">
                    <div className="p-4 bg-emerald-50/60 border-b border-emerald-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                          <span className="text-xs font-bold text-emerald-900 uppercase tracking-wider">
                            Livraison en cours d'acheminement
                          </span>
                        </div>
                        <div className="text-sm font-extrabold text-slate-900 mt-0.5">
                          Commande #SOIN-2026-8942 · Aramex Express (TN-89421)
                        </div>
                      </div>

                      <div className="text-xs text-right text-slate-600">
                        Livraison estimée :{' '}
                        <strong className="text-slate-900 font-bold">Aujourd'hui avant 17h00</strong>
                      </div>
                    </div>

                    <div className="p-5">
                      {/* Timeline Steps */}
                      <div className="relative">
                        <div className="hidden sm:block absolute top-1/2 left-6 right-6 h-1 bg-slate-200 -translate-y-1/2 z-0" />
                        <div className="hidden sm:block absolute top-1/2 left-6 right-1/3 h-1 bg-emerald-600 -translate-y-1/2 z-0" />

                        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 relative z-10">
                          {/* Step 1 */}
                          <div className="flex sm:flex-col items-center gap-3 sm:gap-2 text-left sm:text-center">
                            <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                              <CheckCircle2 className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="text-xs font-bold text-slate-900">Validée</div>
                              <div className="text-[10px] text-slate-500">09:15 · Parapharmacie</div>
                            </div>
                          </div>

                          {/* Step 2 */}
                          <div className="flex sm:flex-col items-center gap-3 sm:gap-2 text-left sm:text-center">
                            <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                              <CheckCircle2 className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="text-xs font-bold text-slate-900">Préparée</div>
                              <div className="text-[10px] text-slate-500">10:30 · Colis scellé</div>
                            </div>
                          </div>

                          {/* Step 3 (Active) */}
                          <div className="flex sm:flex-col items-center gap-3 sm:gap-2 text-left sm:text-center">
                            <div className="w-8 h-8 rounded-full bg-emerald-600 text-white ring-4 ring-emerald-100 flex items-center justify-center font-bold text-xs shadow-md animate-bounce">
                              <Truck className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="text-xs font-extrabold text-emerald-800">En cours de livraison</div>
                              <div className="text-[10px] text-slate-500">13:10 · Avec le coursier</div>
                            </div>
                          </div>

                          {/* Step 4 */}
                          <div className="flex sm:flex-col items-center gap-3 sm:gap-2 text-left sm:text-center opacity-50">
                            <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center font-bold text-xs">
                              <MapPin className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="text-xs font-bold text-slate-700">Remise en main propre</div>
                              <div className="text-[10px] text-slate-500">Prévue : 16:30</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Package contents & courier details */}
                      <div className="mt-6 pt-4 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                        <div className="bg-slate-50 p-3 rounded-lg border border-slate-200/80">
                          <span className="font-bold text-slate-800 block mb-1">
                            Articles du colis (2) :
                          </span>
                          <ul className="text-slate-600 space-y-1">
                            <li>• 1x SVR Sebiaclear & Sun Secure Duo SPF50+</li>
                            <li>• 1x Kenko Power Vitamine C 1000mg (60 gélules)</li>
                          </ul>
                          <div className="mt-2 text-slate-900 font-bold font-mono">
                            Total : 106,400 TND (Paiement à la livraison)
                          </div>
                        </div>

                        <div className="bg-slate-50 p-3 rounded-lg border border-slate-200/80 flex flex-col justify-between">
                          <div>
                            <span className="font-bold text-slate-800 block mb-1">
                              Contact Livreur Aramex :
                            </span>
                            <p className="text-slate-600">
                              Coursier : Mohamed T. (Zone Tunis Lac 2)
                            </p>
                          </div>
                          <div className="pt-2 flex items-center gap-2">
                            <a
                              href="tel:+21629888123"
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#186827] text-white rounded text-[11px] font-bold hover:bg-[#124d1e] transition-colors"
                            >
                              <Phone className="w-3 h-3" /> Appeler le livreur
                            </a>
                            <span className="text-[10px] text-slate-500">Dispo jusqu'à 18h</span>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* Loyalty Points Redemption Banner */}
                  <div className="bg-gradient-to-r from-emerald-800 to-[#186827] text-white rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
                    <div className="space-y-1 text-center sm:text-left">
                      <div className="flex items-center justify-center sm:justify-start gap-1.5 text-emerald-200 text-xs font-bold uppercase tracking-wider">
                        <Award className="w-4 h-4" /> Programme Fidélité SoinClub
                      </div>
                      <h4 className="text-base sm:text-lg font-extrabold">
                        Vous avez 185 points disponibles
                      </h4>
                      <p className="text-xs text-emerald-100 max-w-md">
                        Transformez vos points en un bon d'achat immédiat de <strong>18,500 TND</strong> déductible de votre prochaine commande.
                      </p>
                    </div>

                    <button
                      onClick={() => showNotification('Bon d\'achat de 18,500 TND appliqué à votre panier !')}
                      className="px-4 py-2 bg-white text-[#186827] hover:bg-emerald-50 rounded-lg text-xs font-extrabold uppercase tracking-wide transition-all shadow-xs cursor-pointer shrink-0 active:scale-95"
                    >
                      Utiliser mes 18,500 TND
                    </button>
                  </div>

                </div>
              )}

              {/* 2. ORDERS HISTORY */}
              {activeCustomerTab === 'orders' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs">
                    <h4 className="font-extrabold text-slate-800">Historique des Commandes (3)</h4>
                    <span className="text-slate-500">Factures conformes certifiées par SoinShop</span>
                  </div>

                  {/* Order Card 1 */}
                  <div className="border border-slate-200 rounded-lg p-4 bg-white shadow-2xs space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-100">
                      <div>
                        <span className="font-extrabold text-sm text-slate-900">#SOIN-2026-8942</span>
                        <span className="text-xs text-slate-500 ml-2">07 Octobre 2026</span>
                      </div>
                      <span className="bg-blue-50 text-blue-700 text-xs font-bold px-2.5 py-0.5 rounded-full border border-blue-200">
                        En transit (Aramex)
                      </span>
                    </div>

                    <div className="text-xs text-slate-600 flex justify-between items-center">
                      <div>
                        <div className="font-medium text-slate-800">
                          SVR Duo Sebiaclear SPF50+ + Kenko Vitamine C
                        </div>
                        <div className="text-[11px] text-slate-400">Paiement à la livraison · Tunis Lac 2</div>
                      </div>
                      <div className="text-right font-mono font-bold text-sm text-slate-900">
                        106,400 TND
                      </div>
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-50 text-xs">
                      <button
                        onClick={() => showNotification('Facture PDF #SOIN-2026-8942 téléchargée !')}
                        className="flex items-center gap-1 text-slate-600 hover:text-[#186827] px-2.5 py-1 rounded border border-slate-200 hover:border-slate-300"
                      >
                        <FileText className="w-3.5 h-3.5" /> Facture PDF
                      </button>
                      <button
                        onClick={() => setActiveCustomerTab('overview')}
                        className="px-3 py-1 bg-[#186827] text-white rounded font-semibold hover:bg-[#124d1e]"
                      >
                        Suivre le colis
                      </button>
                    </div>
                  </div>

                  {/* Order Card 2 */}
                  <div className="border border-slate-200 rounded-lg p-4 bg-white shadow-2xs space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-100">
                      <div>
                        <span className="font-extrabold text-sm text-slate-900">#SOIN-2026-7810</span>
                        <span className="text-xs text-slate-500 ml-2">18 Septembre 2026</span>
                      </div>
                      <span className="bg-emerald-50 text-emerald-700 text-xs font-bold px-2.5 py-0.5 rounded-full border border-emerald-200">
                        Livrée avec succès
                      </span>
                    </div>

                    <div className="text-xs text-slate-600 flex justify-between items-center">
                      <div>
                        <div className="font-medium text-slate-800">
                          Avène Hydrance Crème Riche + Bioderma Sensibio H2O 500ml
                        </div>
                        <div className="text-[11px] text-slate-400">Payé par Carte Bancaire · Tunis Lac 2</div>
                      </div>
                      <div className="text-right font-mono font-bold text-sm text-slate-900">
                        80,500 TND
                      </div>
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-50 text-xs">
                      <button
                        onClick={() => showNotification('Facture PDF #SOIN-2026-7810 téléchargée !')}
                        className="flex items-center gap-1 text-slate-600 hover:text-[#186827] px-2.5 py-1 rounded border border-slate-200 hover:border-slate-300"
                      >
                        <FileText className="w-3.5 h-3.5" /> Facture PDF
                      </button>
                      <button
                        onClick={() => showNotification('Articles ajoutés au panier pour renouveler la commande !')}
                        className="flex items-center gap-1 text-[#186827] hover:bg-emerald-50 px-2.5 py-1 rounded border border-emerald-300 font-semibold"
                      >
                        <RotateCcw className="w-3.5 h-3.5" /> Commander à nouveau
                      </button>
                    </div>
                  </div>

                  {/* Order Card 3 */}
                  <div className="border border-slate-200 rounded-lg p-4 bg-white shadow-2xs space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-100">
                      <div>
                        <span className="font-extrabold text-sm text-slate-900">#SOIN-2026-6420</span>
                        <span className="text-xs text-slate-500 ml-2">02 Août 2026</span>
                      </div>
                      <span className="bg-emerald-50 text-emerald-700 text-xs font-bold px-2.5 py-0.5 rounded-full border border-emerald-200">
                        Livrée avec succès
                      </span>
                    </div>

                    <div className="text-xs text-slate-600 flex justify-between items-center">
                      <div>
                        <div className="font-medium text-slate-800">
                          ISDIN Fusion Water Magic SPF 50+ (2 flacons)
                        </div>
                        <div className="text-[11px] text-slate-400">Paiement à la livraison · Tunis Lac 2</div>
                      </div>
                      <div className="text-right font-mono font-bold text-sm text-slate-900">
                        149,000 TND
                      </div>
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-50 text-xs">
                      <button
                        onClick={() => showNotification('Facture PDF #SOIN-2026-6420 téléchargée !')}
                        className="flex items-center gap-1 text-slate-600 hover:text-[#186827] px-2.5 py-1 rounded border border-slate-200 hover:border-slate-300"
                      >
                        <FileText className="w-3.5 h-3.5" /> Facture PDF
                      </button>
                      <button
                        onClick={() => showNotification('Articles ajoutés au panier !')}
                        className="flex items-center gap-1 text-[#186827] hover:bg-emerald-50 px-2.5 py-1 rounded border border-emerald-300 font-semibold"
                      >
                        <RotateCcw className="w-3.5 h-3.5" /> Commander à nouveau
                      </button>
                    </div>
                  </div>

                </div>
              )}

              {/* 3. FAVORITES TAB */}
              {activeCustomerTab === 'favorites' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs">
                    <h4 className="font-extrabold text-slate-800">Mes Produits Favoris (4)</h4>
                    <span className="text-slate-500">Ajout 1-clic direct à votre panier</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {favoriteProducts.map((p) => (
                      <div
                        key={p.id}
                        className="border border-slate-200 rounded-lg p-3 flex items-center gap-3 bg-white shadow-2xs hover:border-[#186827] transition-colors"
                      >
                        <div className="w-16 h-16 rounded bg-slate-50 flex items-center justify-center p-1 shrink-0 border border-slate-100">
                          <img
                            src={p.image}
                            alt={p.name}
                            className="max-h-full max-w-full object-contain"
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="text-[10px] font-bold text-slate-400 uppercase">
                            {p.brand}
                          </div>
                          <div className="text-xs font-bold text-slate-800 truncate">
                            {p.name}
                          </div>
                          <div className="text-xs font-bold font-mono text-[#186827] mt-0.5">
                            {p.price.toFixed(3)} TND
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            if (onAddToCart) onAddToCart(p, 1);
                            showNotification(`"${p.name}" ajouté au panier !`);
                          }}
                          className="p-2 rounded bg-emerald-50 text-[#186827] hover:bg-[#186827] hover:text-white transition-colors cursor-pointer shrink-0"
                          title="Ajouter au panier"
                        >
                          <ShoppingBag className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 4. ADDRESSES TAB */}
              {activeCustomerTab === 'addresses' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs">
                    <h4 className="font-extrabold text-slate-800">Adresses de Livraison en Tunisie</h4>
                    <button
                      onClick={() => setNewAddressFormOpen(!newAddressFormOpen)}
                      className="inline-flex items-center gap-1 font-bold text-[#186827] hover:underline cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" /> Ajouter une adresse
                    </button>
                  </div>

                  {/* Add Address Form Accordion */}
                  {newAddressFormOpen && (
                    <form
                      onSubmit={handleAddAddress}
                      className="bg-emerald-50/50 border border-emerald-200 rounded-lg p-4 space-y-3 text-xs"
                    >
                      <h5 className="font-bold text-slate-800">Nouvelle adresse de livraison</h5>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-slate-600 mb-1">Nom du lieu (ex: Maison de vacances)</label>
                          <input
                            type="text"
                            required
                            placeholder="Maison, Bureau, etc."
                            value={newAddress.title}
                            onChange={(e) => setNewAddress({ ...newAddress, title: e.target.value })}
                            className="w-full p-2 bg-white border border-slate-300 rounded"
                          />
                        </div>
                        <div>
                          <label className="block text-slate-600 mb-1">Gouvernorat</label>
                          <select
                            value={newAddress.city}
                            onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                            className="w-full p-2 bg-white border border-slate-300 rounded"
                          >
                            <option value="Tunis">Tunis</option>
                            <option value="Ariana">Ariana</option>
                            <option value="Ben Arous">Ben Arous</option>
                            <option value="Manouba">Manouba</option>
                            <option value="Sousse">Sousse</option>
                            <option value="Monastir">Monastir</option>
                            <option value="Sfax">Sfax</option>
                            <option value="Nabeul">Nabeul</option>
                            <option value="Bizerte">Bizerte</option>
                          </select>
                        </div>
                        <div className="sm:col-span-2">
                          <label className="block text-slate-600 mb-1">Adresse détaillée & rue</label>
                          <input
                            type="text"
                            required
                            placeholder="Rue, N°, Résidence, Appartement..."
                            value={newAddress.street}
                            onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })}
                            className="w-full p-2 bg-white border border-slate-300 rounded"
                          />
                        </div>
                      </div>

                      <div className="flex justify-end gap-2 pt-2">
                        <button
                          type="button"
                          onClick={() => setNewAddressFormOpen(false)}
                          className="px-3 py-1.5 border border-slate-300 rounded text-slate-600"
                        >
                          Annuler
                        </button>
                        <button
                          type="submit"
                          className="px-3 py-1.5 bg-[#186827] text-white rounded font-bold hover:bg-[#124d1e]"
                        >
                          Enregistrer l'adresse
                        </button>
                      </div>
                    </form>
                  )}

                  {/* List of saved addresses */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    {addresses.map((addr) => (
                      <div
                        key={addr.id}
                        className={`border rounded-lg p-3.5 relative bg-white ${
                          addr.isDefault
                            ? 'border-[#186827] ring-1 ring-[#186827]/20 shadow-xs'
                            : 'border-slate-200'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="font-extrabold text-slate-800 flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-[#186827]" />
                            {addr.title}
                          </span>
                          {addr.isDefault && (
                            <span className="text-[10px] font-bold bg-[#edf6ed] text-[#186827] px-2 py-0.5 rounded-full">
                              Par défaut
                            </span>
                          )}
                        </div>

                        <div className="text-slate-600 space-y-0.5 leading-relaxed">
                          <div>{addr.recipient}</div>
                          <div>{addr.street}</div>
                          <div>{addr.zip} {addr.city}, Tunisie</div>
                          <div className="text-slate-400 text-[11px] pt-1">Tél : {addr.phone}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              )}

              {/* 5. SKIN ROUTINE & ADVICE */}
              {activeCustomerTab === 'routine' && (
                <div className="space-y-4 text-xs">
                  <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-[#186827] font-bold text-sm mb-1">
                      <Sparkles className="w-4 h-4" />
                      Profil Dermo-Cosmétique Personnalisé
                    </div>
                    <p className="text-slate-600 leading-relaxed">
                      D'après vos préférences et vos achats : <strong>Peau Mixte à Sensible</strong> sous climat méditerranéen.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Routine Matin */}
                    <div className="border border-slate-200 rounded-lg p-4 bg-white shadow-2xs space-y-2">
                      <div className="font-extrabold text-slate-900 flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-amber-500" /> Routine Matin (Protection & Éclat)
                      </div>
                      <ol className="text-slate-600 space-y-1.5 list-decimal pl-4">
                        <li><strong>Nettoyage :</strong> Eau micellaire Bioderma Sensibio ou gel moussant doux.</li>
                        <li><strong>Antioxydant :</strong> Sérum Vitamine C pure (SVR Ampoule Anti-Ox ou Kenko).</li>
                        <li><strong>Photoprotection :</strong> Écran solaire invisible ISDIN Fusion Water SPF50+.</li>
                      </ol>
                    </div>

                    {/* Routine Soir */}
                    <div className="border border-slate-200 rounded-lg p-4 bg-white shadow-2xs space-y-2">
                      <div className="font-extrabold text-slate-900 flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4 text-indigo-500" /> Routine Soir (Régénération & Réparation)
                      </div>
                      <ol className="text-slate-600 space-y-1.5 list-decimal pl-4">
                        <li><strong>Double nettoyage :</strong> Huile démaquillante végétale Almaflore.</li>
                        <li><strong>Hydratation :</strong> Sérum Acide Hyaluronique pur Alania.</li>
                        <li><strong>Réparation barrière :</strong> Crème protectrice Avène Hydrance ou Cicalfate.</li>
                      </ol>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-600 flex items-center gap-3">
                    <Phone className="w-5 h-5 text-[#186827] shrink-0" />
                    <div>
                      <strong>Besoin d'un conseil personnalisé ?</strong> Nos docteurs en pharmacie sont disponibles 7j/7 au <strong>+216 71 000 000</strong> pour vous guider gratuitement.
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        ) : (
          /* MAIN BODY: STORE MANAGER / ADMIN DASHBOARD MODE */
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
            
            {/* Store Top Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-white rounded-lg p-3.5 border border-slate-200 shadow-2xs">
                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">
                  Chiffre d'Affaires du Jour
                </div>
                <div className="text-xl font-black text-slate-900 font-mono mt-1">
                  2 845,500 <span className="text-xs font-normal">TND</span>
                </div>
                <div className="text-[10px] text-emerald-600 font-bold mt-1 flex items-center gap-0.5">
                  <TrendingUp className="w-3 h-3" /> +18.4% vs hier
                </div>
              </div>

              <div className="bg-white rounded-lg p-3.5 border border-slate-200 shadow-2xs">
                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">
                  Commandes du Jour
                </div>
                <div className="text-xl font-black text-slate-900 font-mono mt-1">
                  16 <span className="text-xs font-normal">commandes</span>
                </div>
                <div className="text-[10px] text-blue-600 font-bold mt-1">
                  4 en attente de préparation
                </div>
              </div>

              <div className="bg-white rounded-lg p-3.5 border border-slate-200 shadow-2xs">
                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">
                  Panier Moyen
                </div>
                <div className="text-xl font-black text-slate-900 font-mono mt-1">
                  74,800 <span className="text-xs font-normal">TND</span>
                </div>
                <div className="text-[10px] text-slate-500 mt-1">
                  Livraison gratuite (99 TND+)
                </div>
              </div>

              <div className="bg-white rounded-lg p-3.5 border border-slate-200 shadow-2xs">
                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">
                  Taux de Satisfaction
                </div>
                <div className="text-xl font-black text-[#186827] mt-1">
                  98.6%
                </div>
                <div className="text-[10px] text-slate-500 mt-1">
                  Avis vérifiés Tunisie
                </div>
              </div>
            </div>

            {/* Live Orders Management Table */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
              <div className="px-4 py-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                <h4 className="font-extrabold text-xs text-slate-800 uppercase tracking-wider flex items-center gap-2">
                  <Package className="w-4 h-4 text-[#186827]" />
                  Gestion des Commandes en direct
                </h4>
                <span className="text-[11px] text-slate-500">
                  Cliquez sur le statut pour le modifier
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100/75 text-slate-600 border-b border-slate-200 text-[11px]">
                    <tr>
                      <th className="py-2.5 px-3 font-bold">N° Commande</th>
                      <th className="py-2.5 px-3 font-bold">Client & Ville</th>
                      <th className="py-2.5 px-3 font-bold">Articles</th>
                      <th className="py-2.5 px-3 font-bold">Montant</th>
                      <th className="py-2.5 px-3 font-bold">Statut (Interactif)</th>
                      <th className="py-2.5 px-3 font-bold">Transporteur</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {adminOrders.map((ord) => (
                      <tr key={ord.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3 px-3 font-bold text-slate-900 font-mono">
                          {ord.id}
                        </td>
                        <td className="py-3 px-3">
                          <div className="font-bold text-slate-800">{ord.customer}</div>
                          <div className="text-[10px] text-slate-400">{ord.city}</div>
                        </td>
                        <td className="py-3 px-3 text-slate-600 max-w-xs truncate">
                          {ord.items}
                        </td>
                        <td className="py-3 px-3 font-mono font-bold text-slate-900">
                          {ord.total.toFixed(3)} TND
                        </td>
                        <td className="py-3 px-3">
                          <button
                            type="button"
                            onClick={() => handleCycleOrderStatus(ord.id)}
                            className={`px-2.5 py-1 rounded-full text-[10.5px] font-bold cursor-pointer transition-transform active:scale-95 border ${
                              ord.status === 'Livrée'
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                : ord.status === 'En transit'
                                ? 'bg-blue-50 text-blue-700 border-blue-200'
                                : 'bg-amber-50 text-amber-700 border-amber-200'
                            }`}
                            title="Cliquer pour passer au statut suivant"
                          >
                            {ord.status} ↻
                          </button>
                        </td>
                        <td className="py-3 px-3 text-slate-500 text-[11px]">
                          {ord.carrier}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Inventory Stock Alerts */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-extrabold text-xs text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                  Alertes Seuil de Stock Parapharmacie
                </h4>
                <span className="text-[11px] text-amber-700 font-semibold bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  {stockAlerts.length} produits en stock critique
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {stockAlerts.map((item, idx) => (
                  <div
                    key={item.id}
                    className="p-3 rounded-lg border border-slate-200 bg-slate-50/50 flex flex-col justify-between"
                  >
                    <div>
                      <div className="text-xs font-bold text-slate-800 truncate mb-1">
                        {item.name}
                      </div>
                      <div className="text-xs text-slate-500">
                        Stock actuel :{' '}
                        <strong
                          className={item.stock < 10 ? 'text-rose-600 font-bold' : 'text-emerald-700'}
                        >
                          {item.stock} unités
                        </strong>
                      </div>
                    </div>

                    <button
                      onClick={() => handleRestock(idx)}
                      className="mt-3 w-full py-1.5 bg-[#186827] hover:bg-[#124d1e] text-white rounded text-[11px] font-bold transition-colors cursor-pointer"
                    >
                      + Réapprovisionner (+20)
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Regional Performance in Tunisia */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-4 space-y-2">
              <h4 className="font-extrabold text-xs text-slate-800 uppercase tracking-wider">
                Répartition des Ventes par Région (Tunisie)
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                <div className="bg-slate-50 p-2.5 rounded border border-slate-200">
                  <span className="text-slate-500 block">Grand Tunis</span>
                  <span className="text-base font-bold text-slate-900">45%</span>
                  <span className="text-[10px] text-emerald-600 block font-semibold">+12% ce mois</span>
                </div>
                <div className="bg-slate-50 p-2.5 rounded border border-slate-200">
                  <span className="text-slate-500 block">Sahel (Sousse/Monastir)</span>
                  <span className="text-base font-bold text-slate-900">25%</span>
                  <span className="text-[10px] text-emerald-600 block font-semibold">+8% ce mois</span>
                </div>
                <div className="bg-slate-50 p-2.5 rounded border border-slate-200">
                  <span className="text-slate-500 block">Sfax & Sud</span>
                  <span className="text-base font-bold text-slate-900">20%</span>
                  <span className="text-[10px] text-emerald-600 block font-semibold">+15% ce mois</span>
                </div>
                <div className="bg-slate-50 p-2.5 rounded border border-slate-200">
                  <span className="text-slate-500 block">Cap Bon (Nabeul/Hammamet)</span>
                  <span className="text-base font-bold text-slate-900">10%</span>
                  <span className="text-[10px] text-emerald-600 block font-semibold">+5% ce mois</span>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* Modal Footer Bar */}
        <div className="px-5 py-3 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-500">
            <ShieldCheck className="w-4 h-4 text-[#186827]" />
            <span>Données sécurisées conformément aux normes de santé & parapharmacie.</span>
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#186827] hover:bg-[#124d1e] text-white font-bold rounded-lg transition-colors cursor-pointer"
          >
            Fermer le tableau de bord
          </button>
        </div>

      </div>
    </div>
  );
};
