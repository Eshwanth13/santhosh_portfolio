'use client';

import dynamic from 'next/dynamic';
import { Suspense, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useAppStore } from '@/store/appStore';

const HeroScene = dynamic(() => import('@/components/3d/HeroScene'), { ssr: false });

export default function Hero() {
  const { isLoaded } = useAppStore();
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollDown = () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: '#020617',
      }}
      aria-label="Hero section"
    >
      {/* 3D Background Scene */}
      <Suspense fallback={null}>
        <HeroScene isMobile={isMobile} />
      </Suspense>

      {/* Mobile static gradient background */}
      {isMobile && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse at center, rgba(0,240,255,0.1) 0%, rgba(192,38,211,0.05) 50%, transparent 100%)',
          }}
        />
      )}

      {/* Holographic scan overlay */}
      <div className="scan-overlay" aria-hidden="true" />

      {/* Grid pattern overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(0,240,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,240,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          pointerEvents: 'none',
        }}
        aria-hidden="true"
      />

      {/* Hero Content */}
      <AnimatePresence>
        {isLoaded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{
              position: 'relative',
              zIndex: 10,
              textAlign: 'center',
              padding: '0 24px',
              maxWidth: 900,
            }}
          >
            {/* Tag line above name */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="font-mono section-label"
              style={{ marginBottom: 16, color: '#c026d3' }}
            >
              // GAME DEVELOPER & TECHNICAL ARTIST
            </motion.p>

            {/* Main name */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="font-orbitron"
              style={{
                fontSize: 'clamp(2rem, 6vw, 5rem)',
                fontWeight: 900,
                lineHeight: 1.1,
                marginBottom: 16,
                letterSpacing: '-0.01em',
              }}
            >
              <span style={{ color: '#e2e8f0' }}>Lukka </span>
              <span style={{ color: '#e2e8f0' }}>Koushik </span>
              <span
                style={{
                  background: 'linear-gradient(135deg, #00f0ff 0%, #c026d3 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  filter: 'drop-shadow(0 0 20px rgba(0,240,255,0.4))',
                }}
              >
                Santhosh
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="font-rajdhani"
              style={{
                fontSize: 'clamp(1rem, 2.5vw, 1.5rem)',
                fontWeight: 600,
                color: '#67e8f9',
                letterSpacing: '0.15em',
                marginBottom: 12,
              }}
            >
              GAME DEVELOPER
            </motion.p>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85, duration: 0.6 }}
              className="font-dm-sans"
              style={{
                fontSize: '1rem',
                color: '#94a3b8',
                marginBottom: 48,
                maxWidth: 500,
                margin: '0 auto 48px',
              }}
            >
              Crafting worlds. Writing systems. Shipping games.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.6 }}
              style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}
            >
              <button
                className="btn-neon btn-neon-primary"
                onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
                aria-label="Enter Portfolio — scroll to About section"
              >
                ENTER PORTFOLIO
              </button>
              <button
                className="btn-neon btn-neon-ghost"
                onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
                aria-label="Explore Projects — scroll to Projects section"
              >
                EXPLORE PROJECTS
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll indicator */}
      <AnimatePresence>
        {isLoaded && !scrolled && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 1.5 }}
            className="pulse-opacity"
            onClick={handleScrollDown}
            aria-label="Scroll down"
            style={{
              position: 'absolute',
              bottom: 40,
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#00f0ff',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 4,
              zIndex: 10,
            }}
          >
            <span className="font-mono" style={{ fontSize: '0.65rem', letterSpacing: '0.2em', color: '#64748b' }}>
              SCROLL
            </span>
            <ChevronDown size={24} />
          </motion.button>
        )}
      </AnimatePresence>
    </section>
  );
}
