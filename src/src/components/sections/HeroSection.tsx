import { motion, useReducedMotion } from 'motion/react';
import { useState } from 'react';
import { 
  EASE_OUT_EXPO, 
  EASE_OUT_QUART, 
  DURATION,
  MOBILE_DURATION,
  STAGGER,
} from '../../lib/constants';
import { ColorBlockGrid } from '../ui/ColorBlockGrid';

export function HeroSection() {
  const prefersReducedMotion = useReducedMotion();

  // Color palette for title letters
  const titleColors = [
    '#6B4EFF', '#FF3B5C', '#FF6B00', '#FFEB3B', '#00E676', 
    '#FFC107', '#E040FB', '#FF5722', '#9C27B0', '#DC143C',
    '#00BCD4', '#3F51B5', '#673AB7', '#F44336', '#4CAF50',
  ];

  // State for tracking letter colors
  const title = 'Austin Carson';
  const [letterColors, setLetterColors] = useState<string[]>(
    Array(title.length).fill('#000000')
  );

  // Function to get random color
  const getRandomColor = (currentColor: string): string => {
    const availableColors = titleColors.filter(c => c !== currentColor);
    return availableColors[Math.floor(Math.random() * availableColors.length)];
  };

  // Handle letter click
  const handleLetterClick = (index: number) => {
    const newColors = [...letterColors];
    newColors[index] = getRandomColor(letterColors[index]);
    setLetterColors(newColors);
  };

  const scrollToWork = () => {
    const workSection = document.getElementById('work');
    if (workSection) {
      workSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Detect mobile for optimized animations
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;
  const duration = isMobile ? MOBILE_DURATION : DURATION;

  // Animation variants - mastercraft smooth with GPU acceleration
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : (isMobile ? STAGGER.normal : STAGGER.slow),
        delayChildren: prefersReducedMotion ? 0 : (isMobile ? 0.1 : 0.2),
      },
    },
  };

  const contentVariants = {
    hidden: { 
      opacity: 0, 
      y: prefersReducedMotion ? 0 : (isMobile ? 16 : 24),
      filter: prefersReducedMotion ? 'none' : (isMobile ? 'blur(6px)' : 'blur(10px)'),
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: prefersReducedMotion ? duration.fast : duration.slowest,
        ease: EASE_OUT_EXPO,
      },
    },
  };

  const descriptionVariants = {
    hidden: { 
      opacity: 0,
      y: prefersReducedMotion ? 0 : (isMobile ? 12 : 18),
      filter: prefersReducedMotion ? 'none' : (isMobile ? 'blur(4px)' : 'blur(8px)'),
    },
    visible: {
      opacity: 0.6,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: prefersReducedMotion ? duration.fast : (isMobile ? duration.slower : 1.6),
        ease: EASE_OUT_EXPO,
      },
    },
  };

  const buttonVariants = {
    hidden: { 
      opacity: 0,
      y: prefersReducedMotion ? 0 : (isMobile ? 10 : 14),
      filter: prefersReducedMotion ? 'none' : (isMobile ? 'blur(3px)' : 'blur(6px)'),
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: prefersReducedMotion ? duration.fast : duration.slowest,
        ease: EASE_OUT_QUART,
      },
    },
  };

  return (
    <section 
      className="relative min-h-screen" 
      style={{ paddingTop: 'var(--header-height)' }}
      aria-label="Hero section"
    >
      <div className="container-main flex items-center" style={{ minHeight: 'calc(100vh - var(--header-height))' }}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 w-full"
          style={{ 
            gap: 'var(--space-16)',
            paddingTop: 'var(--space-20)',
            paddingBottom: 'var(--space-20)',
          }}
        >
          {/* Hero Content */}
          <div className="flex flex-col justify-center">
            <motion.h1 
              variants={contentVariants}
              style={{ 
                marginBottom: 'var(--space-6)',
                willChange: 'opacity, transform',
                transform: 'translateZ(0)',
              }}
            >
              {title.split('').map((letter, index) => (
                <motion.span
                  key={index}
                  style={{ 
                    color: letterColors[index],
                    cursor: letter === ' ' ? 'default' : 'pointer',
                    display: 'inline-block',
                    whiteSpace: letter === ' ' ? 'pre' : 'normal',
                  }}
                  animate={{ color: letterColors[index] }}
                  transition={{ duration: 0.3 }}
                  onClick={letter === ' ' ? undefined : () => handleLetterClick(index)}
                >
                  {letter === ' ' ? '\u00A0' : letter}
                </motion.span>
              ))}
            </motion.h1>
            
            <motion.p
              variants={descriptionVariants}
              className="max-w-[620px]"
              style={{ 
                marginBottom: 'var(--space-10)',
                opacity: 0.6,
                fontSize: isMobile ? '24px' : '32px',
                lineHeight: isMobile ? '36px' : '44px',
                fontWeight: 400,
                letterSpacing: '-0.02em',
                willChange: 'opacity, transform',
                transform: 'translateZ(0)',
              }}
            >
              Interface systems architect who builds production-ready design systems that combine technical precision with creative excellence
            </motion.p>

            <motion.button
              variants={buttonVariants}
              onClick={scrollToWork}
              whileHover={!isMobile ? { opacity: 0.6 } : undefined}
              whileTap={{ scale: 0.98, opacity: 0.6 }}
              transition={{ duration: isMobile ? 0.15 : 0.2, ease: EASE_OUT_QUART }}
              className="transition-opacity border-b border-foreground self-start cursor-pointer touch-manipulation no-highlight text-[17px]"
              style={{ 
                paddingBottom: 'var(--space-2)',
                fontWeight: 400,
                letterSpacing: '-0.01em',
                WebkitTapHighlightColor: 'transparent',
                willChange: 'opacity, transform',
              }}
              aria-label="Scroll to view selected work"
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