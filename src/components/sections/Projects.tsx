'use client';

import { useRef, useState } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Code2, ExternalLink, Play, X, ShoppingCart } from 'lucide-react';
import { projects, Project } from '@/data/projects';
import { fadeUpVariants, staggerContainerVariants, scaleInVariants } from '@/utils/animations';
import { useReducedMotion } from '@/hooks/useReducedMotion';

function ProjectCard({ project, onClick, index }: { project: Project; onClick: () => void; index: number }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const reducedMotion = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientY - rect.top) / rect.height - 0.5) * 10;
    const y = -((e.clientX - rect.left) / rect.width - 0.5) * 10;
    setTilt({ x, y });
  };

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  return (
    <motion.div
      variants={fadeUpVariants}
      ref={cardRef}
      className="glass-card"
      style={{
        cursor: 'pointer',
        transition: 'transform 0.2s, box-shadow 0.2s',
        transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        position: 'relative',
        overflow: 'hidden',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={(e) => { handleMouseLeave(); (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = '0 24px 60px rgba(0,240,255,0.25)';
      }}
      onClick={onClick}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${project.title}`}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
    >
      {/* Thumbnail */}
      <div
        style={{
          aspectRatio: '16/9',
          background: `linear-gradient(135deg, rgba(0,240,255,0.1) 0%, rgba(192,38,211,0.1) 100%)`,
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Placeholder gradient art */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: [
              'radial-gradient(circle at 30% 50%, rgba(0,240,255,0.2) 0%, transparent 60%), radial-gradient(circle at 70% 40%, rgba(192,38,211,0.2) 0%, transparent 60%)',
              'radial-gradient(circle at 60% 30%, rgba(0,240,255,0.25) 0%, transparent 50%), radial-gradient(circle at 20% 70%, rgba(192,38,211,0.15) 0%, transparent 50%)',
              'radial-gradient(circle at 50% 60%, rgba(192,38,211,0.2) 0%, transparent 60%), radial-gradient(circle at 80% 20%, rgba(0,240,255,0.2) 0%, transparent 50%)',
              'radial-gradient(circle at 40% 40%, rgba(0,240,255,0.15) 0%, transparent 70%), radial-gradient(circle at 70% 70%, rgba(192,38,211,0.2) 0%, transparent 50%)',
            ][index % 4],
          }}
        />
        <span
          className="font-orbitron"
          style={{ color: 'rgba(0,240,255,0.4)', fontSize: '0.75rem', letterSpacing: '0.2em', zIndex: 1 }}
        >
          {project.engine.toUpperCase()}
        </span>

        {/* Featured badge */}
        {project.featured && (
          <div
            style={{
              position: 'absolute',
              top: 12,
              right: 12,
              background: 'rgba(0,240,255,0.15)',
              border: '1px solid rgba(0,240,255,0.4)',
              borderRadius: 4,
              padding: '3px 10px',
            }}
          >
            <span className="font-mono" style={{ color: '#00f0ff', fontSize: '0.65rem', letterSpacing: '0.1em' }}>
              FEATURED
            </span>
          </div>
        )}
      </div>

      {/* Card content */}
      <div style={{ padding: '20px 24px' }}>
        {/* Engine + year */}
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 10 }}>
          <span className="font-mono" style={{ color: '#64748b', fontSize: '0.72rem' }}>{project.engine}</span>
          <span style={{ color: '#334155', fontSize: '0.65rem' }}>·</span>
          <span className="font-mono" style={{ color: '#64748b', fontSize: '0.72rem' }}>{project.year}</span>
        </div>

        {/* Title */}
        <h3
          className="font-orbitron neon-text"
          style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 10, letterSpacing: '0.03em' }}
        >
          {project.title}
        </h3>

        {/* Description */}
        <p
          className="font-dm-sans"
          style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: 16 }}
        >
          {project.description}
        </p>

        {/* Tech tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
          {project.techTags.map((tag) => (
            <span key={tag} className="neon-pill">{tag}</span>
          ))}
        </div>

        {/* Action buttons */}
        <div style={{ display: 'flex', gap: 8 }}>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Live demo for ${project.title}`}
              onClick={(e) => e.stopPropagation()}
              style={{
                display: 'flex', alignItems: 'center', gap: 4,
                color: '#67e8f9', textDecoration: 'none', fontSize: '0.75rem',
                padding: '4px 10px', borderRadius: 4,
                border: '1px solid rgba(103,232,249,0.2)',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = 'rgba(103,232,249,0.08)')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = 'transparent')}
            >
              <ExternalLink size={12} /> DEMO
            </a>
          )}
          {project.trailerUrl && (
            <a
              href={project.trailerUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Trailer for ${project.title}`}
              onClick={(e) => e.stopPropagation()}
              style={{
                display: 'flex', alignItems: 'center', gap: 4,
                color: '#c026d3', textDecoration: 'none', fontSize: '0.75rem',
                padding: '4px 10px', borderRadius: 4,
                border: '1px solid rgba(192,38,211,0.2)',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = 'rgba(192,38,211,0.08)')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = 'transparent')}
            >
              <Play size={12} /> TRAILER
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`GitHub for ${project.title}`}
              onClick={(e) => e.stopPropagation()}
              style={{
                display: 'flex', alignItems: 'center', gap: 4,
                color: '#64748b', textDecoration: 'none', fontSize: '0.75rem',
                padding: '4px 10px', borderRadius: 4,
                border: '1px solid rgba(100,116,139,0.2)',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = 'rgba(100,116,139,0.08)')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = 'transparent')}
            >
              <Code2 size={12} /> CODE
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <AnimatePresence>
      <motion.div
        className="modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label={`Details for ${project.title}`}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="glass-card hologram-border"
          style={{ maxWidth: 720, width: '90%', maxHeight: '85vh', overflow: 'auto', padding: 40 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close modal"
            style={{
              position: 'absolute', top: 16, right: 16, background: 'none',
              border: '1px solid rgba(0,240,255,0.3)', color: '#00f0ff',
              width: 40, height: 40, borderRadius: 8, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <X size={18} />
          </button>

          {/* Engine + year badge */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
            <span className="neon-pill">{project.engine}</span>
            <span className="neon-pill">{project.year}</span>
            {project.featured && <span className="neon-pill">FEATURED</span>}
          </div>

          {/* Title */}
          <h2
            className="font-orbitron neon-text"
            style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: 16 }}
          >
            {project.title}
          </h2>

          {/* Description */}
          <p
            className="font-dm-sans"
            style={{ color: '#94a3b8', lineHeight: 1.8, marginBottom: 24, fontSize: '0.95rem' }}
          >
            {project.description} This project demonstrates advanced systems architecture and
            real-time performance optimization techniques developed over multiple iterations.
          </p>

          {/* Tech stack */}
          <div style={{ marginBottom: 24 }}>
            <p className="font-rajdhani" style={{ color: '#64748b', fontSize: '0.8rem', letterSpacing: '0.15em', marginBottom: 12 }}>
              TECH STACK
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {project.techTags.map((tag) => (
                <span key={tag} className="neon-pill">{tag}</span>
              ))}
            </div>
          </div>

          {/* Links */}
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                className="btn-neon btn-neon-primary" style={{ textDecoration: 'none' }}>
                <ExternalLink size={14} /> Live Demo
              </a>
            )}
            {project.trailerUrl && (
              <a href={project.trailerUrl} target="_blank" rel="noopener noreferrer"
                className="btn-neon btn-neon-ghost" style={{ textDecoration: 'none' }}>
                <Play size={14} /> Trailer
              </a>
            )}
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                className="btn-neon btn-neon-ghost" style={{ textDecoration: 'none' }}>
                <Code2 size={14} /> Source Code
              </a>
            )}
            {project.storeUrl && (
              <a href={project.storeUrl} target="_blank" rel="noopener noreferrer"
                className="btn-neon btn-neon-ghost" style={{ textDecoration: 'none' }}>
                <ShoppingCart size={14} /> Store
              </a>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Close modal on Escape
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') setSelectedProject(null);
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="section-padding"
      aria-label="Projects section"
      onKeyDown={handleKeyDown}
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
            // PROJECTS.EXE
          </motion.p>
          <motion.h2
            variants={fadeUpVariants}
            className="font-orbitron"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 700, color: '#e2e8f0' }}
          >
            My <span className="neon-text">Games</span>
          </motion.h2>
          <motion.p
            variants={fadeUpVariants}
            className="font-dm-sans"
            style={{ color: '#64748b', marginTop: 12, fontSize: '0.9rem' }}
          >
            Click any project to view full details
          </motion.p>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="projects-grid"
        >
          {projects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </motion.div>
      </div>

      {/* Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}
