import { truncDb } from "../../middleware/resetdb";
import { UserStore } from "../../models/user";
import { testUser } from '../../middleware/testing-utilis';


    const store = new UserStore();

describe ('testing user model', ()=>{
    it ('test create to be defined', ()=>{
        expect(store.create).toBeDefined();
    });

    beforeAll(async () => {
      await truncDb();
    });

    it('create method should add a user', async () => {
        const result = await store.create({
            firstname : "anas",
            lastname : "hesham",
            email: "anas@gmail.com",
            password_digest: "test1234"
        });
        expect(result.firstname).toBe('anas');
      });

      it('index method should return a list of users', async () => {
        const result = await store.index();
        expect(result[0].id).toEqual(1);
        expect(result[0].firstname).toEqual('anas');
        expect(result[0].lastname).toEqual('hesham');
        expect(result[0].email).toEqual('anas@gmail.com');
        expect(result[0].password_digest).not.toEqual('test1234');
      });

      it('show method should return a user with given id', async () => {
        
        const result = await store.show("1");
        expect(result.id).toEqual(1);
        expect(result.firstname).toEqual('anas');
        expect(result.lastname).toEqual('hesham');
        expect(result.email).toEqual('anas@gmail.com');
        expect(result.password_digest).not.toEqual('test1234');
      });
      it('delete method should delete a user with given id', async () => {
        
        const result = await store.delete("1");
       expect(result).toBeUndefined()
      });


})