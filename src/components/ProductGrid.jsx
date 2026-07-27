import ProductCard from './ProductCard.jsx'

function SkeletonCard() {
  return (
    <div className="animate-pulse overflow-hidden rounded-sm border border-marlow-line bg-marlow-panel">
      <div className="aspect-square bg-marlow-line/60" />
      <div className="space-y-3 p-4">
        <div className="h-3 w-3/4 rounded bg-marlow-line/60" />
        <div className="h-3 w-1/3 rounded bg-marlow-line/60" />
        <div className="h-4 w-1/4 rounded bg-marlow-line/60" />
      </div>
    </div>
  )
}

export default function ProductGrid({ products, loading, error }) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center gap-2 rounded-sm border border-marlow-blaze/40 bg-marlow-panel px-6 py-16 text-center">
        <p className="font-display text-xl text-marlow-blaze">Drop Failed to Load</p>
        <p className="max-w-sm text-sm text-marlow-smoke">{error}</p>
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-sm border border-dashed border-marlow-line bg-marlow-panel px-6 py-20 text-center">
        <span className="font-display text-2xl text-marlow-bone">No Pieces Found</span>
        <p className="max-w-sm text-sm text-marlow-smoke">
          Nothing matches this filter right now. Try a different category or reset your sort.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
