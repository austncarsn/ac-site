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
    <div className="flex flex-wrap gap-[21px]">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onCategoryChange(cat)}
          className={`transition-all duration-300 border-b pb-[2px] ${
            selectedCategory === cat
              ? 'border-foreground opacity-100'
              : 'border-transparent opacity-40 hover:opacity-100'
          }`}
          style={{
            fontSize: '17px',
            fontWeight: 400,
            letterSpacing: 0,
          }}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}