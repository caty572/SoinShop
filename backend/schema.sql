CREATE DATABASE IF NOT EXISTS soinshop CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE soinshop;

CREATE TABLE IF NOT EXISTS brands (
  id          VARCHAR(50)  PRIMARY KEY,
  name        VARCHAR(100) NOT NULL,
  subtitle    VARCHAR(150),
  description TEXT
);

CREATE TABLE IF NOT EXISTS products (
  id             VARCHAR(100) PRIMARY KEY,
  name           VARCHAR(255) NOT NULL,
  subtitle       VARCHAR(255),
  brand          VARCHAR(100) NOT NULL,
  price          DECIMAL(10,3) NOT NULL,
  old_price      DECIMAL(10,3) NULL,
  image          VARCHAR(255) NOT NULL,
  category       VARCHAR(50)  NOT NULL,
  category_label VARCHAR(100) NOT NULL,
  description    TEXT,
  details        TEXT,
  in_stock       TINYINT(1) NOT NULL DEFAULT 1,
  is_best_seller TINYINT(1) NOT NULL DEFAULT 0,
  INDEX idx_category (category)
);

CREATE TABLE IF NOT EXISTS orders (
  id          VARCHAR(20)  PRIMARY KEY,
  full_name   VARCHAR(150) NOT NULL,
  phone       VARCHAR(30)  NOT NULL,
  governorate VARCHAR(60),
  address     VARCHAR(255) NOT NULL,
  notes       TEXT,
  subtotal    DECIMAL(10,3) NOT NULL,
  shipping    DECIMAL(10,3) NOT NULL,
  total       DECIMAL(10,3) NOT NULL,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS order_items (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  order_id   VARCHAR(20)  NOT NULL,
  product_id VARCHAR(100) NOT NULL,
  quantity   INT NOT NULL,
  unit_price DECIMAL(10,3) NOT NULL,
  FOREIGN KEY (order_id)   REFERENCES orders(id)   ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id)
);
