import { motion, useReducedMotion } from 'motion/react';
import { useState, useEffect, useMemo } from 'react';
import { EASE_OUT_EXPO, STAGGER } from '../../lib/constants';
import { ProjectCard } from './ProjectCard';
import type { Project } from '../../data/projects';

interface ProjectGridProps {
  projects: readonly Project[];
  onProjectClick: (project: Project) => void;
}

// Animation variants factory - extracted for performance
const createGridAnimationVariants = (prefersReducedMotion: boolean, isMobile: boolean) => {
  const cardDelay = isMobile ? STAGGER.normal : STAGGER.slow;

  return {
    container: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: prefersReducedMotion ? 0 : cardDelay,
          delayChildren: prefersReducedMotion ? 0 : 0.1,
        },
      },
    },
    card: {
      hidden: {
        opacity: 0,
        y: prefersReducedMotion ? 0 : (isMobile ? 20 : 30),
        filter: prefersReducedMotion ? 'none' : `blur(${isMobile ? '4px' : '6px'})`,
      },
      visible: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: {
          duration: prefersReducedMotion ? 0.3 : (isMobile ? 0.6 : 0.8),
          ease: EASE_OUT_EXPO,
        },
      },
    },
  };
};

export function ProjectGrid({ projects, onProjectClick }: ProjectGridProps) {
  const prefersReducedMotion = useReducedMotion();
  
  // Reactive responsive behavior
  const [isMobile, setIsMobile] = useState<boolean>(
    typeof window !== 'undefined' && window.innerWidth < 1024
  );
  const [isTablet, setIsTablet] = useState<boolean>(
    typeof window !== 'undefined' && window.innerWidth < 1280
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      setIsTablet(window.innerWidth < 1280);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Memoize animation variants to prevent recreation
  const animationVariants = useMemo(
    () => createGridAnimationVariants(prefersReducedMotion, isMobile),
    [prefersReducedMotion, isMobile]
  );

  // Memoize grid layout classes
  const gridClasses = useMemo(() => {
    if (isMobile) return 'grid-cols-1';
    if (isTablet) return 'grid-cols-2';
    return 'grid-cols-3';
  }, [isMobile, isTablet]);

  // Create a unique key based on project IDs to trigger re-animation on filter change
  const gridKey = useMemo(
    () => projects.map((p) => p.id).join('-'),
    [projects]
  );

  // Empty state
  if (projects.length === 0) {
    return (
      <div className="text-center py-20">
        <p style={{ opacity: 0.4 }}>No projects in this category</p>
      </div>
    );
  }

  return (
    <motion.div
      key={gridKey}
      variants={animationVariants.container}
      initial="hidden"
      animate="visible"
      className={`grid ${gridClasses} w-full`}
      style={{ 
        // Golden Gap Rule: 40px outer radius × 1.5 = 60px gap (premium spacing)
        gap: isMobile ? '48px' : '60px',
        marginTop: 'var(--space-12)',
      }}
    >
      {projects.map((project) => (
        <motion.div
          key={project.id}
          variants={animationVariants.card}
          className="h-full"
        >
          <ProjectCard
            project={project}
            onClick={() => onProjectClick(project)}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}