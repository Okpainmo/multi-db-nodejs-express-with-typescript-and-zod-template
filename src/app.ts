// dependency imports

import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import log from './utils/logger.js';
import { URL } from 'url';

// import express types
import type { Request, Response } from 'express';

// MongoDb import
import connectMongoDb from './db/connect-mongodb.js';
import connectPostgres from './db/connect-postgres.js';

// dependency inits
const app = express();

dotenv.config();
// app.use(cors());

app.use(
  cors({
    credentials: true,
    origin: ['https://mydomain.com', 'http://localhost:3000'],
    methods: 'GET, POST, PUT, PATCH, DELETE, OPTIONS'
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// configure .env
if (process.env.NODE_ENV === 'development') {
  dotenv.config({ path: '.env.development' });
}

if (process.env.NODE_ENV === 'staging') {
  dotenv.config({ path: '.env.staging' });
}

if (process.env.NODE_ENV === 'production') {
  dotenv.config({ path: '.env.production' });
}

// @ts-ignore
app.get('/', (req: Request, res: Response) => {
  res.status(200).send({
    // // responseMessage: 'Welcome to the Web3 Mastery API server',
    response: {
      apiStatus: 'OK - Server is live'
    }
  });
});

// user end-points - all routed
// app.use(`/api/v1/user-contact-form`, userContactFormRouter);

const port = process.env.PORT || 5000;

const start = async () => {
  const mongoDb_URI = process.env.MONGO_DB_URI;

  try {
    log.info(`Establishing database connection...`);
    const mongoDbConnection = await connectMongoDb(mongoDb_URI);
    await connectPostgres();

    mongoDbConnection &&
      log.info(
        `...................................\nConnected to: ${mongoDbConnection?.connection.host}\nEnvironment: ${process.env.NODE_ENV}
        \nMongoDB connected successfully \n........................................................`
      );

    const parsedUrl = new URL(process.env.POSTGRES_DATABASE_URL as string);

    log.info(
      `...................................\nConnected to: ${parsedUrl.hostname}\nEnvironment: ${process.env.NODE_ENV}
        \nPostgreSQL connected successfully \n........................................................`
    );

    // console.log(process.env.JWT_SECRET);
    app.listen(port, () => log.info(`Server is listening on port ${port}...`));
  } catch (error) {
    if (error instanceof Error) {
      log.error(error.message);
    }
  }
};

// serve

start();
