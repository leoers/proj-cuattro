export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const API_KEY = 'cmXrfEMWPZPuYdCtjsPnMYjxTDvnPUYkhWjo'; 
    const rdUrl = 'https://api.rd.services/platform/conversions';

    const payload = {
      event_type: "CONVERSION",
      event_family: "CDP",
      payload: {
        conversion_identifier: "newsletter-site",
        email: body.email.trim()
        // NOME REMOVIDO
        // LEGAL BASES REMOVIDO (para testar a forma mais simples)
      }
    };

    const response = await fetch(rdUrl, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'api-key': API_KEY 
      },
      body: JSON.stringify(payload),
    });

    const responseText = await response.text();

    if (response.ok) {
      console.log(">>> AGORA FOI! Lead (e-mail) enviado.");
      return NextResponse.json({ success: true });
    } else {
      console.error(">>> STATUS RD:", response.status, responseText);
      return NextResponse.json({ success: false, error: responseText }, { status: response.status });
    }
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}