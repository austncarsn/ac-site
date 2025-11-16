import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const navItems = [
  { label: 'Work', href: '#work' },
  { label: 'Systems', href: '#systems' },
  { label: 'Essays', href: '#essays' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Detect mobile
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${ 
          isScrolled 
            ? 'bg-background/80 backdrop-blur-md border-b border-border shadow-sm' 
            : 'bg-transparent'
        }`}
        initial={{ y: -64 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
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
                WebkitTapHighlightColor: 'transparent',
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
                    className="relative transition-opacity duration-300 hover:opacity-100"
                    style={{
                      fontSize: '17px',
                      fontWeight: 400,
                      letterSpacing: 0,
                      opacity: isActive ? 1 : 0.5,
                    }}
                  >
                    {item.label}
                    {isActive && (
                      <motion.div
                        layoutId="activeSection"
                        className="absolute left-0 right-0 h-[1px] bg-foreground"
                        style={{ bottom: 'calc(var(--space-6) * -1)' }}
                        initial={false}
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
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
                WebkitTapHighlightColor: 'transparent',
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
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-background/95 backdrop-blur-sm z-40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              className="fixed left-0 right-0 bg-background border-b border-border z-40 md:hidden"
              style={{ top: 'var(--header-height)' }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="container-main" style={{ paddingTop: 'var(--space-8)', paddingBottom: 'var(--space-8)' }}>
                <nav className="flex flex-col" style={{ gap: 'var(--space-8)' }}>
                  {navItems.map((item, index) => {
                    const sectionId = item.href.substring(1);
                    const isActive = activeSection === sectionId;
                    
                    return (
                      <motion.a
                        key={item.label}
                        href={item.href}
                        onClick={(e) => handleNavClick(e, item.href)}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-center justify-between hover:opacity-60 transition-opacity active:opacity-40 touch-manipulation"
                        style={{
                          fontSize: '20px',
                          fontWeight: 400,
                          letterSpacing: '-0.01em',
                          opacity: isActive ? 1 : 0.5,
                          paddingTop: 'var(--space-2)',
                          paddingBottom: 'var(--space-2)',
                          transitionDuration: '0.2s',
                          WebkitTapHighlightColor: 'transparent',
                        }}
                      >
                        <span>{item.label}</span>
                        {isActive && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="rounded-full bg-foreground"
                            style={{ width: '6px', height: '6px' }}
                          />
                        )}
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