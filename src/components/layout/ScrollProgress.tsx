'use client';

import { useScrollProgress } from '@/hooks/useScrollProgress';

export default function ScrollProgress() {
  const progress = useScrollProgress();

  return (
    <div
      id="scroll-progress"
      style={{
        width: '100%',
        transform: `scaleX(${progress})`,
      }}
      aria-hidden="true"
    />
  );
}
