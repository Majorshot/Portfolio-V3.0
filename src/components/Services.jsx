import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BlurText from '../animations/BlurText';
import ScrollReveal from '../animations/ScrollReveal';

import Grainient from '../animations/Grainient';

// Import Assets
import mernImg from '../assets/services/mern-stack.png';
import wpImg from '../assets/services/wordpress.png';
import uiImg from '../assets/services/ui-design.png';
import mediaImg from '../assets/services/media-prod.png';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: "MERN STACK DEV",
    headline: "WHERE THOUGHTFUL DESIGN MEETS SCALABLE ENGINEERING",
    number: "01",
    desc: "Architecting high-performance, interactive digital playgrounds. Secure Node.js backend infrastructure meeting brutally fast, responsive React frontends. Specializing in state management, API integration, and database architecture.",
    image: mernImg,
    skills: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS", "GSAP"]
  },
  {
    title: "WORDPRESS ARCH",
    headline: "DELIVERING CUSTOM, HIGHLY SCALABLE CMS ECOSYSTEMS",
    number: "02",
    desc: "Tailored perfectly with bespoke semantic themes and powerful enterprise plugins to drive organic growth. Deep customizations bypassing standard limits for complete control over content delivery.",
    image: wpImg,
    skills: ["PHP", "WordPress", "Custom Themes", "ACF", "Elementor", "SEO Optimization"]
  },
  {
    title: "UI & DESIGN",
    headline: "CRAFTING PREMIUM VISUAL BRANDING THAT DEFINES YOUR AESTHETIC",
    number: "03",
    desc: "From eye-catching posters to bespoke UX/UI assets, creating the definitive look and feel of modern applications. Every pixel thoughtfully placed to guide user journeys and maximize engagement.",
    image: uiImg,
    skills: ["Figma", "Photoshop", "Illustrator", "Wireframing", "Brand Identity"]
  },
  {
    title: "MEDIA PROD",
    number: "04",
    headline: "PROFESSIONAL VIDEO EDITING & CRISP PHOTOGRAPHY",
    desc: "Dynamic motion graphics and structural video editing to capture and elevate your brand's true narrative. Raw footage transformed into cinematic, conversion-focused storytelling.",
    image: mediaImg,
    skills: ["Premiere Pro", "After Effects", "Photography", "Color Grading", "DaVinci Resolve"]
  }
];

export const Services = () => {
  const containerRef = useRef(null);
  const imageRefs = useRef([]);
  const textRefs = useRef([]);

  useEffect(() => {
    let ctx = gsap.context(() => {
      
      // Setup elegant native scroll parallax for the massive images
      imageRefs.current.forEach((img) => {
        if (!img) return;

        // Set initial state for the reveal animation
        gsap.set(img, { scale: 1.4, opacity: 0 });

        // Reveal Animation (Zoom out and Fade in)
        gsap.to(img, {
          scale: 1,
          opacity: 1,
          duration: 1.5,
          ease: "power4.out",
          scrollTrigger: {
            trigger: img.parentNode,
            start: "top 55%", // Triggers when the top is almost at the center of the screen
            toggleActions: "play none none none",
            once: true 
          }
        });

        // Parallax (Continues after or during reveal)
        gsap.to(img, {
          yPercent: 15,
          ease: "none",
          scrollTrigger: {
            trigger: img.parentNode, // The banner container
            start: "top bottom", 
            end: "bottom top",
            scrub: 1,
          }
        });

        // Hover Effect using GSAP
        const parent = img.closest('.group');
        if (parent) {
          parent.addEventListener('mouseenter', () => {
            gsap.to(img, { scale: 1.1, duration: 0.8, ease: "power2.out", overwrite: "auto" });
          });
          parent.addEventListener('mouseleave', () => {
            gsap.to(img, { scale: 1, duration: 0.8, ease: "power2.out", overwrite: "auto" });
          });
        }
      });

      // Slide up and fade in the text details on scroll
      textRefs.current.forEach((textChunk) => {
        if (!textChunk) return;
        gsap.fromTo(textChunk, 
          { y: 60, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 1, ease: "power3.out",
            scrollTrigger: {
              trigger: textChunk,
              start: "top 85%",
              toggleActions: "play reverse play reverse"
            }
          }
        );
      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="services" className="relative z-[60] bg-zinc-100 dark:bg-zinc-950 font-sans w-full cursor-crosshair">
      
      {/* SVG Filter for Background Removal (Chroma Key Black to Alpha) */}
      <svg className="hidden">
        <filter id="remove-black" colorInterpolationFilters="sRGB">
          <feColorMatrix 
            type="matrix" 
            values="1 0 0 0 0
                    0 1 0 0 0
                    0 0 1 0 0
                    1 1 1 0 -0.1" 
          />
        </filter>
      </svg>

      <div className="w-full text-center py-16 md:py-32 bg-zinc-100 dark:bg-zinc-950 border-b border-zinc-300 dark:border-zinc-800 relative z-10">
         <span className="text-orange-500 font-mono font-bold tracking-widest uppercase mb-4 block text-sm">// Expertise</span>
         <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-[7rem] font-black uppercase tracking-tighter text-zinc-900 dark:text-white leading-[0.85] px-4 break-words">
            THE ARSENAL
         </h2>
      </div>

      {services.map((svc, idx) => (
        <div key={idx} className="w-full flex flex-col border-b border-zinc-200 dark:border-zinc-900 overflow-hidden relative">
          
          {/* Banner Image Area */}
          <div className="relative w-full h-[45vh] md:h-[70vh] lg:h-[80vh] overflow-hidden group isolate">
            <div className="absolute inset-0 z-0">
              <Grainient
                color1="#ea7d34"
                color2="#ff8c42"
                color3="#ff4d00"
                timeSpeed={0.15}
                colorBalance={0}
                warpStrength={1}
                warpFrequency={5}
                warpSpeed={2}
                warpAmplitude={50}
                blendAngle={0}
                blendSoftness={0.05}
                rotationAmount={500}
                noiseScale={2}
                grainAmount={0.03}
                grainScale={2}
                grainAnimated={false}
                contrast={1.5}
                gamma={1}
                saturation={1.2}
                centerX={0}
                centerY={0}
                zoom={0.9}
              />
            </div>
            
            <div className="absolute -top-[15%] left-0 w-full h-[130%] z-10 pointer-events-none overflow-hidden flex items-center justify-center">
              <img 
                ref={el => imageRefs.current[idx] = el}
                src={svc.image} 
                alt={svc.title} 
                className="w-full h-auto object-contain origin-center scale-100"
                style={{ filter: 'url(#remove-black) contrast(1.1) brightness(1.1)' }}
              />
            </div>
            
            <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 lg:p-24 flex flex-col z-20 overflow-hidden mix-blend-normal">
              <span className="text-zinc-900 font-mono font-bold tracking-widest mb-2 lg:mb-6 text-sm md:text-base border-l-4 border-zinc-900 pl-4 drop-shadow-sm">
                // {svc.number}
              </span>
              <BlurText
                text={svc.title}
                tag="h2"
                delay={130}
                animateBy="words"
                direction="bottom"
                className="text-[7vw] sm:text-5xl md:text-7xl lg:text-8xl xl:text-[8rem] font-black text-zinc-900 uppercase leading-[0.95] tracking-tight drop-shadow-sm"
              />
            </div>
          </div>

          {/* Details Area */}
          <div className="w-full bg-zinc-100 dark:bg-zinc-950 text-zinc-900 dark:text-white flex flex-col lg:flex-row relative z-20">
            
            {/* Giant Number Left Side (Desktop highly visible, Mobile cropped/hidden gracefully) */}
            <div className="hidden md:flex w-full lg:w-[40%] items-center justify-start lg:justify-center p-12 lg:p-0 overflow-hidden pointer-events-none opacity-40 lg:opacity-100 select-none">
              <span className="text-[12rem] lg:text-[22rem] font-black tracking-tighter leading-none text-zinc-300/50 dark:text-zinc-800/50">
                {svc.number}
              </span>
            </div>
            
            {/* Content Right Side */}
            <div 
              ref={el => textRefs.current[idx] = el}
              className="w-full lg:w-[60%] flex flex-col justify-center max-w-4xl p-6 md:p-16 lg:p-24 lg:pl-12 z-10"
            >
              <ScrollReveal
                baseOpacity={0}
                enableBlur
                baseRotation={0}
                blurStrength={10}
                containerClassName="mb-8 md:mb-12"
                textClassName="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight leading-tight text-zinc-900 dark:text-white drop-shadow-md"
              >
                {svc.headline}
              </ScrollReveal>
              
              <ScrollReveal
                baseOpacity={0}
                enableBlur
                baseRotation={0}
                blurStrength={10}
                textClassName="text-zinc-500 dark:text-zinc-400 text-base md:text-xl leading-relaxed font-light max-w-2xl"
              >
                {svc.desc}
              </ScrollReveal>
              
              {/* Badge Area for Skills */}
              <div className="flex flex-wrap gap-2 md:gap-3 mt-6 md:mt-8">
                {svc.skills.map((skill, sIdx) => (
                  <span key={skill} className="skill-badge px-3 md:px-5 py-2 md:py-2.5 rounded-full border border-zinc-300 dark:border-zinc-800 bg-zinc-200/50 dark:bg-zinc-900/50 text-xs md:text-base font-mono tracking-wide text-zinc-600 dark:text-zinc-300"
                    style={{ transitionDelay: `${sIdx * 50}ms` }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
          </div>
        </div>
      ))}
    </section>
  );
};
