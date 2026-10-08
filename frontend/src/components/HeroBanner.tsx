import React from 'react';

export const HeroBanner: React.FC = () => {
  return (
    <section className="w-full bg-white select-none overflow-hidden">
      {/* Lower part of the foliage image only: hanging leaves plus the soft shadow beneath */}
      <div className="relative w-full aspect-[4.3/1] min-h-[110px]">
        <img
          src="/src/assets/images/hero_best_seller_wallpaper.jpg"
          alt="Lush syngonium foliage banner"
          className="block w-full h-full object-cover object-bottom"
        />

        {/* White fade at the bottom so the banner melts into the page */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[35%] bg-gradient-to-b from-transparent to-white"
        />

      </div>
    </section>
  );
};
