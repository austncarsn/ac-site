import { AnimatedSection } from '../ui/AnimatedSection';
import { SectionHeader } from '../ui/SectionHeader';

export function AboutSection() {
  return (
    <section id="about" className="section-padding bg-white border-t border-border">
      <div className="container-main">
        <SectionHeader accentColor="#B6CFFF">About</SectionHeader>

        <div 
          className="grid grid-cols-1 lg:grid-cols-12" 
          style={{ 
            gap: 'clamp(2rem, 5vw, 3rem)', 
            marginTop: 'clamp(2rem, 5vw, 3rem)' 
          }}
        >
          {/* Main content - Mobile optimized narrative */}
          <AnimatedSection className="lg:col-span-7">
            <div 
              style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: 'clamp(1.5rem, 4vw, 2rem)',
                maxWidth: '600px', // Comfortable line length
              }}
            >
              {/* Featured statement - thesis */}
              <p 
                className="break-words"
                style={{
                  fontSize: 'clamp(17px, 2.5vw, 19px)',
                  lineHeight: '1.6',
                  fontWeight: 400,
                  letterSpacing: '-0.01em',
                  color: '#1A1A19',
                }}
              >
                I build interface systems where precision meets creativity — turning messy design 
                requirements into production-ready code that scales.
              </p>

              {/* Systems thinking paragraph */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <p 
                  className="break-words"
                  style={{
                    fontSize: 'clamp(15px, 2.2vw, 16px)',
                    lineHeight: '1.7',
                    fontWeight: 400,
                    color: '#52525B',
                  }}
                >
                  My focus is creating systems that empower teams to ship faster without sacrificing 
                  craft. I build tools and components that make the design-to-development handoff 
                  feel less like a game of telephone and more like telepathy.
                </p>
              </div>

              {/* Currently exploring - segmented list */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <p 
                  style={{
                    fontSize: 'clamp(12px, 1.8vw, 13px)',
                    letterSpacing: '0.06em',
                    color: '#A1A1AA',
                    fontWeight: 400,
                  }}
                >
                  CURRENTLY EXPLORING
                </p>
                <div 
                  style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: '0.5rem',
                    paddingLeft: '1rem',
                  }}
                >
                  <p 
                    style={{
                      fontSize: 'clamp(14px, 2vw, 15px)',
                      lineHeight: '1.6',
                      color: '#71717A',
                      fontWeight: 400,
                    }}
                  >
                    Advanced animation choreography
                  </p>
                  <p 
                    style={{
                      fontSize: 'clamp(14px, 2vw, 15px)',
                      lineHeight: '1.6',
                      color: '#71717A',
                      fontWeight: 400,
                    }}
                  >
                    Accessibility patterns that don't feel like an afterthought
                  </p>
                  <p 
                    style={{
                      fontSize: 'clamp(14px, 2vw, 15px)',
                      lineHeight: '1.6',
                      color: '#71717A',
                      fontWeight: 400,
                    }}
                  >
                    The evolving landscape where AI meets design tooling
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Sidebar info - Index style summary */}
          <AnimatedSection delay={0.2} className="lg:col-span-5">
            <div 
              style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: 'clamp(1.75rem, 4vw, 2.5rem)',
                paddingTop: 'clamp(0rem, 2vw, 0.5rem)', // Slight alignment on desktop
              }}
            >
              {/* What I Do - Index entry */}
              <div>
                <p 
                  style={{
                    fontSize: 'clamp(12px, 1.8vw, 13px)',
                    letterSpacing: '0.06em',
                    color: '#A1A1AA',
                    marginBottom: '0.75rem',
                    fontWeight: 400,
                  }}
                >
                  WHAT I DO
                </p>
                <p 
                  style={{
                    fontSize: 'clamp(14px, 2vw, 15px)',
                    lineHeight: '1.7',
                    color: '#52525B',
                    fontWeight: 400,
                  }}
                >
                  Design Systems · Component Architecture · Interface Engineering
                </p>
              </div>

              {/* Learning - Index entry */}
              <div>
                <p 
                  style={{
                    fontSize: 'clamp(12px, 1.8vw, 13px)',
                    letterSpacing: '0.06em',
                    color: '#A1A1AA',
                    marginBottom: '0.75rem',
                    fontWeight: 400,
                  }}
                >
                  LEARNING
                </p>
                <p 
                  style={{
                    fontSize: 'clamp(14px, 2vw, 15px)',
                    lineHeight: '1.7',
                    color: '#52525B',
                    fontWeight: 400,
                  }}
                >
                  AI Tools · Advanced Animation · Accessibility · Developer Experience
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}