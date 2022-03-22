import supertest from 'supertest';
import app from '../app';
import { testUser } from '../middleware/testing-utilis';
import { truncDb } from '../middleware/resetdb';

const request = supertest(app);

describe('testing product store', () => {
    beforeEach(async () => {
        await truncDb();
    });


    it('create method should add a product', async () => {
        const newProd = {
            name: "Salts",
            price: 50
        }
        const token: string = await testUser() as unknown as string;
        const result = await request.post("/products").set({ Authorization: 'Bearer ' + token })
            .send(newProd)
        expect(result.statusCode).toEqual(200);
        expect(result.body.name).toBe('Salts');
    });

    it('index method should return a list of products', async () => {
        const result = await request.get("/products")
        expect(result.statusCode).toEqual(200);
    });


    it('show method should return a product with given id', async () => {
        const result = await request.get("/products/1")
        expect(result.statusCode).toEqual(200);
    });

    it('Destroy method should remove a product with given id', async () => {
        const removeProduct = {
          id : "1"
        }
        const token: string = await testUser() as unknown as string;
        const result = await request.delete("/products/")
          .set({ Authorization: 'Bearer ' + token })
          .send(removeProduct)
        expect(result.statusCode).toEqual(200);
    
      });

})
