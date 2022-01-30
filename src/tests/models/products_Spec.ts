import { ProductModel } from '../../models/product';

const productStore = new ProductModel();

describe('Products model definition check', () => {
  it('should have an index method', () => {
    expect(productStore.index).toBeDefined();
  });

  it('should have a create method', () => {
    expect(productStore.create).toBeDefined();
  });

  it('should have a show method', () => {
    expect(productStore.show).toBeDefined();
  });

  it('should have a update method', () => {
    expect(productStore.update).toBeDefined();
  });

  it('should have a destroy method', () => {
    expect(productStore.destroy).toBeDefined();
  });
});

describe('Products model methods check', () => {
  it(' should create new  product', async () => {
    const result = await productStore.create({ name: 'newspapper', price: 50 });

    expect(result).toEqual({
      id: 4,
      name: 'newspapper',
      price: 50
    });
  });

  it('should return list of products using index method', async () => {
    const result = await productStore.index();
    expect(result[1].id).toEqual(4);
    expect(result[1].name).toEqual('newspapper');
    expect(result[1].price).toEqual(50);
  });

  it('should return the correct product by id using show method', async () => {
    const result = await productStore.show(4);

    expect(result).toEqual({
      id: 4,
      name: 'newspapper',
      price: 50
    });
  });

  it('should edit the product using update method', async () => {
    const result = await productStore.update({
      id: 4,
      name: 'book',
      price: 80
    });

    expect(result).toEqual({
      id: 4,
      name: 'book',
      price: 80
    });
  });

  it('should delete the correct product by id using destroy method', async () => {
    const result = await productStore.destroy(4);
    expect(result).toEqual({
      id: 4,
      name: 'book',
      price: 80
    });
  });
});
