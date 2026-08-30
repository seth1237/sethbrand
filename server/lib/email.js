import nodemailer from 'nodemailer'

const createTransporter = () => {
  const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com'
  const smtpPort = parseInt(process.env.SMTP_PORT || '465')
  const smtpSecure = process.env.SMTP_SECURE ? process.env.SMTP_SECURE === 'true' : true
  const user = process.env.SMTP_USER || process.env.EMAIL_USER
  const pass = process.env.SMTP_PASSWORD || process.env.EMAIL_PASSWORD

  if (!user || !pass) {
    return nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: process.env.TEST_EMAIL_USER || 'ethereal-test@example.com',
        pass: process.env.TEST_EMAIL_PASS || 'test-password',
      },
    })
  }

  return nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpSecure,
    auth: { user, pass },
  })
}

export const sendEmail = async (emailData) => {
  try {
    const transporter = createTransporter()
    const info = await transporter.sendMail({
      from: emailData.from || `"Seth Makori" <${process.env.EMAIL_FROM || 'info@sethbrand.com'}>`,
      to: emailData.to,
      subject: emailData.subject,
      text: emailData.text,
      html: emailData.html,
      replyTo: emailData.replyTo,
      attachments: emailData.attachments,
    })

    console.log('Email sent: %s', info.messageId)
    return { success: true, info }
  } catch (error) {
    console.error('Error sending email:', error)
    return { success: false, error }
  }
}

export const processContactForm = async (data) => {
  try {
    const adminEmailData = {
      to: process.env.ADMIN_EMAIL || 'bellarinseth@gmail.com',
      from: process.env.EMAIL_FROM || 'no-reply@sethbrand.com',
      subject: `New Contact Form Submission from ${data.name}`,
      replyTo: data.email,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ''}
        ${data.company ? `<p><strong>Company:</strong> ${data.company}</p>` : ''}
        ${data.budget ? `<p><strong>Budget:</strong> ${data.budget}</p>` : ''}
        ${data.service ? `<p><strong>Service Interested In:</strong> ${data.service}</p>` : ''}
        <p><strong>Message:</strong></p>
        <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px;">
          ${data.message.replace(/\n/g, '<br>')}
        </div>
        <p style="color: #666; font-size: 12px; margin-top: 20px;">This message was sent from your website contact form.</p>
      `,
    }

    const adminResult = await sendEmail(adminEmailData)

    const userEmailData = {
      to: data.email,
      from: process.env.EMAIL_FROM || 'no-reply@sethbrand.com',
      subject: 'Thank you for contacting Seth Makori',
      html: `
        <h2>Thank you for getting in touch!</h2>
        <p>Hello ${data.name},</p>
        <p>I appreciate you contacting me. I've received your message and will get back to you as soon as possible.</p>
        <p>Here's a copy of your message:</p>
        <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 15px 0;">
          ${data.message.replace(/\n/g, '<br>')}
        </div>
        <p>If you have any additional information to provide, please feel free to reply to this email.</p>
        <p>Best regards,<br>Seth Makori</p>
        <hr>
        <p style="color: #666; font-size: 12px;">This is an automated response to your inquiry.</p>
      `,
    }

    const userResult = await sendEmail(userEmailData)

    if (adminResult.success && userResult.success) {
      return { success: true, message: 'Your message has been sent successfully!' }
    } else {
      throw new Error('Failed to send one or more emails')
    }
  } catch (error) {
    console.error('Error processing contact form:', error)
    return {
      success: false,
      message: 'There was an error sending your message. Please try again later.',
      error,
    }
  }
}
