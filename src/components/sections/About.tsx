'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Code2, Layers, Cpu, Globe } from 'lucide-react';
import { fadeUpVariants, staggerContainerVariants, slideInLeftVariants, slideInRightVariants } from '@/utils/animations';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const specialties = [
  'Unreal Engine 5', 'Unity', 'C++', 'C#', 'HLSL/GLSL',
  'Level Design', 'Game AI', 'Multiplayer', 'Optimization', 'Procedural Gen',
];

const tools = [
  { icon: Layers, label: 'Blender' },
  { icon: Cpu, label: 'Houdini' },
  { icon: Code2, label: 'Substance Painter' },
  { icon: Globe, label: 'RenderDoc' },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const reducedMotion = useReducedMotion();

  const animProps = reducedMotion
    ? {}
    : { initial: 'hidden', animate: isInView ? 'visible' : 'hidden' };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section-padding"
      aria-label="About section"
    >
      <div className="container-main">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 60,
            alignItems: 'center',
          }}
        >
          {/* Left: Avatar */}
          <motion.div
            variants={slideInLeftVariants}
            {...(reducedMotion ? {} : { initial: 'hidden', animate: isInView ? 'visible' : 'hidden' })}
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <div
              className={reducedMotion ? '' : 'float-anim'}
              style={{ position: 'relative' }}
            >
              {/* Avatar placeholder with neon glow */}
              <div
                style={{
                  width: 280,
                  height: 280,
                  borderRadius: '50%',
                  background: 'radial-gradient(ellipse at center, rgba(0,240,255,0.15) 0%, rgba(192,38,211,0.1) 50%, rgba(2,6,23,0.8) 100%)',
                  border: '2px solid rgba(0,240,255,0.4)',
                  boxShadow: '0 0 40px rgba(0,240,255,0.4), 0 0 80px rgba(0,240,255,0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                  position: 'relative',
                }}
              >
                <span className="font-orbitron" style={{ fontSize: '3rem', fontWeight: 900 }}>
                  <span style={{ color: '#e2e8f0' }}>LK</span><span style={{
                    background: 'linear-gradient(135deg, #00f0ff 0%, #c026d3 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}>S</span>
                </span>
                {/* Decorative ring */}
                <div
                  style={{
                    position: 'absolute',
                    inset: -12,
                    border: '1px solid rgba(192,38,211,0.3)',
                    borderRadius: '50%',
                    animation: 'spin 20s linear infinite',
                  }}
                />
              </div>

              {/* Stats badge */}
              <div
                className="glass-card"
                style={{
                  position: 'absolute',
                  bottom: -16,
                  right: -16,
                  padding: '12px 20px',
                  textAlign: 'center',
                }}
              >
                <p className="font-orbitron neon-text" style={{ fontSize: '1.5rem', fontWeight: 700 }}>5+</p>
                <p className="font-rajdhani" style={{ color: '#64748b', fontSize: '0.75rem', letterSpacing: '0.1em' }}>YEARS XP</p>
              </div>

              <div
                className="glass-card"
                style={{
                  position: 'absolute',
                  top: -16,
                  left: -16,
                  padding: '12px 20px',
                  textAlign: 'center',
                }}
              >
                <p className="font-orbitron" style={{ fontSize: '1.5rem', fontWeight: 700, color: '#c026d3' }}>12+</p>
                <p className="font-rajdhani" style={{ color: '#64748b', fontSize: '0.75rem', letterSpacing: '0.1em' }}>GAMES</p>
              </div>
            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            variants={staggerContainerVariants}
            {...(reducedMotion ? {} : { initial: 'hidden', animate: isInView ? 'visible' : 'hidden' })}
          >
            {/* Section label */}
            <motion.p variants={fadeUpVariants} className="section-label" style={{ marginBottom: 12 }}>
              // ABOUT.EXE
            </motion.p>

            {/* Heading */}
            <motion.h2
              variants={fadeUpVariants}
              className="font-orbitron"
              style={{
                fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
                fontWeight: 700,
                color: '#e2e8f0',
                marginBottom: 24,
              }}
            >
              About <span className="neon-text">Me</span>
            </motion.h2>

            {/* Bio */}
            <motion.p
              variants={fadeUpVariants}
              className="font-dm-sans"
              style={{ color: '#94a3b8', lineHeight: 1.8, marginBottom: 24, fontSize: '0.95rem' }}
            >
              I&apos;m a game developer and technical artist with 5+ years of experience crafting
              immersive worlds and pushing the boundaries of real-time rendering. I specialize in
              Unreal Engine 5 and Unity, with a deep passion for game physics, AI systems, and
              shader programming. My work spans from solo indie releases to AAA contract positions.
            </motion.p>

            {/* Philosophy quote */}
            <motion.blockquote
              variants={fadeUpVariants}
              style={{
                borderLeft: '2px solid #00f0ff',
                paddingLeft: 20,
                marginBottom: 32,
              }}
            >
              <p
                className="font-dm-sans"
                style={{ color: '#67e8f9', lineHeight: 1.8, fontStyle: 'italic', fontSize: '0.9rem' }}
              >
                &ldquo;Every polygon is a decision. Every shader is a poem. The best games don&apos;t just 
                run on machines — they run on imagination. I build the bridge between the two.&rdquo;
              </p>
            </motion.blockquote>

            {/* Specialties */}
            <motion.div variants={fadeUpVariants} style={{ marginBottom: 24 }}>
              <p className="font-rajdhani" style={{ color: '#64748b', fontSize: '0.8rem', letterSpacing: '0.15em', marginBottom: 12 }}>
                CORE SPECIALTIES
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {specialties.map((s) => (
                  <span key={s} className="neon-pill">{s}</span>
                ))}
              </div>
            </motion.div>

            {/* Tools */}
            <motion.div variants={fadeUpVariants}>
              <p className="font-rajdhani" style={{ color: '#64748b', fontSize: '0.8rem', letterSpacing: '0.15em', marginBottom: 12 }}>
                DCC TOOLS
              </p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                {tools.map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="glass-card"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      padding: '8px 16px',
                      transition: 'all 0.2s',
                      cursor: 'default',
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,240,255,0.4)';
                      (e.currentTarget as HTMLElement).style.boxShadow = '0 0 16px rgba(0,240,255,0.1)';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,240,255,0.15)';
                      (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                    }}
                  >
                    <Icon size={16} color="#00f0ff" />
                    <span className="font-rajdhani" style={{ color: '#94a3b8', fontSize: '0.85rem', fontWeight: 600 }}>
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}
