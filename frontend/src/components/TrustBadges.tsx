import React from 'react';

export const TrustBadges: React.FC = () => {
  return (
    <section className="w-full bg-white py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-6 text-center">
          
          {/* 1. Livraison rapide */}
          <div className="flex flex-col items-center">
            {/* Hourglass Icon */}
            <div className="w-11 h-11 mb-2.5 flex items-center justify-center text-black">
              <svg
                viewBox="0 0 24 24"
                className="w-9 h-9 stroke-black stroke-[1.8] fill-none stroke-linecap-round stroke-linejoin-round"
              >
                <path d="M5 22h14" />
                <path d="M5 2h14" />
                <path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22" />
                <path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2" />
                <circle cx="12" cy="18" r="1" fill="currentColor" />
              </svg>
            </div>
            <h4 className="text-[12.5px] sm:text-[13px] font-bold text-slate-900 leading-tight">
              Livraison rapide
            </h4>
            <p className="text-[10px] sm:text-[11px] text-slate-500 mt-1 leading-snug">
              Livraison à domicile sous 48 à 72 H
            </p>
          </div>

          {/* 2. Livraison gratuite */}
          <div className="flex flex-col items-center">
            {/* Delivery truck with speed motion */}
            <div className="w-11 h-11 mb-2.5 flex items-center justify-center text-black">
              <svg
                viewBox="0 0 24 24"
                className="w-10 h-10 stroke-black stroke-[1.8] fill-none stroke-linecap-round stroke-linejoin-round"
              >
                <path d="M1 3h15v13H1z" />
                <path d="M16 8h4l3 3v5h-7V8z" />
                <circle cx="5.5" cy="18.5" r="2.5" />
                <circle cx="18.5" cy="18.5" r="2.5" />
                <path d="M-2 7h3" />
                <path d="M-1 11h2" />
              </svg>
            </div>
            <h4 className="text-[12.5px] sm:text-[13px] font-bold text-slate-900 leading-tight">
              Livraison gratuite
            </h4>
            <p className="text-[10px] sm:text-[11px] text-slate-500 mt-1 leading-snug">
              Dès 99 DT d'achat dans toute la Tunisie
            </p>
          </div>

          {/* 3. Paiement 100% sécurisé */}
          <div className="flex flex-col items-center">
            {/* Shield with Star Icon */}
            <div className="w-11 h-11 mb-2.5 flex items-center justify-center text-black">
              <svg
                viewBox="0 0 24 24"
                className="w-9 h-9 stroke-black stroke-[1.8] fill-none stroke-linecap-round stroke-linejoin-round"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <polygon
                  points="12 8 13.5 11 17 11.5 14.5 14 15 17.5 12 16 9 17.5 9.5 14 7 11.5 10.5 11"
                  fill="currentColor"
                  stroke="none"
                />
              </svg>
            </div>
            <h4 className="text-[12.5px] sm:text-[13px] font-bold text-slate-900 leading-tight">
              Paiement 100% sécurisé
            </h4>
            <p className="text-[10px] sm:text-[11px] text-slate-500 mt-1 leading-snug">
              Paiement à la livraison
            </p>
          </div>

          {/* 4. Service client */}
          <div className="flex flex-col items-center">
            {/* Support Headset Icon */}
            <div className="w-11 h-11 mb-2.5 flex items-center justify-center text-black">
              <svg
                viewBox="0 0 24 24"
                className="w-9 h-9 stroke-black stroke-[1.8] fill-none stroke-linecap-round stroke-linejoin-round"
              >
                <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
                <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
                <path d="M21 17v2a4 4 0 0 1-4 4h-3" />
              </svg>
            </div>
            <h4 className="text-[12.5px] sm:text-[13px] font-bold text-slate-900 leading-tight">
              Service client
            </h4>
            <p className="text-[10px] sm:text-[11px] text-slate-500 mt-1 leading-snug">
              7/7 de 09h00 à 18h00
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};
