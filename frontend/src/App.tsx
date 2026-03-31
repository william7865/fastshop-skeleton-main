import { Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchCart } from "./api";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";

export default function App() {
  const [cartCount, setCartCount] = useState(0);

  const refreshCartCount = () => {
    fetchCart().then((items) => {
      setCartCount(items.reduce((sum, item) => sum + item.quantity, 0));
    }).catch(() => setCartCount(0));
  };

  useEffect(() => {
    refreshCartCount();
  }, []);

  return (
    <>
      <nav className="navbar">
        <Link to="/" className="nav-brand">FastShop</Link>
        <div className="nav-links">
          <Link to="/">Produits</Link>
          <Link to="/cart">Panier ({cartCount})</Link>
        </div>
      </nav>
      <main className="container">
        <Routes>
          <Route path="/" element={<ProductsPage onCartUpdate={refreshCartCount} />} />
          <Route path="/products/:id" element={<ProductDetailPage onCartUpdate={refreshCartCount} />} />
          <Route path="/cart" element={<CartPage onCartUpdate={refreshCartCount} />} />
        </Routes>
      </main>
    </>
  );
}
