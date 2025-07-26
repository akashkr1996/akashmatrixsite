import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/dbConnect';
import Blog from '@/models/Blog';

export async function GET(request: Request, { params }: { params: { slug: string } }) {
  await dbConnect();
  const blog = await Blog.findOne({ slug: params.slug });
  if (!blog) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ blog });
}

export async function PUT(request: Request, { params }: { params: { slug: string } }) {
  await dbConnect();
  const { title, coverImageUrl, content, tags, embeds } = await request.json();
  const blog = await Blog.findOneAndUpdate({ slug: params.slug }, { title, coverImageUrl, content, tags, embeds }, { new: true });
  if (!blog) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ success: true, blog });
}

export async function DELETE(request: Request, { params }: { params: { slug: string } }) {
  await dbConnect();
  await Blog.findOneAndDelete({ slug: params.slug });
  return NextResponse.json({ success: true });
}
