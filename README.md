# Storefront Backend Project
Build a JavaScript backend API in Nodejs for an online store. It exposes a RESTful API that will be used by the frontend developer on the frontend, also have written test, secured user information with encryption, and provide tokens for integration into the frontend. 

## Installation Instructions
To install devDependencies & dependencies
 type => npm i

 ## .env 
    POSTGRES_HOST=127.0.0.1
    POSTGRES_DB=store
    POSTGRES_DB_TEST=store_test
    DB_PORT = 5432
    POSTGRES_USER=postgres
    POSTGRES_PASSWORD=1234
    ENV=dev
    BCRYPT_PASSWORD=your-secret-password
    SALT_ROUNDS=10
    TOKEN_SECRET=zamalek2022

## Authentication

Authorization Bearer token

## jasmine and testing 
    use - npm run tests -
## Starting the Server

    use - npm run watch -

## Database and Migrations
the Database used in the project was Postgres database
### to install database packages by yourself 
#### npm i pg
#### npm i db-migrate db-migrate-pg 
### connecting to the database using sql shell (psql) and log by default user 
(psql -U postgres)
### And running on Port 
5432
### or creat a new user by typing  
CREATE USER first_user WITH PASSWORD '1234';
### create dev & test database = > 
    CREATE DATABASE store;
    CREATE DATABASE store_test;
### finally run 
(db:migarte up) 


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


## Database config 
    {
    "dev": {
      "driver": "pg",
      "host": "127.0.0.1",
      "database":"store",
      "user": "postgres",
      "port": "5432",
      "password": "1234"
    },
    "test": {
        "driver": "pg",
        "host": "127.0.0.1",
        "database":"store_test",
        "user": "postgres",
        "port": "5432",
        "password": "1234"
    },
    "create": {
      "driver": "pg",
      "host": "127.0.0.1",
      "user": "postgres",
      "port": "5432",
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


