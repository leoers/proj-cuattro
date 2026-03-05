// components/PageCurveSmall.tsx
'use client';

import { motion, MotionValue } from 'framer-motion';

interface Props {
  pathLength: MotionValue<number>;
}

export default function PageCurveSmall({ pathLength }: Props) {
  return (
    <svg 
      // Novo ViewBox mais compacto
      viewBox="0 0 1100 400" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-auto" // Mantém proporção
    >
      <defs>
        {/* Mantendo o gradiente dourado original */}
        <linearGradient id="PSgrad_0" x1="0%" x2="0%" y1="100%" y2="0%">
          <stop offset="0%" stopColor="rgb(255,238,89)" stopOpacity="1" />
          <stop offset="100%" stopColor="rgb(229,171,60)" stopOpacity="1" />
        </linearGradient>

        {/* Máscara de revelação */}
        <mask id="scroll-mask-small">
          <motion.path
            // Novo traçado redesenhado para ser compacto
            d="M 50,200 C 100,50, 200,50, 250,150 C 300,250, 200,350, 150,250 C 100,150, 200,50, 300,50 C 500,50, 600,350, 1050,300"
            stroke="white"
            strokeWidth="80" 
            fill="none"
            strokeLinecap="round"
            style={{ pathLength }}
          />
        </mask>
      </defs>

      {/* A forma principal com preenchimento dourado */}
      <path
        // Novo traçado redesenhado para ser compacto
        d="M 50,200 C 100,50, 200,50, 250,150 C 300,250, 200,350, 150,250 C 100,150, 200,50, 300,50 C 500,50, 600,350, 1050,300"
        fill="url(#PSgrad_0)"
        mask="url(#scroll-mask-small)"
      />
    </svg>
  );
}