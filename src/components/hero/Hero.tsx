import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HeroTitle } from './HeroTitle';
import { TaglineLoop } from './TaglineLoop';
import { ScrollIndicator } from './ScrollIndicator';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (!sectionRef.current || !contentRef.current) return;

    const nameNode = sectionRef.current.querySelector('[data-hero-name]');
    const indicatorNode = sectionRef.current.querySelector('[data-scroll-indicator]');

    if (reducedMotion) {
      gsap.set(contentRef.current, { opacity: 1, y: 0 });
      if (nameNode) gsap.set(nameNode, { scale: 1 });
      if (indicatorNode) gsap.set(indicatorNode, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=160%',
          scrub: true,
          pin: true,
          anticipatePin: 1,
        },
      });

      tl.to(contentRef.current, {
        opacity: 0.22,
        y: -45,
        ease: 'none',
      }, 0);

      if (indicatorNode) {
        tl.to(indicatorNode, {
          opacity: 0,
          y: 16,
          ease: 'none',
        }, 0);
      }

      if (nameNode) {
        tl.to(nameNode, {
          scale: 15,
          transformOrigin: 'center center',
          ease: 'none',
        }, 0.08);
      }
    }, sectionRef);

    return () => { ctx.revert(); };
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      aria-label="Hero"
      style={{
        position: 'relative',
        height: '100vh',
        backgroundColor: '#000000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Radial light glow */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.03) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      {/* Radial light glow */}

      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          mixBlendMode: 'screen',
        }}
      >
        {/* Left and Right Corners */}
        {/* <div
          style={{
            position: 'absolute',
            top: '-8%',
            left: '-4%',
            width: '42vw',
            height: '42vw',
            background: 'radial-gradient(circle at top left, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.42) 18%, rgba(255,255,255,0.14) 32%, transparent 66%)',
            filter: 'blur(26px)',
            opacity: 0.95,
            transform: 'rotate(-18deg)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '-8%',
            right: '-4%',
            width: '42vw',
            height: '42vw',
            background: 'radial-gradient(circle at top right, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.42) 18%, rgba(255,255,255,0.14) 32%, transparent 66%)',
            filter: 'blur(26px)',
            opacity: 0.95,
            transform: 'rotate(18deg)',
          }}
        /> */}
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '56%',
            width: '100vw',
            height: '18vw',
            transform: 'translateX(-50%)',
            background: 'radial-gradient(ellipse at center, #ffffff69 0%, rgba(255,255,255,0.16) 28%, rgba(255,255,255,0.08) 48%, transparent 72%)',
            filter: 'blur(20px)',
            opacity: 0.7,
          }}
        />
      </div>
          {/* Radial light glow */}
      <div
        ref={contentRef}
        style={{
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <HeroTitle />
        <TaglineLoop />
      </div>

      <ScrollIndicator />
    </section>
  );
}
