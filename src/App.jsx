import { createContext, useEffect, useState, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { Navigation } from './components/layout/Navigation';
import { GrainOverlay } from './components/layout/GrainOverlay';
import { Home } from './pages/Home';
import { usePrefersReducedMotion } from './hooks/usePrefersReducedMotion';
import { activeFontPairing, fontPairings } from './config/fonts.config';

gsap.registerPlugin(ScrollTrigger);

const Photography = lazy(() => import('./pages/Photography').then((m) => ({ default: m.Photography })));

export const LenisContext = createContext(null);

function AppShell() {
  const [lenis, setLenis] = useState(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const pairing = fontPairings[activeFontPairing];
    const root = document.documentElement;
    root.style.setProperty('--font-heading', pairing.heading);
    root.style.setProperty('--font-body', pairing.body);
    root.style.setProperty('--font-serif', pairing.serif);
    root.style.setProperty('--font-mono', pairing.mono);
  }, []);

  useEffect(() => {
    document.body.style.opacity = '0';
    gsap.to(document.body, {
      opacity: 1,
      duration: 0.8,
      ease: 'power2.out',
      onComplete: () => { document.body.style.opacity = ''; },
    });
  }, []);

  useEffect(() => {
    if (reducedMotion) return;

    const lenisInstance = new Lenis({
      lerp: window.innerWidth < 768 ? 0.15 : 0.1,
      smoothWheel: true,
    });

    lenisInstance.on('scroll', ScrollTrigger.update);

    const tickerFn = (time) => lenisInstance.raf(time * 1000);
    gsap.ticker.add(tickerFn);
    gsap.ticker.lagSmoothing(0);

    setLenis(lenisInstance);

    document.fonts.ready.then(() => {
      ScrollTrigger.refresh();
    });

    return () => {
      lenisInstance.destroy();
      gsap.ticker.remove(tickerFn);
    };
  }, [reducedMotion]);

  return (
    <LenisContext.Provider value={lenis}>
      <GrainOverlay />
      <Navigation />
      <Suspense fallback={<div style={{ minHeight: '100vh', backgroundColor: '#000000' }} />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/photography" element={<Photography />} />
        </Routes>
      </Suspense>
    </LenisContext.Provider>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}
