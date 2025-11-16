import { motion } from 'motion/react';
import { EASE_OUT_EXPO, DURATION } from '../../lib/constants';
import { Download } from 'lucide-react';

export function ResumeSection() {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  const handleDownloadPDF = () => {
    // Open a new window with the print-optimized resume
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
<!DOCTYPE html>
<html>
  <head>
    <title>Austin Carson - Resume</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet">
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      
      @page {
        margin: 0.5in 0.6in;
        size: letter;
      }
      
      body {
        font-family: 'Instrument Serif', Georgia, 'Times New Roman', serif;
        background: white;
        color: #0A0A0A;
        line-height: 1.4;
        padding: 32px;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        font-optical-sizing: auto;
      }
      
      .resume-container {
        max-width: 100%;
      }
      
      h1 {
        font-size: 32px;
        line-height: 38px;
        margin-bottom: 6px;
        font-weight: 400;
        letter-spacing: -0.02em;
      }
      
      h2 {
        font-size: 20px;
        line-height: 26px;
        margin-bottom: 12px;
        font-weight: 400;
        letter-spacing: -0.01em;
      }
      
      h3 {
        font-size: 15px;
        line-height: 20px;
        margin-bottom: 4px;
        font-weight: 500;
        letter-spacing: -0.01em;
      }
      
      h4 {
        font-size: 18px;
        line-height: 24px;
        margin-bottom: 6px;
        font-weight: 400;
        letter-spacing: -0.01em;
      }
      
      p, li {
        font-size: 11px;
        line-height: 16px;
        font-weight: 400;
        letter-spacing: -0.005em;
      }
      
      .subtitle {
        font-size: 18px;
        line-height: 24px;
        opacity: 0.8;
        margin-bottom: 10px;
        font-weight: 400;
        letter-spacing: -0.01em;
      }
      
      .contact-info {
        display: flex;
        flex-wrap: wrap;
        gap: 14px;
        margin-bottom: 14px;
        font-size: 10px;
        line-height: 14px;
        text-transform: uppercase;
        letter-spacing: 0.1em;
      }
      
      .contact-info span,
      .contact-info a {
        opacity: 0.4;
        color: #0A0A0A;
        text-decoration: none;
        font-weight: 400;
      }
      
      .divider {
        border-top: 1px solid rgba(10, 10, 10, 0.1);
        margin: 14px 0;
      }
      
      .summary {
        font-size: 13px;
        line-height: 20px;
        margin-bottom: 20px;
        opacity: 0.85;
        font-weight: 400;
        letter-spacing: -0.005em;
      }
      
      .section {
        margin-bottom: 20px;
      }
      
      .section-title {
        font-size: 20px;
        line-height: 26px;
        margin-bottom: 12px;
        font-weight: 400;
        letter-spacing: -0.01em;
      }
      
      .competencies {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 18px;
        margin-bottom: 20px;
      }
      
      .competency h4 {
        margin-bottom: 8px;
      }
      
      .competency ul {
        list-style: none;
      }
      
      .competency li {
        margin-bottom: 4px;
        opacity: 0.8;
      }
      
      .two-column {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 28px;
      }
      
      .job {
        margin-bottom: 16px;
      }
      
      .job-title {
        font-size: 15px;
        line-height: 20px;
        margin-bottom: 4px;
        font-weight: 500;
        letter-spacing: -0.01em;
      }
      
      .job-meta {
        font-size: 10px;
        line-height: 14px;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        opacity: 0.4;
        margin-bottom: 10px;
        font-weight: 400;
      }
      
      .job ul {
        list-style: none;
        padding-left: 0;
      }
      
      .job li {
        margin-bottom: 5px;
        opacity: 0.8;
      }
      
      .project {
        margin-bottom: 14px;
      }
      
      .project-title {
        font-size: 15px;
        line-height: 20px;
        margin-bottom: 4px;
        font-weight: 500;
        letter-spacing: -0.01em;
      }
      
      .project-meta {
        font-size: 10px;
        line-height: 14px;
        opacity: 0.4;
        margin-bottom: 7px;
        font-weight: 400;
      }
      
      .project ul {
        list-style: none;
        padding-left: 0;
        margin-bottom: 7px;
      }
      
      .project li {
        margin-bottom: 4px;
        opacity: 0.8;
      }
      
      .tags {
        display: flex;
        flex-wrap: wrap;
        gap: 5px;
      }
      
      .tag {
        border: 1px solid rgba(10, 10, 10, 0.1);
        padding: 2px 8px;
        border-radius: 6px;
        font-size: 9px;
        line-height: 13px;
        opacity: 0.5;
        font-weight: 400;
      }
      
      @media print {
        body {
          padding: 0;
        }
      }
    </style>
  </head>
  <body>
    <div class="resume-container">
      <!-- Header -->
      <header>
        <h1>Austin Carson</h1>
        <div class="subtitle">Product Designer & Front-End Developer</div>
        <div class="contact-info">
          <span>Seattle, Washington</span>
          <a href="mailto:austinscarson@gmail.com">austinscarson@gmail.com</a>
          <a href="https://www.linkedin.com/in/austin-carson">linkedin.com/in/austin-carson</a>
          <a href="tel:+12066204803">(206) 620-4803</a>
        </div>
      </header>

      <div class="divider"></div>

      <!-- Summary -->
      <div class="summary">
        Product designer and front-end developer specializing in design systems, component architecture, and user-centered interfaces. Expertise spans Figma-to-code workflows, React development, and systematic design thinking. Creates cohesive digital experiences through thoughtful interaction design, accessible components, and performance-optimized front-end implementation. Bridges design and engineering to deliver polished, scalable products.
      </div>

      <!-- Core Competencies -->
      <div class="section">
        <h2 class="section-title">Core Competencies</h2>
        <div class="competencies">
          <div class="competency">
            <h4>Product Design</h4>
            <ul>
              <li>User Interface & Experience Design</li>
              <li>Design Systems & Component Libraries</li>
              <li>Prototyping & User Flow Mapping</li>
              <li>Responsive & Mobile-First Design</li>
              <li>Accessibility (WCAG) & Inclusive Design</li>
            </ul>
          </div>
          <div class="competency">
            <h4>Frontend Development</h4>
            <ul>
              <li>React, Next.js, TypeScript, Tailwind CSS</li>
              <li>Component Architecture & State Management</li>
              <li>Theme Systems & Design Tokens</li>
              <li>Performance Optimization & Web Vitals</li>
            </ul>
          </div>
          <div class="competency">
            <h4>Design Tools & Workflow</h4>
            <ul>
              <li>Figma, Adobe Creative Suite, Sketch</li>
              <li>Version Control (Git) & Collaboration</li>
              <li>SVG Optimization & Icon Systems</li>
              <li>Design-to-Development Handoff</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Two Column Layout -->
      <div class="two-column">
        <!-- Left Column - Experience & Education -->
        <div>
          <div class="section">
            <h2 class="section-title">Professional Experience</h2>
            
            <div class="job">
              <h3 class="job-title">Product Designer & Developer</h3>
              <div class="job-meta">Freelance · Remote · 2023 to Present</div>
              <ul>
                <li>Designed and developed user interfaces for web applications with focus on intuitive interaction patterns and visual consistency.</li>
                <li>Built reusable component libraries in React with comprehensive documentation and accessibility compliance.</li>
                <li>Collaborated with clients to translate business requirements into user-centered design solutions and functional prototypes.</li>
                <li>Implemented design systems with tokenized color, typography, and spacing for brand consistency across platforms.</li>
              </ul>
            </div>

            <div class="job">
              <h3 class="job-title">Client & Product Specialist</h3>
              <div class="job-meta">Swarovski Crystal · Seattle, WA · 2024 to July 2025</div>
              <ul>
                <li>Designed customer journey experiences that increased engagement and conversion by ~20%.</li>
                <li>Optimized visual merchandising layouts applying UX principles and behavioral design insights.</li>
                <li>Developed product presentation strategies emphasizing storytelling, clarity, and brand alignment.</li>
              </ul>
            </div>
          </div>

          <div class="section">
            <h2 class="section-title">Education</h2>
            <div>
              <h3 class="job-title">B.S. in Biological Sciences</h3>
              <div class="job-meta">Southern Methodist University · 2020</div>
            </div>
          </div>
        </div>

        <!-- Right Column - Projects -->
        <div>
          <div class="section">
            <h2 class="section-title">Key Projects & Portfolio</h2>

            <div class="project">
              <h3 class="project-title">Korwin Design System</h3>
              <div class="project-meta">Design System · 2025</div>
              <ul>
                <li>Centralized design system and component library for consistent UI across projects with design tokens and documentation.</li>
                <li>Built production-ready components with Storybook integration for interactive component exploration.</li>
              </ul>
              <div class="tags">
                <span class="tag">React</span>
                <span class="tag">TypeScript</span>
                <span class="tag">Tailwind CSS</span>
                <span class="tag">Design Tokens</span>
                <span class="tag">Storybook</span>
              </div>
            </div>

            <div class="project">
              <h3 class="project-title">Color Rodeo</h3>
              <div class="project-meta">Tool / Playground · 2025</div>
              <ul>
                <li>Playful color system playground for exploring palettes and contrast with design token integration and real-time feedback.</li>
                <li>Features systematic color palette generation and contrast checking for accessibility compliance.</li>
              </ul>
            </div>

            <div class="project">
              <h3 class="project-title">Cell Biology Virtual Textbook</h3>
              <div class="project-meta">Education · 2025</div>
              <ul>
                <li>Interactive, web-native biology textbook with modern layouts and motion design to enhance learning experiences.</li>
                <li>Rich interactive content with thoughtful typography to make complex biological concepts accessible.</li>
              </ul>
            </div>

            <div class="project">
              <h3 class="project-title">Cameo Web</h3>
              <div class="project-meta">Web Experience · 2025</div>
              <ul>
                <li>Cinematic landing and profile concept exploring storytelling through layout systems and typography hierarchy.</li>
                <li>Sophisticated presentation with compelling narrative flow and interface design experimentation.</li>
              </ul>
            </div>

            <div class="project">
              <h3 class="project-title">Scroll Animation Library</h3>
              <div class="project-meta">Animation Library · 2025</div>
              <ul>
                <li>Collection of scroll-based animation experiments optimized for performance and visual impact.</li>
                <li>Reusable motion system library with plug-and-play scroll choreography patterns.</li>
              </ul>
            </div>

            <div class="project">
              <h3 class="project-title">Floral Design SVG</h3>
              <div class="project-meta">SVG / Illustration · 2025</div>
              <ul>
                <li>SVG-based floral illustration system with modular components for icons, labels, and decorative frames.</li>
                <li>Scalable illustration library for brand applications with botanical composition tools.</li>
              </ul>
            </div>

            <div class="project">
              <h3 class="project-title">Pattern Gallery</h3>
              <div class="project-meta">Gallery / Utility · 2025</div>
              <ul>
                <li>Curated gallery of patterns and surfaces for reuse across interfaces and brands as texture library resource.</li>
                <li>Searchable patterns with live examples for consistent visual systems across projects.</li>
              </ul>
            </div>

            <div class="project">
              <h3 class="project-title">Graphic Design Gallery</h3>
              <div class="project-meta">Gallery · 2025</div>
              <ul>
                <li>Visual archive of graphic design work with print-inspired layouts and image systems.</li>
                <li>Elegant showcase with editorial typography and grid systems honoring the craft of graphic design.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <script>
      // Auto-trigger print dialog after page loads
      window.onload = function() {
        setTimeout(function() {
          window.print();
        }, 250);
      };
    </script>
  </body>
</html>
      `);
      printWindow.document.close();
    }
  };

  return (
    <section 
      id="resume" 
      className="section-padding bg-background"
      style={{ 
        minHeight: '100vh',
        position: 'relative',
      }}
    >
      <div className="container-main">
        {/* Download Button - Fixed Position */}
        <motion.div
          className="hidden md:block fixed z-40"
          style={{ 
            right: 'var(--space-8)',
            bottom: 'var(--space-8)',
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: DURATION.normal, ease: EASE_OUT_EXPO, delay: 0.3 }}
        >
          <button
            onClick={handleDownloadPDF}
            className="inline-flex items-center gap-3 bg-[var(--color-brand-purple)] text-white hover:bg-[var(--color-brand-purple-dark)] transition-all rounded-[6px] shadow-lg hover:shadow-xl no-highlight cursor-pointer"
            style={{
              padding: 'var(--space-4) var(--space-6)',
              fontSize: '17px',
              fontWeight: 400,
              transitionDuration: '0.3s',
            }}
            aria-label="Download Austin Carson's resume as a single page PDF"
          >
            <Download className="w-5 h-5" />
            Download Resume PDF
          </button>
        </motion.div>

        {/* Mobile Download Button */}
        <motion.div
          className="md:hidden flex justify-center"
          style={{ marginBottom: 'var(--space-12)' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: DURATION.normal, ease: EASE_OUT_EXPO }}
        >
          <button
            onClick={handleDownloadPDF}
            className="inline-flex items-center gap-3 bg-[var(--color-brand-purple)] text-white hover:bg-[var(--color-brand-purple-dark)] transition-all rounded-[6px] no-highlight cursor-pointer"
            style={{
              padding: 'var(--space-4) var(--space-6)',
              fontSize: '17px',
              fontWeight: 400,
              transitionDuration: '0.3s',
            }}
            aria-label="Download Austin Carson's resume as a single page PDF"
          >
            <Download className="w-5 h-5" />
            Download Resume PDF
          </button>
        </motion.div>

        {/* Resume Content */}
        <motion.div
          className="max-w-[900px] mx-auto"
          initial={{ opacity: 0, y: isMobile ? 20 : 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: isMobile ? 0.6 : DURATION.normal, ease: EASE_OUT_EXPO }}
        >
          {/* Header */}
          <header style={{ marginBottom: 'var(--space-12)' }}>
            <h1 style={{ marginBottom: 'var(--space-2)' }}>Austin Carson</h1>
            <h2 style={{ marginBottom: 'var(--space-6)', opacity: 0.8 }}>
              Product Designer & Front-End Developer
            </h2>
            <div className="flex flex-wrap items-center gap-4 md:gap-6">
              <span className="flex items-center gap-2 text-meta">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                Seattle, Washington
              </span>
              <a href="mailto:austinscarson@gmail.com" className="no-highlight text-meta hover:opacity-100 transition-opacity">
                austinscarson@gmail.com
              </a>
              <a href="https://www.linkedin.com/in/austin-carson" rel="nofollow" className="no-highlight text-meta hover:opacity-100 transition-opacity">
                linkedin.com/in/austin-carson
              </a>
              <a href="tel:+12066204803" className="no-highlight text-meta hover:opacity-100 transition-opacity">
                (206) 620-4803
              </a>
            </div>
          </header>

          <div className="border-t border-border" style={{ marginBottom: 'var(--space-12)' }}></div>

          {/* Summary */}
          <motion.section
            style={{ marginBottom: 'var(--space-16)' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: DURATION.normal, ease: EASE_OUT_EXPO, delay: 0.1 }}
          >
            <p className="text-body-medium" style={{ opacity: 0.85 }}>
              Product designer and front-end developer specializing in design systems, component architecture, and user-centered interfaces. Expertise spans Figma-to-code workflows, React development, and systematic design thinking. Creates cohesive digital experiences through thoughtful interaction design, accessible components, and performance-optimized front-end implementation. Bridges design and engineering to deliver polished, scalable products.
            </p>
          </motion.section>

          {/* Core Competencies */}
          <motion.section
            style={{ marginBottom: 'var(--space-16)' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: DURATION.normal, ease: EASE_OUT_EXPO, delay: 0.15 }}
          >
            <h2 style={{ marginBottom: 'var(--space-8)' }}>Core Competencies</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h4 style={{ marginBottom: 'var(--space-4)' }}>Product Design</h4>
                <ul className="space-y-2 text-small">
                  <li className="opacity-80">User Interface & Experience Design</li>
                  <li className="opacity-80">Design Systems & Component Libraries</li>
                  <li className="opacity-80">Prototyping & User Flow Mapping</li>
                  <li className="opacity-80">Responsive & Mobile-First Design</li>
                  <li className="opacity-80">Accessibility (WCAG) & Inclusive Design</li>
                </ul>
              </div>
              <div>
                <h4 style={{ marginBottom: 'var(--space-4)' }}>Frontend Development</h4>
                <ul className="space-y-2 text-small">
                  <li className="opacity-80">React, Next.js, TypeScript, Tailwind CSS</li>
                  <li className="opacity-80">Component Architecture & State Management</li>
                  <li className="opacity-80">Theme Systems & Design Tokens</li>
                  <li className="opacity-80">Performance Optimization & Web Vitals</li>
                </ul>
              </div>
              <div>
                <h4 style={{ marginBottom: 'var(--space-4)' }}>Design Tools & Workflow</h4>
                <ul className="space-y-2 text-small">
                  <li className="opacity-80">Figma, Adobe Creative Suite, Sketch</li>
                  <li className="opacity-80">Version Control (Git) & Collaboration</li>
                  <li className="opacity-80">SVG Optimization & Icon Systems</li>
                  <li className="opacity-80">Design-to-Development Handoff</li>
                </ul>
              </div>
            </div>
          </motion.section>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Professional Experience */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: DURATION.normal, ease: EASE_OUT_EXPO, delay: 0.2 }}
            >
              <h2 style={{ marginBottom: 'var(--space-8)' }}>Professional Experience</h2>
              
              <div style={{ marginBottom: 'var(--space-12)' }}>
                <h3 style={{ marginBottom: 'var(--space-2)' }}>Product Designer & Developer</h3>
                <p className="text-meta" style={{ marginBottom: 'var(--space-6)' }}>Freelance · Remote · 2023 to Present</p>
                <ul className="space-y-3 text-small">
                  <li className="opacity-80">Designed and developed user interfaces for web applications with focus on intuitive interaction patterns and visual consistency.</li>
                  <li className="opacity-80">Built reusable component libraries in React with comprehensive documentation and accessibility compliance.</li>
                  <li className="opacity-80">Collaborated with clients to translate business requirements into user-centered design solutions and functional prototypes.</li>
                  <li className="opacity-80">Implemented design systems with tokenized color, typography, and spacing for brand consistency across platforms.</li>
                </ul>
              </div>

              <div style={{ marginBottom: 'var(--space-16)' }}>
                <h3 style={{ marginBottom: 'var(--space-2)' }}>Client & Product Specialist</h3>
                <p className="text-meta" style={{ marginBottom: 'var(--space-6)' }}>Swarovski Crystal · Seattle, WA · 2024 to July 2025</p>
                <ul className="space-y-3 text-small">
                  <li className="opacity-80">Designed customer journey experiences that increased engagement and conversion by ~20%.</li>
                  <li className="opacity-80">Optimized visual merchandising layouts applying UX principles and behavioral design insights.</li>
                  <li className="opacity-80">Developed product presentation strategies emphasizing storytelling, clarity, and brand alignment.</li>
                </ul>
              </div>

              {/* Education */}
              <div>
                <h2 className="text-[44px] leading-[52px]" style={{ marginBottom: 'var(--space-8)', fontWeight: 400, letterSpacing: '-0.02em' }}>Education</h2>
                <div>
                  <h3 style={{ marginBottom: 'var(--space-2)' }}>B.S. in Biological Sciences</h3>
                  <p className="text-meta">Southern Methodist University · 2020</p>
                </div>
              </div>
            </motion.section>

            {/* Key Projects */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: DURATION.normal, ease: EASE_OUT_EXPO, delay: 0.25 }}
            >
              <h2 style={{ marginBottom: 'var(--space-8)' }}>Key Projects & Portfolio</h2>

              <div style={{ marginBottom: 'var(--space-10)' }}>
                <h3 style={{ marginBottom: 'var(--space-3)' }}>Korwin Design System</h3>
                <p className="text-caption" style={{ marginBottom: 'var(--space-4)' }}>Design System · 2025</p>
                <ul className="space-y-2 text-small" style={{ marginBottom: 'var(--space-4)' }}>
                  <li className="opacity-80">Centralized design system and component library for consistent UI across projects with design tokens and documentation.</li>
                  <li className="opacity-80">Built production-ready components with Storybook integration for interactive component exploration.</li>
                </ul>
                <div className="flex flex-wrap gap-2">
                  {['React', 'TypeScript', 'Tailwind CSS', 'Design Tokens', 'Storybook'].map((tag) => (
                    <span
                      key={tag}
                      className="text-caption border border-border rounded-[6px]"
                      style={{
                        padding: 'var(--space-1) var(--space-3)',
                        opacity: 0.5,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: 'var(--space-10)' }}>
                <h3 style={{ marginBottom: 'var(--space-3)' }}>Color Rodeo</h3>
                <p className="text-caption" style={{ marginBottom: 'var(--space-4)' }}>Tool / Playground · 2025</p>
                <ul className="space-y-2 text-small">
                  <li className="opacity-80">Playful color system playground for exploring palettes and contrast with design token integration and real-time feedback.</li>
                  <li className="opacity-80">Features systematic color palette generation and contrast checking for accessibility compliance.</li>
                </ul>
              </div>

              <div style={{ marginBottom: 'var(--space-10)' }}>
                <h3 style={{ marginBottom: 'var(--space-3)' }}>Cell Biology Virtual Textbook</h3>
                <p className="text-caption" style={{ marginBottom: 'var(--space-4)' }}>Education · 2025</p>
                <ul className="space-y-2 text-small">
                  <li className="opacity-80">Interactive, web-native biology textbook with modern layouts and motion design to enhance learning experiences.</li>
                  <li className="opacity-80">Rich interactive content with thoughtful typography to make complex biological concepts accessible.</li>
                </ul>
              </div>

              <div style={{ marginBottom: 'var(--space-10)' }}>
                <h3 style={{ marginBottom: 'var(--space-3)' }}>Cameo Web</h3>
                <p className="text-caption" style={{ marginBottom: 'var(--space-4)' }}>Web Experience · 2025</p>
                <ul className="space-y-2 text-small">
                  <li className="opacity-80">Cinematic landing and profile concept exploring storytelling through layout systems and typography hierarchy.</li>
                  <li className="opacity-80">Sophisticated presentation with compelling narrative flow and interface design experimentation.</li>
                </ul>
              </div>

              <div style={{ marginBottom: 'var(--space-10)' }}>
                <h3 style={{ marginBottom: 'var(--space-3)' }}>Scroll Animation Library</h3>
                <p className="text-caption" style={{ marginBottom: 'var(--space-4)' }}>Animation Library · 2025</p>
                <ul className="space-y-2 text-small">
                  <li className="opacity-80">Collection of scroll-based animation experiments optimized for performance and visual impact.</li>
                  <li className="opacity-80">Reusable motion system library with plug-and-play scroll choreography patterns.</li>
                </ul>
              </div>

              <div style={{ marginBottom: 'var(--space-10)' }}>
                <h3 style={{ marginBottom: 'var(--space-3)' }}>Floral Design SVG</h3>
                <p className="text-caption" style={{ marginBottom: 'var(--space-4)' }}>SVG / Illustration · 2025</p>
                <ul className="space-y-2 text-small">
                  <li className="opacity-80">SVG-based floral illustration system with modular components for icons, labels, and decorative frames.</li>
                  <li className="opacity-80">Scalable illustration library for brand applications with botanical composition tools.</li>
                </ul>
              </div>

              <div style={{ marginBottom: 'var(--space-10)' }}>
                <h3 style={{ marginBottom: 'var(--space-3)' }}>Pattern Gallery</h3>
                <p className="text-caption" style={{ marginBottom: 'var(--space-4)' }}>Gallery / Utility · 2025</p>
                <ul className="space-y-2 text-small">
                  <li className="opacity-80">Curated gallery of patterns and surfaces for reuse across interfaces and brands as texture library resource.</li>
                  <li className="opacity-80">Searchable patterns with live examples for consistent visual systems across projects.</li>
                </ul>
              </div>

              <div>
                <h3 style={{ marginBottom: 'var(--space-3)' }}>Graphic Design Gallery</h3>
                <p className="text-caption" style={{ marginBottom: 'var(--space-4)' }}>Gallery · 2025</p>
                <ul className="space-y-2 text-small">
                  <li className="opacity-80">Visual archive of graphic design work with print-inspired layouts and image systems.</li>
                  <li className="opacity-80">Elegant showcase with editorial typography and grid systems honoring the craft of graphic design.</li>
                </ul>
              </div>
            </motion.section>
          </div>

          {/* PDF Tip */}
          <motion.div
            className="border-t border-border text-caption text-center"
            style={{ 
              marginTop: 'var(--space-16)',
              paddingTop: 'var(--space-8)',
              opacity: 0.4,
            }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.4 }}
            viewport={{ once: true }}
            transition={{ duration: DURATION.normal, ease: EASE_OUT_EXPO, delay: 0.35 }}
          >
            💡 PDF tip: Use your browser's print dialog (⌘P / Ctrl+P) and choose Save as PDF for crisp output.
          </motion.div>
        </motion.div>
      </div>

      {/* Print Styles */}
      <style>{`
        @media print {
          /* Hide everything except resume */
          nav, 
          footer, 
          button,
          [class*="Toaster"],
          #hero,
          #work,
          #systems,
          #essays,
          #about,
          #contact {
            display: none !important;
          }
          
          /* Ensure resume section is visible */
          #resume {
            display: block !important;
            padding: 32px !important;
            min-height: auto !important;
            page-break-after: avoid !important;
            background: white !important;
          }
          
          body {
            margin: 0 !important;
            padding: 0 !important;
            background: white !important;
          }
          
          html, body {
            height: auto !important;
            overflow: visible !important;
          }
          
          main {
            display: block !important;
          }
          
          .container-main {
            max-width: 100% !important;
            padding: 0 !important;
            margin: 0 !important;
          }
          
          /* Ensure all text is black on white */
          * {
            color: #000 !important;
            background: transparent !important;
            border-color: #ddd !important;
          }
          
          /* Remove any transforms or animations */
          * {
            animation: none !important;
            transition: none !important;
            transform: none !important;
          }
          
          /* Compact typography for single page */
          h1 { 
            font-size: 24px !important; 
            line-height: 30px !important;
            margin-bottom: 4px !important;
          }
          h2 { 
            font-size: 16px !important; 
            line-height: 22px !important;
            margin-bottom: 10px !important;
          }
          h3 { 
            font-size: 13px !important; 
            line-height: 18px !important;
            margin-bottom: 3px !important;
          }
          h4 { 
            font-size: 16px !important; 
            line-height: 22px !important;
            margin-bottom: 3px !important;
          }
          p, li { 
            font-size: 9px !important; 
            line-height: 13px !important;
            opacity: 1 !important;
          }
          .text-small { 
            font-size: 9px !important;
            line-height: 13px !important;
          }
          .text-caption { 
            font-size: 8px !important;
            line-height: 12px !important;
          }
          .text-meta { 
            font-size: 8px !important;
            line-height: 12px !important;
            text-transform: uppercase !important;
            letter-spacing: 0.05em !important;
            opacity: 0.6 !important;
          }
          .text-body-medium {
            font-size: 9px !important;
            line-height: 13px !important;
          }
          
          /* Compact spacing for single page */
          header {
            margin-bottom: 12px !important;
          }
          
          section {
            margin-bottom: 16px !important;
          }
          
          .space-y-2 > * + * { margin-top: 3px !important; }
          .space-y-3 > * + * { margin-top: 4px !important; }
          .gap-2 { gap: 4px !important; }
          .gap-4 { gap: 6px !important; }
          .gap-6 { gap: 8px !important; }
          .gap-8 { gap: 12px !important; }
          .gap-12 { gap: 16px !important; }
          .gap-16 { gap: 20px !important; }
          
          /* Reduce all margin/padding CSS variables */
          [style*="var(--space-2)"] { 
            margin-bottom: 3px !important; 
          }
          [style*="var(--space-3)"] { 
            margin-bottom: 4px !important; 
          }
          [style*="var(--space-4)"] { 
            margin-bottom: 6px !important; 
          }
          [style*="var(--space-6)"] { 
            margin-bottom: 8px !important; 
          }
          [style*="var(--space-8)"] { 
            margin-bottom: 10px !important; 
          }
          [style*="var(--space-10)"] { 
            margin-bottom: 12px !important; 
          }
          [style*="var(--space-12)"] { 
            margin-bottom: 14px !important; 
          }
          [style*="var(--space-16)"] { 
            margin-bottom: 18px !important; 
          }
          
          /* Grid layout for print - force 2 columns */
          .grid {
            display: grid !important;
          }
          
          .grid-cols-1.lg\\:grid-cols-2 {
            grid-template-columns: 1fr 1fr !important;
            gap: 24px !important;
          }
          
          .grid-cols-1.md\\:grid-cols-3 {
            grid-template-columns: repeat(3, 1fr) !important;
            gap: 16px !important;
          }
          
          /* Prevent page breaks inside elements */
          h1, h2, h3, h4, h5, h6 {
            page-break-after: avoid !important;
            page-break-inside: avoid !important;
          }
          
          p, li {
            page-break-inside: avoid !important;
          }
          
          ul {
            page-break-inside: avoid !important;
          }
          
          div[style*="marginBottom"] {
            page-break-inside: avoid !important;
          }
          
          /* Border top should be visible but compact */
          .border-t {
            border-top: 1px solid #ddd !important;
            margin-bottom: 12px !important;
            padding-top: 0 !important;
          }
          
          /* Tags/badges - more compact */
          span[class*="border"] {
            border: 1px solid #ddd !important;
            padding: 1px 6px !important;
            border-radius: 3px !important;
            font-size: 7px !important;
          }
          
          /* SVG icons */
          svg {
            width: 10px !important;
            height: 10px !important;
          }
          
          /* Hide PDF tip */
          [style*="opacity: 0.4"] {
            display: none !important;
          }
          
          /* Ensure single page */
          .max-w-\\[900px\\] {
            max-width: 100% !important;
          }
          
          /* Show all resume content */
          #resume * {
            display: revert !important;
          }
          
          /* But keep buttons hidden */
          #resume button {
            display: none !important;
          }
        }
        
        @page {
          margin: 0.5in 0.6in;
          size: letter;
        }
      `}</style>
    </section>
  );
}