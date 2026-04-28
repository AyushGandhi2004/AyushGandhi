import { SectionHeading } from '../layout/SectionHeading';
import { ProjectScrollTrack } from './ProjectScrollTrack';

export function Projects() {
  return (
    <section
      id="projects"
      aria-label="Projects"
      style={{
        background:
          'radial-gradient(circle at top, rgba(255,255,255,0.05), transparent 32%), linear-gradient(180deg, #000000 0%, #040404 100%)',
      }}
    >
      <div style={{ padding: '120px 24px 24px' }}>
        <SectionHeading text="Projects" />
        <p
          style={{
            maxWidth: '720px',
            margin: '18px auto 0',
            color: 'rgba(255,255,255,0.72)',
            fontFamily: 'var(--font-body)',
            fontSize: '0.98rem',
            lineHeight: 1.75,
            textAlign: 'center',
          }}
        >
          A curated horizontal showcase designed to feel editorial, immersive, and high-end while keeping the motion calm and responsive.
        </p>
      </div>
      <ProjectScrollTrack />
    </section>
  );
}
