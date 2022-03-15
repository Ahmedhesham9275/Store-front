import { OrderStore } from "../orders";
import { ProductStore } from "../products";
import { UserStore } from "../user";
import { truncDb } from "../../middleware/resetdb";

const user = new UserStore();

const product = new ProductStore();

    const store = new OrderStore();

describe ('testing order store', ()=>{
    it ('test create to be defined ', ()=>{
        expect(store.create).toBeDefined();
    });


    afterAll(async () => {
      truncDb
    });
    
    it('create method should add an order', async () => {
     const u =  await user.create({
        firstname : "ahmed",
        lastname : "hesham",
        email: "ahmd@gmail.com",
        password_digest: "test1234"
      });
     const p =   await product.create({
              name: "pasta",
              price: 22
      });
        const result = await store.create({
            status: "active",
            user_id: "1"
        });
        expect(result.status).toBe('active');
      });

      it('index method should return a list of orders', async () => {
        const result = await store.index();
        expect(result).toEqual([{
            id:1,
            status: "active",
            user_id: "1"
        }]);
      });

      it('show method should return a current order with given id', async () => {
        
        const result = await store.show("1");
        expect(result).toEqual({
            id : 1,
            status: "active",
            user_id: "1"
        });
      });

      it('add method should add a product with given id to given order', async () => {
        
        const result = await store.addProduct(2,"1","1");
        expect(result).toEqual({
          id: 1,
          quantity: 2,
          order_id: "1",
          product_id: "1"
        });
      });
    

    
})