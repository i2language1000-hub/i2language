import { Router } from 'express';
import nodemailer from 'nodemailer';

const router = Router();

function createTransporter() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    return null;
  }

  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: Number(SMTP_PORT) === 465,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS
    }
  });
}

router.post('/', async (req, res) => {
  const {
    name,
    phone,
    email = '',
    targetExam = '',
    preferredBatch = '',
    message = '',
    source = 'website'
  } = req.body || {};

  if (!name || !phone) {
    return res.status(400).json({
      success: false,
      message: 'Name and phone are required.'
    });
  }

  const transporter = createTransporter();

  if (!transporter) {
    return res.status(500).json({
      success: false,
      message: 'Email service is not configured yet. Add SMTP credentials on the server.'
    });
  }

  const recipient = process.env.ENQUIRY_RECIPIENT || 'i2language20@gmail.com';
  const from = process.env.FROM_EMAIL || process.env.SMTP_USER;

  const html = `
    <h2>New Website Enquiry</h2>
    <p><strong>Source:</strong> ${source}</p>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Phone:</strong> ${phone}</p>
    <p><strong>Email:</strong> ${email || 'Not provided'}</p>
    <p><strong>Target Exam:</strong> ${targetExam || 'Not provided'}</p>
    <p><strong>Preferred Batch:</strong> ${preferredBatch || 'Not provided'}</p>
    <p><strong>Message:</strong> ${message || 'Not provided'}</p>
  `;

  try {
    await transporter.sendMail({
      from,
      to: recipient,
      replyTo: email || from,
      subject: `New i2 Language enquiry from ${source}`,
      html,
      text: [
        `Source: ${source}`,
        `Name: ${name}`,
        `Phone: ${phone}`,
        `Email: ${email || 'Not provided'}`,
        `Target Exam: ${targetExam || 'Not provided'}`,
        `Preferred Batch: ${preferredBatch || 'Not provided'}`,
        `Message: ${message || 'Not provided'}`
      ].join('\n')
    });

    return res.status(201).json({
      success: true,
      message: 'Enquiry sent successfully.'
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to send enquiry email.',
      error: error.message
    });
  }
});

export default router;
