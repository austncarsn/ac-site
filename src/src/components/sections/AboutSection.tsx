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
                Tech engineer and interface systems architect with 8+ years building 
                production-ready design systems and digital experiences.
              </p>

              <p className="text-body-small opacity-60">
                My work sits at the intersection of design and engineering, helping organizations 
                build scalable, accessible interface systems through meticulous craftsmanship and 
                systematic thinking.
              </p>
            </div>
          </AnimatedSection>

          {/* Sidebar info */}
          <AnimatedSection delay={0.2} className="lg:col-span-5">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
              <InfoBlock
                label="Currently"
                content="Senior Interface Architect at Design Systems Co."
              />
              <InfoBlock
                label="Focus"
                content="React · TypeScript · Design Systems · Component Architecture"
              />
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}