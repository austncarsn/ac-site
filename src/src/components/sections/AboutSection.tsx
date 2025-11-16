import { AnimatedSection } from '../ui/AnimatedSection';
import { SectionHeader } from '../ui/SectionHeader';

interface InfoBlockProps {
  label: string;
  content: string;
}

function InfoBlock({ label, content }: InfoBlockProps) {
  return (
    <div>
      <p className="text-meta" style={{ marginBottom: 'var(--space-3)' }}>{label}</p>
      <p className="text-body-small">{content}</p>
    </div>
  );
}

export function AboutSection() {
  return (
    <section id="about" className="section-padding border-t border-border">
      <div className="container-main">
        <SectionHeader>About</SectionHeader>

        <div className="grid grid-cols-1 lg:grid-cols-12" style={{ gap: 'var(--space-12)' }}>
          {/* Main content */}
          <AnimatedSection className="lg:col-span-7">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
              <p className="text-body-medium">
                I build interface systems that bridge precision and creativity—turning complex 
                design requirements into production-ready code that scales.
              </p>

              <p className="text-body-small opacity-60">
                What inspires me is the challenge of creating systems that empower teams. I'm 
                driven by the craft of building tools and components that make design and 
                development feel seamless, intuitive, and joyful.
              </p>

              <p className="text-body-small opacity-60">
                Always learning, always iterating. Currently exploring advanced animation 
                systems, accessibility patterns, and the evolving landscape of design 
                tooling and AI-augmented workflows.
              </p>
            </div>
          </AnimatedSection>

          {/* Sidebar info */}
          <AnimatedSection delay={0.2} className="lg:col-span-5">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
              <InfoBlock
                label="What I Do"
                content="Design Systems · Component Architecture · Interface Engineering"
              />
              <InfoBlock
                label="Learning"
                content="AI Tools · Advanced Animation · Accessibility · Developer Experience"
              />
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}