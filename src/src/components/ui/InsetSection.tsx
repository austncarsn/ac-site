import { motion } from 'motion/react';
import React from 'react';

interface InsetSectionProps {
  children: React.ReactNode;
  accentColor?: string;
  className?: string;
}

export function InsetSection({ 
  children, 
  accentColor = '#6366f1',
  className = ''
}: InsetSectionProps) {

  return (
    <div className={`flex justify-start ${className}`} style={{ marginBottom: 'clamp(2rem, 5vw, 3rem)' }}>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        style={{
          // 1. SHAPE: Fit content and pill shape
          display: 'inline-block',
          padding: '16px 40px', // Generous horizontal padding for pill shape
          borderRadius: '9999px', // Perfect pill/capsule shape
          backgroundColor: '#F3F4F6', // Matches page background
          
          // 2. THE DEPTH (The Magic) - Double inset shadow
          boxShadow: `
            inset 5px 5px 10px rgba(163, 177, 198, 0.6),  /* Top-Left Dark Shadow */
            inset -5px -5px 10px rgba(255, 255, 255, 1.0) /* Bottom-Right White Light */
          `,
        }}
      >
        <h2
          style={{
            margin: 0,
            fontSize: 'clamp(2rem, 4vw, 2.5rem)',
            fontWeight: 700,
            lineHeight: 1.1,
            
            // 3. THE TEXT GRADIENT
            background: `linear-gradient(135deg, ${accentColor} 0%, color-mix(in srgb, ${accentColor}, black 20%) 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            
            // Optional: A tiny drop shadow on the text to lift it slightly from the hole
            filter: 'drop-shadow(0px 2px 2px rgba(0,0,0,0.1))',
          }}
        >
          {children}
        </h2>
      </motion.div>
    </div>
  );
}
