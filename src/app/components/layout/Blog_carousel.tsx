'use client';

import React, { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const ARTIGOS = [
  { id: 1, title: "Lift & Learn: como a tecnologia aumenta as vendas no PDV", img: "/images/blog/artigo1.jpg" },
  { id: 2, title: "Experiência no varejo físico: por que informar melhor vende mais", img: "/images/blog/artigo2.jpg" },
  { id: 3, title: "Smart Retail: o futuro das lojas físicas já começou", img: "/images/blog/artigo3.jpg" },
  { id: 4, title: "68% deixam a loja sem comprar por não encontrarem informações", img: "/images/blog/artigo4.jpg" },
  { id: 5, title: "Inovação no Varejo: como se destacar da concorrência", img: "/images/blog/artigo4.jpg" },
];

export default function BlogCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { 
      loop: true,           // Essencial para o giro infinito
      align: 'start', 
      skipSnaps: false, 
      duration: 30 
    }, 
    [
      Autoplay({ 
        delay: 4000, 
        stopOnInteraction: false, 
        playOnInit: true 
      })
    ]
  );

  // FUNÇÕES RESTAURADAS: Forçam o loop do 5º para o 1º slide
  const scrollPrev = useCallback(() => {
    if (emblaApi) {
      if (emblaApi.canScrollPrev()) {
        emblaApi.scrollPrev();
      } else {
        emblaApi.scrollTo(ARTIGOS.length - 1); // Pula para o último se estiver no início
      }
    }
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) {
      if (emblaApi.canScrollNext()) {
        emblaApi.scrollNext();
      } else {
        emblaApi.scrollTo(0); // Pula para o primeiro se estiver no final (Slide 5 -> 1)
      }
    }
  }, [emblaApi]);

  return (
    <section className="relative z-40 w-full bg-transparent overflow-visible -mt-32">
      {/* Fundo branco que começa após a sobreposição para não cortar o degradê */}
      <div className="absolute inset-0 top-[150px] bg-white z-0" />

      <div className="max-w-[1750px] mx-auto px-6 relative z-50 pb-20">
        
        <motion.h2 
          className="text-white text-3xl font-bold mb-10 ml-2 drop-shadow-[0_2px_15px_rgba(0,0,0,0.6)]"
        >
          Leia mais sobre:
        </motion.h2>

        {/* Viewport do Embla */}
        <div className="overflow-hidden p-4" ref={emblaRef}>
          <div className="flex gap-8">
            {ARTIGOS.map((artigo) => (
              <div key={artigo.id} className="flex-[0_0_100%] md:flex-[0_0_22%] min-w-0">
                <div className="relative h-[480px] rounded-[35px] overflow-hidden group bg-zinc-900">
                  <img 
                    src={artigo.img} 
                    alt={artigo.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-85 group-hover:opacity-100 transition-all duration-700 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent" />
                  <h3 className="absolute bottom-10 left-8 right-8 text-white font-bold text-xl leading-tight group-hover:text-[#E5AB3C] transition-colors">
                    {artigo.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Controles com Z-INDEX corrigido para funcionar sobre o fundo transparente */}
        <div className="flex justify-center gap-6 mt-12 relative z-50">
          <button 
            onClick={scrollPrev}
            className="w-14 h-14 rounded-full border-2 border-black/10 flex items-center justify-center text-black hover:bg-black hover:text-white transition-all shadow-sm bg-white/50 backdrop-blur-sm"
          >
            <ArrowLeft size={24} />
          </button>
          <button 
            onClick={scrollNext}
            className="w-14 h-14 rounded-full border-2 border-black/10 flex items-center justify-center text-black hover:bg-black hover:text-white transition-all shadow-sm bg-white/50 backdrop-blur-sm"
          >
            <ArrowRight size={24} />
          </button>
        </div>
      </div>
    </section>
  );
}