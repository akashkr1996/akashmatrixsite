import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/dbConnect';
import Consultation from '@/models/Consultation';

export async function POST(request: Request) {
  await dbConnect();
  const body = await request.json();
  const { name, phone, email, category, problem, upiScreenshotBase64 } = body;

  // Store base64 image in MongoDB
  const consult = await Consultation.create({
    name,
    phone,
    email,
    category,
    problem,
    upiScreenshotUrl: upiScreenshotBase64,
    status: 'pending',
  });

  // Trigger WhatsApp message to admin using Twilio (replace with your credentials)
  try {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const whatsappFrom = process.env.TWILIO_WHATSAPP_FROM; // e.g. 'whatsapp:+14155238886'
    const whatsappTo = process.env.ADMIN_WHATSAPP_NUMBER; // e.g. 'whatsapp:+91XXXXXXXXXX'
    if (accountSid && authToken && whatsappFrom && whatsappTo) {
      const twilio = require('twilio')(accountSid, authToken);
      await twilio.messages.create({
        from: whatsappFrom,
        to: whatsappTo,
        body: `New consult from ${name} (${phone})\n${problem}`,
        mediaUrl: upiScreenshotBase64.startsWith('data:image') ? undefined : upiScreenshotBase64,
      });
    }
  } catch (err) {
    // Log error but don't block consult creation
    console.error('WhatsApp notification failed:', err);
  }

  return NextResponse.json({ success: true, consult });
}
