import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Reveal } from '../animations/Reveal';
import SpotlightCard from '../animations/SpotlightCard';

gsap.registerPlugin(ScrollTrigger);

export const Experience = () => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const progressRef = useRef(null);
  const itemsRef = useRef([]);
  const dotRefs = useRef([]);

  const jobs = [
    { company: "M KINS", role: "Software Manager", period: "Jan 2024 — Feb 2025", color: "bg-zinc-600", desc: "Led software development initiatives, managed technical teams, and oversaw project delivery." },
    { company: "KERALA FINANCIAL CORP", role: "Backend Developer", period: "Mar 2025 — May 2025", color: "bg-emerald-600", desc: "Engineered secure backend services and API endpoints for financial infrastructure." },
    { company: "YANTURA", role: "React Developer", period: "Aug 2025 — Sept 2025", color: "bg-purple-600", desc: "Built dynamic, component-driven user interfaces using modern React methodologies." },
    { company: "CENTURION STAUNCH", role: "WordPress & HTML Developer", period: "Nov 2025 — Present", color: "bg-orange-600", desc: "Developing and maintaining custom WordPress solutions and responsive HTML architecture." }
  ];

  useEffect(() => {
    let ctx = gsap.context(() => {
      // 1. Progress line starts unscaled, animates firmly along scroll progress
      if (progressRef.current && containerRef.current) {
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top 70%",
          end: "bottom 30%",
          scrub: 1,
          animation: gsap.fromTo(progressRef.current, 
            { scaleY: 0 }, 
            { scaleY: 1, ease: "none" }
          )
        });
      }

      // 2. Map items unambiguously back and forth across threshold
      itemsRef.current.forEach((item) => {
        if (!item) return;

        ScrollTrigger.create({
          trigger: item,
          start: "top 85%",
          end: "bottom 15%",
          toggleActions: "play reverse play reverse",
          animation: gsap.fromTo(item, 
            { opacity: 0.3, scale: 0.98 }, 
            { opacity: 1, scale: 1.02, duration: 0.4, ease: "power2.out" }
          )
        });
      });

      // 3. Timeline dots light up when scrolled into view
      dotRefs.current.forEach((dot) => {
        if (!dot) return;
        ScrollTrigger.create({
          trigger: dot,
          start: "top 70%",
          end: "bottom 30%",
          onEnter: () => dot.classList.add('active'),
          onLeaveBack: () => dot.classList.remove('active'),
        });
      });

      // Recalculate robustly on mobile after variable layout text finishes mapping
      const refreshMetrics = () => ScrollTrigger.refresh();
      const st1 = setTimeout(refreshMetrics, 100);
      const st2 = setTimeout(refreshMetrics, 500);
      const st3 = setTimeout(refreshMetrics, 1500);

      return () => {
        clearTimeout(st1);
        clearTimeout(st2);
        clearTimeout(st3);
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="experience" 
      ref={sectionRef} 
      className="py-20 md:py-32 px-6 md:px-12 lg:px-24 relative z-10 bg-zinc-50/95 dark:bg-zinc-950/95 backdrop-blur-md"
    >
      <div className="max-w-7xl mx-auto flex flex-col xl:flex-row gap-12 lg:gap-32 relative">
        
        <div className="xl:w-1/3 overflow-visible">
          <Reveal>
            <div className="xl:sticky xl:top-40 overflow-visible">
              {/* UPDATED: Reduced from 10.5vw to 8.5vw to accommodate wider fonts without breaking the layout */}
              <h2 className="text-[8.5vw] sm:text-[9vw] md:text-6xl lg:text-7xl xl:text-[2.7rem] font-black tracking-tighter uppercase leading-normal text-zinc-900 dark:text-white whitespace-nowrap">
                EXPERIENCE
              </h2>
              <div className="mt-8 h-1 w-12 bg-orange-500 rounded-full" />
              <p className="mt-6 text-zinc-500 dark:text-zinc-400 font-mono text-sm leading-relaxed tracking-wide uppercase">
                A timeline of professional hustle, engineering, and digital craftsmanship.
              </p>
            </div>
          </Reveal>
        </div>

        <div className="xl:w-2/3 relative" ref={containerRef}>
          
          <div className="absolute left-0 md:-left-8 lg:-left-16 top-0 bottom-0 w-[2px] bg-zinc-200 dark:bg-zinc-800 rounded-full" />
          <div 
            ref={progressRef}
            className="absolute left-0 md:-left-8 lg:-left-16 top-0 bottom-0 w-[2px] bg-orange-500 rounded-full origin-top scale-y-0 shadow-[0_0_15px_rgba(249,115,22,0.8)] z-10"
          />

          <div className="space-y-12 py-12">
            {jobs.map((job, index) => (
              <div 
                key={index} 
                ref={el => itemsRef.current[index] = el}
                className="group cursor-default relative pl-6 md:pl-0"
              >
                <div ref={el => dotRefs.current[index] = el} className="hidden md:block absolute -left-[5px] md:-left-[29px] lg:-left-[61px] top-8 md:top-12 w-[12px] h-[12px] rounded-full bg-zinc-300 dark:bg-zinc-700 border-2 border-zinc-50 dark:border-zinc-950 z-20 timeline-dot" />
                
                <SpotlightCard className="flex flex-col md:flex-row md:items-start justify-between gap-6 relative" spotlightColor="rgba(249, 115, 22, 0.15)">
                  
                  <div className="flex flex-col gap-3 md:w-1/2 cursor-crosshair">
                    <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400 tracking-widest uppercase bg-zinc-200/50 dark:bg-zinc-900/50 border border-zinc-300 dark:border-zinc-800 w-fit px-3 py-1 rounded-full shadow-sm">
                      {job.period}
                    </span>
                    <h3 className="text-2xl md:text-4xl lg:text-5xl font-bold tracking-tighter text-zinc-900 dark:text-white transition-colors duration-500 mt-2">
                      {job.company}
                    </h3>
                  </div>
                  
                  <div className="md:w-1/2 flex flex-col gap-3 mt-2 md:mt-0">
                    <h4 className="text-lg md:text-2xl font-semibold text-orange-500">
                      {job.role}
                    </h4>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed font-light">
                      {job.desc}
                    </p>
                  </div>
                  
                </SpotlightCard>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};