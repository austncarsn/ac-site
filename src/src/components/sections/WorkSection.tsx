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
      // bg-zinc-100 is CRITICAL here.
      // It provides the "Aluminum Surface" color that allows the
      // ProjectCard's white shadows to be visible, creating the "Inset" 3D effect.
      className="section-padding bg-zinc-100 relative overflow-hidden"
      aria-label="Selected work and portfolio"
    >
      <div className="container-main">
        <AnimatedSection>
          {/* HEADER GROUP */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-20">
            {/* Left: Title & Brief */}
            <div className="max-w-2xl">
              <SectionHeader accentColor="#14B8A6">
                Selected Work
              </SectionHeader>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  ease: EASE_OUT_EXPO,
                  delay: 0.1,
                }}
                className="mt-6 text-lg md:text-xl leading-relaxed text-zinc-500 font-light"
              >
                A collection of recent projects exploring{" "}
                <span className="text-zinc-900 font-normal">
                  system architecture
                </span>
                , interface patterns, and digital narratives.
              </motion.p>
            </div>

            {/* Right: Filters (Aligned to bottom of header on desktop) */}
            <div className="w-full md:w-auto">
              <ProjectFilters
                categories={DERIVED_CATEGORIES}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
              />
            </div>
          </div>
        </AnimatedSection>

        {/* THE GRID */}
        {/* We pass the filtered list. The Grid component handles the layout. */}
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