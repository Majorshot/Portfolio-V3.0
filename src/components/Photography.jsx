import React, { useRef, useEffect, useCallback } from 'react';

// Import images
import chicken from '../assets/chicken.jpg';
import choco from '../assets/choco.jpg';
import club from '../assets/club.jpg';
import fruit from '../assets/fruit.jpg';
import ladoo from '../assets/ladoo.jpg';
import puff from '../assets/puff.jpg';
import sand from '../assets/sand.jpg';
import spanish from '../assets/spanish.jpg';
import veg from '../assets/veg.jpg';
import zatar from '../assets/zatar.jpg';

const photos = [
  { id: 1, src: spanish, title: 'Spanish' },
  { id: 2, src: choco, title: 'Choco' },
  { id: 3, src: sand, title: 'Sand' },
  { id: 4, src: club, title: 'Club' },
  { id: 5, src: fruit, title: 'Fruit' },
  { id: 6, src: puff, title: 'Puff' },
  { id: 7, src: veg, title: 'Veg' },
  { id: 8, src: chicken, title: 'Chicken' },
  { id: 9, src: zatar, title: 'Zatar' },
  { id: 10, src: ladoo, title: 'Ladoo' },
];

// Clamp helper
const clamp = (v, min, max) => Math.min(Math.max(v, min), max);
// Linear interpolation within a range
const mapRange = (value, inMin, inMax, outMin, outMax) => {
  const t = clamp((value - inMin) / (inMax - inMin), 0, 1);
  return outMin + t * (outMax - outMin);
};

export const Photography = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const stripRef = useRef(null);
  const progressRef = useRef(null);
  const rafRef = useRef(null);
  const isNearViewportRef = useRef(false);

  const updateScroll = useCallback(() => {
    const section = sectionRef.current;
    if (!section) return;

    const rect = section.getBoundingClientRect();
    const sectionHeight = section.offsetHeight - window.innerHeight;
    const rawProgress = clamp(-rect.top / sectionHeight, 0, 1);

    if (titleRef.current) {
      const titleOpacity = mapRange(rawProgress, 0.15, 0.2, 1, 0);
      const titleX = mapRange(rawProgress, 0.15, 0.2, 0, -100);
      titleRef.current.style.opacity = titleOpacity;
      titleRef.current.style.transform = `translate3d(${titleX}vw, 0, 0)`;
    }

    if (stripRef.current) {
      const stripWidth = stripRef.current.scrollWidth;
      const viewportW = window.innerWidth;
      const maxTravel = stripWidth - viewportW;
      const slideProgress = clamp((rawProgress - 0.15) / 0.85, 0, 1);
      const translateX = -slideProgress * maxTravel;
      stripRef.current.style.transform = `translate3d(${translateX}px, 0, 0)`;
    }

    if (progressRef.current) {
      progressRef.current.style.transform = `scaleX(${rawProgress})`;
    }
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let ticking = false;
    const onScroll = () => {
      if (!isNearViewportRef.current || ticking) return;
      ticking = true;
      rafRef.current = requestAnimationFrame(() => {
        updateScroll();
        ticking = false;
      });
    };

    // Only activate scroll handler when section is near viewport
    const io = new IntersectionObserver(
      ([entry]) => {
        isNearViewportRef.current = entry.isIntersecting;
        if (entry.isIntersecting) updateScroll();
      },
      { rootMargin: '200px' }
    );
    io.observe(section);

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      io.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [updateScroll]);

  return (
    <section id="photography" ref={sectionRef} className="relative h-[400vh] bg-zinc-100 dark:bg-zinc-950 z-20 overflow-visible">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden w-full">
        
        {/* Header Overlay */}
        <div 
          ref={titleRef}
          className="absolute top-0 bottom-0 my-auto h-fit left-6 md:left-12 lg:left-24 z-0 pointer-events-none w-[85vw] md:w-[60vw] lg:w-[40vw]"
          style={{ willChange: 'transform, opacity' }}
        >
           <h2 className="text-4xl md:text-7xl lg:text-[6rem] font-black uppercase tracking-tighter text-zinc-900 dark:text-white drop-shadow-2xl leading-none mb-3 md:mb-6">
             LENS // ARCHIVE
           </h2>
           <div className="border-l-2 border-orange-500 pl-4 md:pl-6 bg-white/40 dark:bg-zinc-950/40 backdrop-blur-md p-4 -ml-4 rounded-r-xl border-y border-r border-zinc-300/50 dark:border-zinc-800/50">
             <p className="text-zinc-600 dark:text-zinc-300 font-mono uppercase tracking-widest text-[10px] md:text-xs mb-3">
               Visual Exploration &amp; Still Life
             </p>
             <p className="text-zinc-500 dark:text-zinc-400 text-xs md:text-sm leading-relaxed font-light drop-shadow-md">
               Capturing the raw texture, deep contrast, and organic geometry of culinary subjects and lifestyle elements. It's not just about snapping a picture; it's about composing a visceral visual narrative where light and shadow engineer a mood. Every shot is meticulously framed to evoke taste, atmosphere, and aesthetic tension.
             </p>
           </div>
        </div>

        {/* Horizontal Filmstrip Container */}
        <div 
          ref={stripRef}
          className="flex gap-3 md:gap-8 pl-[90vw] md:pl-[60vw] lg:pl-[45vw] pr-6 md:pr-12 lg:pr-24 h-[40vh] md:h-[65vh] w-max items-center z-20 relative"
          style={{ willChange: 'transform' }}
        >
          {photos.map((photo) => (
            <div 
              key={photo.id} 
              className="relative h-full aspect-[3/4] md:aspect-[4/5] lg:aspect-[16/10] shrink-0 overflow-hidden border border-zinc-300 dark:border-zinc-800 bg-zinc-200 dark:bg-zinc-900"
            >
               <img 
                 src={photo.src}
                 alt={photo.title}
                 loading="lazy"
                 decoding="async"
                 className="w-full h-full object-cover"
               />
            </div>
          ))}
        </div>
        
        {/* Progress Bar */}
        <div className="absolute bottom-12 left-6 md:left-12 lg:left-24 right-6 md:right-12 lg:right-24 h-px bg-zinc-300 dark:bg-zinc-800">
           <div 
             ref={progressRef}
             className="h-full bg-orange-500 origin-left"
             style={{ willChange: 'transform' }}
           />
        </div>

      </div>
    </section>
  );
};