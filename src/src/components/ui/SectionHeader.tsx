import React, { CSSProperties } from "react";
import { motion } from "motion/react";
import { createFadeUpVariants } from "../../lib/constants";
import { InsetSection } from "./InsetSection";

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
  accentColor = "#14B8A6",
  showAccent = true,
}: SectionHeaderProps) {

  return (
    <div className="section-header-wrapper">
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

      {/* 2. Use InsetSection for pill-shaped deep inset look */}
      <InsetSection accentColor={accentColor} className={className}>
        {children}
      </InsetSection>
    </div>
  );
}