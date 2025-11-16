/**
 * Shared constants for consistent styling across the application
 */

// Animation easing
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

// Animation durations (ms)
export const DURATION = {
  fast: 0.3,
  normal: 0.8,
  slow: 1,
} as const;

// Stagger delays for list animations
export const STAGGER = {
  fast: 0.05,
  normal: 0.1,
  slow: 0.15,
} as const;

// Opacity levels for text hierarchy
export const OPACITY = {
  primary: 1,      // Main content
  secondary: 0.7,  // Secondary content
  tertiary: 0.6,   // De-emphasized content
  muted: 0.5,      // Very subtle content
  subtle: 0.4,     // Labels, meta information
} as const;

// Common animation variants
export function createFadeUpVariants(reducedMotion: boolean) {
  return {
    hidden: { 
      opacity: 0, 
      y: reducedMotion ? 0 : 20 
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reducedMotion ? DURATION.fast : DURATION.normal,
        ease: EASE_OUT_EXPO,
      },
    },
  };
}

export function createStaggerContainerVariants(reducedMotion: boolean) {
  return {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: reducedMotion ? 0 : STAGGER.normal,
        delayChildren: reducedMotion ? 0 : 0.2,
      },
    },
  };
}
