import { NextResponse } from 'next/server';
import { google } from 'googleapis';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, category, problem } = body;

    // Google OAuth2 setup (use service account or OAuth2 credentials)
    const calendar = google.calendar({ version: 'v3' });
    const auth = new google.auth.JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: (process.env.GOOGLE_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/calendar'],
    });

    await auth.authorize();

    // Create event with Meet link
    const event = {
      summary: `Consultation: ${name}`,
      description: `Consultation for ${category}\n${problem}\nPhone: ${phone}`,
      start: {
        dateTime: new Date(Date.now() + 15 * 60 * 1000).toISOString(), // 15 min from now
        timeZone: 'Asia/Kolkata',
      },
      end: {
        dateTime: new Date(Date.now() + 45 * 60 * 1000).toISOString(), // 45 min from now
        timeZone: 'Asia/Kolkata',
      },
      attendees: [{ email }],
      conferenceData: {
        createRequest: {
          requestId: `${Date.now()}-${Math.random()}`,
          conferenceSolutionKey: { type: 'hangoutsMeet' },
        },
      },
    };

    const calendarId = process.env.GOOGLE_CALENDAR_ID;
    const eventResponse = await calendar.events.insert({
      calendarId,
      auth,
      requestBody: event,
      conferenceDataVersion: 1,
    });

    const meetLink = eventResponse.data?.conferenceData?.entryPoints?.find(
      (ep: any) => ep.entryPointType === 'video'
    )?.uri || '';

    // Send email to user and admin
    const nodemailer = require('nodemailer');
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: [email, process.env.ADMIN_EMAIL],
      subject: `Your Consultation Meeting Link`,
      text: `Hello ${name},\n\nYour meeting is scheduled. Join via Google Meet: ${meetLink}\n\nDate & Time: ${event.start.dateTime}\n\nThank you!`,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, meetLink });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
