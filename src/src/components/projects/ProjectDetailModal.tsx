import type { JSX } from "react";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import { X, ArrowUpRight, Github } from "lucide-react";
import type { Project } from "../../data/projects";

// ============================================================
// TYPOGRAPHY CONSTANTS
// ============================================================
const LABEL_SMALL = "font-mono text-[11px] text-zinc-400 uppercase tracking-[0.25em] block";
const TITLE_LARGE = "text-[clamp(2rem,4vw,3.5rem)] leading-[0.88] font-light tracking-tight";
const SUBTITLE = "text-zinc-400 text-[16px] font-light tracking-wide";
const BODY_TEXT = "text-zinc-500 text-[15.5px] font-light leading-[1.75]";
const SECTION_LABEL = "font-mono text-[10px] text-zinc-400 uppercase tracking-[0.25em] mb-3 block";

// ============================================================
// SUB-COMPONENTS
// ============================================================

function ProjectHeader({ projectId, name, role, year }: {
  projectId: string;
  name: string;
  role: string;
  year: string;
}) {
  return (
    <header className="mb-10">
      <span className={`${LABEL_SMALL} mb-4 text-zinc-400`}>
        PROJECT {projectId}
      </span>
      <h2 className={`${TITLE_LARGE} text-zinc-900 mb-5`}>
        {name}
      </h2>
      <p className={`${SUBTITLE} mb-0`}>
        {role} · {year}
      </p>
    </header>
  );
}

function ProjectDescription({ paragraphs }: { paragraphs: string[] }) {
  return (
    <div className="mb-10 space-y-4">
      {paragraphs.map((paragraph, i) => (
        <p key={i} className={BODY_TEXT}>
          {paragraph}
        </p>
      ))}
    </div>
  );
}

function ImpactSection({ impact }: { impact?: string }) {
  if (!impact) return null;
  
  return (
    <div className="pt-8 border-t border-zinc-200 mb-10">
      <h3 className={`${SECTION_LABEL} text-zinc-500 mb-4`}>
        IMPACT / RESULTS
      </h3>
      <p className={BODY_TEXT}>
        {impact}
      </p>
    </div>
  );
}

function ActionLinks({ liveUrl, githubUrl }: { liveUrl?: string; githubUrl?: string }) {
  if (!liveUrl && !githubUrl) return null;

  const linkStyles = "group inline-flex items-center gap-2 text-[13px] font-medium uppercase tracking-widest text-zinc-900 hover:text-brand transition-colors";
  
  return (
    <div className="flex flex-wrap gap-6">
      {liveUrl && (
        <a
          href={liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={linkStyles}
        >
          <span className="border-b border-zinc-300 group-hover:border-brand pb-0.5 transition-colors">
            View Live Site
          </span>
          <ArrowUpRight size={13} className="text-zinc-400 group-hover:text-brand transition-colors" />
        </a>
      )}
      {githubUrl && (
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={linkStyles}
        >
          <span className="border-b border-zinc-300 group-hover:border-brand pb-0.5 transition-colors">
            Source Code
          </span>
          <Github size={13} className="text-zinc-400 group-hover:text-brand transition-colors" />
        </a>
      )}
    </div>
  );
}

function SpecItem({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className={SECTION_LABEL}>{label}</h3>
      {children}
    </div>
  );
}

function StatusIndicator({ status }: { status: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
      </span>
      <span className="text-zinc-900 text-[14px] font-medium">
        {status}
      </span>
    </div>
  );
}

function TagList({ tags }: { tags: readonly string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag, i) => (
        <span
          key={i}
          className="px-3 py-2 bg-white border border-zinc-200 rounded-md text-[12px] font-normal text-zinc-600 shadow-sm hover:shadow transition-shadow"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

function BarcodeFooter() {
  return (
    <div className="mt-auto pt-10 opacity-[0.15]">
      <div
        className="h-16 w-full"
        style={{
          backgroundImage: "repeating-linear-gradient(90deg, #000 0px, #000 1.5px, transparent 1.5px, transparent 4px)",
          backgroundSize: "4px 100%",
        }}
        aria-hidden="true"
      />
      <span className="font-mono text-[9px] tracking-wider block mt-2 text-zinc-400">
        SYS_ID_8842
      </span>
    </div>
  );
}

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

  const projectId = project.id?.toString().padStart(3, "0") ?? "001";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="
          w-[95vw] max-w-[900px] 
          h-[90vh] max-h-[800px]
          p-0
          bg-white border-none rounded-2xl 
          shadow-[0_40px_80px_-20px_rgba(0,0,0,0.35)] 
          ring-1 ring-black/[0.05]
        "
      >
        {/* Accessibility: Hidden title and description */}
        <DialogTitle className="sr-only">
          {project.name} - Project Details
        </DialogTitle>
        <DialogDescription className="sr-only">
          {project.role} · {project.year} - {project.category} project
        </DialogDescription>

        {/* Close Button */}
        <DialogClose className="absolute right-5 top-5 z-50 p-1.5 rounded-md bg-transparent text-zinc-400 hover:text-zinc-900 hover:bg-zinc-50 transition-all">
          <X size={18} strokeWidth={1.5} />
          <span className="sr-only">Close</span>
        </DialogClose>

        {/* DESKTOP: Horizontal Layout (70/30 split) | MOBILE: Vertical Stack */}
        <div className="
          flex flex-col h-full overflow-hidden rounded-2xl
          lg:flex-row lg:grid lg:grid-cols-[7fr_auto_3fr]
        ">
          
          {/* LEFT PANEL: Main Content (70% on desktop) */}
          <div className="
            p-6 sm:p-8 lg:p-12 
            overflow-y-auto
            flex-1 lg:flex-initial
          ">
            <div className="max-w-[600px] lg:max-w-none pb-8">
              <ProjectHeader
                projectId={projectId}
                name={project.name}
                role={project.role}
                year={project.year}
              />

              <ProjectDescription paragraphs={project.description} />

              <ImpactSection impact={project.impact} />

              <ActionLinks
                liveUrl={project.liveUrl}
                githubUrl={project.githubUrl}
              />
            </div>
          </div>

          {/* DIVIDER SPINE: Desktop Only */}
          <div 
            className="hidden lg:block w-[3px] bg-gradient-to-b from-zinc-800 via-zinc-900 to-zinc-800 self-stretch shadow-sm"
            aria-hidden="true"
          />

          {/* RIGHT PANEL: Spec Sheet (30% on desktop) */}
          <aside className="
            bg-zinc-50/60 
            p-6 sm:p-8 lg:p-10 
            overflow-y-auto 
            flex flex-col gap-8
            border-t lg:border-t-0 lg:border-l border-zinc-200
          ">
            
            <SpecItem label="TECHNOLOGIES">
              <p className="text-zinc-700 text-[14px] font-light leading-relaxed whitespace-pre-line">
                {project.techStack}
              </p>
            </SpecItem>

            <SpecItem label="CATEGORY">
              <p className="text-zinc-900 text-[16px] font-medium">
                {project.category}
              </p>
            </SpecItem>

            <SpecItem label="STATUS">
              <StatusIndicator status={project.status} />
            </SpecItem>

            {project.tags && project.tags.length > 0 && (
              <SpecItem label="TAGS">
                <TagList tags={project.tags} />
              </SpecItem>
            )}

            <div className="pb-6">
              <BarcodeFooter />
            </div>
          </aside>
        </div>
      </DialogContent>
    </Dialog>
  );
}