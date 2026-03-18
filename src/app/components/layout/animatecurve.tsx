'use client';

import { motion, MotionValue } from 'framer-motion';

interface Props {
  pathLength: MotionValue<number>;
}

export default function PageCurveSmall({ pathLength }: Props) {
  return (
    /* A classe -mx-[50vw] e left-1/2 faz com que o elemento ignore o container pai 
       e ocupe exatamente 100% da largura da tela do navegador (viewport).
    */
    <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen overflow-visible h-[300px] md:h-[400px]">
      <svg 
        viewBox="0 0 1100 400" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="w-full h-full block" 
      >
        <defs>
          <linearGradient id="PSgrad_0" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgb(255,238,89)" stopOpacity="1" />
            <stop offset="100%" stopColor="rgb(229,171,60)" stopOpacity="1" />
          </linearGradient>
        </defs>

        <motion.path
          /**
           * TRAÇADO CORRIGIDO:
           * Agora o movimento faz: Início -> Sobe -> Volta por cima (laço) -> Desce -> Segue Direita.
           * Iniciamos em x=-100 e terminamos em x=1200 para garantir que "cole" nas bordas.
           */
          d="M -100,250 C 100,250 250,250 350,150 C 450,0 600,0 550,200 C 500,350 350,350 450,200 C 550,50 850,220 1200,220"
          stroke="url(#PSgrad_0)"
          strokeWidth="24" 
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ pathLength }}
        />
      </svg>
    </div>
  );
}