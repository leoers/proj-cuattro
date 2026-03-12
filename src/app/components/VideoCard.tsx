'use client'; 

import { useRef, useState, ReactNode } from 'react'; // Importamos ReactNode
import Image from 'next/image';

interface VideoCardProps {
  // Alterado de string para ReactNode para aceitar as quebras de linha (<br />)
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
      className="group relative h-[500px] w-full min-w-[260px] bg-black rounded-[45px] overflow-hidden cursor-pointer shadow-xl transition-all duration-500 hover:shadow-2xl"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="absolute top-10 left-10 z-30 w-10 h-10">
        <Image 
          src={iconPath} 
          // O alt precisa ser string, então fazemos um fallback simples
          alt="Video Card Icon" 
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
            className="absolute inset-0 w-full h-full object-cover object-center opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10" />

      {/* Ajustes: 
          1. 'whitespace-pre-line' ajuda se você usar \n.
          2. Removi o h-[50px] fixo do título ou aumentei para acomodar 2 linhas.
      */}
      <div className="absolute bottom-12 left-7 z-20 text-left text-white pr-10 w-full">
        <h3 className="font-[900] text-[19px] leading-[1.1] uppercase tracking-tighter mb-4 flex items-end max-w-[190px] whitespace-pre-line min-h-[50px]">
            {title}
        </h3>
        <p className="text-[14.5px] text-slate-200 leading-[1.4] font-medium max-w-[220px] min-h-[60px] whitespace-pre-line">
            {description}
        </p>
      </div>
    </div>
  );
}