import { motion, useReducedMotion } from 'motion/react';
import { 
  createFadeUpVariants, 
  EASE_OUT_EXPO, 
  DURATION, 
  MOBILE_DURATION 
} from '../../lib/constants';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function AnimatedSection({ 
  children, 
  className = '',
  delay = 0 
}: AnimatedSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;
  const duration = isMobile ? MOBILE_DURATION : DURATION;
  
  const variants = createFadeUpVariants(!!prefersReducedMotion, isMobile);
  
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ 
        once: true, 
        margin: isMobile ? '-80px' : '-100px',
        amount: 0.2,
      }}
      variants={variants}
      transition={{ 
        duration: prefersReducedMotion ? duration.fast : duration.normal,
        delay,
        ease: EASE_OUT_EXPO,
      }}
      className={className}
      style={{
        willChange: 'opacity, transform',
        transform: 'translateZ(0)', // GPU acceleration
      }}
    >
      {children}
    </motion.div>
  );
}