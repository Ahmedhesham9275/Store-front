import  Client  from "../database";


export type Product = {
    id?: number;
    name: string;
    price: number;
    
}

export class ProductStore {

    async index() : Promise<Product[]> {
        try {
            const conn = await Client.connect();
            const sql = 'SELECT * FROM products';
            const result = await conn.query(sql);
            conn.release();
            return result.rows

        } 
        catch (error) {
            throw new Error (`Somthing went wrong , please try again later ${error}`);
            
        }
    }

    async create(p: Product): Promise<Product> {
        try {
      
      const conn = await Client.connect();
      
      const sql = 'INSERT INTO products (name, price) VALUES($1, $2) RETURNING *';
      
      const result = await conn.query(sql, [p.name, p.price]);
  
      conn.release();

      const product:Product = result.rows[0];

      return product
        } catch (err) {
            throw new Error(`Could not add new product  Error: ${err}`)
        }

    }

    async show(id: string): Promise<Product> {
        try {
        const sql = 'SELECT * FROM products WHERE id=($1)'

        const conn = await Client.connect()
    
        const result = await conn.query(sql, [id])
    
        conn.release()
    
        return result.rows[0]
        } catch (err) {
            throw new Error(`Could not find product ${id}. Error: ${err}`)
        }
      }

      async delete(id: string): Promise<Product> {
        try {
      const sql = 'DELETE FROM products WHERE id=($1)'
      
      const conn = await Client.connect()
  
      const result = await conn.query(sql, [id])
  
      const prod = result.rows[0]
  
      conn.release()
  
      return prod
        } catch (err) {
            throw new Error(`Could not delete product ${id}. Error: ${err}`)
        }
    }

} 