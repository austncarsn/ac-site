import { AnimatedSection } from '../ui/AnimatedSection';
import { SectionHeader } from '../ui/SectionHeader';

const SYSTEMS = [
  {
    title: 'Component Libraries',
    description: 'Production-ready React components built with TypeScript and accessibility',
  },
  {
    title: 'Design Tokens',
    description: 'Systematic approach to colors, typography, and spacing across platforms',
  },
  {
    title: 'Documentation',
    description: 'Living documentation bridging design and engineering',
  },
  {
    title: 'Build Tools',
    description: 'Custom automation accelerating design system adoption',
  },
];

export function SystemsSection() {
  return (
    <section id="systems" className="section-padding border-t border-border">
      <div className="container-main">
        <SectionHeader accentColor="#10B981">Systems</SectionHeader>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12" style={{ gap: 'var(--space-8)' }}>
          {SYSTEMS.map((system, index) => (
            <AnimatedSection key={system.title} delay={index * 0.1}>
              <h4 className="break-words" style={{ marginBottom: 'var(--space-3)' }}>{system.title}</h4>
              <p className="text-small break-words">{system.description}</p>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}