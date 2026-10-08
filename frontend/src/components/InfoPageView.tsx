import React from 'react';
import { Truck, ShieldCheck, Phone, MapPin, Mail, Clock, Award, HeartHandshake } from 'lucide-react';

interface InfoPageViewProps {
  type: 'about' | 'delivery' | 'contact';
  onNavigateHome: () => void;
}

export const InfoPageView: React.FC<InfoPageViewProps> = ({ type, onNavigateHome }) => {
  return (
    <div className="w-full bg-white select-none">
      {/* Dark green Breadcrumb Bar */}
      <div className="w-full bg-[#245423] text-white py-1 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto flex items-center text-[11px] font-medium tracking-wide">
          <button
            onClick={onNavigateHome}
            className="hover:underline text-emerald-100 hover:text-white cursor-pointer"
          >
            Accueil
          </button>
          <span className="mx-1.5 text-emerald-300/80">{'>'}</span>
          <span className="text-white">
            {type === 'about'
              ? 'À Propos'
              : type === 'delivery'
              ? 'Livraison & Paiement'
              : 'Contact & Service Client'}
          </span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        {type === 'about' && (
          <div className="space-y-8">
            <div className="text-center max-w-2xl mx-auto">
              <span className="text-xs font-bold uppercase tracking-widest text-[#3d871d] block mb-2">
                Notre Engagement
              </span>
              <h1 className="text-3xl font-extrabold text-slate-900 font-sans mb-4">
                À Propos de SoinShop Tunisie
              </h1>
              <p className="text-sm text-slate-600 leading-relaxed">
                Votre référence parapharmaceutique en ligne dédiée à la santé, la beauté et au bien-être de toute la famille à travers toute la Tunisie.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
              <div className="p-5 bg-slate-50 border border-slate-200 rounded-sm text-center">
                <div className="w-12 h-12 mx-auto mb-3 bg-emerald-100 rounded-full flex items-center justify-center text-[#186827]">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-sm text-slate-900 mb-1.5">100% Produits Authentiques</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Tous nos produits proviennent directement des laboratoires pharmaceutiques officiels agréés.
                </p>
              </div>

              <div className="p-5 bg-slate-50 border border-slate-200 rounded-sm text-center">
                <div className="w-12 h-12 mx-auto mb-3 bg-emerald-100 rounded-full flex items-center justify-center text-[#186827]">
                  <HeartHandshake className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-sm text-slate-900 mb-1.5">Conseils d'Experts</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Une équipe de préparateurs et docteurs en pharmacie à votre écoute pour des recommandations personnalisées.
                </p>
              </div>

              <div className="p-5 bg-slate-50 border border-slate-200 rounded-sm text-center">
                <div className="w-12 h-12 mx-auto mb-3 bg-emerald-100 rounded-full flex items-center justify-center text-[#186827]">
                  <Truck className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-sm text-slate-900 mb-1.5">Expédition Express 48h</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Livraison sécurisée partout en Tunisie, du Grand Tunis jusqu'au sud avec paiement à la livraison.
                </p>
              </div>
            </div>
          </div>
        )}

        {type === 'delivery' && (
          <div className="space-y-8">
            <div className="text-center max-w-2xl mx-auto">
              <span className="text-xs font-bold uppercase tracking-widest text-[#3d871d] block mb-2">
                Transparence & Sécurité
              </span>
              <h1 className="text-3xl font-extrabold text-slate-900 font-sans mb-4">
                Modalités de Livraison & Paiement
              </h1>
              <p className="text-sm text-slate-600 leading-relaxed">
                Toutes les réponses à vos questions concernant la réception de vos colis et les modes de règlement en Tunisie.
              </p>
            </div>

            <div className="space-y-4 max-w-2xl mx-auto pt-4 text-xs">
              <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded">
                <h4 className="font-bold text-emerald-900 text-sm mb-1 flex items-center gap-2">
                  <Truck className="w-4 h-4 text-emerald-700" /> Livraison Gratuite dès 99 TND d'achat
                </h4>
                <p className="text-slate-700 leading-relaxed">
                  Pour toute commande supérieure ou égale à 99 TND, la livraison est 100% offerte sur l'ensemble du territoire tunisien. Pour les commandes inférieures, les frais de livraison forfaitaires sont de seulement 7 TND.
                </p>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded">
                <h4 className="font-bold text-slate-900 text-sm mb-1 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#186827]" /> Paiement à la Livraison (Espèces)
                </h4>
                <p className="text-slate-600 leading-relaxed">
                  Vous ne payez rien en ligne ! Le règlement s'effectue directement en espèces auprès de notre transporteur lors de la remise en main propre de votre colis.
                </p>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded">
                <h4 className="font-bold text-slate-900 text-sm mb-1 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#186827]" /> Délais d'acheminement (48h à 72h)
                </h4>
                <p className="text-slate-600 leading-relaxed">
                  Votre colis est préparé sous 24h et livré à domicile sous 48 à 72 heures ouvrées du lundi au samedi.
                </p>
              </div>
            </div>
          </div>
        )}

        {type === 'contact' && (
          <div className="space-y-8">
            <div className="text-center max-w-2xl mx-auto">
              <span className="text-xs font-bold uppercase tracking-widest text-[#3d871d] block mb-2">
                À Votre Écoute
              </span>
              <h1 className="text-3xl font-extrabold text-slate-900 font-sans mb-4">
                Contact & Service Client
              </h1>
              <p className="text-sm text-slate-600 leading-relaxed">
                Une question sur un produit ou une commande ? Notre service client est disponible 7j/7 de 09h00 à 18h00.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto pt-4 text-xs">
              <div className="p-5 bg-slate-50 border border-slate-200 rounded-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2.5 rounded-full bg-emerald-100 text-[#186827]">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Assistance Téléphonique</h4>
                    <span className="text-emerald-700 font-medium">Disponible 7j/7</span>
                  </div>
                </div>
                <p className="text-slate-600 mb-2">Appelez nos conseillers parapharmacie au :</p>
                <div className="text-base font-mono font-bold text-slate-900">
                  +216 71 888 999 / +216 28 555 444
                </div>
              </div>

              <div className="p-5 bg-slate-50 border border-slate-200 rounded-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2.5 rounded-full bg-emerald-100 text-[#186827]">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Contact par E-mail</h4>
                    <span className="text-slate-500">Réponse sous 24h</span>
                  </div>
                </div>
                <p className="text-slate-600 mb-2">Écrivez-nous à notre adresse dédiée :</p>
                <div className="text-sm font-mono font-semibold text-[#186827]">
                  contact@soinshop.tn
                </div>
              </div>

              <div className="p-5 bg-slate-50 border border-slate-200 rounded-sm md:col-span-2">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2.5 rounded-full bg-emerald-100 text-[#186827]">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Siège & Centre Logistique</h4>
                    <span className="text-slate-500">Tunis, Tunisie</span>
                  </div>
                </div>
                <p className="text-slate-600">
                  Avenue Habib Bourguiba, Centre Médical Les Berges du Lac 2, 1053 Tunis, Tunisie.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="text-center pt-8">
          <button
            onClick={onNavigateHome}
            className="inline-flex items-center gap-2 bg-[#438a27] hover:bg-[#346f1e] text-white text-xs font-bold uppercase tracking-wider py-2.5 px-6 rounded-xs transition-colors cursor-pointer shadow-xs"
          >
            Retourner à la boutique
          </button>
        </div>
      </div>
    </div>
  );
};
