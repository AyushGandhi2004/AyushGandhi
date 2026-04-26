import { SectionHeading } from '../layout/SectionHeading';
import { ProjectScrollTrack } from './ProjectScrollTrack';

export function Projects() {
  return (
    <section
      id="projects"
      aria-label="Projects"
      style={{ backgroundColor: '#000000' }}
    >
      <div style={{ padding: '120px 24px 60px' }}>
        <SectionHeading text="Projects" />
      </div>
      <ProjectScrollTrack />
    </section>
  );
}
