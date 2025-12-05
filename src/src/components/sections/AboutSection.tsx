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
        {/* Large inset pill frame containing entire section */}
        <div
          style={{
            padding: 'clamp(2rem, 4vw, 4rem) clamp(2rem, 4vw, 3rem)',
            borderRadius: '60px', // Large pill shape
            backgroundColor: '#F3F4F6',
            boxShadow: `
              inset 6px 6px 12px rgba(163, 177, 198, 0.6),
              inset -6px -6px 12px rgba(255, 255, 255, 1.0)
            `,
          }}
        >
          <SectionHeader accentColor="#EC4899">About</SectionHeader>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12" style={{ gap: 'var(--space-12)' }}>
            {/* Main content */}
            <AnimatedSection className="lg:col-span-7">
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
                <p className="text-body-medium break-words">
                  I build interface systems where precision meets creativity — turning messy design 
                  requirements into production-ready code that actually scales (and occasionally sparks joy).
                </p>

                <p className="text-body-small opacity-60 break-words">
                  What keeps me awake at night: creating systems that empower teams to ship faster 
                  without sacrificing craft. I'm obsessed with building tools and components that make 
                  the design-to-development handoff feel less like a game of telephone and more like telepathy.
                </p>

                <p className="text-body-small opacity-60 break-words">
                  Currently exploring: advanced animation choreography, accessibility patterns that don't feel 
                  like an afterthought, and the evolving landscape where AI meets design tooling. Always learning, 
                  occasionally breaking things, constantly iterating.
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
      </div>
    </section>
  );
}