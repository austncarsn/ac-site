import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { EASE_OUT_EXPO, DURATION, MOBILE_DURATION } from '../../lib/constants';

const navItems = [
  { label: 'Work', href: '#work' },
  { label: 'Systems', href: '#systems' },
  { label: 'Essays', href: '#essays' },
  { label: 'About', href: '#about' },
  { label: 'Resume', href: '#resume' },
  { label: 'Contact', href: '#contact' },
] as const;

const SCROLL_THRESHOLD = 20;
const ACTIVE_SECTION_OFFSET = 150;
const TOP_THRESHOLD = 100;

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  
  // Detect mobile
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const duration = isMobile ? MOBILE_DURATION : DURATION;

  useEffect(() => {
    const handleScroll = () => {
      // Update scroll state
      setIsScrolled(window.scrollY > SCROLL_THRESHOLD);

      // Detect active section
      const sections = navItems.map(item => item.href.substring(1));
      const scrollPosition = window.scrollY + ACTIVE_SECTION_OFFSET;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          return;
        }
      }
      
      // If at top of page
      if (window.scrollY < TOP_THRESHOLD) {
        setActiveSection('');
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    
    if (href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  }, []);

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all ${ 
          isScrolled 
            ? 'bg-background/80 backdrop-blur-md border-b border-border shadow-sm' 
            : 'bg-transparent'
        }`}
        style={{
          transitionDuration: isMobile ? '0.3s' : '0.5s',
          transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
          willChange: 'background-color, border-color, box-shadow',
          transform: 'translateZ(0)',
        }}
        initial={{ y: -64 }}
        animate={{ y: 0 }}
        transition={{ 
          duration: prefersReducedMotion ? duration.fast : duration.slow,
          ease: EASE_OUT_EXPO,
        }}
      >
        <div className="container-main">
          <div className="flex items-center justify-between" style={{ height: 'var(--header-height)' }}>
            {/* Logo */}
            <motion.a
              href="#"
              onClick={(e) => handleNavClick(e, '#')}
              whileTap={{ scale: 0.95 }}
              className="relative transition-opacity flex items-center justify-center border border-foreground rounded-[6px] touch-manipulation"
              style={{
                width: '40px',
                height: '40px',
                fontSize: '17px',
                fontWeight: 400,
                letterSpacing: '0.02em',
                transitionDuration: isMobile ? '0.2s' : '0.3s',
                transitionTimingFunction: 'cubic-bezier(0.25, 1, 0.5, 1)',
                WebkitTapHighlightColor: 'transparent',
                willChange: 'opacity, transform',
              }}
            >
              AC
            </motion.a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center" style={{ gap: 'var(--space-12)' }}>
              {navItems.map((item) => {
                const sectionId = item.href.substring(1);
                const isActive = activeSection === sectionId;
                
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="relative transition-all hover:opacity-100"
                    style={{
                      fontSize: '17px',
                      fontWeight: 400,
                      letterSpacing: '0.05em',
                      textTransform: 'uppercase',
                      opacity: isActive ? 1 : 0.5,
                      padding: '8px 16px',
                      borderRadius: '8px',
                      backgroundColor: isActive ? 'rgba(20, 184, 166, 0.08)' : 'transparent',
                      transitionDuration: '0.3s',
                      transitionTimingFunction: 'cubic-bezier(0.25, 1, 0.5, 1)',
                      willChange: 'opacity, background-color',
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.backgroundColor = 'rgba(20, 184, 166, 0.05)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }
                    }}
                  >
                    {item.label}
                  </a>
                );
              })}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden hover:opacity-60 transition-opacity touch-manipulation active:opacity-40"
              style={{ 
                padding: 'var(--space-2)',
                transitionDuration: isMobile ? '0.15s' : '0.3s',
                transitionTimingFunction: 'cubic-bezier(0.25, 1, 0.5, 1)',
                WebkitTapHighlightColor: 'transparent',
                willChange: 'opacity',
              }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="round"
                style={{ opacity: 0.7 }}
              >
                {mobileMenuOpen ? (
                  <>
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </>
                ) : (
                  <>
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence mode="wait">
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-background/98 backdrop-blur-md z-40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ 
                duration: 0.2,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                willChange: 'opacity',
              }}
            />

            {/* Menu Panel - Table of Contents */}
            <motion.div
              className="fixed left-0 right-0 bg-background/95 backdrop-blur-xl z-40 md:hidden"
              style={{ 
                top: 'var(--header-height)',
                borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
                willChange: 'opacity',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ 
                duration: 0.2,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              <div className="container-main" style={{ paddingTop: 'clamp(2rem, 5vw, 3rem)', paddingBottom: 'clamp(2rem, 5vw, 3rem)' }}>
                <nav className="flex flex-col" style={{ gap: 0 }}>
                  {navItems.map((item, index) => {
                    const sectionId = item.href.substring(1);
                    const isActive = activeSection === sectionId;
                    
                    return (
                      <button
                        key={item.label}
                        onClick={() => {
                          setMobileMenuOpen(false);
                          
                          setTimeout(() => {
                            const element = document.querySelector(item.href);
                            if (element) {
                              element.scrollIntoView({ 
                                behavior: 'smooth',
                                block: 'start'
                              });
                            }
                          }, 250);
                        }}
                        className="touch-manipulation transition-all active:opacity-60 text-left"
                        style={{
                          fontSize: isActive ? '22px' : '20px',
                          fontWeight: isActive ? 400 : 300,
                          letterSpacing: isActive ? '0.08em' : '0.06em',
                          textTransform: 'uppercase',
                          color: isActive ? '#1A1A19' : '#71717A',
                          paddingTop: 'clamp(1rem, 3vw, 1.25rem)',
                          paddingBottom: 'clamp(1rem, 3vw, 1.25rem)',
                          paddingLeft: isActive ? '0.5rem' : '0',
                          borderBottom: index < navItems.length - 1 ? '1px solid rgba(0, 0, 0, 0.04)' : 'none',
                          transitionProperty: 'all',
                          transitionDuration: '0.2s',
                          transitionTimingFunction: 'cubic-bezier(0.25, 1, 0.5, 1)',
                          WebkitTapHighlightColor: 'transparent',
                          minHeight: '56px',
                          display: 'flex',
                          alignItems: 'center',
                          cursor: 'pointer',
                          userSelect: 'none',
                          WebkitUserSelect: 'none',
                          border: 'none',
                          background: 'none',
                          width: '100%',
                        }}
                      >
                        {item.label}
                      </button>
                    );
                  })}
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}