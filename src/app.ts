import express from 'express';
import bodyParser from 'body-parser';
import usersRoutes from './handlers/users';
import ProductsRoutes from './handlers/products';
import ordersRoutes from './handlers/orders'


const app: express.Application = express()

app.use(bodyParser.json())

ordersRoutes(app);
ProductsRoutes(app);
usersRoutes(app);

export default app;
