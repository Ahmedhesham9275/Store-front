import request from 'supertest';
import app from '../app';


export const testUser = async () => {
    const user = {
      firstname : "anas",
      lastname : "hesham",
      email: "anas@gmail.com",
      password_digest: "test1234"
    }
    const response = await request(app).post('/users').send(user);
    const token = response.body;
    return token;
  };