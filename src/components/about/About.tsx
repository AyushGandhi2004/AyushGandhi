import { SectionHeading } from '../layout/SectionHeading';
import { AboutContent } from './AboutContent';
import { TechStack } from './TechStack';
import { siteConfig } from '../../config/site.config';

export function About() {
  return (
    <section
      id="about"
      aria-label="About"
      style={{
        backgroundColor: '#0A0A0A',
        padding: '120px 24px',
      }}
    >
      <div style={{ maxWidth: '760px', margin: '0 auto' }}>
        <SectionHeading text={siteConfig.about.heading} />
        <div style={{ marginTop: '64px' }}>
          <AboutContent />
        </div>
        <div style={{ marginTop: '28px', display: 'flex', justifyContent: 'center' }}>
          <a
            href={siteConfig.about.resumeHref}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              padding: '12px 22px',
              borderRadius: '999px',
              border: '1px solid rgba(255,255,255,0.14)',
              backgroundColor: 'rgba(255,255,255,0.03)',
              color: '#FFFFFF',
              textDecoration: 'none',
              fontFamily: 'var(--font-body)',
              fontSize: '0.82rem',
              fontWeight: 400,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              transition: 'transform 0.25s ease, border-color 0.25s ease, background-color 0.25s ease, box-shadow 0.25s ease',
            }}
            onMouseEnter={(event) => {
              event.currentTarget.style.transform = 'translateY(-1px)';
              event.currentTarget.style.borderColor = 'rgba(255,255,255,0.28)';
              event.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.08)';
              event.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.28)';
            }}
            onMouseLeave={(event) => {
              event.currentTarget.style.transform = 'translateY(0)';
              event.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)';
              event.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.03)';
              event.currentTarget.style.boxShadow = 'none';
            }}
          >
            Resume ↗
          </a>
        </div>
        <TechStack />
      </div>
    </section>
  );
}
