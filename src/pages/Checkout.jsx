import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'

function generateOrderNumber() {
  return `MRLW-${Math.floor(10000 + Math.random() * 90000)}`
}

export default function Checkout() {
  const { items, subtotal, clearCart } = useCart()
  const [placedOrder, setPlacedOrder] = useState(null)

  const shipping = subtotal > 0 && subtotal < 75 ? 8 : 0
  const tax = useMemo(() => subtotal * 0.08, [subtotal])
  const total = subtotal + shipping + tax

  function handlePlaceOrder() {
    setPlacedOrder({
      number: generateOrderNumber(),
      items,
      total,
    })
    clearCart()
  }

  if (placedOrder) {
    return (
      <div className="mx-auto flex max-w-xl flex-col items-center gap-4 px-4 py-24 text-center">
        <span className="rounded-full bg-marlow-acid/20 px-4 py-1 text-xs font-bold uppercase tracking-widest text-marlow-acid">
          Order Placed
        </span>
        <h1 className="font-display text-4xl text-marlow-bone">You&rsquo;re In.</h1>
        <p className="text-sm text-marlow-smoke">
          Order <span className="font-semibold text-marlow-bone">{placedOrder.number}</span> is
          confirmed. This is a frontend demo, so no payment was processed and nothing ships — but
          in production this is where a real backend would take over.
        </p>
        <div className="mt-2 w-full rounded-sm border border-marlow-line bg-marlow-panel p-5 text-left">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-marlow-smoke">
            Order Total
          </p>
          <p className="font-display text-2xl text-marlow-acid">${placedOrder.total.toFixed(2)}</p>
        </div>
        <Link to="/" className="btn-primary mt-4">
          Continue Shopping
        </Link>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto flex max-w-xl flex-col items-center gap-3 px-4 py-24 text-center">
        <span className="font-display text-2xl text-marlow-bone">Nothing to Check Out</span>
        <p className="text-sm text-marlow-smoke">Your bag is empty. Add something worth the hype first.</p>
        <Link to="/" className="btn-secondary mt-2">
          Back to Shop
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="mb-8 font-display text-3xl text-marlow-bone sm:text-4xl">Order Review</h1>

      <ul className="mb-6 divide-y divide-marlow-line border-y border-marlow-line">
        {items.map((item) => (
          <li key={item.id} className="flex items-center gap-4 py-4">
            <img src={item.thumbnail} alt={item.title} className="h-16 w-16 rounded-sm object-cover" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-marlow-bone">{item.title}</p>
              <p className="text-xs text-marlow-smoke">Qty {item.quantity}</p>
            </div>
            <span className="font-display text-base text-marlow-acid">
              ${(item.price * item.quantity).toFixed(2)}
            </span>
          </li>
        ))}
      </ul>

      <div className="ml-auto max-w-xs space-y-2">
        <div className="flex justify-between text-sm text-marlow-smoke">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm text-marlow-smoke">
          <span>Shipping</span>
          <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
        </div>
        <div className="flex justify-between text-sm text-marlow-smoke">
          <span>Estimated Tax</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between border-t border-marlow-line pt-2 font-display text-xl text-marlow-bone">
          <span>Total</span>
          <span className="text-marlow-acid">${total.toFixed(2)}</span>
        </div>
      </div>

      <button type="button" onClick={handlePlaceOrder} className="btn-primary mt-8 w-full">
        Place Order
      </button>
      <p className="mt-3 text-center text-xs text-marlow-smoke">
        Demo checkout only — no payment is collected or processed.
      </p>
    </div>
  )
}
