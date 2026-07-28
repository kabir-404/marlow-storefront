import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'

export default function Navbar() {
  const { itemCount, toggleDrawer } = useCart()

  return (
    <header className="sticky top-0 z-30 border-b border-marlow-line bg-marlow-ink/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="font-display text-2xl tracking-widest text-marlow-bone sm:text-3xl">
          MARLOW<span className="text-marlow-acid">.</span>
        </Link>

        <button
          type="button"
          onClick={toggleDrawer}
          aria-label={`Open cart, ${itemCount} item${itemCount === 1 ? '' : 's'}`}
          className="relative flex min-h-11 items-center gap-2 rounded-sm border border-marlow-line px-3 py-2 text-marlow-bone transition-colors hover:border-marlow-acid hover:text-marlow-acid"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="h-5 w-5"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l3.6-8H5.4M7 13L5.4 5M7 13l-2.3 4.6A1 1 0 0 0 5.6 19H17M7 13l1.5 6M17 13l1.5 6" />
            <circle cx="9" cy="21" r="1" fill="currentColor" stroke="none" />
            <circle cx="18" cy="21" r="1" fill="currentColor" stroke="none" />
          </svg>
          <span className="hidden text-sm font-semibold uppercase tracking-wide sm:inline">Cart</span>
          {itemCount > 0 && (
            <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-marlow-acid px-1 text-xs font-bold text-marlow-ink">
              {itemCount}
            </span>
          )}
        </button>
      </div>
    </header>
  )
}
