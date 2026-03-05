'use client'; 

import { useRef, useState } from 'react';
import Image from 'next/image';

interface VideoCardProps {
  title: string;
  description: string;
  videoUrl: string;
  iconPath: string;
}

export default function VideoCard({ title, description, videoUrl, iconPath }: VideoCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  // Criamos uma chave que muda para forçar o React a resetar o componente de vídeo
  const [videoKey, setVideoKey] = useState(0);

  const handleMouseEnter = () => {
    videoRef.current?.play().catch(() => {});
  };

  const handleMouseLeave = () => {
    // 1. Pausa o vídeo
    videoRef.current?.pause();
    // 2. Muda a Key: Isso deleta o vídeo atual e coloca um novo no lugar (reset total)
    setVideoKey(prev => prev + 1);
  };

  return (
    <div 
      className="group relative h-[500px] bg-black rounded-[40px] overflow-hidden cursor-pointer shadow-xl transition-all duration-500"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="absolute top-8 left-8 z-30 w-10 h-10">
        <Image 
          src={iconPath} 
          alt={title} 
          width={40} 
          height={40} 
          style={{ height: 'auto' }} // Corrigindo o warning de aspect ratio do seu log
          className="object-contain"
        />
      </div>

      <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
        <video
            key={videoKey} // A mágica acontece aqui
            ref={videoRef}
            src={videoUrl}
            loop
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover object-center opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10" />

      <div className="absolute bottom-10 left-8 z-20 text-left text-white pr-6 w-full">
        <h3 className="font-[900] text-[18px] leading-[1.1] uppercase tracking-tighter mb-4 h-[50px] flex items-end max-w-[180px]">
            {title}
        </h3>
        <p className="text-[14px] text-slate-200 leading-[1.4] font-medium max-w-[210px] min-h-[60px]">
            {description}
        </p>
      </div>
    </div>
  );
}