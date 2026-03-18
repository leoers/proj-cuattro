import { NextResponse } from 'next/server';

export async function POST() {
  return NextResponse.json({ message: "API inativa. Usando captura automática." });
}

export async function GET() {
  return NextResponse.json({ status: "ok" });
}