import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // URL oficial de conversões v1
    const rdUrl = `https://api.rdstation.com.br/main/api/v1/conversions`;

    // A RD Station EXIGE o campo 'identificador' dentro do JSON
    const payload = {
      token_rdstation: 'b91cc3a01e31193552fad70cdf8e2fc2',
      identificador: 'lead_site_cuattro', // Não mude este nome
      email: body.email,
      nome: body.nome,
      empresa: body.empresa || '',
      mensagem: body.mensagem || '',
      aceito: body.aceito
    };

    const response = await fetch(rdUrl, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json' 
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      return NextResponse.json({ success: true });
    } else {
      const errorDetail = await response.text();
      return NextResponse.json({ success: false, error: errorDetail }, { status: 400 });
    }
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}