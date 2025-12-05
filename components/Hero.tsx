import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, ArrowDown, ChevronRight } from 'lucide-react';

interface HeroProps {
  onStartTour: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStartTour }) => {
  const [isMuted, setIsMuted] = useState(true);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const toggleAudio = () => {
    setIsMuted(!isMuted);
    // Ideally, play/pause an <audio> element here
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative h-screen w-full overflow-hidden bg-nexus-900 flex items-center justify-center"
    >
      {/* Dynamic Background simulating 3D/Spline environment */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop" 
          alt="Abstract 3D Background" 
          className="object-cover w-full h-full opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-nexus-900/80 to-nexus-900"></div>
      </div>

      {/* Mouse Follow Light Effect */}
      <div 
        className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(0, 240, 255, 0.1), transparent 40%)`
        }}
      />

      {/* Content */}
      <div className="relative z-20 text-center max-w-4xl px-4">
        <div className="mb-6 flex justify-center">
            <div className="border border-nexus-glass bg-nexus-glass backdrop-blur-md px-4 py-1 rounded-full text-xs font-display tracking-widest uppercase text-nexus-accent">
                Experiência Virtual Nexus Industries
            </div>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold font-display tracking-tight mb-6 leading-tight">
          Explore o Futuro <br /> 
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Por Dentro</span>
        </h1>
        
        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light">
          Um tour totalmente imersivo em nossas instalações de ponta. Descubra como projetamos o amanhã, hoje.
        </p>

        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
          <button 
            onClick={onStartTour}
            className="group relative px-8 py-4 bg-nexus-accent text-nexus-900 font-bold text-lg rounded-full overflow-hidden hover:scale-105 transition-transform duration-300"
          >
            <span className="relative z-10 flex items-center gap-2">
              Iniciar Tour <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
          </button>
          
          <button className="px-8 py-4 border border-white/20 hover:bg-white/10 text-white font-medium text-lg rounded-full backdrop-blur-sm transition-all">
            Falar com Vendas
          </button>
        </div>
      </div>

      {/* UI Controls */}
      <div className="absolute top-8 left-8 z-30 opacity-80 hover:opacity-100 transition-opacity">
        <div className="text-2xl font-display font-bold tracking-tighter">NEXUS</div>
      </div>

      <button 
        onClick={toggleAudio}
        className="absolute bottom-8 right-8 z-30 p-3 rounded-full bg-nexus-glass border border-white/10 hover:bg-white/10 transition-all"
      >
        {isMuted ? <VolumeX className="text-white w-5 h-5" /> : <Volume2 className="text-nexus-accent w-5 h-5" />}
      </button>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 animate-bounce">
        <ArrowDown className="text-white/30 w-6 h-6" />
      </div>
    </div>
  );
};

export default Hero;