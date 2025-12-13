import { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { cn } from '../ui/utils';

interface ProgressiveImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: string;
  priority?: boolean;
  placeholderColor?: string;
  onLoad?: () => void;
}

/**
 * Progressive image component with blur-up loading effect.
 * Prevents layout shift and provides smooth loading experience.
 */
export function ProgressiveImage({
  src,
  alt,
  className,
  aspectRatio = '16/10',
  priority = false,
  placeholderColor = '#f4f4f5',
  onLoad,
}: ProgressiveImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!src) return;

    const img = new Image();
    img.src = src;
    
    if (img.complete) {
      setIsLoaded(true);
      onLoad?.();
    } else {
      img.onload = () => {
        setIsLoaded(true);
        onLoad?.();
      };
      img.onerror = () => setError(true);
    }

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src, onLoad]);

  return (
    <div 
      className={cn('relative overflow-hidden', className)}
      style={{ aspectRatio }}
    >
      {/* Placeholder background */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-zinc-100 to-zinc-50"
        style={{ backgroundColor: placeholderColor }}
      />

      {/* Actual image */}
      {!error && (
        <motion.img
          src={src}
          alt={alt}
          className="absolute inset-0 w-full h-full object-cover"
          loading={priority ? 'eager' : 'lazy'}
          initial={prefersReducedMotion ? { opacity: 1 } : { 
            opacity: 0, 
            filter: 'blur(20px)',
            scale: 1.05
          }}
          animate={prefersReducedMotion ? { opacity: 1 } : {
            opacity: isLoaded ? 1 : 0,
            filter: isLoaded ? 'blur(0px)' : 'blur(20px)',
            scale: isLoaded ? 1 : 1.05
          }}
          transition={{
            duration: prefersReducedMotion ? 0.15 : 0.6,
            ease: [0.25, 1, 0.5, 1]
          }}
        />
      )}

      {/* Error fallback */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-zinc-100">
          <div className="text-zinc-400 text-sm">Image unavailable</div>
        </div>
      )}

      {/* Loading shimmer effect */}
      {!isLoaded && !error && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
          initial={{ x: '-100%' }}
          animate={{ x: '100%' }}
          transition={{
            duration: 1.5,
            ease: 'easeInOut',
            repeat: Infinity,
            repeatDelay: 0.5
          }}
        />
      )}
    </div>
  );
}

/**
 * Simple image wrapper that prevents layout shift
 */
export function StableImage({
  src,
  alt,
  className,
  aspectRatio = '16/10',
}: Omit<ProgressiveImageProps, 'priority' | 'placeholderColor' | 'onLoad'>) {
  return (
    <div 
      className={cn('relative overflow-hidden', className)}
      style={{ aspectRatio }}
    >
      <img
        src={src}
        alt={alt}
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
      />
    </div>
  );
}
