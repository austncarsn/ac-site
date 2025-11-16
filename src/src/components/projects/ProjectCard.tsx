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
  const [isActive, setIsActive] = useState(false);
  
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
      setIsActive(true);
    }
  };

  const handleTouchEnd = () => {
    if (isMobile) {
      setIsActive(false);
      // Keep the color visible briefly during tap
      setTimeout(() => setIsHovered(false), 150);
    }
  };

  // Get RGB values from the color
  const getRGBValues = (color: string) => {
    // If color is already in RGB format like "107, 78, 255"
    if (color.includes(',')) return color;
    
    // If it's a hex color, convert to RGB
    if (color.startsWith('#')) {
      const hex = color.slice(1);
      const r = parseInt(hex.slice(0, 2), 16);
      const g = parseInt(hex.slice(2, 4), 16);
      const b = parseInt(hex.slice(4, 6), 16);
      return `${r}, ${g}, ${b}`;
    }
    
    // Default to brand purple
    return '107, 78, 255';
  };

  const rgbColor = getRGBValues(project.hoverColor || '107, 78, 255');

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
      whileTap={{ scale: 0.985 }}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={() => !isMobile && setIsHovered(false)}
      onMouseDown={() => !isMobile && setIsActive(true)}
      onMouseUp={() => !isMobile && setIsActive(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      role="button"
      tabIndex={0}
      style={{ 
        WebkitTapHighlightColor: 'transparent',
        touchAction: 'manipulation',
        position: 'relative',
      }}
    >
      {/* Gradient hover background - sophisticated */}
      <motion.div
        className="absolute inset-0 rounded-[6px] pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: isActive ? 0.10 : isHovered ? 0.06 : 0 
        }}
        transition={{ 
          duration: isMobile ? 0.2 : 0.35, 
          ease: EASE_OUT_EXPO 
        }}
        style={{ 
          background: `linear-gradient(135deg, 
            rgba(${rgbColor}, 0.8) 0%, 
            rgba(${rgbColor}, 0.4) 50%,
            rgba(${rgbColor}, 0.2) 100%)`,
          zIndex: 0,
        }}
      />
      
      {/* Subtle top border accent on hover */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[1px] pointer-events-none"
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ 
          opacity: isHovered ? 1 : 0,
          scaleX: isHovered ? 1 : 0
        }}
        transition={{ 
          duration: isMobile ? 0.2 : 0.4, 
          ease: EASE_OUT_EXPO 
        }}
        style={{ 
          background: `linear-gradient(90deg, 
            transparent 0%, 
            rgba(${rgbColor}, 0.3) 50%, 
            transparent 100%)`,
          transformOrigin: 'left center',
        }}
      />
      
      {/* Project Info */}
      <div style={{ 
        padding: 'var(--space-6) 0', 
        position: 'relative', 
        zIndex: 1 
      }}>
        <div 
          className="flex items-baseline justify-between" 
          style={{ 
            marginBottom: 'var(--space-2)', 
            gap: 'var(--space-6)' 
          }}
        >
          <motion.h3 
            className="tracking-tight"
            animate={{ 
              x: isHovered && !isMobile ? 4 : 0 
            }}
            transition={{ 
              duration: 0.3, 
              ease: EASE_OUT_EXPO 
            }}
          >
            {project.name}
          </motion.h3>
          <motion.span 
            className="text-caption shrink-0"
            animate={{ 
              opacity: isHovered ? 0.8 : 0.5 
            }}
            transition={{ duration: 0.3 }}
          >
            {project.year}
          </motion.span>
        </div>
        <motion.p 
          className="text-small"
          animate={{ 
            opacity: isHovered ? 0.7 : 0.6,
            x: isHovered && !isMobile ? 4 : 0
          }}
          transition={{ 
            duration: 0.3, 
            ease: EASE_OUT_EXPO,
            delay: isHovered ? 0.05 : 0
          }}
        >
          {project.category}
        </motion.p>
      </div>
    </motion.article>
  );
});
