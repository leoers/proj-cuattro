import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // TESTANDO A URL ALTERNATIVA (Muitas contas novas só aceitam esta)
    const rdUrl = `https://api.rdstation.com.br/main/api/v1/conversions`;
    // Se a de cima falhar, a alternativa é: https://www.rdstation.com.br/api/1.1/conversions

    const formData = new URLSearchParams();
    formData.append('token_rdstation', 'b91cc3a01e31193552fad70cdf8e2fc2');
    formData.append('identificador', 'lead_lift_learn');
    formData.append('email', body.email);
    formData.append('nome', body.nome);
    formData.append('empresa', body.empresa || '');
    formData.append('mensagem', body.mensagem || '');

    const response = await fetch(rdUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString(),
    });

    const result = await response.text();

    if (response.ok) {
      return NextResponse.json({ success: true });
    } else {
      // Se der 404 de novo, vamos saber aqui
      return NextResponse.json({ success: false, error: result }, { status: 400 });
    }
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}