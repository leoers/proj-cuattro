import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const TOKEN = 'b91cc3a01e31193552fad70cdf8e2fc2';

    // 1. TENTATIVA: RD STATION MARKETING (Endpoint Padrão)
    console.log(">>> Testando: RD Station Marketing...");
    const respMarketing = await fetch(`https://api.rdstation.com.br/platform/conversions?api_key=${TOKEN}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event_type: "CONVERSION",
        event_family: "CDP",
        payload: {
          conversion_identifier: "identificador-v8-mkt",
          email: body.email,
          name: body.nome
        }
      }),
    });

    if (respMarketing.ok) {
      console.log(">>> SUCESSO: É uma conta de MARKETING!");
      return NextResponse.json({ success: true, system: 'marketing' });
    }

    // 2. TENTATIVA: RD STATION CRM (Endpoint de Oportunidade)
    console.log(">>> FALHOU MARKETING. Testando: RD Station CRM...");
    const respCRM = await fetch(`https://crm.rdstation.com/api/v1/contacts?token=${TOKEN}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contact: {
          name: body.nome,
          email: body.email,
          organization: body.empresa
        }
      }),
    });

    if (respCRM.ok) {
      console.log(">>> SUCESSO: É uma conta de CRM!");
      return NextResponse.json({ success: true, system: 'crm' });
    }

    // Se ambos falharem, pegamos o erro do Marketing para analisar
    const errorText = await respMarketing.text();
    return NextResponse.json({ 
      success: false, 
      message: "Ambos os sistemas recusaram o Token",
      details: errorText 
    }, { status: 400 });

  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}