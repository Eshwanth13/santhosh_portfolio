'use client';

import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const dotPosRef = useRef({ x: 0, y: 0 });
  const ringPosRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Hide default cursor
    document.body.style.cursor = 'none';

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseEnterClickable = () => {
      ringRef.current?.classList.add('expanded');
    };

    const handleMouseLeaveClickable = () => {
      ringRef.current?.classList.remove('expanded');
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Attach to all clickable elements
    const updateClickableListeners = () => {
      const clickables = document.querySelectorAll('a, button, [role="button"], input, textarea, select');
      clickables.forEach((el) => {
        el.addEventListener('mouseenter', handleMouseEnterClickable);
        el.addEventListener('mouseleave', handleMouseLeaveClickable);
      });
    };

    updateClickableListeners();

    let rafId: number;
    const animate = () => {
      // Dot follows with 80ms lag (faster)
      dotPosRef.current.x += (mouseRef.current.x - dotPosRef.current.x) * 0.5;
      dotPosRef.current.y += (mouseRef.current.y - dotPosRef.current.y) * 0.5;

      // Ring follows with 200ms lag (slower)
      ringPosRef.current.x += (mouseRef.current.x - ringPosRef.current.x) * 0.15;
      ringPosRef.current.y += (mouseRef.current.y - ringPosRef.current.y) * 0.15;

      if (dotRef.current) {
        dotRef.current.style.left = `${dotPosRef.current.x}px`;
        dotRef.current.style.top = `${dotPosRef.current.y}px`;
      }

      if (ringRef.current) {
        ringRef.current.style.left = `${ringPosRef.current.x}px`;
        ringRef.current.style.top = `${ringPosRef.current.y}px`;
      }

      rafId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId);
      document.body.style.cursor = '';
    };
  }, []);

  return (
    <>
      <div id="cursor-dot" ref={dotRef} aria-hidden="true" />
      <div id="cursor-ring" ref={ringRef} aria-hidden="true" />
    </>
  );
}
