import supertest from 'supertest';
import app from '../app';
import { testUser } from '../middleware/testing-utilis';
import { truncDb } from '../middleware/resetdb';

const request = supertest(app);

describe('testing order store', () => {

  beforeEach(async () => {
    await truncDb();
  });
  
  afterEach(async () => {
    await truncDb();
  });

  it('create method should add an order', async () => {

    const token: string = await testUser() as unknown as string;
    const newOrder = {
      status: "active",
      user_id: "1"
    }
    const result = await request.post("/orders").set({ Authorization: 'Bearer ' + token })
      .send(newOrder)
    expect(result.statusCode).toEqual(200);
    expect(result.body.status).toBe('active');
    expect(result.body.user_id).toBe('1');
  });
})

it('index method should return a list of orders', async () => {

  const token: string = await testUser() as unknown as string;
  const result = await request.get("/orders")
    .set({ Authorization: 'Bearer ' + token })
  expect(result.statusCode).toEqual(200);

});

it('show method should return a current order with given id', async () => {

  await truncDb();
  const token: string = await testUser() as unknown as string;
  const result = await request.get("/orders/1").set({ Authorization: 'Bearer ' + token })
  expect(result.statusCode).toEqual(200);
});


it('Destroy method should remove a order with given id', async () => {
  await truncDb();
  const removeOrder = {
    id : "1"
  }
  const token: string = await testUser() as unknown as string;
  const result = await request.delete("/orders/")
    .set({ Authorization: 'Bearer ' + token })
    .send(removeOrder)
  expect(result.statusCode).toEqual(200);

});


it('add method should add a product with given id to given order', async () => {
  //reset tables
  await truncDb();
  //create user 
  const token: string = await testUser() as unknown as string;
  const newOrder = {
    status: "active",
    user_id: "1"
  }

  
  //create order
  const order = await request.post("/orders").set({ Authorization: 'Bearer ' + token })
    .send(newOrder)
  //add add a product to created user U created order
  const Order_products = {
    quantity: 2,
    order_id: "1",
    product_id: "1"
  }
  const result = await request.post("/orders/1/products").set({ Authorization: 'Bearer ' + token })
    .send(Order_products)
  expect(result.statusCode).toEqual(200);
  expect(result.body.quantity).toEqual(2);

});
