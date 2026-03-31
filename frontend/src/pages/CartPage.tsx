import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchCart, removeFromCart, clearCart } from "../api";
import type { CartItem } from "../types";

export default function CartPage({
  onCartUpdate,
}: {
  onCartUpdate: () => void;
}) {
  const [items, setItems] = useState<CartItem[]>([]);

  const loadCart = () => {
    fetchCart().then(setItems);
  };

  useEffect(() => {
    loadCart();
  }, []);

  const handleRemove = async (id: number) => {
    await removeFromCart(id);
    loadCart();
    onCartUpdate();
  };

  const handleClear = async () => {
    await clearCart();
    setItems([]);
    onCartUpdate();
  };

  const total = items.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );

  return (
    <>
      <h1 style={{ marginBottom: "1.5rem" }}>Panier</h1>
      {items.length === 0 ? (
        <div className="empty-state">
          <p>Votre panier est vide</p>
          <Link to="/" className="btn btn-primary" style={{ marginTop: "1rem" }}>
            Continuer vos achats
          </Link>
        </div>
      ) : (
        <>
          <table className="cart-table">
            <thead>
              <tr>
                <th>Produit</th>
                <th>Prix unitaire</th>
                <th>Quantite</th>
                <th>Sous-total</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{Number(item.price).toFixed(2)} EUR</td>
                  <td>{item.quantity}</td>
                  <td>{(Number(item.price) * item.quantity).toFixed(2)} EUR</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleRemove(item.id)}
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="cart-total">
            <strong>Total : {total.toFixed(2)} EUR</strong>
          </div>
          <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
            <Link to="/" className="btn btn-primary">
              Continuer vos achats
            </Link>
            <button className="btn btn-danger" onClick={handleClear}>
              Vider le panier
            </button>
          </div>
        </>
      )}
    </>
  );
}
