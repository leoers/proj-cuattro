import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // URL DE EVENTOS (A mais estável para RD Marketing atual)
    const rdUrl = `https://api.rdstation.com.br/main/api/v1/conversions`;

    const payload = {
      token_rdstation: 'b91cc3a01e31193552fad70cdf8e2fc2',
      identificador: 'lead_site_cuattro',
      email: body.email,
      nome: body.nome,
      empresa: body.empresa || '',
      mensagem: body.mensagem || '',
      c_utm_source: 'site-vercel'
    };

    const response = await fetch(rdUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload),
    });

    const result = await response.text();

    if (response.ok) {
      return NextResponse.json({ success: true });
    } else {
      console.error(">>> RESPOSTA DA RD:", result);
      return NextResponse.json({ success: false, error: result }, { status: 400 });
    }
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}