export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // A API Key (cmX...) que você gerou no App
    const API_KEY = 'cmXrfEMWPZPuYdCtjsPnMYjxTDvnPUYkhWjo'; 
    
    // A URL com a chave anexada (Query Param), seguindo a documentação
    const rdUrl = `https://api.rd.services/platform/conversions?api_key=${API_KEY}`;

    const payload = {
      event_type: "CONVERSION",
      event_family: "CDP",
      payload: {
        conversion_identifier: body.identificador || "newsletter-lift-learn",
        email: body.email.trim(),
        name: body.nome || ""
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

    const responseText = await response.text();

    if (response.ok) {
      console.log(">>> SUCESSO v2.0: Lead enviado com API Key na URL!");
      return NextResponse.json({ success: true, data: responseText });
    } else {
      console.error(">>> ERRO RD 2.0:", response.status, responseText);
      return NextResponse.json({ success: false, error: responseText }, { status: response.status });
    }
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}