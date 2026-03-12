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
      const response = await fetch('/api/rd-station', {
        method: 'POST',
        body: JSON.stringify({ ...formData, identificador: 'formulario-contato-footer' }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ nome: '', email: '', empresa: '', mensagem: '', aceito: true });
      } else { setStatus('error'); }
    } catch (err) { setStatus('error'); }
  };

  return (
    <footer className="w-full bg-[#ffee5a] py-20 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        
        {/* Lado Esquerdo: Texto e Branding */}
        <div className="relative z-10">
          <h2 className="text-4xl md:text-[64px] font-[700] text-[#2D2D2D] leading-[1] uppercase mb-8 tracking-wide">
            Quer ver a <br /> tecnologia <br /> funcionando <br /> na prática?
          </h2>
          <p className="text-xl text-[#2D2D2D] font-medium max-w-md mb-12 leading-relaxed">
            Fale com nossos especialistas e descubra como implementar o Lift & Learn no seu ponto de venda em poucas semanas.
          </p>
          <div className="w-48 h-auto">
            <Image src="/images/ui/logo-cuattro.png" alt="Cuattro Live & Digital" width={200} height={60} className="object-contain" />
          </div>
        </div>

        {/* Lado Direito: Card do Formulário */}
        <div className="bg-white rounded-[40px] p-8 md:p-12 shadow-xl relative z-10">
          <h3 className="text-xl font-bold text-[#2D2D2D] mb-2">Solicite uma demonstração</h3>
          <p className="text-[#2D2D2D] mb-8 pb-2 border-b-2 border-[#ffee5a] w-fit">ou proposta personalizada</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              { label: 'nome', id: 'nome', type: 'text' },
              { label: 'e-mail', id: 'email', type: 'email' },
              { label: 'empresa', id: 'empresa', type: 'text' }
            ].map((field) => (
              <div key={field.id} className="flex items-center border border-gray-800 rounded-full px-6 py-3">
                <span className="text-[#2D2D2D] font-bold mr-2 whitespace-nowrap text-sm">{field.label} :</span>
                <input
                  type={field.type}
                  required
                  className="bg-transparent outline-none w-full text-slate-600 placeholder-slate-300"
                  value={formData[field.id as keyof typeof formData] as string}
                  onChange={(e) => setFormData({...formData, [field.id]: e.target.value})}
                />
              </div>
            ))}

            <div className="flex flex-col border border-gray-800 rounded-[20px] px-6 py-4">
              <span className="text-[#2D2D2D] font-bold mb-2 text-sm">mensagem :</span>
              <textarea
                rows={3}
                className="bg-transparent outline-none w-full text-slate-600 resize-none"
                value={formData.mensagem}
                onChange={(e) => setFormData({...formData, mensagem: e.target.value})}
              ></textarea>
            </div>

            <div className="flex items-center justify-between pt-4">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-600">
                <input 
                  type="checkbox" 
                  checked={formData.aceito} 
                  onChange={(e) => setFormData({...formData, aceito: e.target.checked})}
                  className="accent-orange-500 w-4 h-4" 
                />
                Aceito receber contato
              </label>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-[#ffee5a] to-[#FF9D1C] text-[#2D2D2D] font-black uppercase tracking-widest px-10 py-4 rounded-full shadow-lg flex items-center gap-2"
              >
                {status === 'loading' ? 'enviando...' : 'enviar >'}
              </motion.button>
            </div>
          </form>
        </div>
      </div>
      
      {/* Elemento Decorativo: Curva SVG que você enviou */}
      <div className="absolute top-0 right-0 w-1/2 opacity-20 pointer-events-none">
         {/* Aqui você pode inserir o SVG da curva que ajustamos no início */}
      </div>
    </footer>
  );
}