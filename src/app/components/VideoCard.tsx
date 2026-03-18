'use client'; 

import { useRef, useState, ReactNode, useEffect } from 'react';
import Image from 'next/image';

interface VideoCardProps {
  title: ReactNode; 
  description: ReactNode; 
  videoUrl: string;
  iconPath: string;
}

export default function VideoCard({ title, description, videoUrl, iconPath }: VideoCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoKey, setVideoKey] = useState(0);

  // Função para dar play no hover ou toque
  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  // Função para pausar e resetar ao tirar o mouse
  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      // Voltamos para o início para manter a "capa" estática
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div 
      className="group relative h-[560px] w-full min-w-[270px] bg-black rounded-[45px] overflow-hidden cursor-pointer shadow-xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleMouseEnter} // Suporte para toque no celular
    >
      {/* Ícone */}
      <div className="absolute top-12 left-10 z-30 w-12 h-12">
        <Image 
          src={iconPath} 
          alt="Video Card Icon" 
          width={48} 
          height={48} 
          style={{ height: 'auto' }} 
          className="object-contain"
        />
      </div>

      <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
        <video
            key={videoKey}
            ref={videoRef}
            src={videoUrl}
            loop
            muted
            playsInline
            /* @ts-ignore */
            webkit-playsinline="true"
            preload="auto"
            // O segredo: onLoadedData garante que o vídeo carregue o frame e pare
            onLoadedData={(e) => {
              e.currentTarget.pause();
            }}
            className="absolute inset-0 w-full h-full object-cover object-center opacity-65 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent z-10" />

      {/* TEXTOS */}
      <div className="absolute bottom-12 left-10 z-20 text-left text-white pr-14 w-full">
        <h3 className="font-[700] text-[19px] md:text-[18px] leading-[1.1] uppercase tracking-tighter mb-4 flex items-end max-w-[185px] whitespace-pre-line min-h-[50px]">
            {title}
        </h3>
        <p className="text-[14px] md:text-[15px] text-slate-100 leading-[1.4] font-medium max-w-[200px] min-h-[60px] whitespace-pre-line opacity-90">
            {description}
        </p>
      </div>
    </div>
  );
}