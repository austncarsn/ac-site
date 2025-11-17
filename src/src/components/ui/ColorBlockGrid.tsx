import { motion, useReducedMotion } from 'motion/react';
import { useMemo, useState } from 'react';
import { EASE_OUT_EXPO, EASE_OUT_CIRC, DURATION, MOBILE_DURATION, STAGGER } from '../../lib/constants';

// Color palettes
const MONOCHROME_PALETTE = [
  '#0A0A0A', '#1A1A1A', '#2D2D2D', '#404040', '#595959',
  '#737373', '#8C8C8C', '#A6A6A6', '#BFBFBF', '#D9D9D9',
] as const;

// Vibrant solid colors for bottom row
const VIBRANT_COLORS = [
  '#6B4EFF', // Purple
  '#FF3B5C', // Red/Pink
  '#FF6B00', // Orange
  '#FFEB3B', // Yellow
  '#00E676', // Green
  '#FFC107', // Amber
  '#E040FB', // Magenta
  '#FF5722', // Deep Orange
  '#9C27B0', // Deep Purple
  '#DC143C', // Crimson
] as const;

// Extended color pool for cycling through
const ALL_VIBRANT_COLORS = [
  '#6B4EFF', '#FF3B5C', '#FF6B00', '#FFEB3B', '#00E676', 
  '#FFC107', '#E040FB', '#FF5722', '#9C27B0', '#DC143C',
  '#00BCD4', '#3F51B5', '#673AB7', '#F44336', '#4CAF50',
  '#FFEB3B', '#FF9800', '#795548', '#607D8B', '#E91E63',
  '#009688', '#8BC34A', '#CDDC39', '#FFC107', '#FF5722',
] as const;

// Grid configuration
const GRID_COLS = 10;
const MONOCHROME_ROWS = 3;
const MOBILE_GRID_COLS = 6;

function generateColorBlocks(): readonly string[] {
  const blocks: string[] = [];
  const monochromeCount = MONOCHROME_ROWS * GRID_COLS;
  
  // First 3 rows - monochrome
  for (let i = 0; i < monochromeCount; i++) {
    blocks.push(MONOCHROME_PALETTE[i % MONOCHROME_PALETTE.length]);
  }
  
  // Last row - vibrant colors
  for (let i = 0; i < GRID_COLS; i++) {
    blocks.push(VIBRANT_COLORS[i]);
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
    blocks.push(VIBRANT_COLORS[i]);
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
  
  // State for tracking current colors of vibrant blocks
  const [vibrantColors, setVibrantColors] = useState<string[]>(() => 
    Array.from({ length: GRID_COLS }, (_, i) => VIBRANT_COLORS[i])
  );
  const [mobileVibrantColors, setMobileVibrantColors] = useState<string[]>(() => 
    Array.from({ length: MOBILE_GRID_COLS }, (_, i) => VIBRANT_COLORS[i])
  );
  
  const duration = isMobile ? MOBILE_DURATION : DURATION;

  // Function to get a random color different from current
  const getRandomColor = (currentColor: string): string => {
    const availableColors = ALL_VIBRANT_COLORS.filter(c => c !== currentColor);
    return availableColors[Math.floor(Math.random() * availableColors.length)];
  };

  // Handle color change for desktop
  const handleColorClick = (index: number) => {
    const newColors = [...vibrantColors];
    newColors[index] = getRandomColor(vibrantColors[index]);
    setVibrantColors(newColors);
  };

  // Handle color change for mobile
  const handleMobileColorClick = (index: number) => {
    const newColors = [...mobileVibrantColors];
    newColors[index] = getRandomColor(mobileVibrantColors[index]);
    setMobileVibrantColors(newColors);
  };

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
          
          // Use dynamic color for vibrant blocks
          const displayColor = isLastRow ? vibrantColors[col] : color;
          
          return (
            <motion.div
              key={`color-block-${index}`}
              variants={blockVariants}
              whileHover={isLastRow ? { scale: 1.05 } : undefined}
              whileTap={isLastRow ? { scale: 0.95 } : undefined}
              onClick={isLastRow ? () => handleColorClick(col) : undefined}
              animate={
                prefersReducedMotion
                  ? { background: displayColor }
                  : {
                      opacity: [1, 0.85, 0.92, 0.88, 1],
                      background: displayColor,
                    }
              }
              transition={
                prefersReducedMotion
                  ? { background: { duration: 0.4 } }
                  : {
                      opacity: {
                        duration: 8,
                        ease: "easeInOut",
                        repeat: Infinity,
                        repeatType: "loop",
                        delay: waveDelay,
                      },
                      background: { duration: 0.4 },
                    }
              }
              className={`aspect-square ${isLastRow ? 'cursor-pointer' : ''}`}
              style={{ 
                background: displayColor,
                willChange: prefersReducedMotion ? 'auto' : 'opacity',
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
          
          // Use dynamic color for vibrant blocks
          const displayColor = isLastRow ? mobileVibrantColors[col] : color;
          
          return (
            <motion.div
              key={`mobile-color-block-${index}`}
              variants={blockVariants}
              whileHover={isLastRow ? { scale: 1.05 } : undefined}
              whileTap={isLastRow ? { scale: 0.95 } : undefined}
              onClick={isLastRow ? () => handleMobileColorClick(col) : undefined}
              animate={
                prefersReducedMotion
                  ? { background: displayColor }
                  : {
                      opacity: [1, 0.85, 0.92, 0.88, 1],
                      background: displayColor,
                    }
              }
              transition={
                prefersReducedMotion
                  ? { background: { duration: 0.4 } }
                  : {
                      opacity: {
                        duration: 8,
                        ease: "easeInOut",
                        repeat: Infinity,
                        repeatType: "loop",
                        delay: waveDelay,
                      },
                      background: { duration: 0.4 },
                    }
              }
              className={`aspect-square ${isLastRow ? 'cursor-pointer' : ''}`}
              style={{ 
                background: displayColor,
                willChange: prefersReducedMotion ? 'auto' : 'opacity',
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