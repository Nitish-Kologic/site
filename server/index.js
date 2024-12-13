import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import twilio from 'twilio';
import QRCode from 'qrcode';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Email configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Twilio configuration
const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// Generate QR Code
async function generateQRCode(data) {
  try {
    return await QRCode.toDataURL(JSON.stringify(data));
  } catch (err) {
    console.error('Error generating QR code:', err);
    throw err;
  }
}

// Send confirmation email
async function sendEmail(to, bookingDetails) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: 'Flight Booking Confirmation',
    html: `
      <h1>Booking Confirmation</h1>
      <p>Dear ${bookingDetails.name},</p>
      <p>Your flight booking has been confirmed with the following details:</p>
      <ul>
        <li>Airline: ${bookingDetails.airline}</li>
        <li>Travel Date: ${bookingDetails.travelDate}</li>
        <li>Class: ${bookingDetails.flightClass}</li>
        <li>Number of Adults: ${bookingDetails.adults}</li>
      </ul>
      <p>Thank you for choosing our service!</p>
    `
  };

  return transporter.sendMail(mailOptions);
}

// Send SMS confirmation
async function sendSMS(to, bookingDetails) {
  return twilioClient.messages.create({
    body: `Your flight with ${bookingDetails.airline} on ${bookingDetails.travelDate} has been confirmed. Booking reference: ${bookingDetails.bookingId}`,
    from: process.env.TWILIO_PHONE_NUMBER,
    to
  });
}

// Payment and booking endpoints
app.post('/api/payment/initiate', async (req, res) => {
  try {
    const { paymentMethod, amount, bookingDetails } = req.body;
    
    // Generate QR code for UPI payments
    if (['paytm', 'gpay', 'phonepe'].includes(paymentMethod)) {
      const qrData = {
        paymentMethod,
        amount,
        merchantId: process.env.MERCHANT_ID,
        orderId: Date.now().toString()
      };
      
      const qrCode = await generateQRCode(qrData);
      res.json({ success: true, qrCode });
    } else {
      // Handle card payment
      res.json({ success: true, redirectUrl: '/process-card-payment' });
    }
  } catch (error) {
    console.error('Payment initiation error:', error);
    res.status(500).json({ success: false, error: 'Payment initiation failed' });
  }
});

app.post('/api/payment/confirm', async (req, res) => {
  try {
    const { bookingDetails } = req.body;
    
    // Send confirmations
    await Promise.all([
      sendEmail(bookingDetails.email, bookingDetails),
      sendSMS(bookingDetails.phone, bookingDetails)
    ]);
    
    res.json({ success: true, message: 'Payment confirmed and notifications sent' });
  } catch (error) {
    console.error('Payment confirmation error:', error);
    res.status(500).json({ success: false, error: 'Payment confirmation failed' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});