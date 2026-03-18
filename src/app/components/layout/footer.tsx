'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function FooterRD() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    empresa: '',
    mensagem: '',
    aceito: true
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      // Ele vai chamar a API que vamos arrumar no próximo passo
      const response = await fetch('/api', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ nome: '', email: '', empresa: '', mensagem: '', aceito: true });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
      }
    } catch (err) {
      console.error("Erro ao enviar:", err);
      setStatus('error');
    }
  };

  return (
    <footer id="footer" className="w-full bg-[#ffee5a] py-20 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center text-black">
        <div>
          <h2 className="text-4xl md:text-[64px] font-bold leading-tight uppercase mb-8">
            Quer ver a <br /> tecnologia <br /> funcionando?
          </h2>
          <div className="w-48">
            <Image src="/images/ui/logo-cuattro.png" alt="Cuattro" width={200} height={60} />
          </div>
        </div>

        <div className="bg-white rounded-[40px] p-8 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-4">
            <input 
              type="text" 
              placeholder="Nome" 
              required 
              className="w-full border border-gray-300 rounded-full px-6 py-3 text-black"
              value={formData.nome}
              onChange={(e) => setFormData({...formData, nome: e.target.value})}
            />
            <input 
              type="email" 
              placeholder="E-mail" 
              required 
              className="w-full border border-gray-300 rounded-full px-6 py-3 text-black"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
            <input 
              type="text" 
              placeholder="Empresa" 
              className="w-full border border-gray-300 rounded-full px-6 py-3 text-black"
              value={formData.empresa}
              onChange={(e) => setFormData({...formData, empresa: e.target.value})}
            />
            <textarea 
              placeholder="Mensagem" 
              className="w-full border border-gray-300 rounded-[20px] px-6 py-3 text-black"
              value={formData.mensagem}
              onChange={(e) => setFormData({...formData, mensagem: e.target.value})}
            />
            <button 
              type="submit" 
              disabled={status === 'loading'}
              className="w-full bg-orange-500 text-white font-bold py-4 rounded-full uppercase"
            >
              {status === 'loading' ? 'Enviando...' : 'Enviar'}
            </button>
            {status === 'success' && <p className="text-green-600 text-center mt-2">Enviado com sucesso!</p>}
            {status === 'error' && <p className="text-red-500 text-center mt-2">Erro ao enviar. Tente novamente.</p>}
          </form>
        </div>
      </div>
    </footer>
  );
}