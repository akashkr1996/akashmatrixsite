import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // Replace with your Google Apps Script Web App URL
    const scriptUrl = process.env.GOOGLE_SHEETS_SCRIPT_URL;
    if (!scriptUrl) throw new Error('GOOGLE_SHEETS_SCRIPT_URL not set');
    const res = await fetch(scriptUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error('Google Sheets backup failed');
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
