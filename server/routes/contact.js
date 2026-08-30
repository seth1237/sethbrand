import express from 'express'
import { getDb } from '../lib/mongo.js'
import { processContactForm } from '../lib/email.js'

const router = express.Router()

router.post('/', async (req, res) => {
  try {
    const { name, email, phone, subject, message, website } = req.body

    // Basic anti-spam: honeypot and human-time check
    if (website && website.trim().length > 0) {
      return res.status(400).json({ success: false, error: 'Spam detected' })
    }
    // Validation for required fields
    if (!name || !email || !phone || !message) {
      return res.status(400).json({ success: false, error: 'Name, email, phone number, and message are required' })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, error: 'Please provide a valid email address' })
    }

    // Ensure there's a message
    if (typeof message !== 'string' || message.trim().length === 0) {
      return res.status(400).json({ success: false, error: 'Please include a message' })
    }
    if (subject && typeof subject === 'string' && subject.trim().length > 0 && subject.trim().length < 3) {
      return res.status(400).json({ success: false, error: 'Subject must be at least 3 characters when provided' })
    }

    // Persist to MongoDB
    try {
      const db = await getDb()
      await db.collection('leads').insertOne({
        name,
        email,
        phone,
        subject: typeof subject === 'string' ? subject.trim() : '',
        message: message.trim(),
        userAgent: req.get('user-agent') || 'unknown',
        ip: req.ip || req.get('x-forwarded-for') || 'unknown',
        createdAt: new Date(),
      })
    } catch (err) {
      console.error('Lead persistence failed:', err)
    }

    const result = await processContactForm({
      name,
      email,
      phone,
      subject: typeof subject === 'string' ? subject.trim() : '',
      message: message.trim(),
    })

    if (result.success) {
      return res.json({ success: true, message: "Your request has been received. We'll be in touch soon!" })
    } else {
      console.error('Email sending failed:', result.error)
      return res.status(500).json({
        success: false,
        message: 'There was an issue processing your request. Please try again later.',
      })
    }
  } catch (error) {
    console.error('Contact form submission error:', error)
    return res.status(500).json({ error: 'Failed to process your request. Please try again later.' })
  }
})

export default router
