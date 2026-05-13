'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { skillCategories, orbSkills } from '@/data/skills';
import { fadeUpVariants, staggerContainerVariants } from '@/utils/animations';
import { useReducedMotion } from '@/hooks/useReducedMotion';



function SkillBar({ name, level, color, delay = 0 }: { name: string; level: number; color?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const reducedMotion = useReducedMotion();

  return (
    <div
      ref={ref}
      style={{ marginBottom: 14 }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = 'translateX(4px)'; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = 'translateX(0)'; }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
        <span className="font-dm-sans" style={{ color: '#e2e8f0', fontSize: '0.85rem' }}>{name}</span>
      </div>
      <div
        style={{
          height: 4,
          background: 'rgba(0,240,255,0.1)',
          borderRadius: 2,
          overflow: 'hidden',
        }}
      >
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.8, delay: reducedMotion ? 0 : delay, ease: [0.16, 1, 0.3, 1] }}
          style={{
            height: '100%',
            width: `${level}%`,
            background: color ?? '#00f0ff',
            boxShadow: `0 0 8px ${color ?? '#00f0ff'}`,
            borderRadius: 2,
            transformOrigin: 'left',
          }}
        />
      </div>
    </div>
  );
}

function SkillTagsCloud() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center', padding: '32px 24px' }}>
      {orbSkills.map((skill, i) => (
        <motion.div
          key={skill}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.06 }}
          whileHover={{ scale: 1.08, y: -3 }}
          style={{
            padding: '10px 22px',
            borderRadius: 8,
            background: i % 2 === 0 ? 'rgba(0,240,255,0.05)' : 'rgba(192,38,211,0.05)',
            border: `1px solid ${i % 2 === 0 ? 'rgba(0,240,255,0.25)' : 'rgba(192,38,211,0.25)'}`,
            color: i % 2 === 0 ? '#00f0ff' : '#c026d3',
            fontSize: '0.88rem',
            fontFamily: 'Rajdhani, sans-serif',
            fontWeight: 700,
            letterSpacing: '0.1em',
            cursor: 'default',
            boxShadow: i % 2 === 0
              ? '0 0 12px rgba(0,240,255,0.06)'
              : '0 0 12px rgba(192,38,211,0.06)',
            transition: 'all 0.2s',
          }}
        >
          {skill}
        </motion.div>
      ))}
    </div>
  );
}

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const reducedMotion = useReducedMotion();

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="section-padding"
      style={{ background: 'rgba(2,6,23,0.5)' }}
      aria-label="Skills section"
    >
      <div className="container-main">
        {/* Header */}
        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          style={{ textAlign: 'center', marginBottom: 60 }}
        >
          <motion.p variants={fadeUpVariants} className="section-label" style={{ marginBottom: 12 }}>
            // SKILLS.DB
          </motion.p>
          <motion.h2
            variants={fadeUpVariants}
            className="font-orbitron"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 700, color: '#e2e8f0' }}
          >
            Tech <span className="neon-text">Arsenal</span>
          </motion.h2>
        </motion.div>

        {/* Skill Tags Cloud — replaces empty 3D orbs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            marginBottom: 60,
            borderRadius: 12,
            border: '1px solid rgba(0,240,255,0.1)',
            background: 'rgba(2,6,23,0.6)',
          }}
        >
          <SkillTagsCloud />
        </motion.div>

        {/* Skill bars grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 40,
          }}
        >
          {skillCategories.map((cat) => (
            <div key={cat.category} className="glass-card" style={{ padding: 28 }}>
              <h3
                className="font-rajdhani"
                style={{
                  color: '#00f0ff',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  letterSpacing: '0.2em',
                  marginBottom: 20,
                  paddingBottom: 12,
                  borderBottom: '1px solid rgba(0,240,255,0.1)',
                }}
              >
                {cat.category.toUpperCase()}
              </h3>
              {cat.skills.map((skill, i) => (
                <SkillBar
                  key={skill.name}
                  name={skill.name}
                  level={skill.level}
                  color={skill.color}
                  delay={i * 0.1}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
