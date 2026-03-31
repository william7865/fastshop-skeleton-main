import { Router } from "express";
import pool from "../db.js";

const router = Router();

router.get("/", async (_req, res) => {
  try {
    const result = await pool.query(
      `SELECT c.id, c.product_id, c.quantity, p.name, p.price, p.image_url
       FROM cart c
       JOIN products p ON c.product_id = p.id
       ORDER BY c.added_at`
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Failed to fetch cart:", err);
    res.status(500).json({ error: "Database connection failed" });
  }
});

router.post("/", async (req, res) => {
  const { product_id, quantity } = req.body as {
    product_id: number;
    quantity: number;
  };

  if (!product_id || !quantity) {
    res.status(400).json({ error: "product_id and quantity are required" });
    return;
  }

  try {
    const result = await pool.query(
      `INSERT INTO cart (product_id, quantity)
       VALUES ($1, $2)
       ON CONFLICT (product_id)
       DO UPDATE SET quantity = cart.quantity + EXCLUDED.quantity
       RETURNING *`,
      [product_id, quantity]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Failed to add to cart:", err);
    res.status(500).json({ error: "Database connection failed" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await pool.query("DELETE FROM cart WHERE id = $1", [req.params.id]);
    res.status(204).end();
  } catch (err) {
    console.error("Failed to remove from cart:", err);
    res.status(500).json({ error: "Database connection failed" });
  }
});

router.delete("/", async (_req, res) => {
  try {
    await pool.query("DELETE FROM cart");
    res.status(204).end();
  } catch (err) {
    console.error("Failed to clear cart:", err);
    res.status(500).json({ error: "Database connection failed" });
  }
});

export default router;
