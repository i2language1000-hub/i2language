import dotenv from 'dotenv';
import { createApp } from './app.js';
import { connectDb } from './db/connect.js';

dotenv.config();

const app = createApp();
const port = Number(process.env.PORT || 8080);

connectDb()
  .then(() => {
    app.listen(port, () => {
      console.log(`i2 Language API listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1);
  });
