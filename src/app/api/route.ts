import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Esta URL 1.1 com o formato x-www-form-urlencoded é a mais estável da RD
    const rdUrl = `https://www.rdstation.com.br/api/1.1/conversions`;

    // Montando os dados no formato que a RD entende (Formulário)
    const params = new URLSearchParams();
    params.append('token_rdstation', 'b91cc3a01e31193552fad70cdf8e2fc2');
    params.append('identificador', 'lead_site_cuattro'); // Nome que aparecerá no painel
    params.append('email', body.email);
    params.append('nome', body.nome);
    params.append('empresa', body.empresa || '');
    params.append('mensagem', body.mensagem || '');
    params.append('aceito', body.aceito ? 'true' : 'false');

    const response = await fetch(rdUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      body: params.toString(),
    });

    const result = await response.text();

    if (response.ok) {
      return NextResponse.json({ success: true });
    } else {
      console.error(">>> ERRO NA RD STATION:", result);
      return NextResponse.json({ success: false, error: result }, { status: 400 });
    }
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}