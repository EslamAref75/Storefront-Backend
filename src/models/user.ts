import bcrypt from 'bcrypt';
import client from '../database';

export type User = {
  id?: number;
  first_name: string;
  last_name: string;
  password_digest: string;
};

export class UserClass {
  // get all users from users table
  async getUser(): Promise<User[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM users';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Cannot get the user ${err}`);
    }
  }

  // get the user by id
  async show(id: number): Promise<User> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM users WHERE id=$1';
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Cannot find user with id=($id) . Error:${err}`);
    }
  }

  // Create new user
  async createUser(arg: User): Promise<User> {
    try {
      const { first_name, last_name, password_digest } = arg;
      const conn = await client.connect();
      const sql =
        'INSERT INTO users (first_name, last_name, password_digest) VALUES ($1, $2, $3) RETURNING *';
      const pepper: string = process.env.BCRYPT_PASSWORD as string;
      const saltRounds: string = process.env.SALT_ROUNDS as string;

      const hash = bcrypt.hashSync(
        password_digest + pepper,
        parseInt(saltRounds)
      );

      const result = await conn.query(sql, [first_name, last_name, hash]);
      const user = result.rows[0];
      conn.release();
      return user;
    } catch (err) {
      throw new Error(
        `unable to create user (${(arg.first_name, arg.last_name)}): ${err}`
      );
    }
  }

  // edit user
  async update(arg: User): Promise<User> {
    try {
      const { id, first_name, last_name, password_digest } = arg;
      const conn = await client.connect();
      const sql = `Update users SET first_name=$2, last_name=$3, password_digest=$4 WHERE id=$1 RETURNING *  `;
      const pepper: string = process.env.BCRYPT_PASSWORD as string;
      const saltRounds: string = process.env.SALT_ROUNDS as string;

      const hash = bcrypt.hashSync(
        password_digest + pepper,
        parseInt(saltRounds)
      );
      const result = await conn.query(sql, [id, first_name, last_name, hash]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Cannot edit user . Error:${err}`);
    }
  }

  // Delete the user by id
  async deleteUser(id: number): Promise<User> {
    try {
      const sql = `DELETE FROM users WHERE id=$1 RETURNING *`;
      const conn = await client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not delete user ${id}. Error: ${err}`);
    }
  }

  // Check user's authentication
  async authenticate(
    first_name: string,
    last_name: string,
    password_digest: string
  ): Promise<User | null> {
    const pepper: string = process.env.BCRYPT_PASSWORD as string;
    const conn = await client.connect();
    const sql =
      'SELECT password_digest FROM users WHERE first_name=($1) AND last_name=($2)';

    const result = await conn.query(sql, [first_name, last_name]);

    console.log(password_digest + pepper);

    if (result.rows.length) {
      const user = result.rows[0];

      console.log(user);

      if (bcrypt.compareSync(password_digest + pepper, user.password_digest)) {
        return user;
      }
    }

    return null;
  }
}
