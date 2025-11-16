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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : STAGGER.slow,
        delayChildren: prefersReducedMotion ? 0 : 0.2,
      },
    },
  };

  const contentVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? DURATION.fast : DURATION.normal,
        ease: EASE_OUT_EXPO,
      },
    },
  };

  const descriptionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 0.6,
      transition: {
        duration: prefersReducedMotion ? DURATION.fast : DURATION.normal,
        delay: prefersReducedMotion ? 0 : 0.2,
      },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: prefersReducedMotion ? DURATION.fast : DURATION.normal,
        delay: prefersReducedMotion ? 0 : 0.4,
      },
    },
  };

  const gridVariants = {
    hidden: { opacity: 0, scale: prefersReducedMotion ? 1 : 0.96 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: prefersReducedMotion ? DURATION.fast : DURATION.slow,
        delay: prefersReducedMotion ? 0 : 0.3,
        ease: EASE_OUT_EXPO,
        staggerChildren: prefersReducedMotion ? 0 : 0.008,
        delayChildren: prefersReducedMotion ? 0 : 0.4,
      },
    },
  };

  const blockVariants = {
    hidden: { opacity: 0, scale: prefersReducedMotion ? 1 : 0.85 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: prefersReducedMotion ? DURATION.fast : 0.4,
        ease: EASE_OUT_EXPO,
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
              style={{ marginBottom: 'var(--space-8)' }}
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
              whileHover={{ opacity: 0.6 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="transition-opacity duration-300 border-b border-foreground self-start cursor-pointer"
              style={{ paddingBottom: 'var(--space-1)' }}
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
              
              // Create subtle color variations for smooth transitions
              const createColorVariations = (baseColor: string) => {
                // Lighten and darken variations
                return [
                  baseColor,
                  baseColor + 'f2', // slightly transparent
                  baseColor + 'e6', // more transparent
                  baseColor + 'f2',
                  baseColor,
                ];
              };
              
              const colorVariations = createColorVariations(color);
              const animationDelay = (row * 0.2) + (col * 0.1);
              
              return (
                <motion.div
                  key={`color-block-${index}`}
                  variants={blockVariants}
                  animate={{
                    backgroundColor: colorVariations,
                  }}
                  transition={{
                    duration: 6,
                    ease: "easeInOut",
                    repeat: Infinity,
                    delay: animationDelay,
                  }}
                  className="aspect-square rounded-[6px]"
                  style={{ 
                    backgroundColor: color,
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