import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export const verifyAuthToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const tokenSecret: string = process.env.TOKEN_SECRET as string;
    const authorization: string | undefined = req.headers.authorization;
    const token: string = authorization ? authorization.split(' ')[1] : '';
    jwt.verify(token, tokenSecret);
    next();
  } catch (err) {
    res.status(401);
    res.json(`Invalid token ${err}`);
    next(err);
  }
};
