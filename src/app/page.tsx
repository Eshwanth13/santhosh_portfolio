'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Loader from '@/components/layout/Loader';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollProgress from '@/components/layout/ScrollProgress';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Skills from '@/components/sections/Skills';
import Projects from '@/components/sections/Projects';
import Experience from '@/components/sections/Experience';
import Contact from '@/components/sections/Contact';
import BackToTop from '@/components/ui/BackToTop';
import SmoothScroll from '@/components/layout/SmoothScroll';
import { useAppStore } from '@/store/appStore';
import { useSectionObserver } from '@/hooks/useSectionObserver';

// Custom cursor — desktop only, no SSR
const CustomCursor = dynamic(() => import('@/components/ui/CustomCursor'), {
  ssr: false,
});

function PortfolioApp() {
  const isLoaded = useAppStore((s) => s.isLoaded);
  const [isMobile, setIsMobile] = useState(false);

  useSectionObserver();

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <div style={{ position: 'relative', overflowX: 'hidden' }}>
      {/* Loading screen */}
      <Loader />

      {/* Persistent elements */}
      <ScrollProgress />
      {!isMobile && <CustomCursor />}

      {/* Main site - mount only after loading to save resources */}
      {isLoaded && (
        <div
          style={{
            opacity: 1,
            transition: 'opacity 0.8s ease',
          }}
        >
          <SmoothScroll>
            <Navbar />

            <main id="main-content">
              <Hero />
              <About />
              <Skills />
              <Projects />
              <Experience />
              <Contact />
            </main>

            <Footer />
            <BackToTop />
          </SmoothScroll>
        </div>
      )}
    </div>
  );
}

export default function Page() {
  return <PortfolioApp />;
}
