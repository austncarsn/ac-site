export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border" style={{ paddingTop: 'var(--space-14)', paddingBottom: 'var(--space-14)' }}>
      <div className="container-main">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-8" style={{ gap: 'var(--space-8)' }}>
          <div className="break-words" style={{ fontSize: '17px', opacity: 0.4 }}>
            © {currentYear} Austin Carson
          </div>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="hover:opacity-60 transition-opacity duration-300"
            style={{ fontSize: '17px', opacity: 0.4 }}
            aria-label="Scroll to top"
          >
            Back to top ↑
          </button>
        </div>
      </div>
    </footer>
  );
}