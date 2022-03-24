import supertest from 'supertest';
import app from '../../app';
import { User, UserStore } from "../../models/user";
import { testUser } from '../../middleware/testing-utilis';
import { truncDb } from '../../middleware/resetdb';

const request = supertest(app);


describe('testing user store', () => {

  beforeEach(async () => {
    await truncDb();
  });

  it('create method should add a user', async () => {
    const newUser = {
      firstname: "Ahmed",
      lastname: "hesham",
      email: "ahmed@gmail.com",
      password_digest: "test1234"
    }
    const result = await request.post("/users")
      .send(newUser);
    expect(result.statusCode).toEqual(200);
  });

  it('index method should return a list of users', async () => {
    ;
    const token: string = await testUser() as unknown as string;
    const result = await request.get("/users")
      .set({ Authorization: 'Bearer ' + token })
    expect(result.statusCode).toEqual(200);
  });

  it('show method should return a user with given id', async () => {
    const token: string = await testUser() as unknown as string;
    const result = await request.get("/users/1")
      .set({ Authorization: 'Bearer ' + token })
    expect(result.statusCode).toEqual(200);

  });

  it('Destroy method should remove a user with given id', async () => {
    const removeUser = {
      id : "1"
    }
    const token: string = await testUser() as unknown as string;
    const result = await request.delete("/users/")
      .set({ Authorization: 'Bearer ' + token })
      .send(removeUser)
    expect(result.statusCode).toEqual(200);

  });


})