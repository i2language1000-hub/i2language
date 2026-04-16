import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { ContentItem } from '../models/ContentItem.js';

const router = Router();
const allowedTypes = new Set(['vouchers', 'blogs', 'advertisements']);

function verifyAdmin(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];
  try {
    jwt.verify(token, process.env.JWT_SECRET || 'super_secret_i2_language_key_2026');
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Invalid token' });
  }
}

router.get('/', async (req, res) => {
  const type = req.query.type;
  if (!allowedTypes.has(type)) {
    return res.status(400).json({ success: false, message: 'Invalid content type.' });
  }
  const items = await ContentItem.find({ type }).sort({ createdAt: -1 });
  res.json({ success: true, data: items });
});

router.post('/', verifyAdmin, async (req, res) => {
  const payload = req.body || {};
  const type = payload.type;
  
  if (!allowedTypes.has(type)) {
    return res.status(400).json({ success: false, message: 'Invalid content type.' });
  }

  if (!payload.title) {
    return res.status(400).json({
      success: false,
      message: 'Title is required.'
    });
  }

  const item = await ContentItem.create({
    ...payload,
    type
  });

  return res.status(201).json({
    success: true,
    data: item
  });
});

router.delete('/:id', verifyAdmin, async (req, res) => {
  await ContentItem.deleteOne({ _id: req.params.id });
  res.json({ success: true });
});

export default router;
