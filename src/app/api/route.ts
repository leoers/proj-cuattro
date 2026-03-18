import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // URL para RD Station Marketing (Conversões v1.1)
    const rdUrl = `https://www.rdstation.com.br/api/1.1/conversions`;

    const params = new URLSearchParams();
    // Dados obrigatórios para a RD aceitar o lead
    params.append('token_rdstation', 'b91cc3a01e31193552fad70cdf8e2fc2');
    params.append('identificador', 'lead_site_cuattro');
    params.append('email', body.email);
    params.append('nome', body.nome);
    params.append('empresa', body.empresa || '');
    params.append('mensagem', body.mensagem || '');
    
    // Campos extras que ajudam a RD a processar o lead
    params.append('c_utm_source', 'site-vercel');
    params.append('aceito_contato', 'true');

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
      console.log(">>> LEAD ENVIADO COM SUCESSO!");
      return NextResponse.json({ success: true });
    } else {
      console.error(">>> ERRO NA RD STATION:", result);
      return NextResponse.json({ success: false, error: result }, { status: 400 });
    }
  } catch (error: any) {
    console.error(">>> ERRO NO SERVIDOR:", error.message);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}