import { useEffect, useRef, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ScrollReveal = ({
  children,
  scrollContainerRef,
  enableBlur = true,
  baseOpacity = 0,
  baseRotation = 0,
  blurStrength = 10,
  containerClassName = '',
  textClassName = '',
  rotationEnd = 'center center',
  wordAnimationEnd = 'bottom center'
}) => {
  const containerRef = useRef(null);

  const splitText = useMemo(() => {
    const text = typeof children === 'string' ? children : '';
    return text.split(/(\s+)/).map((word, index) => {
      if (word.match(/^\s+$/)) return word;
      return (
        <span className="inline-block word" key={index}>
          {word}
        </span>
      );
    });
  }, [children]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const scroller = scrollContainerRef && scrollContainerRef.current ? scrollContainerRef.current : window;

    // Word elements for the scrub
    const wordElements = el.querySelectorAll('.word');

    // Create a timeline specifically for the words to ensure strict stagger mapping to scroll
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        scroller,
        start: 'top 95%', // Starts almost as soon as it enters from the bottom
        end: 'top 60%',   // Fully revealed by the time it reaches the lower-middle of the screen
        scrub: true,
      }
    });

    if (baseRotation !== 0) {
       tl.fromTo(el, { rotate: baseRotation, transformOrigin: '0% 50%' }, { rotate: 0, ease: 'none' }, 0);
    }

    tl.fromTo(
      wordElements,
      { opacity: baseOpacity },
      {
        opacity: 1,
        stagger: 0.1, // Distribute words equally across the scroll distance
        ease: 'none'
      },
      0
    );

    if (enableBlur) {
      tl.fromTo(
        wordElements,
        { filter: `blur(${blurStrength}px)` },
        {
          filter: 'blur(0px)',
          stagger: 0.1,
          ease: 'none'
        },
        0
      );
    }

    return () => {
      // In a real project, triggers on unmount are handled by gsap.context() if used at high level
    };
  }, [scrollContainerRef, enableBlur, baseRotation, baseOpacity, rotationEnd, wordAnimationEnd, blurStrength]);

  return (
    <div ref={containerRef} className={`my-2 ${containerClassName}`}>
      <div className={`text-[clamp(1.2rem,3vw,2.5rem)] leading-[1.4] font-semibold ${textClassName}`}>{splitText}</div>
    </div>
  );
};

export default ScrollReveal;
