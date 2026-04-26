import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { siteConfig } from '../../config/site.config';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

gsap.registerPlugin(ScrollTrigger);

export function ClosingLine() {
  const ref = useRef<HTMLParagraphElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (!ref.current) return;

    if (reducedMotion) {
      gsap.set(ref.current, { opacity: 1 });
      return;
    }

    gsap.set(ref.current, { opacity: 0 });
    const anim = gsap.to(ref.current, {
      opacity: 1,
      duration: 0.8,
      ease: 'power2.out',
      delay: 0.5,
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 90%',
        once: true,
      },
    });

    return () => { anim.kill(); };
  }, [reducedMotion]);

  return (
    <p
      ref={ref}
      style={{
        fontFamily: 'var(--font-serif)',
        fontStyle: 'italic',
        fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
        color: '#FFFFFF',
        textAlign: 'center',
        marginTop: '80px',
        lineHeight: 1.3,
      }}
    >
      {siteConfig.contact.closingLine}
    </p>
  );
}
