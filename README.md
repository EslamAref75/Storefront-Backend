## Storefront Backend Project

## Getting Started

This is a simple backend API built in Node and Express for an online store. It exposes a RESTful API that will be accessible to the frontend developer. 

The database schema and and API route information can be found in the [REQUIREMENT.md]  

## Installation
Storefront Backend requires [Node.js](https://nodejs.org/) v10+ to run.
Install the dependencies and devDependencies and start the server.

```sh
npm i
or
yarn
```
To run the server
```sh
npm run start
```

### Packages

Some of the packages that are required for the application .

#### express
`npm i -S express`
`npm i -D @types/express`

#### typescript
`npm i -D typescript`

#### db-migrate
`npm install -g db-migrate`

#### cors
`npm install --save cors`

#### bcrypt
`npm -i bcrypt`
`npm -i -D @types/bcrypt`

#### morgan 
`npm install --save morgan`
`npm -i -D @types/morgan`

#### jsonwebtoken
`npm install jsonwebtoken --sav`
`npm -i -D @types/jsonwebtoken`

#### cross-env
`npm install --save-dev cross-env`

## Set up Database
###  DB Creation 

First create the dev and test database.

- connect to the default postgres database as the root user `sudo -u postgres -i`
- In psql run the following to create a user 
    - `CREATE USER shop_user WITH PASSWORD 'password123';`
- In psql run the following to create the dev database
    - `CREATE DATABASE storefront;`
- Connect to the databases and grant all privileges
    - Grant for dev database
        - `\c storefront`
        - `GRANT ALL PRIVILEGES ON DATABASE storefront TO shop_user;`
- In psql run the following to create the test database
        - `CREATE DATABASE storefront_test;`
    - Grant for test database
        - `\c storefront_test`
        - `GRANT ALL PRIVILEGES ON DATABASE storefront_test TO shop_user;`

### DB Migrations
In terminal run the command below to migrate the database 

`npm run migrate`

## Enviromental Variables Set up
Bellow are the environmental variables that needs to be set in a `.env` file. This is the default setting that I used for development, but you can change it to what works for you. 

**NB:** The given values are used in developement and testing but not in production. 
```
POSTGRES_HOST=127.0.0.1
POSTGRES_DB=storefront
POSTGRES_USER=shop_user
POSTGRES_PASSWORD=password123
POSTGRES_TEST_DB=storefront_test
POSTGRES_PORT=5432
ENV=dev
BCRYPT_PASSWORD=new_password
SALT_ROUNDS=10
TOKEN_SECRET=poliziano#1516

```

## Start App
`npm run start`

### Running Ports 
The server will start on port `3000` 

## Endpoint Access
All endpoints are described in the [REQUIREMENT.md] file. 

## Testing
Run test with 

`npm run test`

### Environment Variables ENV file
Environment variables are set in the `.env` file.And it's provided with the names of the variables that will be passed to the env file.

