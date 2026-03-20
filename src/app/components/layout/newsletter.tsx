'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

declare global {
  interface Window {
    RdIntegration: any;
  }
}

export default function NewsletterRD() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    const identificador = 'newsletter-lift-learn';

    try {
      // 1. Envio para a nossa rota no servidor (v2.0)
      const response = await fetch('/send-rd', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email: email.trim(), 
          identificador,
          nome: "Inscrito Newsletter" // Garante que o lead não fique sem nome na base
        }),
      });

      // 2. Camada de Segurança: SDK do RD Station (Front-end)
      if (typeof window !== 'undefined' && window.RdIntegration) {
        window.RdIntegration.post([
          { name: 'email', value: email.trim() },
          { name: 'form_id', value: identificador },
          { name: 'token_rd', value: 'f1a378e4-97d0-427e-a74b-21e94286aa54' } 
        ], () => {
          console.log('RD SDK: Lead processado via Front-end');
        });
      }

      // 3. Lógica de Resiliência: Se a API deu OK ou se deu erro mas sabemos que ela salva
      if (response.ok || response.status === 201) {
        setStatus('success');
        setEmail('');
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        // Se a RD Station deu o "falso negativo" (erro 500 que salva o lead), 
        // ainda tratamos como sucesso para o usuário final.
        console.warn('API respondeu com status inesperado, mas lead pode ter sido processado.');
        setStatus('success');
        setEmail('');
        setTimeout(() => setStatus('idle'), 5000);
      }
    } catch (err) {
      console.error('Erro crítico no envio:', err);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  return (
    <section className="w-full bg-white pt-2 pb-8">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-12">
        
        <div className="max-w-2xl text-center md:text-left">
          <p className="text-[#2D2D2D] text-lg md:text-[22px] leading-[1.4]">
            Receba conteúdos sobre <span className="font-[900]">smart retail, experiência do cliente, inovação no PDV e aumento de vendas em lojas físicas.</span>
          </p>
        </div>

        <form id="newsletter-lift-learn" name="newsletter-lift-learn" onSubmit={handleSubmit} className="relative w-full md:w-auto">
          <div className="flex items-center border-[2.5px] border-[#2D2D2D] rounded-full px-8 py-4 transition-all focus-within:ring-2 focus-within:ring-[#ffee5a]">
            <span className="text-[#2D2D2D] font-[900] mr-4 whitespace-nowrap uppercase text-[13px] tracking-widest">
              e-mail :
            </span>
            <input
              type="email"
              required
              placeholder="nome@empresa.com.br"
              className="bg-transparent outline-none text-[#2D2D2D] w-full md:w-[320px] placeholder-slate-300 font-medium text-base"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button 
              type="submit"
              disabled={status === 'loading'}
              className="ml-4 text-[#2D2D2D] hover:scale-125 transition-transform disabled:opacity-30 flex items-center justify-center"
            >
              <span className="text-2xl font-black leading-none mt-[-2px]">
                {status === 'loading' ? '...' : '➔'}
              </span>
            </button>
          </div>
          
          {status === 'success' && (
            <motion.p 
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }} 
              className="absolute -bottom-10 left-8 text-green-600 font-bold text-sm"
            >
              ✓ Inscrito com sucesso!
            </motion.p>
          )}

          {status === 'error' && (
            <p className="absolute -bottom-10 left-8 text-red-500 font-bold text-sm">
              Erro ao enviar. Tente novamente.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}