import { Link } from 'react-router-dom'

function StarRating({ rating }) {
  const rounded = Math.round(rating)
  return (
    <div className="flex items-center gap-1" aria-label={`Rated ${rating.toFixed(2)} out of 5`}>
      <div className="flex" aria-hidden="true">
        {Array.from({ length: 5 }).map((_, i) => (
          <svg
            key={i}
            viewBox="0 0 20 20"
            className={`h-3.5 w-3.5 ${i < rounded ? 'fill-marlow-acid' : 'fill-marlow-line'}`}
          >
            <path d="M10 1.5l2.6 5.4 5.9.8-4.3 4.2 1 5.9L10 15l-5.2 2.8 1-5.9L1.5 7.7l5.9-.8z" />
          </svg>
        ))}
      </div>
      <span className="text-xs text-marlow-smoke">{rating.toFixed(1)}</span>
    </div>
  )
}

export default function ProductCard({ product }) {
  const outOfStock = product.stock <= 0

  return (
    <Link
      to={`/product/${product.id}`}
      className="group flex flex-col overflow-hidden rounded-sm border border-marlow-line bg-marlow-panel transition-transform duration-200 hover:-translate-y-1 hover:border-marlow-acid/60"
    >
      <div className="relative aspect-square overflow-hidden bg-marlow-ink">
        <img
          src={product.thumbnail}
          alt={product.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <span className="absolute left-2 top-2 rounded-sm bg-marlow-ink/80 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-marlow-bone/80">
          {product.category}
        </span>
        {outOfStock && (
          <span className="absolute right-2 top-2 rounded-sm bg-marlow-blaze px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-marlow-ink">
            Sold Out
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="line-clamp-2 font-sans text-sm font-semibold text-marlow-bone">
          {product.title}
        </h3>
        <StarRating rating={product.rating} />
        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="font-display text-lg text-marlow-acid">${product.price}</span>
        </div>
      </div>
    </Link>
  )
}
