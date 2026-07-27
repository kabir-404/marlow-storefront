import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import CartItem from './CartItem.jsx'

export default function CartDrawer() {
  const { items, itemCount, subtotal, isDrawerOpen, closeDrawer } = useCart()
  const navigate = useNavigate()
  const closeButtonRef = useRef(null)

  useEffect(() => {
    if (!isDrawerOpen) return

    function handleKeyDown(e) {
      if (e.key === 'Escape') closeDrawer()
    }

    document.addEventListener('keydown', handleKeyDown)
    closeButtonRef.current?.focus()
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isDrawerOpen, closeDrawer])

  return (
    <>
      <div
        onClick={closeDrawer}
        aria-hidden="true"
        className={`fixed inset-0 z-40 bg-black/60 transition-opacity duration-300 ${
          isDrawerOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md transform flex-col bg-marlow-panel shadow-2xl transition-transform duration-300 ease-out ${
          isDrawerOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-marlow-line px-5 py-4">
          <h2 className="font-display text-xl text-marlow-bone">
            Your Bag <span className="text-marlow-acid">({itemCount})</span>
          </h2>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={closeDrawer}
            aria-label="Close cart"
            className="flex h-8 w-8 items-center justify-center rounded-sm text-marlow-bone transition-colors hover:text-marlow-acid"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
              <span className="font-display text-2xl text-marlow-bone">Bag is Empty</span>
              <p className="max-w-xs text-sm text-marlow-smoke">
                Nothing in your bag yet. Go find something worth the hype.
              </p>
              <button type="button" onClick={closeDrawer} className="btn-secondary mt-2">
                Keep Browsing
              </button>
            </div>
          ) : (
            <ul>
              {items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-marlow-line px-5 py-5">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm font-semibold uppercase tracking-wide text-marlow-smoke">
                Subtotal
              </span>
              <span className="font-display text-xl text-marlow-acid">${subtotal.toFixed(2)}</span>
            </div>
            <button
              type="button"
              onClick={() => {
                closeDrawer()
                navigate('/checkout')
              }}
              className="btn-primary w-full"
            >
              Checkout
            </button>
          </div>
        )}
      </aside>
    </>
  )
}
