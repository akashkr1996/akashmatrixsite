import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/dbConnect';
import Consultation from '@/models/Consultation';

export async function GET() {
  await dbConnect();
  const consults = await Consultation.find().sort({ createdAt: -1 });
  return NextResponse.json({ consults });
}
