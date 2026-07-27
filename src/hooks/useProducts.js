import { useEffect, useState } from 'react'

const API_URL = 'https://dummyjson.com/products?limit=100'

export function useProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const controller = new AbortController()

    async function fetchProducts() {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch(API_URL, { signal: controller.signal })
        if (!res.ok) throw new Error(`Request failed with status ${res.status}`)
        const data = await res.json()
        setProducts(data.products ?? [])
        setLoading(false)
      } catch (err) {
        // An aborted request (e.g. StrictMode's mount/cleanup/remount cycle) is
        // superseded by another in-flight fetch — let that one own loading/error state.
        if (err.name === 'AbortError') return
        setError(err.message || 'Failed to load products')
        setLoading(false)
      }
    }

    fetchProducts()
    return () => controller.abort()
  }, [])

  return { products, loading, error }
}
