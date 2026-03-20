export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const PUBLIC_TOKEN = 'b91cc3a01e31193552fad70cdf8e2fc2'; 
    
    // URL oficial de conversões v1.1
    const rdUrl = 'https://api.rdstation.com.br/cgi-bin/v1.1/conversions';

    const params = new URLSearchParams();
    params.append('token_rdstation', PUBLIC_TOKEN);
    params.append('identificador', 'LP-LiftLearn-Contato');
    params.append('email', body.email || '');
    params.append('nome', body.nome || '');
    
    if (body.empresa) params.append('empresa', body.empresa);
    if (body.mensagem) params.append('mensagem', body.mensagem);
    
    // Enviar o consentimento se o checkbox estiver marcado
    params.append('privacy_policy', body.aceito ? '1' : '0');

    const response = await fetch(rdUrl, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      body: params.toString(),
    });

    const responseData = await response.text();

    if (response.ok) {
      console.log(">>> LEAD ENVIADO COM SUCESSO PARA RD STATION");
      return NextResponse.json({ success: true });
    } else {
      // Se der 404 aqui, é porque a conta na RD não reconheceu o token ou o domínio
      console.error(">>> ERRO RESPOSTA RD STATION:", responseData);
      return NextResponse.json(
        { success: false, error: responseData }, 
        { status: response.status }
      );
    }
  } catch (error: any) {
    console.error(">>> ERRO CRÍTICO NA ROTA API:", error.message);
    return NextResponse.json(
      { success: false, message: error.message }, 
      { status: 500 }
    );
  }
}