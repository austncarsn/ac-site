import { motion } from 'motion/react';
import { createFadeUpVariants, EASE_OUT_EXPO, DURATION } from '../../lib/constants';

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
  // Detect mobile for optimized animations
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;
  const variants = createFadeUpVariants(false);
  
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: isMobile ? '-50px' : '0px' }}
      variants={variants}
      transition={{ 
        ...variants.visible.transition,
        duration: isMobile ? 0.6 : variants.visible.transition.duration,
        delay 
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}