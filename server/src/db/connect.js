import mongoose from 'mongoose';

export async function connectDb() {
  if (mongoose.connection.readyState === 1) {
    return;
  }

  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error('MONGODB_URI is missing.');
  }

  await mongoose.connect(uri, {
    dbName: process.env.MONGODB_DB || 'i2language'
  });
}
