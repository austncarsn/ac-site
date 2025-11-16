import { ProjectCard } from './ProjectCard';
import type { Project } from '../../data/projects';

export function ProjectGrid({
  projects,
  onProjectClick,
}: {
  projects: readonly Project[];
  onProjectClick: (project: Project) => void;
}) {
  if (projects.length === 0) {
    return (
      <div className="text-center py-20">
        <p style={{ opacity: 0.4 }}>No projects in this category</p>
      </div>
    );
  }

  return (
    <div 
      className="flex flex-col border-t border-border"
    >
      {projects.map((project) => (
        <div
          key={project.id}
          className="border-b border-border"
          style={{ padding: 'var(--space-8) 0' }}
        >
          <ProjectCard
            project={project}
            onClick={() => onProjectClick(project)}
          />
        </div>
      ))}
    </div>
  );
}