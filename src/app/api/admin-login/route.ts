// @ts-ignore
import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

const ADMIN_EMAIL = 'iamakash0326@gmail.com';

// Store OTPs in-memory for demo (use DB in production)
const otpStore: Record<string, string> = {};

export async function POST(request: Request) {
  const { email } = await request.json();
  if (email !== ADMIN_EMAIL) {
    return NextResponse.json({ success: false, message: 'Unauthorized email.' }, { status: 401 });
  }
  // Generate OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore[email] = otp;

  // Send OTP via email
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: ADMIN_EMAIL,
      pass: process.env.GMAIL_APP_PASSWORD, // Use App Password
    },
  });

  await transporter.sendMail({
    from: ADMIN_EMAIL,
    to: email,
    subject: 'Your Admin Login OTP',
    text: `Your OTP is: ${otp}`,
  });

  return NextResponse.json({ success: true, message: 'OTP sent.' });
}

export async function PUT(request: Request) {
  const { email, otp } = await request.json();
  if (email !== ADMIN_EMAIL || otpStore[email] !== otp) {
    return NextResponse.json({ success: false, message: 'Invalid OTP.' }, { status: 401 });
  }
  // OTP verified, clear it
  delete otpStore[email];
  return NextResponse.json({ success: true, message: 'Login successful.' });
}
