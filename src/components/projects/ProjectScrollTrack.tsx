import { useRef, useEffect, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '../../config/projects.config';
import { ProjectCard } from './ProjectCard';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

gsap.registerPlugin(ScrollTrigger);

const CARD_WIDTH = 680;
const CARD_GAP = 48;
const CARD_STRIDE = CARD_WIDTH + CARD_GAP;
const VERTICAL_STEP = 35;

export function ProjectScrollTrack() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  const loopedProjects = [...projects];

  const getActiveIndex = useCallback((progress: number) => {
    const totalCards = loopedProjects.length;
    const idx = Math.round(progress * (totalCards - 1));
    return Math.max(0, Math.min(idx, projects.length - 1));
  }, [loopedProjects.length]);

  useEffect(() => {
    if (!sectionRef.current || !trackRef.current || isMobile || reducedMotion) return;

    const totalScrollWidth = loopedProjects.length * CARD_STRIDE;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        pin: true,
        scrub: 1,
        start: 'top top',
        end: `+=${totalScrollWidth}`,
        onUpdate: (self) => {
          setScrollProgress(self.progress);
          setActiveIndex(getActiveIndex(self.progress));
        },
      },
    });

    tl.to(trackRef.current, {
      x: -totalScrollWidth + window.innerWidth * 0.5,
      ease: 'none',
    });

    return () => { tl.kill(); };
  }, [isMobile, reducedMotion, loopedProjects.length, getActiveIndex]);

  useEffect(() => {
    if (!isMobile) return;

    const track = trackRef.current;
    if (!track) return;

    const handleScroll = () => {
      const center = track.scrollLeft + track.clientWidth / 2;
      const idx = Math.round(center / CARD_STRIDE);
      setActiveIndex(Math.max(0, Math.min(idx, projects.length - 1)));
    };

    track.addEventListener('scroll', handleScroll, { passive: true });
    return () => track.removeEventListener('scroll', handleScroll);
  }, [isMobile]);

  if (isMobile) {
    return (
      <div
        ref={trackRef}
        style={{
          display: 'flex',
          gap: `${CARD_GAP}px`,
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          padding: '20px 10vw',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        <style>{`.mobile-track::-webkit-scrollbar { display: none; }`}</style>
        {projects.map((project, i) => (
          <div
            key={project.id}
            style={{
              scrollSnapAlign: 'center',
              flexShrink: 0,
              width: '85vw',
              transform: `translateY(${(i % 2 === 0 ? -1 : 1) * VERTICAL_STEP * 0.4}px)`,
            }}
          >
            <ProjectCard
              project={project}
              isActive={activeIndex === i}
              scrollProgress={scrollProgress}
              index={i}
            />
          </div>
        ))}
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
        backgroundColor: '#000000',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          height: '100%',
          paddingLeft: '10vw',
        }}
      >
        <div
          ref={trackRef}
          style={{
            display: 'flex',
            gap: `${CARD_GAP}px`,
            willChange: 'transform',
          }}
        >
          {loopedProjects.map((project, i) => {
            const relativePos = i - scrollProgress * (loopedProjects.length - 1);
            const yOffset = relativePos * VERTICAL_STEP;
            const realIndex = i % projects.length;

            return (
              <div
                key={`${project.id}-${i}`}
                style={{
                  transform: `translateY(${yOffset}px)`,
                  transition: 'transform 0.05s linear',
                }}
              >
                <ProjectCard
                  project={project}
                  isActive={activeIndex === realIndex && i < projects.length}
                  scrollProgress={scrollProgress}
                  index={i}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
