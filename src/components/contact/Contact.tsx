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
        padding: '88px 20px 72px',
      }}
    >
      <div style={{ maxWidth: '760px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center' }}>
          <h2
            style={{
              fontFamily: "'Mitr', var(--font-heading)",
              fontSize: 'clamp(2rem, 5.5vw, 3.2rem)',
              fontWeight: 700,
              color: '#FFFFFF',
              letterSpacing: '-0.02em',
              lineHeight: 1.08,
            }}
          >
            {siteConfig.contact.heading}
          </h2>
          <p
            style={{
              marginTop: '12px',
              color: '#A0A0A0',
              fontFamily: 'var(--font-body)',
              fontSize: '0.9rem',
              letterSpacing: '0.02em',
            }}
          >
            Reach out for collaborations, projects, and product ideas.
          </p>
        </div>

        <div
          style={{
            marginTop: '34px',
            background: 'linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.015) 100%)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '18px',
            padding: '20px',
          }}
        >
          <ContactList />
          <ClosingLine />
        </div>
      </div>
    </section>
  );
}
