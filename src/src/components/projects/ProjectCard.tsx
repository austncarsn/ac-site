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
  // Detect mobile for optimized interactions
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <motion.article
      className="group cursor-pointer"
      initial={{ opacity: 0, y: isMobile ? 20 : 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ 
        duration: isMobile ? 0.6 : DURATION.normal, 
        ease: EASE_OUT_EXPO 
      }}
      whileHover={!isMobile ? { y: -4 } : undefined}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      style={{ 
        WebkitTapHighlightColor: 'transparent',
        touchAction: 'manipulation',
      }}
    >
      {/* Preview Image */}
      <div 
        className="aspect-[3/2] w-full overflow-hidden rounded-[6px] transition-opacity"
        style={{ 
          marginBottom: 'var(--space-6)',
          transitionDuration: isMobile ? '0.3s' : '0.5s',
        }}
      >
        <motion.div
          whileHover={!isMobile ? { scale: 1.05 } : undefined}
          transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
          className="h-full w-full"
        >
          <ImageWithFallback
            src={project.previewImage}
            alt={`${project.name} preview`}
            className="h-full w-full object-cover"
          />
        </motion.div>
      </div>

      {/* Project Info */}
      <div>
        <div className="flex items-baseline justify-between" style={{ marginBottom: 'var(--space-2)', gap: 'var(--space-6)' }}>
          <h3 className="tracking-tight">
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