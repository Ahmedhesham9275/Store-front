import express from 'express';
import bodyParser from 'body-parser';
import usersRoutes from './handlers/users';
import ProductsRoutes from './handlers/products';
import ordersRoutes from './handlers/orders';



//\pset pager off


const app: express.Application = express()

const address: string = "0.0.0.0:3000"

app.use(bodyParser.json())

ordersRoutes(app);
ProductsRoutes(app);
usersRoutes(app);

app.listen(3000, function () {
    console.log(`starting app on port : ${address}`)
})
