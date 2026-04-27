import { Hero } from '../components/hero/Hero';
import { About } from '../components/about/About';
import { Projects } from '../components/projects/Projects';
import { Contact } from '../components/contact/Contact';
import { SectionDivider } from '../components/layout/SectionDivider';

export function Home() {
  return (
    <main>
      <Hero />
      <About />
      <SectionDivider />
      <Projects />
      <SectionDivider />
      <Contact />
    </main>
  );
}
