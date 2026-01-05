import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Verify connection
transporter.verify((error, success) => {
  if (error) {
    console.error('❌ Email Config Error:', error);
  } else {
    console.log('✅ Email Server Ready');
  }
});
