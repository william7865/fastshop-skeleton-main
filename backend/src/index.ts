import express from "express";
import cors from "cors";
import healthRouter from "./routes/health.js";
import productsRouter from "./routes/products.js";
import cartRouter from "./routes/cart.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/health", healthRouter);
app.use("/api/products", productsRouter);
app.use("/api/cart", cartRouter);

app.listen(PORT, () => {
  console.log(`FastShop API running on port ${PORT}`);
});
