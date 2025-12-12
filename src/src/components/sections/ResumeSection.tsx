import { motion } from "motion/react";
import {
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import { EASE_OUT_EXPO, DURATION } from "../../lib/constants";
import { Download, MapPin } from "lucide-react";

// Constants moved outside component to prevent recreation
const RESUME_DATA = {
  name: "Austin Carson",
  title: "Product Designer & Front-End Developer",
  location: "Seattle, Washington",
  email: "austinscarson@gmail.com",
  linkedin: "linkedin.com/in/austncarsn",
  linkedinUrl: "https://www.linkedin.com/in/austncarsn",
  phone: "(206) 620-4803",
  phoneRaw: "+12066204803",
  summary: `Product designer and front-end developer specializing in design systems, component architecture, and user-centered interfaces. Expertise spans Figma-to-code workflows, React development, and systematic design thinking. Creates cohesive digital experiences through thoughtful interaction design, accessible components, and performance-optimized front-end implementation. Bridges design and engineering to deliver polished, scalable products.`,
  competencies: [
    {
      title: "Product Design",
      skills: [
        "User Interface & Experience Design",
        "Design Systems & Component Libraries",
        "Prototyping & User Flow Mapping",
        "Responsive & Mobile-First Design",
        "Accessibility (WCAG) & Inclusive Design",
      ],
    },
    {
      title: "Frontend Development",
      skills: [
        "React, Next.js, TypeScript, Tailwind CSS",
        "Component Architecture & State Management",
        "Theme Systems & Design Tokens",
        "Performance Optimization & Web Vitals",
      ],
    },
    {
      title: "Design Tools & Workflow",
      skills: [
        "Figma, Adobe Creative Suite, Sketch",
        "Version Control (Git) & Collaboration",
        "SVG Optimization & Icon Systems",
        "Design-to-Development Handoff",
      ],
    },
  ],
  experience: [
    {
      title: "Product Designer & Developer",
      company: "Freelance",
      location: "Remote",
      period: "2023 to Present",
      highlights: [
        "Designed and developed user interfaces for web applications with focus on intuitive interaction patterns and visual consistency.",
        "Built reusable component libraries in React with comprehensive documentation and accessibility compliance.",
        "Collaborated with clients to translate business requirements into user-centered design solutions and functional prototypes.",
        "Implemented design systems with tokenized color, typography, and spacing for brand consistency across platforms.",
      ],
    },
    {
      title: "Client & Product Specialist",
      company: "Swarovski Crystal",
      location: "Seattle, WA",
      period: "2024 to July 2025",
      highlights: [
        "Designed customer journey experiences that increased engagement and conversion by ~20%.",
        "Optimized visual merchandising layouts applying UX principles and behavioral design insights.",
        "Developed product presentation strategies emphasizing storytelling, clarity, and brand alignment.",
      ],
    },
  ],
  education: {
    degree: "B.S. in Biological Sciences",
    school: "Southern Methodist University",
    year: "2020",
  },
  projects: [
    {
      title: "Korwin Design System",
      type: "Design System",
      year: "2025",
      description: [
        "Centralized design system and component library for consistent UI across projects with design tokens and documentation.",
        "Built production-ready components with Storybook integration for interactive component exploration.",
      ],
      tags: [
        "React",
        "TypeScript",
        "Tailwind CSS",
        "Design Tokens",
        "Storybook",
      ],
    },
    {
      title: "Color Rodeo",
      type: "Tool / Playground",
      year: "2025",
      description: [
        "Playful color system playground for exploring palettes and contrast with design token integration and real-time feedback.",
        "Features systematic color palette generation and contrast checking for accessibility compliance.",
      ],
    },
    {
      title: "Cell Biology Virtual Textbook",
      type: "Education",
      year: "2025",
      description: [
        "Interactive, web-native biology textbook with modern layouts and motion design to enhance learning experiences.",
        "Rich interactive content with thoughtful typography to make complex biological concepts accessible.",
      ],
    },
    {
      title: "Cameo Web",
      type: "Web Experience",
      year: "2025",
      description: [
        "Cinematic landing and profile concept exploring storytelling through layout systems and typography hierarchy.",
        "Sophisticated presentation with compelling narrative flow and interface design experimentation.",
      ],
    },
    {
      title: "Scroll Animation Library",
      type: "Animation Library",
      year: "2025",
      description: [
        "Collection of scroll-based animation experiments optimized for performance and visual impact.",
        "Reusable motion system library with plug-and-play scroll choreography patterns.",
      ],
    },
    {
      title: "Floral Design SVG",
      type: "SVG / Illustration",
      year: "2025",
      description: [
        "SVG-based floral illustration system with modular components for icons, labels, and decorative frames.",
        "Scalable illustration library for brand applications with botanical composition tools.",
      ],
    },
    {
      title: "Pattern Gallery",
      type: "Gallery / Utility",
      year: "2025",
      description: [
        "Curated gallery of patterns and surfaces for reuse across interfaces and brands as texture library resource.",
        "Searchable patterns with live examples for consistent visual systems across projects.",
      ],
    },
    {
      title: "Graphic Design Gallery",
      type: "Gallery",
      year: "2025",
      description: [
        "Visual archive of graphic design work with print-inspired layouts and image systems.",
        "Elegant showcase with editorial typography and grid systems honoring the craft of graphic design.",
      ],
    },
  ],
} as const;

const MOBILE_BREAKPOINT = 768;

// Custom hook for responsive detection
function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () =>
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () =>
      window.removeEventListener("resize", checkMobile);
  }, []);

  return isMobile;
}

// Reusable components
interface TagProps {
  children: React.ReactNode;
}

function Tag({ children }: TagProps) {
  return (
    <span
      className="text-caption border border-border rounded-[6px]"
      style={{
        padding: "var(--space-1) var(--space-3)",
        opacity: 0.5,
      }}
    >
      {children}
    </span>
  );
}

interface SectionHeadingProps {
  children: React.ReactNode;
  className?: string;
}

function SectionHeading({
  children,
  className = "",
}: SectionHeadingProps) {
  return (
    <h2
      className={className}
      style={{ 
        marginBottom: "var(--space-12)",
        fontSize: "clamp(2rem, 4vw, 2.75rem)", /* 32px -> 44px - Large editorial headers */
        fontWeight: 600,
        letterSpacing: "-0.025em",
        lineHeight: 1.15,
        color: "#18181B", /* High contrast zinc-900 */
      }}
    >
      {children}
    </h2>
  );
}

interface JobEntryProps {
  title: string;
  company: string;
  location: string;
  period: string;
  highlights: readonly string[];
  isLast?: boolean;
}

function JobEntry({
  title,
  company,
  location,
  period,
  highlights,
  isLast = false,
}: JobEntryProps) {
  return (
    <div
      className="bento-card gradient-hover-purple p-6 relative"
      style={{
        marginBottom: isLast
          ? "var(--space-16)"
          : "var(--space-6)",
        padding: "var(--space-6)",
        position: "relative",
      }}
    >
      <h3 style={{ marginBottom: "var(--space-2)", position: "relative", zIndex: 1 }}>
        {title}
      </h3>
      <p
        className="text-meta"
        style={{ marginBottom: "var(--space-6)", position: "relative", zIndex: 1 }}
      >
        {company} · {location} · {period}
      </p>
      <ul className="space-y-3 text-small" style={{ position: "relative", zIndex: 1 }}>
        {highlights.map((highlight, index) => (
          <li key={index} className="opacity-80">
            {highlight}
          </li>
        ))}
      </ul>
    </div>
  );
}

interface ProjectEntryProps {
  title: string;
  type: string;
  year: string;
  description: readonly string[];
  tags?: readonly string[];
  isLast?: boolean;
}

function ProjectEntry({
  title,
  type,
  year,
  description,
  tags,
  isLast = false,
}: ProjectEntryProps) {
  return (
    <div
      className="bento-card gradient-hover-pink p-6 relative"
      style={{ 
        marginBottom: isLast ? 0 : "var(--space-6)",
        padding: "var(--space-6)",
        position: "relative",
      }}
    >
      <h3 style={{ marginBottom: "var(--space-3)", position: "relative", zIndex: 1 }}>
        {title}
      </h3>
      <p
        className="text-caption"
        style={{ marginBottom: "var(--space-4)", position: "relative", zIndex: 1 }}
      >
        {type} · {year}
      </p>
      <ul
        className={`space-y-2 text-small${tags ? "" : ""}`}
        style={{ 
          marginBottom: tags ? "var(--space-4)" : 0,
          position: "relative",
          zIndex: 1,
        }}
      >
        {description.map((item, index) => (
          <li key={index} className="opacity-80">
            {item}
          </li>
        ))}
      </ul>
      {tags && (
        <div className="flex flex-wrap gap-2" style={{ position: "relative", zIndex: 1 }}>
          {tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
      )}
    </div>
  );
}

interface DownloadButtonProps {
  onClick: () => void;
  className?: string;
  style?: React.CSSProperties;
}

function DownloadButton({
  onClick,
  className = "",
  style,
}: DownloadButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-3 text-white transition-all rounded-[6px] no-highlight cursor-pointer ${className}`}
      style={{
        padding: "var(--space-4) var(--space-6)",
        fontSize: "17px",
        fontWeight: 400,
        transitionDuration: "0.3s",
        
        // Animated pastel gradient background
        background: `linear-gradient(135deg, 
          #A4BFFF 0%, 
          #92AFEE 25%, 
          #809FDC 50%, 
          #6E8FCA 75%, 
          #5C7FB8 100%)`,
        backgroundSize: '200% 200%',
        animation: 'gradientShift 8s ease infinite',
        
        // Glassmorphism effect
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        backgroundColor: 'rgba(164, 191, 255, 0.3)',
        border: '1px solid rgba(255, 255, 255, 0.4)',
        boxShadow: `
          0 8px 32px rgba(92, 127, 184, 0.2),
          inset 0 1px 0 rgba(255, 255, 255, 0.4)
        `,
        
        ...style,
      }}
      aria-label="Download Austin Carson's resume as a single page PDF"
    >
      <Download className="w-5 h-5" aria-hidden="true" />
      Download Resume PDF
    </button>
  );
}

// Generate print HTML template
function generatePrintHTML(): string {
  const {
    name,
    title,
    location,
    email,
    linkedinUrl,
    linkedin,
    phone,
    summary,
    competencies,
    experience,
    education,
    projects,
  } = RESUME_DATA;

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${name} - Resume</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet">
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      @page { margin: 0.5in 0.6in; size: letter; }
      body {
        font-family: 'Instrument Serif', Georgia, 'Times New Roman', serif;
        background: white;
        color: #0A0A0A;
        line-height: 1.4;
        padding: 32px;
        -webkit-font-smoothing: antialiased;
        font-optical-sizing: auto;
      }
      .resume-container { max-width: 100%; }
      h1 { font-size: 32px; line-height: 38px; margin-bottom: 6px; font-weight: 400; letter-spacing: -0.02em; }
      h2 { font-size: 20px; line-height: 26px; margin-bottom: 12px; font-weight: 400; letter-spacing: -0.01em; }
      h3 { font-size: 15px; line-height: 20px; margin-bottom: 4px; font-weight: 500; letter-spacing: -0.01em; }
      h4 { font-size: 18px; line-height: 24px; margin-bottom: 6px; font-weight: 400; letter-spacing: -0.01em; }
      p, li { font-size: 11px; line-height: 16px; font-weight: 400; letter-spacing: -0.005em; }
      .subtitle { font-size: 18px; line-height: 24px; opacity: 0.8; margin-bottom: 10px; font-weight: 400; }
      .contact-info { display: flex; flex-wrap: wrap; gap: 14px; margin-bottom: 14px; font-size: 10px; line-height: 14px; text-transform: uppercase; letter-spacing: 0.1em; }
      .contact-info span, .contact-info a { opacity: 0.4; color: #0A0A0A; text-decoration: none; }
      .divider { border-top: 1px solid rgba(10, 10, 10, 0.1); margin: 14px 0; }
      .summary { font-size: 13px; line-height: 20px; margin-bottom: 20px; opacity: 0.85; }
      .section { margin-bottom: 20px; }
      .section-title { font-size: 20px; line-height: 26px; margin-bottom: 12px; font-weight: 400; }
      .competencies { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; margin-bottom: 20px; }
      .competency h4 { margin-bottom: 8px; }
      .competency ul { list-style: none; }
      .competency li { margin-bottom: 4px; opacity: 0.8; }
      .two-column { display: grid; grid-template-columns: 1fr 1fr; gap: 28px; }
      .job { margin-bottom: 16px; }
      .job-title { font-size: 15px; line-height: 20px; margin-bottom: 4px; font-weight: 500; }
      .job-meta { font-size: 10px; line-height: 14px; text-transform: uppercase; letter-spacing: 0.1em; opacity: 0.4; margin-bottom: 10px; }
      .job ul { list-style: none; padding-left: 0; }
      .job li { margin-bottom: 5px; opacity: 0.8; }
      .project { margin-bottom: 14px; }
      .project-title { font-size: 15px; line-height: 20px; margin-bottom: 4px; font-weight: 500; }
      .project-meta { font-size: 10px; line-height: 14px; opacity: 0.4; margin-bottom: 7px; }
      .project ul { list-style: none; padding-left: 0; margin-bottom: 7px; }
      .project li { margin-bottom: 4px; opacity: 0.8; }
      .tags { display: flex; flex-wrap: wrap; gap: 5px; }
      .tag { border: 1px solid rgba(10, 10, 10, 0.1); padding: 2px 8px; border-radius: 6px; font-size: 9px; opacity: 0.5; }
      @media print { body { padding: 0; } }
    </style>
  </head>
  <body>
    <div class="resume-container">
      <header>
        <h1>${name}</h1>
        <div class="subtitle">${title}</div>
        <div class="contact-info">
          <span>${location}</span>
          <a href="mailto:${email}">${email}</a>
          <a href="${linkedinUrl}">${linkedin}</a>
          <a href="tel:${RESUME_DATA.phoneRaw}">${phone}</a>
        </div>
      </header>
      <div class="divider"></div>
      <div class="summary">${summary}</div>
      <div class="section">
        <h2 class="section-title">Core Competencies</h2>
        <div class="competencies">
          ${competencies
            .map(
              (comp) => `
            <div class="competency">
              <h4>${comp.title}</h4>
              <ul>${comp.skills.map((skill) => `<li>${skill}</li>`).join("")}</ul>
            </div>
          `,
            )
            .join("")}
        </div>
      </div>
      <div class="two-column">
        <div>
          <div class="section">
            <h2 class="section-title">Professional Experience</h2>
            ${experience
              .map(
                (job) => `
              <div class="job">
                <h3 class="job-title">${job.title}</h3>
                <div class="job-meta">${job.company} · ${job.location} · ${job.period}</div>
                <ul>${job.highlights.map((h) => `<li>${h}</li>`).join("")}</ul>
              </div>
            `,
              )
              .join("")}
          </div>
          <div class="section">
            <h2 class="section-title">Education</h2>
            <div>
              <h3 class="job-title">${education.degree}</h3>
              <div class="job-meta">${education.school} · ${education.year}</div>
            </div>
          </div>
        </div>
        <div>
          <div class="section">
            <h2 class="section-title">Key Projects & Portfolio</h2>
            ${projects
              .map(
                (proj) => `
              <div class="project">
                <h3 class="project-title">${proj.title}</h3>
                <div class="project-meta">${proj.type} · ${proj.year}</div>
                <ul>${proj.description.map((d) => `<li>${d}</li>`).join("")}</ul>
                ${proj.tags ? `<div class="tags">${proj.tags.map((t) => `<span class="tag">${t}</span>`).join("")}</div>` : ""}
              </div>
            `,
              )
              .join("")}
          </div>
        </div>
      </div>
    </div>
    <script>window.onload = () => setTimeout(() => window.print(), 250);</script>
  </body>
</html>`;
}

// Print styles as a constant
const PRINT_STYLES = `
  @media print {
    nav, footer, button, [class*="Toaster"], #hero, #work, #systems, #essays, #about, #contact { display: none !important; }
    #resume { display: block !important; padding: 32px !important; min-height: auto !important; background: white !important; }
    body { margin: 0 !important; padding: 0 !important; background: white !important; }
    html, body { height: auto !important; overflow: visible !important; }
    .container-main { max-width: 100% !important; padding: 0 !important; margin: 0 !important; }
    * { color: #000 !important; background: transparent !important; border-color: #ddd !important; animation: none !important; transition: none !important; transform: none !important; }
    h1 { font-size: 24px !important; line-height: 30px !important; margin-bottom: 4px !important; }
    h2 { font-size: 16px !important; line-height: 22px !important; margin-bottom: 10px !important; }
    h3 { font-size: 13px !important; line-height: 18px !important; margin-bottom: 3px !important; }
    h4 { font-size: 16px !important; line-height: 22px !important; margin-bottom: 3px !important; }
    p, li { font-size: 9px !important; line-height: 13px !important; opacity: 1 !important; }
    .text-small { font-size: 9px !important; line-height: 13px !important; }
    .text-caption { font-size: 8px !important; line-height: 12px !important; }
    .text-meta { font-size: 8px !important; line-height: 12px !important; text-transform: uppercase !important; letter-spacing: 0.05em !important; opacity: 0.6 !important; }
    .text-body-medium { font-size: 9px !important; line-height: 13px !important; }
    header { margin-bottom: 12px !important; }
    section { margin-bottom: 16px !important; }
    .space-y-2 > * + * { margin-top: 3px !important; }
    .space-y-3 > * + * { margin-top: 4px !important; }
    .gap-2 { gap: 4px !important; }
    .gap-4 { gap: 6px !important; }
    .gap-8 { gap: 12px !important; }
    .gap-12 { gap: 16px !important; }
    .gap-16 { gap: 20px !important; }
    .grid-cols-1.lg\\:grid-cols-2 {
          grid-template-columns: 1fr 1fr !important;
      gap: 24px !important;
    }
    .grid-cols-1.md\\:grid-cols-3 {
      grid-template-columns: repeat(3, 1fr) !important;
      gap: 16px !important;
    }
    h1, h2, h3, h4, h5, h6, p, li, ul, div[style*="marginBottom"] { page-break-inside: avoid !important; }
    .border-t { border-top: 1px solid #ddd !important; margin-bottom: 12px !important; padding-top: 0 !important; }
    span[class*="border"] { border: 1px solid #ddd !important; padding: 1px 6px !important; border-radius: 3px !important; font-size: 7px !important; }
    svg { width: 10px !important; height: 10px !important; }
    [style*="opacity: 0.4"] { display: none !important; }
    .max-w-\
$$
900px\
$$ { max-width: 100% !important; }
    #resume * { display: revert !important; }
    #resume button { display: none !important; }
  }
  @page { margin: 0.5in 0.6in; size: letter; }
`;

export function ResumeSection() {
  const isMobile = useIsMobile();
  const [activeFilter, setActiveFilter] = useState<string>('All');

  const handleDownloadPDF = useCallback(() => {
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(generatePrintHTML());
      printWindow.document.close();
    }
  }, []);

  // Memoize animation variants to prevent recreation
  const animationVariants = useMemo(
    () => ({
      hidden: { opacity: 0, y: isMobile ? 20 : 40 },
      visible: { opacity: 1, y: 0 },
    }),
    [isMobile],
  );

  const fadeInUp = useMemo(
    () => ({
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 },
    }),
    [],
  );

  // Get unique project types for filters
  const projectTypes = useMemo(() => {
    const types = ['All', ...new Set(RESUME_DATA.projects.map(p => p.type))];
    return types;
  }, []);

  // Map display names for filters
  const getFilterDisplayName = (type: string) => {
    if (type === 'Education') return 'Education / Textbook';
    return type;
  };

  // Filter projects based on active filter
  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') return RESUME_DATA.projects;
    return RESUME_DATA.projects.filter(project => project.type === activeFilter);
  }, [activeFilter]);

  return (
    <section
      id="resume"
      className="section-padding bg-white"
      style={{
        minHeight: "100vh",
        position: "relative",
      }}
      aria-label="Resume"
    >
      <div className="container-main">
        {/* Desktop Download Button - Fixed Position */}
        <motion.div
          className="hidden md:block fixed z-40"
          style={{
            right: "var(--space-8)",
            bottom: "var(--space-8)",
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          transition={{
            duration: DURATION.normal,
            ease: EASE_OUT_EXPO,
            delay: 0.3,
          }}
        >
          <DownloadButton
            onClick={handleDownloadPDF}
            className="shadow-lg hover:shadow-xl"
          />
        </motion.div>

        {/* Mobile Download Button */}
        <motion.div
          className="md:hidden flex justify-center"
          style={{ marginBottom: "var(--space-12)" }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          transition={{
            duration: DURATION.normal,
            ease: EASE_OUT_EXPO,
          }}
        >
          <DownloadButton
            onClick={handleDownloadPDF}
            className="bg-[var(--color-brand-purple)]"
          />
        </motion.div>

        {/* Resume Content */}
        <motion.div
          className="max-w-[900px] mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={animationVariants}
          transition={{
            duration: isMobile ? 0.6 : DURATION.normal,
            ease: EASE_OUT_EXPO,
          }}
        >
          {/* Header */}
          <header style={{ marginBottom: "var(--space-12)" }}>
            <h1 style={{ marginBottom: "var(--space-2)" }}>
              {RESUME_DATA.name}
            </h1>
            <h2
              style={{
                marginBottom: "var(--space-6)",
                opacity: 0.8,
              }}
            >
              {RESUME_DATA.title}
            </h2>
            <address className="flex flex-wrap items-center gap-4 md:gap-6 not-italic">
              <span className="flex items-center gap-2 text-meta">
                <MapPin size={14} aria-hidden="true" />
                {RESUME_DATA.location}
              </span>
              <a
                href={`mailto:${RESUME_DATA.email}`}
                className="no-highlight text-meta hover:opacity-100 transition-opacity"
              >
                {RESUME_DATA.email}
              </a>
              <a
                href={RESUME_DATA.linkedinUrl}
                rel="noopener noreferrer nofollow"
                target="_blank"
                className="no-highlight text-meta hover:opacity-100 transition-opacity"
              >
                {RESUME_DATA.linkedin}
              </a>
              <a
                href={`tel:${RESUME_DATA.phoneRaw}`}
                className="no-highlight text-meta hover:opacity-100 transition-opacity"
              >
                {RESUME_DATA.phone}
              </a>
            </address>
          </header>

          <hr
            className="border-t border-border"
            style={{ marginBottom: "var(--space-12)" }}
          />

          {/* Summary */}
          <motion.section
            style={{ marginBottom: "var(--space-16)" }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{
              duration: DURATION.normal,
              ease: EASE_OUT_EXPO,
              delay: 0.1,
            }}
            aria-label="Professional Summary"
          >
            <p
              className="text-body-medium"
              style={{ opacity: 0.85 }}
            >
              {RESUME_DATA.summary}
            </p>
          </motion.section>

          {/* Core Competencies */}
          <motion.section
            style={{ marginBottom: "var(--space-16)" }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{
              duration: DURATION.normal,
              ease: EASE_OUT_EXPO,
              delay: 0.15,
            }}
            aria-labelledby="competencies-heading"
          >
            <SectionHeading>
              <span id="competencies-heading">
                Core Competencies
              </span>
            </SectionHeading>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {RESUME_DATA.competencies.map((competency) => (
                <div key={competency.title}>
                  <h4
                    style={{ marginBottom: "var(--space-4)" }}
                  >
                    {competency.title}
                  </h4>
                  <ul className="space-y-2 text-small">
                    {competency.skills.map((skill) => (
                      <li key={skill} className="opacity-80">
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Professional Experience */}
            <motion.section
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{
                duration: DURATION.normal,
                ease: EASE_OUT_EXPO,
                delay: 0.2,
              }}
              aria-labelledby="experience-heading"
            >
              <SectionHeading>
                <span id="experience-heading">
                  Professional Experience
                </span>
              </SectionHeading>

              {RESUME_DATA.experience.map((job, index) => (
                <JobEntry
                  key={`${job.company}-${job.period}`}
                  title={job.title}
                  company={job.company}
                  location={job.location}
                  period={job.period}
                  highlights={job.highlights}
                  isLast={
                    index === RESUME_DATA.experience.length - 1
                  }
                />
              ))}

              {/* Education */}
              <div>
                <h2
                  className="text-[44px] leading-[52px]"
                  style={{
                    marginBottom: "var(--space-8)",
                    fontWeight: 400,
                    letterSpacing: "-0.02em",
                  }}
                  id="education-heading"
                >
                  Education
                </h2>
                <div>
                  <h3
                    style={{ marginBottom: "var(--space-2)" }}
                  >
                    {RESUME_DATA.education.degree}
                  </h3>
                  <p className="text-meta">
                    {RESUME_DATA.education.school} ·{" "}
                    {RESUME_DATA.education.year}
                  </p>
                </div>
              </div>
            </motion.section>

            {/* Key Projects */}
            <motion.section
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{
                duration: DURATION.normal,
                ease: EASE_OUT_EXPO,
                delay: 0.25,
              }}
              aria-labelledby="projects-heading"
            >
              <SectionHeading>
                <span id="projects-heading">
                  Key Projects & Portfolio
                </span>
              </SectionHeading>

              {/* Project Filters */}
              <div 
                className="flex flex-wrap gap-3 mb-8"
                style={{ marginBottom: 'var(--space-8)' }}
              >
                {projectTypes.map((type) => {
                  const isActive = activeFilter === type;
                  const displayName = getFilterDisplayName(type);
                  
                  return (
                    <motion.button
                      key={type}
                      onClick={() => setActiveFilter(type)}
                      className="px-4 py-2 rounded-[6px] border transition-all text-small no-highlight cursor-pointer"
                      style={{
                        borderColor: isActive ? '#B6CFFF' : 'var(--color-border)',
                        backgroundColor: isActive ? 'rgba(182, 207, 255, 0.1)' : 'transparent',
                        color: isActive ? '#B6CFFF' : 'var(--color-text-secondary)',
                        fontWeight: isActive ? 500 : 300,
                        letterSpacing: '0.02em',
                      }}
                      whileHover={{
                        borderColor: '#B6CFFF',
                        backgroundColor: 'rgba(182, 207, 255, 0.05)',
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {displayName}
                    </motion.button>
                  );
                })}
              </div>

              {filteredProjects.map((project, index) => (
                <ProjectEntry
                  key={project.title}
                  title={project.title}
                  type={project.type}
                  year={project.year}
                  description={project.description}
                  tags={project.tags}
                  isLast={
                    index === filteredProjects.length - 1
                  }
                />
              ))}
            </motion.section>
          </div>

          {/* PDF Tip */}
          <motion.footer
            className="border-t border-border text-caption text-center"
            style={{
              marginTop: "var(--space-16)",
              paddingTop: "var(--space-8)",
              opacity: 0.4,
            }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.4 }}
            viewport={{ once: true }}
            transition={{
              duration: DURATION.normal,
              ease: EASE_OUT_EXPO,
              delay: 0.35,
            }}
          >
            <span role="img" aria-label="lightbulb">
              💡
            </span>{" "}
            PDF tip: Use your browser's print dialog (⌘P /
            Ctrl+P) and choose Save as PDF for crisp output.
          </motion.footer>
        </motion.div>
      </div>

      {/* Print Styles */}
      <style>{PRINT_STYLES}</style>
    </section>
  );
}