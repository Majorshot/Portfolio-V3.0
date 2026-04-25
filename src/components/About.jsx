import React, { useState } from 'react';
import { Image as ImageIcon } from 'lucide-react';
import { Reveal } from '../animations/Reveal';
import BlurText from '../animations/BlurText';
import ScrollVelocity from '../animations/ScrollVelocity';

import img1 from '../assets/1.jpg';
import img2 from '../assets/2.jpg';
import img3 from '../assets/3.jpg';

const PhotoStack = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const images = [
    img1,
    img2,
    img3
  ];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % images.length);
  };

  React.useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full aspect-[3/4] max-h-[600px] flex items-center justify-center cursor-pointer group" onClick={handleNext}>
      {images.map((img, index) => {
        let offset = index - activeIndex;
        if (offset < 0) offset += images.length;
        
        const isTop = offset === 0;
        const rotate = isTop ? 0 : offset === 1 ? 5 : -5;
        const scale = isTop ? 1 : 0.95 + (0.02 * (images.length - offset));
        const zIndex = 30 - offset;
        const opacity = offset > 1 ? 0 : 1;
        
        return (
          <div
            key={index}
            className="absolute transition-all duration-700 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] overflow-hidden shadow-2xl border border-zinc-200 dark:border-zinc-800"
            style={{
              zIndex,
              transform: `scale(${scale}) rotate(${rotate}deg) translateX(${offset * 20}px) translateY(${offset * 15}px)`,
              opacity,
              width: '90%',
              height: '100%'
            }}
          >
            <div className="absolute inset-0 bg-black/10 mix-blend-overlay z-10 pointer-events-none"></div>
            <img 
              src={img} 
              alt="Showcase" 
              className={`w-full h-full object-cover grayscale-[20%] contrast-125 transition-all duration-1000 ${isTop ? 'group-hover:scale-105 group-hover:grayscale-0' : ''}`} 
              draggable="false"
            />
            {isTop && (
               <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="flex items-center gap-2 text-xs tracking-widest uppercase font-mono text-white bg-black/80 px-4 py-2 backdrop-blur-md border border-white/10">
                     <ImageIcon className="w-3 h-3" /> Tap Next
                  </span>
               </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export const About = () => {
  const skillText = "REACT • NODE.JS • MONGODB • WORDPRESS • PHP • FIGMA • PREMIERE PRO • AFTER EFFECTS • GSAP • TAILWIND • ";

  return (
    <section id="about" className="relative pt-20 md:pt-32 pb-12 md:pb-16 min-h-screen bg-white dark:bg-zinc-950 overflow-hidden z-10 border-b border-zinc-200 dark:border-zinc-900">
      
      {/* Background Noise/Texture */}
      <div className="absolute inset-0 z-0 opacity-[0.03] dark:opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>

      <div className="relative z-10 w-full px-6 md:px-12 lg:px-24 max-w-[1400px] mx-auto">
        
        {/* Header Section */}
        <div className="mb-12 md:mb-32 mt-8 md:mt-12">
          <Reveal>
            <div className="flex items-center gap-4 mb-6">
              <span className="w-8 md:w-16 h-[1px] bg-orange-500"></span>
              <span className="font-mono text-sm tracking-widest text-orange-500 uppercase">System Identity</span>
            </div>
          </Reveal>
          
          {/* UPDATED: Adjusted text-[vw] values so it scales down enough to fit on narrow mobile screens */}
          <h2 className="text-[7vw] sm:text-[7.5vw] md:text-[7vw] lg:text-[6.5vw] xl:text-[5.8vw] font-black text-zinc-900 dark:text-white leading-[0.85] tracking-tighter uppercase ml-[-0.05em] -translate-x-1 md:-translate-x-4">
            <BlurText 
              text="ENGINEERING" 
              delay={50} 
              animateBy="words" 
              direction="bottom" 
              className="block mb-2"
            />
            <BlurText 
              text="DIGITAL" 
              delay={50} 
              animateBy="words" 
              direction="bottom" 
              className="block text-zinc-300 dark:text-zinc-800 mb-2"
            />
            <BlurText 
              text="EXPERIENCES." 
              delay={50} 
              animateBy="words" 
              direction="bottom" 
              className="block text-orange-500"
            />
          </h2>
        </div>

        {/* Content Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
          
          {/* Left / Text Content */}
          <div className="lg:col-span-7 flex flex-col gap-12">
            <Reveal>
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-xl md:text-3xl font-medium leading-tight text-zinc-800 dark:text-zinc-200">
                  Forging premium digital ecosystems through a multi-disciplinary lens. From scalable MERN stack architectures and custom WordPress solutions, to striking UI design and cinematic media production.
                </p>
                <p className="text-base md:text-lg text-zinc-500 dark:text-zinc-400 mt-4 md:mt-6 leading-relaxed">
                  I don't just write code; I architect entire digital identities. My approach fuses robust backend engineering with pixel-perfect design and dynamic motion graphics. Whether it's building interactive web applications, designing brutalist interfaces, or color-grading raw footage, I treat every project as a cohesive, visceral experience.
                </p>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div className="grid grid-cols-2 gap-4 md:gap-8 border-t border-zinc-200 dark:border-zinc-800 pt-6 md:pt-8 mt-4">
                <div>
                  <h4 className="font-mono text-xs text-zinc-400 mb-2 uppercase tracking-widest">Engineering</h4>
                  <p className="font-bold text-base md:text-xl text-zinc-900 dark:text-white">MERN / WordPress</p>
                </div>
                <div>
                  <h4 className="font-mono text-xs text-zinc-400 mb-2 uppercase tracking-widest">Design</h4>
                  <p className="font-bold text-base md:text-xl text-zinc-900 dark:text-white">UI/UX & Branding</p>
                </div>
                <div>
                  <h4 className="font-mono text-xs text-zinc-400 mb-2 uppercase tracking-widest">Media</h4>
                  <p className="font-bold text-base md:text-xl text-zinc-900 dark:text-white">Video & Photo</p>
                </div>
                <div>
                  <h4 className="font-mono text-xs text-zinc-400 mb-2 uppercase tracking-widest">Aesthetic</h4>
                  <p className="font-bold text-base md:text-xl text-zinc-900 dark:text-white">Brutalist / Minimal</p>
                </div>
              </div>
            </Reveal>

          </div>

          {/* Right / Photo Stack */}
          <div className="lg:col-span-5 relative mt-12 lg:mt-0">
            <Reveal delay={200}>
              <div className="relative">
                {/* Decorative Elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 border-t-2 border-r-2 border-orange-500 hidden md:block z-0"></div>
                <div className="absolute -bottom-4 -left-4 w-24 h-24 border-b-2 border-l-2 border-orange-500 hidden md:block z-0"></div>
                
                <PhotoStack />
              </div>
            </Reveal>
          </div>
        </div>

      </div>

      {/* Scrolling Skills Marquee */}
      <div className="mt-20 md:mt-32 border-y border-zinc-200 dark:border-zinc-900 bg-zinc-50 dark:bg-black py-6 md:py-8 overflow-hidden">
        <ScrollVelocity 
          texts={[skillText]}
          velocity={60} 
          className="text-4xl md:text-7xl font-black text-transparent [-webkit-text-stroke:1px_#a1a1aa] dark:[-webkit-text-stroke:1px_#3f3f46] hover:text-orange-500 hover:[-webkit-text-stroke:0px] transition-all duration-300 cursor-default px-4"
        />
      </div>

    </section>
  );
};