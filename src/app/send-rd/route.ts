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
        conversion_identifier: body.identificador || "newsletter-lift-learn", 
        email: body.email.trim(),
        // Aqui entra a Base Legal que você encontrou na tabela:
        legal_bases: [
          {
            category: "communications",
            type: "consent", // Base legal: Consentimento
            status: "granted" // Status: Concedido
          }
        ]
      }
    };

    const response = await fetch(rdUrl, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify(payload),
    });

    const responseData = await response.text();

    if (response.ok) {
      console.log(">>> SUCESSO: Lead enviado com Base Legal!");
      return NextResponse.json({ success: true });
    } else {
      console.error(">>> ERRO RD:", response.status, responseData);
      return NextResponse.json({ success: false, error: responseData }, { status: response.status });
    }
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}