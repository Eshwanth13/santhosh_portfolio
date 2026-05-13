'use client';

import { Code2, Link2, Mail, AtSign, MessageCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { NAV_LINKS } from '@/utils/constants';

const socialLinks = [
  { icon: Code2, href: 'https://github.com', label: 'GitHub' },
  { icon: Link2, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: AtSign, href: 'https://twitter.com', label: 'Twitter/X' },
  { icon: MessageCircle, href: 'https://discord.com', label: 'Discord' },
  { icon: Mail, href: 'mailto:lks@lks.dev', label: 'Email' },
];

export default function Footer() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleNavClick = (href: string) => {
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        background: '#020617',
        borderTop: '1px solid rgba(0,240,255,0.1)',
        padding: '48px 0 32px',
        textAlign: 'center',
      }}
    >
      <div className="container-main">
        {/* Name */}
        <p className="font-orbitron" style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 4 }}>
          <span style={{ color: '#e2e8f0' }}>Lukka Koushik </span>
          <span style={{
            background: 'linear-gradient(135deg, #00f0ff 0%, #c026d3 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>Santhosh</span>
        </p>
        <p
          className="font-rajdhani"
          style={{ color: '#64748b', fontSize: '0.85rem', letterSpacing: '0.2em', marginBottom: 24 }}
        >
          AAA GAME DEVELOPER & TECHNICAL ARTIST
        </p>

        {/* Social Icons */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginBottom: 24 }}>
          {socialLinks.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 44,
                height: 44,
                borderRadius: 8,
                border: '1px solid rgba(0,240,255,0.15)',
                color: '#64748b',
                transition: 'all 0.2s',
                textDecoration: 'none',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.color = '#00f0ff';
                el.style.borderColor = 'rgba(0,240,255,0.4)';
                el.style.boxShadow = '0 0 12px rgba(0,240,255,0.2)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.color = '#64748b';
                el.style.borderColor = 'rgba(0,240,255,0.15)';
                el.style.boxShadow = 'none';
              }}
            >
              <Icon size={18} />
            </a>
          ))}
        </div>

        {/* Quick Nav */}
        <nav aria-label="Footer navigation">
          <ul
            style={{ display: 'flex', justifyContent: 'center', gap: 24, listStyle: 'none', marginBottom: 24, flexWrap: 'wrap' }}
          >
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                  className="font-rajdhani"
                  style={{
                    color: '#64748b',
                    textDecoration: 'none',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    letterSpacing: '0.1em',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = '#00f0ff')}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = '#64748b')}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Copyright */}
        <div style={{ borderTop: '1px solid rgba(0,240,255,0.08)', paddingTop: 24 }}>
          <p
            className="font-dm-sans"
            style={{ color: '#64748b', fontSize: '0.8rem', marginBottom: 4 }}
          >
            © {new Date().getFullYear()} Lukka Koushik Santhosh. All rights reserved.
          </p>
          <div
            className="font-mono"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: 'rgba(2,6,23,0.8)',
              border: '1px solid rgba(0,240,255,0.1)',
              borderRadius: 4,
              padding: '6px 12px',
              marginTop: 16,
              fontSize: '0.72rem',
              color: '#00f0ff',
            }}
          >
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981', boxShadow: '0 0 8px #10b981' }} />
            SYSTEM.STATUS: ✅ READY_FOR_HIRE // {mounted ? new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '--:--'}
          </div>
          <p
            className="font-dm-sans"
            style={{ color: '#475569', fontSize: '0.75rem', marginTop: 12 }}
          >
            Made with cosmic energy ✦
          </p>
        </div>
      </div>
    </footer>
  );
}
