import type { JSX } from "react";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog"; // Assuming DialogClose exists or we build a custom button
import { X, ArrowUpRight, Github } from "lucide-react"; // Assuming you have an icon lib
import type { Project } from "../../data/projects";

// TYPOGRAPHY UTILS
const TYPE_HEADER =
  "font-['Zen_Kaku_Gothic_New'] font-light uppercase tracking-widest";
const TYPE_LABEL =
  "font-mono text-[10px] text-zinc-400 uppercase tracking-[0.2em] mb-3";

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
      <DialogContent
        className="max-w-4xl p-0 overflow-hidden bg-[#FCFCFC] border-none rounded-2xl
        /* THE 'FLOATING SLAB' PHYSICS */
        shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]
        /* The Top Rim Light (Thickness) */
        ring-1 ring-black/5
        before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-white before:z-20
        "
      >
        {/* Accessible title and description - visually hidden but available to screen readers */}
        <DialogTitle className="sr-only">
          {project.name} - Project Details
        </DialogTitle>
        <DialogDescription className="sr-only">
          {project.role} · {project.year} - {project.category} project
        </DialogDescription>

        {/* CLOSE BUTTON (Floating Hardware Style) */}
        <DialogClose className="absolute right-6 top-6 z-50 p-2 rounded-full bg-white/80 backdrop-blur border border-zinc-100 shadow-sm text-zinc-400 hover:text-zinc-900 transition-colors">
          <X size={20} strokeWidth={1.5} />
        </DialogClose>

        {/* 2-COLUMN LAYOUT */}
        <div className="grid grid-cols-1 md:grid-cols-[1.6fr_1fr] max-h-[85vh]">
          {/* --- LEFT: NARRATIVE (Scrollable) --- */}
          <div className="p-10 md:p-12 overflow-y-auto custom-scrollbar">
            {/* Header Group */}
            <div className="mb-12">
              <span
                className={`${TYPE_LABEL} block mb-2 text-brand`}
              >
                Project 00{project.id || "1"}
              </span>
              <h2
                className={`${TYPE_HEADER} text-4xl md:text-5xl text-zinc-900 leading-[0.9] mb-4`}
              >
                {project.name}
              </h2>
              <p className="text-zinc-400 font-light text-lg">
                {project.role} · {project.year}
              </p>
            </div>

            {/* Main Description */}
            <div className="prose prose-zinc prose-lg">
              {project.description.map((desc, i) => (
                <p
                  key={i}
                  className="text-zinc-600 font-light leading-loose text-[17px]"
                >
                  {desc}
                </p>
              ))}
            </div>

            {/* Impact Section */}
            {project.impact && (
              <div className="mt-12 pt-8 border-t border-zinc-100">
                <h4 className={`${TYPE_LABEL} text-zinc-900`}>
                  Impact / Results
                </h4>
                <p className="text-zinc-600 font-light leading-relaxed">
                  {project.impact}
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-6 mt-16">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 text-sm font-medium uppercase tracking-widest text-zinc-900 hover:text-brand transition-colors"
                >
                  <span className="border-b border-zinc-300 group-hover:border-brand pb-0.5 transition-colors">
                    View Live Site
                  </span>
                  <ArrowUpRight
                    size={14}
                    className="text-zinc-400 group-hover:text-brand transition-colors"
                  />
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 text-sm font-medium uppercase tracking-widest text-zinc-900 hover:text-brand transition-colors"
                >
                  <span className="border-b border-zinc-300 group-hover:border-brand pb-0.5 transition-colors">
                    Source Code
                  </span>
                  <Github
                    size={14}
                    className="text-zinc-400 group-hover:text-brand transition-colors"
                  />
                </a>
              )}
            </div>
          </div>

          {/* --- RIGHT: SPEC SHEET (Grey Background) --- */}
          <div className="bg-zinc-50/80 border-l border-zinc-100 p-10 md:p-12 flex flex-col gap-10 overflow-y-auto">
            {/* Tech Stack */}
            <div>
              <h4 className={TYPE_LABEL}>Technologies</h4>
              <p className="text-zinc-700 font-light leading-relaxed text-sm">
                {project.techStack}
              </p>
            </div>

            {/* Category */}
            <div>
              <h4 className={TYPE_LABEL}>Category</h4>
              <p className="text-zinc-700 font-medium">
                {project.category}
              </p>
            </div>

            {/* Status */}
            <div>
              <h4 className={TYPE_LABEL}>Status</h4>
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-sm text-zinc-700">
                  {project.status}
                </span>
              </div>
            </div>

            {/* Tags */}
            {project.tags && project.tags.length > 0 && (
              <div>
                <h4 className={TYPE_LABEL}>Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1.5 bg-white border border-zinc-200 rounded-md text-[11px] font-medium text-zinc-500 shadow-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Decorative Bar Code / ID (Optional aesthetic touch) */}
            <div className="mt-auto pt-10 opacity-20">
              <div
                className="h-8 w-full bg-repeat-x"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(90deg, black, black 1px, transparent 1px, transparent 3px)",
                }}
              ></div>
              <span className="font-mono text-[10px] block mt-1">
                SYS_ID_8842
              </span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}