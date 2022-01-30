import client from '../database';

export type Products = {
  id?: number;
  name: string;
  price: number;
};

export class ProductModel {
  // get all products from products table
  async index(): Promise<Products[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM products';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Cannot get the product ${err}`);
    }
  }

  // create new product
  async create(arg: Products): Promise<Products> {
    try {
      const { name, price } = arg;
      const conn = await client.connect();
      const sql =
        'INSERT INTO products (name, price) VALUES ($1, $2) RETURNING *';
      const result = await conn.query(sql, [name, price]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Cannot add new ${arg.name} . Error:${err}`);
    }
  }

  // get the product by id
  async show(id: number): Promise<Products> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM products WHERE id=$1';
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Cannot find product with id=($id) . Error:${err}`);
    }
  }

  // edit product
  async update(arg: Products): Promise<Products> {
    try {
      const { id, name, price } = arg;
      const conn = await client.connect();
      const sql = `Update products SET name=$2, price=$3 WHERE id=$1 RETURNING *  `;
      const result = await conn.query(sql, [id, name, price]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Cannot edit product . Error:${err}`);
    }
  }

  // delete product by id
  async destroy(id: number): Promise<Products> {
    try {
      const conn = await client.connect();
      const sql = 'DELETE FROM products WHERE id=$1 RETURNING *';
      const result = await conn.query(sql, [id]);
      const product = result.rows[0];
      conn.release();
      return product;
    } catch (err) {
      throw new Error(`Cannot delete product . Error:${err}`);
    }
  }
}
