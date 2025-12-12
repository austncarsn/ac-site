import { motion, useReducedMotion } from 'motion/react';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { 
  EASE_OUT_EXPO, 
  EASE_OUT_QUART, 
  DURATION,
  MOBILE_DURATION,
  STAGGER,
} from '../../lib/constants';
import { VIBRANT_COLORS } from '../../lib/colors';
import { ColorBlockGrid } from '../ui/ColorBlockGrid';

// Extract animation variants to prevent recreation on each render
const createAnimationVariants = (isMobile: boolean, prefersReducedMotion: boolean, duration: any) => {
  const yOffset = isMobile ? 16 : 24;
  const blurAmount = isMobile ? '6px' : '10px';
  const animationDuration = prefersReducedMotion ? duration.fast : duration.slowest;

  return {
    container: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: prefersReducedMotion ? 0 : (isMobile ? STAGGER.normal : STAGGER.slow),
          delayChildren: prefersReducedMotion ? 0 : (isMobile ? 0.1 : 0.2),
        },
      },
    },
    content: {
      hidden: { 
        opacity: 0, 
        y: prefersReducedMotion ? 0 : yOffset,
        filter: prefersReducedMotion ? 'none' : `blur(${blurAmount})`,
      },
      visible: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: {
          duration: animationDuration,
          ease: EASE_OUT_EXPO,
        },
      },
    },
    subheading: {
      hidden: { 
        opacity: 0,
        y: prefersReducedMotion ? 0 : (isMobile ? 12 : 18),
        filter: prefersReducedMotion ? 'none' : `blur(${isMobile ? '4px' : '8px'})`,
      },
      visible: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: {
          duration: prefersReducedMotion ? duration.fast : (isMobile ? duration.slower : 1.6),
          ease: EASE_OUT_EXPO,
        },
      },
    },
    supporting: {
      hidden: { 
        opacity: 0,
        y: prefersReducedMotion ? 0 : (isMobile ? 10 : 14),
        filter: prefersReducedMotion ? 'none' : `blur(${isMobile ? '3px' : '6px'})`,
      },
      visible: {
        opacity: 0.6,
        y: 0,
        filter: 'blur(0px)',
        transition: {
          duration: prefersReducedMotion ? duration.fast : (isMobile ? duration.slower : 1.4),
          ease: EASE_OUT_EXPO,
        },
      },
    },
    button: {
      hidden: { 
        opacity: 0,
        y: prefersReducedMotion ? 0 : (isMobile ? 10 : 14),
        filter: prefersReducedMotion ? 'none' : `blur(${isMobile ? '3px' : '6px'})`,
      },
      visible: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: {
          duration: animationDuration,
          ease: EASE_OUT_QUART,
        },
      },
    },
  };
};

export function HeroSection() {
  const prefersReducedMotion = useReducedMotion();
  const title = 'AUSTIN CARSON';

  // State management
  const [isMobile, setIsMobile] = useState<boolean>(
    typeof window !== 'undefined' && window.innerWidth < 1024
  );

  // Handle window resize for responsive behavior
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Memoize animation variants to prevent recreation
  const duration = isMobile ? MOBILE_DURATION : DURATION;
  const animationVariants = useMemo(
    () => createAnimationVariants(isMobile, prefersReducedMotion, duration),
    [isMobile, prefersReducedMotion, duration]
  );

  // Handle scroll to work section
  const scrollToWork = useCallback(() => {
    const workSection = document.getElementById('work');
    if (workSection) {
      workSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  return (
    <section 
      className="relative" 
      style={{ 
        paddingTop: 'var(--header-height)',
        paddingBottom: isMobile ? 'var(--space-16)' : 'var(--space-20)',
        backgroundColor: '#FAFAF9', // Warm off-white background
      }}
      aria-label="Hero section"
    >
      <div className="container-main flex items-center" style={{ minHeight: 'calc(100vh - var(--header-height))' }}>
        <motion.div
          variants={animationVariants.container}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 w-full"
          style={{ 
            gap: 'clamp(var(--space-12), 5vw, var(--space-16))',
            paddingTop: isMobile ? '0' : 'clamp(var(--space-12), 5vw, var(--space-20))',
            paddingBottom: isMobile ? '0' : 'clamp(var(--space-12), 5vw, var(--space-20))',
          }}
        >
          {/* Hero Content */}
          <div className="flex flex-col justify-center items-center lg:items-start text-center lg:text-left" style={{
            paddingLeft: isMobile ? 'var(--space-6)' : '0',
            paddingRight: isMobile ? 'var(--space-6)' : '0',
          }}>
            <motion.h1 
              variants={animationVariants.content}
              className="break-words"
              style={{ 
                marginBottom: isMobile ? '32px' : '24px',
                willChange: 'opacity, transform',
                transform: 'translateZ(0)',
                letterSpacing: isMobile ? '0.18em' : '0.15em', // Wide letter-spacing for editorial feel
                color: '#1A1A19', // Softened dark, not pure black
                fontWeight: 300, // Ultra-light weight
              }}
            >
              {title}
            </motion.h1>
            
            {/* Value statement - concise and clear */}
            <motion.p
              variants={animationVariants.subheading}
              className="max-w-[620px]"
              style={{ 
                marginBottom: isMobile ? '48px' : '32px',
                fontSize: isMobile ? '18px' : '22px',
                lineHeight: isMobile ? '28px' : '34px',
                fontWeight: 400,
                letterSpacing: '-0.005em',
                willChange: 'opacity, transform',
                transform: 'translateZ(0)',
                color: '#2D2D2C', // Warm dark tone
                maxWidth: isMobile ? '320px' : '620px', // Tighter on mobile
              }}
            >
              Building production-ready design systems with technical precision and editorial clarity.
            </motion.p>

            {/* Circle grid - visual anchor */}
            <div className="lg:hidden w-full flex justify-center" style={{ marginBottom: isMobile ? '48px' : '32px' }}>
              <ColorBlockGrid isMobile={isMobile} />
            </div>

            {/* Subtle CTA - desktop only or very minimal on mobile */}
            {!isMobile && (
              <motion.button
                variants={animationVariants.button}
                onClick={scrollToWork}
                whileHover={{ opacity: 0.5 }}
                whileTap={{ scale: 0.98, opacity: 0.5 }}
                transition={{ duration: 0.2, ease: EASE_OUT_QUART }}
                className="self-center lg:self-start cursor-pointer touch-manipulation transition-opacity duration-200"
                style={{ 
                  fontSize: '15px',
                  fontWeight: 400,
                  letterSpacing: '0.02em',
                  WebkitTapHighlightColor: 'transparent',
                  willChange: 'opacity, transform',
                  color: '#6B7280', // Muted gray
                  opacity: 0.6,
                  borderBottom: '1px solid currentColor',
                  paddingBottom: '2px',
                }}
                aria-label="Scroll to view selected work section"
              >
                View work
              </motion.button>
            )}
          </div>

          {/* Color Block Grid - Desktop only (mobile shows inline above) */}
          <div className="hidden lg:flex lg:items-center lg:justify-center">
            <ColorBlockGrid isMobile={isMobile} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}