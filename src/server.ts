import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import productsRoutes from './handlers/productsHandler';
import usersRoutes from './handlers/usersHandler';
import ordersRoutes from './handlers/ordersHandler';

const app: express.Application = express();
const address: string = '0.0.0.0:3000';

const corsOption = {
  optionsSuccessStatus: 200
};
app.use(cors(corsOption));

app.use(bodyParser.json());

app.use(morgan('dev'));

app.get('/', (req: Request, res: Response) => {
  res.send('Storefront Backend API');
});

productsRoutes(app);
usersRoutes(app);
ordersRoutes(app);

export const server = app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});
