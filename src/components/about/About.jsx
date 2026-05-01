import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AboutContent } from './AboutContent';
import { TechStack } from './TechStack';
import { siteConfig } from '../../config/site.config';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

gsap.registerPlugin(ScrollTrigger);

export function About() {
  const headingRef = useRef(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (!headingRef.current) return;

    if (reducedMotion) {
      gsap.set(headingRef.current, { scale: 1, y: 0, opacity: 1 });
      return;
    }

    const anim = gsap.fromTo(
      headingRef.current,
      {
        scale: 5,
        y: 0,
        opacity: 1,
        transformOrigin: 'center center',
      },
      {
        scale: 1,
        y: 0,
        opacity: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top bottom',
          end: 'bottom center',
          scrub: true,
        },
      },
    );

    return () => { anim.kill(); };
  }, [reducedMotion]);

  return (
    <section
      id="about"
      aria-label="About"
      style={{
        backgroundColor: '#0A0A0A',
        padding: '120px 24px',
      }}
    >
      <div style={{ maxWidth: '760px', margin: '0 auto' }}>
        <div style={{ overflow: 'visible' }}>
          <h2
            ref={headingRef}
            style={{
              fontFamily: "'Mitr', var(--font-heading)",
              fontSize: 'clamp(2.5rem, 7vw, 5rem)',
              fontWeight: 700,
              color: '#FFFFFF',
              textAlign: 'center',
              lineHeight: 1.1,
            }}
          >
            {siteConfig.about.heading}
          </h2>
        </div>
        <div style={{ marginTop: '64px' }}>
          <AboutContent />
        </div>
        <div style={{ marginTop: '28px', display: 'flex', justifyContent: 'center' }}>
          <a
            href={siteConfig.about.resumeHref}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              padding: '12px 22px',
              borderRadius: '999px',
              border: '1px solid rgba(255,255,255,0.14)',
              backgroundColor: 'rgba(255,255,255,0.03)',
              color: '#FFFFFF',
              textDecoration: 'none',
              fontFamily: 'var(--font-body)',
              fontSize: '0.82rem',
              fontWeight: 400,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              transition: 'transform 0.25s ease, border-color 0.25s ease, background-color 0.25s ease, box-shadow 0.25s ease',
            }}
            onMouseEnter={(event) => {
              event.currentTarget.style.transform = 'translateY(-1px)';
              event.currentTarget.style.borderColor = 'rgba(255,255,255,0.28)';
              event.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.08)';
              event.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.28)';
            }}
            onMouseLeave={(event) => {
              event.currentTarget.style.transform = 'translateY(0)';
              event.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)';
              event.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.03)';
              event.currentTarget.style.boxShadow = 'none';
            }}
          >
            Resume ↗
          </a>
        </div>
        <TechStack />
      </div>
    </section>
  );
}
