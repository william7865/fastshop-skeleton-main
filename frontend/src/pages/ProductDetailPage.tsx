import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchProduct, addToCart } from "../api";
import type { Product } from "../types";

export default function ProductDetailPage({
  onCartUpdate,
}: {
  onCartUpdate: () => void;
}) {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (id) {
      fetchProduct(Number(id)).then(setProduct);
    }
  }, [id]);

  const handleAddToCart = async () => {
    if (product) {
      await addToCart(product.id, quantity);
      onCartUpdate();
    }
  };

  if (!product) return <p>Chargement...</p>;

  return (
    <>
      <Link to="/" className="back-link">
        &larr; Retour aux produits
      </Link>
      <div className="product-detail">
        <img src={product.image_url} alt={product.name} />
        <div className="product-detail-info">
          <h1>{product.name}</h1>
          <p className="price">{product.price.toFixed(2)} EUR</p>
          <p>{product.description}</p>
          <p className="stock">Stock : {product.stock} disponible(s)</p>
          <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
            <input
              type="number"
              min={1}
              max={product.stock}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="quantity-input"
            />
            <button className="btn btn-primary" onClick={handleAddToCart}>
              Ajouter au panier
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
