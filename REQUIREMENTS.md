# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index: `'products/' [GET]`
- Show: `'products/:id' [GET]`
- Create (arg: Products)[token required]: `'products/' [POST] (token)`
- Update (arg: Products)[token required]: `'products/:id  [PUT]`
- Destroy [token required]: `'products/:id  [DELETE]`

#### Users
- Index [token required]: `'users/' [GET] (token)`
- Show [token required]: `'users/:id' [GET] (token)`
- Create (arg: User)[token required]: `'users/' [POST] (token)`
- Update (arg: User)[token required]: `'users/:id  [PUT]`
- Authenticate[token required]: `'users/authenticate  [POST]`
- Destroy [token required]: `'users/:id  [DELETE]`

#### Orders
- Get Order by user [token required]: `'orders/:user_id' [GET] (token)`
- Active Orders by user [token required]: `'orders/active/:user_id' [GET] (token)`
- Create (arg: Order)[token required]: `'orders/' [POST] (token)`
- Add new product order (arg: Order_products)[token required]: `'orders/products' [POST] (token)`
- Destroy [token required]: `'orders/:id  [DELETE]`

## Data Shapes
#### Product
-  id
- name
- price

```
Table: products (  id SERIAL PRIMARY KEY, name VARCHAR(64) NOT NULL, price INTEGER NOT NULL)
```
#### User
- id
- firstName
- lastName
- password

```
Table: users ( id SERIAL PRIMARY KEY NOT NULL, first_name VARCHAR(100) NOT NULL, last_name VARCHAR(100) NOT NULL, password_digest VARCHAR NOT NULL)
```
#### Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)

```
Table: orders ( id SERIAL PRIMARY KEY,status status_type NOT NULL , user_id INTEGER NOT NULL REFERENCES users(id))
```

```
TYPE AS ENUM : status_type ('active', 'complete')
```

```
Table: order_products ( id SERIAL PRIMARY KEY, quantity INTEGER NOT NULL, order_id INTEGER NOT NULL REFERENCES orders(id), product_id INTEGER NOT NULL REFERENCES products(id))
```

