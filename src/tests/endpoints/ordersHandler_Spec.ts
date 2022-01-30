import supertest from 'supertest';
import { ProductModel } from '../../models/product';
import { UserClass } from '../../models/user';
import { server } from '../../server';

const Userstore = new UserClass();
const productStore = new ProductModel();
const request = supertest(server);
const token: string =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJmaXJzdF9uYW1lIjoic2FtIiwibGFzdF9uYW1lIjoiaHVudGVyIiwicGFzc3dvcmRfZGlnZXN0IjoiJDJiJDEwJDFoNUszeDIzZE5XUWt2V0F1NC53YXV6czBzcW5XQmN2cGJFL21NNHhVWUp5WEFUQWpUUkFhIn0sImlhdCI6MTY0MjI3MDY4Mn0.b8kt3Yn1sCdn_wc7uO5Ae1OLzQwzmBy9BdYqkLYwARg';

describe('Test Orders endpoint responses', () => {
  beforeAll(async () => {
    await Userstore.createUser({
      first_name: 'sam',
      last_name: 'hunter',
      password_digest: 'password123'
    });

    await productStore.create({
      name: 'paper',
      price: 40
    });
  });
  afterAll(async () => {
    await Userstore.deleteUser(1);
    await productStore.destroy(1);
  });

  it('should create new order in api endpoint', async () => {
    const res = await request
      .post('/orders')
      .send({ status: 'active', user_id: 1 })
      .set('Authorization', 'Bearer ' + token);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ id: 1, status: 'active', user_id: 1 });
  });

  it('gets all orders in api endpoint', async () => {
    const res = await request
      .get('/orders')
      .set('Authorization', 'Bearer ' + token);
    expect(res.status).toBe(200);
    expect(res.body).toEqual([{ id: 1, status: 'active', user_id: 1 }]);
  });

  it('should get the correct order with user id in api endpoint', async () => {
    const res = await request
      .get('/orders/1')
      .set('Authorization', 'Bearer ' + token);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ id: 1, status: 'active', user_id: 1 });
  });

  it('should create new product in order_products in api endpoint', async () => {
    const res = await request
      .post('/orders/products')
      .send({ quantity: 20, order_id: 1, product_id: 1 })
      .set('Authorization', 'Bearer ' + token);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: 1,
      quantity: 20,
      order_id: 1,
      product_id: 1
    });
  });

  it('should delete the correct order in api endpoint', async () => {
    const res = await request
      .delete('/orders/1')
      .set('Authorization', 'Bearer ' + token);

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ id: 1, status: 'active', user_id: 1 });
  });
});
