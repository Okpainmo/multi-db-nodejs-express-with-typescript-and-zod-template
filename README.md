# multi-db-nodejs-express-with-typescript-and-zod-template.

This beautiful template, is a highly flexible and domain-driven-development(DDD)-inspired NodeJs/Express(with Typescript) template. 

> In a way, it honestly feels like a crime to me, for anyone to still go about building systems with vanilla Javascript. This template is **fully typed 💪**.

> It is set up to utilize Zod for data validation, and to support multiple-database types(MongoDB and PostgreSQL - for now). 

**To provide usage guidance, the project will contain build samples/demonstrations of how to use both databases. This README file, will also contain instructions, on how to fully unplug any of the database setups that you do not wish to use.** 

**Also, To fully ensure separation of concerns, MongoDB will use Mongoose as ODM, while PostgreSQL will use Prisma as ORM**

I created this with so much love(❤️) for myself, and engineering teams I lead/work on. Enough of bootstrapping a project from scratch whenever I need to set up one.

> Package manager is good ole **`NPM`**.

## Working Environment Support.

> As per working environments, the template supports 3 different environments(development/dev, staging, and production/prod).
> 
> **This gives you the massive flexibility of being able to test any of the working environments locally with so much ease.**
>
> **Switching to a different environment is easy: **simply head to the CORE environment file(`.env`), and select your preferred environment by uncommenting it and commenting the others. Once that is done, the project should automatically switch to the selected environment**.

I.e.

```bash
# ...code before

# =========================================================================================================
# The template comes with 4 '.env' files. The main one(`.env) is a core/central environment selection file. All 
# it does is to help you select your preferred working environment from one of 'development', 'staging', and 'production'.
#
# All the others are for the three main environments(development, staging, and production) that is assumed you'll 
# be working from. This gives you the flexibility to test any of the environments locally with much ease.
# 
# Simply un-comment the line for your preferred working/testing environment, and you'll be right on it.
#
# The project has been pre-configured(see `src -> app.ts`) to select one from the 3 .env files based on the
# environment you un-comment below. By default, the 'development' environment is un-commented/selected.
#
# BELOW: UN-COMMENT YOUR PREFERRED ENVIRONMENT, AND THE PROJECT WILL SELECT/USE THE CORRESPONDING .env FILE
# ==========================================================================================================

NODE_ENV="development"
# NODE_ENV="production"
# NODE_ENV="staging"

# ...code after
```

**Even though this might not be necessary, I guess it would be a good idea to restart the server anytime you switch working environments**.

### Environment Variables

> The project has 4(four) environmental variable files(which are all intentionally un-ignored), to help you easily understand how the template's environmental variables setup works. **Endeavour to git-ignore them immediately you start a project**.
>
> 1. `.env` - the CORE/CENTRAL environment variable file that helps with selecting your preferred working environment.
> 2. `.env.development` - environmental variables file for the dev/development environment.
> 3. `.env.staging` - environmental variables file for the staging environment.
> 4. `.env.production` - environmental variables file for the prod/production environment.

## How To Use.

1a. Using this template is simple. The main criteria being that you know how to use typescript, and that you have Docker installed on your machine.

1b. Create a project repository(using this as a template), and settle in to start working.

```bash
git clone your-project-url

cd your-project-name
```

2. Proceed to install all dependencies and dev-dependencies.

**with current project versions**:

```bash

npm install 
```

**or, with new version installations(ensure to delete the `package.json` and `package-lock.json` files first)**:

```bash
# dependencies
npm install axios bcryptjs cookie-parser cors dayjs dotenv express mongoose nodemailer pino zod @prisma/client

# dev-dependencies
npm install @types/cookie-parser @types/cors @types/express @types/node @types/nodemailer @typescript-eslint/parser prisma eslint eslint-config-prettier eslint-plugin-prettier lint-staged pino-pretty prettier ts-node tsx typescript dotenv-cli --save-dev
```

2. Pull in the mongodb and postgresql docker images

```bash
docker pull mongodb/mongodb-community-server # mongodb
```

```bash
docker pull postgres # postgres
```

3. Setup and start the databases.

**Option 1a: start them individually(PostgreSQL)**.

```bash
# update the start command to suit your setup, and start databases for all the 3 environments using docker.

docker run -d --name container-name -p 543x:5432 -e POSTGRES_USER=your-user-name -e POSTGRES_PASSWORD=your-password -e POSTGRES_DB=database-name postgres
```
E.g. 

```bash
# for dev:

docker run -d --name multi_db_nodejs_express_with_typescript_template__postgres_dev -p 5433:5432 -e POSTGRES_USER=your-user-name -e POSTGRES_PASSWORD=your-password -e POSTGRES_DB=multi_db_nodejs_express_with_typescript_template__db_dev postgres
```

```bash
# for staging:

docker run -d --name multi_db_nodejs_express_with_typescript_template__postgres_staging -p 5434:5432 -e POSTGRES_USER=your-user-name -e POSTGRES_PASSWORD=your-password -e POSTGRES_DB=multi_db_nodejs_express_with_typescript_template__db_staging postgres
```

```bash
# for prod:

docker run -d --name multi_db_nodejs_express_with_typescript_template__postgres_prod -p 5435:5432 -e POSTGRES_USER=your-user-name -e POSTGRES_PASSWORD=your-password -e POSTGRES_DB=multi_db_nodejs_express_with_typescript_template__db_prod postgres
```

**Option 1b: start them individually(MongoDB)**.

```bash
# update the start command to suit your setup, and start databases for all the 3 environments using docker.

docker run --name container-name -p 2701x:27017 -d mongodb/mongodb-community-server:latest
```
E.g. 

```bash
# for dev:

docker run --name multi_db_nodejs_express_with_typescript_template__mongo_dev -p 2701x:27017 -d mongodb/mongodb-community-server:latest
```

```bash
# for staging:

docker run --name multi_db_nodejs_express_with_typescript_template__mongo_staging -p 2701x:27017 -d mongodb/mongodb-community-server:latest
```

```bash
# for prod:

docker run --name multi_db_nodejs_express_with_typescript_template__mongo_prod -p 2701x:27017 -d mongodb/mongodb-community-server:latest
```

> P.S: starting docker postgres and mongodb instances for `staging` and `prod` may not be necessary since you would want to use real(remotely provisioned) databases for those.

**Option 2: update the `docker-compose.yaml` file on the project's root - using either `docker-compose.postgres.template.yaml` or `docker-compose.mongo.template.yaml` as a guide(depending on the database type you wish to use). Then start all the databases at once**.

```bash
docker compose up -d
```

CONNECT YOUR DATABASES TO A POSTGRESQL GUI SOFTWARE/SERVICE - E.G PGADMIN(OR A SIMILAR E.G MONGODBCOMPASS FOR MONGODB), TO VIEW THEM.

## Prisma-specific Guides.

Normally, Prisma interacts directly(by default) with a `.env` file that should be on the project root, and would not know if to use a different(custom) environment variables file - as it actually should. Since this template maintains a decentralized/modular working environment structure. The `dotenv-cli` package(a package that should already be installed at the project setup stage if you followed the instructions properly), is used to specify which environmental variables file to use against prisma commands.

Below is a sample command for running a migration against the PostgreSQL database in Prisma dev mode.

```bash
npx dotenv -e .env.development -- npx prisma migrate dev --name init
```

## Building The Template With Docker.

...in progress.

## How To Select Your Preferred Database, and Fully Unplug the other.

...in progress.

## Enforcing Coding(Contribution) Standards/Rules.

...in progress.

## Sample End-points.

...in progress.

## File Storage.

...in progress.

## Sending Emails.

...in progress.

## Writing Tests.

...in progress.

## CI/CD Support With Jenkins.

...in progress.
