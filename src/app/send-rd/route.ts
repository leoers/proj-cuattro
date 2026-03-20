export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // A chave que você gerou na parte da direita do painel
    const API_KEY = 'cmXrfEMWPZPuYdCtjsPnMYjxTDvnPUYkhWjo'; 
    
    // ATENÇÃO: Para chaves diretas (sem App), usamos o endpoint de Events
    const rdUrl = `https://api.rd.services/platform/conversions?api_key=${API_KEY}`;

    const payload = {
      event_type: "CONVERSION",
      event_family: "CDP",
      payload: {
        conversion_identifier: body.identificador || "newsletter-lift-learn",
        email: body.email.trim(),
        name: body.nome || "",
      }
    };

    const response = await fetch(rdUrl, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
        // Note: Sem o header Authorization Bearer, pois a chave vai na URL
      },
      body: JSON.stringify(payload),
    });

    const responseText = await response.text();

    if (response.ok) {
      console.log(">>> SUCESSO ABSOLUTO: Lead enviado via API Key Direta!");
      return NextResponse.json({ success: true });
    } else {
      console.error(">>> ERRO NA API:", response.status, responseText);
      return NextResponse.json({ success: false, error: responseText }, { status: response.status });
    }
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}