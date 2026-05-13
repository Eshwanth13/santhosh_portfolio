'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/store/appStore';
import { LOADER_TEXTS } from '@/utils/constants';

export default function Loader() {
  const { isLoaded, loadingProgress, setIsLoaded, setLoadingProgress } = useAppStore();
  const [textIndex, setTextIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Star field canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const stars = Array.from({ length: 150 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.3,
      o: Math.random(),
      speed: Math.random() * 0.3 + 0.1,
    }));

    let animId: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((s) => {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 240, 255, ${s.o})`;
        ctx.fill();
        s.o += (Math.random() - 0.5) * 0.02;
        s.o = Math.max(0.1, Math.min(0.9, s.o));
      });
      animId = requestAnimationFrame(draw);
    };
    draw();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Progress simulation
  useEffect(() => {
    const duration = 2200;
    const start = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const progress = Math.min(100, (elapsed / duration) * 100);
      setLoadingProgress(progress);

      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setVisible(false);
          setTimeout(() => setIsLoaded(true), 300);
        }, 200);
      }
    }, 16);

    return () => clearInterval(interval);
  }, [setIsLoaded, setLoadingProgress]);

  // Text cycling
  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((i) => (i + 1) % LOADER_TEXTS.length);
    }, 400);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.2 }}
          style={{
            position: 'fixed',
            inset: 0,
            background: '#020617',
            zIndex: 10000,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <canvas
            ref={canvasRef}
            style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
          />

          <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
            {/* Logo / Name */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <h1
                className="font-orbitron"
                style={{ fontSize: 'clamp(1.2rem, 4vw, 2.2rem)', fontWeight: 900, marginBottom: 8 }}
              >
                <span style={{ color: '#e2e8f0' }}>Lukka Koushik </span>
                <span style={{
                  background: 'linear-gradient(135deg, #00f0ff 0%, #c026d3 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>Santhosh</span>
              </h1>
              <p
                className="font-rajdhani"
                style={{ color: '#67e8f9', letterSpacing: '0.3em', fontSize: '0.85rem', marginBottom: 48 }}
              >
                GAME DEVELOPER
              </p>
            </motion.div>

            {/* Progress bar */}
            <div
              style={{
                width: 280,
                height: 2,
                background: 'rgba(0,240,255,0.15)',
                borderRadius: 2,
                overflow: 'hidden',
                marginBottom: 16,
              }}
            >
              <motion.div
                style={{
                  height: '100%',
                  background: '#00f0ff',
                  boxShadow: '0 0 12px #00f0ff, 0 0 4px #00f0ff',
                  borderRadius: 2,
                  transformOrigin: 'left',
                  scaleX: loadingProgress / 100,
                }}
              />
            </div>

            {/* Loading text */}
            <AnimatePresence mode="wait">
              <motion.p
                key={textIndex}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.2 }}
                className="font-mono"
                style={{ color: '#64748b', fontSize: '0.75rem', letterSpacing: '0.15em' }}
              >
                {LOADER_TEXTS[textIndex]}
              </motion.p>
            </AnimatePresence>

            {/* Progress number */}
            <p
              className="font-mono neon-text"
              style={{ fontSize: '0.7rem', marginTop: 8, opacity: 0.7 }}
            >
              {Math.round(loadingProgress)}%
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
