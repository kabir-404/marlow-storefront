import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addItem, openDrawer } = useCart()

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [justAdded, setJustAdded] = useState(false)

  useEffect(() => {
    const controller = new AbortController()

    async function fetchProduct() {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch(`https://dummyjson.com/products/${id}`, { signal: controller.signal })
        if (!res.ok) throw new Error('Product not found')
        const data = await res.json()
        setProduct(data)
        setLoading(false)
      } catch (err) {
        // An aborted request (e.g. StrictMode's mount/cleanup/remount cycle) is
        // superseded by another in-flight fetch — let that one own loading/error state.
        if (err.name === 'AbortError') return
        setError(err.message || 'Failed to load product')
        setLoading(false)
      }
    }

    fetchProduct()
    return () => controller.abort()
  }, [id])

  if (loading) {
    return (
      <div className="mx-auto max-w-5xl animate-pulse px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="aspect-square rounded-sm bg-marlow-panel" />
          <div className="space-y-4">
            <div className="h-6 w-2/3 rounded bg-marlow-panel" />
            <div className="h-4 w-1/3 rounded bg-marlow-panel" />
            <div className="h-24 rounded bg-marlow-panel" />
          </div>
        </div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="mx-auto flex max-w-xl flex-col items-center gap-3 px-4 py-24 text-center">
        <p className="font-display text-2xl text-marlow-blaze">Product Not Found</p>
        <p className="text-sm text-marlow-smoke">{error}</p>
        <Link to="/" className="btn-secondary mt-2">
          Back to Shop
        </Link>
      </div>
    )
  }

  const inStock = product.stock > 0
  const maxQty = Math.min(product.stock, 10)

  function handleAddToCart() {
    addItem(product, quantity)
    setJustAdded(true)
    openDrawer()
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="mb-6 text-sm font-semibold uppercase tracking-wide text-marlow-smoke transition-colors hover:text-marlow-acid"
      >
        ← Back
      </button>

      <div className="grid gap-10 md:grid-cols-2">
        <div className="aspect-square overflow-hidden rounded-sm border border-marlow-line bg-marlow-panel">
          <img
            src={product.images?.[0] || product.thumbnail}
            alt={product.title}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex flex-col gap-5">
          <span className="w-fit rounded-sm bg-marlow-panel px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-marlow-smoke">
            {product.category}
          </span>

          <h1 className="font-display text-3xl leading-tight text-marlow-bone sm:text-4xl">
            {product.title}
          </h1>

          <div className="flex items-center gap-3">
            <span className="font-display text-2xl text-marlow-acid">${product.price}</span>
            <span
              className={`rounded-sm px-2 py-1 text-xs font-bold uppercase tracking-wide ${
                inStock ? 'bg-marlow-acid/20 text-marlow-acid' : 'bg-marlow-blaze/20 text-marlow-blaze'
              }`}
            >
              {inStock ? `${product.stock} in stock` : 'Sold Out'}
            </span>
          </div>

          <p className="text-sm leading-relaxed text-marlow-smoke">{product.description}</p>

          {inStock && (
            <div className="flex items-center gap-4">
              <label className="text-xs font-semibold uppercase tracking-wide text-marlow-smoke" htmlFor="quantity">
                Quantity
              </label>
              <div className="flex items-center gap-3 rounded-sm border border-marlow-line px-3 py-2">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                  className="text-marlow-bone transition-colors hover:text-marlow-acid"
                >
                  −
                </button>
                <span id="quantity" className="w-6 text-center text-sm font-semibold text-marlow-bone">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.min(maxQty, q + 1))}
                  aria-label="Increase quantity"
                  className="text-marlow-bone transition-colors hover:text-marlow-acid"
                >
                  +
                </button>
              </div>
            </div>
          )}

          <button
            type="button"
            onClick={handleAddToCart}
            disabled={!inStock}
            className="btn-primary mt-2 w-full sm:w-auto sm:px-10"
          >
            {inStock ? 'Add to Cart' : 'Sold Out'}
          </button>

          {justAdded && (
            <p role="status" className="text-xs font-semibold uppercase tracking-wide text-marlow-acid">
              Added to your bag
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
