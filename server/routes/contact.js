const express = require('express');
const router = express.Router();
const Joi = require('joi');
const rateLimit = require('express-rate-limit');
const nodemailer = require('nodemailer');

const gmailUser = process.env.GMAIL_USER;
const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;
const contactToEmail = process.env.CONTACT_TO_EMAIL || 'glennmarflores.dev@gmail.com';

const mailTransporter = gmailUser && gmailAppPassword
  ? nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: gmailUser,
        pass: gmailAppPassword,
      },
    })
  : null;

// Rate limit for contact form — stricter than general API
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 submissions per window
  message: { message: 'Too many contact submissions. Please try again later.' },
});

// Validation schema
const contactSchema = Joi.object({
  name: Joi.string().trim().min(2).max(100).required(),
  email: Joi.string().trim().email().max(255).required(),
  message: Joi.string().trim().min(10).max(2000).required(),
});

// POST /api/contact
router.post('/', contactLimiter, async (req, res, next) => {
  try {
    const { error, value } = contactSchema.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: error.details.map((d) => d.message),
      });
    }

    if (!mailTransporter || !contactToEmail) {
      return res.status(500).json({
        message: 'Email service is not configured on the server.',
      });
    }

    await mailTransporter.sendMail({
      from: `Portfolio Contact <${gmailUser}>`,
      to: contactToEmail,
      replyTo: value.email,
      subject: `New portfolio message from ${value.name}`,
      text: `Name: ${value.name}\nEmail: ${value.email}\n\nMessage:\n${value.message}`,
      html: `
        <h2>New portfolio message</h2>
        <p><strong>Name:</strong> ${value.name}</p>
        <p><strong>Email:</strong> ${value.email}</p>
        <p><strong>Message:</strong></p>
        <p>${value.message.replace(/\n/g, '<br>')}</p>
      `,
    });

    res.status(200).json({ message: 'Message received! I\'ll get back to you soon.' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
