import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // TOKEN PÚBLICO que você pegou no painel
    const PUBLIC_TOKEN = 'b91cc3a01e31193552fad70cdf8e2fc2'; 

    // URL da API V2 (Mais moderna e estável)
    const rdUrl = `https://api.rdstation.com.br/platform/conversions?ad_identifier=${PUBLIC_TOKEN}`;

    const payload = {
      event_type: "CONVERSION",
      event_family: "CDP",
      payload: {
        email: body.email,
        name: body.nome,
        company: body.empresa || '',
        personal_message: body.mensagem || '',
        conversion_identifier: "contato-site-cuattro-v15"
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

    const result = await response.json();

    if (response.ok) {
      return NextResponse.json({ success: true });
    } else {
      console.error(">>> ERRO DETALHADO RD V2:", result);
      return NextResponse.json({ success: false, error: result }, { status: 400 });
    }
  } catch (error: any) {
    console.error(">>> ERRO CRÍTICO API:", error.message);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}