import { ReactNode } from 'react';
import { motion, useReducedMotion, AnimatePresence } from 'motion/react';
import { EASE_OUT_QUART } from '../../lib/constants';

interface ContentLoaderProps {
  isLoading: boolean;
  skeleton: ReactNode;
  children: ReactNode;
  className?: string;
  /**
   * Crossfade duration in seconds
   */
  duration?: number;
}

/**
 * Content loader that crossfades between skeleton and actual content.
 * Ensures no layout shift and smooth transitions.
 */
export function ContentLoader({
  isLoading,
  skeleton,
  children,
  className,
  duration = 0.3,
}: ContentLoaderProps) {
  const prefersReducedMotion = useReducedMotion();
  const transitionDuration = prefersReducedMotion ? 0.15 : duration;

  return (
    <div className={className}>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="skeleton"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: transitionDuration, ease: EASE_OUT_QUART }}
          >
            {skeleton}
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: transitionDuration, ease: EASE_OUT_QUART }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/**
 * Staggered content loader for lists
 */
export function StaggeredContentLoader({
  isLoading,
  skeletonCount = 3,
  skeletonComponent: SkeletonComponent,
  children,
  className,
  staggerDelay = 0.06,
}: {
  isLoading: boolean;
  skeletonCount?: number;
  skeletonComponent: React.ComponentType;
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}) {
  const prefersReducedMotion = useReducedMotion();
  const delay = prefersReducedMotion ? 0 : staggerDelay;

  return (
    <div className={className}>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="skeletons"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.24 }}
          >
            {Array.from({ length: skeletonCount }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.3,
                  delay: i * delay,
                  ease: EASE_OUT_QUART,
                }}
              >
                <SkeletonComponent />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
