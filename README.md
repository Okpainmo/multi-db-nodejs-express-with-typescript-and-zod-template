# multi-db-nodejs-express-with-typescript-and-zod-template.

This beautiful template, is a highly flexible and domain-driven-development(DDD)-inspired NodeJs/Express(with Typescript) template. 

> In a way, it honestly feels like a crime to me, for anyone to still go about building systems with vanilla Javascript. This template is **fully typed 💪**.

It is set up to utilize Zod for data validation, and to support multiple-database types(MongoDB and PostgreSQL - for now). 

**To provide usage guidance, the project will contain build samples/demonstrations of how to use both databases. This README file, will also contain instructions, on how to fully unplug any of the database setups that you do not wish to use.** 

**Also, To fully ensure separation of concerns, MongoDB will use Mongoose as ODM, while PostgreSQL will use Prisma as ORM**

I created this with so much love for myself, and engineering teams I lead/work on. Enough of bootstrapping a project from scratch whenever I need to set up one.

> Package manager is good ole **`NPM`**.

## How To Use.

1. Using this template is simple. The main criteria being that you know how to use typescript, and that you have Docker installed on your machine.

2. Proceed to install all dependencies and dev-dependencies.

with current project versions:

```bash

npm install 
```

or, with new version installations(ensure to delete `package.json` and `package-lock.json` first):

```bash
# dependencies
npm install axios bcryptjs cookie-parser cors dayjs dotenv express mongoose nodemailer pino zod @prisma/client

# dev-dependencies
npm install @types/cookie-parser @types/cors @types/express @types/node @types/nodemailer @typescript-eslint/parser prisma eslint eslint-config-prettier eslint-plugin-prettier lint-staged pino-pretty prettier ts-node tsx typescript --save-dev
```

2. Pull in the mongodb and postgresql docker images

```bash
docker pull mongodb/mongodb-community-server # mongodb
```

```bash
docker pull postgres # postgres
```

3. Start all your databases and the app/project server with Docker.

**Option 1: start them individually**.

```bash
# mongodb
docker run --name mongodb -p 27017:27017 -d mongodb/mongodb-community-server:latest

# then, the postgresql db - postgres/prisma setup is still in progress...

# docker run -d --name postgres_db -p 5432:5432 -e POSTGRES_USER=user-name -e POSTGRES_PASSWORD=password -e POSTGRES_DB=multi_db_nodejs_template_postgres_db_dev postgres 


# and then, your nodejs application

npm run dev
```

**Option 2: start them all at once with Docker compose**.


```bash 
# docker compose setup in progress...
```

## How To Select Your Preferred Database, and Fully Unplug the other.

...in progress.

## Prisma-specific Guides.

...in progress.

## Writing Tests.

...in progress.
