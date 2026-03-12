// components/FeatureCard.tsx
'use client';
import { motion } from 'framer-motion';

interface FeatureCardProps {
  title: string;
  description: string;
  titleColor?: string;
  delay?: number;
}

export default function FeatureCard({ title, description, titleColor = "#2D2D2D", delay = 0 }: FeatureCardProps) {
  return (
    <motion.div
      // Fade suave na entrada
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      
      // A "firula" do zoom suave ao passar o mouse
      whileHover={{ 
        scale: 1.03, // Aumento leve (zoom)
        y: -5,       // Sobe um pouquinho
        boxShadow: "0px 10px 25px rgba(0,0,0,0.1)" // Sombra fica mais forte
      }}
      className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col h-full cursor-pointer transition-shadow"
    >
      <h3 className="text-xl font-bold mb-3 leading-tight" style={{ color: titleColor }}>
        {title}
      </h3>
      <p className="text-gray-600 text-sm leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
}