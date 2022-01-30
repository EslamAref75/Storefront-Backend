import express, { NextFunction, Request, Response } from 'express';
import { User, UserClass } from '../models/user';
import jwt from 'jsonwebtoken';
import { verifyAuthToken } from '../middleware/authentication';

const userStore = new UserClass();

const getUser = async (req: Request, res: Response) => {
  try {
    const user = await userStore.getUser();
    res.json(user);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id);
    const userId: User = await userStore.show(id);
    res.json(userId);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const createUser = async (req: Request, res: Response) => {
  const user: User = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    password_digest: req.body.password_digest
  };
  const tokenSecret: string = process.env.TOKEN_SECRET as string;

  try {
    const newUser = await userStore.createUser(user);
    const token = jwt.sign({ user: newUser }, tokenSecret);
    res.json(token);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  const user: User = {
    id: parseInt(req.params.id),
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    password_digest: req.body.password_digest
  };

  try {
    const editUser = await userStore.update(user);
    res.json(editUser);
    next();
  } catch (err) {
    next(err);
  }
};

const destroy = async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id);
    const deleted = await userStore.deleteUser(id);
    res.json(deleted);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const auth = async (req: Request, res: Response) => {
  const user: User = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    password_digest: req.body.password_digest
  };

  try {
    const newUser = await userStore.authenticate(
      user.first_name,
      user.last_name,
      user.password_digest
    );
    res.json(newUser);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const usersRoutes = async (app: express.Application) => {
  app.get('/users', verifyAuthToken, getUser);
  app.get('/users/:id', verifyAuthToken, show);
  app.put('/users/:id', verifyAuthToken, updateUser);
  app.post('/users', createUser);
  app.post('/users/authenticate', verifyAuthToken, auth);
  app.delete('/users/:id', verifyAuthToken, destroy);
};

export default usersRoutes;
