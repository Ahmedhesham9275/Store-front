import { ProductStore } from "../../models/products";

    const store = new ProductStore();

describe ('testing product model', ()=>{
    it ('test create to be defined', ()=>{
        expect(store.create).toBeDefined();
    });

    it('create method should add a product', async () => {
        const result = await store.create({
            name: "Salts",
            price: 50
        });
        expect(result.name).toBe('Salts');
      });

      it('index method should return a list of products', async () => {
        const result = await store.index();
        expect(result).toEqual([{
            "id":1,
            name: "pasta",
            price: 22
        },
        {
          "id":2,
          name: "Salts",
          price: 50
      }
      ]);
      });

      it('show method should return a product with given id', async () => {
        
        const result = await store.show("1");
        expect(result).toEqual({
            id : 1,
            name: "pasta",
            price: 22
        });
      });

})