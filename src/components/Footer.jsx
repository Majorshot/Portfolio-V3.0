import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Github, Twitter, Linkedin } from 'lucide-react';
import { Reveal } from '../animations/Reveal';

export const Footer = () => {
  const leftEyeRef = useRef(null);
  const rightEyeRef = useRef(null);
  const [isIdle, setIsIdle] = useState(true);
  const idleTimerRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      // Reset idle timer on every mouse move
      setIsIdle(false);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      idleTimerRef.current = setTimeout(() => setIsIdle(true), 2000);

      const updateEye = (eye) => {
        if (!eye) return;
        const rect = eye.getBoundingClientRect();
        const eyeCenterX = rect.left + rect.width / 2;
        const eyeCenterY = rect.top + rect.height / 2;
        
        const deltaX = mouseX - eyeCenterX;
        const deltaY = mouseY - eyeCenterY;
        const angle = Math.atan2(deltaY, deltaX);
        
        const maxRadius = (rect.width / 2) - (rect.width * 0.33 / 2) - 8; 
        const distance = Math.min(Math.hypot(deltaX, deltaY) / 10, maxRadius);
        
        const pupilX = Math.cos(angle) * distance;
        const pupilY = Math.sin(angle) * distance;

        const pupil = eye.querySelector('.pupil');
        if (pupil) {
          pupil.style.transform = `translate(${pupilX}px, ${pupilY}px)`;
          pupil.style.animation = 'none';
        }
      };

      updateEye(leftEyeRef.current);
      updateEye(rightEyeRef.current);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, []);

  return (
    <section id="footer" className="pt-12 md:pt-32 pb-8 md:pb-12 px-6 md:px-12 lg:px-24 bg-zinc-200 dark:bg-zinc-900 text-zinc-900 dark:text-white relative overflow-hidden z-20 -mt-[20px] md:-mt-[150px]" style={{ borderTopLeftRadius: '50% 80px', borderTopRightRadius: '50% 80px' }}>
      
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,_rgba(255,100,0,0.1)_0%,_transparent_70%)] opacity-50 pointer-events-none" />
      
      {/* CUTE EYES CONTAINER */}
      <div className={`w-full flex justify-center items-center gap-8 md:gap-12 mb-12 pointer-events-none relative z-20 ${isIdle ? 'eye-idle' : ''}`}>
        
        {/* Left Eye */}
        <div ref={leftEyeRef} className="w-32 h-32 md:w-48 md:h-48 bg-white rounded-full flex items-center justify-center relative shadow-inner overflow-hidden border-[6px] border-zinc-200 dark:border-zinc-800 transition-colors">
            {/* Pupil */}
            <div className="pupil w-12 h-12 md:w-16 md:h-16 bg-zinc-900 rounded-full flex justify-center items-center relative transition-transform duration-75 ease-out shadow-2xl">
               {/* Cute sparks */}
               <div className="absolute top-[15%] right-[20%] w-3 h-3 md:w-4 md:h-4 bg-white rounded-full" />
               <div className="absolute top-[40%] right-[15%] w-1.5 h-1.5 md:w-2 md:h-2 bg-white rounded-full" />
            </div>
        </div>

        {/* Right Eye */}
        <div ref={rightEyeRef} className="w-32 h-32 md:w-48 md:h-48 bg-white rounded-full flex items-center justify-center relative shadow-inner overflow-hidden border-[6px] border-zinc-200 dark:border-zinc-800 transition-colors">
            {/* Pupil */}
            <div className="pupil w-12 h-12 md:w-16 md:h-16 bg-zinc-900 rounded-full flex justify-center items-center relative transition-transform duration-75 ease-out shadow-2xl">
               {/* Cute sparks */}
               <div className="absolute top-[15%] right-[20%] w-3 h-3 md:w-4 md:h-4 bg-white rounded-full" />
               <div className="absolute top-[40%] right-[15%] w-1.5 h-1.5 md:w-2 md:h-2 bg-white rounded-full" />
            </div>
        </div>

      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "50px" }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-center relative z-20"
      >
        <p className="text-sm md:text-base font-mono text-zinc-500 uppercase tracking-widest text-center flex flex-col md:flex-row items-center justify-center gap-4">
          <span className="hidden md:block w-12 h-px bg-zinc-400 dark:bg-zinc-800"></span>
          © {new Date().getFullYear()} MIDHUN MOHAN
          <span className="hidden md:block w-12 h-px bg-zinc-400 dark:bg-zinc-800"></span>
        </p>
      </motion.div>
      
    </section>
  );
};