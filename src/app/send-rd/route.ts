export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const PUBLIC_TOKEN = 'b91cc3a01e31193552fad70cdf8e2fc2'; 
    
    // Tentando o endpoint de eventos da v2.0
    const rdUrl = 'https://api.rd.services/platform/conversions?api_token=' + PUBLIC_TOKEN;

    const payload = {
      event_type: "CONVERSION",
      event_family: "CDP",
      payload: {
        conversion_identifier: "contato-site-liftlearn",
        email: body.email,
        name: body.nome,
        // Adicione outros campos aqui se o teste inicial der 200
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

    const responseData = await response.json(); // v2.0 sempre responde JSON

    if (response.ok) {
      return NextResponse.json({ success: true });
    } else {
      console.error(">>> ERRO v2.0:", responseData);
      return NextResponse.json({ success: false, error: responseData }, { status: response.status });
    }
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}