# multi-db-nodejs-express-with-typescript-and-zod-template.

This beautiful template, is a highly flexible, function-based and domain-driven-development(DDD)-inspired NodeJs/Express(with Typescript) template.

> In a way, it honestly feels like a crime to me, for anyone to still go about building systems with vanilla Javascript. This template is **fully typed 💪**.

- It is set up to utilize Zod for data validation, and to support multiple-database types(MongoDB and PostgreSQL).

- To provide usage guidance, the template contains build samples/demonstrations of how to use both databases.

- Inside, you'll find beautiful and professionally crafted implementations that reveal how to practically build and ship top-class Node/Express APIs that are fully typed.

- To fully ensure separation of concerns, MongoDB will use Mongoose as ODM, while PostgreSQL will use Prisma as ORM.

- Subsequently, this README file, will contain instructions, on how to fully unplug any of the database setups that you do not wish to use, while retaining the other.

I created this with so much love(❤️) for myself, and engineering teams I lead/work on. Enough of bootstrapping a project from scratch whenever I need to set up one.

> Package manager is good ole **`NPM`**.

## High Professional And Beautifully Implemented.

As earlier stated, the template is DDD(domain driven development)-inspired. Hence, it comes with some default - carefully thought-out domains(`auth`, `user`, and `admin`).

With these default domains, you'll get to see how sample end-points are neatly and professionally implemented, providing COMPLETE extraction of ALL DATABASE LOGIC into special database-service files. Consequently, resulting in you having the absolute flexibility to use any database of your choice, while keeping your project controllers, utility/helper functions, and other areas of your project completely un-affected or barely affected by resulting database changes.

> P.S: While the current setup for the database service files and functions helps to clearly demonstrate how to professional engineer Node/Express projects in a domain-driven fashion - with proper logic separations, the double-implementations for both MongoDB and PostgreSQL will demand that you rename the database service files and functions by removing the database-specific prefix that are added on them. Kindly pardon that inconvenience, and make the best use of how the name-separations help you grasp things a lot faster and easier.
>
> A great alternative way to handle the database logic-separation, is to copy the implementations(functions) for both databases into the same service file. All the functions should be named the same - e.g: 'findUser', then you simply comment out the one you do not intend to use. With that set-up, you'll simply be able to use the other database by uncommenting it's function/implementation whenever necessary.

## Working Environment Support.

> As per working environments, the template supports 3 different environments(development/dev, staging, and production/prod).
>
> **This gives you the massive flexibility of being able to test any of the working environments locally with so much ease.**

### Environment Variables

> The project has 4(four) environmental variable files(which are all intentionally un-ignored), to help you easily understand how the template's environmental variables setup works. **Endeavour to git-ignore them immediately you start a project**.
>
> 1. `.env` - the CORE/CENTRAL environment variable file that helps with selecting your preferred working environment.
> 2. `.env.development` - environmental variables file for the dev/development environment.
> 3. `.env.staging` - environmental variables file for the staging environment.
> 4. `.env.production` - environmental variables file for the prod/production environment.

### Switching Between Working Environments.

> Switching to a different environment is easy: **simply head to the CORE environment file(`.env`), and select your preferred environment by uncommenting it and commenting the others. Once that is done, the project should automatically switch to the selected environment**.

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

## How To Use This Template.

1a. Using this template is simple. The main criteria being that you know how to use typescript, and that you have Docker installed on your machine.

1b. Create a project repository(using this as a template), and settle in to start working.

```bash
git clone your-new-project-repo-url

cd your-project-name
```

2a. Proceed to install all dependencies and dev-dependencies.

**with current project versions**:

```bash
npm install
```

**or, with new version installations(ensure to delete the `package.json` and `package-lock.json` files first)**:

```bash
# dependencies
npm install axios bcryptjs cookie-parser cors dayjs dotenv express mongoose nodemailer pino zod @prisma/client mongodb bcrypt jsonwebtoken

# dev-dependencies
npm install @types/cookie-parser @types/cors @types/express @types/node @types/nodemailer @typescript-eslint/parser prisma eslint eslint-config-prettier eslint-plugin-prettier lint-staged pino-pretty prettier ts-node tsx typescript dotenv-cli @typescript-eslint/eslint-plugin @eslint/js husky @commitlint/cli @commitlint/config-conventional @types/bcrypt @types/jsonwebtoken --save-dev
```

2b. Update your husky pre-commit script(`.husky` > `pre-commit`) - replace the content with this.

```bash
npx lint-staged && npm run build
```

Also update the husky commit-msg(`.husky` > `commit-msg`) script with this:

```bash
npx --no -- commitlint --edit
```

> P.S: No need to worry, if the content of both files already match what you're supposed to add as instructed above. If so, simply ignore updating them.

2c. Pull in the mongodb and postgresql docker images

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

docker run --name multi_db_nodejs_express_with_typescript_template__mongo_dev -p 27017:27017 -d mongodb/mongodb-community-server:latest
```

```bash
# for staging:

docker run --name multi_db_nodejs_express_with_typescript_template__mongo_staging -p 27018:27017 -d mongodb/mongodb-community-server:latest
```

```bash
# for prod:

docker run --name multi_db_nodejs_express_with_typescript_template__mongo_prod -p 27019:27017 -d mongodb/mongodb-community-server:latest
```

> P.S: starting docker postgres and mongodb instances for `staging` and `prod` may not be necessary since you would want to use real(remotely provisioned) databases for those.

**Option 2: update the `docker-compose.yaml` file on the project's root, using either the `docker-compose.postgres.template.yaml` or the `docker-compose.mongo.template.yaml` file as a guide - depending on the database type you wish to use. Then start all the databases at once**.

```bash
docker compose up -d
```

CONNECT YOUR DATABASES TO A POSTGRESQL GUI SOFTWARE/SERVICE - E.G PGADMIN(OR A SIMILAR, E.G MONGODB COMPASS - FOR MONGODB), TO VIEW THEM.

4. Start your main app/API server.

```bash
npm run dev
```

If successfully connected, you will see a response like the one below inside your terminal.

```bash
[15:37:34.000] INFO: Establishing database connection...
[15:37:35.000] INFO: ...................................
Connected to: localhost
Environment: development

MongoDB connected successfully
........................................................
[15:37:35.000] INFO: ...................................
Connected to: localhost
Environment: development

PostgreSQL connected successfully
........................................................
[15:37:35.000] INFO: Server is listening on port 5000...
```

Your API server should start up and be accessible via port 5000 - `http://localhost:5000`. On visiting it, a Pretty-print response like the one below indicates that you're started and all good to go.

```json
{
  "responseMessage": "Welcome to the Multi DB Node/Express... server",
  "response": {
    "apiStatus": "OK - Server is live"
  }
}
```

5. Take a deep breath, reward yourself with a coffee break, and return to hack on.

## Prisma-specific Guides.

Normally, Prisma interacts directly(by default) with a `.env` file that should be on the project root, hence would not know if to use a different(custom) environment variables file - as it actually should for this template. Since this template maintains a decentralized environmental variables file structure, the `dotenv-cli` package(a package that should already be installed at the project dependencies-installation stage if you followed the instructions properly), is used to specify which environmental variables file to use against prisma commands.

Below is a sample command for running a migration against the PostgreSQL database in Prisma dev mode.

```bash
npx dotenv -e .env.development -- npx prisma migrate dev --name migration-name
```

And this for regenerating the Prisma client.

```bash
npx dotenv -e .env.development -- npx prisma generate
```

## Building The Template With Docker.

The template comes with a pre-configured `Dockerfile`, and a `.dockerignore`. With these, building it into a Docker image becomes as easy as running the command below.

```bash
docker build -t your-project-name .
```

E.g.

```bash
docker build -t multi_db_nodejs_express_with_typescript_template__docker .
```

> A great way to run the project, would be to set-up a docker-compose configuration that builds the app/server, and starts up the database(s) - all with one single command. This will provide much ease for team-mates(especially seniors and leads) who only wish to assess/test the development progress - and not to contribute.

**SEE `docker-compose.mongo.template.yaml` and `docker-compose.postgres.template.yaml` FOR HELP.**

```bash
docker compose up -d
```

Below are some sample Docker commands to manually start a container that is running the image.

**P.S: The below commands, are quite a combination. They assume that your databases are running on a docker network called - `multi-db-nodejs-express-with-typescript-and-zod-template_backend_net`. They also require an understanding of Docker networking, and what happens when you're trying to connect a stand-alone docker container to database instances that are running inside other docker containers.**.

```bash
# dev

docker run -d \
  --env-file .env.development \
  -p 5001:5000 \
  --name multi_db_nodejs_express_with_typescript_template__docker_dev \
  --network multi-db-nodejs-express-with-typescript-and-zod-template_backend_net \
  -e MONGO_DB_URI="mongodb://your-user-name:your-password@multi_db_nodejs_express_with_typescript_template__mongo_dev:27017/multi_db_nodejs_express_with_typescript_template__db_dev?authSource=admin" \
  -e POSTGRES_DATABASE_URL="postgresql://your-user-name:your-password@multi_db_nodejs_express_with_typescript_template__postgres_dev:5432/multi_db_nodejs_express_with_typescript_template__db_dev?schema=public" \
  multi_db_nodejs_express_with_typescript_template__docker
```

```bash
# staging

docker run -d \
  --env-file .env.staging \
  -p 5002:5000 \
  --name multi_db_nodejs_express_with_typescript_template__docker_staging \
  --network multi-db-nodejs-express-with-typescript-and-zod-template_backend_net \
  -e MONGO_DB_URI="mongodb://your-user-name:your-password@multi_db_nodejs_express_with_typescript_template__mongo_staging:27017/multi_db_nodejs_express_with_typescript_template__db_staging?authSource=admin" \
  -e POSTGRES_DATABASE_URL="postgresql://your-user-name:your-password@multi_db_nodejs_express_with_typescript_template__postgres_staging:5432/multi_db_nodejs_express_with_typescript_template__db_staging?schema=public" \
  multi_db_nodejs_express_with_typescript_template__docker
```

```bash
# prod

docker run -d \
  --env-file .env.production \
  -p 5003:5000 \
  --name multi_db_nodejs_express_with_typescript_template__docker_prod \
  --network multi-db-nodejs-express-with-typescript-and-zod-template_backend_net \
  -e MONGO_DB_URI="mongodb://your-user-name:your-password@multi_db_nodejs_express_with_typescript_template__mongo_prod:27017/multi_db_nodejs_express_with_typescript_template__db_prod?authSource=admin" \
  -e POSTGRES_DATABASE_URL="postgresql://your-user-name:your-password@multi_db_nodejs_express_with_typescript_template__postgres_prod:5432/multi_db_nodejs_express_with_typescript_template__db_prod?schema=public" \
  multi_db_nodejs_express_with_typescript_template__docker
```

## Enforcing Coding(Contribution) Standards/Rules.

This template is built to support the best industry standards available. Hence enforcing code quality
was a core focus.

1. For linting, **ESlint** is used. See `eslint.config.mjs` for all the ESlint configurations.

To lint your project manually, simply run the below command:

```bash
npx eslint .
```

2. For code formatting, **Prettier** was used. See `.prettierrc` and `.prettierignore`, for all the Prettier configurations.

To format your project manually, simply run the below command:

```bash
npx prettier . --write
```

3. As can be seen so far(if left that way), linting and code-formatting would be manual, hence collaborating developers can easily forget to run the necessary checks before pushing their contributions to Github.

To solve that issue and more, **Lint-staged**, **Commitlint**, and **Husky** were used.

Lint-staged with the help of Husky, enforces automatic Prettier formatting and ESlint linting respectively - **on staged files**. While Commitlint(also using Husky), helps to enforce rules on commit messages - Making sure that collaborating team members write proper commits.

To run Lint-staged manually on currently staged files, use the command below:

```bash
npx lint-staged
```

> P.S: You do not need to run the `lint-staged` command manually. If you follow all instructions, and set up the template correctly, a pre-commit task would be automatically triggered - whenever you try to make any code commit to Github, thereby - linting and formatting your code automatically, while also ensuring commit standards.
>
> All Lint-staged configurations can be found inside the `.lintstagedrc.json` file.

## Sample End-points.

As earlier stated, the project comes with 3 different domains(the `auth` domain, the `user` domain, and the `admin` domain) that help to demonstrate how to keep things modular, domain-driven, neat, and professional.

Below are the default domains and their sample end-point, which you can build on top of - if you wish.

### Default Domains And Their End-points

1. Admin:

- Endpoints:

  1. De-activate user - `/api/v1/admin/deactivate-user/:userId`

2. Auth:

- Endpoints:

  1. Log-in - `/api/v1/auth/log-in`
  2. Register - `/api/v1/auth/register`

2. User:

- Endpoints:

  1. Get user profile - `/api/v1/user/:userId`

## Want To Contribute?

This project will be a progressive one. I and any other contributor(s), will continue to add relevant updates. This makes it very important that you always share details about any contribution you wish to make - before-hand, and avoid the needless stress of proceeding to work a contribution for a topic that is already in-progress.

To contribute successfully, simply create a Github issues that mentions me, and I'll be right with you to discuss your proposed/intended contribution.

> Feel free to drop a star, fork/use, and share every contributions you possibly can.

## Wrapping up.

> Just in case this repository ever gets to save your butt at work or while learning to build production-grade Node/Express with Typescript APIs, and you wish to send an appreciation, [feel free to buy me a 'coffee'](https://paystack.com/pay/cagnddqmr2).

Cheers!!!
