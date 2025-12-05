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
      {/* 1. Accent Line */}
      {showAccent && (
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "circOut" }}
          variants={ACCENT_LINE_VARIANTS}
          style={{
            height: "3px",
            width: "40px",
            borderRadius: "2px",
            backgroundColor: accentColor,
            marginBottom: "1rem",
            transformOrigin: "left center",
          }}
        />
      )}

      {/* 2. Use InsetSection for pill-shaped deep inset look */}
      <InsetSection accentColor={accentColor} className={className}>
        {children}
      </InsetSection>
    </div>
  );
}