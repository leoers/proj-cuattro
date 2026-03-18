import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  console.log(">>> Iniciando tentativa de envio para RD Station (V2)");

  try {
    const body = await req.json();

    // URL oficial para conversões v1 (a mais estável para esse token)
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
      console.log(">>> SUCESSO: Lead enviado para a RD Station!");
      return NextResponse.json({ success: true });
    } else {
      console.error(">>> ERRO RETORNADO PELA RD:", result);
      return NextResponse.json({ success: false, error: result }, { status: 400 });
    }
  } catch (error: any) {
    console.error(">>> ERRO CRÍTICO NO SERVIDOR:", error.message);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
} 