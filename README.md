# Storefront Backend Project

## Dependencies  Instructions
To install devDependencies & dependencies
 type => npm i
## Scripts of project

    "build": "npx tsc",
    "jasmine": "jasmine",
    "test": "npm run build && npm run jasmine",
    "migrate-up": "db-migrate -e test up",
    "delete-testDB": "db-migrate db:drop store_test",
    "tests": "SET ENV=test && npm run delete-testDB && db-migrate -e create db:create store_test && npm run migrate-up && npm run test && db-migrate db:drop test",
    "watch": "tsc-watch --esModuleInterop src/server.ts --outDir ./build --onSuccess \"node ./build/server.js\""

## Endpoints
    http://localhost:3000

### products Endpoints
     Post [/products]
     Get  [/products]
     Get  [/products/:id]
     Delete [/products]


### Users Endpoints
     Post [/users]
     Get  [/users]
     Get  [/users/:id]
     Delete [/users]


### Orders Endpoints
     Post [/orders]
     Get  [/orders]
     Get  [/users/:id]
     Post [/orders/:id/products]


## .env 
    POSTGRES_HOST=127.0.0.1
    POSTGRES_DB=store
    POSTGRES_DB_TEST=store_test
    POSTGRES_USER=postgres
    POSTGRES_PASSWORD=1234
    ENV=dev
    BCRYPT_PASSWORD=your-secret-password
    SALT_ROUNDS=10
    TOKEN_SECRET=zamalek2022

## Database config 
    {
    "dev": {
      "driver": "pg",
      "host": "127.0.0.1",
      "database":"store",
      "user": "postgres",
      "password": "1234"
    },
    "test": {
        "driver": "pg",
        "host": "127.0.0.1",
        "database":"store_test",
        "user": "postgres",
        "password": "1234"
    },
    "create": {
      "driver": "pg",
      "host": "127.0.0.1",
      "user": "postgres",
      "password": "1234"
    }
  }

## Database schema 
```
TABLE users (
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_digest VARCHAR
)
```
```  
TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(64) NOT NULL,
    price integer NOT NULL
)
```
```
TABLE orders (
    id SERIAL PRIMARY KEY,
    status VARCHAR(15),
    user_id bigint REFERENCES users(id)
)
```
```   
TABLE order_products (
    id SERIAL PRIMARY KEY,
    quantity integer,
    order_id bigint REFERENCES orders(id),
    product_id bigint REFERENCES products(id)
)
```

## Authentication

Authorization   Bearer token

## jasmine and testing 
    use - npm run tests -

