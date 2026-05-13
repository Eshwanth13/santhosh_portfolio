'use client';

import { ReactNode } from 'react';

interface TerminalProps {
  children: ReactNode;
  title?: string;
  className?: string;
}

export default function Terminal({ children, title = 'secure_session.sh', className = '' }: TerminalProps) {
  return (
    <div className={`glass-card ${className}`} style={{ padding: '40px 48px' }}>
      {/* Terminal header bar */}
      <div
        style={{
          display: 'flex',
          gap: 8,
          marginBottom: 32,
          paddingBottom: 16,
          borderBottom: '1px solid rgba(0,240,255,0.1)',
        }}
      >
        <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ef4444' }} />
        <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#f59e0b' }} />
        <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#10b981' }} />
        <span className="font-mono" style={{ color: '#475569', fontSize: '0.75rem', marginLeft: 8 }}>
          {title}
        </span>
      </div>
      {children}
    </div>
  );
}
