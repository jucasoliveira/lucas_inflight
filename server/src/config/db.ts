/* eslint-disable no-console */

import mongoose, { ConnectionOptions, connect, Mongoose } from 'mongoose';

const connectDB = async () => {
  try {
    const mongoURI: string = 'mongodb://mongo:27017/inflight?retryWrites=true&w=majority&ssl=false';
    const options: ConnectionOptions = {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    };
    await connect(mongoURI, options);
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    // Exit process with failure
    // process.exit(1);
  }
};

export default connectDB;
