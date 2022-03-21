import  express, { Request, Response }  from "express";
import { User, UserStore } from "../models/user";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { verifyAuthToken } from "../middleware/authoriz";

dotenv.config()

const store = new UserStore();

const {
    TOKEN_SECRET
} = process.env
const tokenSecret = TOKEN_SECRET as string


const index = async (_req: Request, res: Response) => {
    try {
        const users = await store.index()
         res.json(users)
    } catch (error) {
        res.status(400)
        res.json(error)
    }
    
  }
  
  const show = async (req: Request, res: Response) => {
      try {
        const users = await store.show(req.params.id)
        res.json(users)
      } catch (error) {
        res.status(400)
        res.json(error)
      }
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
        const deleted = await store.delete(req.body.id)
        res.json(deleted)
  } catch(error) {
        res.status(400)
        res.json(error)
      return
  }

  }

const usersRoutes = (app: express.Application) => {
    app.post('/users',create)
    app.post('/users/authenticate', authenticate)
    app.get('/users',verifyAuthToken,index)
    app.get('/users/:id',verifyAuthToken ,show)
    app.delete('/users', verifyAuthToken ,destroy)
  }

export default usersRoutes