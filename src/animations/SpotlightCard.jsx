import { useRef, useCallback } from 'react';

const SpotlightCard = ({ children, className = '', spotlightColor = 'rgba(255, 255, 255, 0.25)' }) => {
  const divRef = useRef(null);
  const spotlightRef = useRef(null);
  const isFocusedRef = useRef(false);

  const handleMouseMove = useCallback(e => {
    if (!divRef.current || !spotlightRef.current || isFocusedRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    spotlightRef.current.style.background = `radial-gradient(circle at ${x}px ${y}px, ${spotlightColor}, transparent 80%)`;
  }, [spotlightColor]);

  const handleFocus = useCallback(() => {
    isFocusedRef.current = true;
    if (spotlightRef.current) spotlightRef.current.style.opacity = '0.6';
  }, []);

  const handleBlur = useCallback(() => {
    isFocusedRef.current = false;
    if (spotlightRef.current) spotlightRef.current.style.opacity = '0';
  }, []);

  const handleMouseEnter = useCallback(() => {
    if (spotlightRef.current) spotlightRef.current.style.opacity = '0.6';
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (spotlightRef.current) spotlightRef.current.style.opacity = '0';
  }, []);

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative rounded-3xl border border-zinc-300 dark:border-neutral-800 bg-zinc-100 dark:bg-neutral-900 overflow-hidden p-8 ${className}`}
    >
      <div
        ref={spotlightRef}
        className="pointer-events-none absolute inset-0 transition-opacity duration-500 ease-in-out"
        style={{ opacity: 0 }}
      />
      {children}
    </div>
  );
};

export default SpotlightCard;
