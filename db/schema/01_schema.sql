/*
DROP TABLES
Drop a table (if it exists) and its dependent objects
*/
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS bubbleteas CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS order_line_items CASCADE;

/*
CREATE TABLES
Define tables in order of least dependent to most dependent.
Least number of foreign keys to greatest number of foreign keys.
*/
CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  phone_number VARCHAR(255) NOT NULL,
  is_admin BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE bubbleteas (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  cost INTEGER NOT NULL DEFAULT 0,  -- Cost in cents
  image_url VARCHAR(255) NOT NULL
);

CREATE TABLE orders (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP,
  completed_at TIMESTAMP,
  status VARCHAR(255) DEFAULT 'submitted',
  eta INTEGER     -- The ETA of the order in minutes
);

CREATE TABLE order_line_items (
  id SERIAL PRIMARY KEY NOT NULL,
  bubbletea_id INTEGER REFERENCES bubbleteas(id) ON DELETE CASCADE,
  order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
  quantity SMALLINT DEFAULT 1
);
