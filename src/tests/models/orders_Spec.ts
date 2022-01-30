import { OrderModel } from '../../models/order';
import { UserClass } from '../../models/user';
import { ProductModel } from '../../models/product';

const productStore = new ProductModel();
const Userstore = new UserClass();
const orderStore = new OrderModel();

describe('Orders model definition check', () => {
  it('should have an index method', () => {
    expect(orderStore.index).toBeDefined();
  });

  it('should have a create method', () => {
    expect(orderStore.create).toBeDefined();
  });

  it('should have a get orders method', () => {
    expect(orderStore.getOrders).toBeDefined();
  });

  it('should have an add products method', () => {
    expect(orderStore.addProduct).toBeDefined();
  });
});

describe('Orders model methods check', () => {
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
    await Userstore.deleteUser(3);
    await productStore.destroy(2);
  });

  it('should create new order and return the order to the table', async () => {
    const result = await orderStore.create({ status: 'active', user_id: 3 });

    expect(result).toEqual({
      id: 2,
      status: 'active',
      user_id: 3
    });
  });

  it('should return list of orders using index method', async () => {
    const result = await orderStore.index();

    expect(result).toEqual([
      {
        id: 2,
        status: 'active',
        user_id: 3
      }
    ]);
  });

  it('should return the correct order with user id', async () => {
    const result = await orderStore.getOrders(3);

    expect(result).toEqual({
      id: 2,
      status: 'active',
      user_id: 3
    });
  });

  it('should return the created product in Order_products table', async () => {
    const result = await orderStore.addProduct({
      quantity: 20,
      order_id: 2,
      product_id: 3
    });

    expect(result).toEqual({
      id: 2,
      quantity: 20,
      order_id: 2,
      product_id: 3
    });
  });

  it('should delete the correct order by id using destroy method', async () => {
    const result = await orderStore.destroy(2);
    expect(result).toEqual({
      id: 2,
      status: 'active',
      user_id: 3
    });
  });
});
