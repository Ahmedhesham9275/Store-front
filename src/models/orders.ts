import  Client  from "../database";


export type Order = {
    id?: number;
    status: string;
    user_id: string;
      
}
export type order_products = {
  id? : number,
  quantity: number, 
  order_id: string, 
  product_id: string
    
}

export class OrderStore {

    async index() : Promise<Order[]> {
        try {
            const conn = await Client.connect();
            const sql = 'SELECT * FROM orders';
            const result = await conn.query(sql);
            conn.release();
            return result.rows

        } 
        catch (error) {
            throw new Error (`Somthing went wrong , please try again later ${error}`);
            
        }
    }

    async create(O: Order): Promise<Order> {
        try {
      
      const conn = await Client.connect();
      
      const sql = 'INSERT INTO orders (status, user_id) VALUES($1, $2) RETURNING *';
      
      const result = await conn.query(sql, [O.status, O.user_id]);
  
      conn.release();

      const order:Order = result.rows[0];

      return order
        } catch (err) {
            throw new Error(`Could not add new order  Error: ${err}`)
        }

    }

    async show(id: string): Promise<Order> {
        try {
        const sql = 'SELECT * FROM orders WHERE id=($1)'
        // @ts-ignore
        const conn = await Client.connect()
    
        const result = await conn.query(sql, [id])
    
        conn.release()
    
        return result.rows[0]
        } catch (err) {
            throw new Error(`Could not find order ${id}. Error: ${err}`)
        }
      }

      async delete(id: string): Promise<Order> {
        try {
      const sql = 'DELETE FROM orders WHERE id=($1)'
      // @ts-ignore
      const conn = await Client.connect()
  
      const result = await conn.query(sql, [id])
  
      const book = result.rows[0]
  
      conn.release()
  
      return book
        } catch (err) {
            throw new Error(`Could not delete order ${id}. Error: ${err}`)
        }
    }

    async addProduct(quantity: number, order_id: string, product_id: string): Promise<order_products> {
        // get order to see if it is open
       /* try {
          const ordersql = 'SELECT * FROM orders WHERE id=($1)'

          const conn = await Client.connect()
    
          const result = await conn.query(ordersql, [orderId])
    
          const order = result.rows[0]
    
          if (order.status !== "active") {
            throw new Error(`Could not add product ${productId} to order ${orderId} because order status is ${order.status}`)
          }
    
          conn.release()
        } catch (err) {
          throw new Error(`${err}`)
        }
    */
        try {
          const sql = 'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *'

          const conn = await Client.connect()
    
          const result = await conn.query(sql, [quantity, order_id, product_id])
    
          const order = result.rows[0]
    
          conn.release()
    
          return order
        } catch (err) {
          throw new Error(`Could not add product ${product_id} to order ${order_id}: ${err}`)
        }
      }

}