'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useAppStore } from '@/store/appStore';
import { NAV_LINKS } from '@/utils/constants';
import { staggerContainerVariants, fadeUpVariants } from '@/utils/animations';

export default function Navbar() {
  const { isMenuOpen, setIsMenuOpen, activeSection } = useAppStore();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
          background: scrolled ? 'rgba(10,10,10,0.7)' : 'transparent',
          borderBottom: scrolled ? '1px solid rgba(0,240,255,0.08)' : 'none',
          transition: 'background 0.3s, border 0.3s, backdrop-filter 0.3s',
        }}
      >
        <div
          className="container-main"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72 }}
        >
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => { e.preventDefault(); handleNavClick('#hero'); }}
            className="font-orbitron"
            style={{ fontWeight: 700, fontSize: '1.2rem', textDecoration: 'none', letterSpacing: '0.1em' }}
            aria-label="Lukka Koushik Santhosh — Home"
          >
            <span style={{ color: '#e2e8f0' }}>LK</span><span style={{
              background: 'linear-gradient(135deg, #00f0ff 0%, #c026d3 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>S</span>
          </a>

          {/* Desktop Nav */}
          <ul
            style={{ display: 'flex', gap: 32, listStyle: 'none' }}
            className="hidden-mobile"
          >
            {NAV_LINKS.map((link) => {
              const sectionId = link.href.replace('#', '');
              const isActive = activeSection === sectionId;
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                    className="font-rajdhani"
                    style={{
                      textDecoration: 'none',
                      fontSize: '0.95rem',
                      fontWeight: 600,
                      letterSpacing: '0.08em',
                      color: isActive ? '#00f0ff' : '#94a3b8',
                      transition: 'color 0.2s',
                      position: 'relative',
                      paddingBottom: 4,
                    }}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {link.label}
                    {isActive && (
                      <motion.div
                        layoutId="nav-underline"
                        style={{
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          right: 0,
                          height: 2,
                          background: '#00f0ff',
                          boxShadow: '0 0 8px #00f0ff',
                          borderRadius: 2,
                        }}
                      />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Hamburger */}
          <button
            className="show-mobile"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isMenuOpen}
            style={{
              background: 'none',
              border: '1px solid rgba(0,240,255,0.3)',
              color: '#00f0ff',
              width: 44,
              height: 44,
              borderRadius: 8,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              bottom: 0,
              width: '100%',
              maxWidth: 360,
              background: 'rgba(2,6,23,0.97)',
              backdropFilter: 'blur(20px)',
              zIndex: 999,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              padding: '60px 40px',
              borderLeft: '1px solid rgba(0,240,255,0.15)',
            }}
            role="dialog"
            aria-label="Navigation menu"
          >
            <button
              onClick={() => setIsMenuOpen(false)}
              aria-label="Close menu"
              style={{
                position: 'absolute',
                top: 24,
                right: 24,
                background: 'none',
                border: '1px solid rgba(0,240,255,0.3)',
                color: '#00f0ff',
                width: 44,
                height: 44,
                borderRadius: 8,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <X size={20} />
            </button>

            <motion.ul
              variants={staggerContainerVariants}
              initial="hidden"
              animate="visible"
              style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 24 }}
            >
              {NAV_LINKS.map((link) => (
                <motion.li key={link.href} variants={fadeUpVariants}>
                  <a
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                    className="font-orbitron"
                    style={{
                      textDecoration: 'none',
                      fontSize: '1.5rem',
                      fontWeight: 700,
                      color: '#e2e8f0',
                      transition: 'color 0.2s',
                      letterSpacing: '0.05em',
                    }}
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        @media (max-width: 767px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
        @media (min-width: 768px) {
          .show-mobile { display: none !important; }
          .hidden-mobile { display: flex !important; }
        }
      `}</style>
    </>
  );
}
