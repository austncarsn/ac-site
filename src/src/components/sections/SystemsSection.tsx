import { useMemo } from "react";
import { motion } from "motion/react";
import { EASE_OUT_EXPO } from "../../lib/constants";

// Define data outside component to prevent re-creation on render
const SYSTEMS_DATA = [
  {
    id: "01",
    title: "Component Libraries",
    description:
      "Production-ready React components built with TypeScript and accessibility.",
  },
  {
    id: "02",
    title: "Design Tokens",
    description:
      "Systematic approach to colors, typography, and spacing across platforms.",
  },
  {
    id: "03",
    title: "Documentation",
    description:
      "Living documentation bridging the gap between design and engineering.",
  },
  {
    id: "04",
    title: "Build Tools",
    description:
      "Custom automation accelerating design system adoption and deployment.",
  },
] as const;

export function SystemsSection() {
  return (
    <section
      id="systems"
      className="relative overflow-hidden"
      style={{
        paddingTop: 'clamp(3rem, 8vw, 5rem)',
        paddingBottom: 'clamp(3rem, 8vw, 5rem)',
        backgroundColor: '#FAFAF9', // Warm off-white
      }}
    >
      {/* Subtle baseline grid - technical documentation feel */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#000 1px, transparent 1px)",
          backgroundSize: "1px 24px", // Vertical rhythm guide
        }}
        aria-hidden="true"
      />

      <div className="container-main relative z-10">
        {/* Section Header with Index Marker */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
          style={{ marginBottom: 'clamp(2rem, 5vw, 3rem)' }}
        >
          {/* Index Marker */}
          <div
            style={{
              fontSize: '11px',
              fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
              letterSpacing: '0.08em',
              color: '#9CA3AF',
              marginBottom: '12px',
              fontWeight: 500,
            }}
          >
            ARCH / 01
          </div>

          {/* Title */}
          <h2
            style={{
              fontSize: 'clamp(28px, 5vw, 40px)',
              fontWeight: 300,
              letterSpacing: '0.06em',
              color: '#1A1A19',
            }}
          >
            CORE SYSTEMS
          </h2>
        </motion.div>

        {/* Spec Index Container */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '16px', // Rounded corners at container level only
            padding: 'clamp(1.5rem, 4vw, 2.5rem)',
            // Subtle container shadow
            boxShadow: '0 2px 12px -4px rgba(0, 0, 0, 0.06)',
          }}
        >
          {/* Vertical Indexed List */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0', // No gap, rows are separated by borders
            }}
          >
            {SYSTEMS_DATA.map((system, index) => (
              <SystemRow
                key={system.id}
                system={system}
                index={index}
                isLast={index === SYSTEMS_DATA.length - 1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// System Row Component - Documentation Entry
function SystemRow({
  system,
  index,
  isLast,
}: {
  system: (typeof SYSTEMS_DATA)[number];
  index: number;
  isLast: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.6,
        ease: EASE_OUT_EXPO,
        delay: index * 0.08,
      }}
      className="group cursor-pointer touch-manipulation"
      style={{
        padding: 'clamp(1.25rem, 3vw, 1.75rem) 0',
        borderBottom: isLast ? 'none' : '1px solid rgba(0, 0, 0, 0.06)',
        display: 'grid',
        gridTemplateColumns: 'auto 1fr auto',
        gap: 'clamp(1rem, 3vw, 1.5rem)',
        alignItems: 'start',
        transition: 'background-color 0.2s ease',
        borderRadius: '8px',
        marginLeft: '-12px',
        marginRight: '-12px',
        paddingLeft: '12px',
        paddingRight: '12px',
      }}
      // Active/hover state
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = '#F9FAFB';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'transparent';
      }}
      role="article"
      tabIndex={0}
    >
      {/* Left: System ID */}
      <div
        style={{
          fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
          fontSize: 'clamp(11px, 1.5vw, 12px)',
          letterSpacing: '0.05em',
          color: '#9CA3AF',
          fontWeight: 500,
          paddingTop: '2px', // Optical alignment
          minWidth: 'clamp(60px, 10vw, 70px)',
        }}
      >
        SYS_{system.id}
      </div>

      {/* Center: System Name + Description */}
      <div style={{ minWidth: 0 }}> {/* minWidth: 0 for text truncation */}
        <h3
          style={{
            fontSize: 'clamp(17px, 2.5vw, 19px)',
            fontWeight: 400,
            letterSpacing: '-0.01em',
            color: '#1A1A19',
            marginBottom: '6px',
            lineHeight: '1.3',
          }}
        >
          {system.title}
        </h3>
        <p
          style={{
            fontSize: 'clamp(14px, 2vw, 15px)',
            lineHeight: '1.6',
            color: '#6B7280',
            fontWeight: 400,
            maxWidth: '600px', // Consistent line length
          }}
        >
          {system.description}
        </p>
      </div>

      {/* Right: Minimal Indicator */}
      <div
        style={{
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          backgroundColor: '#D1D5DB',
          marginTop: '8px', // Align with title baseline
          transition: 'all 0.2s ease',
        }}
        className="group-hover:bg-[#B6CFFF] group-hover:shadow-[0_0_8px_rgba(182,207,255,0.5)]"
        aria-hidden="true"
      />
    </motion.div>
  );
}