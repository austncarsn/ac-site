import { AnimatedSection } from '../ui/AnimatedSection';
import { SectionHeader } from '../ui/SectionHeader';

interface Essay {
  title: string;
  date: string;
  category: string;
  excerpt: string;
}

const ESSAYS: Essay[] = [
  {
    title: 'The Art of Systematic Design',
    date: 'November 2025',
    category: 'Design Systems',
    excerpt: 'Exploring how systematic thinking transforms interface design from isolated components into cohesive, scalable systems that serve both users and teams. A deep dive into establishing principles, creating flexible foundations, and building design languages that evolve with product needs while maintaining consistency across platforms and contexts.',
  },
  {
    title: 'Production-Ready Components',
    date: 'October 2025',
    category: 'Engineering',
    excerpt: 'Building components that work seamlessly across diverse contexts requires more than clean code—it demands thoughtful architecture, rigorous attention to edge cases, comprehensive accessibility considerations, and robust testing strategies. This essay examines the gap between prototype components and production-grade systems, exploring patterns for resilience, performance, and developer experience.',
  },
  {
    title: 'Typography at Scale',
    date: 'September 2025',
    category: 'Typography',
    excerpt: 'How typographic systems establish hierarchy, rhythm, and voice across digital products while maintaining flexibility for diverse content needs. From selecting typefaces and establishing scales to implementing responsive type systems and managing variable fonts, this exploration covers the technical and aesthetic decisions that shape modern digital typography at enterprise scale.',
  },
  {
    title: 'Bridging Design and Code',
    date: 'August 2025',
    category: 'Process',
    excerpt: 'The most effective design systems emerge from the collaborative space between design and engineering, where visual precision meets technical constraint. This essay examines workflows, tools, and communication patterns that enable designers and developers to work in tandem, creating systems that are both visually refined and technically sound, maintainable, and performant.',
  },
  {
    title: 'Component API Design',
    date: 'July 2025',
    category: 'Architecture',
    excerpt: 'Designing intuitive, flexible component APIs requires balancing developer experience with system constraints. This comprehensive guide explores prop naming conventions, composition patterns, polymorphic components, render props, compound components, and the principles that make interfaces feel natural while preventing misuse and maintaining type safety across large codebases.',
  },
  {
    title: 'Design Tokens in Practice',
    date: 'June 2025',
    category: 'Design Systems',
    excerpt: 'Design tokens form the foundation of scalable design systems, translating design decisions into platform-agnostic values. This deep dive covers token taxonomy, semantic vs. literal naming, multi-brand architectures, theme switching, token transformations, and real-world implementation strategies across web, iOS, and Android platforms using modern tooling.',
  },
  {
    title: 'Accessibility as Foundation',
    date: 'May 2025',
    category: 'Accessibility',
    excerpt: 'Building accessible interfaces isn\'t a feature—it\'s fundamental architecture. This essay explores integrating WCAG standards into component design from the ground up, covering ARIA patterns, keyboard navigation, screen reader optimization, focus management, color contrast systems, and creating inclusive experiences that work for everyone without compromise.',
  },
  {
    title: 'The Evolution of Interface States',
    date: 'April 2025',
    category: 'Design Patterns',
    excerpt: 'Every interface element exists in multiple states: default, hover, focus, active, disabled, loading, error, and success. This comprehensive study examines state management in design systems, exploring visual feedback patterns, micro-interactions, state machines, transition choreography, and establishing consistent behavioral patterns that guide users through complex interactions.',
  },
];

interface EssayItemProps {
  essay: Essay;
  index: number;
}

function EssayItem({ essay, index }: EssayItemProps) {
  return (
    <AnimatedSection 
      delay={index * 0.05}
      className="border-t border-border"
      style={{ paddingTop: 'var(--space-8)', paddingBottom: 'var(--space-8)' }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12" style={{ gap: 'var(--space-6)' }}>
        <div className="lg:col-span-3">
          <p className="text-caption">{essay.date}</p>
        </div>

        <div className="lg:col-span-9">
          <div className="flex flex-col md:flex-row md:items-baseline md:justify-between" style={{ gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
            <h3 className="text-2xl font-normal tracking-tight">{essay.title}</h3>
            <span className="text-caption shrink-0">{essay.category}</span>
          </div>
          <p className="text-sm opacity-60">{essay.excerpt}</p>
        </div>
      </div>
    </AnimatedSection>
  );
}

export function EssaysSection() {
  return (
    <section id="essays" className="section-padding border-t border-border">
      <div className="container-main">
        <SectionHeader>Essays</SectionHeader>

        <div className="space-y-0">
          {ESSAYS.map((essay, index) => (
            <EssayItem key={essay.title} essay={essay} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}