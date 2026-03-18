import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Endpoint oficial da RD Station
    const rdUrl = `https://api.rdstation.com.br/main/api/v1/conversions`;

    // USANDO O TOKEN PÚBLICO QUE O CLIENTE ENVIOU
    const params = new URLSearchParams();
    params.append('token_rdstation', 'b91cc3a01e31193552fad70cdf8e2fc2'); 
    params.append('identificador', 'lead_lift_learn');
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

    if (response.ok) {
      return NextResponse.json({ success: true });
    } else {
      const errorText = await response.text();
      return NextResponse.json({ success: false, error: errorText }, { status: 400 });
    }
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}