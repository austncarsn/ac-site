import { memo, useState } from 'react';
import { motion } from 'motion/react';
import { EASE_OUT_EXPO, DURATION } from '../../lib/constants';
import type { Project } from '../../data/projects';

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

export const ProjectCard = memo(function ProjectCard({ project, onClick }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  // Detect mobile for optimized interactions
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
  };

  const handleTouchStart = () => {
    if (isMobile) {
      setIsHovered(true);
    }
  };

  const handleTouchEnd = () => {
    if (isMobile) {
      // Keep the color visible briefly during tap
      setTimeout(() => setIsHovered(false), 150);
    }
  };

  return (
    <motion.article
      className="group cursor-pointer rounded-[6px] relative overflow-hidden"
      initial={{ opacity: 0, y: isMobile ? 20 : 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ 
        duration: isMobile ? 0.6 : DURATION.normal, 
        ease: EASE_OUT_EXPO 
      }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={() => !isMobile && setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      role="button"
      tabIndex={0}
      style={{ 
        WebkitTapHighlightColor: 'transparent',
        touchAction: 'manipulation',
      }}
    >
      {/* Hover Background */}
      <motion.div
        className="absolute inset-0 rounded-[6px] pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 0.08 : 0 }}
        transition={{ duration: isMobile ? 0.2 : 0.35, ease: EASE_OUT_EXPO }}
        style={{ 
          backgroundColor: project.hoverColor,
          zIndex: 0,
        }}
      />
      
      {/* Project Info */}
      <div style={{ padding: 'var(--space-6) 0', position: 'relative', zIndex: 1 }}>
        <div className="flex items-baseline justify-between" style={{ marginBottom: 'var(--space-2)', gap: 'var(--space-6)' }}>
          <h3 className="tracking-tight">
            {project.name}
          </h3>
          <span className="text-caption shrink-0">
            {project.year}
          </span>
        </div>
        <p className="text-small opacity-60">{project.category}</p>
      </div>
    </motion.article>
  );
});