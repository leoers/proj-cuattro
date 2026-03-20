  export const dynamic = 'force-dynamic';
  import { NextResponse } from 'next/server';

  export async function POST(req: Request) {
    try {
      const body = await req.json();
      const API_KEY = 'cmXrfEMWPZPuYdCtjsPnMYjxTDvnPUYkhWjo'; 
      const rdUrl = `https://api.rd.services/platform/conversions?api_key=${API_KEY}`;

      // Mapeamento Inteligente:
      // Se o front enviar 'identificador', usamos ele. Caso contrário, assume 'formulario-footer'.
      const conversionIdentifier = body.identificador || "formulario-footer";

      const payload = {
        event_type: "CONVERSION",
        event_family: "CDP",
        payload: {
          conversion_identifier: conversionIdentifier,
          email: body.email.trim(),
          // Se for newsletter, body.nome pode vir vazio, então usamos um fallback
          name: body.nome || body.name || "Inscrito Newsletter",
          company: body.empresa || "Não Informado",
          cf_mensagem: body.mensagem || "Interesse via Newsletter",
          cf_aceita_contato: body.aceito || body.aceita_contato ? "Sim" : "Não"
        }
      };

      const response = await fetch(rdUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const responseText = await response.text();

      if (
        response.ok || 
        response.status === 201 || 
        (response.status === 500 && responseText.includes("already_exists"))
      ) {
        console.log(`>>> SUCESSO: Lead enviado como [${conversionIdentifier}]`);
        return NextResponse.json({ success: true });
      }

      console.error(">>> ERRO RD STATION:", response.status, responseText);
      return NextResponse.json({ success: false, error: responseText }, { status: response.status });

    } catch (error: any) {
      console.error(">>> ERRO CRÍTICO ROUTE:", error.message);
      return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
  }