import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { AnimatedSection } from "../ui/AnimatedSection";
import { ProjectGrid } from "../projects/ProjectGrid";
import { ProjectFilters } from "../projects/ProjectFilters";
import { ProjectDetailModal } from "../projects/ProjectDetailModal";
import { PROJECTS, type Project } from "../../data/projects";
import { EASE_OUT_EXPO } from "../../lib/constants";

// ---------------------------------------------
// Static data (computed once, module scope)
// ---------------------------------------------
const ALL_CATEGORY = "All" as const;

const DERIVED_CATEGORIES = [
  ALL_CATEGORY,
  ...Array.from(new Set(PROJECTS.map((p) => p.category))).sort(),
] as const;

type Category = (typeof DERIVED_CATEGORIES)[number];

// ---------------------------------------------
// Query param helpers (URL sync for filters)
// ---------------------------------------------
function getCategoryFromURL(): Category {
  if (typeof window === "undefined") return ALL_CATEGORY;

  const params = new URLSearchParams(window.location.search);
  const raw = params.get("cat") || "";
  const decoded = decodeURIComponent(raw);

  // Validate against known categories
  return (DERIVED_CATEGORIES as readonly string[]).includes(decoded)
    ? (decoded as Category)
    : ALL_CATEGORY;
}

function setCategoryInURL(category: Category) {
  if (typeof window === "undefined") return;

  const url = new URL(window.location.href);

  if (category === ALL_CATEGORY) {
    url.searchParams.delete("cat");
  } else {
    url.searchParams.set("cat", encodeURIComponent(category));
  }

  // Keep back/forward behavior friendly
  window.history.replaceState({}, "", url.toString());
}

// ---------------------------------------------
// Motion variants
// ---------------------------------------------
const fadeUp = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
};

export function WorkSection() {
  const reduceMotion = useReducedMotion();

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Initialize from URL to support deep links
  const [selectedCategory, setSelectedCategory] = useState<Category>(() =>
    getCategoryFromURL(),
  );

  // Keep state in sync with back/forward navigation
  useEffect(() => {
    const onPopState = () => setSelectedCategory(getCategoryFromURL());
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  // Sync URL when category changes
  useEffect(() => {
    setCategoryInURL(selectedCategory);
  }, [selectedCategory]);

  const filteredProjects = useMemo(() => {
    if (selectedCategory === ALL_CATEGORY) return PROJECTS;
    return PROJECTS.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  const resultsLabel =
    selectedCategory === ALL_CATEGORY
      ? `Showing ${PROJECTS.length} projects`
      : `Showing ${filteredProjects.length} projects in ${selectedCategory}`;

  // Centralize section surface styling via CSS variables
  const sectionStyle: React.CSSProperties = {
    // Section padding and background
    paddingTop: "clamp(3rem, 8vw, 5rem)",
    paddingBottom: "clamp(3rem, 8vw, 5rem)",
    backgroundColor: "var(--work-bg, #F5F5F4)",

    // Surface tokens
    ["--work-surface" as any]: "#FAFAF9",
    ["--work-text" as any]: "#1A1A19",
    ["--work-muted" as any]: "#4A4A48",
    ["--work-border" as any]: "rgba(0, 0, 0, 0.06)",
    ["--work-shadow" as any]:
      "0 12px 32px -8px rgba(0, 0, 0, 0.06), 0 4px 16px -4px rgba(0, 0, 0, 0.04)",
  };

  return (
    <section
      id="work"
      className="relative overflow-hidden"
      style={sectionStyle}
      aria-labelledby="work-title"
    >
      <div className="container-main">
        <AnimatedSection>
          <div
            className="mb-[clamp(2.5rem,6vw,4rem)]"
            style={{
              padding:
                "clamp(1.75rem, 5vw, 3rem) clamp(1.5rem, 4vw, 2.5rem)",
              borderRadius: "24px",
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.65), rgba(255,255,255,0) 55%), var(--work-surface)",
              border: "1px solid var(--work-border)",
              boxShadow: "var(--work-shadow)",
            }}
          >
            <div className="flex flex-col gap-8 md:gap-10">
              <div className="max-w-2xl">
                <motion.h2
                  id="work-title"
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.6 }}
                  transition={
                    reduceMotion
                      ? { duration: 0 }
                      : { duration: 0.7, ease: EASE_OUT_EXPO }
                  }
                  style={{
                    fontSize: "clamp(24px, 4vw, 32px)",
                    fontWeight: 300,
                    letterSpacing: "0.08em",
                    color: "var(--work-text)",
                    marginBottom: "16px",
                  }}
                >
                  SYSTEMS IN PRACTICE
                </motion.h2>

                <motion.p
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.6 }}
                  transition={
                    reduceMotion
                      ? { duration: 0 }
                      : { duration: 0.6, ease: EASE_OUT_EXPO, delay: 0.08 }
                  }
                  style={{
                    fontSize: "clamp(16px, 2.5vw, 18px)",
                    lineHeight: 1.7,
                    color: "var(--work-muted)",
                    fontWeight: 400,
                  }}
                >
                  A focused set of projects exploring{" "}
                  <span
                    style={{
                      fontWeight: 500,
                      color: "color-mix(in srgb, var(--work-text) 88%, white)",
                    }}
                  >
                    system architecture
                  </span>
                  , interface patterns, and digital narratives.
                </motion.p>

                <div className="mt-4 text-sm text-neutral-600">
                  {resultsLabel}
                </div>

                {/* Screen reader announcement when filtering changes */}
                <p className="sr-only" aria-live="polite">
                  {resultsLabel}
                </p>
              </div>

              <div className="w-full">
                <ProjectFilters
                  categories={DERIVED_CATEGORIES}
                  selectedCategory={selectedCategory}
                  onCategoryChange={(cat) => setSelectedCategory(cat as Category)}
                />
              </div>

              <div
                aria-hidden="true"
                style={{
                  height: "1px",
                  background:
                    "linear-gradient(to right, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.03) 50%, rgba(0,0,0,0) 100%)",
                  marginTop: "8px",
                }}
              />
            </div>
          </div>
        </AnimatedSection>

        <ProjectGrid
          projects={filteredProjects}
          onProjectClick={setSelectedProject}
        />
      </div>

      <ProjectDetailModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
