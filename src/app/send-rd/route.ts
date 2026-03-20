export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // A chave que você gerou (Lado Direito do Painel)
    const API_KEY = 'cmXrfEMWPZPuYdCtjsPnMYjxTDvnPUYkhWjo'; 
    
    // URL LIMPA (Sem o ?api_key=...)
    const rdUrl = 'https://api.rd.services/platform/conversions';

    const payload = {
      event_type: "CONVERSION",
      event_family: "CDP",
      payload: {
        conversion_identifier: body.identificador || "newsletter-lift-learn",
        email: body.email.trim(),
        name: body.nome || "Lead Site",
      }
    };

    const response = await fetch(rdUrl, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        // AJUSTE AQUI: Enviando a chave como um Header direto
        'api-key': API_KEY 
      },
      body: JSON.stringify(payload),
    });

    const responseText = await response.text();

    if (response.ok) {
      console.log(">>> SUCESSO: Lead enviado com chave no Header!");
      return NextResponse.json({ success: true });
    } else {
      console.error(">>> STATUS RD:", response.status, responseText);
      return NextResponse.json({ success: false, error: responseText }, { status: response.status });
    }
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}