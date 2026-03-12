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
      // h-full garante que todos ocupem a mesma altura do grid
      className="flex flex-col items-center text-center p-6 cursor-pointer h-full"
    >
      {/* Container de Texto com altura fixa para alinhar os círculos */}
      <div className="flex flex-col mb-10 h-[160px] justify-start">
        <h3 className="text-white font-bold text-2xl mb-3 leading-tight uppercase tracking-tighter">
          {title}
        </h3>
        <p className="text-white/90 text-sm leading-relaxed max-w-[240px] mx-auto">
          {description}
        </p>
      </div>

      {/* Círculo com tamanho fixo */}
      <div className="w-60 h-60 rounded-full bg-white flex items-center justify-center p-6 shadow-2xl relative z-10">
        <img 
          src={imagePath} 
          alt={title} 
          className="w-full h-full object-contain" 
        />
      </div>
    </motion.div>
  );
}