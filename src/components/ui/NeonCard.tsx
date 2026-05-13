'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface NeonCardProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  glowColor?: string;
  delay?: number;
}

export default function NeonCard({
  children,
  className = '',
  style = {},
  glowColor = 'rgba(0, 240, 255, 0.4)',
  delay = 0,
}: NeonCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className={`glass-card ${className}`}
      style={{
        ...style,
        position: 'relative',
      }}
      whileHover={{
        y: -5,
        boxShadow: `0 0 30px ${glowColor}`,
        borderColor: glowColor,
      }}
    >
      {children}
    </motion.div>
  );
}
