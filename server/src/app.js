import cors from 'cors';
import express from 'express';
import adminContentRoutes from './routes/adminContent.js';
import contentRoutes from './routes/content.js';
import enquiryRoutes from './routes/enquiries.js';
import leadRoutes from './routes/leads.js';
import authRoutes from './routes/auth.js';
export function createApp() {
  const app = express();

  app.use(
    cors({
      origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173'
    })
  );
  app.use(express.json({ limit: '12mb' }));

  app.get('/', (_req, res) => {
    res.json({
      success: true,
      message: 'i2 Language API is running.'
    });
  });

  app.use('/api', contentRoutes);
  app.use('/api/auth', authRoutes);
  app.use('/api/content', adminContentRoutes);
  app.use('/api/enquiries', enquiryRoutes);
  app.use('/api/leads', leadRoutes);

  return app;
}
