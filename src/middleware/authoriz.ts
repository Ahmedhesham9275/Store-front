import  express, { Request, Response , NextFunction}  from "express";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';


dotenv.config()

const {
    TOKEN_SECRET
  } = process.env
  const tokenSecret = TOKEN_SECRET as string

  export const verifyAuthToken = (req: Request, res: Response, next : NextFunction) => {
    try {
        const authorizationHeader = req.headers.authorization as string
        const token = authorizationHeader.split(' ')[1]
        const decoded = jwt.verify(token, tokenSecret)
    } catch (error) {
        res.status(401)
        res.json('Access denied, invalid token')
    }
    next()

}