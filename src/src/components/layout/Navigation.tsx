import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";
import {
  EASE_OUT_EXPO,
  DURATION,
  MOBILE_DURATION,
} from "../../lib/constants";

type NavItem = { label: string; href: `#${string}` };

const NAV_ITEMS = [
  { label: "Work", href: "#work" },
  { label: "Systems", href: "#systems" },
  { label: "Essays", href: "#essays" },
  { label: "About", href: "#about" },
  { label: "Resume", href: "#resume" },
  { label: "Contact", href: "#contact" },
] as const satisfies readonly NavItem[];

const HEADER_OFFSET = 80;
const SCROLL_THRESHOLD = 20;

function getId(href: string) {
  return href.slice(1);
}

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);

    onChange();
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}

function useBodyScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return;

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [locked]);
}

function useEscToClose(open: boolean, onClose: () => void) {
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () =>
      window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);
}

function useRafScrollY() {
  const [y, setY] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const onScroll = () => {
      if (rafRef.current != null) return;
      rafRef.current = window.requestAnimationFrame(() => {
        rafRef.current = null;
        setY(window.scrollY || 0);
      });
    };

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current != null)
        window.cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return y;
}

function useActiveSection(items: readonly NavItem[]) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const els = items
      .map((i) => document.getElementById(getId(i.href)))
      .filter(Boolean) as HTMLElement[];

    if (!els.length) return;

    const indexByEl = new Map<HTMLElement, number>();
    els.forEach((el, idx) => indexByEl.set(el, idx));

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => {
            if (a.intersectionRatio !== b.intersectionRatio) {
              return b.intersectionRatio - a.intersectionRatio;
            }
            const ai =
              indexByEl.get(a.target as HTMLElement) ?? 0;
            const bi =
              indexByEl.get(b.target as HTMLElement) ?? 0;
            return bi - ai;
          });

        if (!visible.length) return;

        const el = visible[0].target as HTMLElement;
        setActiveId((prev) => (prev === el.id ? prev : el.id));
      },
      {
        root: null,
        threshold: [0.25, 0.4, 0.55],
        rootMargin: "-15% 0px -60% 0px",
      },
    );

    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [items]);

  return activeId;
}

function scrollToHref(
  href: `#${string}`,
  behavior: ScrollBehavior,
) {
  const el = document.getElementById(getId(href));
  if (!el) return;

  const top = Math.max(0, el.offsetTop - HEADER_OFFSET);
  window.scrollTo({ top, behavior });
}

export function Navigation() {
  const reduceMotion = useReducedMotion();
  const isMobile = useMediaQuery("(max-width: 767px)");
  const duration = isMobile ? MOBILE_DURATION : DURATION;

  const scrollY = useRafScrollY();
  const isScrolled = scrollY > SCROLL_THRESHOLD;

  const activeId = useActiveSection(NAV_ITEMS);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const closeMobile = useCallback(
    () => setMobileMenuOpen(false),
    [],
  );
  useBodyScrollLock(mobileMenuOpen);
  useEscToClose(mobileMenuOpen, closeMobile);

  const onNavClick = useCallback(
    (
      e: React.MouseEvent<HTMLAnchorElement>,
      href: `#${string}`,
    ) => {
      e.preventDefault();
      closeMobile();
      scrollToHref(href, reduceMotion ? "auto" : "smooth");
    },
    [closeMobile, reduceMotion],
  );

  const navShellClass = useMemo(() => {
    return [
      "fixed top-0 left-0 right-0 z-50 transition-all",
      isScrolled
        ? "bg-background/80 backdrop-blur-md border-b border-border shadow-sm"
        : "bg-transparent",
    ].join(" ");
  }, [isScrolled]);

  return (
    <>
      <motion.nav
        className={navShellClass}
        style={{
          transitionDuration: isMobile ? "0.3s" : "0.5s",
          transitionTimingFunction:
            "cubic-bezier(0.16, 1, 0.3, 1)",
          willChange:
            "background-color, border-color, box-shadow",
          transform: "translateZ(0)",
        }}
        initial={{ y: -64 }}
        animate={{ y: 0 }}
        transition={{
          duration: reduceMotion
            ? duration.fast
            : duration.slow,
          ease: EASE_OUT_EXPO,
        }}
        aria-label="Primary navigation"
      >
        <div className="container-main">
          <div
            className="flex items-center justify-between"
            style={{ height: "var(--header-height)" }}
          >
            {/* Logo */}
            <motion.a
              href="#work"
              onClick={(e) => onNavClick(e, "#work")}
              whileTap={{ scale: 0.95 }}
              className="relative transition-opacity flex items-center justify-center border border-foreground rounded-[6px] touch-manipulation"
              style={{
                width: "40px",
                height: "40px",
                fontSize: "17px",
                fontWeight: 400,
                letterSpacing: "0.02em",
                WebkitTapHighlightColor: "transparent",
                willChange: "opacity, transform",
              }}
              aria-label="Go to Work"
            >
              AC
            </motion.a>

            {/* Desktop */}
            <div
              className="hidden md:flex items-center"
              style={{ gap: "var(--space-8)" }}
            >
              {NAV_ITEMS.map((item) => {
                const id = getId(item.href);
                const isActive = activeId === id;

                return (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => onNavClick(e, item.href)}
                    className="relative transition-all no-highlight"
                    style={{
                      fontSize: "14px",
                      fontWeight: 500,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      opacity: isActive ? 0.92 : 0.48,
                      padding: "10px 18px",
                      borderRadius: "10px",
                      transitionDuration: "0.25s",
                      transitionTimingFunction:
                        "cubic-bezier(0.25, 1, 0.5, 1)",
                      willChange: "opacity, transform",
                    }}
                    whileHover={
                      reduceMotion
                        ? undefined
                        : { opacity: 0.92, scale: 1.03 }
                    }
                    whileTap={
                      reduceMotion ? undefined : { scale: 0.97 }
                    }
                    aria-current={isActive ? "page" : undefined}
                  >
                    {item.label}

                    {isActive && (
                      <motion.div
                        layoutId="activeSection"
                        className="absolute bottom-0 left-1/2"
                        style={{
                          width: "22px",
                          height: "2px",
                          background:
                            "linear-gradient(90deg, rgba(182, 207, 255, 0.55), rgba(182, 207, 255, 0.95), rgba(182, 207, 255, 0.55))",
                          borderRadius: "1px",
                          transform: "translateX(-50%)",
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 520,
                          damping: 40,
                        }}
                        aria-hidden="true"
                      />
                    )}
                  </motion.a>
                );
              })}
            </div>

            {/* Mobile button */}
            <button
              className="md:hidden hover:opacity-70 transition-opacity touch-manipulation active:opacity-50"
              style={{
                padding: "var(--space-2)",
                WebkitTapHighlightColor: "transparent",
              }}
              onClick={() => setMobileMenuOpen((v) => !v)}
              aria-label={
                mobileMenuOpen ? "Close menu" : "Open menu"
              }
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              type="button"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="round"
                style={{ opacity: 0.75 }}
                aria-hidden="true"
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

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 md:hidden bg-background/95 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.18,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              onClick={closeMobile}
              aria-hidden="true"
            />

            <motion.div
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
              className="fixed left-0 right-0 z-50 md:hidden bg-background/95 backdrop-blur-xl"
              style={{
                top: "var(--header-height)",
                borderBottom: "1px solid rgba(0, 0, 0, 0.06)",
              }}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{
                duration: 0.2,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div
                className="container-main"
                style={{
                  paddingTop: "clamp(2rem, 5vw, 3rem)",
                  paddingBottom: "clamp(2rem, 5vw, 3rem)",
                }}
              >
                <nav className="flex flex-col">
                  {NAV_ITEMS.map((item, index) => {
                    const id = getId(item.href);
                    const isActive = activeId === id;

                    return (
                      <motion.a
                        key={item.label}
                        href={item.href}
                        onClick={(e) =>
                          onNavClick(e, item.href)
                        }
                        className="touch-manipulation text-left select-none"
                        style={{
                          fontSize: isActive ? "22px" : "20px",
                          fontWeight: isActive ? 400 : 300,
                          letterSpacing: isActive
                            ? "0.08em"
                            : "0.06em",
                          textTransform: "uppercase",
                          color: isActive
                            ? "#1A1A19"
                            : "#71717A",
                          paddingTop:
                            "clamp(1rem, 3vw, 1.25rem)",
                          paddingBottom:
                            "clamp(1rem, 3vw, 1.25rem)",
                          paddingLeft: isActive
                            ? "0.5rem"
                            : "0",
                          borderBottom:
                            index < NAV_ITEMS.length - 1
                              ? "1px solid rgba(0, 0, 0, 0.04)"
                              : "none",
                          minHeight: "56px",
                          display: "flex",
                          alignItems: "center",
                          WebkitTapHighlightColor:
                            "transparent",
                        }}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{
                          duration: 0.18,
                          delay: Math.min(index * 0.03, 0.18),
                        }}
                        aria-current={
                          isActive ? "page" : undefined
                        }
                      >
                        {item.label}
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