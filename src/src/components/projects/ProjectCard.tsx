import { memo } from 'react';
import { motion } from 'motion/react';
import { ImageWithFallback } from '../../../components/figma/ImageWithFallback';
import { EASE_OUT_EXPO, DURATION } from '../../lib/constants';
import type { Project } from '../../data/projects';

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

export const ProjectCard = memo(function ProjectCard({ project, onClick }: ProjectCardProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <motion.article
      className="group cursor-pointer"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: DURATION.normal, ease: EASE_OUT_EXPO }}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
    >
      {/* Preview Image */}
      <div 
        className="aspect-[3/2] w-full overflow-hidden rounded-[6px] group-hover:opacity-80 transition-opacity duration-500"
        style={{ marginBottom: 'var(--space-6)' }}
      >
        <ImageWithFallback
          src={project.previewImage}
          alt={`${project.name} preview`}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Project Info */}
      <div>
        <div className="flex items-baseline justify-between" style={{ marginBottom: 'var(--space-2)', gap: 'var(--space-6)' }}>
          <h3 className="text-2xl font-normal tracking-tight">
            {project.name}
          </h3>
          <span className="text-caption shrink-0">
            {project.year}
          </span>
        </div>
        <p className="text-small">{project.category}</p>
      </div>
    </motion.article>
  );
});