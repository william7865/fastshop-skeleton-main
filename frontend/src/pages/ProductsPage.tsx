import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchProducts, addToCart } from "../api";
import type { Product } from "../types";

export default function ProductsPage({
  onCartUpdate,
}: {
  onCartUpdate: () => void;
}) {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchProducts().then(setProducts);
  }, []);

  const handleAddToCart = async (productId: number) => {
    await addToCart(productId, 1);
    onCartUpdate();
  };

  return (
    <>
      <h1 style={{ marginBottom: "1.5rem" }}>Nos produits</h1>
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image_url} alt={product.name} />
            <div className="product-card-body">
              <h3>{product.name}</h3>
              <p className="price">{product.price.toFixed(2)} EUR</p>
            </div>
            <div className="product-card-actions">
              <Link to={`/products/${product.id}`} className="btn btn-link">
                Voir
              </Link>
              <button
                className="btn btn-primary"
                onClick={() => handleAddToCart(product.id)}
              >
                Ajouter au panier
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
