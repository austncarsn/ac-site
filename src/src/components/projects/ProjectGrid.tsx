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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[55px]">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          onClick={() => onProjectClick(project)}
        />
      ))}
    </div>
  );
}
