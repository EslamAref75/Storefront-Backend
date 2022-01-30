import express, { Request, Response } from 'express';
import { Order_products, Order, OrderModel } from '../models/order';
import { verifyAuthToken } from '../middleware/authentication';

const OrderStore = new OrderModel();

const index = async (req: Request, res: Response) => {
  try {
    const order = await OrderStore.index();
    res.json(order);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const order: Order = {
      user_id: req.body.user_id,
      status: 'active'
    };
    const newOrder = await OrderStore.create(order);
    res.json(newOrder);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const getOrders = async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id);
    const orderId: Order = await OrderStore.getOrders(id);
    res.json(orderId);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const addProduct = async (req: Request, res: Response) => {
  try {
    const adOrder: Order_products = {
      order_id: req.body.order_id,
      product_id: req.body.product_id,
      quantity: req.body.quantity
    };

    const addedProduct = await OrderStore.addProduct(adOrder);
    res.json(addedProduct);
  } catch (err) {
    res.status(400);
    console.log(err);
    res.json(err);
  }
};

const destroy = async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id);
    const deleted = await OrderStore.destroy(id);
    res.json(deleted);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const ordersRoutes = async (app: express.Application) => {
  app.get('/orders', verifyAuthToken, index);
  app.get('/orders/:id', verifyAuthToken, getOrders);
  app.post('/orders', verifyAuthToken, create);
  app.post('/orders/products', verifyAuthToken, addProduct);
  app.delete('/orders/:id', verifyAuthToken, destroy);
};

export default ordersRoutes;
