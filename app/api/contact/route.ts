import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, suburb, message, type, quoteDetails } = body;

    if (!name || !phone || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const { error } = await supabase.from('enquiries').insert({
      id: Date.now().toString(),
      type: type || 'contact',
      name,
      phone,
      suburb: suburb || '—',
      message,
      quote_details: quoteDetails || null,
      read: false,
    });

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  if (searchParams.get('code') !== '4994') {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 });
  }

  const { data, error } = await supabase
    .from('enquiries')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error(error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }

  // Map quote_details back to camelCase for the frontend
  const enquiries = (data ?? []).map((e) => ({
    ...e,
    quoteDetails: e.quote_details,
  }));

  return NextResponse.json({ enquiries });
}

export async function PATCH(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  if (searchParams.get('code') !== '4994') {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 });
  }

  const { id } = await req.json();

  const { error } = await supabase
    .from('enquiries')
    .update({ read: true })
    .eq('id', id);

  if (error) {
    console.error(error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}