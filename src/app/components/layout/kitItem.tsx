'use client';
import { motion } from 'framer-motion';

interface KitItemProps {
  title: string;
  description: string;
  imagePath: string;
  delay: number;
}

export default function KitItem({ title, description, imagePath, delay }: KitItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay }}
      whileHover={{ y: -15 }}
      // Card transparente para herdar o fundo laranja e o gradiente do pai
      className="flex flex-col items-center text-center p-6 cursor-pointer h-full relative"
    >
      {/* CONTAINER DE TEXTO */}
      <div className="flex flex-col mb-10 h-[160px] justify-start px-4 md:px-0 relative z-10">
        <h3 className="text-white font-bold text-2xl mb-3 leading-tight uppercase tracking-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
          {title}
        </h3>
        <p className="text-white/95 text-sm leading-relaxed max-w-[240px] mx-auto font-medium drop-shadow-[0_1px_4px_rgba(0,0,0,0.4)]">
          {description}
        </p>
      </div>

      {/* CÍRCULO DO PRODUTO */}
      {/* Removemos o padding (p-8) para que a imagem preencha o círculo se necessário, 
          garantindo o recorte redondo perfeito. */}
      <div className="w-52 h-52 md:w-60 md:h-60 rounded-full bg-white flex items-center justify-center shadow-2xl relative z-10 overflow-hidden">
        <img 
          src={imagePath} 
          alt={title} 
          // MUDANÇAS AQUI:
          // 1. rounded-full: Garante que a imagem seja cortada em círculo.
          // 2. object-cover: Faz a imagem preencher o container sem distorcer, 
          //                  cortando as sobras quadradas.
          className="w-full h-full object-cover rounded-full" 
        />
      </div>
    </motion.div>
  );
}