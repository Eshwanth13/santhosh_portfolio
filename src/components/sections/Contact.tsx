'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, Phone, GitBranch, Link2, AtSign, MessageSquare, ArrowRight } from 'lucide-react';
import { fadeUpVariants, staggerContainerVariants } from '@/utils/animations';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import Terminal from '@/components/ui/Terminal';

const contactMethods = [
  { 
    icon: Mail, 
    value: 'lks@lks.dev', 
    label: 'Email', 
    href: 'mailto:lks@lks.dev',
    desc: 'Direct communication line'
  },
  { 
    icon: Phone, 
    value: '+1 (555) 000-0000', 
    label: 'Phone', 
    href: 'tel:+15550000000',
    desc: 'Voice & text protocols'
  },
  { 
    icon: GitBranch, 
    value: 'github.com/LKSanthosh', 
    label: 'GitHub', 
    href: 'https://github.com',
    desc: 'Repositories & contributions'
  },
  { 
    icon: Link2, 
    value: 'linkedin.com/in/LKSanthosh', 
    label: 'LinkedIn', 
    href: 'https://linkedin.com',
    desc: 'Professional connections'
  },
  { 
    icon: MessageSquare, 
    value: 'Discord Community', 
    label: 'Discord', 
    href: 'https://discord.com',
    desc: 'Real-time discussion'
  },
  { 
    icon: AtSign, 
    value: '@LKSanthosh', 
    label: 'Twitter/X', 
    href: 'https://twitter.com',
    desc: 'Status updates'
  },
];

const TYPING_TEXT = 'ESTABLISHING SECURE CONNECTION...';

function Typewriter({ text }: { text: string }) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) { setDisplayed(text); setDone(true); return; }
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i >= text.length) { setDone(true); clearInterval(interval); }
    }, 50);
    return () => clearInterval(interval);
  }, [text, reducedMotion]);

  return (
    <span className="font-mono" style={{ color: '#00f0ff', fontSize: '0.85rem', letterSpacing: '0.1em' }}>
      {displayed}
      {!done && <span className="blink">|</span>}
    </span>
  );
}

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="section-padding"
      aria-label="Contact section"
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
            // CONTACT.INIT
          </motion.p>
          <motion.h2
            variants={fadeUpVariants}
            className="font-orbitron"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 700, color: '#e2e8f0' }}
          >
            Get In <span className="neon-text">Touch</span>
          </motion.h2>
          <motion.div variants={fadeUpVariants} style={{ marginTop: 16 }}>
            {isInView && <Typewriter text={TYPING_TEXT} />}
          </motion.div>
        </motion.div>

        {/* Contact links container */}
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <Terminal title="contact_info.json">
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20, padding: '10px 0' }}>
                {contactMethods.map((method, index) => (
                  <motion.a
                    key={method.label}
                    href={method.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="contact-card"
                  >
                    <div className="contact-icon-wrapper">
                      <method.icon size={22} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <h3 className="contact-label">{method.label}</h3>
                      <p className="contact-value">{method.value}</p>
                      <p className="contact-desc">{method.desc}</p>
                    </div>
                    <ArrowRight size={16} className="contact-arrow" />
                  </motion.a>
                ))}
              </div>
            </Terminal>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        .contact-card {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px;
          border-radius: 12px;
          background: rgba(15, 23, 42, 0.3);
          border: 1px solid rgba(0, 240, 255, 0.05);
          text-decoration: none;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }
        .contact-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(45deg, transparent, rgba(0, 240, 255, 0.03), transparent);
          transform: translateX(-100%);
          transition: transform 0.6s;
        }
        .contact-card:hover {
          background: rgba(15, 23, 42, 0.5);
          border-color: rgba(0, 240, 255, 0.2);
          transform: translateY(-2px);
          box-shadow: 0 10px 20px -10px rgba(0, 0, 0, 0.5);
        }
        .contact-card:hover::before {
          transform: translateX(100%);
        }
        .contact-icon-wrapper {
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0, 240, 255, 0.05);
          border: 1px solid rgba(0, 240, 255, 0.1);
          border-radius: 10px;
          color: #00f0ff;
          transition: all 0.3s;
        }
        .contact-card:hover .contact-icon-wrapper {
          background: rgba(0, 240, 255, 0.1);
          transform: scale(1.05);
        }
        .contact-label {
          font-family: var(--font-orbitron);
          font-size: 0.75rem;
          letter-spacing: 0.1em;
          color: #64748b;
          margin-bottom: 4px;
          text-transform: uppercase;
        }
        .contact-value {
          font-family: var(--font-mono);
          font-size: 0.9rem;
          color: #e2e8f0;
          margin-bottom: 2px;
        }
        .contact-desc {
          font-size: 0.75rem;
          color: #475569;
        }
        .contact-arrow {
          color: #475569;
          opacity: 0;
          transform: translateX(-10px);
          transition: all 0.3s;
        }
        .contact-card:hover .contact-arrow {
          opacity: 1;
          transform: translateX(0);
          color: #00f0ff;
        }
        @media (max-width: 640px) {
          .contact-card {
            padding: 12px;
          }
          .contact-icon-wrapper {
            width: 40px;
            height: 40px;
          }
          .contact-value {
            font-size: 0.8rem;
          }
        }
      `}</style>
    </section>
  );
}
