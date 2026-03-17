'use client'; 

import { useRef, useState, ReactNode } from 'react';
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

  const handleMouseEnter = () => {
    videoRef.current?.play().catch(() => {});
  };

  const handleMouseLeave = () => {
    videoRef.current?.pause();
    setVideoKey(prev => prev + 1);
  };

  return (
    <div 
      className="group relative h-[560px] w-full min-w-[270px] bg-black rounded-[45px] overflow-hidden cursor-pointer shadow-xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
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
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover object-center opacity-65 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent z-10" />

      {/* AJUSTES FINAIS:
          1. 'pr-14': Aumentei o padding da direita para empurrar o texto para a esquerda.
          2. 'max-w-[190px]': Reduzi drasticamente a largura máxima do texto para ele nunca encostar na direita.
          3. Fontes reduzidas conforme solicitado.
      */}
      <div className="absolute bottom-12 left-10 z-20 text-left text-white pr-14 w-full">
        <h3 className="font-[900] text-[19px] md:text-[17px] leading-[1.1] uppercase tracking-tighter mb-4 flex items-end max-w-[185px] whitespace-pre-line min-h-[50px]">
            {title}
        </h3>
        <p className="text-[14px] md:text-[15px] text-slate-100 leading-[1.4] font-medium max-w-[200px] min-h-[60px] whitespace-pre-line opacity-90">
            {description}
        </p>
      </div>
    </div>
  );
}