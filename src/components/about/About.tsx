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
        <TechStack />
      </div>
    </section>
  );
}
