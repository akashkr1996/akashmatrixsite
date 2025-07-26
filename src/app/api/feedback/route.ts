import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/dbConnect';
import Feedback from '@/models/Feedback';

export async function POST(request: Request) {
  await dbConnect();
  const { rating, comment } = await request.json();
  const feedback = await Feedback.create({ rating, comment });
  return NextResponse.json({ success: true, feedback });
}

export async function GET() {
  await dbConnect();
  const feedbacks = await Feedback.find();
  const avgRating = feedbacks.length ? (feedbacks.reduce((sum, f) => sum + f.rating, 0) / feedbacks.length) : 0;
  return NextResponse.json({ feedbacks, avgRating });
}
