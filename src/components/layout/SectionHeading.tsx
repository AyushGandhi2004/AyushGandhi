import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

gsap.registerPlugin(ScrollTrigger);

interface SectionHeadingProps {
  text: string;
  id?: string;
}

export function SectionHeading({ text, id }: SectionHeadingProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (!wrapperRef.current || !textRef.current) return;

    if (reducedMotion) {
      gsap.set(textRef.current, { opacity: 1, y: 0 });
      return;
    }

    gsap.set(textRef.current, { y: '100%', opacity: 0 });
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapperRef.current,
        start: 'top 85%',
        once: true,
      },
    });
    tl.to(textRef.current, {
      y: '0%',
      opacity: 1,
      duration: 0.9,
      ease: 'power2.out',
    });

    return () => { tl.kill(); };
  }, [reducedMotion]);

  return (
    <div ref={wrapperRef} style={{ overflow: 'hidden' }}>
      <h2
        ref={textRef}
        id={id}
        style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'clamp(2.5rem, 7vw, 5rem)',
          fontWeight: 700,
          color: '#FFFFFF',
          textAlign: 'center',
          lineHeight: 1.1,
        }}
      >
        {text}
      </h2>
    </div>
  );
}
