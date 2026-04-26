import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { siteConfig } from '../../config/site.config';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

gsap.registerPlugin(ScrollTrigger);

export function ClosingLine() {
  const ref = useRef<HTMLParagraphElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const fullText = siteConfig.contact.closingLine;
  const [displayedText, setDisplayedText] = useState(reducedMotion ? fullText : '');
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    if (reducedMotion) {
      gsap.set(ref.current, { opacity: 1 });
      setIsReady(true);
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
        onEnter: () => setIsReady(true),
      },
    });

    return () => { anim.kill(); };
  }, [reducedMotion]);

  useEffect(() => {
    if (!isReady || reducedMotion) {
      if (reducedMotion) setDisplayedText(fullText);
      return;
    }

    let charIndex = 0;
    let typingInterval: number | undefined;
    let holdTimer: number | undefined;
    let restartTimer: number | undefined;

    const typeAndLoop = () => {
      charIndex = 0;
      setDisplayedText('');

      typingInterval = window.setInterval(() => {
        charIndex += 1;
        setDisplayedText(fullText.slice(0, charIndex));

        if (charIndex >= fullText.length) {
          if (typingInterval) window.clearInterval(typingInterval);
          holdTimer = window.setTimeout(() => {
            restartTimer = window.setTimeout(typeAndLoop, 420);
          }, 1200);
        }
      }, 42);
    };

    typeAndLoop();

    return () => {
      if (typingInterval) window.clearInterval(typingInterval);
      if (holdTimer) window.clearTimeout(holdTimer);
      if (restartTimer) window.clearTimeout(restartTimer);
    };
  }, [fullText, isReady, reducedMotion]);

  return (
    <p
      ref={ref}
      className="contact-closing-line"
      style={{
        fontFamily: 'var(--font-heading)',
        fontWeight: 600,
        fontSize: 'clamp(1rem, 2.9vw, 1.35rem)',
        textAlign: 'center',
        marginTop: '26px',
        lineHeight: 1.3,
        minHeight: '1.4em',
        letterSpacing: '0.01em',
      }}
    >
      <span className="contact-closing-line-text">{displayedText}</span>
      <span
        aria-hidden="true"
        style={{
          opacity: reducedMotion ? 0 : 0.6,
          marginLeft: '2px',
          color: '#E5E5E5',
          animation: reducedMotion ? 'none' : 'contact-caret-blink 0.95s steps(1, end) infinite',
        }}
      >
        |
      </span>
    </p>
  );
}
