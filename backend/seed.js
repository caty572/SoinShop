// Creates the database + tables, then fills products and brands from data/*.json
// Run once:  npm run seed   (safe to run again, it refreshes products and brands)
import 'dotenv/config';
import fs from 'node:fs';
import mysql from 'mysql2/promise';

const read = (f) => JSON.parse(fs.readFileSync(new URL(`./data/${f}`, import.meta.url), 'utf8'));
const products = read('products.json');
const brands = read('brands.json');

const conn = await mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  multipleStatements: true,
});

await conn.query(fs.readFileSync(new URL('./schema.sql', import.meta.url), 'utf8'));
await conn.changeUser({ database: process.env.DB_NAME || 'soinshop' });

for (const b of brands) {
  await conn.execute(
    `INSERT INTO brands (id, name, subtitle, description) VALUES (?, ?, ?, ?)
     ON DUPLICATE KEY UPDATE name = VALUES(name), subtitle = VALUES(subtitle), description = VALUES(description)`,
    [b.id, b.name, b.subtitle, b.description]
  );
}

for (const p of products) {
  await conn.execute(
    `INSERT INTO products
       (id, name, subtitle, brand, price, old_price, image, category, category_label, description, details, in_stock, is_best_seller)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
     ON DUPLICATE KEY UPDATE
       name = VALUES(name), subtitle = VALUES(subtitle), brand = VALUES(brand), price = VALUES(price),
       old_price = VALUES(old_price), image = VALUES(image), category = VALUES(category),
       category_label = VALUES(category_label), description = VALUES(description), details = VALUES(details),
       in_stock = VALUES(in_stock), is_best_seller = VALUES(is_best_seller)`,
    [
      p.id, p.name, p.subtitle ?? null, p.brand, p.price, p.oldPrice ?? null, p.image,
      p.category, p.categoryLabel, p.description, p.details, p.inStock ? 1 : 0, p.isBestSeller ? 1 : 0,
    ]
  );
}

console.log(`Done: ${brands.length} brands and ${products.length} products in MySQL.`);
await conn.end();
