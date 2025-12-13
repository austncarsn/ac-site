import { motion, useReducedMotion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';

/**
 * App-level loader that shows on initial page load.
 * Ensures smooth first paint with no layout shift.
 */
export function AppLoader({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isHydrated, setIsHydrated] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    // Mark as hydrated immediately (React is ready)
    setIsHydrated(true);

    // Wait for fonts and critical resources
    if (document.fonts) {
      document.fonts.ready.then(() => {
        // Small delay to ensure smooth transition
        setTimeout(() => setIsLoading(false), 100);
      });
    } else {
      // Fallback if Font Loading API not available
      setTimeout(() => setIsLoading(false), 400);
    }
  }, []);

  // Show minimal loading state only if not hydrated yet
  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-white">
        {/* Minimal navigation skeleton */}
        <div 
          className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-zinc-200"
          style={{ height: '68px' }}
        >
          <div className="container-main h-full flex items-center justify-between px-8">
            <div className="h-6 w-32 bg-zinc-100 rounded" />
            <div className="h-10 w-24 bg-zinc-100 rounded-lg" />
          </div>
        </div>

        {/* Hero skeleton - locks layout */}
        <div 
          className="pt-32 pb-20"
          style={{ minHeight: '100vh' }}
        >
          <div className="container-main px-8">
            <div className="max-w-4xl">
              <div className="h-12 w-3/4 bg-zinc-100 rounded-lg mb-6" />
              <div className="h-6 w-full max-w-2xl bg-zinc-50 rounded mb-3" />
              <div className="h-6 w-5/6 max-w-xl bg-zinc-50 rounded" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Crossfade to actual content
  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <motion.div
          key="loading"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: prefersReducedMotion ? 1 : 0,
            transition: { duration: prefersReducedMotion ? 0.15 : 0.3 }
          }}
          className="min-h-screen bg-white"
        >
          {/* Same minimal skeleton */}
          <div 
            className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-zinc-200"
            style={{ height: '68px' }}
          >
            <div className="container-main h-full flex items-center justify-between px-8">
              <div className="h-6 w-32 bg-zinc-100 rounded animate-pulse" />
              <div className="h-10 w-24 bg-zinc-100 rounded-lg animate-pulse" />
            </div>
          </div>

          <div 
            className="pt-32 pb-20"
            style={{ minHeight: '100vh' }}
          >
            <div className="container-main px-8">
              <div className="max-w-4xl">
                <div className="h-12 w-3/4 bg-zinc-100 rounded-lg mb-6 animate-pulse" />
                <div className="h-6 w-full max-w-2xl bg-zinc-50 rounded mb-3 animate-pulse" />
                <div className="h-6 w-5/6 max-w-xl bg-zinc-50 rounded animate-pulse" />
              </div>
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="content"
          initial={{ opacity: prefersReducedMotion ? 1 : 0 }}
          animate={{ opacity: 1 }}
          transition={{ 
            duration: prefersReducedMotion ? 0.15 : 0.3,
            ease: [0.25, 1, 0.5, 1]
          }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
