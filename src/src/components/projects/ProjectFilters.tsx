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
          className={`transition-all duration-300 rounded-[6px] cursor-pointer touch-manipulation active:scale-[0.97] border ${
            selectedCategory === cat
              ? 'border-foreground opacity-100'
              : 'border-transparent opacity-40'
          }`}
          style={{
            fontSize: '17px',
            fontWeight: 300,
            letterSpacing: '0.02em',
            padding: 'var(--space-3) var(--space-5)',
          }}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}