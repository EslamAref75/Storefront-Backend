import supertest from 'supertest';
import { ProductModel } from '../../models/product';
import { UserClass } from '../../models/user';
import { server } from '../../server';

const Userstore = new UserClass();
const productStore = new ProductModel();
const request = supertest(server);
const token: string =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJmaXJzdF9uYW1lIjoic2FtIiwibGFzdF9uYW1lIjoiaHVudGVyIiwicGFzc3dvcmRfZGlnZXN0IjoiJDJiJDEwJDFoNUszeDIzZE5XUWt2V0F1NC53YXV6czBzcW5XQmN2cGJFL21NNHhVWUp5WEFUQWpUUkFhIn0sImlhdCI6MTY0MjI3MDY4Mn0.b8kt3Yn1sCdn_wc7uO5Ae1OLzQwzmBy9BdYqkLYwARg';

describe('Test Product endpoint responses', () => {
  afterAll(async () => {
    await Userstore.deleteUser(1);
    await productStore.destroy(1);
  });

  it('should create new product in api endpoint', async () => {
    const res = await request
      .post('/products')
      .send({ name: 'new paper', price: 55 })
      .set('Authorization', 'Bearer ' + token);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: 2,
      name: 'new paper',
      price: 55
    });
  });

  it('gets all products in api endpoint', async () => {
    const res = await request.get('/products');
    expect(res.status).toBe(200);
    expect(res.body).toEqual([
      {
        id: 2,
        name: 'new paper',
        price: 55
      }
    ]);
  });

  it('should get the correct product in api endpoint', async () => {
    const res = await request.get('/products/2');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: 2,
      name: 'new paper',
      price: 55
    });
  });

  it('should edite the correct product in api endpoint', async () => {
    const res = await request
      .put('/products/2')
      .send({ name: 'book', price: 88 })
      .set('Authorization', 'Bearer ' + token);

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: 2,
      name: 'book',
      price: 88
    });
  });

  it('should delete the correct product in api endpoint', async () => {
    const res = await request
      .delete('/products/2')
      .set('Authorization', 'Bearer ' + token);

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: 2,
      name: 'book',
      price: 88
    });
  });
});
