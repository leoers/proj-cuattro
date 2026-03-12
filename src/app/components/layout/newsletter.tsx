'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function NewsletterRD() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      // Endpoint que vamos criar para o RD Station
      const response = await fetch('/api/rd-station', {
        method: 'POST',
        body: JSON.stringify({ email }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <section className="w-full bg-white pt-2 pb-8"> {/* pt-2 remove quase todo o espaço superior, pb-8 mantém os 30px embaixo */}
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-12">
        
        <div className="max-w-2xl text-center md:text-left">
          <p className="text-[#2D2D2D] text-lg md:text-[22px] leading-[1.4]">
            Receba conteúdos sobre <span className="font-[900]">smart retail, experiência do cliente, inovação no PDV e aumento de vendas em lojas físicas.</span>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="relative w-full md:w-auto">
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
              <span className="text-2xl font-black leading-none mt-[-2px]">➔</span>
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
        </form>
      </div>
    </section>
  );
}