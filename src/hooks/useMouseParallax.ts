'use client';

import { useEffect, useRef } from 'react';

export function useMouseParallax(strength = 0.3) {
  const ref = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2 * strength;
      const y = (e.clientY / window.innerHeight - 0.5) * 2 * strength;
      ref.current = { x, y };
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [strength]);

  return ref;
}
