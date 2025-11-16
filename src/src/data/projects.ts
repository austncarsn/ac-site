/**
 * Project Data - Single Source of Truth
 * 
 * This file contains all project data for Austin Carson's portfolio.
 * All project cards, lists, and displays should consume this data.
 */

// ============================================================
// TYPES & ENUMS
// ============================================================

export const ProjectStatus = {
  LIVE: 'Live',
  IN_PROGRESS: 'In Progress',
  ARCHIVED: 'Archived',
} as const;

export type ProjectStatus = typeof ProjectStatus[keyof typeof ProjectStatus];

export const ProjectCategory = {
  DESIGN_SYSTEM: 'Design System',
  TOOL_PLAYGROUND: 'Tool / Playground',
  EDUCATION: 'Education / Textbook',
  WEB_EXPERIENCE: 'Web Experience',
  GALLERY_UTILITY: 'Gallery / Utility',
  ANIMATION_LIBRARY: 'Animation Library',
  SVG_ILLUSTRATION: 'SVG / Illustration',
  GALLERY: 'Gallery',
} as const;

export type ProjectCategory = typeof ProjectCategory[keyof typeof ProjectCategory];

/**
 * Core Project type
 */
export type Project = Readonly<{
  id: string;
  name: string;
  slug: string;
  category: ProjectCategory;
  summary: string;
  primaryFocus: string;
  techStack: string;
  status: ProjectStatus;
  featured: boolean;
  year: string;
  role: string;
  description: string[];
  previewImage: string;
  tags: readonly string[];
  impact?: string;
  liveUrl?: string;
  githubUrl?: string;
}>;

// ============================================================
// PROJECT DATA
// ============================================================

export const PROJECTS: readonly Project[] = [
  {
    id: '1',
    name: 'Color Rodeo',
    slug: 'color-rodeo',
    category: ProjectCategory.TOOL_PLAYGROUND,
    summary: 'A playful color system playground for exploring palettes and contrast in a structured way.',
    primaryFocus: 'Color systems, contrast, design tokens',
    techStack: 'React, TypeScript, Tailwind CSS, Vercel',
    status: ProjectStatus.LIVE,
    featured: true,
    year: '2025',
    role: 'Creative Technologist',
    description: [
      'A playful color-system playground for exploring palettes and contrast in a structured way. Built to help designers and developers experiment with color relationships.',
      'Features design token integration, contrast checking, and systematic color palette generation with real-time feedback.',
    ],
    previewImage: 'https://images.unsplash.com/photo-1729992530956-912936b9785d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvciUyMHBhbGV0dGUlMjBpbnRlcmZhY2V8ZW58MXx8fHwxNzYzMjYxMDM3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    tags: ['Color Systems', 'Design Tokens', 'Contrast', 'Interactive'],
    impact: 'Structured exploration of color palettes and accessibility',
    liveUrl: 'https://color-rodeo.vercel.app',
    githubUrl: 'https://github.com/austncarsn/color_rodeo',
  },
  {
    id: '2',
    name: 'Cell Biology Virtual Textbook',
    slug: 'cell-biology-virtual-textbook',
    category: ProjectCategory.EDUCATION,
    summary: 'Interactive, web native biology textbook experiments with modern layouts and motion for students.',
    primaryFocus: 'Biology education, interactive content',
    techStack: 'React, TypeScript, Tailwind CSS, Vercel',
    status: ProjectStatus.LIVE,
    featured: true,
    year: '2025',
    role: 'Interface Designer & Developer',
    description: [
      'Interactive, web-native biology textbook experiments with modern layouts and motion for students. Designed to make complex biological concepts accessible and engaging.',
      'Features rich interactive content, modern typography, and thoughtful motion design to enhance learning experiences.',
    ],
    previewImage: 'https://images.unsplash.com/photo-1761081478943-25e4f4b6354c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiaW9sb2d5JTIwdGV4dGJvb2slMjBlZHVjYXRpb258ZW58MXx8fHwxNzYzMjYxMDM3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    tags: ['Education', 'Interactive Content', 'Biology', 'Motion Design'],
    impact: 'Web-native approach to educational content delivery',
    liveUrl: 'https://biology-virtual-textbook.vercel.app',
    githubUrl: 'https://github.com/austncarsn/biology-virtual-textbook',
  },
  {
    id: '3',
    name: 'Korwin Design System',
    slug: 'korwin-design-system',
    category: ProjectCategory.DESIGN_SYSTEM,
    summary: 'Centralized design system and component library for consistent UI across projects.',
    primaryFocus: 'Tokens, components, design language',
    techStack: 'React, TypeScript, Tailwind CSS, Storybook (intended), Vercel',
    status: ProjectStatus.LIVE,
    featured: true,
    year: '2025',
    role: 'Design Systems Architect',
    description: [
      'Centralized design system and component library for consistent UI across projects. Built with a focus on design tokens, reusable components, and a cohesive design language.',
      'Provides teams with production-ready components and documentation. Intended to integrate with Storybook for interactive component exploration.',
    ],
    previewImage: 'https://images.unsplash.com/photo-1756576357697-13dfc5fff61c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNpZ24lMjBzeXN0ZW0lMjBpbnRlcmZhY2V8ZW58MXx8fHwxNzYzMTk3OTc2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    tags: ['Design Systems', 'Tokens', 'Components', 'Documentation'],
    impact: 'Systematic approach to design language and component architecture',
    liveUrl: 'https://korwindesignsystem.vercel.app',
    githubUrl: 'https://github.com/austncarsn/Korwindesignsystem',
  },
  {
    id: '4',
    name: 'Pattern Gallery',
    slug: 'pattern-gallery',
    category: ProjectCategory.GALLERY_UTILITY,
    summary: 'Curated gallery of patterns and surfaces that can be reused across interfaces and brands.',
    primaryFocus: 'Background systems, texture library',
    techStack: 'React, TypeScript, CSS or SVG, Vercel',
    status: ProjectStatus.LIVE,
    featured: false,
    year: '2025',
    role: 'Frontend Developer',
    description: [
      'Curated gallery of patterns and surfaces that can be reused across interfaces and brands. Built as a texture library and background system resource.',
      'Features searchable patterns with live examples, designed to support consistent visual systems across different projects.',
    ],
    previewImage: 'https://images.unsplash.com/photo-1682247059296-f078b06130e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXR0ZXJuJTIwZGVzaWduJTIwZ3JpZHxlbnwxfHx8fDE3NjMyNjEwMzd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    tags: ['Patterns', 'Background Systems', 'Texture Library', 'Utilities'],
    impact: 'Reusable pattern system for consistent visual design',
    liveUrl: 'https://patterngallery.vercel.app',
    githubUrl: 'https://github.com/austncarsn/Patterngallery',
  },
  {
    id: '5',
    name: 'Scroll Animation Library',
    slug: 'scroll-animation-library',
    category: ProjectCategory.ANIMATION_LIBRARY,
    summary: 'Collection of scroll based animation experiments to reuse across future sites.',
    primaryFocus: 'Motion systems, scroll choreography',
    techStack: 'React, TypeScript, Framer Motion, Vercel',
    status: ProjectStatus.LIVE,
    featured: false,
    year: '2025',
    role: 'Creative Developer',
    description: [
      'Collection of scroll-based animation experiments to reuse across future sites. Built as a motion system library focused on scroll choreography.',
      'Features carefully crafted animations optimized for performance and visual impact, designed to be plug-and-play for various projects.',
    ],
    previewImage: 'https://images.unsplash.com/photo-1641322126277-b5e8a8a83557?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmltYXRpb24lMjBjb2RlJTIwaW50ZXJmYWNlfGVufDF8fHx8MTc2MzI2MTAzOHww&ixlib=rb-4.1.0&q=80&w=1080',
    tags: ['Animation', 'Motion Systems', 'Scroll Choreography', 'Library'],
    impact: 'Reusable scroll animation patterns for compelling experiences',
    liveUrl: 'https://scroll-animation-library.vercel.app',
    githubUrl: 'https://github.com/austncarsn/scroll-animation-library',
  },
  {
    id: '6',
    name: 'Floral Design SVG',
    slug: 'svg-floral-design',
    category: ProjectCategory.SVG_ILLUSTRATION,
    summary: 'SVG based floral illustration system for icons, labels, and decorative frames.',
    primaryFocus: 'SVG systems, illustration, label design',
    techStack: 'React, TypeScript, SVG, Vercel',
    status: ProjectStatus.LIVE,
    featured: false,
    year: '2025',
    role: 'Creative Developer',
    description: [
      'SVG-based floral illustration system for icons, labels, and decorative frames. Built as a scalable illustration library for brand applications.',
      'Features modular SVG components that can be composed into unique botanical illustrations and decorative elements.',
    ],
    previewImage: 'https://images.unsplash.com/photo-1584441332323-c0473240f3ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmbG9yYWwlMjBzdmclMjBpbGx1c3RyYXRpb258ZW58MXx8fHwxNzYzMjYxMDM4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    tags: ['SVG Systems', 'Illustration', 'Label Design', 'Components'],
    impact: 'Scalable illustration system for decorative applications',
    liveUrl: 'https://floral-design-svg.vercel.app',
    githubUrl: 'https://github.com/austncarsn/floral-design-svg',
  },
  {
    id: '7',
    name: 'Cameo Web',
    slug: 'cameo-web',
    category: ProjectCategory.WEB_EXPERIENCE,
    summary: 'Cinematic landing and profile concept playing with layout, typography, and narrative.',
    primaryFocus: 'Storytelling, layout systems',
    techStack: 'React, TypeScript, Tailwind CSS, Vercel',
    status: ProjectStatus.LIVE,
    featured: true,
    year: '2025',
    role: 'Creative Technologist',
    description: [
      'Cinematic landing and profile concept playing with layout, typography, and narrative. Explores storytelling through interface design and layout systems.',
      'Built with a focus on cinematic presentation, sophisticated typography hierarchy, and compelling narrative flow.',
    ],
    previewImage: 'https://images.unsplash.com/photo-1759752394243-9a1592d13f14?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMHdlYiUyMHBsYXRmb3JtfGVufDF8fHx8MTc2MzI2MTAzOXww&ixlib=rb-4.1.0&q=80&w=1080',
    tags: ['Storytelling', 'Layout Systems', 'Typography', 'Cinematic'],
    impact: 'Narrative-driven approach to interface design',
    liveUrl: 'https://cameo-web.vercel.app',
    githubUrl: 'https://github.com/austncarsn/cameo-web',
  },
  {
    id: '8',
    name: 'Graphic Design Gallery',
    slug: 'graphic-design-gallery',
    category: ProjectCategory.GALLERY,
    summary: 'Curated gallery of my graphic design work as a visual archive.',
    primaryFocus: 'Print inspired layouts, image systems',
    techStack: 'React, TypeScript, CSS, Vercel',
    status: ProjectStatus.LIVE,
    featured: false,
    year: '2025',
    role: 'Frontend Developer',
    description: [
      'Curated gallery of graphic design work as a visual archive. Features print-inspired layouts and image systems for showcasing design work.',
      'Built with attention to typography and grid systems, creating an elegant showcase that honors the craft of graphic design.',
    ],
    previewImage: 'https://images.unsplash.com/photo-1652805363265-b8fbf9bbdfac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmFwaGljJTIwZGVzaWduJTIwcG9ydGZvbGlvfGVufDF8fHx8MTc2MzIyMTYxNnww&ixlib=rb-4.1.0&q=80&w=1080',
    tags: ['Gallery', 'Print-Inspired Layouts', 'Image Systems', 'Typography'],
    impact: 'Visual archive with editorial presentation',
    liveUrl: 'https://graphicdesigngallery.vercel.app',
    githubUrl: 'https://github.com/austncarsn/graphic-design-gallery',
  },
] as const;

// ============================================================
// HELPER FUNCTIONS
// ============================================================

/**
 * Get all featured projects
 */
export function getFeaturedProjects(): readonly Project[] {
  return PROJECTS.filter((project) => project.featured);
}

/**
 * Get projects by category
 */
export function getProjectsByCategory(category: ProjectCategory): readonly Project[] {
  return PROJECTS.filter((project) => project.category === category);
}

/**
 * Get a single project by slug
 */
export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((project) => project.slug === slug);
}

/**
 * Get a single project by ID
 */
export function getProjectById(id: string): Project | undefined {
  return PROJECTS.find((project) => project.id === id);
}

/**
 * Get all unique categories
 */
export function getAllCategories(): readonly ProjectCategory[] {
  const categories = new Set<ProjectCategory>();
  PROJECTS.forEach((project) => categories.add(project.category));
  return Array.from(categories).sort();
}

/**
 * Get projects by status
 */
export function getProjectsByStatus(status: ProjectStatus): readonly Project[] {
  return PROJECTS.filter((project) => project.status === status);
}

/**
 * Get all live projects
 */
export function getLiveProjects(): readonly Project[] {
  return getProjectsByStatus(ProjectStatus.LIVE);
}