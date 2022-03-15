import  Client  from "../database";

export const truncDb = async () : Promise <void> => {

    try {
        const conn = await Client.connect();
        const sql = 'TRUNCATE TABLE orders, users, products, order_products RESTART IDENTITY;';
         await conn.query(sql);
        conn.release();
        
    } catch (error) {
        throw new Error (`couldnot resete tables ${error}`)
    }

};