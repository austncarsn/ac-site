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
  if (categories.length <= 1) {
    return null;
  }

  return (
    <div 
      className="flex flex-wrap gap-3"
      role="tablist"
      aria-label="Project category filters"
    >
      {categories.map((cat) => {
        const isActive = selectedCategory === cat;
        
        return (
          <button
            key={cat}
            onClick={() => onCategoryChange(cat)}
            role="tab"
            aria-selected={isActive}
            className="transition-all duration-300 cursor-pointer touch-manipulation active:scale-[0.98]"
            style={{
              fontSize: 'clamp(15px, 2vw, 16px)',
              fontWeight: 400,
              letterSpacing: '0.015em',
              padding: '10px 18px',
              minHeight: '44px', // Large tap target for accessibility
              borderRadius: '20px', // Rounded pill shape
              // Active state: soft elevation, higher contrast
              backgroundColor: isActive ? '#F0F0EF' : '#FAFAF9',
              color: isActive ? '#1A1A19' : '#6B6B69',
              opacity: isActive ? 1 : 0.65, // Reduced opacity for inactive
              // Active: subtle elevation. Inactive: flatter
              boxShadow: isActive
                ? `
                    0 2px 8px -2px rgba(0, 0, 0, 0.08),
                    0 1px 4px -1px rgba(0, 0, 0, 0.06),
                    inset 0 1px 0 rgba(255, 255, 255, 0.4)
                  `
                : `
                    0 1px 2px rgba(0, 0, 0, 0.04)
                  `,
              border: isActive ? '1px solid rgba(0, 0, 0, 0.08)' : '1px solid rgba(0, 0, 0, 0.04)',
            }}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
}