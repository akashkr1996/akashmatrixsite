import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/dbConnect';
import Blog from '@/models/Blog';

export async function GET(request: Request) {
  await dbConnect();
  const url = new URL(request.url);
  const category = url.searchParams.get('category');
  const tag = url.searchParams.get('tag');
  let query: any = {};
  if (category) query.category = category;
  if (tag) query.tags = tag;
  const blogs = await Blog.find(query).sort({ createdAt: -1 });
  return NextResponse.json({ blogs });
}

export async function POST(request: Request) {
  await dbConnect();
  const { title, coverImageUrl, content, tags, embeds } = await request.json();
  const blog = await Blog.create({ title, coverImageUrl, content, tags, embeds });
  return NextResponse.json({ success: true, blog });
}
