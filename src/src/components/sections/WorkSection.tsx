import { useState, useMemo } from "react";
import { motion } from "motion/react";
import { SectionHeader } from "../ui/SectionHeader";
import { AnimatedSection } from "../ui/AnimatedSection";
import { ProjectGrid } from "../projects/ProjectGrid";
import { ProjectFilters } from "../projects/ProjectFilters";
import { ProjectDetailModal } from "../projects/ProjectDetailModal";
import {
  PROJECTS,
  type Project,
  type ProjectCategory,
} from "../../data/projects";
import { EASE_OUT_EXPO } from "../../lib/constants";

// --- STATIC DATA OPTIMIZATION ---
// Calculate categories once at module level, not on every render
const ALL_CATEGORY = "All";
const DERIVED_CATEGORIES = [
  ALL_CATEGORY,
  ...Array.from(
    new Set(PROJECTS.map((p) => p.category)),
  ).sort(),
] as const;

export function WorkSection() {
  const [selectedProject, setSelectedProject] =
    useState<Project | null>(null);
  const [selectedCategory, setSelectedCategory] =
    useState<(typeof DERIVED_CATEGORIES)[number]>(ALL_CATEGORY);

  // Memoize the filtering logic
  const filteredProjects = useMemo(() => {
    if (selectedCategory === ALL_CATEGORY) return PROJECTS;
    return PROJECTS.filter(
      (p) => p.category === selectedCategory,
    );
  }, [selectedCategory]);

  return (
    <section
      id="work"
      className="relative overflow-hidden"
      style={{
        paddingTop: 'clamp(3rem, 8vw, 5rem)',
        paddingBottom: 'clamp(3rem, 8vw, 5rem)',
        backgroundColor: '#F5F5F4', // Warm neutral background
      }}
      aria-label="Selected work and portfolio"
    >
      <div className="container-main">
        <AnimatedSection>
          {/* Card-like surface - curated archive aesthetic */}
          <div
            style={{
              padding: 'clamp(1.75rem, 5vw, 3rem) clamp(1.5rem, 4vw, 2.5rem)',
              borderRadius: '24px', // Soft corner radius
              backgroundColor: '#FAFAF9', // Slightly warmer than pure white
              // Subtle vertical shadow - long and diffused
              boxShadow: `
                0 12px 32px -8px rgba(0, 0, 0, 0.06),
                0 4px 16px -4px rgba(0, 0, 0, 0.04)
              `,
              marginBottom: 'clamp(2.5rem, 6vw, 4rem)',
            }}
          >
            {/* HEADER GROUP */}
            <div className="flex flex-col gap-8 md:gap-10">
              {/* Title & Description */}
              <div className="max-w-2xl">
                {/* Heading - light weight, increased letter spacing */}
                <motion.h2
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.7,
                    ease: EASE_OUT_EXPO,
                  }}
                  style={{
                    fontSize: 'clamp(24px, 4vw, 32px)',
                    fontWeight: 300, // Light weight
                    letterSpacing: '0.08em', // Slightly increased
                    color: '#1A1A19',
                    marginBottom: '16px',
                  }}
                >
                  SYSTEMS IN PRACTICE
                </motion.h2>

                {/* Description - short, declarative, skimmable */}
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    ease: EASE_OUT_EXPO,
                    delay: 0.1,
                  }}
                  style={{
                    fontSize: 'clamp(16px, 2.5vw, 18px)',
                    lineHeight: '1.7', // Generous line height for mobile comfort
                    color: '#4A4A48',
                    fontWeight: 400,
                  }}
                >
                  A focused set of projects exploring{' '}
                  <span style={{ fontWeight: 500, color: '#2D2D2C' }}>
                    system architecture
                  </span>
                  , interface patterns, and digital narratives.
                </motion.p>
              </div>

              {/* Filters - designed as lenses */}
              <div className="w-full">
                <ProjectFilters
                  categories={DERIVED_CATEGORIES}
                  selectedCategory={selectedCategory}
                  onCategoryChange={setSelectedCategory}
                />
              </div>

              {/* Subtle divider - suggests continuation */}
              <div 
                style={{
                  height: '1px',
                  background: 'linear-gradient(to right, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.03) 50%, rgba(0,0,0,0) 100%)',
                  marginTop: '8px',
                }}
                aria-hidden="true"
              />
            </div>
          </div>
        </AnimatedSection>

        {/* THE GRID - Below the card */}
        <ProjectGrid
          projects={filteredProjects}
          onProjectClick={setSelectedProject}
        />
      </div>

      {/* MODAL */}
      <ProjectDetailModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}