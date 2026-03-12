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
      className="group relative h-[500px] w-full w-full min-w-[260px] bg-black rounded-[45px] overflow-hidden cursor-pointer shadow-xl transition-all duration-500 hover:shadow-2xl"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* ÍCONE: Ajustado para top-10 e left-10 para dar mais respiro lateral */}
      <div className="absolute top-10 left-10 z-30 w-10 h-10">
        <Image 
          src={iconPath} 
          alt={title} 
          width={40} 
          height={40} 
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
            // Mantivemos o hover scale para a "firula" visual
            className="absolute inset-0 w-full h-full object-cover object-center opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10" />

      {/* TEXTO: Ajustado bottom-12 e left-10 para alinhar com o ganho de tamanho */}
      <div className="absolute bottom-12 left-10 z-20 text-left text-white pr-6 w-full">
        <h3 className="font-[900] text-[19px] leading-[1.1] uppercase tracking-tighter mb-4 h-[50px] flex items-end max-w-[180px]">
            {title}
        </h3>
        <p className="text-[14.5px] text-slate-200 leading-[1.4] font-medium max-w-[220px] min-h-[60px]">
            {description}
        </p>
      </div>
    </div>
  );
}