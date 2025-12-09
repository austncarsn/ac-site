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
  accentColor = "#B6CFFF", // Changed default to pastel blue
  showAccent = true,
}: SectionHeaderProps) {

  return (
    <div className="section-header-wrapper" style={{ marginBottom: 'clamp(2rem, 5vw, 3rem)' }}>
      {/* 1. Accent Circles - "Embedded LED" Effect */}
      {showAccent && (
        <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', marginLeft: '6px' }}>
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: "easeOut", delay: index * 0.1 }}
              variants={ACCENT_LINE_VARIANTS}
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%", // Perfect circle
                backgroundColor: accentColor,
                
                // The Embedded LED Effect
                boxShadow: `
                  inset 2px 2px 3px rgba(0,0,0,0.2),          /* Inner Shadow (Depth) */
                  inset -1px -1px 2px rgba(255,255,255,0.4),  /* Inner Highlight (Lip) */
                  0px 0px 10px ${accentColor}                 /* Outer Glow (Neon/LED) */
                `
              }}
            />
          ))}
        </div>
      )}

      {/* 2. Header text without pill background */}
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className={className}
        style={{
          margin: 0,
          fontSize: 'clamp(2rem, 4vw, 2.5rem)',
          fontWeight: 300, // Skinny font weight
          lineHeight: 1.1,
          letterSpacing: '0.02em', // Slightly wider tracking for light weight
          
          // Solid black color instead of gradient
          color: '#000000',
          
          // Optional: A tiny drop shadow on the text to lift it slightly
          filter: 'drop-shadow(0px 2px 2px rgba(0,0,0,0.1))',
        }}
      >
        {children}
      </motion.h2>
    </div>
  );
}