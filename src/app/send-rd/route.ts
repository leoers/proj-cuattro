export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Use a chave NOVA que você gerou
    const API_KEY = 'VBFJtNiBkuvaZmzUfCKhOdAQcOtRljgBDGDq'; 
    
    // Voltando para o formato que dava 401, pois ele é o "oficial"
    const rdUrl = `https://api.rd.services/platform/conversions?api_key=${API_KEY}`;

    const payload = {
      event_type: "CONVERSION",
      event_family: "CDP",
      payload: {
        conversion_identifier: "newsletter-site",
        email: body.email.trim()
      }
    };

    const response = await fetch(rdUrl, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json'
        // REMOVEMOS O HEADER 'api-key' PARA VOLTAR AO QUE A RD PEDE
      },
      body: JSON.stringify(payload),
    });

    const responseText = await response.text();

    if (response.ok) {
      console.log(">>> AGORA TEM QUE IR: 200 OK!");
      return NextResponse.json({ success: true });
    } else {
      console.error(">>> RETORNO RD:", response.status, responseText);
      return NextResponse.json({ success: false, error: responseText }, { status: response.status });
    }
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}