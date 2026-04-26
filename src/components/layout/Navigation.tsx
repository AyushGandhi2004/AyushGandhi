import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import gsap from 'gsap';
import { siteConfig } from '../../config/site.config';
import { ShimmerText } from '../ui/ShimmerText';
import { useLenis } from '../../hooks/useLenis';

export function Navigation() {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!navRef.current) return;
    const dpEl = navRef.current.querySelector('.nav-dp');
    const linkEls = navRef.current.querySelectorAll('.nav-link');
    const photoEl = navRef.current.querySelector('.nav-photo');

    gsap.set(dpEl, { opacity: 0, scale: 0.9 });
    gsap.set(linkEls, { opacity: 0, y: 12 });
    gsap.set(photoEl, { opacity: 0 });

    const tl = gsap.timeline({ delay: 0.1 });
    tl.to(dpEl, { opacity: 1, scale: 1, duration: 0.8, ease: 'power2.out' })
      .to(linkEls, { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: 'power2.out' }, 0.3)
      .to(photoEl, { opacity: 1, duration: 0.6, ease: 'power2.out' }, 0.6);

    return () => { tl.kill(); };
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target && lenis) {
        lenis.scrollTo(target as HTMLElement, { offset: -80 });
      } else if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
      setMenuOpen(false);
    }
  };

  return (
    <>
      <nav
        ref={navRef}
        aria-label="Main navigation"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          padding: '16px 40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          transition: 'backdrop-filter 0.3s ease, border-bottom 0.3s ease, background 0.3s ease',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : '1px solid transparent',
          backgroundColor: scrolled ? 'rgba(0,0,0,0.5)' : 'transparent',
        }}
      >
        {/* DP */}
        <Link to="/" aria-label="Home" className="nav-dp" style={{ display: 'block', flexShrink: 0 }}>
          <img
            src={siteConfig.nav.dpImage}
            alt="Ayush Gandhi"
            width={36}
            height={36}
            style={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              border: '1px solid rgba(229,229,229,0.2)',
              objectFit: 'cover',
              backgroundColor: '#1a1a1a',
            }}
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        </Link>

        {/* Center links — desktop */}
        <div
          style={{
            display: 'flex',
            gap: '40px',
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
          }}
          className="hidden-mobile"
        >
          {siteConfig.nav.links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="nav-link nav-underline-link"
              style={{
                color: '#A0A0A0',
                fontSize: '0.875rem',
                letterSpacing: '0.02em',
                transition: 'color 0.25s ease',
                position: 'relative',
              }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = '#FFFFFF')}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = '#A0A0A0')}
            >
              {link.label}
              <style>{`
                .nav-underline-link::after {
                  content: '';
                  position: absolute;
                  bottom: -2px;
                  left: 0;
                  width: 100%;
                  height: 1px;
                  background: #FFFFFF;
                  transform: scaleX(0);
                  transform-origin: left;
                  transition: transform 0.35s ease;
                }
                .nav-underline-link:hover::after {
                  transform: scaleX(1);
                }
              `}</style>
            </a>
          ))}
        </div>

        {/* Photography link — desktop */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Link
            to={siteConfig.nav.photographyHref}
            className="nav-photo nav-underline-link photography-link hidden-mobile"
            style={{
              color: '#A0A0A0',
              fontSize: '0.875rem',
              letterSpacing: '0.02em',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              position: 'relative',
              transition: 'color 0.25s ease',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.color = '#FFFFFF';
              const arrow = el.querySelector('.photo-arrow') as HTMLElement;
              if (arrow) { arrow.style.transform = 'translateX(4px)'; arrow.style.letterSpacing = '0.5px'; }
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.color = '#A0A0A0';
              const arrow = el.querySelector('.photo-arrow') as HTMLElement;
              if (arrow) { arrow.style.transform = 'translateX(0)'; arrow.style.letterSpacing = '0px'; }
            }}
          >
            <ShimmerText>{siteConfig.nav.photographyLabel}</ShimmerText>
            <span className="photo-arrow" style={{ transition: 'transform 0.35s ease, letter-spacing 0.35s ease' }}>→</span>
          </Link>

          {/* Hamburger — mobile */}
          <button
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((o) => !o)}
            className="show-mobile"
            style={{ display: 'none', flexDirection: 'column', gap: '5px', padding: '4px' }}
          >
            <style>{`
              @media (max-width: 767px) {
                .hidden-mobile { display: none !important; }
                .show-mobile { display: flex !important; }
              }
            `}</style>
            <span style={{ display: 'block', width: 22, height: 1.5, background: '#FFFFFF', transition: 'all 0.3s ease', transform: menuOpen ? 'rotate(45deg) translate(4.5px, 4.5px)' : 'none' }} />
            <span style={{ display: 'block', width: 22, height: 1.5, background: '#FFFFFF', transition: 'opacity 0.3s ease', opacity: menuOpen ? 0 : 1 }} />
            <span style={{ display: 'block', width: 22, height: 1.5, background: '#FFFFFF', transition: 'all 0.3s ease', transform: menuOpen ? 'rotate(-45deg) translate(4.5px, -4.5px)' : 'none' }} />
          </button>
        </div>
      </nav>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: '#000000',
              zIndex: 999,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '40px',
            }}
          >
            {[...siteConfig.nav.links, { label: siteConfig.nav.photographyLabel, href: siteConfig.nav.photographyHref }].map((link, i) => (
              <motion.div
                key={link.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
              >
                {link.href.startsWith('#') ? (
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    style={{ color: '#FFFFFF', fontSize: '2rem', fontFamily: 'var(--font-heading)', fontWeight: 600 }}
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    to={link.href}
                    onClick={() => setMenuOpen(false)}
                    style={{ color: '#FFFFFF', fontSize: '2rem', fontFamily: 'var(--font-heading)', fontWeight: 600 }}
                  >
                    {link.label}
                  </Link>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
