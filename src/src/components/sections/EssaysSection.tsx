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
    date: 'March 2024',
    category: 'Design Systems',
    excerpt: 'Exploring how systematic thinking transforms interface design from individual components into cohesive, scalable systems that serve both users and teams.',
  },
  {
    title: 'Production-Ready Components',
    date: 'February 2024',
    category: 'Engineering',
    excerpt: 'Building components that work seamlessly across contexts requires more than clean code—it demands thoughtful architecture and rigorous attention to edge cases.',
  },
  {
    title: 'Typography at Scale',
    date: 'January 2024',
    category: 'Typography',
    excerpt: 'How typographic systems establish hierarchy, rhythm, and voice across digital products while maintaining flexibility for diverse content needs.',
  },
  {
    title: 'Bridging Design and Code',
    date: 'December 2023',
    category: 'Process',
    excerpt: 'The most effective design systems emerge from the space between design and engineering, where visual precision meets technical constraint.',
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