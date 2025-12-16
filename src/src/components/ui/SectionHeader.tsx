import React, { CSSProperties } from "react";
import { motion } from "motion/react";
import { createFadeUpVariants } from "../../lib/constants";

interface SectionHeaderProps {
  children: React.ReactNode;
  className?: string;
  accentColor?: string;
  showAccent?: boolean;
}

// Optimization: Move static styles/variants outside component to prevent re-creation
const ACCENT_LINE_VARIANTS = {
  hidden: { opacity: 0, scaleX: 0 },
  visible: { opacity: 0.5, scaleX: 1 },
};

export function SectionHeader({
  children,
  className = "",
  accentColor = "#B6CFFF",
  showAccent = true,
}: SectionHeaderProps) {

  return (
    <div className="section-header-wrapper" style={{ marginBottom: 'clamp(3rem, 6vw, 4rem)' }}>
      {/* Header text with refined editorial typography */}
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ 
          duration: 0.7,
          ease: [0.16, 1, 0.3, 1]
        }}
        className={className}
        style={{
          margin: 0,
          fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
          fontWeight: 300,
          lineHeight: 1.1,
          letterSpacing: '-0.02em',
          color: '#18181B',
          textWrap: 'balance',
        }}
      >
        {children}
      </motion.h2>
      
      {/* Subtle accent line */}
      {showAccent && (
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 0.2, scaleX: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{
            duration: 0.8,
            delay: 0.2,
            ease: [0.16, 1, 0.3, 1]
          }}
          style={{
            width: '60px',
            height: '2px',
            background: `linear-gradient(90deg, ${accentColor}, transparent)`,
            marginTop: '1.5rem',
            transformOrigin: 'left',
          }}
        />
      )}
    </div>
  );
}