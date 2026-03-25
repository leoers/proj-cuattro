'use client';

import { motion, useScroll, useSpring } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import Script from 'next/script'; // Importado para integrar o loader do RD
import VideoCard from '../app/components/VideoCard';
import AnimateCurve from '../app/components/layout/animatecurve';
import FeatureCard from '../app/components/layout/featuredCard';
import KitItem from '../app/components/layout/kitItem';
import Carousel from '../app/components/layout/Blog_carousel';
import NewsletterRD from '../app/components/layout/newsletter';
import FooterRD from './components/layout/footer';

export default function Home() {
  // Referência para controlar o desenho da curva na Seção 3
  const section3Ref = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: section3Ref,
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
      {/* INTEGRÇÃO RD STATION: Loader oficial do cliente */}
      <Script 
        src="https://d335luupugsy2.cloudfront.net/js/loader-scripts/f1a378e4-97d0-427e-a74b-21e94286aa54-loader.js" 
        strategy="afterInteractive" 
      />

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
          <h1 className="text-4xl md:text-[56px] font-[700] text-[#2D2D2D] tracking-wide leading-[1.1] mb-8">
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

          <div className="max-w-[1800px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-14 px-6 -mb-32 relative z-20">
            <VideoCard 
              title="SMART TAG"
              description={<>Tag inteligente<br /> conectada aos<br /> produtos da loja.</>}
              videoUrl="/videos/vinho.mp4"
              posterUrl="/images/cases/img1.png" // Ex: /images/posters/capa-vinho.jpg
              iconPath="/images/ui/icone-sensor.png"
            />

            <VideoCard 
              title={<>LIFT:<br />AÇÃO DO CLIENTE</>}
              description="Cliente levanta o produto, ativando o sistema automaticamente."
              videoUrl="/videos/lift.mp4"
              posterUrl="/images/cases/img2.png" // Ex: /images/posters/capa-lift.jpg
              iconPath="/images/ui/icone-lift.png"
            />

            <VideoCard 
              title={<>LEARN:<br />CONTEÚDO NA TELA</>}
              description="Conteúdo personalizado aparece na tela, instantaneamente."
              videoUrl="/videos/learn.mp4"
              posterUrl="/images/cases/img3.png" // Ex: /images/posters/capa-learn.jpg
              iconPath="/images/ui/icone-learn.png"
            />

            <VideoCard 
              title="CONVERSÃO"
              description={<>Conversão<br />em vendas no PDV.</>}
              videoUrl="/videos/vendas.mp4"
              posterUrl="/images/cases/img4.png" // Ex: /images/posters/capa-vendas.jpg
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
          <h2 className="text-4xl md:text-[52px] font-[700] text-[#2D2D2D] leading-[1.1] tracking-wide mb-20 uppercase">
            Tecnologia interativa para <br /> aumentar vendas no varejo
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="flex flex-col gap-10 md:gap-0">
              <div className="flex flex-col md:flex-row items-center md:items-center gap-6 md:gap-8">
                <div className="bg-[#ffee5a] rounded-[30px] md:rounded-none md:rounded-t-[30px] p-6 flex items-center justify-center min-w-[160px] h-[110px] shrink-0">
                  <motion.span initial={{ opacity: 0, scale: 0.5 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }} className="text-4xl font-[700] text-[#2D2D2D]">
                    +30%
                  </motion.span>
                </div>
                <div className="text-center md:text-left">
                  <h4 className="font-bold text-xl text-[#2D2D2D] leading-tight">de aumento nas vendas</h4>
                  <p className="text-sm text-slate-500 max-w-[300px] mt-1">
                    podem ser gerados com o uso de tecnologias interativas.
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-center md:items-center gap-6 md:gap-8">
                <div className="bg-[#ffee5a] rounded-[30px] md:rounded-none p-6 flex items-center justify-center min-w-[160px] h-[110px] shrink-0 md:border-y md:border-black/5">
                  <motion.span initial={{ opacity: 0, scale: 0.5 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 }} className="text-4xl font-[700] text-[#2D2D2D]">
                    3x
                  </motion.span>
                </div>
                <div className="text-center md:text-left">
                  <h4 className="font-bold text-xl text-[#2D2D2D] leading-tight">mais atenção</h4>
                  <p className="text-sm text-slate-500 max-w-[300px] mt-1">
                    capturada por telas interativas no PDV.
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-center md:items-center gap-6 md:gap-8">
                <div className="bg-[#ffee5a] rounded-[30px] md:rounded-none md:rounded-b-[30px] p-6 flex items-center justify-center min-w-[160px] h-[110px] shrink-0">
                  <motion.span initial={{ opacity: 0, scale: 0.5 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: 0.7 }} className="text-4xl font-[700] text-[#2D2D2D]">
                    70%
                  </motion.span>
                </div>
                <div className="text-center md:text-left">
                  <h4 className="font-bold text-xl text-[#2D2D2D] leading-tight">das decisões de compra</h4>
                  <p className="text-sm text-slate-500 max-w-[300px] mt-1">
                    são influenciadas diretamente no ponto de venda.
                  </p>
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
              <motion.a
                href="#footer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#FF9D1C] hover:bg-[#e68a10] text-white font-[700] uppercase tracking-widest py-5 px-12 rounded-full w-fit transition-all shadow-lg text-lg inline-block text-center cursor-pointer"
              >
                saiba mais
              </motion.a>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 5. SEÇÃO 3: DORES DO VAREJO */}
      <section ref={section3Ref} className="relative bg-white py-32 px-6 overflow-hidden min-h-screen flex flex-col justify-center">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[90%] md:w-[70%] max-w-7xl z-0 pointer-events-none">
          <AnimateCurve pathLength={pathLength} />
        </div>

        <div className="max-w-7xl mx-auto relative z-10 w-full">
          <motion.h2 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-[64px] font-[700] text-[#2D2D2D] leading-[1] uppercase mb-20 tracking-wide"
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
                      <span className="font-[700] text-[#2D2D2D]">{item.perc}</span> {item.txt}
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

      {/* SEÇÃO: POR QUE INVESTIR NA CUATTRO? */}
      <section className="bg-[#F8F9FA] py-24 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative mb-16 flex items-center justify-between w-full">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex-1"
            >
              <h2 className="text-4xl md:text-5xl text-[#2D2D2D] leading-[1.1] uppercase">
                Por que investir na <br />
                <span className="font-medium text-black">Cuattro</span>{" "} 
                <span className="font-black font-[700]">Lift & Learn?</span>
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="ml-4 shrink-0"
            >
              <img 
                src="/images/ui/icone-investir.png" 
                alt="Ícone de Performance"
                className="w-16 h-auto md:w-24 object-contain" 
              />
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard title="Sem obras!" description="Instalação simples e rápida para educar o consumidor de forma autônoma." delay={0.1} />
            <FeatureCard title="Escalabilidade" description="Para 1 ou centenas de lojas, sem aumento de equipe com gestão centralizada." titleColor="#E5AB3C" delay={0.2} />
            <FeatureCard title="Métricas reais" description="Comparação de tempo de interação com produto, dados demográficos e mais!" titleColor="#00D2A0" delay={0.3} />
            <FeatureCard title="Gestão de Mídia" description="Comunicação ultra personalizada, geolocalizada por produto, categoria..." titleColor="#A855F7" delay={0.4} />
            <FeatureCard title="Descomplique!" description="Ideal para produtos complexos, lançamentos e venda consultiva." titleColor="#E5AB3C" delay={0.5} />
            <FeatureCard title="+Engajamento" description="Maior retenção de atenção e interação com produto gerando curiosidade." titleColor="#2563EB" delay={0.6} />
            <FeatureCard title="Físico + Digital" description="QR codes que levam para reviews, vídeos, cadastros, WhatsApp e venda on-line." titleColor="#EF4444" delay={0.7} />
            <FeatureCard title="Validada" description="Tecnologia validada por grandes marcas globais e performance comprovada!" delay={0.8} />
          </div>
        </div>
      </section>

      {/* SEÇÃO KIT LIFT & LEARN */}
      <section className="py-24 relative overflow-visible flex flex-col items-center bg-gradient-to-b from-[#E5AB3C] from-0% via-[#E5AB3C] via-90% to-transparent to-100%">
        <div className="relative z-20 mb-16 text-center">
          <h2 className="text-white text-3xl font-light uppercase tracking-[0.2em]">
            TECNOLOGIA <span className="font-black">Lift & Learn</span>
          </h2>
        </div>

        <div 
          className="absolute inset-0 top-[100px] z-0 overflow-hidden"
          style={{
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, transparent 20%, black 30%, black 70%, transparent 100%)',
            maskImage: 'linear-gradient(to bottom, transparent 0%, transparent 20%, black 30%, black 70%, transparent 100%)'
          }}
        >
          <div className="relative w-full h-full">
            <img 
              src="/images/cases/kit-lift-bg.png" 
              alt="Background Loja"
              className="w-full h-full object-cover opacity-40 mix-blend-multiply relative -z-10" 
            />
            <div className="absolute inset-0 shadow-[inset_0_250px_150px_-20px_#E5AB3C,inset_0_-120px_100px_-20px_#E5AB3C]" />
          </div>
        </div>

        <div className="max-w-[1750px] mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10 items-stretch w-full">
          <KitItem title="SMART TAGS WIRELESS ADICIONAIS" description="Tags wireless. Uso 24/7 com bateria que dura 2 anos" imagePath="/images/cases/tampa-sensor.png" delay={0.1} />
          <KitItem title="SMART TRIGGER" description="Aciona conteúdos na tela com base em interações dos produtos" imagePath="/images/cases/usb.gif" delay={0.1} />
          <KitItem title="Media Player" description="1 M de Cabo Fornecido. Dimensão: 80×30×19 mm" imagePath="/images/cases/media-player.png" delay={0.1} />
          <KitItem title="SMART TAGS ADICIONAIS" description="Até 50 tags reutilizáveis por cada controle. É só plugar e ligar!" imagePath="/images/cases/wireless.gif" delay={0.1} />
        </div>
      </section>

      {/* <section>
        <Carousel />
      </section> */}

      {/* COMPONENTES DE CONVERSÃO RD STATION */}
      <NewsletterRD />
      <section id="footer">
        <FooterRD />
      </section>
    </main>
  );
}