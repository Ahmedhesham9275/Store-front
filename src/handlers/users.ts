import  express, { Request, Response }  from "express";
import { User, UserStore } from "../models/user";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config()

const store = new UserStore();

const {
    TOKEN_SECRET
} = process.env
const tokenSecret = TOKEN_SECRET as string


const index = async (_req: Request, res: Response) => {
    const users = await store.index()
    res.json(users)
  }
  
  const show = async (req: Request, res: Response) => {
     const users = await store.show(req.body.id)
     res.json(users)
  }


const create = async (req: Request, res: Response) => {
    try {
        const users: User = {
            
            firstname : req.body.firstname,
            lastname : req.body.lastname,
            email: req.body.email,
            password_digest: req.body.password,

        }
        const newUser = await store.create(users)
        var token = jwt.sign({ users: newUser }, tokenSecret);
        res.json(token)
        //res.json(newUser)
        console.log('done')
    } catch(err) {
        res.status(400)
        res.json(err)
        console.log('false')
    }
}

const authenticate = async (req: Request, res: Response) => {
    const user: User = {
      email: req.body.email,
      password_digest: req.body.password,
    }
    try {
        const u = await store.authenticate(user.email, user.password_digest)
        var token = jwt.sign({ user: u }, tokenSecret);
        res.json(token)
    } catch(error) {
        res.status(401)
        res.json({ error })
    }
}

const destroy = async (req: Request, res: Response) => {
    try {
      const authorizationHeader = req.headers.authorization as string
      const token = authorizationHeader.split(' ')[1]
      jwt.verify(token, tokenSecret)
  } catch(err) {
      res.status(401)
      res.json('Access denied, invalid token')
      return
  }
      const deleted = await store.delete(req.body.id)
      res.json(deleted)
  }

const usersRoutes = (app: express.Application) => {
    app.post('/users', create)
    app.post('/users/authenticate', authenticate)
    app.get('/users', index)
    app.get('/users/:id', show)
    app.delete('/users', destroy)
  }

export default usersRoutes