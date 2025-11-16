export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border" style={{ paddingTop: 'var(--space-14)', paddingBottom: 'var(--space-14)' }}>
      <div className="container-main">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between" style={{ gap: 'var(--space-8)' }}>
          <div style={{ fontSize: '17px', opacity: 0.4 }}>
            © {currentYear} Austin Carson
          </div>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="hover:opacity-60 transition-opacity duration-300"
            style={{ fontSize: '17px', opacity: 0.4 }}
          >
            Back to top ↑
          </button>
        </div>
      </div>
    </footer>
  );
}