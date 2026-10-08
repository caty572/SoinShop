import React from 'react';

interface FooterProps {
  onNavigateInfo?: (page: 'about' | 'delivery' | 'contact') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateInfo }) => {
  return (
    <footer className="w-full bg-white pt-6 pb-12 overflow-hidden border-t border-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Main row: Sprout on left, SUIVEZ NOUS + socials on right */}
        <div className="flex items-end justify-between relative pb-4">
          
          {/* Bottom left green sprout leaves illustration */}
          <div className="flex items-center">
            <svg
              className="w-14 h-12 text-[#569d2a]"
              viewBox="0 0 64 48"
              fill="none"
            >
              {/* Left Leaf */}
              <path
                d="M32 38C22 36 10 26 8 14C18 12 30 18 32 38Z"
                fill="#5ca82b"
              />
              <path
                d="M32 38C20 28 14 18 10 14"
                stroke="#45831e"
                strokeWidth="1.2"
              />
              {/* Right Leaf */}
              <path
                d="M32 38C34 24 46 16 58 18C56 30 44 38 32 38Z"
                fill="#72b834"
              />
              <path
                d="M32 38C42 28 48 22 56 19"
                stroke="#5ca82b"
                strokeWidth="1.2"
              />
            </svg>
          </div>

          {/* Thin horizontal line behind or between */}
          <div className="hidden sm:block flex-1 mx-8 h-[1px] bg-slate-200 self-center" />

          {/* Right side: SUIVEZ NOUS + Social Icons */}
          <div className="flex flex-col items-end">
            <span className="text-[14px] font-extrabold tracking-wider text-[#438a27] uppercase mb-2 select-none">
              SUIVEZ NOUS
            </span>
            <div className="flex items-center gap-4 text-slate-800">
              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#438a27] transition-colors p-1"
                aria-label="Facebook SoinShop"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>

              {/* YouTube */}
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#438a27] transition-colors p-1"
                aria-label="YouTube SoinShop"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#438a27] transition-colors p-1"
                aria-label="Instagram SoinShop"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>
          </div>

        </div>

        {/* Informational page quick links */}
        {onNavigateInfo && (
          <div className="pt-3 pb-2 flex flex-wrap justify-center gap-6 text-[11.5px] text-slate-500 font-medium">
            <button
              onClick={() => onNavigateInfo('about')}
              className="hover:text-[#186827] cursor-pointer"
            >
              À Propos de SoinShop
            </button>
            <span className="text-slate-300">·</span>
            <button
              onClick={() => onNavigateInfo('delivery')}
              className="hover:text-[#186827] cursor-pointer"
            >
              Livraison & Paiement (Tunisie)
            </button>
            <span className="text-slate-300">·</span>
            <button
              onClick={() => onNavigateInfo('contact')}
              className="hover:text-[#186827] cursor-pointer"
            >
              Service Client & Contact
            </button>
          </div>
        )}

        {/* Small subtle copyright */}
        <div className="pt-3 text-center text-[11px] text-slate-400">
          © {new Date().getFullYear()} SoinShop Tunisie. Tous droits réservés. Parapharmacie et soins de beauté en ligne.
        </div>

      </div>
    </footer>
  );
};
