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
  const variants = createFadeUpVariants(false);
  
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={variants}
      transition={{ 
        ...variants.visible.transition,
        delay 
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
