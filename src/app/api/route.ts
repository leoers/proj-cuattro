import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // TOKEN PRIVADO (O que você confirmou)
    const PRIVATE_TOKEN = '892ad679cb3b3ac06e90a5412a0c9fbd';

    // URL CLÁSSICA (A que tem menos chance de dar 404)
    const rdUrl = `https://www.rdstation.com.br/api/1.1/conversions`;

    const params = new URLSearchParams();
    params.append('token_rdstation', PRIVATE_TOKEN);
    params.append('identificador', 'contato-site-cuattro-v11'); // Identificador novo
    params.append('email', body.email);
    params.append('nome', body.nome);
    params.append('empresa', body.empresa || '');
    params.append('mensagem', body.mensagem || '');

    const response = await fetch(rdUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    const result = await response.text();

    if (response.ok) {
      return NextResponse.json({ success: true });
    } else {
      console.error(">>> ERRO RD STATION V11:", result);
      return NextResponse.json({ success: false, error: result }, { status: 400 });
    }
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}