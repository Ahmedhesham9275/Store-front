import bcrypt from 'bcrypt';
import  Client  from "../database";
import dotenv from 'dotenv';


dotenv.config()

const {
    BCRYPT_PASSWORD,
    SALT_ROUNDS
} = process.env

const pepper = BCRYPT_PASSWORD;
const saltRounds : string  = SALT_ROUNDS as string;

export type User = {
    id? :number,
    firstname? : string,
    lastname? : string,
    email: string,
    password_digest :string
}

export class UserStore {


  async index() : Promise<User[]> {
    try {
        const conn = await Client.connect();
        const sql = 'SELECT * FROM users';
        const result = await conn.query(sql);
        conn.release();
        return result.rows

    } 
    catch (error) {
        throw new Error (`Try again later, somthing went wrong ${error}`);
        
    }
}


  async show(id: string): Promise<User> {
    try {
    const sql = 'SELECT * FROM users WHERE id=($1)'
    
    const conn = await Client.connect()

    const result = await conn.query(sql, [id])

    conn.release()

    return result.rows[0]
    } catch (err) {
        throw new Error(`Could not find user ${id}. Error: ${err}`)
    }
  }


  async delete(id: string): Promise<User> {
    try {
  const sql = 'DELETE FROM users WHERE id=($1)'
  
  const conn = await Client.connect()

  const result = await conn.query(sql, [id])

  const book = result.rows[0]

  conn.release()

  return book
    } catch (err) {
        throw new Error(`Could not delete user ${id}. Error: ${err}`)
    }
}




    async create(u: User): Promise<User> {
        try {
      
      const conn = await Client.connect();
      
      const sql = 'INSERT INTO users (firstname, lastname, email, password_digest) VALUES($1, $2, $3, $4) RETURNING *';

      const hash = bcrypt.hashSync(
        u.password_digest + pepper, parseInt(saltRounds)
      );
      
      const result = await conn.query(sql, [u.firstname, u.lastname, u.email, hash]);
      const user = result.rows[0];
  
      conn.release();
      return user
        } catch (err) {
            throw new Error(`Could not add new user  Error: ${err}`)
        }

    }

    async authenticate(email: string, password: string): Promise<User | null> {
        const conn = await Client.connect()
        const sql = 'SELECT password_digest FROM users WHERE email=($1)'
    
        const result = await conn.query(sql, [email])
    
        console.log(password+pepper)
    
        if(result.rows.length) {
    
          const user = result.rows[0]
    
          console.log(user)
    
          if (bcrypt.compareSync(password+pepper, user.password_digest)) {
            return user
          }
        }

        
    
        return null
      }
}