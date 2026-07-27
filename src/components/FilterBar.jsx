const SORT_OPTIONS = [
  { value: 'default', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
]

export default function FilterBar({ categories, activeCategory, onCategoryChange, sortOrder, onSortChange }) {
  return (
    <div className="flex flex-col gap-4 border-b border-marlow-line pb-6 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
        <button
          type="button"
          onClick={() => onCategoryChange('all')}
          className={`rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-wide transition-colors ${
            activeCategory === 'all'
              ? 'border-marlow-acid bg-marlow-acid text-marlow-ink'
              : 'border-marlow-line text-marlow-smoke hover:border-marlow-acid hover:text-marlow-bone'
          }`}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => onCategoryChange(category)}
            className={`rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-wide transition-colors ${
              activeCategory === category
                ? 'border-marlow-acid bg-marlow-acid text-marlow-ink'
                : 'border-marlow-line text-marlow-smoke hover:border-marlow-acid hover:text-marlow-bone'
            }`}
          >
            {category.replace(/-/g, ' ')}
          </button>
        ))}
      </div>

      <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-marlow-smoke">
        Sort
        <select
          value={sortOrder}
          onChange={(e) => onSortChange(e.target.value)}
          className="rounded-sm border border-marlow-line bg-marlow-panel px-3 py-2 text-marlow-bone focus:border-marlow-acid"
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
    </div>
  )
}
