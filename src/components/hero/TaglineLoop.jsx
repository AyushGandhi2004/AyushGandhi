import { useState, useEffect } from 'react';
import { siteConfig } from '../../config/site.config';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

export function TaglineLoop() {
  const taglines = siteConfig.hero.taglines;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);
  const [phase, setPhase] = useState('waiting');
  const [opacity, setOpacity] = useState(0);
  const reducedMotion = usePrefersReducedMotion();

  const charSpeedMs = reducedMotion ? 0 : (window.innerWidth < 768 ? 30 : 40);

  useEffect(() => {
    if (reducedMotion) {
      setDisplayedText(taglines[0]);
      setOpacity(1);
      setPhase('holding');
      return;
    }

    const startDelay = setTimeout(() => {
      setPhase('typing');
      setIsTyping(true);
    }, 2200);

    return () => clearTimeout(startDelay);
  }, [reducedMotion, taglines]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible((v) => !v);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (phase !== 'typing') return;

    const target = taglines[currentIndex];
    let charIndex = 0;
    setDisplayedText('');
    setOpacity(1);
    setCursorVisible(true);

    const typeInterval = setInterval(() => {
      charIndex++;
      setDisplayedText(target.slice(0, charIndex));
      if (charIndex >= target.length) {
        clearInterval(typeInterval);
        setIsTyping(false);
        setPhase('holding');
      }
    }, charSpeedMs);

    return () => clearInterval(typeInterval);
  }, [phase, currentIndex, taglines, charSpeedMs]);

  useEffect(() => {
    if (phase !== 'holding') return;

    const holdTimer = setTimeout(() => {
      setPhase('fading');
    }, 2000);

    return () => clearTimeout(holdTimer);
  }, [phase]);

  useEffect(() => {
    if (phase !== 'fading') return;

    setOpacity(0);
    const nextTimer = setTimeout(() => {
      setCurrentIndex((i) => (i + 1) % taglines.length);
      setDisplayedText('');
      setPhase('typing');
      setIsTyping(true);
    }, 400);

    return () => clearTimeout(nextTimer);
  }, [phase, taglines.length]);

  return (
    <div
      style={{
        height: '2em',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '24px',
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.875rem',
          color: '#A0A0A0',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          opacity,
          transition: phase === 'fading' ? 'opacity 0.4s ease' : 'none',
        }}
      >
        {displayedText}
        <span
          style={{
            opacity: (isTyping || phase === 'holding') ? (cursorVisible ? 1 : 0) : 0,
            transition: 'opacity 0.1s',
          }}
        >
          |
        </span>
      </span>
    </div>
  );
}
