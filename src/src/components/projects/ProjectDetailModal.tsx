import type { JSX } from 'react';
import { ImageWithFallback } from '../../../components/figma/ImageWithFallback';
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
      <DialogContent className="max-w-[800px] max-h-[90vh] overflow-y-auto p-0">
        <div className="p-12">
          {/* Header */}
          <DialogHeader className="mb-12">
            <DialogTitle className="mb-3" style={{ fontSize: '40px', fontWeight: 400, letterSpacing: '-0.02em' }}>
              {project.name}
            </DialogTitle>
            <DialogDescription style={{ fontSize: '18px', opacity: 0.5, fontWeight: 400 }}>
              {project.role} · {project.year}
            </DialogDescription>
          </DialogHeader>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Images */}
              {project.images && (
                <div className="space-y-6 mb-12">
                  {project.images.map((image, i) => (
                    <div 
                      key={i}
                      className="aspect-video w-full overflow-hidden rounded-[6px]"
                    >
                      <ImageWithFallback
                        src={image}
                        alt={`${project.name} detail ${i + 1}`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
              
              {/* Description */}
              <div className="space-y-6">
                {project.description.map((desc, i) => (
                  <p key={i} style={{ fontSize: '20px', lineHeight: '32px', opacity: 0.7 }}>
                    {desc}
                  </p>
                ))}
              </div>

              {/* Impact */}
              {project.impact && (
                <div>
                  <p className="mb-3" style={{ fontSize: '13px', fontWeight: 400, opacity: 0.4, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    Impact
                  </p>
                  <p style={{ fontSize: '20px', lineHeight: '32px', opacity: 0.7 }}>{project.impact}</p>
                </div>
              )}

              {/* Technologies */}
              <div>
                <p className="mb-3" style={{ fontSize: '13px', fontWeight: 400, opacity: 0.4, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  Technologies
                </p>
                <p style={{ fontSize: '20px', lineHeight: '32px', opacity: 0.7 }}>{project.techStack}</p>
              </div>

              {/* Links */}
              {(project.liveUrl || project.githubUrl) && (
                <div className="flex gap-8 pt-8 border-t border-border">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:opacity-60 transition-opacity duration-300 border-b border-foreground pb-[2px]"
                      style={{
                        fontSize: '17px',
                        fontWeight: 400,
                        letterSpacing: 0,
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
                      className="hover:opacity-60 transition-opacity duration-300 border-b border-foreground pb-[2px]"
                      style={{
                        fontSize: '17px',
                        fontWeight: 400,
                        letterSpacing: 0,
                      }}
                    >
                      View code
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}