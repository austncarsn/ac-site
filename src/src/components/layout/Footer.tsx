export function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    // Multiple approaches to ensure it works
    window.scrollTo({ 
      top: 0, 
      left: 0,
      behavior: 'smooth' 
    });
    
    // Fallback for browsers that don't support smooth scroll
    setTimeout(() => {
      if (window.scrollY > 0) {
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0; // For older browsers
      }
    }, 100);
  };

  return (
    <footer 
      className="border-t" 
      style={{ 
        paddingTop: 'clamp(4rem, 8vw, 6rem)', 
        paddingBottom: 'clamp(3rem, 6vw, 4rem)',
        borderTopColor: 'rgba(0, 0, 0, 0.12)', // More visible border
        backgroundColor: 'rgba(246, 247, 249, 0.8)', // More visible background
      }}
    >
      <div className="container-main">
        {/* Optional quiet line of authorship */}
        <div 
          style={{ 
            marginBottom: 'clamp(2.5rem, 4vw, 3rem)',
            fontSize: 'clamp(13px, 1.8vw, 14px)',
            color: '#52525b', // zinc-600 - increased contrast
            letterSpacing: '0.02em',
            fontWeight: 400, // Slightly stronger
            lineHeight: 1.6,
            maxWidth: '520px',
          }}
        >
          Built with intention. Designed for clarity.
        </div>

        <div 
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
          style={{ 
            gap: 'clamp(1.5rem, 3vw, 2rem)',
          }}
        >
          {/* Copyright as signature */}
          <div 
            className="break-words" 
            style={{ 
              fontSize: 'clamp(14px, 2vw, 15px)',
              color: '#3f3f46', // zinc-700 - much stronger contrast
              letterSpacing: '0.01em',
              fontWeight: 300, // Light weight to match headers
              lineHeight: 1.5,
            }}
          >
            © {currentYear} Austin Carson
          </div>

          {/* Back to Top - Optional affordance */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              // Immediate scroll to top
              window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
              // Fallback without smooth scroll
              document.documentElement.scrollTop = 0;
              document.body.scrollTop = 0;
            }}
            type="button"
            className="transition-all duration-300 hover:opacity-100 hover:text-[#1a1a19] active:opacity-60"
            style={{ 
              fontSize: 'clamp(13px, 1.8vw, 14px)',
              color: '#52525b', // zinc-600 - increased contrast
              opacity: 0.8, // More visible
              letterSpacing: '0.02em',
              fontWeight: 400,
              minHeight: '44px', // Comfortable tap target
              minWidth: '44px',
              padding: '10px 12px', // Better tap area
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.375rem',
              cursor: 'pointer',
              touchAction: 'manipulation', // Prevents double-tap zoom delay on mobile
              WebkitTapHighlightColor: 'transparent', // Removes default mobile tap highlight
            }}
            aria-label="Scroll to top"
          >
            Back to top <span style={{ fontSize: '12px' }}>↑</span>
          </button>
        </div>
      </div>
    </footer>
  );
}