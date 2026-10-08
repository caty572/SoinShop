# 🌿 SoinShop

A parapharmacy storefront: browse products by category and brand, fill a cart, and place an order. 🛍️

| | Stack | Port |
|---|---|---|
| 🎨 **Frontend** | React · Vite · Tailwind CSS | `3000` |
| ⚙️ **Backend** | Node · Express · MySQL | `5000` |

```
soinshop/
├── frontend/   the website
└── backend/    REST API, database schema and seed data
```

## 🚀 Quick start

### 1. 🗄️ Database

Start the MySQL service. On Windows, run this in an administrator terminal (or use the Services app):

```bash
net start MYSQL80
```

### 2. ⚙️ Backend

```bash
cd backend
npm install
copy .env.example .env    # then set DB_PASSWORD to your MySQL password
npm run seed              # creates the "soinshop" database, loads 64 products and 12 brands
npm run dev               # API on http://localhost:5000
```

✅ Check that it works at <http://localhost:5000/api/products>.

### 3. 🎨 Frontend

```bash
cd frontend
npm install --legacy-peer-deps
npm run dev
```

Open <http://localhost:3000>. Vite proxies `/api/*` to the backend.

> ⚠️ If the backend is offline, the site falls back to its built-in product list. Orders can't be saved until the API is running.

## 🔌 API

| Method | Route | Description |
|--------|-------|-------------|
| `GET` | `/api/health` | 💚 Service status |
| `GET` | `/api/products` | 🧴 All products. Filter with `?category=visage` |
| `GET` | `/api/products/:id` | 🔍 A single product |
| `GET` | `/api/brands` | 🏷️ All brands |
| `POST` | `/api/orders` | 📦 Place an order. Prices are read from MySQL, never from the client |

Tables: `brands`, `products`, `orders`, `order_items`. See [backend/schema.sql](backend/schema.sql).

## 🧴 Managing products

- 📝 **Data:** edit rows in MySQL Workbench, or edit [backend/data/products.json](backend/data/products.json) and run `npm run seed` again.
- 🖼️ **Images:** place them in `frontend/src/assets/images/`. The `image` column stores the path.
