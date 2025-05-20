// dependency imports
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import log from './utils/logger.js';
import { URL } from 'url';
// DB imports
import connectMongoDb from './db/connect-mongodb.js';
import connectPostgres from './db/connect-postgres.js';
// routes imports
import userRouter from './domains/user/router/user.router.js';
import authRouter from './domains/auth/router/auth.router.js';
import adminRouter from './domains/admin/router/admin.router.js';
// dependency inits
const app = express();
dotenv.config();
const allowedOrigins = process.env.NODE_ENV === 'production' ? ['https://mydomain.com'] : ['http://localhost:3000', 'http://localhost:5173', 'http://127.0.0.1:5173'];
app.use(cors({
    credentials: true,
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin)
            return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'email']
}));
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
app.get('/', (_req, res) => {
    res.status(200).send({
        responseMessage: 'Welcome to the Multi DB Node/Express... server',
        response: {
            apiStatus: 'OK - Server is live'
        }
    });
});
// user end-points - all routed
app.use(`/api/v1/user`, userRouter);
app.use(`/api/v1/auth`, authRouter);
app.use(`/api/v1/admin`, adminRouter);
const port = process.env.PORT || 5000;
const start = async () => {
    const mongoDb_URI = process.env.MONGO_DB_URI;
    try {
        log.info(`Establishing database connection...`);
        const mongoDbConnection = await connectMongoDb(mongoDb_URI);
        if (mongoDbConnection) {
            log.info(`...................................\nConnected to: ${mongoDbConnection?.connection.host}\nEnvironment: ${process.env.NODE_ENV}
      \nMongoDB connected successfully \n........................................................`);
        }
        await connectPostgres();
        const parsedUrl = new URL(process.env.POSTGRES_DATABASE_URL);
        log.info(`...................................\nConnected to: ${parsedUrl.hostname}\nEnvironment: ${process.env.NODE_ENV}
        \nPostgreSQL connected successfully \n........................................................`);
        // console.log(process.env.JWT_SECRET);
        app.listen(port, () => log.info(`Server is listening on port ${port}...`));
    }
    catch (error) {
        if (error instanceof Error) {
            log.error(error.message);
        }
    }
};
start();
