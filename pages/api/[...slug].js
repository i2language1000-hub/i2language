
import { createApp } from '../../server/src/app.js';
import { connectDb } from '../../server/src/db/connect.js';

let isConnected = false;
const app = createApp();

export const config = { api: { bodyParser: false, externalResolver: true } };

export default async function handler(req, res) {
  if (!isConnected) {
    await connectDb();
    isConnected = true;
  }
  return app(req, res);
}
