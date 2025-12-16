import { motion, useReducedMotion } from 'motion/react';
import { useMemo, useCallback, useState } from 'react';
import { EASE_OUT_EXPO, EASE_OUT_CIRC, DURATION, MOBILE_DURATION, STAGGER } from '../../lib/constants';
import { MONOCHROME_PALETTE, getComplementaryColor } from '../../lib/colors';

// Grid configuration constants
const GRID_COLS = 10;
const MONOCHROME_ROWS = 3;
const MOBILE_GRID_COLS = 6;

/**
 * Generates controlled, subtle variations for each circle
 * Creates a calibrated, high-end feel - not random, but alive
 * @param index - Position in grid
 * @param totalCount - Total number of circles
 * @returns Variation object with size, offset, and shadow adjustments
 */
function getCircleVariation(index: number, totalCount: number) {
  // Use deterministic variation based on position
  // Creates a pattern that feels intentional, not mechanical
  const normalizedIndex = index / totalCount;
  
  // Size variation (±4-6% = 38px to 42.4px from base 40px)
  // Use sine wave for smooth, organic distribution
  const sizeVariation = Math.sin(index * 0.618) * 0.05; // Golden ratio for pleasing distribution
  const sizeFactor = 1 + sizeVariation;
  
  // Vertical offset (0-2px) - only on select circles
  // Use modulo pattern to create rhythm
  const hasOffset = (index % 7 === 0 || index % 11 === 0); // Prime numbers for irregular pattern
  const verticalOffset = hasOffset ? Math.sin(index * 0.5) * 2 : 0;
  
  // Shadow blur variation (slight differences in softness)
  // Subtle variation in shadow diffusion
  const shadowBlurVariation = 2 + (Math.cos(index * 0.5) * 1.5); // 0.5px to 3.5px range
  const shadowSpreadVariation = 4 + (Math.sin(index * 0.8) * 2); // 2px to 6px range
  
  // Inner shadow intensity variation
  const innerShadowOpacity = 0.06 + (Math.sin(index * 1.2) * 0.02); // 0.04 to 0.08
  const innerHighlightOpacity = 0.35 + (Math.cos(index * 0.9) * 0.1); // 0.25 to 0.45
  
  return {
    sizeFactor,
    verticalOffset,
    shadowBlur: shadowBlurVariation,
    shadowSpread: shadowSpreadVariation,
    innerShadowOpacity,
    innerHighlightOpacity,
  };
}

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
 * Enhanced with year 2050 aesthetic: liquid morphing, ripple effects, holographic depth
 */
export function ColorBlockGrid({ isMobile = false }: ColorBlockGridProps) {
  const prefersReducedMotion = useReducedMotion();
  const colorBlocks = useMemo(() => generateColorBlocks(), []);
  const mobileColorBlocks = useMemo(() => generateMobileColorBlocks(), []);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [clickedIndex, setClickedIndex] = useState<number | null>(null);
  
  const duration = isMobile ? MOBILE_DURATION : DURATION;

  /**
   * Handles color block click - changes background and border colors with ripple effect
   */
  const handleColorClick = useCallback((color: string, index: number) => {
    document.body.style.backgroundColor = color;
    document.body.style.transition = 'background-color 0.6s ease';
    
    // Set complementary border color as CSS variable
    const complementary = getComplementaryColor(color);
    document.documentElement.style.setProperty('--border', complementary);
    
    // Trigger ripple animation
    setClickedIndex(index);
    setTimeout(() => setClickedIndex(null), 1000);
  }, []);

  const containerVariants = {
    hidden: { 
      opacity: 0, 
      scale: prefersReducedMotion ? 1 : 0.96,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: prefersReducedMotion ? duration.fast : (isMobile ? duration.slower : 1.8),
        ease: EASE_OUT_EXPO,
        delayChildren: prefersReducedMotion ? 0 : (isMobile ? 0.1 : 0.2),
        staggerChildren: prefersReducedMotion ? 0 : STAGGER.slower,
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
        variants={containerVariants}
        className="hidden lg:grid grid-cols-10 auto-rows-fr relative"
        style={{ 
          gap: '8px',
          willChange: 'opacity, transform',
          transform: 'translateZ(0)',
          transformStyle: 'preserve-3d',
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
          
          const variation = getCircleVariation(index, colorBlocks.length);
          
          // Calculate distance from clicked circle for ripple effect
          const isRippling = clickedIndex !== null;
          const clickedRow = clickedIndex !== null ? Math.floor(clickedIndex / GRID_COLS) : 0;
          const clickedCol = clickedIndex !== null ? clickedIndex % GRID_COLS : 0;
          const distance = Math.sqrt(Math.pow(row - clickedRow, 2) + Math.pow(col - clickedCol, 2));
          const rippleDelay = distance * 0.05;
          
          return (
            <motion.div
              key={`color-block-${index}`}
              variants={blockVariants}
              onClick={isLastRow ? () => handleColorClick(color, index) : undefined}
              onHoverStart={() => !isMobile && setHoveredIndex(index)}
              onHoverEnd={() => !isMobile && setHoveredIndex(null)}
              animate={
                prefersReducedMotion
                  ? undefined
                  : {
                      opacity: isRippling && index !== clickedIndex
                        ? [1, 0.6, 1]
                        : [1, 0.85, 0.92, 0.88, 1],
                      scale: isRippling && index !== clickedIndex
                        ? [1, 0.95, 1]
                        : hoveredIndex === index && isLastRow
                        ? 1.15
                        : 1,
                      rotateZ: hoveredIndex === index && isLastRow ? [0, 5, -5, 0] : 0,
                    }
              }
              transition={
                prefersReducedMotion
                  ? undefined
                  : isRippling && index !== clickedIndex
                  ? {
                      opacity: { duration: 0.4, delay: rippleDelay },
                      scale: { duration: 0.4, delay: rippleDelay },
                    }
                  : hoveredIndex === index && isLastRow
                  ? {
                      scale: { duration: 0.3, ease: EASE_OUT_CIRC },
                      rotateZ: { duration: 0.6, ease: "easeInOut" },
                    }
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
              className={`${isLastRow ? 'cursor-pointer' : ''} relative`}
              style={{ 
                background: color,
                width: `${40 * variation.sizeFactor}px`,
                height: `${40 * variation.sizeFactor}px`,
                willChange: prefersReducedMotion ? 'auto' : 'opacity, transform',
                transform: `translateZ(${isLastRow ? '20px' : '0'}) translateY(${variation.verticalOffset}px)`,
                borderRadius: '50%',
                // Enhanced shadows for depth and holographic feel
                boxShadow: `
                  inset ${variation.shadowBlur}px ${variation.shadowBlur}px ${variation.shadowSpread}px rgba(0, 0, 0, ${variation.innerShadowOpacity}),
                  inset -1px -1px 4px rgba(255, 255, 255, ${variation.innerHighlightOpacity}),
                  ${isLastRow ? '0 8px 20px rgba(182, 207, 255, 0.15), 0 2px 8px rgba(182, 207, 255, 0.1)' : '0 1px 3px rgba(0, 0, 0, 0.05)'}
                `,
                transition: 'box-shadow 0.3s ease',
              }}
              aria-hidden="true"
            >
              {/* Holographic ring on hover for interactive circles */}
              {!prefersReducedMotion && isLastRow && hoveredIndex === index && (
                <motion.div
                  className="absolute inset-0 rounded-full pointer-events-none"
                  initial={{ scale: 1, opacity: 0 }}
                  animate={{ scale: 1.4, opacity: [0, 0.6, 0] }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  style={{
                    border: '2px solid rgba(182, 207, 255, 0.6)',
                    boxShadow: '0 0 20px rgba(182, 207, 255, 0.4)',
                  }}
                />
              )}
              
              {/* Ripple effect on click */}
              {!prefersReducedMotion && clickedIndex === index && (
                <>
                  <motion.div
                    className="absolute inset-0 rounded-full pointer-events-none"
                    initial={{ scale: 1, opacity: 0.8 }}
                    animate={{ scale: 2.5, opacity: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    style={{
                      border: '2px solid rgba(182, 207, 255, 0.8)',
                    }}
                  />
                  <motion.div
                    className="absolute inset-0 rounded-full pointer-events-none"
                    initial={{ scale: 1, opacity: 0.6 }}
                    animate={{ scale: 2, opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                    style={{
                      border: '3px solid rgba(182, 207, 255, 0.6)',
                      boxShadow: '0 0 30px rgba(182, 207, 255, 0.5)',
                    }}
                  />
                </>
              )}
            </motion.div>
          );
        })}
      </motion.div>

      {/* Mobile Color Block Grid */}
      <motion.div
        variants={containerVariants}
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
          
          const variation = getCircleVariation(index, mobileColorBlocks.length);
          
          return (
            <motion.div
              key={`mobile-color-block-${index}`}
              variants={blockVariants}
              onClick={isLastRow ? () => handleColorClick(color, index) : undefined}
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
                width: `${40 * variation.sizeFactor}px`,
                height: `${40 * variation.sizeFactor}px`,
                willChange: prefersReducedMotion ? 'auto' : 'opacity',
                transform: `translateZ(0) translateY(${variation.verticalOffset}px)`,
                borderRadius: '50%', // Circle shape
                // Subtle matte inset with gentle variation - soft, tactile, not glossy
                boxShadow: `
                  inset ${variation.shadowBlur}px ${variation.shadowBlur}px ${variation.shadowSpread}px rgba(0, 0, 0, ${variation.innerShadowOpacity}),
                  inset -1px -1px 4px rgba(255, 255, 255, ${variation.innerHighlightOpacity})
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