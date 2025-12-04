import { useState, useMemo } from 'react';
import type { JSX } from 'react';
import { motion } from 'motion/react';
import { SectionHeader } from '../ui/SectionHeader';
import { AnimatedSection } from '../ui/AnimatedSection';
import { ProjectGrid } from '../projects/ProjectGrid';
import { ProjectFilters } from '../projects/ProjectFilters';
import { ProjectDetailModal } from '../projects/ProjectDetailModal';
import { PROJECTS, type Project, type ProjectCategory } from '../../data/projects';
import { EASE_OUT_EXPO } from '../../lib/constants';

export function WorkSection(): JSX.Element {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory | 'All'>('All');

  const categories = useMemo(() => {
    const cats = new Set<ProjectCategory>();
    PROJECTS.forEach(p => cats.add(p.category));
    return ['All', ...Array.from(cats).sort()] as const;
  }, []);

  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'All') return PROJECTS;
    return PROJECTS.filter(p => p.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <section id="work" className="section-padding" aria-label="Selected work and portfolio">
      <div className="container-main">
        <AnimatedSection>
          <SectionHeader accentColor="#14B8A6">Selected Work</SectionHeader>
          
          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 0.7, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
            className="max-w-2xl"
            style={{
              fontSize: '18px',
              lineHeight: '28px',
              marginBottom: 'var(--space-12)',
            }}
          >
            A collection of recent projects showcasing design systems, interfaces, and digital experiences
          </motion.p>

          <ProjectFilters
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </AnimatedSection>

        <ProjectGrid
          projects={filteredProjects}
          onProjectClick={setSelectedProject}
        />
      </div>

      <ProjectDetailModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}