import React from 'react';
import { useScrollReveal } from './useScrollReveal';

export const Reveal = ({ children, delay = 0, direction = 'up', className = '' }) => {
  const [ref, isVisible] = useScrollReveal();
  
  const baseStyle = {
    transition: `all 1.2s cubic-bezier(0.85, 0, 0.15, 1) ${delay}ms`,
    opacity: isVisible ? 1 : 0,
    transform: isVisible 
      ? 'translate(0, 0) scale(1)' 
      : direction === 'up' ? 'translate(0, 80px) scale(0.95)'
      : direction === 'down' ? 'translate(0, -80px) scale(0.95)'
      : direction === 'left' ? 'translate(80px, 0) scale(0.95)'
      : 'translate(-80px, 0) scale(0.95)'
  };

  return (
    <div ref={ref} style={baseStyle} className={className}>
      {children}
    </div>
  );
};
