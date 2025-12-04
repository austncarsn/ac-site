import { useMemo } from "react";
import { AnimatedSection } from "../ui/AnimatedSection";
import { SectionHeader } from "../ui/SectionHeader";
import { Box, Palette, FileText, Wrench } from "lucide-react"; // Assuming lucide-react is installed

// Define data outside component to prevent re-creation on render
const SYSTEMS_DATA = [
  {
    id: "01",
    title: "Component Libraries",
    description:
      "Production-ready React components built with TypeScript and accessibility.",
    icon: Box,
  },
  {
    id: "02",
    title: "Design Tokens",
    description:
      "Systematic approach to colors, typography, and spacing across platforms.",
    icon: Palette,
  },
  {
    id: "03",
    title: "Documentation",
    description:
      "Living documentation bridging the gap between design and engineering.",
    icon: FileText,
  },
  {
    id: "04",
    title: "Build Tools",
    description:
      "Custom automation accelerating design system adoption and deployment.",
    icon: Wrench,
  },
] as const;

export function SystemsSection() {
  return (
    <section
      id="systems"
      className="section-padding border-t border-zinc-100 bg-white relative overflow-hidden"
    >
      {/* Decorative Background Grid (Subtle Engineering Paper look) */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="container-main relative z-10">
        <SectionHeader accentColor="#10B981">
          Core Systems
        </SectionHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {SYSTEMS_DATA.map((system, index) => (
            <AnimatedSection
              key={system.id}
              delay={index * 0.1}
            >
              <SystemModule system={system} />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

// Sub-component for performance and cleaner JSX
function SystemModule({
  system,
}: {
  system: (typeof SYSTEMS_DATA)[number];
}) {
  const Icon = system.icon;

  return (
    <article className="group relative h-full">
      {/* CARD CASING */}
      <div
        className="h-full flex flex-col p-8 rounded-xl border border-zinc-200 bg-zinc-50/50 
        transition-all duration-300 ease-out
        /* Hover State: Inverts to Dark Mode ('Active Module') */
        group-hover:bg-zinc-900 group-hover:border-zinc-900 group-hover:-translate-y-1 group-hover:shadow-xl"
      >
        {/* HEADER: ID & Status Light */}
        <div className="flex justify-between items-start mb-8">
          <span className="font-mono text-[10px] tracking-widest text-zinc-400 group-hover:text-zinc-500">
            SYS_{system.id}
          </span>

          {/* Status LED */}
          <div
            className="w-2 h-2 rounded-full bg-zinc-300 transition-colors duration-300 
            group-hover:bg-emerald-400 group-hover:shadow-[0_0_8px_rgba(52,211,153,0.6)]"
          />
        </div>

        {/* ICON */}
        <div className="mb-6 text-zinc-400 group-hover:text-emerald-400 transition-colors duration-300">
          <Icon size={28} strokeWidth={1.5} />
        </div>

        {/* CONTENT */}
        <div className="mt-auto">
          <h4
            className="font-['Zen_Kaku_Gothic_New'] text-xl font-medium text-zinc-900 mb-3 
            group-hover:text-white transition-colors duration-300"
          >
            {system.title}
          </h4>
          <p
            className="text-sm text-zinc-500 leading-relaxed 
            group-hover:text-zinc-400 transition-colors duration-300"
          >
            {system.description}
          </p>
        </div>

        {/* DECORATIVE CORNER (Technical Detail) */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden rounded-xl">
          <div
            className="absolute top-0 right-0 w-8 h-8 -mr-4 -mt-4 bg-zinc-100 rotate-45 border border-zinc-200 
             group-hover:bg-zinc-800 group-hover:border-zinc-700 transition-colors duration-300"
          />
        </div>
      </div>
    </article>
  );
}