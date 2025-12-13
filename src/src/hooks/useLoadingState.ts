import { useState, useEffect } from 'react';

interface LoadingConfig {
  /**
   * Minimum time to show loading state (prevents flash)
   */
  minDuration?: number;
  /**
   * Simulated delay before marking as loaded (for development)
   */
  simulatedDelay?: number;
  /**
   * Enable in production (default: false, only simulates in dev)
   */
  enableInProduction?: boolean;
}

/**
 * Hook to manage loading states with minimum duration to prevent flashing.
 * Ensures perceived performance and smooth transitions.
 */
export function useLoadingState({
  minDuration = 400,
  simulatedDelay = 800,
  enableInProduction = false,
}: LoadingConfig = {}) {
  const [isLoading, setIsLoading] = useState(true);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const isDev = import.meta.env.DEV;
    const shouldSimulate = isDev || enableInProduction;
    
    const startTime = Date.now();
    
    // Simulate content loading
    const loadTimer = setTimeout(() => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, minDuration - elapsed);
      
      // Ensure minimum duration is met
      setTimeout(() => {
        setIsLoading(false);
        // Small delay for crossfade to complete
        setTimeout(() => setIsReady(true), 200);
      }, remaining);
    }, shouldSimulate ? simulatedDelay : 0);

    return () => clearTimeout(loadTimer);
  }, [minDuration, simulatedDelay, enableInProduction]);

  return { isLoading, isReady };
}

/**
 * Hook for staggered loading of multiple items
 */
export function useStaggeredLoading(
  itemCount: number,
  delayBetweenItems: number = 60
) {
  const [loadedCount, setLoadedCount] = useState(0);

  useEffect(() => {
    if (loadedCount >= itemCount) return;

    const timer = setTimeout(() => {
      setLoadedCount(prev => Math.min(prev + 1, itemCount));
    }, delayBetweenItems);

    return () => clearTimeout(timer);
  }, [loadedCount, itemCount, delayBetweenItems]);

  return loadedCount;
}

/**
 * Hook for progressive image loading with blur-up effect
 */
export function useProgressiveImage(src: string) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!src) return;

    const img = new Image();
    img.src = src;
    
    img.onload = () => setImageLoaded(true);
    img.onerror = () => setError(true);

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src]);

  return { imageLoaded, error };
}
