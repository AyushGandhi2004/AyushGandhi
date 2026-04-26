import React, { useRef } from 'react';
import { motion } from 'motion/react';
import type { Project } from '../../config/projects.config';

interface ProjectCardProps {
  project: Project;
  isActive: boolean;
  scrollProgress?: number;
  index?: number;
}

export const ProjectCard = React.memo(function ProjectCard({
  project,
  isActive,
  scrollProgress = 0,
  index = 0,
}: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  const parallelXTitle = isMobile ? 0 : (scrollProgress - index * 0.2) * 5;
  const parallelXBtn = isMobile ? 0 : (scrollProgress - index * 0.2) * 10;

  return (
    <motion.div
      ref={cardRef}
      whileHover={isActive ? { scale: 1.03 } : {}}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      style={{
        width: 'clamp(300px, 60vw, 680px)',
        flexShrink: 0,
        backgroundColor: '#0A0A0A',
        border: `1px solid ${isActive ? '#E7E7E7' : 'rgba(229,229,229,0.1)'}`,
        borderRadius: '12px',
        padding: '40px',
        opacity: isActive ? 1 : 0.35,
        filter: isActive ? 'none' : 'blur(2px)',
        scale: isActive ? 1 : 0.92,
        transition: 'opacity 0.4s ease, filter 0.4s ease, scale 0.4s ease, border-color 0.4s ease',
        cursor: isActive ? 'pointer' : 'default',
        willChange: 'transform, opacity',
      }}
    >
      <div style={{ transform: `translateX(${parallelXTitle}px)`, transition: 'transform 0.05s linear' }}>
        <h3
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '1.5rem',
            fontWeight: 600,
            color: '#FFFFFF',
            marginBottom: '16px',
          }}
        >
          {project.title}
        </h3>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.9375rem',
            color: '#A0A0A0',
            lineHeight: 1.6,
            marginBottom: '20px',
          }}
        >
          {project.description}
        </p>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.75rem',
            color: '#A0A0A0',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            marginBottom: '28px',
          }}
        >
          {project.tech.join(' · ')}
        </p>
      </div>

      <div style={{ transform: `translateX(${parallelXBtn}px)`, transition: 'transform 0.05s linear' }}>
        <a
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
          className="project-view-link"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.875rem',
            color: '#E5E5E5',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            display: 'inline-block',
            position: 'relative',
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget;
            Object.assign(el.style, { borderBottom: '1px solid #E5E5E5' });
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget;
            el.style.borderBottom = 'none';
          }}
        >
          View →
        </a>
      </div>
    </motion.div>
  );
});
