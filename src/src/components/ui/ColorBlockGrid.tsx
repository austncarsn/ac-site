import { motion, useReducedMotion } from 'motion/react';
import { useMemo, useCallback } from 'react';
import { EASE_OUT_EXPO, EASE_OUT_CIRC, DURATION, MOBILE_DURATION, STAGGER } from '../../lib/constants';
import { VIBRANT_COLORS, MONOCHROME_PALETTE, getComplementaryColor } from '../../lib/colors';

// Grid configuration constants
const GRID_COLS = 10;
const MONOCHROME_ROWS = 3;
const MOBILE_GRID_COLS = 6;

/**
 * Generates color blocks for desktop grid
 * @returns Array of color strings (3 rows monochrome + 1 row vibrant)
 */
function generateColorBlocks(): readonly string[] {
  const blocks: string[] = [];
  const monochromeCount = MONOCHROME_ROWS * GRID_COLS;
  
  // First 3 rows - off-white monochrome
  for (let i = 0; i < monochromeCount; i++) {
    blocks.push(MONOCHROME_PALETTE[i % MONOCHROME_PALETTE.length]);
  }
  
  // Last row - gradient from dark pastel blue to light off-white
  const gradientColors = [
    '#F8F8F8', // Off-white
    '#F4F4F4', // Light Off-white
    '#ECFAFF', // Lightest Blue
    '#DAEFFF', // Pale Blue
    '#C8DFFF', // Very Light Blue
    '#B6CFFF', // Lighter Blue
    '#92AFEE', // Medium Light Blue
    '#6E8FCA', // Mid Blue
    '#5C7FB8', // Medium Dark Blue
    '#4A6FA5', // Dark Pastel Blue
  ];
  
  for (let i = 0; i < GRID_COLS; i++) {
    blocks.push(gradientColors[i]);
  }
  
  return blocks;
}

/**
 * Generates color blocks for mobile grid
 * @returns Array of color strings (1 row monochrome + 1 row vibrant)
 */
function generateMobileColorBlocks(): readonly string[] {
  const blocks: string[] = [];
  
  // First row - warm near-white to soft neutral tones (6 blocks)
  const topRowColors = [
    '#FDFCFB', // Warm almost white
    '#F9F8F7', // Very soft warm gray
    '#F5F4F2', // Soft warm light gray
    '#F1F0ED', // Warm light gray
    '#EDEBE8', // Gentle warm gray
    '#E9E7E3', // Soft neutral gray
  ];
  
  for (let i = 0; i < MOBILE_GRID_COLS; i++) {
    blocks.push(topRowColors[i]);
  }
  
  // Second row - quiet gradient: lightest off-white/pale blue → deeper pastel blues (6 blocks)
  const gradientColors = [
    '#F2F6FA', // Lightest off-white with hint of blue
    '#E5EDF5', // Very pale blue
    '#D8E4F0', // Pale blue
    '#C3D5E8', // Soft blue
    '#ADC6DF', // Gentle mid blue
    '#97B7D6', // Deeper pastel blue
  ];
  
  for (let i = 0; i < MOBILE_GRID_COLS; i++) {
    blocks.push(gradientColors[i]);
  }
  
  return blocks;
}

interface ColorBlockGridProps {
  /** Whether to use mobile layout */
  isMobile?: boolean;
}

/**
 * ColorBlockGrid - Interactive grid of color blocks in hero section
 * Features ambient wave animation and clickable vibrant colors that change page background
 */
export function ColorBlockGrid({ isMobile = false }: ColorBlockGridProps) {
  const prefersReducedMotion = useReducedMotion();
  const colorBlocks = useMemo(() => generateColorBlocks(), []);
  const mobileColorBlocks = useMemo(() => generateMobileColorBlocks(), []);
  
  const duration = isMobile ? MOBILE_DURATION : DURATION;

  /**
   * Handles color block click - changes background and border colors
   */
  const handleColorClick = useCallback((color: string) => {
    document.body.style.backgroundColor = color;
    document.body.style.transition = 'background-color 0.6s ease';
    
    // Set complementary border color as CSS variable
    const complementary = getComplementaryColor(color);
    document.documentElement.style.setProperty('--border', complementary);
  }, []);

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
          gap: '8px',
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
          
          return (
            <motion.div
              key={`color-block-${index}`}
              variants={blockVariants}
              onClick={isLastRow ? () => handleColorClick(color) : undefined}
              animate={
                prefersReducedMotion
                  ? undefined
                  : {
                      opacity: [1, 0.85, 0.92, 0.88, 1],
                    }
              }
              transition={
                prefersReducedMotion
                  ? undefined
                  : {
                      opacity: {
                        duration: 8,
                        ease: "easeInOut",
                        repeat: Infinity,
                        repeatType: "loop",
                        delay: waveDelay,
                      },
                    }
              }
              className={`${isLastRow ? 'cursor-pointer' : ''}`}
              style={{ 
                background: color,
                width: '40px',
                height: '40px',
                willChange: prefersReducedMotion ? 'auto' : 'opacity',
                transform: 'translateZ(0)',
                borderRadius: '50%', // Circle shape
                // Subtle matte inset - soft, tactile, not glossy
                boxShadow: `
                  inset 2px 2px 6px rgba(0, 0, 0, 0.08),
                  inset -1px -1px 4px rgba(255, 255, 255, 0.4)
                `,
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
          gap: '8px',
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
          
          return (
            <motion.div
              key={`mobile-color-block-${index}`}
              variants={blockVariants}
              onClick={isLastRow ? () => handleColorClick(color) : undefined}
              animate={
                prefersReducedMotion
                  ? undefined
                  : {
                      opacity: [1, 0.85, 0.92, 0.88, 1],
                    }
              }
              transition={
                prefersReducedMotion
                  ? undefined
                  : {
                      opacity: {
                        duration: 8,
                        ease: "easeInOut",
                        repeat: Infinity,
                        repeatType: "loop",
                        delay: waveDelay,
                      },
                    }
              }
              className={`${isLastRow ? 'cursor-pointer' : ''}`}
              style={{ 
                background: color,
                width: '40px',
                height: '40px',
                willChange: prefersReducedMotion ? 'auto' : 'opacity',
                transform: 'translateZ(0)',
                borderRadius: '50%', // Circle shape
                // Subtle matte inset - soft, tactile, not glossy
                boxShadow: `
                  inset 2px 2px 6px rgba(0, 0, 0, 0.08),
                  inset -1px -1px 4px rgba(255, 255, 255, 0.4)
                `,
              }}
              aria-hidden="true"
            />
          );
        })}
      </motion.div>
    </>
  );
}