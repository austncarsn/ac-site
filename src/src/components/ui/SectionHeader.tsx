import { motion } from 'motion/react';
import { createFadeUpVariants } from '../../lib/constants';

interface SectionHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionHeader({ children, className = '' }: SectionHeaderProps) {
  return (
    <motion.h2
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={createFadeUpVariants(false)}
      className={className}
      style={{ marginBottom: 'var(--space-24)' }}
    >
      {children}
    </motion.h2>
  );
}