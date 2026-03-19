import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // TOKEN PÚBLICO (O "Nome" da analogia RD)
    const PUBLIC_TOKEN = 'b91cc3a01e31193552fad70cdf8e2fc2'; 

    // URL OFICIAL DE CONVERSÃO V1.1
    const rdUrl = `https://www.rdstation.com.br/api/1.1/conversions`;

    // Criando o formulário para evitar bloqueios de segurança (CORS/Domain)
    const formData = new URLSearchParams();
    formData.append('token_rdstation', PUBLIC_TOKEN);
    formData.append('identificador', 'contato-site-cuattro-final');
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

    if (response.ok) {
      return NextResponse.json({ success: true });
    } else {
      const errorText = await response.text();
      console.error(">>> ERRO RD STATION:", errorText);
      return NextResponse.json({ success: false, error: errorText }, { status: 400 });
    }
  } catch (error: any) {
    console.error(">>> ERRO CRÍTICO API:", error.message);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}