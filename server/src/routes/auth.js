import { Router } from 'express';
import jwt from 'jsonwebtoken';

const router = Router();

router.post('/login', (req, res) => {
  const { password } = req.body;
  const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@123';

  if (password === adminPassword) {
    const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET || 'super_secret', {
      expiresIn: '24h'
    });

    return res.json({
      success: true,
      token
    });
  }

  return res.status(401).json({
    success: false,
    message: 'Invalid password'
  });
});

export default router;
