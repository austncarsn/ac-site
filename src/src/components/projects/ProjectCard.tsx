import { memo, useState, useCallback } from 'react';
import { motion } from 'motion/react';
import { EASE_OUT_EXPO } from '../../lib/constants';
import type { Project } from '../../data/projects';

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

export const ProjectCard = memo(function ProjectCard({ project, onClick }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  // Detect mobile for optimized interactions
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;
  
  // Memoize click handler
  const handleClick = useCallback(() => {
    onClick();
  }, [onClick]);

  // Keyboard accessibility handler
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  }, [handleClick]);

  // Get RGB values from the color
  const getRGBValues = useCallback((color: string) => {
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
  }, []);

  const rgbColor = getRGBValues(project.hoverColor || '107, 78, 255');

  return (
    <motion.article
      className="group relative overflow-hidden h-full"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={() => !isMobile && setIsHovered(false)}
      whileHover={!isMobile ? { y: -4 } : undefined}
      whileTap={{ scale: 0.98 }}
      role="button"
      tabIndex={0}
      aria-label={`View ${project.name} project - ${project.category}`}
      style={{ 
        WebkitTapHighlightColor: 'transparent',
        touchAction: 'manipulation',
        borderRadius: '12px',
        border: '1px solid var(--border)',
        backgroundColor: 'var(--background)',
        boxShadow: isHovered 
          ? '0 8px 24px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.08)' 
          : '0 2px 8px rgba(0, 0, 0, 0.08)',
        transition: 'box-shadow 0.3s cubic-bezier(0.25, 1, 0.5, 1)',
        cursor: 'pointer',
      }}
    >
      {/* Image Container with 1.5 aspect ratio */}
      <div 
        className="relative overflow-hidden"
        style={{ 
          aspectRatio: '1 / 1.5',
          backgroundColor: 'var(--muted)',
          borderRadius: '12px 12px 0 0',
        }}
      >
        {/* Gradient overlay on hover */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: isHovered ? 0.2 : 0 
          }}
          transition={{ 
            duration: 0.35, 
            ease: EASE_OUT_EXPO 
          }}
          style={{ 
            background: `linear-gradient(135deg, 
              rgba(${rgbColor}, 0.9) 0%, 
              rgba(${rgbColor}, 0.5) 50%,
              rgba(${rgbColor}, 0.3) 100%)`,
            zIndex: 1,
          }}
        />
        
        {/* Project preview colors as gradient - lazy loaded effect */}
        <div 
          className="w-full h-full flex items-center justify-center"
          style={{
            background: project.previewColors.length > 1
              ? `linear-gradient(135deg, ${project.previewColors.join(', ')})`
              : project.previewColors[0] || `rgba(${rgbColor}, 0.1)`,
          }}
        >
          {/* Category label - hidden on hover */}
          <motion.span 
            className="text-meta"
            style={{ 
              color: 'rgba(255, 255, 255, 0.8)',
              textShadow: '0 1px 3px rgba(0, 0, 0, 0.3)',
              position: 'relative',
              zIndex: 2,
            }}
            animate={{
              opacity: isHovered ? 0 : 1,
            }}
            transition={{
              duration: 0.3,
            }}
          >
            {project.category}
          </motion.span>
        </div>
      </div>

      {/* Text Content - Consistent positioning */}
      <div 
        style={{ 
          padding: '24px',
          position: 'relative',
          zIndex: 2,
        }}
      >
        <div 
          className="flex items-baseline justify-between gap-4" 
          style={{ 
            marginBottom: '8px',
          }}
        >
          <motion.h3 
            className="tracking-tight break-words"
            style={{
              fontSize: '20px',
              lineHeight: '28px',
              fontWeight: 500,
              letterSpacing: '-0.01em',
            }}
            animate={{ 
              color: isHovered ? '#14B8A6' : 'var(--foreground)'
            }}
            transition={{ 
              duration: 0.3, 
              ease: EASE_OUT_EXPO 
            }}
          >
            {project.name}
          </motion.h3>
          <span 
            className="text-caption shrink-0"
            style={{ 
              fontSize: '14px',
              opacity: 0.5,
            }}
          >
            {project.year}
          </span>
        </div>
        <p 
          className="text-small break-words"
          style={{ 
            fontSize: '16px',
            lineHeight: '24px',
            opacity: 0.6,
          }}
        >
          {project.category}
        </p>

        {/* Tags - if available */}
        {project.tags && project.tags.length > 0 && (
          <div 
            className="flex flex-wrap gap-2" 
            style={{ marginTop: '12px' }}
          >
            {project.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-1 rounded-full"
                style={{
                  backgroundColor: `rgba(${rgbColor}, 0.1)`,
                  color: `rgb(${rgbColor})`,
                  fontSize: '12px',
                  fontWeight: 500,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.article>
  );
});
