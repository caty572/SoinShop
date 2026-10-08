# SoinShop

```
soinshop/
├── frontend/   React + Vite + Tailwind (the website)
└── backend/    Node + Express + MySQL (products, brands, orders API)
```

## 1. Start MySQL

Start the Windows service **MYSQL80** (Services app, or an administrator terminal: `net start MYSQL80`).

## 2. Backend (port 5000)

```
cd backend
npm install
copy .env.example .env      # then open .env and type your MySQL password in DB_PASSWORD
npm run seed                # creates the "soinshop" database + tables and loads the 64 products and 12 brands
npm run dev                 # starts the API on http://localhost:5000
```

Check it works: http://localhost:5000/api/products

| Route | What it does |
|-------|--------------|
| `GET /api/products` | all products (`?category=visage` to filter) |
| `GET /api/products/:id` | one product |
| `GET /api/brands` | brands |
| `POST /api/orders` | saves an order (prices are read from MySQL) |

Tables: `brands`, `products`, `orders`, `order_items` (see `backend/schema.sql`).

## 3. Frontend (port 3000)

```
cd frontend
npm install --legacy-peer-deps
npm run dev
```

Open http://localhost:3000. Vite forwards `/api/...` to the backend.
If the backend is not running, the site still shows the built-in product list, but orders cannot be saved.

## Changing products

Edit rows in MySQL (Workbench), or edit `backend/data/products.json` and run `npm run seed` again.
Product pictures live in `frontend/src/assets/images/` (the `image` column stores the path).
