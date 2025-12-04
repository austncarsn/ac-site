import type { JSX } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import { ArrowUpRight, Github } from "lucide-react";
import type { Project } from "../../data/projects";

// ============================================================
// MAIN COMPONENT
// ============================================================

export function ProjectDetailModal({
  project,
  isOpen,
  onClose,
}: {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}): JSX.Element | null {
  if (!project || !isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="
          w-[95vw] max-w-[680px] 
          max-h-[90vh]
          p-0
          bg-white border-none rounded-xl 
          shadow-[0_20px_60px_-15px_rgba(0,0,0,0.25)] 
        "
      >
        <DialogTitle className="sr-only">
          {project.name} - Project Details
        </DialogTitle>
        <DialogDescription className="sr-only">
          {project.role} · {project.year}
        </DialogDescription>

        {/* Scrollable Content */}
        <div className="overflow-y-auto max-h-[90vh] rounded-xl">
          <div className="p-8 sm:p-12">
            
            {/* Header */}
            <div className="mb-8 pb-6 border-b border-zinc-200">
              <h2 className="tracking-tight text-zinc-900 mb-3" style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 400 }}>
                {project.name}
              </h2>
              <p className="text-meta" style={{ fontSize: '15px', opacity: 0.6 }}>
                {project.role} · {project.year}
              </p>
            </div>

            {/* Description */}
            <div className="mb-8 space-y-4">
              {project.description.map((paragraph, i) => (
                <p key={i} className="text-zinc-600" style={{ fontSize: '15px', lineHeight: '1.7' }}>
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Impact */}
            {project.impact && (
              <div className="mb-8 p-5 bg-zinc-50 rounded-lg border border-zinc-200">
                <h3 className="text-meta mb-3" style={{ fontSize: '11px' }}>
                  Impact
                </h3>
                <p className="text-zinc-700" style={{ fontSize: '14px', lineHeight: '1.7' }}>
                  {project.impact}
                </p>
              </div>
            )}

            {/* Tech Stack */}
            <div className="mb-8">
              <h3 className="text-meta mb-3" style={{ fontSize: '11px' }}>
                Technologies
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.techStack.split(',').map((tech, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 bg-white border border-zinc-200 rounded-md text-zinc-700"
                    style={{ fontSize: '13px' }}
                  >
                    {tech.trim()}
                  </span>
                ))}
              </div>
            </div>

            {/* Tags */}
            {project.tags && project.tags.length > 0 && (
              <div className="mb-8">
                <h3 className="text-meta mb-3" style={{ fontSize: '11px' }}>
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 bg-zinc-100 rounded-md text-zinc-600"
                      style={{ fontSize: '12px' }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Action Links */}
            {(project.liveUrl || project.githubUrl) && (
              <div className="flex flex-wrap gap-4 pt-6 border-t border-zinc-200">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand text-white rounded-lg text-[13px] uppercase tracking-wider hover:bg-brand/90 transition-colors"
                  >
                    View Live Site
                    <ArrowUpRight size={14} />
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 border border-zinc-300 text-zinc-700 rounded-lg text-[13px] uppercase tracking-wider hover:bg-zinc-50 transition-colors"
                  >
                    <Github size={14} />
                    Source Code
                  </a>
                )}
              </div>
            )}

          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}