import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';
import { gsap } from 'gsap';

// ─── Easing curves ────────────────────────────────────────────────────────────
const EXPO_IN = [0.7, 0, 0.84, 0];

// ─── RAF-lerped counter hook ──────────────────────────────────────────────────
function useAnimatedCounter(target) {
  const [display, setDisplay] = useState(0);
  const raf = useRef(null);
  const current = useRef(0);

  useEffect(() => {
    const animate = () => {
      const diff = target - current.current;
      if (Math.abs(diff) < 0.15) {
        current.current = target;
        setDisplay(Math.round(target));
        return;
      }
      current.current += diff * 0.07;
      setDisplay(Math.round(current.current));
      raf.current = requestAnimationFrame(animate);
    };
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf.current);
  }, [target]);

  return display;
}

// ─── Logo letters split for per-character animation ──────────────────────────
const LOGO_CHARS = ['M', '/', 'M'];

// ─── Main Component ───────────────────────────────────────────────────────────
export const LoadingScreen = ({ loadingProgress }) => {
  const counter   = useAnimatedCounter(loadingProgress);
  const containerRef   = useRef(null);
  const metaTopRef     = useRef(null);
  const letterRefs     = useRef([]);

  const counterRef     = useRef(null);
  const progressBarRef = useRef(null);
  const bottomBarRef   = useRef(null);

  // ── Entrance timeline ───────────────────────────────────────────────────────
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      // Meta row fades up
      tl.fromTo(
        metaTopRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.8 },
        0
      );

      // Each logo letter: drops in + blur clears
      letterRefs.current.forEach((el, i) => {
        if (!el) return;
        tl.fromTo(
          el,
          {
            y: 60,
            opacity: 0,
            filter: 'blur(20px)',
            rotateX: -40,
          },
          {
            y: 0,
            opacity: 1,
            filter: 'blur(0px)',
            rotateX: 0,
            duration: 1.0,
            ease: 'power3.out',
          },
          0.2 + i * 0.12         // stagger each letter
        );
      });

      // After letters land, start idle float on the whole logo group
      tl.call(() => {
        const logoGroup = containerRef.current?.querySelector('.loader-logo-group');
        if (!logoGroup) return;
        gsap.to(logoGroup, {
          y: -10,
          duration: 2.8,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        });
      }, [], 1.6);

      // Counter flies up
      tl.fromTo(
        counterRef.current,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'back.out(1.5)' },
        0.55
      );

      // Bottom progress bar track slides in + fades in
      tl.fromTo(
        bottomBarRef.current,
        { scaleX: 0, opacity: 0, transformOrigin: 'left center' },
        { scaleX: 1, opacity: 1, duration: 0.7, ease: 'power2.out' },
        0.45
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const padded = counter.toString().padStart(2, '0');

  return (
    <motion.div
      ref={containerRef}
      key="loader"
      className="fixed inset-0 z-[200] overflow-hidden"
      initial={{ opacity: 1 }}
      exit="exit"
      variants={{
        exit: { transition: { staggerChildren: 0.05, delayChildren: 0 } },
      }}
    >
      {/* ── Split-panel exit: top half ────────────────────────────────────── */}
      <motion.div
        className="absolute inset-x-0 top-0 h-1/2 bg-zinc-950"
        variants={{
          exit: { y: '-102%', transition: { duration: 1.05, ease: EXPO_IN } },
        }}
      />
      {/* ── Split-panel exit: bottom half ─────────────────────────────────── */}
      <motion.div
        className="absolute inset-x-0 bottom-0 h-1/2 bg-zinc-950"
        variants={{
          exit: { y: '102%', transition: { duration: 1.05, ease: EXPO_IN } },
        }}
      />

      {/* ── All visible content (fades before panels split) ───────────────── */}
      <motion.div
        className="absolute inset-0 flex flex-col"
        variants={{
          exit: { opacity: 0, transition: { duration: 0.3, ease: 'easeIn' } },
        }}
      >
        {/* Top metadata bar */}
        <div
          ref={metaTopRef}
          className="flex justify-between items-start px-7 md:px-12 pt-7 md:pt-10"
          style={{ opacity: 0 }}
        >
          <div className="flex flex-col gap-[3px]">
            <span className="loader-label">Portfolio</span>
            <span className="loader-label" style={{ opacity: 0.35 }}>v 3.0</span>
          </div>
          <div className="flex flex-col gap-[3px] items-end">
            <span className="loader-label">Loading</span>
            <span className="loader-label" style={{ opacity: 0.35 }}>2026</span>
          </div>
        </div>

        {/* Center — animated logo ────────────────────────────────────────── */}
        <div className="flex-1 flex items-center justify-center relative overflow-hidden perspective-[800px]">
          {/* Ghost watermark */}
          <span
            className="absolute select-none pointer-events-none leading-none"
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: 'clamp(8rem, 28vw, 22rem)',
              color: 'rgba(255,255,255,0.025)',
              letterSpacing: '-0.05em',
              userSelect: 'none',
            }}
          >
            MM
          </span>

          {/* Logo characters — individually animated */}
          <div
            className="loader-logo-group relative flex items-center"
            style={{ perspective: '600px' }}
          >
            {LOGO_CHARS.map((char, i) => (
              <span
                key={i}
                ref={el => (letterRefs.current[i] = el)}
                className="block select-none"
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 800,
                  fontSize: 'clamp(4.5rem, 14vw, 11rem)',
                  lineHeight: 1,
                  letterSpacing: '-0.04em',
                  color: char === '/' ? 'rgba(255,255,255,0.2)' : '#ffffff',
                  opacity: 0,                 // GSAP animates this in
                  display: 'inline-block',
                  willChange: 'transform, opacity, filter',
                  transformStyle: 'preserve-3d',
                  // Tighten slash spacing
                  margin: char === '/' ? '0 -0.02em' : '0',
                }}
              >
                {char}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom bar — counter + progress ──────────────────────────────── */}
        <div className="px-7 md:px-12 pb-7 md:pb-10 flex flex-col gap-5">

          {/* Counter row */}
          <div
            ref={counterRef}
            className="flex justify-between items-end"
            style={{ opacity: 0 }}
          >
            <span className="loader-label" style={{ opacity: 0.4 }}>
              Initialising experience
            </span>
            <div className="flex items-baseline gap-[3px]">
              <span
                className="tabular-nums text-white"
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 800,
                  fontSize: 'clamp(2.8rem, 8vw, 6rem)',
                  lineHeight: 1,
                  letterSpacing: '-0.04em',
                }}
              >
                {padded}
              </span>
              <span
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 400,
                  fontSize: 'clamp(1rem, 2.5vw, 1.6rem)',
                  color: 'rgba(255,255,255,0.3)',
                  letterSpacing: '0.02em',
                  marginBottom: '0.15em',
                }}
              >
                %
              </span>
            </div>
          </div>

          {/* Progress track — full width, 2px, bottom-pinned */}
          <div
            ref={bottomBarRef}
            className="relative w-full overflow-hidden"
            style={{
              height: '2px',
              background: 'rgba(255,255,255,0.08)',
              borderRadius: '2px',
              transformOrigin: 'left center',
              opacity: 0,             // GSAP fades in via timeline
            }}
          >
            {/* Animated fill — driven by loadingProgress */}
            <motion.div
              ref={progressBarRef}
              className="absolute top-0 left-0 h-full rounded-[2px]"
              style={{
                background:
                  'linear-gradient(90deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.5) 50%, rgba(255,255,255,0.9) 100%)',
                backgroundSize: '200% 100%',
                scaleX: loadingProgress / 100,
                transformOrigin: 'left center',
                boxShadow: '0 0 12px rgba(255,255,255,0.6)',
              }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            />

            {/* Shimmer sweep on top */}
            <div
              className="absolute top-0 left-0 h-full w-full pointer-events-none"
              style={{
                background:
                  'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.6) 50%, transparent 100%)',
                backgroundSize: '200% 100%',
                animation: 'loaderShimmer 1.6s linear infinite',
              }}
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
