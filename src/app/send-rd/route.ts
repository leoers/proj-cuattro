export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const API_KEY = 'cmXrfEMWPZPuYdCtjsPnMYjxTDvnPUYkhWjo'; 
    const rdUrl = `https://api.rd.services/platform/conversions?api_key=${API_KEY}`;

    // Montando o payload com todos os campos do Footer
    const payload = {
      event_type: "CONVERSION",
      event_family: "CDP",
      payload: {
        conversion_identifier: "formulario-footer",
        email: body.email.trim(),
        name: body.nome || "",
        company: body.empresa || "",
        personal_phone: body.telefone || "", // Caso você queira adicionar depois
        cf_mensagem: body.mensagem || "", // Campos personalizados na RD costumam usar cf_
        cf_aceita_contato: body.aceita_contato ? "Sim" : "Não"
      }
    };

    const response = await fetch(rdUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const responseText = await response.text();

    // Se o lead entrou (mesmo que dê erro 500 de resposta), retornamos sucesso para o Front
    if (response.ok || response.status === 201 || (response.status === 500 && responseText.includes("already_exists"))) {
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: false, error: responseText }, { status: response.status });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}