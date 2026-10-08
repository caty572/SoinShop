import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { pool } from './db.js';

const app = express();
app.use(cors());
app.use(express.json());

const FREE_SHIPPING_FROM = 99;
const SHIPPING_COST = 7;

// DB row (snake_case) -> object the React app expects (camelCase)
const toProduct = (r) => ({
  id: r.id,
  name: r.name,
  subtitle: r.subtitle ?? undefined,
  brand: r.brand,
  price: r.price,
  oldPrice: r.old_price ?? undefined,
  image: r.image,
  category: r.category,
  categoryLabel: r.category_label,
  description: r.description,
  details: r.details,
  inStock: !!r.in_stock,
  isBestSeller: !!r.is_best_seller,
});

const handle = (fn) => (req, res) =>
  fn(req, res).catch((err) => {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  });

app.get('/api/health', handle(async (_req, res) => {
  await pool.query('SELECT 1');
  res.json({ ok: true });
}));

// GET /api/products  or  /api/products?category=visage
app.get('/api/products', handle(async (req, res) => {
  const { category } = req.query;
  const [rows] = category
    ? await pool.query('SELECT * FROM products WHERE category = ? ORDER BY id', [category])
    : await pool.query('SELECT * FROM products ORDER BY id');
  res.json(rows.map(toProduct));
}));

app.get('/api/products/:id', handle(async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM products WHERE id = ?', [req.params.id]);
  if (rows.length === 0) return res.status(404).json({ error: 'Produit introuvable' });
  res.json(toProduct(rows[0]));
}));

app.get('/api/brands', handle(async (_req, res) => {
  const [rows] = await pool.query('SELECT * FROM brands');
  res.json(rows);
}));

// POST /api/orders  { fullName, phone, governorate, address, notes, items: [{ productId, quantity }] }
// Prices are read from the database, never trusted from the browser.
app.post('/api/orders', handle(async (req, res) => {
  const { fullName, phone, governorate, address, notes, items } = req.body ?? {};
  if (!fullName?.trim() || !phone?.trim() || !address?.trim() || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Données de commande incomplètes' });
  }

  const ids = items.map((i) => i.productId);
  const [products] = await pool.query('SELECT id, price FROM products WHERE id IN (?)', [ids]);
  const priceOf = new Map(products.map((p) => [p.id, p.price]));

  const lines = [];
  for (const i of items) {
    const qty = Number(i.quantity);
    if (!priceOf.has(i.productId) || !Number.isInteger(qty) || qty < 1) {
      return res.status(400).json({ error: `Produit invalide : ${i.productId}` });
    }
    lines.push({ productId: i.productId, quantity: qty, unitPrice: priceOf.get(i.productId) });
  }

  const subtotal = lines.reduce((s, l) => s + l.unitPrice * l.quantity, 0);
  const shipping = subtotal >= FREE_SHIPPING_FROM ? 0 : SHIPPING_COST;
  const total = subtotal + shipping;
  const orderId = `SOIN-${Math.floor(100000 + Math.random() * 900000)}`;

  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    await conn.execute(
      `INSERT INTO orders (id, full_name, phone, governorate, address, notes, subtotal, shipping, total)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [orderId, fullName.trim(), phone.trim(), governorate ?? null, address.trim(), notes ?? null, subtotal, shipping, total]
    );
    for (const l of lines) {
      await conn.execute(
        'INSERT INTO order_items (order_id, product_id, quantity, unit_price) VALUES (?, ?, ?, ?)',
        [orderId, l.productId, l.quantity, l.unitPrice]
      );
    }
    await conn.commit();
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }

  res.status(201).json({ orderId, subtotal, shipping, total });
}));

const PORT = Number(process.env.PORT) || 5000;
app.listen(PORT, () => console.log(`SoinShop API on http://localhost:${PORT}`));
