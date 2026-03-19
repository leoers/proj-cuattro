import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const PUBLIC_TOKEN = 'b91cc3a01e31193552fad70cdf8e2fc2'; 

    // Endpoint clássico que bate com o print que você me mandou
    const rdUrl = `https://www.rdstation.com.br/api/1.1/conversions`;

    // Criando os dados exatamente como um formulário HTML faria
    const params = new URLSearchParams();
    params.append('token_rdstation', PUBLIC_TOKEN);
    params.append('identificador', 'Formulario de contato');
    params.append('email', body.email);
    params.append('nome', body.nome);
    params.append('empresa', body.empresa || '');
    params.append('mensagem', body.mensagem || '');
    params.append('receber_contato', body.aceito ? 'Sim' : 'Não');

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
      return NextResponse.json({ success: false, error: "Erro no servidor RD" }, { status: 400 });
    }
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}