import { motion } from 'motion/react';
import { cn } from '../ui/utils';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'card' | 'image' | 'circle';
  animate?: boolean;
}

/**
 * Skeleton loader component that matches design system aesthetics.
 * Uses subtle gradient animation and soft contrast for calm loading states.
 */
export function Skeleton({ 
  className, 
  variant = 'text',
  animate = true 
}: SkeletonProps) {
  const baseClasses = cn(
    'bg-gradient-to-r from-zinc-100 via-zinc-50 to-zinc-100',
    variant === 'circle' && 'rounded-full',
    variant === 'card' && 'rounded-3xl',
    variant === 'image' && 'rounded-2xl',
    variant === 'text' && 'rounded-md',
    className
  );

  if (!animate) {
    return <div className={baseClasses} />;
  }

  return (
    <motion.div
      className={baseClasses}
      initial={{ opacity: 0.6 }}
      animate={{ 
        opacity: [0.6, 0.8, 0.6],
        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
      }}
      transition={{
        duration: 2,
        ease: 'easeInOut',
        repeat: Infinity,
      }}
      style={{ backgroundSize: '200% 100%' }}
    />
  );
}

/**
 * Skeleton for text blocks with proper line height
 */
export function SkeletonText({ 
  lines = 3,
  className 
}: { 
  lines?: number; 
  className?: string;
}) {
  return (
    <div className={cn('space-y-3', className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton 
          key={i}
          variant="text"
          className={cn(
            'h-4',
            i === lines - 1 && 'w-[80%]', // Last line shorter
            i === 0 && 'w-[95%]',
          )}
        />
      ))}
    </div>
  );
}

/**
 * Skeleton for project cards matching WorkSection layout
 */
export function SkeletonProjectCard() {
  return (
    <motion.div
      className="w-full"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
      style={{ minHeight: '420px' }}
    >
      <div className="bg-white border border-zinc-200 rounded-3xl p-6 h-full">
        {/* Image skeleton */}
        <Skeleton 
          variant="image" 
          className="w-full mb-6" 
          style={{ aspectRatio: '16/10' }}
        />
        
        {/* Category tag skeleton */}
        <Skeleton 
          variant="text" 
          className="h-5 w-24 mb-3" 
        />
        
        {/* Title skeleton */}
        <Skeleton 
          variant="text" 
          className="h-7 w-3/4 mb-3" 
        />
        
        {/* Description skeleton */}
        <SkeletonText lines={2} className="mb-4" />
        
        {/* Button skeleton */}
        <Skeleton 
          variant="card" 
          className="h-11 w-32" 
        />
      </div>
    </motion.div>
  );
}

/**
 * Skeleton for system spec items
 */
export function SkeletonSystemItem() {
  return (
    <motion.div
      className="border-b border-zinc-200 py-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.24 }}
    >
      <div className="flex justify-between items-start gap-6">
        <div className="flex-1">
          <Skeleton variant="text" className="h-6 w-48 mb-2" />
          <Skeleton variant="text" className="h-4 w-full max-w-md" />
        </div>
        <Skeleton variant="text" className="h-5 w-20" />
      </div>
    </motion.div>
  );
}

/**
 * Skeleton for essay cards
 */
export function SkeletonEssayCard() {
  return (
    <motion.div
      className="border-l-2 border-zinc-200 pl-6 py-4"
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.24, ease: [0.25, 1, 0.5, 1] }}
    >
      <Skeleton variant="text" className="h-6 w-3/4 mb-2" />
      <Skeleton variant="text" className="h-4 w-full mb-3" />
      <Skeleton variant="text" className="h-4 w-24" />
    </motion.div>
  );
}
