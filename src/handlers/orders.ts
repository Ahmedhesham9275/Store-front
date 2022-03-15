import  express, { Request, Response }  from "express";
import { verifyAuthToken } from "../middleware/authoriz";
import { Order, OrderStore } from "../models/orders";


const store = new OrderStore();

  const index = async (_req: Request, res: Response) => {
    const order = await store.index()
    res.json(order)
  }
  
  const CurrentOrder = async (req: Request, res: Response) => {
     const order = await store.show(req.body.id)
     res.json(order)
  }
  
  const create = async (req: Request, res: Response) => {

      try {
          const orders: Order = {
            status: req.body.status,
            user_id: req.body.user_id,
          }
  
          const newOrder = await store.create(orders)
          res.json(newOrder)
          console.log('done')
      } catch(err) {
          res.status(400)
          res.json(err)
          console.log('failed')
      }
  }
  
  const destroy = async (req: Request, res: Response) => {

      const deleted = await store.delete(req.body.id)
      res.json(deleted)
  }

  const addProduct = async (req: Request, res: Response) => {
    const orderId: string = req.params.id
    const productId: string = req.body.productId
    const quantity: number = parseInt (req.body.quantity)
  
    try {
      const addedProduct = await store.addProduct(quantity, orderId, productId)
      res.json(addedProduct)
    } catch(err) {
      res.status(400)
      res.json(err)
    }
  } 
  
  const ordersRoutes = (app: express.Application) => {
    app.get('/orders', verifyAuthToken ,index)
    app.get('/orders/:id', verifyAuthToken ,CurrentOrder)
    app.post('/orders', verifyAuthToken, create)
    app.delete('/orders', verifyAuthToken ,destroy)
    app.post('/orders/:id/products',verifyAuthToken ,addProduct)
}
  

export default ordersRoutes