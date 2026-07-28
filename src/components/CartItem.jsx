import { useCart } from '../context/CartContext.jsx'

export default function CartItem({ item }) {
  const { incrementItem, decrementItem, removeItem } = useCart()
  const atMaxStock = item.quantity >= (item.stock ?? Infinity)

  return (
    <li className="flex gap-3 border-b border-marlow-line py-4">
      <img
        src={item.thumbnail}
        alt={item.title}
        className="h-20 w-20 flex-shrink-0 rounded-sm object-cover"
      />

      <div className="flex flex-1 flex-col justify-between">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-sm font-semibold text-marlow-bone">{item.title}</h3>
          <button
            type="button"
            onClick={() => removeItem(item.id)}
            aria-label={`Remove ${item.title} from cart`}
            className="flex h-11 w-11 flex-shrink-0 items-center justify-center text-marlow-smoke transition-colors hover:text-marlow-blaze"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => decrementItem(item.id)}
              aria-label={`Decrease quantity of ${item.title}`}
              className="flex h-11 w-11 items-center justify-center rounded-sm border border-marlow-line text-marlow-bone transition-colors hover:border-marlow-acid hover:text-marlow-acid"
            >
              −
            </button>
            <span className="w-5 text-center text-sm font-semibold text-marlow-bone">{item.quantity}</span>
            <button
              type="button"
              onClick={() => incrementItem(item.id)}
              disabled={atMaxStock}
              aria-label={`Increase quantity of ${item.title}`}
              className="flex h-11 w-11 items-center justify-center rounded-sm border border-marlow-line text-marlow-bone transition-colors hover:border-marlow-acid hover:text-marlow-acid disabled:opacity-30 disabled:hover:border-marlow-line disabled:hover:text-marlow-bone"
            >
              +
            </button>
          </div>
          <span className="font-display text-base text-marlow-acid">
            ${(item.price * item.quantity).toFixed(2)}
          </span>
        </div>
      </div>
    </li>
  )
}
