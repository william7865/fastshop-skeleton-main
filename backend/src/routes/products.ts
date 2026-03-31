import { Router } from "express";
import pool from "../db.js";

const router = Router();

router.get("/", async (_req, res) => {
  try {
    const result = await pool.query("SELECT * FROM products ORDER BY id");
    res.json(result.rows);
  } catch (err) {
    console.error("Failed to fetch products:", err);
    res.status(500).json({ error: "Database connection failed" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM products WHERE id = $1", [
      req.params.id,
    ]);
    if (result.rows.length === 0) {
      res.status(404).json({ error: "Product not found" });
      return;
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Failed to fetch product:", err);
    res.status(500).json({ error: "Database connection failed" });
  }
});

export default router;
