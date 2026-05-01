import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { siteConfig } from '../../config/site.config';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

gsap.registerPlugin(ScrollTrigger);

const reactIcon = new URL('../../assets/react.svg', import.meta.url).href;
const nodejsIcon = new URL('../../assets/nodejs.svg', import.meta.url).href;
const gsapIcon = new URL('../../assets/gsap.svg', import.meta.url).href;
const langchainIcon = new URL('../../assets/langchain.svg', import.meta.url).href;
const langgraphIcon = new URL('../../assets/langgraph.svg', import.meta.url).href;
const redisIcon = new URL('../../assets/redis.svg', import.meta.url).href;
const tailwindIcon = new URL('../../assets/tailwindcss.svg', import.meta.url).href;
const pythonIcon = new URL('../../assets/python.svg', import.meta.url).href;
const cppIcon = new URL('../../assets/c++.svg', import.meta.url).href;

const techIcons = {
  react: (
    <img
      src={reactIcon}
      alt="React"
      loading="lazy"
      decoding="async"
      fetchPriority="low"
      style={{ width: '100%', height: '100%', objectFit: 'contain' }}
    />
  ),
  nodejs: (
    <img
      src={nodejsIcon}
      alt="Node.js"
      loading="lazy"
      decoding="async"
      fetchPriority="low"
      style={{ width: '100%', height: '100%', objectFit: 'contain' }}
    />
  ),
  mongodb: (
    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.193 9.555c-1.264-5.58-4.252-7.414-4.573-8.115-.28-.394-.53-.954-.735-1.44-.036.495-.055.685-.523 1.184-.723.566-4.438 3.682-4.74 10.02-.282 5.912 4.27 9.435 4.888 9.884l.07.05A73.49 73.49 0 0111.91 24h.481c.114-1.032.284-2.056.51-3.07.417-.296.604-.463.85-.693a11.342 11.342 0 003.639-8.464c.01-.814-.103-1.662-.197-2.218zm-5.336 8.195s0-8.291.275-8.29c.213 0 .49 10.695.49 10.695-.381-.045-.765-1.76-.765-2.405z"/></svg>
  ),
  gsap: (
    <img
      src={gsapIcon}
      alt="GSAP"
      loading="lazy"
      decoding="async"
      fetchPriority="low"
      style={{ width: '100%', height: '100%', objectFit: 'contain' }}
    />
  ),
  fastapi: (
    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.376 0 0 5.376 0 12c0 6.627 5.376 12 12 12 6.627 0 12-5.373 12-12 0-6.624-5.373-12-12-12zm-.624 21.62v-7.528H6.15L13.296 2.38v7.528h5.227L11.376 21.62z"/></svg>
  ),
  langchain: (
    <img
      src={langchainIcon}
      alt="LangChain"
      loading="lazy"
      decoding="async"
      fetchPriority="low"
      style={{ width: '100%', height: '100%', objectFit: 'contain' }}
    />
  ),
  langgraph: (
    <img
      src={langgraphIcon}
      alt="LangGraph"
      loading="lazy"
      decoding="async"
      fetchPriority="low"
      style={{ width: '100%', height: '100%', objectFit: 'contain' }}
    />
  ),
  redis: (
    <img
      src={redisIcon}
      alt="Redis"
      loading="lazy"
      decoding="async"
      fetchPriority="low"
      style={{ width: '100%', height: '100%', objectFit: 'contain' }}
    />
  ),
  tailwindcss: (
    <img
      src={tailwindIcon}
      alt="Tailwind CSS"
      loading="lazy"
      decoding="async"
      fetchPriority="low"
      style={{ width: '100%', height: '100%', objectFit: 'contain' }}
    />
  ),
  python: (
    <img
      src={pythonIcon}
      alt="Python"
      loading="lazy"
      decoding="async"
      fetchPriority="low"
      style={{ width: '100%', height: '100%', objectFit: 'contain' }}
    />
  ),
  javascript: (
    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z"/></svg>
  ),
  cplusplus: (
    <img
      src={cppIcon}
      alt="C++"
      loading="lazy"
      decoding="async"
      fetchPriority="low"
      style={{ width: '100%', height: '100%', objectFit: 'contain' }}
    />
  ),
};

const TechItem = React.memo(function TechItem({ name, icon }) {
  const ref = useRef(null);

  const handleMouseEnter = () => {
    if (!ref.current) return;
    ref.current.style.color = '#FFFFFF';
    const iconWrap = ref.current.querySelector('.tech-icon-wrap');
    if (iconWrap) gsap.to(iconWrap, { scale: 1.08, duration: 0.25, ease: 'power2.out' });
  };
  const handleMouseLeave = () => {
    if (!ref.current) return;
    ref.current.style.color = '#A0A0A0';
    const iconWrap = ref.current.querySelector('.tech-icon-wrap');
    if (iconWrap) gsap.to(iconWrap, { scale: 1, duration: 0.25, ease: 'power2.out' });
  };

  return (
    <div
      ref={ref}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '10px',
        color: '#A0A0A0',
        cursor: 'default',
        transition: 'color 0.25s ease',
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="tech-icon-wrap" style={{ width: 48, height: 48, willChange: 'transform' }}>
        {techIcons[icon] ?? (
          <svg viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="12" r="10" />
          </svg>
        )}
      </div>
      <span style={{ fontSize: '0.75rem', textAlign: 'center', fontFamily: 'var(--font-body)', letterSpacing: '0.02em' }}>
        {name}
      </span>
    </div>
  );
});

export function TechStack() {
  const gridRef = useRef(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (!gridRef.current) return;
    const items = gridRef.current.querySelectorAll('.tech-item');

    if (reducedMotion) {
      gsap.set(items, { opacity: 1, y: 0 });
      return;
    }

    gsap.set(items, { opacity: 0, y: 20 });
    const anim = gsap.to(items, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.05,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: gridRef.current,
        start: 'top 85%',
        once: true,
      },
    });

    return () => { anim.kill(); };
  }, [reducedMotion]);

  return (
    <div
      ref={gridRef}
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(6, 1fr)',
        gap: '32px 24px',
        marginTop: '48px',
      }}
      className="tech-grid"
    >
      <style>{`
        @media (max-width: 767px) { .tech-grid { grid-template-columns: repeat(3, 1fr) !important; } }
        @media (min-width: 768px) and (max-width: 1023px) { .tech-grid { grid-template-columns: repeat(4, 1fr) !important; } }
      `}</style>
      {siteConfig.about.techStack.map((item) => (
        <div key={item.name} className="tech-item">
          <TechItem name={item.name} icon={item.icon} />
        </div>
      ))}
    </div>
  );
}
