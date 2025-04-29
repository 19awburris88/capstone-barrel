-- Drop tables if they exist
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS users;

-- Users table (sellers)
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  location VARCHAR(100),
  bio TEXT,
  avatar_url TEXT
);

-- Products table (bottles)
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price VARCHAR(50),
  proof VARCHAR(50),
  image TEXT,
  seller_id INTEGER REFERENCES users(id)
);
