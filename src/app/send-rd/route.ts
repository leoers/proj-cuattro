export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const PUBLIC_TOKEN = 'b91cc3a01e31193552fad70cdf8e2fc2'; 
    
    // URL mais estável para formulários manuais
    const rdUrl = 'https://www.rdstation.com.br/api/1.1/conversions';

    const params = new URLSearchParams();
    params.append('token_rdstation', PUBLIC_TOKEN);
    params.append('identificador', 'Contato_Site_LiftLearn');
    
    // Garantindo que os valores básicos existam para não dar 502
    params.append('email', body.email || '');
    if (body.nome) {
      params.append('nome', body.nome);
    }
    
    // Consentimento LGPD
    params.append('privacy_policy', body.aceito ? '1' : '0');

    // OPCIONAL: Se quiser testar apenas o básico, deixe as linhas abaixo comentadas
    // if (body.empresa) params.append('empresa', body.empresa);
    // if (body.mensagem) params.append('mensagem', body.mensagem);

    const response = await fetch(rdUrl, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    const responseData = await response.text();

    if (response.ok) {
      console.log(">>> SUCESSO: Lead enviado para RD Station");
      return NextResponse.json({ success: true });
    } else {
      console.error(">>> ERRO RESPOSTA RD STATION:", response.status, responseData);
      return NextResponse.json(
        { success: false, error: responseData }, 
        { status: response.status }
      );
    }
  } catch (error: any) {
    console.error(">>> ERRO CRÍTICO NA ROTA:", error.message);
    return NextResponse.json(
      { success: false, message: error.message }, 
      { status: 500 }
    );
  }
}