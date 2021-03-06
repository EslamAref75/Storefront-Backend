CREATE TABLE order_products (
     id SERIAL PRIMARY KEY,
     quantity INTEGER NOT NULL,
     order_id INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE ON UPDATE CASCADE,
     product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE ON UPDATE CASCADE
);