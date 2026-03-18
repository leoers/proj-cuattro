import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // ESTE É O TOKEN PRIVADO (O QUE VOCÊ TINHA ANTES)
    const PRIVATE_TOKEN = '892ad679cb3b3ac06e90a5412a0c9fbd';

    const rdUrl = `https://api.rdstation.com.br/platform/conversions?api_key=${PRIVATE_TOKEN}`;

    const payload = {
      event_type: "CONVERSION",
      event_family: "CDP",
      payload: {
        conversion_identifier: "contato-site-v9-privado",
        email: body.email,
        name: body.nome,
        company: body.empresa || '',
        personal_message: body.mensagem || ''
      }
    };

    const response = await fetch(rdUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      return NextResponse.json({ success: true });
    } else {
      const errorText = await response.text();
      return NextResponse.json({ success: false, error: errorText }, { status: 400 });
    }
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}