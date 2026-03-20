export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const PUBLIC_TOKEN = 'b91cc3a01e31193552fad70cdf8e2fc2'; 
    
    // URL oficial para integrações v1.1
    const rdUrl = 'https://www.rdstation.com.br/api/1.1/conversions';

    const params = new URLSearchParams();
    params.append('token_rdstation', PUBLIC_TOKEN);
    params.append('identificador', 'contato-site'); // Simplificado ao máximo
    params.append('email', body.email || '');
    
    if (body.nome) {
      params.append('nome', body.nome);
    }

    // Comentando campos extras para isolar o erro 500 da RD
    // if (body.empresa) params.append('empresa', body.empresa);
    // if (body.mensagem) params.append('mensagem', body.mensagem);
    // params.append('privacy_policy', body.aceito ? '1' : '0');

    const response = await fetch(rdUrl, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    const responseData = await response.text();

    if (response.ok) {
      console.log(">>> SUCESSO: Lead enviado!");
      return NextResponse.json({ success: true });
    } else {
      // Se der 500/502 aqui, o problema é instabilidade na RD ou no Token
      console.error(`>>> RD STATUS ${response.status}:`, responseData);
      return NextResponse.json(
        { success: false, error: "Erro na RD Station" }, 
        { status: response.status }
      );
    }
  } catch (error: any) {
    console.error(">>> ERRO NO CÓDIGO:", error.message);
    return NextResponse.json(
      { success: false, message: error.message }, 
      { status: 500 }
    );
  }
}