# YAQBOT-API

Node JS/Typescript application

# Description

API for manage user and plants watering for YAQBOT web application

# Requirements

- Node 20 or latest
- Postgres
- Bcrypt
- Express
- JWT
- Jest

# Installation

Run the following commands to setup your environment:

```bash
   npm init -y
```

Run the following to install Project Dependencies

```bash
    npm install express dotenv cors jsonwebtoken bcrypt jest ts-jest ts-node
    npm install --save-dev typescript @types/express @types/node @types/cors nodemon   @types/jsonwebtoken @types/bcrypt @types/jest supertest @types/supertest
```

Run the following to generate tsconfig.json

```bash
    npx tsc --init
```

Run the following to install PostgreSQL client for Node.js and types for Typescript

```bash
    npm install pg @types/pg
```

Run the following to install Zod

```bash
    npm install zod
```

Run the following to install swagger

```bash
    npm install swagger-jsdoc swagger-ui-express
    npm install @types/swagger-ui-express @types/swagger-jsdoc --save-dev
```

Run the following to install prisma and setup your prisma project

```bash
    npm install @prisma/client prisma
    npx prisma init
```

Run the following to create/update Prisma migrations

```bash
    npx prisma migrate dev --name init_db
```
