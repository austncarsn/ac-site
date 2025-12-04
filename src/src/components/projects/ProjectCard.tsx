import {
  memo,
  useMemo,
  useState,
  useCallback,
  useEffect,
} from "react";
import { motion } from "motion/react";
import type { Project } from "../../data/projects";

// --- CONSTANTS & PHYSICS ---

// The "Hydraulic Press" easing - snappy start, soft landing
const EASE_PHYSICS = [0.25, 1, 0.5, 1];

// Shadows defined outside component to prevent garbage collection churn
const SHADOWS = {
  bezel: {
    idle: "-10px -10px 30px #ffffff, 10px 10px 30px rgba(0, 0, 0, 0.05)", // Softer outer shadow
    active:
      "-10px -10px 30px #ffffff, 10px 10px 30px rgba(0, 0, 0, 0.1)", // Slightly deeper
  },
  cavity: {
    // Refined shadows for seamless inset look
    base: "inset 2px 2px 5px rgba(0, 0, 0, 0.1), inset -3px -3px 7px rgba(255, 255, 255, 0.8)",
    active:
      "inset 2px 2px 5px rgba(0, 0, 0, 0.15), inset -3px -3px 7px rgba(255, 255, 255, 0.9)", // Crisper on hover
  },
};

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

export const ProjectCard = memo(function ProjectCard({
  project,
  onClick,
}: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isTapped, setIsTapped] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // 1. SAFE HYDRATION CHECK
  useEffect(() => {
    const checkMobile = () =>
      setIsMobile(window.innerWidth < 1024);
    checkMobile(); // Initial check
    window.addEventListener("resize", checkMobile);
    return () =>
      window.removeEventListener("resize", checkMobile);
  }, []);

  // 2. MEMOIZED COLOR PARSING (Performance Win)
  const rgbColor = useMemo(() => {
    const color = project.hoverColor || "#6b4eff"; // Default purple
    if (color.includes(",")) return color;
    if (color.startsWith("#")) {
      const hex = color.slice(1);
      const r = parseInt(hex.slice(0, 2), 16);
      const g = parseInt(hex.slice(2, 4), 16);
      const b = parseInt(hex.slice(4, 6), 16);
      return `${r}, ${g}, ${b}`;
    }
    return "107, 78, 255";
  }, [project.hoverColor]);

  // 3. INTERACTION HANDLERS
  const handleClick = useCallback(() => onClick(), [onClick]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleClick();
      }
    },
    [handleClick],
  );

  // Derived State
  const isActive = isHovered || isTapped;

  // Design System Dimensions
  // "Outer" is the aluminum casing. "Inner" is the hole.
  const radius = {
    outer: "2.5rem",
    inner: "2rem",
    activeInner: "1.85rem",
  };

  return (
    <motion.article
      className="group relative cursor-pointer outline-none select-none"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={() => !isMobile && setIsHovered(false)}
      onTapStart={() => isMobile && setIsTapped(true)}
      onTap={() =>
        isMobile && setTimeout(() => setIsTapped(false), 200)
      }
      onTapCancel={() => isMobile && setIsTapped(false)}
      role="button"
      tabIndex={0}
      aria-label={`View project: ${project.name}`}
      style={{ WebkitTapHighlightColor: "transparent" }}
    >
      {/* --- LAYER 1: THE ALUMINUM CASING --- */}
      <motion.div
        className="relative bg-zinc-100 p-3 ring-1 ring-black/5" // Added ring for machined edge look
        style={{ borderRadius: radius.outer }}
        animate={{
          boxShadow: isActive
            ? SHADOWS.bezel.active
            : SHADOWS.bezel.idle,
        }}
        transition={{ duration: 0.4, ease: EASE_PHYSICS }}
      >
        {/* --- LAYER 2: THE CAVITY (THE SYSTEM GLOW) --- */}
        <motion.div
          className="relative overflow-hidden"
          style={{
            borderRadius: radius.inner,
            // FIX: Set base color to match the Outer Casing exactly (zinc-100)
            backgroundColor: '#f4f4f5',
            boxShadow: SHADOWS.cavity.base,
          }}
          animate={{
            // FIX: REMOVE the teal color. Keep it neutral on hover.
            backgroundColor: '#f4f4f5',
            
            // We only animate the shadow to get deeper/sharper
            boxShadow: isActive
              ? SHADOWS.cavity.active
              : SHADOWS.cavity.base,
          }}
          transition={{ duration: 0.3 }}
        >
          {/* Inset Border Effect - Creates depth illusion around colored frame */}
          <div 
            className="absolute inset-0 pointer-events-none z-20 rounded-[inherit]" 
            style={{
              boxShadow: `
                inset 0 2px 4px rgba(0, 0, 0, 0.15),
                inset 0 -1px 3px rgba(255, 255, 255, 0.5),
                inset 2px 0 4px rgba(0, 0, 0, 0.1),
                inset -2px 0 3px rgba(255, 255, 255, 0.3)
              `
            }}
          />

          {/* --- LAYER 3: THE CONTENT CARD (THE HYDRAULIC PRESS) --- */}
          <motion.div
            className="relative h-full flex flex-col overflow-hidden bg-background"
            style={{ transformOrigin: "center" }}
            animate={{
              // THE PHYSICS: Scale down + Tighten corners to maintain concentricity
              scale: isActive ? 0.97 : 1,
              borderRadius: isActive
                ? radius.activeInner
                : radius.inner,
            }}
            transition={{ duration: 0.4, ease: EASE_PHYSICS }}
          >
            {/* A. IMAGE AREA */}
            <div className="relative aspect-[1/1.3] bg-zinc-100 overflow-hidden">
              {/* Image Gradient / Preview */}
              <div
                className="w-full h-full flex items-center justify-center transition-transform duration-700"
                style={{
                  background:
                    project.previewColors.length > 1
                      ? `linear-gradient(135deg, ${project.previewColors.join(", ")})`
                      : `rgba(${rgbColor}, 0.1)`,
                }}
              >
                {/* Category Label (Fades out on hover to reduce noise) */}
                <motion.span
                  className="font-mono uppercase text-zinc-500/80 bg-white/50 px-2 py-1 rounded backdrop-blur-sm"
                  style={{ fontSize: '10px', letterSpacing: '0.2em', fontWeight: 400 }}
                  animate={{ opacity: isActive ? 0 : 1 }}
                >
                  {project.category}
                </motion.span>
              </div>

              {/* Hover Gradient Overlay */}
              <motion.div
                className="absolute inset-0 z-10 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: isActive ? 0.3 : 0 }}
                style={{
                  background: `linear-gradient(to top, rgba(${rgbColor}, 0.8), transparent)`,
                }}
              />
            </div>

            {/* B. TEXT AREA */}
            <div className="p-6 md:p-7 relative z-10 bg-white flex-grow flex flex-col justify-between">
              <div>
                <div className="flex items-baseline justify-between mb-2">
                  <motion.h3
                    className="text-xl font-medium tracking-tight text-zinc-900"
                    animate={{
                      color: isActive
                        ? `rgb(${rgbColor})`
                        : "#18181b",
                    }}
                  >
                    {project.name}
                  </motion.h3>
                  <span className="font-mono text-[10px] text-zinc-400">
                    {project.year}
                  </span>
                </div>

                <p className="text-sm text-zinc-500 line-clamp-2 leading-relaxed">
                  {project.description ||
                    `An exploration in ${project.category.toLowerCase()} systems.`}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-4">
                {project.tags?.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-medium px-2 py-1 rounded-md bg-zinc-50 border border-zinc-100 text-zinc-500"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.article>
  );
});