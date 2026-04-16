import { Router } from 'express';

const router = Router();

router.post('/', async (req, res) => {
  const payload = req.body || {};

  if (!payload.name || !payload.phone) {
    return res.status(400).json({
      success: false,
      message: 'Name and phone are required.'
    });
  }

  return res.status(201).json({
    success: true,
    message: 'Lead captured successfully.',
    data: {
      id: Date.now(),
      source: payload.source || 'website',
      ...payload
    }
  });
});

export default router;
