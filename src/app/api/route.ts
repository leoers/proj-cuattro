import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log(">>> Recebi os dados:", body);

    const rdUrl = `https://api.rdstation.com.br/main/api/v1/conversions`;

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
        'Accept': 'application/json'
      },
      body: formData.toString(),
    });

    const result = await response.text();

    if (response.ok) {
      return NextResponse.json({ success: true });
    } else {
      console.error(">>> ERRO DA RD:", result);
      return NextResponse.json({ success: false, error: result }, { status: 400 });
    }
  } catch (error: any) {
    console.error(">>> ERRO CRÍTICO:", error.message);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
} // <--- ESSA CHAVE É O QUE ESTAVA FALTANDO!