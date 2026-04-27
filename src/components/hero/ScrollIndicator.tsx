import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { siteConfig } from '../../config/site.config';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

export function ScrollIndicator() {
  const ref = useRef<HTMLDivElement>(null);
  const [opacity, setOpacity] = useState(0);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const timer = setTimeout(() => setOpacity(1), 2500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const scrolled = Math.min(window.scrollY / 100, 1);
      setOpacity(Math.max(0, 1 - scrolled));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!ref.current || reducedMotion) return;

    const anim = gsap.to(ref.current, {
      y: 5,
      duration: 2,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    });

    return () => { anim.kill(); };
  }, [reducedMotion]);

  return (
    <div
      ref={ref}
      data-scroll-indicator
      style={{
        position: 'absolute',
        bottom: '40px',
        left: '50%',
        transform: 'translateX(-50%)',
        opacity,
        transition: 'opacity 0.6s ease',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
        pointerEvents: 'none',
      }}
      aria-hidden="true"
    >
      <span
        style={{
          color: '#A0A0A0',
          fontSize: '0.75rem',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          fontFamily: 'var(--font-mono)',
        }}
      >
        ↓ {siteConfig.hero.scrollIndicatorText}
      </span>
    </div>
  );
}
