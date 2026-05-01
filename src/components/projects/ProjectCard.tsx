import React, { useRef } from 'react';
import { motion } from 'motion/react';
import type { Project } from '../../config/projects.config';
import BorderGlow from '../ui/BorderGlow';

interface ProjectCardProps {
  project: Project;
  visualState: {
    scale: number;
    y: number;
    blur: number;
    opacity: number;
    zIndex: number;
    focus: number;
    glow: number;
  };
}

export const ProjectCard = React.memo(function ProjectCard({
  project,
  visualState,
}: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={cardRef}
      whileHover={{ scale: visualState.scale + 0.035, y: visualState.y - 8 }}
      transition={{ type: 'spring', stiffness: 180, damping: 24, mass: 0.9 }}
      style={{
        width: 'clamp(300px, 58vw, 680px)',
        flexShrink: 0,
        background:
          'linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.03) 45%, rgba(8,8,8,0.96) 100%)',
        border: `1px solid ${visualState.glow > 0.5 ? 'rgba(255,255,255,0.22)' : 'rgba(255,255,255,0.10)'}`,
        borderRadius: '18px',
        // padding: 'clamp(24px, 4vw, 40px)',
        opacity: visualState.opacity,
        filter: `blur(${visualState.blur}px) saturate(${0.9 + visualState.focus * 0.12})`,
        scale: visualState.scale,
        zIndex: visualState.zIndex,
        cursor: 'pointer',
        boxShadow: visualState.glow > 0.45
          ? '0 28px 80px rgba(0,0,0,0.58), 0 0 0 1px rgba(255,255,255,0.12), 0 0 64px rgba(255,255,255,0.08)'
          : '0 18px 52px rgba(0,0,0,0.34)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        transformOrigin: 'center center',
        willChange: 'transform, opacity, filter',
      }}
    >
      <BorderGlow
        edgeSensitivity={30}
        glowColor="40 80 80"
        backgroundColor='linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.03) 45%, rgba(8,8,8,0.96) 100%)'
        borderRadius={18}
        glowRadius={40}
        glowIntensity={1}
        coneSpread={25}
        animated={false}
        colors={['#ffffff', '#e2e2e2', '#c2c2c2']}
      >
        <div>
          <h3
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.5rem, 2.2vw, 2rem)',
              fontWeight: 600,
              color: '#FFFFFF',
              marginBottom: '14px',
              letterSpacing: '-0.02em',
            }}
          >
            {project.title}
          </h3>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.98rem',
              color: '#B6B6B6',
              lineHeight: 1.75,
              marginBottom: '22px',
              maxWidth: '58ch',
            }}
          >
            {project.description}
          </p>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.75rem',
              color: '#9E9E9E',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: '28px',
            }}
          >
            {project.tech.join(' · ')}
          </p>
        </div>

        <div>
          <a
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.86rem',
              color: '#F3F3F3',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              position: 'relative',
              padding: '12px 18px',
              borderRadius: '999px',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.14)',
              transition: 'transform 180ms ease, border-color 180ms ease, background-color 180ms ease, box-shadow 180ms ease',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget;
              Object.assign(el.style, {
                borderColor: 'rgba(255,255,255,0.28)',
                backgroundColor: 'rgba(255,255,255,0.08)',
                boxShadow: '0 12px 28px rgba(0,0,0,0.24)',
              });
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget;
              Object.assign(el.style, {
                borderColor: 'rgba(255,255,255,0.14)',
                backgroundColor: 'rgba(255,255,255,0.05)',
                boxShadow: 'none',
              });
            }}
          >
            View →
          </a>
        </div>
      </BorderGlow>

      
    </motion.div>
  );
});
