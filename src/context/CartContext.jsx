import { createContext, useContext, useEffect, useMemo, useReducer } from 'react'

const CartContext = createContext(null)
const STORAGE_KEY = 'marlow.cart.items'

function loadInitialItems() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { product, quantity } = action.payload
      const existing = state.items.find((item) => item.id === product.id)
      const maxQty = product.stock ?? Infinity

      if (existing) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === product.id
              ? { ...item, quantity: Math.min(item.quantity + quantity, maxQty) }
              : item
          ),
        }
      }

      return {
        ...state,
        items: [
          ...state.items,
          {
            id: product.id,
            title: product.title,
            price: product.price,
            thumbnail: product.thumbnail || product.images?.[0],
            category: product.category,
            stock: product.stock,
            quantity: Math.min(quantity, maxQty),
          },
        ],
      }
    }

    case 'INCREMENT': {
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id && item.quantity < (item.stock ?? Infinity)
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      }
    }

    case 'DECREMENT': {
      return {
        ...state,
        items: state.items
          .map((item) =>
            item.id === action.payload.id ? { ...item, quantity: item.quantity - 1 } : item
          )
          .filter((item) => item.quantity > 0),
      }
    }

    case 'REMOVE_ITEM': {
      return { ...state, items: state.items.filter((item) => item.id !== action.payload.id) }
    }

    case 'CLEAR_CART': {
      return { ...state, items: [] }
    }

    case 'OPEN_DRAWER':
      return { ...state, isDrawerOpen: true }

    case 'CLOSE_DRAWER':
      return { ...state, isDrawerOpen: false }

    case 'TOGGLE_DRAWER':
      return { ...state, isDrawerOpen: !state.isDrawerOpen }

    default:
      return state
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, undefined, () => ({
    items: loadInitialItems(),
    isDrawerOpen: false,
  }))

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items))
  }, [state.items])

  const itemCount = useMemo(
    () => state.items.reduce((sum, item) => sum + item.quantity, 0),
    [state.items]
  )

  const subtotal = useMemo(
    () => state.items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [state.items]
  )

  const value = useMemo(
    () => ({
      items: state.items,
      isDrawerOpen: state.isDrawerOpen,
      itemCount,
      subtotal,
      addItem: (product, quantity = 1) => dispatch({ type: 'ADD_ITEM', payload: { product, quantity } }),
      incrementItem: (id) => dispatch({ type: 'INCREMENT', payload: { id } }),
      decrementItem: (id) => dispatch({ type: 'DECREMENT', payload: { id } }),
      removeItem: (id) => dispatch({ type: 'REMOVE_ITEM', payload: { id } }),
      clearCart: () => dispatch({ type: 'CLEAR_CART' }),
      openDrawer: () => dispatch({ type: 'OPEN_DRAWER' }),
      closeDrawer: () => dispatch({ type: 'CLOSE_DRAWER' }),
      toggleDrawer: () => dispatch({ type: 'TOGGLE_DRAWER' }),
    }),
    [state.items, state.isDrawerOpen, itemCount, subtotal]
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within a CartProvider')
  return ctx
}
