import { motion, useReducedMotion } from 'motion/react';
import { useMemo } from 'react';
import { EASE_OUT_EXPO, DURATION, STAGGER } from '../../lib/constants';

// Color palettes
const MONOCHROME_PALETTE = [
  '#0A0A0A', '#1A1A1A', '#2D2D2D', '#404040', '#595959',
  '#737373', '#8C8C8C', '#A6A6A6', '#BFBFBF', '#D9D9D9',
] as const;

const VIBRANT_PALETTE = [
  '#6B4EFF', '#FF3B5C', '#00F5FF', '#FFEB3B', '#00E676',
  '#FF6B00', '#E040FB', '#00BCD4', '#FFC107', '#7C4DFF',
] as const;

// Grid configuration
const GRID_ROWS = 4;
const GRID_COLS = 10;
const MONOCHROME_ROWS = 3;

function generateColorBlocks(): readonly string[] {
  const blocks: string[] = [];
  const monochromeCount = MONOCHROME_ROWS * GRID_COLS;
  
  // First 3 rows - monochrome
  for (let i = 0; i < monochromeCount; i++) {
    blocks.push(MONOCHROME_PALETTE[i % MONOCHROME_PALETTE.length]);
  }
  
  // Last row - vibrant colors
  for (let i = 0; i < GRID_COLS; i++) {
    blocks.push(VIBRANT_PALETTE[i]);
  }
  
  return blocks;
}

export function HeroSection() {
  const prefersReducedMotion = useReducedMotion();
  const colorBlocks = useMemo(() => generateColorBlocks(), []);

  const scrollToWork = () => {
    const workSection = document.getElementById('work');
    if (workSection) {
      workSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Perfect easing curves - refined for premium feel
  const perfectEase = [0.19, 1.0, 0.22, 1.0]; // Expo out - ultra smooth
  const butterEase = [0.25, 0.46, 0.45, 0.94]; // Quad out - buttery smooth
  const silkyEase = [0.33, 1, 0.68, 1]; // Circ out - silky smooth

  // Detect mobile for optimized animations
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;
  
  // Mobile-optimized durations (faster, less resource intensive)
  const mobileDuration = {
    content: 0.9,
    description: 1.0,
    button: 0.8,
    grid: 1.2,
    block: 0.6,
  };
  
  const desktopDuration = {
    content: 1.4,
    description: 1.6,
    button: 1.4,
    grid: 2.0,
    block: 0.8,
  };
  
  const duration = isMobile ? mobileDuration : desktopDuration;

  // Animation variants - optimized for performance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : (isMobile ? 0.08 : 0.12),
        delayChildren: prefersReducedMotion ? 0 : (isMobile ? 0.1 : 0.2),
      },
    },
  };

  const contentVariants = {
    hidden: { 
      opacity: 0, 
      y: prefersReducedMotion ? 0 : (isMobile ? 16 : 24),
      filter: prefersReducedMotion ? 'none' : (isMobile ? 'blur(6px)' : 'blur(12px)'),
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: prefersReducedMotion ? DURATION.fast : duration.content,
        ease: perfectEase,
      },
    },
  };

  const descriptionVariants = {
    hidden: { 
      opacity: 0,
      y: prefersReducedMotion ? 0 : (isMobile ? 12 : 16),
      filter: prefersReducedMotion ? 'none' : (isMobile ? 'blur(4px)' : 'blur(10px)'),
    },
    visible: {
      opacity: 0.6,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: prefersReducedMotion ? DURATION.fast : duration.description,
        ease: perfectEase,
      },
    },
  };

  const buttonVariants = {
    hidden: { 
      opacity: 0,
      y: prefersReducedMotion ? 0 : (isMobile ? 8 : 12),
      filter: prefersReducedMotion ? 'none' : (isMobile ? 'blur(3px)' : 'blur(8px)'),
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: prefersReducedMotion ? DURATION.fast : duration.button,
        ease: butterEase,
      },
    },
  };

  const gridVariants = {
    hidden: { 
      opacity: 0, 
      scale: prefersReducedMotion ? 1 : 0.96,
      filter: prefersReducedMotion ? 'none' : 'blur(16px)',
    },
    visible: {
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        duration: prefersReducedMotion ? DURATION.fast : duration.grid,
        ease: perfectEase,
        staggerChildren: prefersReducedMotion ? 0 : 0.01,
        delayChildren: prefersReducedMotion ? 0 : 0.6,
      },
    },
  };

  const blockVariants = {
    hidden: { 
      opacity: 0, 
      scale: prefersReducedMotion ? 1 : 0.94,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: prefersReducedMotion ? DURATION.fast : duration.block,
        ease: silkyEase,
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
            gap: 'var(--space-12)',
            paddingTop: 'var(--space-16)',
            paddingBottom: 'var(--space-16)',
          }}
        >
          {/* Hero Content */}
          <div className="flex flex-col justify-center">
            <motion.h1 
              variants={contentVariants}
              className="uppercase"
              style={{ 
                marginBottom: 'var(--space-8)',
                fontSize: 'clamp(48px, 8vw, 96px)',
                lineHeight: '1',
                letterSpacing: '-0.02em',
              }}
            >
              Austin Carson
            </motion.h1>
            
            <motion.p
              variants={descriptionVariants}
              className="max-w-[620px]"
              style={{ marginBottom: 'var(--space-12)' }}
            >
              Interface systems architect building production-ready design systems that bridge precision and creativity
            </motion.p>

            <motion.button
              variants={buttonVariants}
              onClick={scrollToWork}
              whileHover={!isMobile ? { opacity: 0.6 } : undefined}
              whileTap={{ scale: 0.98, opacity: 0.6 }}
              transition={{ duration: isMobile ? 0.15 : 0.2, ease: butterEase }}
              className="transition-opacity border-b border-foreground self-start cursor-pointer touch-manipulation"
              style={{ 
                paddingBottom: 'var(--space-1)',
                WebkitTapHighlightColor: 'transparent',
              }}
              aria-label="Scroll to view selected work"
            >
              View selected work
            </motion.button>
          </div>

          {/* Color Block Grid */}
          <motion.div
            variants={gridVariants}
            className="hidden lg:grid grid-cols-10 auto-rows-fr"
            style={{ gap: 'var(--space-6)' }}
            role="presentation"
            aria-hidden="true"
          >
            {colorBlocks.map((color, index) => {
              const row = Math.floor(index / GRID_COLS);
              const col = index % GRID_COLS;
              
              // Optimized color transition timing
              const waveDelay = (row * 0.3) + (col * 0.08);
              
              return (
                <motion.div
                  key={`color-block-${index}`}
                  variants={blockVariants}
                  animate={{
                    opacity: [1, 0.85, 0.92, 0.88, 1],
                  }}
                  transition={{
                    duration: 8,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "loop",
                    delay: waveDelay,
                  }}
                  className="aspect-square rounded-[6px]"
                  style={{ 
                    backgroundColor: color,
                    willChange: 'opacity',
                  }}
                  aria-hidden="true"
                />
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}