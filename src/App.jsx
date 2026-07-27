import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import CartDrawer from './components/CartDrawer.jsx'
import ProductDetail from './components/ProductDetail.jsx'
import Home from './pages/Home.jsx'
import Checkout from './pages/Checkout.jsx'

export default function App() {
  return (
    <div className="min-h-screen bg-marlow-ink">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </main>
      <CartDrawer />
    </div>
  )
}
