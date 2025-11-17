import { motion, useReducedMotion } from 'motion/react';
import { useMemo } from 'react';
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
  
  const duration = isMobile ? MOBILE_DURATION : DURATION;

  // Function to calculate complementary color
  const getComplementaryColor = (hexColor: string): string => {
    // Remove # if present
    const hex = hexColor.replace('#', '');
    
    // Convert hex to RGB
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    
    // Calculate complementary color (rotate hue by 180 degrees)
    // Convert RGB to HSL
    const rNorm = r / 255;
    const gNorm = g / 255;
    const bNorm = b / 255;
    
    const max = Math.max(rNorm, gNorm, bNorm);
    const min = Math.min(rNorm, gNorm, bNorm);
    const delta = max - min;
    
    let h = 0;
    
    if (delta !== 0) {
      if (max === rNorm) {
        h = ((gNorm - bNorm) / delta) % 6;
      } else if (max === gNorm) {
        h = (bNorm - rNorm) / delta + 2;
      } else {
        h = (rNorm - gNorm) / delta + 4;
      }
      h *= 60;
      if (h < 0) h += 360;
    }
    
    const l = (max + min) / 2;
    const s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    
    // Rotate hue by 180 degrees for complement
    const compH = (h + 180) % 360;
    
    // Convert back to RGB with same saturation and lightness
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs(((compH / 60) % 2) - 1));
    const m = l - c / 2;
    
    let rComp = 0;
    let gComp = 0;
    let bComp = 0;
    
    if (compH >= 0 && compH < 60) {
      rComp = c; gComp = x; bComp = 0;
    } else if (compH >= 60 && compH < 120) {
      rComp = x; gComp = c; bComp = 0;
    } else if (compH >= 120 && compH < 180) {
      rComp = 0; gComp = c; bComp = x;
    } else if (compH >= 180 && compH < 240) {
      rComp = 0; gComp = x; bComp = c;
    } else if (compH >= 240 && compH < 300) {
      rComp = x; gComp = 0; bComp = c;
    } else {
      rComp = c; gComp = 0; bComp = x;
    }
    
    const rFinal = Math.round((rComp + m) * 255);
    const gFinal = Math.round((gComp + m) * 255);
    const bFinal = Math.round((bComp + m) * 255);
    
    // Return as rgba with reduced opacity for subtle effect
    return `rgba(${rFinal}, ${gFinal}, ${bFinal}, 0.2)`;
  };

  // Handle background color change
  const handleColorClick = (color: string) => {
    document.body.style.backgroundColor = color;
    document.body.style.transition = 'background-color 0.6s ease';
    
    // Set complementary border color as CSS variable
    const complementary = getComplementaryColor(color);
    document.documentElement.style.setProperty('--border', complementary);
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
              className={`aspect-square ${isLastRow ? 'cursor-pointer' : ''}`}
              style={{ 
                background: color,
                willChange: prefersReducedMotion ? 'auto' : 'opacity',
                transform: 'translateZ(0)',
                borderRadius: '6px',
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
          gap: 'var(--space-4)',
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
              className={`aspect-square ${isLastRow ? 'cursor-pointer' : ''}`}
              style={{ 
                background: color,
                willChange: prefersReducedMotion ? 'auto' : 'opacity',
                transform: 'translateZ(0)',
                borderRadius: '6px',
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