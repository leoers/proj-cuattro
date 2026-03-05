'use client';

import { motion, useScroll, useSpring } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import VideoCard from '../app/components/VideoCard';
import AnimateCurve from '../app/components/layout/animatecurve';

export default function Home() {
  // Referência para controlar o desenho da curva na Seção 3
  const section3Ref = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: section3Ref,
    // AJUSTE: O traço começa ("start") quando a seção entra na tela ("end")
    // e termina quando o centro da seção chega no topo. Isso faz o traço subir rápido.
    offset: ["start end", "center start"]
  });

  // Suavização do traço para um aspecto mais fluido e premium
  const pathLength = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <main className="min-h-screen">
      {/* 1. HEADER CENTRALIZADO */}
      <header className="w-full flex justify-center items-center px-8 py-10 absolute top-0 z-50">
        <div className="relative w-40 h-12">
          <Image 
            src="/images/ui/logo-cuattro.png" 
            alt="Logo Cuattro" 
            fill 
            className="object-contain"
            priority
          />
        </div>
      </header>

      {/* 2. BLOCO HERO COM DEGRADÊ AJUSTADO */}
      <section className="bg-gradient-to-b from-white from-0% via-[#FFFCE5] via-20% to-[#ffee5a] pt-48 pb-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-[56px] font-[900] text-[#2D2D2D] tracking-tight leading-[1.1] mb-8">
            Transforme cada produto em um <br />
            vendedor digital no ponto de venda!
          </h1>
          
          <p className="text-lg md:text-[22px] text-slate-600 max-w-4xl mx-auto font-medium leading-relaxed mb-12">
            Com a tecnologia Lift & Learn, sua mensagem é entregue ao cliente <br className="hidden md:block" />
            certo, no momento certo, diretamente no ponto de venda.
          </p>

          <h2 className="text-xl font-bold text-slate-800 mb-12 uppercase tracking-widest">
            Veja como funciona:
          </h2>

          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 px-4 -mb-32 relative z-20">
            <VideoCard 
              title="Sensor Inteligente"
              description="Tag inteligente conectada aos produtos da loja."
              videoUrl="/videos/teste.mp4"
              iconPath="/images/ui/icone-sensor.png"
            />
            <VideoCard 
              title="Lift Ação do Cliente"
              description="Cliente levanta o produto, ativando o sistema automaticamente."
              videoUrl="/videos/teste.mp4"
              iconPath="/images/ui/icone-lift.png"
            />
            <VideoCard 
              title="Learn Conteúdo na Tela"
              description="Conteúdo personalizado aparece na tela, instantaneamente."
              videoUrl="/videos/teste.mp4"
              iconPath="/images/ui/icone-learn.png"
            />
            <VideoCard 
              title="Conversão em Vendas"
              description="Mais informação, mais confiança, mais vendas no PDV."
              videoUrl="/videos/teste.mp4"
              iconPath="/images/ui/icone-conversao.png"
            />
          </div>
        </div>
      </section>

      {/* 4. SEÇÃO DE TECNOLOGIA INTERATIVA */}
      <section className="bg-white pt-48 pb-24 px-6 overflow-hidden">
        <motion.div 
          className="max-w-7xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-4xl md:text-[52px] font-[900] text-[#2D2D2D] leading-[1.1] tracking-tighter mb-20 uppercase">
            Tecnologia interativa para <br /> aumentar vendas no varejo
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="flex gap-8">
              <div className="bg-[#ffee5a] rounded-[30px] p-8 flex flex-col justify-between items-center min-w-[160px] h-fit">
                <motion.span initial={{ opacity: 0, scale: 0.5 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }} className="block text-4xl font-[900] text-[#2D2D2D]">+30%</motion.span>
                <motion.span initial={{ opacity: 0, scale: 0.5 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 }} className="block text-4xl font-[900] text-[#2D2D2D] my-12">3x</motion.span>
                <motion.span initial={{ opacity: 0, scale: 0.5 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: 0.7 }} className="block text-4xl font-[900] text-[#2D2D2D]">70%</motion.span>
              </div>

              <div className="flex flex-col justify-between py-2">
                <div>
                  <h4 className="font-bold text-xl text-[#2D2D2D]">de aumento nas vendas</h4>
                  <p className="text-sm text-slate-500 max-w-[300px]">podem ser gerados com o uso de displays digitais e tecnologias interativas no ponto de venda.</p>
                </div>
                <div className="my-8">
                  <h4 className="font-bold text-xl text-[#2D2D2D]">mais atenção</h4>
                  <p className="text-sm text-slate-500 max-w-[300px]">é capturada por telas interativas em comparação à comunicação estática tradicional.</p>
                </div>
                <div>
                  <h4 className="font-bold text-xl text-[#2D2D2D]">das decisões de compra</h4>
                  <p className="text-sm text-slate-500 max-w-[300px]">são influenciadas diretamente no ponto de venda por estímulos visuais e experiência interativa.</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <p className="text-lg text-slate-600 leading-relaxed mb-8">
                O <span className="font-bold text-[#2D2D2D]">Lift & Learn</span> é uma solução de smart retail experience que conecta produtos físicos a conteúdos digitais em tempo real.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed mb-12">
                Ao levantar o produto, o cliente ativa automaticamente uma tela com vídeos, especificações, diferenciais e promoções, sem precisar de QR codes ou aplicativo.
              </p>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="bg-[#FF9D1C] hover:bg-[#e68a10] text-white font-[900] uppercase tracking-widest py-5 px-12 rounded-full w-fit transition-all shadow-lg text-lg">
                saiba mais
              </motion.button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 5. SEÇÃO 3: DORES DO VAREJO - CORREÇÃO COM MÁSCARA */}
      <section ref={section3Ref} className="relative bg-white py-32 px-6 overflow-hidden min-h-screen flex flex-col justify-center">
        
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[90%] md:w-[70%] max-w-7xl z-0 pointer-events-none">
          <AnimateCurve pathLength={pathLength} />
        </div>

        <div className="max-w-7xl mx-auto relative z-10 w-full">
          {/* TÍTULO COM FADE */}
          <motion.h2 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-[64px] font-[900] text-[#2D2D2D] leading-[1] uppercase mb-20 tracking-tighter"
          >
            Clientes perdidos, <br /> vendas perdidas!
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
            <div className="space-y-12">
              {[
                { perc: "67% dos clientes", txt: "saem das lojas sem comprar por não encontrarem o produto desejado", fonte: "Retail TouchPoints" },
                { perc: "82% das decisões", txt: "de compra acontecem no ponto de venda", fonte: "Gitnux" },
                { perc: "71% dos consumidores", txt: "relatam frustração com falta de assistência na loja", fonte: "Poder 360" }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 * index, duration: 0.6 }}
                  className="flex items-start gap-4"
                >
                  <div className="w-4 h-4 rounded-full bg-[#FF9D1C] mt-2 shrink-0" />
                  <div>
                    <p className="text-lg text-slate-600 leading-tight">
                      <span className="font-[900] text-[#2D2D2D]">{item.perc}</span> {item.txt}
                    </p>
                    <span className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mt-1 block">fonte: {item.fonte}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div 
              className="flex flex-col justify-end"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <div className="mb-6">
                <Image src="/images/ui/icone-varejo.png" alt="Ícone" width={40} height={40} />
              </div>
              <blockquote className="text-3xl md:text-[38px] font-medium text-[#2D2D2D] leading-[1.2] italic">
                "O varejo tradicional está perdendo clientes para quem oferece melhor experiência."
              </blockquote>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}