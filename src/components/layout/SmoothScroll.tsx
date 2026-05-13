'use client';

import { ReactNode } from 'react';

// Disabling Lenis temporarily to isolate the 3-second lag issue
export default function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <div className="native-scroll-wrapper">
      {children}
    </div>
  );
}
