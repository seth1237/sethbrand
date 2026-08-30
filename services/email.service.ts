import nodemailer from 'nodemailer';

export interface EmailData {
  to: string;
  from: string;
  subject: string;
  text?: string;
  html?: string;
  replyTo?: string;
  attachments?: any[];
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}

// Configure nodemailer with environment variables for secure access
const createTransporter = () => {
  // Prefer explicit SMTP_* env vars; fallback to Gmail-style creds when provided
  const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com'
  const smtpPort = parseInt(process.env.SMTP_PORT || '465')
  const smtpSecure = process.env.SMTP_SECURE ? process.env.SMTP_SECURE === 'true' : true
  const user = process.env.SMTP_USER || process.env.EMAIL_USER
  const pass = process.env.SMTP_PASSWORD || process.env.EMAIL_PASSWORD

  if (!user || !pass) {
    // Development fallback (ethereal) to avoid hard failures in dev
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

// Send email function
export const sendEmail = async (emailData: EmailData): Promise<{ success: boolean; info?: any; error?: Error }> => {
  try {
    const transporter = createTransporter();
    const info = await transporter.sendMail({
      from: emailData.from || `"Seth Makori" <${process.env.EMAIL_FROM || 'info@sethbrand.com'}>`,
      to: emailData.to,
      subject: emailData.subject,
      text: emailData.text,
      html: emailData.html,
      replyTo: emailData.replyTo,
      attachments: emailData.attachments,
    });

    console.log('Email sent: %s', info.messageId);
    return { success: true, info };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error: error as Error };
  }
};

// Process contact form submission
export const processContactForm = async (data: ContactFormData): Promise<{ success: boolean; message: string; error?: Error }> => {
  try {
    // Email to site owner
    const adminEmailData: EmailData = {
      to: process.env.ADMIN_EMAIL || 'bellarinseth@gmail.com',
      from: process.env.EMAIL_FROM || 'no-reply@sethbrand.com',
      subject: `New Contact Form Submission from ${data.name}`,
      replyTo: data.email,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ''}
        ${data.subject ? `<p><strong>Subject:</strong> ${data.subject}</p>` : ''}
        <p><strong>Message:</strong></p>
        <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px;">
          ${data.message.replace(/\n/g, '<br>')}
        </div>
        <p style="color: #666; font-size: 12px; margin-top: 20px;">This message was sent from your website contact form.</p>
      `,
    };

    // Send email to admin
    const adminResult = await sendEmail(adminEmailData);

    // Email auto-reply to the user
    const userEmailData: EmailData = {
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
    };

    // Send auto-reply to user
    const userResult = await sendEmail(userEmailData);

    if (adminResult.success && userResult.success) {
      return { success: true, message: 'Your message has been sent successfully!' };
    } else {
      throw new Error('Failed to send one or more emails');
    }
  } catch (error) {
    console.error('Error processing contact form:', error);
    return { 
      success: false, 
      message: 'There was an error sending your message. Please try again later.',
      error: error as Error
    };
  }
};