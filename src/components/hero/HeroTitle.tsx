import { useRef, useEffect } from 'react';
import { useMotionValue, useTransform, motion } from 'motion/react';
import gsap from 'gsap';
import { siteConfig } from '../../config/site.config';
import { theme } from '../../config/theme.config';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

export function HeroTitle() {
  const containerRef = useRef<HTMLDivElement>(null);
  const greetingRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-300, 300], [3, -3]);
  const rotateY = useTransform(mouseX, [-600, 600], [-3, 3]);
  const translateX = useTransform(mouseX, [-600, 600], [-10, 10]);
  const translateY = useTransform(mouseY, [-300, 300], [-6, 6]);

  useEffect(() => {
    if (!greetingRef.current || !nameRef.current) return;

    const greetingWords = greetingRef.current.querySelectorAll('.word');
    const nameWords = nameRef.current.querySelectorAll('.word');
    const allWords = [...greetingWords, ...nameWords];

    if (reducedMotion) {
      gsap.set(allWords, { opacity: 1, y: 0 });
      return;
    }

    gsap.set(allWords, { opacity: 0, y: 20 });

    const tl = gsap.timeline({ delay: 1 });
    tl.to(allWords, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: theme.motion.stagger,
      ease: theme.motion.easeOut,
    });

    tl.to(nameRef.current, {
      letterSpacing: '0.03em',
      duration: 1.2,
      ease: 'power2.out',
    }, '+=0.1');

    return () => { tl.kill(); };
  }, [reducedMotion]);

  useEffect(() => {
    if (reducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      mouseX.set(e.clientX - cx);
      mouseY.set(e.clientY - cy);
    };

    if (window.innerWidth >= 768) {
      window.addEventListener('mousemove', handleMouseMove);
    }
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY, reducedMotion]);

  const renderWords = (text: string) =>
    text.split(' ').map((word, i) => (
      <span key={i} className="word" style={{ display: 'inline-block', marginRight: '0.25em' }}>
        {word}
      </span>
    ));

  const renderNameLines = (text: string) =>
    text.split(' ').map((word, i) => (
      <div key={i} style={{ display: 'block' }}>
        <span className="word" style={{ display: 'inline-block' }}>
          {word}
        </span>
      </div>
    ));

  return (
    <motion.div
      ref={containerRef}
      style={reducedMotion ? {} : { x: translateX, y: translateY, rotateX, rotateY }}
      className="hero-text-container"
    >
      <div
        ref={greetingRef}
        style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'clamp(1rem, 3vw, 2rem)',
          fontWeight: 300,
          color: '#FFFFFF',
          marginBottom: '8px',
          letterSpacing: '0.05em',
        }}
      >
        {renderWords(siteConfig.hero.greeting)}
      </div>

      <div
        ref={nameRef}
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(3rem, 8vw, 7rem)',
          // fontStyle: 'italic',
          fontWeight: 550,
          color: '#FFFFFF',
          lineHeight: 1.05,
          letterSpacing: '0.1em',
        }}
      >
        {renderNameLines(siteConfig.hero.name)}
      </div>
    </motion.div>
  );
}
