import { motion, useReducedMotion } from 'motion/react';
import { useMemo } from 'react';
import { EASE_OUT_EXPO, EASE_OUT_CIRC, DURATION, MOBILE_DURATION, STAGGER } from '../../lib/constants';

// Color palettes
const MONOCHROME_PALETTE = [
  '#0A0A0A', '#1A1A1A', '#2D2D2D', '#404040', '#595959',
  '#737373', '#8C8C8C', '#A6A6A6', '#BFBFBF', '#D9D9D9',
] as const;

// Gradient variations for each vibrant color (lava lamp effect)
const VIBRANT_GRADIENTS = [
  ['#6B4EFF', '#8B6FFF', '#5940CC'], // Purple variations
  ['#FF3B5C', '#FF5C7A', '#E0305A'], // Red/Pink variations
  ['#FF6B00', '#FF8533', '#E66100'], // Orange variations
  ['#FFEB3B', '#FFF066', '#E6D435'], // Yellow variations
  ['#00E676', '#33EB8F', '#00CC6A'], // Green variations
  ['#FFC107', '#FFCD38', '#E6AD06'], // Amber variations
  ['#E040FB', '#E666FC', '#CC3AE0'], // Magenta variations
  ['#FF5722', '#FF7043', '#E64A19'], // Deep Orange variations
  ['#9C27B0', '#AB47BC', '#8E24AA'], // Deep Purple variations
  ['#FF1744', '#FF4569', '#E6143D'], // Crimson variations
] as const;

// Grid configuration
const GRID_COLS = 10;
const MONOCHROME_ROWS = 3;
const MOBILE_GRID_COLS = 6;

// Unique animation patterns for each vibrant block
function getUniqueAnimation(colIndex: number) {
  const animations = [
    // Block 0 (Purple): Circular gradient movement
    {
      backgroundPosition: ['20% 20%', '80% 80%', '20% 80%', '80% 20%', '20% 20%'],
      backgroundSize: ['150% 150%', '200% 200%', '150% 150%'],
      duration: 8,
    },
    // Block 1 (Red): Diagonal sweep
    {
      backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
      backgroundSize: ['130% 130%', '180% 180%', '130% 130%'],
      duration: 10,
    },
    // Block 2 (Cyan): Pulsing center
    {
      backgroundPosition: ['50% 50%', '50% 50%'],
      backgroundSize: ['120% 120%', '220% 220%', '120% 120%'],
      duration: 7,
    },
    // Block 3 (Yellow): Wave motion
    {
      backgroundPosition: ['30% 50%', '70% 50%', '50% 30%', '50% 70%', '30% 50%'],
      backgroundSize: ['160% 160%', '190% 190%', '160% 160%'],
      duration: 9,
    },
    // Block 4 (Green): Corner orbit
    {
      backgroundPosition: ['10% 10%', '90% 10%', '90% 90%', '10% 90%', '10% 10%'],
      backgroundSize: ['140% 140%', '170% 170%', '140% 140%'],
      duration: 11,
    },
    // Block 5 (Orange): Breathing pulse
    {
      backgroundPosition: ['50% 50%'],
      backgroundSize: ['100% 100%', '250% 250%', '100% 100%'],
      duration: 6,
    },
    // Block 6 (Magenta): Figure-8 path
    {
      backgroundPosition: ['30% 30%', '70% 30%', '70% 70%', '30% 70%', '30% 30%'],
      backgroundSize: ['145% 145%', '185% 185%', '145% 145%'],
      duration: 12,
    },
    // Block 7 (Teal): Smooth drift
    {
      backgroundPosition: ['0% 50%', '50% 0%', '100% 50%', '50% 100%', '0% 50%'],
      backgroundSize: ['155% 155%', '195% 195%', '155% 155%'],
      duration: 10.5,
    },
    // Block 8 (Amber): Cross pattern
    {
      backgroundPosition: ['50% 20%', '80% 50%', '50% 80%', '20% 50%', '50% 20%'],
      backgroundSize: ['135% 135%', '175% 175%', '135% 135%'],
      duration: 8.5,
    },
    // Block 9 (Indigo): Spiral motion
    {
      backgroundPosition: ['40% 40%', '60% 40%', '60% 60%', '40% 60%', '40% 40%'],
      backgroundSize: ['125% 125%', '210% 210%', '125% 125%'],
      duration: 9.5,
    },
  ];
  
  return animations[colIndex % animations.length];
}

function generateColorBlocks(): readonly string[] {
  const blocks: string[] = [];
  const monochromeCount = MONOCHROME_ROWS * GRID_COLS;
  
  // First 3 rows - monochrome
  for (let i = 0; i < monochromeCount; i++) {
    blocks.push(MONOCHROME_PALETTE[i % MONOCHROME_PALETTE.length]);
  }
  
  // Last row - vibrant colors
  for (let i = 0; i < GRID_COLS; i++) {
    blocks.push(VIBRANT_GRADIENTS[i][0]);
  }
  
  return blocks;
}

function generateMobileColorBlocks(): readonly string[] {
  const blocks: string[] = [];
  
  // First row - monochrome (6 blocks)
  for (let i = 0; i < MOBILE_GRID_COLS; i++) {
    blocks.push(MONOCHROME_PALETTE[i % MONOCHROME_PALETTE.length]);
  }
  
  // Second row - vibrant colors (6 blocks)
  for (let i = 0; i < MOBILE_GRID_COLS; i++) {
    blocks.push(VIBRANT_GRADIENTS[i][0]);
  }
  
  return blocks;
}

interface ColorBlockGridProps {
  isMobile?: boolean;
}

export function ColorBlockGrid({ isMobile = false }: ColorBlockGridProps) {
  const prefersReducedMotion = useReducedMotion();
  const colorBlocks = useMemo(() => generateColorBlocks(), []);
  const mobileColorBlocks = useMemo(() => generateMobileColorBlocks(), []);
  
  const duration = isMobile ? MOBILE_DURATION : DURATION;

  const gridVariants = {
    hidden: { 
      opacity: 0, 
      scale: prefersReducedMotion ? 1 : 0.96,
      filter: prefersReducedMotion ? 'none' : (isMobile ? 'blur(10px)' : 'blur(16px)'),
    },
    visible: {
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        duration: prefersReducedMotion ? duration.fast : (isMobile ? duration.slower : 1.8),
        ease: EASE_OUT_EXPO,
        staggerChildren: prefersReducedMotion ? 0 : STAGGER.tight,
        delayChildren: prefersReducedMotion ? 0 : (isMobile ? 0.4 : 0.6),
      },
    },
  };

  const blockVariants = {
    hidden: { 
      opacity: 0, 
      scale: prefersReducedMotion ? 1 : 0.92,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: prefersReducedMotion ? duration.fast : duration.slow,
        ease: EASE_OUT_CIRC,
      },
    },
  };

  return (
    <>
      {/* Desktop Color Block Grid */}
      <motion.div
        variants={gridVariants}
        className="hidden lg:grid grid-cols-10 auto-rows-fr"
        style={{ 
          gap: 'var(--space-6)',
          willChange: 'opacity, transform',
          transform: 'translateZ(0)',
        }}
        role="presentation"
        aria-hidden="true"
      >
        {colorBlocks.map((color, index) => {
          const row = Math.floor(index / GRID_COLS);
          const col = index % GRID_COLS;
          const isLastRow = row === MONOCHROME_ROWS;
          
          // Optimized wave animation
          const waveDelay = (row * 0.25) + (col * 0.06);
          
          // Generate unique animation params and gradient for each vibrant block
          const animation = isLastRow ? getUniqueAnimation(col) : undefined;
          const gradientColors = isLastRow ? VIBRANT_GRADIENTS[col] : null;
          const gradient = gradientColors 
            ? `radial-gradient(circle at 30% 30%, ${gradientColors[0]}, ${gradientColors[1]}, ${gradientColors[2]})`
            : null;
          
          // Create subtle vertical gradient for vibrant colors (lighter top, darker bottom)
          const verticalGradient = isLastRow
            ? `linear-gradient(180deg, rgba(255, 255, 255, 0.15) 0%, rgba(0, 0, 0, 0.15) 100%)`
            : null;
          
          // Combine gradients for vibrant blocks
          const finalBackground = isLastRow && gradient && verticalGradient
            ? `${verticalGradient}, ${gradient}`
            : color;
          
          return (
            <motion.div
              key={`color-block-${index}`}
              variants={blockVariants}
              animate={
                prefersReducedMotion
                  ? undefined
                  : isLastRow && animation
                  ? {
                      backgroundPosition: animation.backgroundPosition,
                      backgroundSize: animation.backgroundSize,
                    }
                  : {
                      opacity: [1, 0.85, 0.92, 0.88, 1],
                    }
              }
              transition={
                prefersReducedMotion
                  ? undefined
                  : isLastRow && animation
                  ? {
                      backgroundPosition: {
                        duration: animation.duration,
                        ease: "easeInOut",
                        repeat: Infinity,
                        repeatType: "loop",
                        delay: waveDelay,
                      },
                      backgroundSize: {
                        duration: animation.duration * 0.8,
                        ease: "easeInOut",
                        repeat: Infinity,
                        repeatType: "reverse",
                        delay: waveDelay * 0.5,
                      },
                    }
                  : {
                      duration: 8,
                      ease: "easeInOut",
                      repeat: Infinity,
                      repeatType: "loop",
                      delay: waveDelay,
                    }
              }
              className="aspect-square"
              style={{ 
                background: finalBackground,
                willChange: prefersReducedMotion ? 'auto' : isLastRow ? 'background-position, background-size' : 'opacity',
                transform: 'translateZ(0)',
                borderRadius: '8px',
                border: '1px solid rgba(0, 0, 0, 0.1)',
              }}
              aria-hidden="true"
            />
          );
        })}
      </motion.div>

      {/* Mobile Color Block Grid */}
      <motion.div
        variants={gridVariants}
        className="lg:hidden grid grid-cols-6 auto-rows-fr"
        style={{ 
          gap: 'var(--space-6)',
          willChange: 'opacity, transform',
          transform: 'translateZ(0)',
        }}
        role="presentation"
        aria-hidden="true"
      >
        {mobileColorBlocks.map((color, index) => {
          const row = Math.floor(index / MOBILE_GRID_COLS);
          const col = index % MOBILE_GRID_COLS;
          const isLastRow = row === 1; // Second row in mobile (vibrant colors)
          
          // Optimized wave animation
          const waveDelay = (row * 0.25) + (col * 0.06);
          
          // Generate unique animation params and gradient for each vibrant block
          const animation = isLastRow ? getUniqueAnimation(col) : undefined;
          const gradientColors = isLastRow ? VIBRANT_GRADIENTS[col] : null;
          const gradient = gradientColors 
            ? `radial-gradient(circle at 30% 30%, ${gradientColors[0]}, ${gradientColors[1]}, ${gradientColors[2]})`
            : null;
          
          // Create subtle vertical gradient for vibrant colors (lighter top, darker bottom)
          const verticalGradient = isLastRow
            ? `linear-gradient(180deg, rgba(255, 255, 255, 0.15) 0%, rgba(0, 0, 0, 0.15) 100%)`
            : null;
          
          // Combine gradients for vibrant blocks
          const finalBackground = isLastRow && gradient && verticalGradient
            ? `${verticalGradient}, ${gradient}`
            : color;
          
          return (
            <motion.div
              key={`mobile-color-block-${index}`}
              variants={blockVariants}
              animate={
                prefersReducedMotion
                  ? undefined
                  : isLastRow && animation
                  ? {
                      backgroundPosition: animation.backgroundPosition,
                      backgroundSize: animation.backgroundSize,
                    }
                  : {
                      opacity: [1, 0.85, 0.92, 0.88, 1],
                    }
              }
              transition={
                prefersReducedMotion
                  ? undefined
                  : isLastRow && animation
                  ? {
                      backgroundPosition: {
                        duration: animation.duration,
                        ease: "easeInOut",
                        repeat: Infinity,
                        repeatType: "loop",
                        delay: waveDelay,
                      },
                      backgroundSize: {
                        duration: animation.duration * 0.8,
                        ease: "easeInOut",
                        repeat: Infinity,
                        repeatType: "reverse",
                        delay: waveDelay * 0.5,
                      },
                    }
                  : {
                      duration: 8,
                      ease: "easeInOut",
                      repeat: Infinity,
                      repeatType: "loop",
                      delay: waveDelay,
                    }
              }
              className="aspect-square"
              style={{ 
                background: finalBackground,
                willChange: prefersReducedMotion ? 'auto' : isLastRow ? 'background-position, background-size' : 'opacity',
                transform: 'translateZ(0)',
                borderRadius: '8px',
                border: '1px solid rgba(0, 0, 0, 0.1)',
              }}
              aria-hidden="true"
            />
          );
        })}
      </motion.div>
    </>
  );
}