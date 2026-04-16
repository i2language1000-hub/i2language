import { Router } from 'express';
import { blogs, testimonials } from '../data/mockData.js';

const router = Router();

router.get('/health', (_req, res) => {
  res.json({
    success: true,
    service: 'i2-language-api',
    timestamp: new Date().toISOString()
  });
});

router.get('/testimonials', (_req, res) => {
  res.json({ success: true, data: testimonials });
});

router.get('/blogs', (_req, res) => {
  res.json({ success: true, data: blogs });
});

router.get('/config', (_req, res) => {
  res.json({
    success: true,
    data: {
      whatsappNumber: '+919876543210',
      supportEmail: 'hello@i2language.com',
      officePhone: '+919876543210'
    }
  });
});

export default router;
