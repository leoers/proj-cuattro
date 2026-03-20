export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // A nova API Key que você gerou
    const API_KEY = 'cmXrfEMWPZPuYdCtjsPnMYjxTDvnPUYkhWjo'; 
    
    // Endpoint oficial para Conversões (v2.0)
    const rdUrl = 'https://api.rd.services/platform/conversions';

    const payload = {
      event_type: "CONVERSION",
      event_family: "CDP",
      payload: {
        conversion_identifier: "contato-site-liftlearn",
        email: body.email || "",
        name: body.nome || "",
        company: body.empresa || "",
        personal_message: body.mensagem || "",
      }
    };

    const response = await fetch(rdUrl, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        // Com API Key v2.0, o padrão é passar no Authorization como Bearer
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify(payload),
    });

    const responseData = await response.json();

    if (response.ok) {
      console.log(">>> SUCESSO: Lead enviado via API Key v2.0 oficial!");
      return NextResponse.json({ success: true });
    } else {
      console.error(">>> ERRO RD v2.0:", response.status, responseData);
      return NextResponse.json(
        { success: false, error: responseData }, 
        { status: response.status }
      );
    }
  } catch (error: any) {
    console.error(">>> ERRO CRÍTICO:", error.message);
    return NextResponse.json(
      { success: false, message: error.message }, 
      { status: 500 }
    );
  }
}