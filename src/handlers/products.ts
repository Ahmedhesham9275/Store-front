import  express, { Request, Response }  from "express";
import { Product, ProductStore } from "../models/products";
import { verifyAuthToken } from "../middleware/authoriz";



const store = new ProductStore();

  const index = async (_req: Request, res: Response) => {
    try {

      const prod = await store.index()
      res.json(prod)

    } catch (error) {

      res.status(400)
      res.json(error)
    }
    
  }
  
  const show = async (req: Request, res: Response) => {
    try {
      
      const prod = await store.show(req.params.id)
      res.json(prod)
      
    } catch (error) {
      
      res.status(400)
      res.json(error) 
    }

  }
  
  const create = async (req: Request, res: Response) => {
      try {
          const prods: Product = {
              name: req.body.name,
              price: req.body.price,
          }
  
          const newproduct = await store.create(prods)
          res.json(newproduct)
          console.log('done')
      } catch(err) {
          res.status(400)
          res.json(err)
          console.log('failed')
      }
  }
  
  const destroy = async (req: Request, res: Response) => {
    try {
      
      const deleted = await store.delete(req.body.id)
      res.json(deleted)

    } catch (error) {

      res.status(400)
      res.json(error) 
    }

  }
  
  const ProductsRoutes = (app: express.Application) => {
    app.get('/products', index)
    app.get('/products/:id', show)
    app.post('/products',verifyAuthToken ,create)
    app.delete('/products', verifyAuthToken,destroy)
  }

export default ProductsRoutes