import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/dbConnect';
import Consultation from '@/models/Consultation';

export async function PUT(request: Request) {
  await dbConnect();
  const { id, status } = await request.json();
  const consult = await Consultation.findByIdAndUpdate(id, { status }, { new: true });
  if (!consult) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ success: true, consult });
}
