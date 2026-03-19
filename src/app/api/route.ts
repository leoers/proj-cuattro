import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const PUBLIC_TOKEN = 'b91cc3a01e31193552fad70cdf8e2fc2'; 

    // Este endpoint v2 é "blindado" contra o erro 502 de interface da RD
    const rdUrl = `https://api.rdstation.com.br/platform/conversions?ad_identifier=${PUBLIC_TOKEN}`;

    const payload = {
      event_type: "CONVERSION",
      event_family: "CDP",
      payload: {
        email: body.email,
        name: body.nome,
        company: body.empresa || '',
        personal_message: body.mensagem || '',
        cf_receber_contato: body.aceito ? 'Sim' : 'Não', 
        conversion_identifier: "contato-site-cuattro-v2"
      }
    };

    const response = await fetch(rdUrl, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      return NextResponse.json({ success: true });
    } else {
      const errorData = await response.json();
      return NextResponse.json({ success: false, error: errorData }, { status: 400 });
    }
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}