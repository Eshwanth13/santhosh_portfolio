'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Briefcase, Trophy, Gamepad2, Rocket, GraduationCap, ExternalLink, LucideIcon } from 'lucide-react';
import { experiences, Experience } from '@/data/experience';
import { fadeUpVariants, staggerContainerVariants, slideInLeftVariants, slideInRightVariants } from '@/utils/animations';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import NeonCard from '@/components/ui/NeonCard';

const typeIcons: Record<Experience['type'], LucideIcon> = {
  job: Briefcase,
  award: Trophy,
  gamejam: Gamepad2,
  release: Rocket,
  education: GraduationCap,
};

const typeColors: Record<Experience['type'], string> = {
  job: '#00f0ff',
  award: '#fbbf24',
  gamejam: '#c026d3',
  release: '#10b981',
  education: '#67e8f9',
};

function TimelineEntry({
  experience,
  index,
}: {
  experience: Experience;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const reducedMotion = useReducedMotion();
  const isLeft = index % 2 === 0;
  const Icon = typeIcons[experience.type];
  const color = typeColors[experience.type];

  const variants = isLeft ? slideInLeftVariants : slideInRightVariants;

  return (
    <div
      ref={ref}
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 60px 1fr',
        gap: 0,
        marginBottom: 32,
        position: 'relative',
      }}
      className="timeline-entry"
    >
      {/* Left content (even indices) */}
      <motion.div
        variants={reducedMotion ? {} : slideInLeftVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        style={{
          paddingRight: 32,
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          gridColumn: isLeft ? '1' : '3',
          gridRow: '1',
        }}
        className={isLeft ? '' : 'right-entry'}
      >
        {isLeft && (
          <NeonCard
            glowColor={`${color}44`}
            style={{
              padding: 24,
              maxWidth: 380,
              border: `1px solid ${color}22`,
            }}
          >
            <EntryContent experience={experience} color={color} />
          </NeonCard>
        )}
      </motion.div>

      {/* Center node */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: '50%',
            background: '#020617',
            border: `2px solid ${color}`,
            boxShadow: isInView ? `0 0 20px ${color}66` : 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'box-shadow 0.5s',
            zIndex: 2,
            flexShrink: 0,
          }}
        >
          <Icon size={18} color={color} />
        </div>
      </div>

      {/* Right content (odd indices) */}
      <motion.div
        variants={reducedMotion ? {} : slideInRightVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        style={{
          paddingLeft: 32,
          display: 'flex',
          alignItems: 'center',
          gridColumn: isLeft ? '3' : '1',
          gridRow: '1',
        }}
      >
        {!isLeft && (
          <NeonCard
            glowColor={`${color}44`}
            style={{
              padding: 24,
              maxWidth: 380,
              border: `1px solid ${color}22`,
            }}
          >
            <EntryContent experience={experience} color={color} />
          </NeonCard>
        )}
      </motion.div>
    </div>
  );
}

function EntryContent({ experience, color }: { experience: Experience; color: string }) {
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8, flexWrap: 'wrap', gap: 8 }}>
        <span
          className="font-rajdhani"
          style={{ color, fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em' }}
        >
          {experience.period}
        </span>
      </div>
      <h3
        className="font-orbitron"
        style={{ color: '#e2e8f0', fontSize: '0.9rem', fontWeight: 700, marginBottom: 4, lineHeight: 1.3 }}
      >
        {experience.title}
      </h3>
      <p
        className="font-rajdhani"
        style={{ color, fontSize: '0.85rem', fontWeight: 600, marginBottom: 10 }}
      >
        {experience.organization}
      </p>
      <p
        className="font-dm-sans"
        style={{ color: '#94a3b8', fontSize: '0.82rem', lineHeight: 1.65, marginBottom: experience.linkUrl ? 12 : 0 }}
      >
        {experience.description}
      </p>
      {experience.linkUrl && (
        <a
          href={experience.linkUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 4,
            color, fontSize: '0.75rem', textDecoration: 'none',
            fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, letterSpacing: '0.1em',
          }}
          aria-label={experience.linkLabel}
        >
          {experience.linkLabel} <ExternalLink size={12} />
        </a>
      )}
    </>
  );
}

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="section-padding"
      style={{ background: 'rgba(2,6,23,0.3)' }}
      aria-label="Experience section"
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
            // EXPERIENCE.LOG
          </motion.p>
          <motion.h2
            variants={fadeUpVariants}
            className="font-orbitron"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 700, color: '#e2e8f0' }}
          >
            Journey &amp; <span className="neon-text">Achievements</span>
          </motion.h2>
        </motion.div>

        {/* Timeline */}
        <div
          style={{
            maxWidth: 900,
            margin: '0 auto',
            position: 'relative',
          }}
        >
          {/* Vertical line */}
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: 0,
              bottom: 0,
              width: 2,
              background: 'rgba(0,240,255,0.1)',
              transform: 'translateX(-50%)',
            }}
            aria-hidden="true"
          />

          {experiences.map((exp, i) => (
            <TimelineEntry key={exp.id} experience={exp} index={i} />
          ))}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 767px) {
          .timeline-entry {
            grid-template-columns: 40px 1fr !important;
          }
          .right-entry {
            grid-column: 2 !important;
          }
        }
      `}</style>
    </section>
  );
}
