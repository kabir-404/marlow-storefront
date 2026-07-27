import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useProducts } from '../hooks/useProducts.js'
import FilterBar from '../components/FilterBar.jsx'
import ProductGrid from '../components/ProductGrid.jsx'

export default function Home() {
  const { products, loading, error } = useProducts()
  const [searchParams, setSearchParams] = useSearchParams()

  const activeCategory = searchParams.get('category') ?? 'all'
  const sortOrder = searchParams.get('sort') ?? 'default'

  function setActiveCategory(category) {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev)
      if (category === 'all') {
        next.delete('category')
      } else {
        next.set('category', category)
      }
      return next
    })
  }

  function setSortOrder(sort) {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev)
      if (sort === 'default') {
        next.delete('sort')
      } else {
        next.set('sort', sort)
      }
      return next
    })
  }

  const categories = useMemo(
    () => [...new Set(products.map((p) => p.category))].sort(),
    [products]
  )

  const visibleProducts = useMemo(() => {
    let list = products
    if (activeCategory !== 'all') {
      list = list.filter((p) => p.category === activeCategory)
    }
    if (sortOrder === 'price-asc') {
      list = [...list].sort((a, b) => a.price - b.price)
    } else if (sortOrder === 'price-desc') {
      list = [...list].sort((a, b) => b.price - a.price)
    }
    return list
  }, [products, activeCategory, sortOrder])

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="mb-10 border-b border-marlow-line pb-10">
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.3em] text-marlow-acid">
          New Drop Live Now
        </p>
        <h1 className="font-display text-4xl leading-none text-marlow-bone sm:text-6xl">
          GEAR UP.
          <br />
          STAND OUT.
        </h1>
        <p className="mt-4 max-w-lg text-sm text-marlow-smoke">
          Limited-run footwear and streetwear, restocked weekly. No hype, just heat.
        </p>
      </section>

      <div className="mb-8">
        {!loading && !error && (
          <FilterBar
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            sortOrder={sortOrder}
            onSortChange={setSortOrder}
          />
        )}
      </div>

      <ProductGrid products={visibleProducts} loading={loading} error={error} />
    </div>
  )
}
