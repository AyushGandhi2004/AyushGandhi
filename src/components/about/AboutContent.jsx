import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { siteConfig } from '../../config/site.config';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

gsap.registerPlugin(ScrollTrigger);

function highlightKeywords(text, keywords) {
  if (keywords.length === 0) return text;

  const sortedKeywords = [...keywords].sort((a, b) => b.length - a.length);
  const pattern = sortedKeywords.map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
  const regex = new RegExp(`(${pattern})`, 'gi');
  const parts = text.split(regex);

  return parts.map((part, i) => {
    const isKeyword = sortedKeywords.some((k) => k.toLowerCase() === part.toLowerCase());
    return isKeyword ? (
      <span key={i} style={{ color: '#FFFFFF' }}>{part}</span>
    ) : (
      part
    );
  });
}

function ParagraphBlock({ text, keywords }) {
  const ref = useRef(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (!ref.current) return;

    if (reducedMotion) {
      gsap.set(ref.current, { opacity: 1, y: 0 });
      return;
    }

    gsap.set(ref.current, { opacity: 0, y: 40 });
    const anim = gsap.to(ref.current, {
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 85%',
        once: true,
      },
    });

    return () => { anim.kill(); };
  }, [reducedMotion]);

  return (
    <p
      ref={ref}
      style={{
        fontFamily: 'var(--font-body)',
        fontSize: '1.0625rem',
        color: '#A0A0A0',
        lineHeight: 1.7,
        textAlign: 'left',
      }}
    >
      {highlightKeywords(text, keywords)}
    </p>
  );
}

export function AboutContent() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {siteConfig.about.paragraphs.map((para, i) => (
        <ParagraphBlock key={i} text={para.text} keywords={para.keywords} />
      ))}
    </div>
  );
}
