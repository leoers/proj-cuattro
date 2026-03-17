'use client';

import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { getRecentPosts, WP_Post } from '../services/wordpress';

export default function BlogCarousel() {
  const [posts, setPosts] = useState<WP_Post[]>([]);
  const [loading, setLoading] = useState(true);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start', skipSnaps: false, duration: 30 }, 
    [Autoplay({ delay: 4000, stopOnInteraction: false })]
  );

  // Busca os posts do WordPress filtrados pela tag "Lift & Learn" (ID: 29)
  useEffect(() => {
    const TAG_ID_LIFT_LEARN = 29; 
    const LIMITE_POSTS = 10;

    getRecentPosts(TAG_ID_LIFT_LEARN, LIMITE_POSTS)
      .then((data) => {
        if (Array.isArray(data)) {
          setPosts(data);
        }
      })
      .catch((err) => console.error("Erro ao carregar posts do WP:", err))
      .finally(() => setLoading(false));
  }, []);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  if (loading) return <div className="h-[400px] flex items-center justify-center text-[#2D2D2D]">Carregando conteúdos...</div>;

  // Se não houver posts com a tag, a seção não aparece para não quebrar o layout
  if (posts.length === 0) return null;

  return (
    <section className="relative z-40 w-full bg-transparent overflow-visible -mt-32">
      <div className="absolute inset-0 top-[150px] bg-white z-0" />

      <div className="max-w-[1750px] mx-auto px-6 relative z-50 pt-10 pb-20">
        <motion.h2 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="text-[#2D2D2D] md:text-white text-3xl font-bold mb-10 ml-2"
        >
          Leia mais sobre:
        </motion.h2>

        <div className="overflow-hidden p-4" ref={emblaRef}>
          <div className="flex gap-8">
            {posts.map((post) => {
              const imageUrl = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/images/placeholder.jpg';
              
              return (
                <div key={post.id} className="flex-[0_0_100%] md:flex-[0_0_22%] min-w-0">
                  {/* Link dinâmico para o post no domínio principal */}
                  <a href={`https://cuattro.live/blog/${post.slug}`} target="_blank" rel="noopener noreferrer" className="block">
                    <div className="relative h-[480px] rounded-[35px] overflow-hidden group bg-zinc-900 shadow-lg transition-transform hover:shadow-2xl">
                      <img 
                        src={imageUrl} 
                        alt={post.title.rendered}
                        className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-700 group-hover:scale-110" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
                      
                      <h3 
                        className="absolute bottom-10 left-8 right-8 text-white font-bold text-xl leading-tight group-hover:text-[#ffee5a] transition-colors"
                        dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                      />
                    </div>
                  </a>
                </div>
              );
            })}
          </div>
        </div>

        {/* Controles de Navegação */}
        <div className="flex justify-center gap-6 mt-12 relative z-50">
          <button 
            onClick={scrollPrev} 
            className="w-14 h-14 rounded-full border-2 border-black/10 flex items-center justify-center text-black hover:bg-[#ffee5a] hover:border-[#ffee5a] transition-all shadow-sm bg-white/80 backdrop-blur-sm"
          >
            <ArrowLeft size={24} />
          </button>
          <button 
            onClick={scrollNext} 
            className="w-14 h-14 rounded-full border-2 border-black/10 flex items-center justify-center text-black hover:bg-[#ffee5a] hover:border-[#ffee5a] transition-all shadow-sm bg-white/80 backdrop-blur-sm"
          >
            <ArrowRight size={24} />
          </button>
        </div>
      </div>
    </section>
  );
}