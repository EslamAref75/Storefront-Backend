CREATE TYPE status_type AS ENUM ('active', 'complete');

CREATE TABLE orders (
     id SERIAL PRIMARY KEY,
     status status_type NOT NULL ,
     user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE 
);