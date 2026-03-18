import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const PRIVATE_TOKEN = '892ad679cb3b3ac06e90a5412a0c9fbd';

    // URL oficial de API (sem o www) para evitar o erro 502 de firewall
    const rdUrl = `https://api.rdstation.com.br/main/api/v1/conversions`;

    const payload = {
      token_rdstation: PRIVATE_TOKEN,
      identificador: 'contato-site-cuattro-v12',
      email: body.email,
      nome: body.nome,
      empresa: body.empresa || '',
      mensagem: body.mensagem || ''
    };

    const response = await fetch(rdUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const result = await response.text();

    if (response.ok) {
      return NextResponse.json({ success: true });
    } else {
      console.error(">>> RESPOSTA RD:", result);
      return NextResponse.json({ success: false, error: result }, { status: 400 });
    }
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}