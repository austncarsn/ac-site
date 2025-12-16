/**
 * Shared constants for consistent styling across the application
 */

// Premium animation easing curves - optimized for mastercraft smoothness
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const; // Ultra smooth, elegant
export const EASE_OUT_QUART = [0.25, 1, 0.5, 1] as const; // Buttery smooth
export const EASE_OUT_CIRC = [0.33, 1, 0.68, 1] as const; // Silky smooth
export const EASE_IN_OUT_CUBIC = [0.65, 0, 0.35, 1] as const; // Balanced smooth
export const SPRING_SMOOTH = {
  type: "spring" as const,
  stiffness: 260,
  damping: 26,
  mass: 0.8,
}; // Spring smooth

// Animation durations (seconds) - optimized for perceived smoothness
export const DURATION = {
  instant: 0.15,
  fast: 0.3,
  normal: 0.6,
  slow: 0.8,
  slower: 1.0,
  slowest: 1.4,
} as const;

// Mobile-optimized durations (faster for better performance)
export const MOBILE_DURATION = {
  instant: 0.12,
  fast: 0.25,
  normal: 0.45,
  slow: 0.6,
  slower: 0.8,
  slowest: 1.0,
} as const;

// Stagger delays for list animations (seconds)
export const STAGGER = {
  tight: 0.03,
  fast: 0.05,
  normal: 0.08,
  slow: 0.12,
  relaxed: 0.15,
} as const;

// Opacity levels for text hierarchy
export const OPACITY = {
  primary: 1,      // Main content
  secondary: 0.7,  // Secondary content
  tertiary: 0.6,   // De-emphasized content
  muted: 0.5,      // Very subtle content
  subtle: 0.4,     // Labels, meta information
} as const;

// Common animation variants with GPU acceleration
export function createFadeUpVariants(reducedMotion: boolean, isMobile: boolean = false) {
  const duration = isMobile ? MOBILE_DURATION : DURATION;
  
  return {
    hidden: { 
      opacity: 0, 
      y: reducedMotion ? 0 : (isMobile ? 12 : 20),
      filter: reducedMotion ? 'none' : (isMobile ? 'blur(4px)' : 'blur(8px)'),
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: reducedMotion ? duration.fast : duration.normal,
        ease: EASE_OUT_EXPO,
      },
    },
  };
}

export function createStaggerContainerVariants(reducedMotion: boolean, isMobile: boolean = false) {
  return {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: reducedMotion ? 0 : (isMobile ? STAGGER.fast : STAGGER.normal),
        delayChildren: reducedMotion ? 0 : (isMobile ? 0.1 : 0.15),
      },
    },
  };
}

// Optimized fade variants with GPU acceleration
export function createFadeVariants(reducedMotion: boolean, isMobile: boolean = false) {
  const duration = isMobile ? MOBILE_DURATION : DURATION;
  
  return {
    hidden: { 
      opacity: 0,
      scale: reducedMotion ? 1 : 0.98,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: reducedMotion ? duration.fast : duration.normal,
        ease: EASE_OUT_QUART,
      },
    },
  };
}

// Standard animation variants with GPU acceleration
export const createStandardVariants = (reducedMotion: boolean, isMobile: boolean, duration: any) => {
  return {
    hidden: { 
      opacity: 0, 
      y: reducedMotion ? 0 : (isMobile ? 12 : 20),
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reducedMotion ? duration.fast : duration.normal,
        ease: EASE_OUT_EXPO,
      },
    },
  };
};