import React, { useState, useEffect, useRef } from 'react';
import DecryptedText from '../animations/DecryptedText';
import { useIsMobile } from '../animations/useIsMobile';

export const Hero = ({ introFinished, theme, introVideoRef, bgVideoRef, heroTextRef, handleIntroEnded, handleSkipIntro, introVideoUrl, bgVideoUrl }) => {
  const isMobile = useIsMobile();
  const [time, setTime] = useState('');
  const [sysHex, setSysHex] = useState('0x000000');

  const posYRef = useRef(null);
  const leftParallaxRef = useRef(null);
  const rightParallaxRef = useRef(null);

  useEffect(() => {
    let ticking = false;

    const updateScroll = () => {
      const currentScrollY = window.scrollY;
      if (posYRef.current) {
        posYRef.current.innerText = Math.round(currentScrollY);
      }
      if (leftParallaxRef.current) {
        leftParallaxRef.current.style.transform = `translateX(${-currentScrollY * 1.8}px)`;
      }
      if (rightParallaxRef.current) {
        rightParallaxRef.current.style.transform = `translateX(${currentScrollY * 1.8}px)`;
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScroll);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateScroll();
    
    setTime(new Date().toLocaleTimeString());
    const int = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
      setSysHex('0x' + Math.floor(Math.random()*16777215).toString(16).padEnd(6, '0').toUpperCase());
    }, 1000);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(int);
    };
  }, []);

  const renderStaggeredText = (text, baseDelay, colorClass) => {
    return text.split('').map((char, i) => (
      <span
        key={i}
        className={`glitch-text inline-block transition-all duration-[1200ms] ease-[cubic-bezier(0.85,0,0.15,1)] ${introFinished ? 'translate-y-0 opacity-100 scale-100 rotate-0' : 'translate-y-[100px] opacity-0 scale-50 rotate-[-10deg]'} ${colorClass}`}
        style={{ transitionDelay: `${baseDelay + i * 80}ms` }}
        data-text={char}
      >
        {char}
      </span>
    ));
  };

  return (
    <section id="home" className={`relative flex flex-col justify-center px-6 md:px-12 lg:px-24 pt-20 z-20 overflow-hidden ${!introFinished ? 'h-[100svh]' : 'min-h-[100svh]'}`}>
      
      {/* INTRO VIDEO */}
      {!introFinished && (
        <div className={`fixed inset-0 z-[9999] bg-white dark:bg-black flex items-center justify-center transition-colors duration-700`}>
            <video ref={introVideoRef} autoPlay playsInline muted onEnded={handleIntroEnded} 
            className={`w-full h-full object-cover transition-all duration-700 ${theme === 'light' ? 'invert' : ''}`} src={introVideoUrl} />
            <button onClick={handleSkipIntro} className="cursor-target absolute bottom-8 right-8 text-xs font-mono uppercase tracking-widest text-zinc-500 hover:text-black dark:hover:text-white transition-colors z-[10000]">
            Skip Intro &gt;&gt;
            </button>
        </div>
      )}

      {/* BACKGROUND VIDEO */}
      <video ref={bgVideoRef} loop muted playsInline className={`absolute inset-0 w-full h-full object-cover z-0 pointer-events-none transition-all duration-1000 ${introFinished ? 'opacity-100' : 'opacity-0'} ${theme === 'light' ? 'invert' : ''}`} src={bgVideoUrl} />
      <div className={`absolute inset-0 bg-zinc-50/70 dark:bg-zinc-950/80 z-[1] transition-colors duration-1000 pointer-events-none ${introFinished ? 'opacity-100' : 'opacity-0'}`} />

      {/* HUD OVERLAY */}
      <div className={`absolute inset-0 pointer-events-none z-50 px-4 sm:px-6 md:px-12 lg:px-24 pt-28 pb-12 md:pt-32 flex flex-col justify-between transition-opacity duration-1000 delay-1000 ${introFinished ? 'opacity-100' : 'opacity-0'}`}>
        <div className="flex justify-between gap-2 font-mono text-[9px] sm:text-xs md:text-sm font-bold text-zinc-500 dark:text-zinc-400 tracking-[0.05em] sm:tracking-[0.2em] whitespace-nowrap">
          <span>SYST_TIME: {time}</span>
          <span>MEM_ALLOC: {sysHex}</span>
        </div>
        <div className="flex justify-between gap-2 font-mono text-[9px] sm:text-xs md:text-sm font-bold text-zinc-500 dark:text-zinc-400 tracking-[0.05em] sm:tracking-[0.2em] mt-auto whitespace-nowrap">
          <span>POS_Y: <span ref={posYRef}>0</span>px</span>
          <span><span className="animate-pulse text-orange-500">REC</span> // ONLINE</span>
        </div>
      </div>

      {/* HERO TEXT */}
      <div className="relative z-10 w-full flex flex-col pointer-events-auto glitch-wrapper">
        <div className={`mb-6 ml-2 transition-all duration-1000 delay-[400ms] transform ${introFinished ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-[10px] sm:text-xs md:text-sm uppercase whitespace-nowrap tracking-[0.15em] sm:tracking-[0.2em] md:tracking-[0.4em] text-zinc-600 dark:text-zinc-300 font-mono drop-shadow-md dark:drop-shadow-none">
            Web Developer // MERN & WordPress
          </p>
        </div>
        
        <div ref={heroTextRef} className="flex flex-col w-full my-4 md:my-8 drop-shadow-2xl overflow-visible px-4 -mx-4 audio-reactive-hero">
          <h1 ref={leftParallaxRef} className="text-[11vw] sm:text-[11vw] md:text-[12vw] leading-[0.75] tracking-tight uppercase self-start whitespace-nowrap overflow-visible" style={{ fontFamily: '"Syne", sans-serif', fontWeight: 800 }}>
            {renderStaggeredText("MIDHUN", 800, theme === 'dark' ? 'text-texture-dark' : 'text-texture-light')}
          </h1>
          
          {/* NUDGE APPLIED HERE: translate-x-4 added to shift it slightly right on mobile */}
          <h1 ref={rightParallaxRef} className="text-[11vw] sm:text-[11vw] md:text-[12vw] leading-[0.75] tracking-tight uppercase self-end -mt-2 md:-mt-8 whitespace-nowrap overflow-visible -mr-8 md:mr-0" style={{ fontFamily: '"Syne", sans-serif', fontWeight: 800 }}>
            {renderStaggeredText("MOHAN", 1200, theme === 'dark' ? 'text-texture-dark' : 'text-texture-light')}
          </h1>
        </div>
        
        {/* UPDATED: Added wrapper to align text and button horizontally on desktop */}
        <div className="w-full flex flex-col md:flex-row md:justify-between md:items-center gap-6 md:gap-12 mt-10 md:mt-24">
          
          <div className={`max-w-[90%] sm:max-w-xl min-h-[140px] md:min-h-[100px] transition-all duration-1000 delay-[600ms] transform ${introFinished ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <p className="text-base md:text-2xl leading-relaxed text-zinc-700 dark:text-zinc-300 font-light">
              {introFinished ? (
                <DecryptedText
                  text="Building robust digital architecture and immersive web experiences. From complex backend systems to pixel-perfect frontends."
                  animateOn="view"
                  revealDirection="start"
                  speed={50}
                  maxIterations={15}
                  sequential={true}
                  useOriginalCharsOnly={false}
                  className="opacity-100"
                  encryptedClassName={isMobile ? 'opacity-60' : 'opacity-60 blur-[1px]'}
                />
              ) : (
                <span className="opacity-0">Building robust digital architecture and immersive web experiences. From complex backend systems to pixel-perfect frontends.</span>
              )}
            </p>
          </div>

          <div className={`flex-shrink-0 transition-all duration-1000 delay-[800ms] transform ${introFinished ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <a 
              href="/resume.html" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group relative inline-flex items-center justify-center px-8 py-3 md:py-4 text-xs md:text-sm font-bold font-mono tracking-[0.2em] text-zinc-900 dark:text-white border border-zinc-900 dark:border-white overflow-hidden transition-all duration-300 hover:border-orange-500 dark:hover:border-orange-500 w-fit"
            >
              <span className="absolute inset-0 w-full h-full -translate-x-full bg-orange-500 group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.85,0,0.15,1)]"></span>
              <span className="relative flex items-center gap-3 group-hover:text-white transition-colors duration-500">
                <span>VIEW_RESUME</span>
                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </a>
          </div>
          
        </div>

      </div>
    </section>
  );
};