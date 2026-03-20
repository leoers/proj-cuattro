export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    // Este é o Token Privado que você acabou de achar
    const PRIVATE_TOKEN = '892ad679cb3b3ac06e90a5412a0c9fbd'; 
    
    // Na v2.0, o endpoint não usa parâmetros na URL para autenticação
    const rdUrl = `https://api.rd.services/platform/conversions`;

    const payload = {
      event_type: "CONVERSION",
      event_family: "CDP",
      payload: {
        conversion_identifier: "contato-site-liftlearn",
        email: body.email || "",
        name: body.nome || "",
        // Depois de validar o 200, você pode reativar empresa e mensagem aqui
      }
    };

    const response = await fetch(rdUrl, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        // A v2.0 exige o Token Privado aqui como Bearer
        'Authorization': `Bearer ${PRIVATE_TOKEN}`
      },
      body: JSON.stringify(payload),
    });

    const responseData = await response.json();

    if (response.ok) {
      console.log(">>> SUCESSO v2.0: Lead enviado com Token Privado!");
      return NextResponse.json({ success: true });
    } else {
      // Se der erro aqui, o responseData vai nos dizer exatamente o que a RD não gostou
      console.error(">>> ERRO NA API v2.0:", response.status, responseData);
      return NextResponse.json(
        { success: false, error: responseData }, 
        { status: response.status }
      );
    }
  } catch (error: any) {
    console.error(">>> ERRO CRÍTICO NO CÓDIGO:", error.message);
    return NextResponse.json(
      { success: false, message: error.message }, 
      { status: 500 }
    );
  }
}