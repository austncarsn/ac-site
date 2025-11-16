import type { JSX } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import type { Project } from '../../data/projects';

export function ProjectDetailModal({
  project,
  isOpen,
  onClose,
}: {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}): JSX.Element {
  if (!project) return <></>;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[calc(100%-2rem)] max-w-[900px] max-h-[85vh] overflow-y-auto p-0">
        <div style={{ padding: 'var(--space-8) var(--space-6)' }} className="md:p-12">
          {/* Color Block Preview */}
          <div 
            className="aspect-[2/1] w-full overflow-hidden rounded-[6px] grid grid-cols-6 grid-rows-1"
            style={{ marginBottom: 'var(--space-8)' }}
          >
            {project.previewColors.map((color, index) => (
              <div
                key={index}
                style={{ backgroundColor: color }}
                className="w-full h-full"
              />
            ))}
          </div>

          {/* Header */}
          <DialogHeader style={{ marginBottom: 'var(--space-8)' }}>
            <DialogTitle style={{ marginBottom: 'var(--space-3)' }}>
              {project.name}
            </DialogTitle>
            <DialogDescription style={{ opacity: 0.6 }}>
              {project.role} · {project.year}
            </DialogDescription>
          </DialogHeader>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3" style={{ gap: 'var(--space-8) var(--space-12)' }}>
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
                {project.description.map((desc, i) => (
                  <p key={i} style={{ opacity: 0.7 }}>
                    {desc}
                  </p>
                ))}
              </div>

              {/* Impact */}
              {project.impact && (
                <div>
                  <p className="text-caption uppercase" style={{ marginBottom: 'var(--space-3)', opacity: 0.4, letterSpacing: '0.1em' }}>
                    Impact
                  </p>
                  <p style={{ opacity: 0.7 }}>{project.impact}</p>
                </div>
              )}

              {/* Technologies */}
              <div>
                <p className="text-caption uppercase" style={{ marginBottom: 'var(--space-3)', opacity: 0.4, letterSpacing: '0.1em' }}>
                  Technologies
                </p>
                <p style={{ opacity: 0.7 }}>{project.techStack}</p>
              </div>

              {/* Links */}
              {(project.liveUrl || project.githubUrl) && (
                <div className="flex border-t border-border" style={{ gap: 'var(--space-8)', paddingTop: 'var(--space-8)' }}>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:opacity-60 transition-opacity border-b border-foreground"
                      style={{
                        paddingBottom: '2px',
                        transitionDuration: '0.3s',
                      }}
                    >
                      View live site
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:opacity-60 transition-opacity border-b border-foreground"
                      style={{
                        paddingBottom: '2px',
                        transitionDuration: '0.3s',
                      }}
                    >
                      View code
                    </a>
                  )}
                </div>
              )}
            </div>

            {/* Sidebar - Meta Info */}
            <div className="space-y-6">
              {/* Category */}
              <div>
                <p className="text-caption uppercase" style={{ marginBottom: 'var(--space-2)', opacity: 0.4, letterSpacing: '0.1em' }}>
                  Category
                </p>
                <p className="text-small" style={{ opacity: 0.7 }}>{project.category}</p>
              </div>

              {/* Status */}
              <div>
                <p className="text-caption uppercase" style={{ marginBottom: 'var(--space-2)', opacity: 0.4, letterSpacing: '0.1em' }}>
                  Status
                </p>
                <p className="text-small" style={{ opacity: 0.7 }}>{project.status}</p>
              </div>

              {/* Tags */}
              {project.tags && project.tags.length > 0 && (
                <div>
                  <p className="text-caption uppercase" style={{ marginBottom: 'var(--space-3)', opacity: 0.4, letterSpacing: '0.1em' }}>
                    Tags
                  </p>
                  <div className="flex flex-wrap" style={{ gap: 'var(--space-2)' }}>
                    {project.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="text-caption border border-border rounded-[6px]"
                        style={{
                          padding: 'var(--space-1) var(--space-3)',
                          opacity: 0.6,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}