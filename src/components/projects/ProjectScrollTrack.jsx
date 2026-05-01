import { useRef, useEffect, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '../../config/projects.config';
import { ProjectCard } from './ProjectCard';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

gsap.registerPlugin(ScrollTrigger);

const CARD_GAP_DESKTOP = 44;
const CARD_GAP_MOBILE = 22;

const createBaseState = () => ({
  scale: 0.92,
  y: 18,
  blur: 2.25,
  opacity: 0.42,
  zIndex: 0,
  focus: 0,
  glow: 0,
});

export function ProjectScrollTrack() {
  const sectionRef = useRef(null);
  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const cardRefs = useRef([]);
  const measurementFrameRef = useRef(null);
  const reducedMotion = usePrefersReducedMotion();
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth < 768;
  });
  const [cardStates, setCardStates] = useState(() => projects.map(() => createBaseState()));

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767px)');
    const handleChange = (event) => setIsMobile(event.matches);

    setIsMobile(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const measureCardStates = useCallback(() => {
    const viewport = isMobile ? viewportRef.current : sectionRef.current;
    if (!viewport) return;

    const viewportRect = viewport.getBoundingClientRect();
    const viewportCenter = viewportRect.left + viewportRect.width / 2;
    const falloff = isMobile ? Math.max(240, viewportRect.width * 0.34) : Math.max(300, viewportRect.width * 0.42);

    setCardStates(projects.map((_, index) => {
      const card = cardRefs.current[index];

      if (!card) return createBaseState();

      const cardRect = card.getBoundingClientRect();
      const cardCenter = cardRect.left + cardRect.width / 2;
      const distance = Math.abs(cardCenter - viewportCenter);
      const focus = Math.max(0, 1 - distance / falloff);
      const lift = 18 - focus * 28;
      const blur = (1 - focus) * 2.2;
      const scale = 0.91 + focus * 0.14;
      const opacity = 0.38 + focus * 0.62;

      return {
        scale,
        y: lift,
        blur,
        opacity,
        zIndex: Math.round(focus * 20),
        focus,
        glow: focus,
      };
    }));
  }, [isMobile]);

  const scheduleMeasure = useCallback(() => {
    if (typeof window === 'undefined') return;
    if (measurementFrameRef.current !== null) return;

    measurementFrameRef.current = window.requestAnimationFrame(() => {
      measurementFrameRef.current = null;
      measureCardStates();
    });
  }, [measureCardStates]);

  useEffect(() => {
    if (!sectionRef.current || !trackRef.current || isMobile || reducedMotion) return;

    const viewportWidth = sectionRef.current.clientWidth;
    const totalScrollWidth = Math.max(trackRef.current.scrollWidth - viewportWidth, 0);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        pin: true,
        scrub: 1,
        start: 'top top',
        end: `+=${totalScrollWidth}`,
        onUpdate: () => {
          scheduleMeasure();
        },
      },
    });

    tl.to(trackRef.current, {
      x: -totalScrollWidth,
      ease: 'none',
    });

    scheduleMeasure();

    return () => { tl.kill(); };
  }, [isMobile, reducedMotion, scheduleMeasure]);

  useEffect(() => () => {
    if (measurementFrameRef.current !== null) {
      window.cancelAnimationFrame(measurementFrameRef.current);
      measurementFrameRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (!isMobile) return;

    const viewport = viewportRef.current;
    if (!viewport) return;

    const handleScroll = () => scheduleMeasure();

    viewport.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll();

    return () => {
      viewport.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [isMobile, scheduleMeasure]);

  useEffect(() => {
    const onResize = () => scheduleMeasure();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [scheduleMeasure]);

  const renderProjectCards = () => projects.map((project, index) => {
    const state = cardStates[index] ?? createBaseState();

    return (
      <div
        key={project.id}
        ref={(element) => { cardRefs.current[index] = element; }}
        style={{
          flexShrink: 0,
          scrollSnapAlign: 'center',
        }}
      >
        <ProjectCard
          project={project}
          visualState={state}
        />
      </div>
    );
  });

  if (isMobile) {
    return (
      <div
        ref={viewportRef}
        className="project-mobile-track"
        style={{
          display: 'flex',
          gap: `${CARD_GAP_MOBILE}px`,
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          padding: '20px 7.5vw 32px',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        <style>{`.project-mobile-track::-webkit-scrollbar { display: none; }`}</style>
        {renderProjectCards()}
      </div>
    );
  }

  return (
    <div
      ref={sectionRef}
      style={{
        height: '100vh',
        overflow: 'hidden',
        position: 'relative',
        background:
          'radial-gradient(circle at 50% 35%, rgba(255,255,255,0.08), transparent 34%), radial-gradient(circle at 50% 80%, rgba(255,255,255,0.05), transparent 28%), linear-gradient(180deg, #060606 0%, #000000 55%, #050505 100%)',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          height: '100%',
          width: '100%',
        }}
      >
        <div
          ref={trackRef}
          style={{
            display: 'flex',
            gap: `${CARD_GAP_DESKTOP}px`,
            paddingLeft: 'max(21vw, calc(50vw - 340px))',
            paddingRight: 'max(21vw, calc(50vw - 340px))',
            willChange: 'transform',
          }}
        >
          {renderProjectCards()}
        </div>
      </div>
    </div>
  );
}
