import type { ProjectCategory } from '../../data/projects';

export function ProjectFilters({
  categories,
  selectedCategory,
  onCategoryChange,
}: {
  categories: readonly (ProjectCategory | 'All')[];
  selectedCategory: ProjectCategory | 'All';
  onCategoryChange: (category: ProjectCategory | 'All') => void;
}) {
  // Detect mobile for optimized interactions
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;
  
  if (categories.length <= 1) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-3 sm:gap-[21px]">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onCategoryChange(cat)}
          className={`transition-all border-b pb-[2px] touch-manipulation ${
            selectedCategory === cat
              ? 'border-foreground opacity-100'
              : 'border-transparent opacity-40 hover:opacity-100 active:opacity-100'
          }`}
          style={{
            fontSize: 'clamp(15px, 2vw, 17px)',
            fontWeight: 400,
            letterSpacing: 0,
            transitionDuration: isMobile ? '0.2s' : '0.3s',
            WebkitTapHighlightColor: 'transparent',
          }}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}