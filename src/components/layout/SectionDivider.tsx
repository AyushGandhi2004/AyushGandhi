import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

gsap.registerPlugin(ScrollTrigger);

export function SectionDivider() {
  const lineRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (!lineRef.current) return;

    if (reducedMotion) {
      gsap.set(lineRef.current, { scaleX: 1, opacity: 0.2 });
      return;
    }

    gsap.set(lineRef.current, { scaleX: 0, opacity: 0.2 });
    const anim = gsap.to(lineRef.current, {
      scaleX: 1,
      duration: 0.8,
      ease: 'power2.out',
      transformOrigin: 'center',
      scrollTrigger: {
        trigger: lineRef.current,
        start: 'top 90%',
        once: true,
      },
    });

    return () => { anim.kill(); };
  }, [reducedMotion]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '60px 0' }}>
      <div
        ref={lineRef}
        style={{
          width: '120px',
          height: '1px',
          backgroundColor: '#E5E5E5',
          opacity: 0.2,
        }}
      />
    </div>
  );
}
