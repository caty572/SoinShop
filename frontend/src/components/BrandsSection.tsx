import React from 'react';

interface BrandsSectionProps {
  onSelectBrand: (brandId: string) => void;
}

// ids match BRANDS in data/products.ts
const EXTRA_BRANDS = [
  { id: 'avene', label: 'Avène', color: '#0b6e99', className: 'font-semibold tracking-wide' },
  { id: 'svr', label: 'SVR', color: '#e2007a', className: 'font-extrabold tracking-widest' },
  { id: 'ducray', label: 'DUCRAY', color: '#00a0b0', className: 'font-bold tracking-wider' },
  { id: 'pharmaceris', label: 'Pharmaceris', color: '#1c3f94', className: 'font-bold tracking-tight' },
  { id: 'laroche', label: 'La Roche-Posay', color: '#1a1a1a', className: 'font-semibold tracking-tight !text-[14px]' },
  { id: 'bioderma', label: 'BIODERMA', color: '#e5322d', className: 'font-extrabold tracking-wider' },
  { id: 'eucerin', label: 'Eucerin', color: '#003c8f', className: 'font-bold italic' },
  { id: 'isdin', label: 'ISDIN', color: '#d4145a', className: 'font-extrabold tracking-[0.2em]' },
];

export const BrandsSection: React.FC<BrandsSectionProps> = ({ onSelectBrand }) => {
  const items = (
    <>
            {/* BRAND 1: alania */}
            <button
              onClick={() => onSelectBrand('alania')}
              className="group flex items-center gap-2 hover:opacity-85 transition-opacity cursor-pointer p-2"
              title="Découvrir Alania"
            >
              <div className="w-6 h-6 rounded-full border border-slate-700 flex items-center justify-center p-0.5">
                <svg viewBox="0 0 24 24" className="w-4 h-4 text-slate-800" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                </svg>
              </div>
              <div className="text-left">
                <span className="font-bold text-[17px] tracking-tight text-slate-900 block leading-tight font-sans">
                  alania
                </span>
                <span className="text-[7.5px] uppercase tracking-wider text-slate-500 block leading-none">
                  DERMATOLOGIE
                </span>
              </div>
            </button>

            {/* BRAND 2: ALLIANCE */}
            <button
              onClick={() => onSelectBrand('alliance')}
              className="group flex items-center gap-2 hover:opacity-85 transition-opacity cursor-pointer p-2"
              title="Découvrir Alliance"
            >
              <div className="w-3.5 h-3.5 bg-[#00a896] rounded-[2px] shrink-0" />
              <span className="font-bold text-[16px] tracking-widest text-[#007b8a] uppercase font-sans">
                ALLIANCE
              </span>
            </button>

            {/* BRAND 3: ALMAFLORE */}
            <button
              onClick={() => onSelectBrand('almaflore')}
              className="group flex flex-col items-center hover:opacity-85 transition-opacity cursor-pointer p-2"
              title="Découvrir Almaflore"
            >
              {/* Botanical sprig motif */}
              <div className="flex items-center justify-center text-[#869b56] mb-0.5">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M12 22V8M12 8C12 8 8 7 7 4C10 4 12 7 12 8ZM12 8C12 8 16 7 17 4C14 4 12 7 12 8ZM12 14C12 14 7 13 6 10C9 10 12 13 12 14ZM12 14C12 14 17 13 18 10C15 10 12 13 12 14Z" />
                </svg>
              </div>
              <span className="font-bold text-[15px] tracking-wide text-[#7d914d] uppercase font-sans leading-none">
                ALMAFLORE
              </span>
            </button>

            {/* BRAND 4: Alvityl */}
            <button
              onClick={() => onSelectBrand('alvityl')}
              className="group flex items-center hover:opacity-85 transition-opacity cursor-pointer p-2"
              title="Découvrir Alvityl"
            >
              <span className="font-extrabold italic text-[20px] tracking-tight text-[#1455a7] font-sans">
                Alvityl<span className="text-[#e23b2b] text-[15px] not-italic">®</span>
              </span>
            </button>

            {/* MORE BRANDS: styled wordmarks */}
            {EXTRA_BRANDS.map((b) => (
              <button
                key={b.id}
                onClick={() => onSelectBrand(b.id)}
                className="hover:opacity-85 transition-opacity cursor-pointer p-2"
                title={`Découvrir ${b.label}`}
              >
                <span className={`text-[16px] leading-none ${b.className}`} style={{ color: b.color }}>
                  {b.label}
                </span>
              </button>
            ))}
    </>
  );

  return (
    <section className="w-full bg-white pt-8">
      {/* Title: "Nos marques" with centered underline */}
      <div className="text-center mb-6 px-4">
        <span className="inline-block text-[15px] sm:text-[16px] font-semibold text-slate-700 tracking-normal border-b-2 border-slate-500 pb-0.5 select-none">
          Nos marques
        </span>
      </div>

      {/* Full-width band: brands loop endlessly, pausing on hover */}
      <div className="w-full bg-[#f2f4f1] py-6 overflow-hidden brands-marquee">
        <div className="brands-track flex w-max items-center">
          <div className="flex items-center gap-12 pr-12 [&>button]:shrink-0 [&>button]:whitespace-nowrap">{items}</div>
          <div aria-hidden="true" className="flex items-center gap-12 pr-12 [&>button]:shrink-0 [&>button]:whitespace-nowrap">{items}</div>
        </div>
      </div>
    </section>
  );
};
