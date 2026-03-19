import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const PUBLIC_TOKEN = 'b91cc3a01e31193552fad70cdf8e2fc2'; 
    const rdUrl = `https://www.rdstation.com.br/api/1.1/conversions`;

    // Vamos enviar EXATAMENTE o que o script do seu print enviaria
    const params = new URLSearchParams();
    params.append('token_rdstation', PUBLIC_TOKEN);
    params.append('identificador', 'Formulario de contato');
    params.append('email', body.email);
    params.append('nome', body.nome);
    
    // Adicionamos esses dois apenas se a RD não reclamar dos básicos
    if (body.empresa) params.append('empresa', body.empresa);
    if (body.mensagem) params.append('mensagem', body.mensagem);

    const response = await fetch(rdUrl, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    if (response.ok) {
      return NextResponse.json({ success: true });
    } else {
      const errorText = await response.text();
      // Vamos logar o erro real da RD no seu terminal da Vercel para você ver
      console.error(">>> RESPOSTA REAL DA RD:", errorText);
      return NextResponse.json({ success: false, error: errorText }, { status: 400 });
    }
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}