'use client';

import { useEffect } from 'react';
import { useAppStore } from '@/store/appStore';
import { SECTION_IDS } from '@/utils/constants';

export function useSectionObserver() {
  const setActiveSection = useAppStore((s) => s.setActiveSection);

  useEffect(() => {
    const sectionIds = Object.values(SECTION_IDS);

    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { threshold: 0.4 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [setActiveSection]);
}
