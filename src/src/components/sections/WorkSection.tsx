import { useState, useMemo } from 'react';
import type { JSX } from 'react';
import { SectionHeader } from '../ui/SectionHeader';
import { AnimatedSection } from '../ui/AnimatedSection';
import { ProjectGrid } from '../projects/ProjectGrid';
import { ProjectFilters } from '../projects/ProjectFilters';
import { ProjectDetailModal } from '../projects/ProjectDetailModal';
import { PROJECTS, type Project, type ProjectCategory } from '../../data/projects';

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
    <section id="work" className="section-padding">
      <div className="container-main">
        <AnimatedSection>
          <SectionHeader>Selected Work</SectionHeader>

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