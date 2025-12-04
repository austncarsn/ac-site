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
  const [letterColors, setLetterColors] = useState<string[]>(
    Array(title.length).fill('#000000')
  );
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

  // Memoize color getter function
  const getRandomColor = useCallback((currentColor: string): string => {
    const availableColors = VIBRANT_COLORS.filter(c => c !== currentColor);
    return availableColors[Math.floor(Math.random() * availableColors.length)];
  }, []);

  // Handle letter click with optimized state update
  const handleLetterClick = useCallback((index: number) => {
    setLetterColors(prevColors => {
      const newColors = [...prevColors];
      newColors[index] = getRandomColor(prevColors[index]);
      return newColors;
    });
  }, [getRandomColor]);

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
        paddingBottom: 'var(--space-20)',
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
            paddingTop: 'clamp(var(--space-12), 5vw, var(--space-20))',
            paddingBottom: 'clamp(var(--space-12), 5vw, var(--space-20))',
          }}
        >
          {/* Hero Content */}
          <div className="flex flex-col justify-center">
            <motion.h1 
              variants={animationVariants.content}
              className="break-words"
              style={{ 
                marginBottom: '24px',
                willChange: 'opacity, transform',
                transform: 'translateZ(0)',
              }}
            >
              {title.split('').map((letter, index) => (
                <motion.span
                  key={`letter-${index}`}
                  className={letter === ' ' ? '' : 'cursor-pointer transition-colors duration-300'}
                  style={{ 
                    color: letterColors[index],
                    display: 'inline-block',
                    whiteSpace: letter === ' ' ? 'pre' : 'normal',
                  }}
                  animate={{ color: letterColors[index] }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  onClick={letter !== ' ' ? () => handleLetterClick(index) : undefined}
                  role={letter !== ' ' ? 'button' : undefined}
                  tabIndex={letter !== ' ' ? 0 : undefined}
                  onKeyDown={letter !== ' ' ? (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleLetterClick(index);
                    }
                  } : undefined}
                  aria-label={letter !== ' ' ? `Letter ${letter} - click to change color` : undefined}
                >
                  {letter === ' ' ? '\u00A0' : letter}
                </motion.span>
              ))}
            </motion.h1>
            
            {/* Subheading - larger than body */}
            <motion.p
              variants={animationVariants.subheading}
              className="max-w-[620px]"
              style={{ 
                marginBottom: '16px',
                fontSize: isMobile ? '20px' : '24px',
                lineHeight: isMobile ? '30px' : '36px',
                fontWeight: 400,
                letterSpacing: '-0.01em',
                willChange: 'opacity, transform',
                transform: 'translateZ(0)',
              }}
            >
              Interface systems architect building production-grade design systems for teams that care about detail.
            </motion.p>

            {/* Supporting line - smaller text */}
            <motion.p
              variants={animationVariants.supporting}
              className="max-w-[620px]"
              style={{ 
                marginBottom: '32px',
                opacity: 0.6,
                fontSize: isMobile ? '16px' : '18px',
                lineHeight: isMobile ? '24px' : '28px',
                fontWeight: 400,
                letterSpacing: '-0.01em',
                willChange: 'opacity, transform',
                transform: 'translateZ(0)',
              }}
            >
              Product designer & front-end developer combining technical precision with creative mischief.
            </motion.p>

            <motion.button
              variants={animationVariants.button}
              onClick={scrollToWork}
              whileHover={!isMobile ? { opacity: 0.6 } : undefined}
              whileTap={{ scale: 0.98, opacity: 0.6 }}
              transition={{ duration: isMobile ? 0.15 : 0.2, ease: EASE_OUT_QUART }}
              className="border-b border-foreground self-start cursor-pointer touch-manipulation transition-opacity duration-200"
              style={{ 
                paddingBottom: 'var(--space-2)',
                fontSize: '17px',
                fontWeight: 400,
                letterSpacing: '-0.01em',
                WebkitTapHighlightColor: 'transparent',
                willChange: 'opacity, transform',
              }}
              aria-label="Scroll to view selected work section"
            >
              View selected work
            </motion.button>
          </div>

          {/* Color Block Grid */}
          <ColorBlockGrid isMobile={isMobile} />
        </motion.div>
      </div>
    </section>
  );
}