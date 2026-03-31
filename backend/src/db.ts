import pg from "pg";

const pool = new pg.Pool({
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "5432"),
  database: process.env.DB_NAME || "fastshop",
  user: process.env.DB_USER || "fastshop",
  password: process.env.DB_PASSWORD || "fastshop_secret",
});

export default pool;
