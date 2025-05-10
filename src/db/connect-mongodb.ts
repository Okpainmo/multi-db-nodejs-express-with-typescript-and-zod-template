import mongoose from 'mongoose';

// mongoDb_URI = mongodb://localhost:27017/db_mongo

const connectMongoDb = (mongoDb_URI: string | undefined): void | Promise<typeof mongoose> => {
  if (mongoDb_URI === undefined) {
    console.log('ERROR: DB URI error - DB URI is undefined');
  } else {
    mongoose.set('strictQuery', false);
    return mongoose.connect(mongoDb_URI);
  }
};

export default connectMongoDb;
