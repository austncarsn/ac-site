export function PrintResume() {
  return (
    <html>
      <head>
        <title>Austin Carson - Resume</title>
        <style>{`
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
            font-family: 'Georgia', 'Times New Roman', serif;
            background: white;
            color: #000;
            line-height: 1.4;
            padding: 32px;
          }
          
          .resume-container {
            max-width: 100%;
          }
          
          h1 {
            font-size: 24px;
            line-height: 30px;
            margin-bottom: 4px;
            font-weight: 400;
          }
          
          h2 {
            font-size: 16px;
            line-height: 22px;
            margin-bottom: 10px;
            font-weight: 400;
          }
          
          h3 {
            font-size: 13px;
            line-height: 18px;
            margin-bottom: 3px;
            font-weight: 600;
          }
          
          h4 {
            font-size: 16px;
            line-height: 22px;
            margin-bottom: 3px;
            font-weight: 400;
          }
          
          p, li {
            font-size: 9px;
            line-height: 13px;
          }
          
          .subtitle {
            font-size: 16px;
            line-height: 22px;
            opacity: 0.8;
            margin-bottom: 8px;
          }
          
          .contact-info {
            display: flex;
            flex-wrap: wrap;
            gap: 12px;
            margin-bottom: 12px;
            font-size: 8px;
            text-transform: uppercase;
            letter-spacing: 0.05em;
          }
          
          .contact-info span,
          .contact-info a {
            opacity: 0.6;
            color: #000;
            text-decoration: none;
          }
          
          .divider {
            border-top: 1px solid #ddd;
            margin: 12px 0;
          }
          
          .summary {
            font-size: 9px;
            line-height: 13px;
            margin-bottom: 18px;
            opacity: 0.85;
          }
          
          .section {
            margin-bottom: 18px;
          }
          
          .section-title {
            font-size: 16px;
            line-height: 22px;
            margin-bottom: 10px;
            font-weight: 400;
          }
          
          .competencies {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 16px;
            margin-bottom: 18px;
          }
          
          .competency h4 {
            margin-bottom: 6px;
          }
          
          .competency ul {
            list-style: none;
          }
          
          .competency li {
            margin-bottom: 3px;
            opacity: 0.8;
          }
          
          .two-column {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 24px;
          }
          
          .job {
            margin-bottom: 14px;
          }
          
          .job-title {
            font-size: 13px;
            line-height: 18px;
            margin-bottom: 3px;
            font-weight: 600;
          }
          
          .job-meta {
            font-size: 8px;
            line-height: 12px;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            opacity: 0.6;
            margin-bottom: 8px;
          }
          
          .job ul {
            list-style: none;
            padding-left: 0;
          }
          
          .job li {
            margin-bottom: 4px;
            opacity: 0.8;
          }
          
          .project {
            margin-bottom: 12px;
          }
          
          .project-title {
            font-size: 13px;
            line-height: 18px;
            margin-bottom: 4px;
            font-weight: 600;
          }
          
          .project-meta {
            font-size: 8px;
            line-height: 12px;
            opacity: 0.6;
            margin-bottom: 6px;
          }
          
          .project ul {
            list-style: none;
            padding-left: 0;
            margin-bottom: 6px;
          }
          
          .project li {
            margin-bottom: 3px;
            opacity: 0.8;
          }
          
          .tags {
            display: flex;
            flex-wrap: wrap;
            gap: 4px;
          }
          
          .tag {
            border: 1px solid #ddd;
            padding: 1px 6px;
            border-radius: 3px;
            font-size: 7px;
            opacity: 0.5;
          }
          
          @media print {
            body {
              padding: 0;
            }
          }
        `}</style>
      </head>
      <body>
        <div className="resume-container">
          {/* Header */}
          <header>
            <h1>Austin Carson</h1>
            <div className="subtitle">Product Designer & Front-End Developer</div>
            <div className="contact-info">
              <span>Seattle, Washington</span>
              <a href="mailto:austinscarson@gmail.com">austinscarson@gmail.com</a>
              <a href="https://www.linkedin.com/in/austin-carson">linkedin.com/in/austin-carson</a>
              <a href="tel:+12066204803">(206) 620-4803</a>
            </div>
          </header>

          <div className="divider"></div>

          {/* Summary */}
          <div className="summary">
            Product designer and front-end developer specializing in design systems, component architecture, and user-centered interfaces. Expertise spans Figma-to-code workflows, React development, and systematic design thinking. Creates cohesive digital experiences through thoughtful interaction design, accessible components, and performance-optimized front-end implementation. Bridges design and engineering to deliver polished, scalable products.
          </div>

          {/* Core Competencies */}
          <div className="section">
            <h2 className="section-title">Core Competencies</h2>
            <div className="competencies">
              <div className="competency">
                <h4>Product Design</h4>
                <ul>
                  <li>User Interface & Experience Design</li>
                  <li>Design Systems & Component Libraries</li>
                  <li>Prototyping & User Flow Mapping</li>
                  <li>Responsive & Mobile-First Design</li>
                  <li>Accessibility (WCAG) & Inclusive Design</li>
                </ul>
              </div>
              <div className="competency">
                <h4>Frontend Development</h4>
                <ul>
                  <li>React, Next.js, TypeScript, Tailwind CSS</li>
                  <li>Component Architecture & State Management</li>
                  <li>Theme Systems & Design Tokens</li>
                  <li>Performance Optimization & Web Vitals</li>
                </ul>
              </div>
              <div className="competency">
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

          {/* Two Column Layout */}
          <div className="two-column">
            {/* Left Column - Experience & Education */}
            <div>
              <div className="section">
                <h2 className="section-title">Professional Experience</h2>
                
                <div className="job">
                  <h3 className="job-title">Product Designer & Developer</h3>
                  <div className="job-meta">Freelance · Remote · 2023 to Present</div>
                  <ul>
                    <li>Designed and developed user interfaces for web applications with focus on intuitive interaction patterns and visual consistency.</li>
                    <li>Built reusable component libraries in React with comprehensive documentation and accessibility compliance.</li>
                    <li>Collaborated with clients to translate business requirements into user-centered design solutions and functional prototypes.</li>
                    <li>Implemented design systems with tokenized color, typography, and spacing for brand consistency across platforms.</li>
                  </ul>
                </div>

                <div className="job">
                  <h3 className="job-title">Client & Product Specialist</h3>
                  <div className="job-meta">Swarovski Crystal · Seattle, WA · 2024 to July 2025</div>
                  <ul>
                    <li>Designed customer journey experiences that increased engagement and conversion by ~20%.</li>
                    <li>Optimized visual merchandising layouts applying UX principles and behavioral design insights.</li>
                    <li>Developed product presentation strategies emphasizing storytelling, clarity, and brand alignment.</li>
                  </ul>
                </div>
              </div>

              <div className="section">
                <h2 className="section-title">Education</h2>
                <div>
                  <h3 className="job-title">B.S. in Biological Sciences</h3>
                  <div className="job-meta">Southern Methodist University · 2020</div>
                </div>
              </div>
            </div>

            {/* Right Column - Projects */}
            <div>
              <div className="section">
                <h2 className="section-title">Key Projects & Portfolio</h2>

                <div className="project">
                  <h3 className="project-title">Korwin Design System</h3>
                  <div className="project-meta">Design System · 2025</div>
                  <ul>
                    <li>Centralized design system and component library for consistent UI across projects with design tokens and documentation.</li>
                    <li>Built production-ready components with Storybook integration for interactive component exploration.</li>
                  </ul>
                  <div className="tags">
                    <span className="tag">React</span>
                    <span className="tag">TypeScript</span>
                    <span className="tag">Tailwind CSS</span>
                    <span className="tag">Design Tokens</span>
                    <span className="tag">Storybook</span>
                  </div>
                </div>

                <div className="project">
                  <h3 className="project-title">Color Rodeo</h3>
                  <div className="project-meta">Tool / Playground · 2025</div>
                  <ul>
                    <li>Playful color system playground for exploring palettes and contrast with design token integration and real-time feedback.</li>
                    <li>Features systematic color palette generation and contrast checking for accessibility compliance.</li>
                  </ul>
                </div>

                <div className="project">
                  <h3 className="project-title">Cell Biology Virtual Textbook</h3>
                  <div className="project-meta">Education · 2025</div>
                  <ul>
                    <li>Interactive, web-native biology textbook with modern layouts and motion design to enhance learning experiences.</li>
                    <li>Rich interactive content with thoughtful typography to make complex biological concepts accessible.</li>
                  </ul>
                </div>

                <div className="project">
                  <h3 className="project-title">Cameo Web</h3>
                  <div className="project-meta">Web Experience · 2025</div>
                  <ul>
                    <li>Cinematic landing and profile concept exploring storytelling through layout systems and typography hierarchy.</li>
                    <li>Sophisticated presentation with compelling narrative flow and interface design experimentation.</li>
                  </ul>
                </div>

                <div className="project">
                  <h3 className="project-title">Scroll Animation Library</h3>
                  <div className="project-meta">Animation Library · 2025</div>
                  <ul>
                    <li>Collection of scroll-based animation experiments optimized for performance and visual impact.</li>
                    <li>Reusable motion system library with plug-and-play scroll choreography patterns.</li>
                  </ul>
                </div>

                <div className="project">
                  <h3 className="project-title">Floral Design SVG</h3>
                  <div className="project-meta">SVG / Illustration · 2025</div>
                  <ul>
                    <li>SVG-based floral illustration system with modular components for icons, labels, and decorative frames.</li>
                    <li>Scalable illustration library for brand applications with botanical composition tools.</li>
                  </ul>
                </div>

                <div className="project">
                  <h3 className="project-title">Pattern Gallery</h3>
                  <div className="project-meta">Gallery / Utility · 2025</div>
                  <ul>
                    <li>Curated gallery of patterns and surfaces for reuse across interfaces and brands as texture library resource.</li>
                    <li>Searchable patterns with live examples for consistent visual systems across projects.</li>
                  </ul>
                </div>

                <div className="project">
                  <h3 className="project-title">Graphic Design Gallery</h3>
                  <div className="project-meta">Gallery · 2025</div>
                  <ul>
                    <li>Visual archive of graphic design work with print-inspired layouts and image systems.</li>
                    <li>Elegant showcase with editorial typography and grid systems honoring the craft of graphic design.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
