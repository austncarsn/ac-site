import { motion } from 'motion/react';
import { createFadeUpVariants } from '../../lib/constants';

interface SectionHeaderProps {
  children: React.ReactNode;
  className?: string;
  accentColor?: string;
  showAccent?: boolean;
}

export function SectionHeader({ children, className = '', accentColor = '#14B8A6', showAccent = true }: SectionHeaderProps) {
  return (
    <div style={{ marginBottom: 'clamp(var(--space-16), 8vw, var(--space-24))' }}>
      {showAccent && (
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 0.3, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          style={{
            height: '2px',
            width: 'clamp(32px, 5vw, 48px)',
            backgroundColor: accentColor,
            marginBottom: 'var(--space-6)',
            transformOrigin: 'left center',
          }}
        />
      )}
      <motion.h2
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={createFadeUpVariants(false)}
        className={`break-words ${className}`}
      >
        {children}
      </motion.h2>
    </div>
  );
}