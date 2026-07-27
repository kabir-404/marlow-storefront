# Marlow

A frontend-only ecommerce storefront concept, built as the client-facing layer
you'd plug into an existing backend (Shopify, a headless commerce API, etc.).
There is no server, database, or payment processor here on purpose — this repo
is scoped to the storefront UI and client-side state only.

## Store concept

**Marlow is a streetwear / sneaker-drop shop.** Bold, dark, a little loud —
the kind of site built around hype drops and limited restocks rather than
polite retail. I picked this over a generic "tech store" look specifically to
commit to a strong visual identity:

- **Color palette** (defined as named tokens in `tailwind.config.js`, not raw
  Tailwind defaults):
  - `marlow-ink` (#121212) — near-black base background
  - `marlow-panel` (#1c1c1c) — raised surfaces, cards, the cart drawer
  - `marlow-bone` (#f3efe4) — warm off-white for primary text on dark
  - `marlow-acid` (#d4ff3d) — signature acid-lime accent for CTAs, prices, badges
  - `marlow-blaze` (#ff5a1f) — secondary accent for stock warnings/alerts
  - `marlow-smoke` (#8a8a86) — muted secondary text
  - `marlow-line` (#2e2e2b) — hairline borders/dividers
- **Typography**: [Anton](https://fonts.google.com/specimen/Anton) for
  headings and the wordmark — a bold, condensed, poster-style display face
  that matches drop-culture marketing — paired with
  [Inter](https://fonts.google.com/specimen/Inter) for product copy, prices,
  and UI chrome, since checkout and cart controls need to stay highly legible.

## Data source

Products are fetched live from **[dummyjson.com/products](https://dummyjson.com/products)**,
a free public REST API with no auth required. It was chosen because it
returns realistic field variety (`title`, `price`, `category`, `images`,
`thumbnail`, `rating`, `stock`, `description`) that maps directly onto the
grid, filter bar, and product detail requirements without any mock-data
authoring. Categories shown in the filter bar are derived from the fetched
product data at runtime — nothing is hardcoded.

## Stack

- **Vite + React 18** for the app shell and dev server
- **Tailwind CSS** via PostCSS (`tailwind.config.js` + `postcss.config.js`) —
  not the CDN build, so the custom color/font tokens are compiled properly
- **react-router-dom** for the Home / Product detail / Checkout routes
- **Cart state**: `useReducer` + Context API (`src/context/CartContext.jsx`),
  synced to `localStorage` on every change so the cart survives a refresh

## Project structure

```
src/
  context/
    CartContext.jsx     # useReducer cart state + localStorage persistence + drawer open/close
  hooks/
    useProducts.js       # fetch + loading/error state for the product list
  components/
    Navbar.jsx            # wordmark + cart icon with item-count badge
    ProductGrid.jsx
    ProductCard.jsx
    FilterBar.jsx
    ProductDetail.jsx     # routed at /product/:id
    CartDrawer.jsx
    CartItem.jsx
  pages/
    Home.jsx
    Checkout.jsx
```

## Features implemented

- Responsive product grid (2 cols mobile → 4 cols desktop) with image, name,
  price, category, and star rating pulled from the API
- Filter bar: filter by category (derived from live data) + sort by price
  (low→high, high→low)
- Product detail route (`/product/:id`) with full description, stock status,
  a quantity selector, and Add to Cart
- Slide-out cart drawer with quantity controls, remove, running subtotal, and
  a Checkout button — animated with `prefers-reduced-motion` respected
- Checkout page: order review + subtotal/shipping/tax/total, ending in an
  "Order Placed" confirmation screen (no real payment gateway involved)
- Cart persisted to `localStorage` via the CartContext's reducer + `useEffect`
- Loading skeletons while fetching, plus intentional empty states for
  "no products match this filter" and "your bag is empty"
- Visible focus-visible outlines on every interactive element

## Local setup

```bash
npm install
npm run dev
```

Then open the printed local URL (typically `http://localhost:5173`).

To build for production:

```bash
npm run build
npm run preview
```

## Scope note

This is **intentionally frontend-only**. There's no server, no database, and
no real payment processing — the checkout flow ends at a client-side order
summary and confirmation state. In a real client engagement, this UI layer
would be pointed at their actual backend (Shopify Storefront API, a custom
headless commerce service, Stripe/PayPal for payment, etc.) by swapping out
`useProducts.js` and the checkout submit handler; the component structure and
cart state management are already decoupled from the data source to make that
swap straightforward.
