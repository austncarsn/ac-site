import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { EASE_OUT_EXPO, EASE_OUT_QUART, DURATION, MOBILE_DURATION } from '../../lib/constants';

const navItems = [
  { label: 'Work', href: '#work' },
  { label: 'Systems', href: '#systems' },
  { label: 'Essays', href: '#essays' },
  { label: 'About', href: '#about' },
  { label: 'Resume', href: '#resume' },
  { label: 'Contact', href: '#contact' },
];

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
      setIsScrolled(window.scrollY > 20);

      // Detect active section
      const sections = navItems.map(item => item.href.substring(1));
      const scrollPosition = window.scrollY + 150;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          return;
        }
      }
      
      // If at top of page
      if (window.scrollY < 100) {
        setActiveSection('');
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    
    if (href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setActiveSection('');
    } else {
      const element = document.querySelector(href);
      if (element) {
        const offset = 68;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  };

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
              className="relative hover:opacity-60 transition-opacity flex items-center justify-center border border-foreground rounded-[6px] touch-manipulation"
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
                    className="relative transition-opacity hover:opacity-100"
                    style={{
                      fontSize: '17px',
                      fontWeight: 400,
                      letterSpacing: 0,
                      opacity: isActive ? 1 : 0.5,
                      transitionDuration: '0.3s',
                      transitionTimingFunction: 'cubic-bezier(0.25, 1, 0.5, 1)',
                      willChange: 'opacity',
                    }}
                  >
                    {item.label}
                    {isActive && (
                      <motion.div
                        layoutId="activeSection"
                        className="absolute left-0 right-0 h-[1px] bg-foreground"
                        style={{ 
                          bottom: 'calc(var(--space-6) * -1)',
                          willChange: 'transform',
                        }}
                        initial={false}
                        transition={{
                          type: "spring",
                          stiffness: 340,
                          damping: 28,
                          mass: 0.8,
                        }}
                      />
                    )}
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
                strokeWidth="2"
                strokeLinecap="round"
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
                duration: 0.25,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                willChange: 'opacity',
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                transform: 'translateZ(0)',
                WebkitTransform: 'translateZ(0)',
              }}
            />

            {/* Menu Panel */}
            <motion.div
              className="fixed left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-border z-40 md:hidden"
              style={{ 
                top: 'var(--header-height)',
                willChange: 'opacity, transform',
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                transform: 'translateZ(0)',
                WebkitTransform: 'translateZ(0)',
              }}
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ 
                duration: 0.3,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <div className="container-main" style={{ paddingTop: 'var(--space-12)', paddingBottom: 'var(--space-12)' }}>
                <nav className="flex flex-col" style={{ gap: 'var(--space-1)' }}>
                  {navItems.map((item, index) => {
                    const sectionId = item.href.substring(1);
                    const isActive = activeSection === sectionId;
                    
                    return (
                      <motion.a
                        key={item.label}
                        href={item.href}
                        onClick={(e) => handleNavClick(e, item.href)}
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: isActive ? 1 : 0.5, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ 
                          delay: index * 0.05,
                          duration: 0.35,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        whileTap={{ scale: 0.98, opacity: 0.7 }}
                        className="flex items-center justify-between hover:opacity-100 transition-all group touch-manipulation border-b border-border/30"
                        style={{
                          fontSize: '24px',
                          fontWeight: 300,
                          letterSpacing: '-0.02em',
                          paddingTop: 'var(--space-6)',
                          paddingBottom: 'var(--space-6)',
                          transitionDuration: '0.25s',
                          transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                          WebkitTapHighlightColor: 'transparent',
                          willChange: 'opacity, transform',
                          backfaceVisibility: 'hidden',
                          WebkitBackfaceVisibility: 'hidden',
                        }}
                      >
                        <span>{item.label}</span>
                        <div className="flex items-center" style={{ gap: 'var(--space-4)' }}>
                          {isActive && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ 
                                delay: index * 0.05 + 0.15,
                                duration: 0.3,
                                ease: [0.16, 1, 0.3, 1],
                              }}
                              className="rounded-full bg-brand-purple"
                              style={{ 
                                width: '6px', 
                                height: '6px',
                              }}
                            />
                          )}
                          <motion.svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            className="opacity-0 group-hover:opacity-30 transition-opacity"
                            initial={{ x: -4, opacity: 0 }}
                            animate={{ x: 0, opacity: 0 }}
                            transition={{
                              delay: index * 0.05 + 0.1,
                              duration: 0.3,
                              ease: [0.16, 1, 0.3, 1],
                            }}
                            style={{ 
                              transitionDuration: '0.25s',
                              transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                            }}
                          >
                            <path d="M6 12L10 8L6 4" />
                          </motion.svg>
                        </div>
                      </motion.a>
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