import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const PUBLIC_TOKEN = 'b91cc3a01e31193552fad70cdf8e2fc2'; 
    const rdUrl = `https://www.rdstation.com.br/api/1.1/conversions`;

    const formData = new URLSearchParams();
    
    // Dados básicos (Batendo com o seu print da RD)
    formData.append('token_rdstation', PUBLIC_TOKEN);
    formData.append('identificador', 'Formulario de contato');
    formData.append('email', body.email);
    formData.append('nome', body.nome);
    
    // Campos Adicionais
    if (body.empresa) formData.append('empresa', body.empresa);
    if (body.mensagem) formData.append('mensagem', body.mensagem);
    
    // O campo de ACEITO (Checkbox)
    // Convertemos o true/false para um texto legível no painel da RD
    formData.append('receber_contato', body.aceito ? 'Sim' : 'Não');

    const response = await fetch(rdUrl, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString(),
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