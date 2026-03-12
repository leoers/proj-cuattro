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
    <section className="w-full bg-white py-12 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
        
        <div className="max-w-2xl">
          <p className="text-[#2D2D2D] text-lg md:text-xl leading-relaxed">
            Receba conteúdos sobre <span className="font-[900]">tecnologia para varejo, experiência do cliente, inovação no PDV</span> e aumento de vendas em lojas físicas.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="relative w-full md:w-auto">
          <div className="flex items-center border-[3px] border-[#2D2D2D] rounded-full px-6 py-2 transition-all focus-within:ring-2 focus-within:ring-[#ffee5a]">
            <span className="text-[#2D2D2D] font-[900] mr-3 whitespace-nowrap uppercase text-sm">
              e-mail &gt;
            </span>
            <input
              type="email"
              required
              placeholder="nome@empresa.com.br"
              className="bg-transparent outline-none text-slate-600 w-full md:w-72 placeholder-slate-300 font-medium"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button 
              type="submit"
              disabled={status === 'loading'}
              className="ml-3 text-[#2D2D2D] font-black hover:scale-110 transition-transform disabled:opacity-30"
            >
              {status === 'loading' ? '...' : '➔'}
            </button>
          </div>
          
          {status === 'success' && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute -bottom-7 left-6 text-green-600 font-bold text-xs">
              ✓ Inscrito com sucesso!
            </motion.p>
          )}
        </form>
      </div>
    </section>
  );
}