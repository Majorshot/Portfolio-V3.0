import React from 'react';

export const Marquee = ({ theme }) => {
  return (
    <section className="relative w-full overflow-hidden border-y border-zinc-200 dark:border-zinc-800 py-6 bg-zinc-100/80 dark:bg-zinc-900/80 md:backdrop-blur-xl z-20">
      <div className="animate-marquee flex gap-12 items-center">
        {Array(8).fill("MERN STACK // WORDPRESS // REACT // NODE.JS // ARCHITECTURE //").map((text, i) => (
          <span key={i} className={`text-4xl md:text-6xl font-black tracking-tighter uppercase ${theme === 'dark' ? 'text-outline-dark' : 'text-outline-light'}`}>
            {text}
          </span>
        ))}
      </div>
    </section>
  );
};