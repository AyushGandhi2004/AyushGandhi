import { SectionHeading } from '../layout/SectionHeading';
import { ContactList } from './ContactList';
import { ClosingLine } from './ClosingLine';
import { siteConfig } from '../../config/site.config';

export function Contact() {
  return (
    <section
      id="contact"
      aria-label="Contact"
      style={{
        backgroundColor: '#0A0A0A',
        padding: '120px 24px',
      }}
    >
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <SectionHeading text={siteConfig.contact.heading} />
        <div style={{ marginTop: '64px' }}>
          <ContactList />
        </div>
        <ClosingLine />
      </div>
      <div style={{ height: '20vh' }} />
    </section>
  );
}
