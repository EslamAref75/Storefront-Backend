import express, { NextFunction, Request, Response } from 'express';
import { Products, ProductModel } from '../models/product';
import { verifyAuthToken } from '../middleware/authentication';

const ProductStore = new ProductModel();

const index = async (req: Request, res: Response) => {
  try {
    const product = await ProductStore.index();
    res.json(product);
  } catch (err) {
    res.status(400);
    console.log(err);
    res.json(err);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id);
    const productId: Products = await ProductStore.show(id);
    res.json(productId);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const create = async (req: Request, res: Response) => {
  const product: Products = {
    name: req.body.name,
    price: req.body.price
  };

  try {
    const newProduct = await ProductStore.create(product);
    res.json(newProduct);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const update = async (req: Request, res: Response, next: NextFunction) => {
  const product: Products = {
    id: parseInt(req.params.id),
    name: req.body.name,
    price: req.body.price
  };
  try {
    const editProduct = await ProductStore.update(product);
    res.json(editProduct);
    next();
  } catch (err) {
    next(err);
  }
};

const destroy = async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id);
    const deleted = await ProductStore.destroy(id);
    res.json(deleted);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const productsRoutes = async (app: express.Application) => {
  app.get('/products', index);
  app.get('/products/:id', show);
  app.put('/products/:id', verifyAuthToken, update);
  app.post('/products', verifyAuthToken, create);
  app.delete('/products/:id', verifyAuthToken, destroy);
};

export default productsRoutes;
