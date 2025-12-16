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
        paddingTop: 'clamp(5rem, 10vw, 8rem)', 
        paddingBottom: 'clamp(4rem, 8vw, 6rem)',
        borderTopColor: 'rgba(0, 0, 0, 0.08)',
        backgroundColor: '#FAFAFA',
      }}
    >
      <div className="container-main">
        {/* Optional quiet line of authorship */}
        <div 
          style={{ 
            marginBottom: 'clamp(3rem, 5vw, 4rem)',
            fontSize: 'clamp(14px, 2vw, 15px)',
            color: '#71717A',
            letterSpacing: '0.01em',
            fontWeight: 300,
            lineHeight: 1.7,
            maxWidth: '540px',
            opacity: 0.8,
          }}
        >
          Built with intention. Designed for clarity. Crafted for the future.
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
              fontSize: 'clamp(13px, 1.8vw, 14px)',
              color: '#3F3F46',
              letterSpacing: '0.03em',
              fontWeight: 400,
              lineHeight: 1.5,
              textTransform: 'uppercase',
            }}
          >
            © {currentYear} Austin Carson
          </div>

          {/* Back to Top - Optional affordance */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
              document.documentElement.scrollTop = 0;
              document.body.scrollTop = 0;
            }}
            type="button"
            className="transition-all duration-300 hover:opacity-100 active:opacity-60 active:scale-95"
            style={{ 
              fontSize: 'clamp(12px, 1.6vw, 13px)',
              color: '#71717A',
              opacity: 0.6,
              letterSpacing: '0.05em',
              fontWeight: 500,
              textTransform: 'uppercase',
              minHeight: '44px',
              minWidth: '44px',
              padding: '10px 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              cursor: 'pointer',
              touchAction: 'manipulation',
              WebkitTapHighlightColor: 'transparent',
              border: '1px solid rgba(0, 0, 0, 0.08)',
              borderRadius: '8px',
              backgroundColor: 'white',
            }}
            aria-label="Scroll to top"
          >
            Back to top <span style={{ fontSize: '14px', opacity: 0.7 }}>↑</span>
          </button>
        </div>
      </div>
    </footer>
  );
}