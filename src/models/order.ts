import client from '../database';

export type Order = {
  id?: number;
  status: string;
  user_id: number;
};

export type Order_products = {
  id?: number;
  quantity: number;
  order_id: number;
  product_id: number;
};

export class OrderModel {
  // get all orders from orders table
  async index(): Promise<Order[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM orders';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Cannot get the order ${err}`);
    }
  }

  // create new order
  async create(arg: Order): Promise<Order> {
    try {
      const conn = await client.connect();
      const sql =
        'INSERT INTO orders (status, user_id) VALUES ($1, $2) RETURNING *';
      const result = await conn.query(sql, [arg.status, arg.user_id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Cannot add new ${arg.status} . Error:${err}`);
    }
  }

  // Show order by user Id
  async getOrders(userId: number): Promise<Order> {
    try {
      const conn = await client.connect();
      const sql = `SELECT * FROM orders WHERE user_id=$1`;
      const result = await conn.query(sql, [userId]);
      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Cannot add new  . Error:${err}`);
    }
  }

  // create new product in order_Products table
  async addProduct(arg: Order_products): Promise<Order_products> {
    try {
      const conn = await client.connect();
      const sql =
        'INSERT INTO order_products (quantity, order_id,product_id) VALUES ($1, $2, $3) RETURNING *';
      const result = await conn.query(sql, [
        arg.quantity,
        arg.order_id,
        arg.product_id
      ]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Cannot add new order. Error:${err}`);
    }
  }

  // delete order by id
  async destroy(id: number): Promise<Order> {
    try {
      const conn = await client.connect();
      const sql = 'DELETE FROM orders WHERE id=$1 RETURNING *';
      const result = await conn.query(sql, [id]);
      const order = result.rows[0];
      conn.release();
      return order;
    } catch (err) {
      throw new Error(`Cannot delete order . Error:${err}`);
    }
  }
}
