import React, { useState, useEffect, useCallback } from 'react';
import { Settings, Cpu, Package, Truck, Users, LayoutDashboard, X, Bot, ChevronRight, ChevronLeft, Headphones } from 'lucide-react';
import { Sector, TourMode } from '../types';
import { explainSector } from '../services/geminiService';

const SECTORS: Sector[] = [
  {
    id: 'eng',
    name: 'Engenharia Avançada',
    description: 'Onde conceitos se tornam projetos. Nossa equipe de engenharia utiliza simulação CAD de nível aeroespacial.',
    metrics: [{ label: 'Projetos', value: '140+' }, { label: 'Patentes', value: '55' }],
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop',
    coordinates: { top: '30%', left: '20%' },
    iconName: 'Settings'
  },
  {
    id: 'rnd',
    name: 'Tecnologia & P&D',
    description: 'O cérebro da Nexus. Pesquisa em computação quântica e laboratórios de ciência dos materiais.',
    metrics: [{ label: 'Orçamento', value: 'R$ 60M' }, { label: 'Cientistas', value: '45' }],
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=2070&auto=format&fit=crop',
    coordinates: { top: '25%', left: '60%' },
    iconName: 'Cpu'
  },
  {
    id: 'prod',
    name: 'Produção Inteligente',
    description: 'Linhas de montagem totalmente automatizadas operando 24/7 com 99,9% de tempo de atividade.',
    metrics: [{ label: 'Prod. Diária', value: '5k Unid.' }, { label: 'Automação', value: '98%' }],
    // Updated image URL to a working one (Robotic Arm/Automation)
    image: 'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?q=80&w=2070&auto=format&fit=crop',
    coordinates: { top: '60%', left: '40%' },
    iconName: 'Package'
  },
  {
    id: 'log',
    name: 'Logística Global',
    description: 'Otimização de rotas via IA garante entrega para 120 países.',
    metrics: [{ label: 'Frota', value: '200+' }, { label: 'No Prazo', value: '99,8%' }],
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop',
    coordinates: { top: '75%', left: '70%' },
    iconName: 'Truck'
  },
  {
    id: 'admin',
    name: 'Sede Administrativa',
    description: 'O sistema nervoso central. Estratégia executiva e controle de operações globais.',
    metrics: [{ label: 'Equipe Global', value: '1.2k' }, { label: 'Escritórios', value: '12' }],
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop',
    coordinates: { top: '45%', left: '85%' },
    iconName: 'LayoutDashboard'
  }
];

const IconMap: Record<string, React.ReactNode> = {
  Settings: <Settings className="w-6 h-6" />,
  Cpu: <Cpu className="w-6 h-6" />,
  Package: <Package className="w-6 h-6" />,
  Truck: <Truck className="w-6 h-6" />,
  Users: <Users className="w-6 h-6" />,
  LayoutDashboard: <LayoutDashboard className="w-6 h-6" />,
};

const VirtualTour: React.FC = () => {
  const [activeSector, setActiveSector] = useState<Sector | null>(null);
  const [mode, setMode] = useState<TourMode>(TourMode.IMMERSIVE);
  const [currentStep, setCurrentStep] = useState(0);
  const [aiAnalysis, setAiAnalysis] = useState<string>("");
  const [isLoadingAi, setIsLoadingAi] = useState(false);

  const toggleMode = useCallback((newMode: TourMode) => {
    window.speechSynthesis.cancel();
    setMode(newMode);
    
    if (newMode === TourMode.GUIDED) {
      setCurrentStep(0);
      setActiveSector(SECTORS[0]);
    } else {
      setActiveSector(null);
    }
  }, []);

  const handleNextStep = useCallback(() => {
    if (currentStep < SECTORS.length - 1) {
      const next = currentStep + 1;
      setCurrentStep(next);
      setActiveSector(SECTORS[next]);
    } else {
      // End of tour
      toggleMode(TourMode.IMMERSIVE);
    }
  }, [currentStep, toggleMode]);

  const handlePrevStep = useCallback(() => {
    if (currentStep > 0) {
      const prev = currentStep - 1;
      setCurrentStep(prev);
      setActiveSector(SECTORS[prev]);
    }
  }, [currentStep]);

  // Stop speech on unmount
  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  // Guided Mode: Narrator Effect
  useEffect(() => {
    if (mode === TourMode.GUIDED && activeSector) {
      window.speechSynthesis.cancel();
      
      let isCancelled = false;
      const text = `Setor ${currentStep + 1}: ${activeSector.name}. ${activeSector.description}`;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'pt-BR';
      utterance.rate = 1.1; // Slightly faster for better pacing
      
      // Attempt to select a better voice if available
      const voices = window.speechSynthesis.getVoices();
      const ptVoice = voices.find(v => v.lang.includes('pt-BR'));
      if (ptVoice) utterance.voice = ptVoice;

      utterance.onend = () => {
        if (!isCancelled) {
          // Small delay before advancing for better user experience
          setTimeout(() => {
             if (!isCancelled) {
                 handleNextStep();
             }
          }, 1500);
        }
      };

      window.speechSynthesis.speak(utterance);

      return () => {
        isCancelled = true;
        window.speechSynthesis.cancel();
      };
    }
  }, [activeSector, mode, currentStep, handleNextStep]);

  const handleSpotClick = (sector: Sector) => {
    if (mode === TourMode.GUIDED) {
      // In Guided mode, clicking a spot jumps to that step in the sequence
      const index = SECTORS.findIndex(s => s.id === sector.id);
      if (index !== -1) {
        setCurrentStep(index);
        setActiveSector(sector);
      }
    } else {
      setActiveSector(sector);
      setAiAnalysis(""); 
    }
  };

  const handleAskAI = async () => {
    if (!activeSector) return;
    setIsLoadingAi(true);
    const result = await explainSector(activeSector.name, activeSector.description);
    setAiAnalysis(result);
    setIsLoadingAi(false);
  };

  return (
    <section id="tour" className="relative w-full h-[90vh] bg-nexus-800 overflow-hidden border-y border-white/5">
      {/* 3D Viewport Placeholder / Map */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-40 grayscale hover:grayscale-0 transition-all duration-1000 transform scale-105"></div>
      
      {/* Grid Overlay for "Blueprint" feel */}
      <div className="absolute inset-0" 
           style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>

      {/* Header & Mode Controls */}
      <div className="absolute top-8 left-8 z-30 flex flex-col gap-4 max-w-md">
        <div>
            <h2 className="text-3xl font-display font-bold text-white mb-2">Visão Geral da Instalação</h2>
            <p className="text-gray-400">
                {mode === TourMode.GUIDED 
                    ? `Tour Guiado: Passo ${currentStep + 1} de ${SECTORS.length}` 
                    : "Selecione um ponto para inspecionar as operações."}
            </p>
        </div>

        <div className="bg-nexus-900/80 backdrop-blur border border-white/10 p-1 rounded-full inline-flex w-fit shadow-lg">
            <button 
                onClick={() => toggleMode(TourMode.IMMERSIVE)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${mode === TourMode.IMMERSIVE ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white'}`}
            >
                Imersivo 3D
            </button>
            <button 
                onClick={() => toggleMode(TourMode.GUIDED)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${mode === TourMode.GUIDED ? 'bg-nexus-accent text-nexus-900 shadow-[0_0_15px_rgba(0,240,255,0.4)]' : 'text-gray-400 hover:text-white'}`}
            >
                <Headphones size={16} /> Tour Guiado
            </button>
        </div>
      </div>

      {/* Hotspots */}
      <div className="absolute inset-0 z-20">
        {SECTORS.map((sector, index) => {
          const isGuidedActive = mode === TourMode.GUIDED && currentStep === index;
          return (
            <button
              key={sector.id}
              onClick={() => handleSpotClick(sector)}
              className="absolute group transform -translate-x-1/2 -translate-y-1/2"
              style={{ top: sector.coordinates.top, left: sector.coordinates.left }}
            >
              <div className="relative flex items-center justify-center">
                {/* Ping effect - Always active for current step in guided mode */}
                <div 
                  className={`w-4 h-4 rounded-full absolute transition-all duration-300
                    ${isGuidedActive 
                      ? 'bg-nexus-accent animate-ping opacity-75 scale-150' 
                      : 'bg-nexus-accent animate-ping opacity-50'}`}
                ></div>
                
                {/* Main Dot - Enhanced glow for guided mode */}
                <div 
                  className={`w-4 h-4 rounded-full relative z-10 border-2 transition-all duration-500 ease-out
                    ${isGuidedActive 
                      ? 'bg-white border-nexus-accent scale-150 shadow-[0_0_40px_rgba(0,240,255,0.9)] ring-4 ring-nexus-accent/40' 
                      : 'bg-nexus-accent border-white shadow-[0_0_20px_rgba(0,240,255,0.6)] group-hover:scale-125'}`}
                ></div>
                
                {/* Tooltip - Always visible for active step in guided mode */}
                <div 
                  className={`absolute top-8 transition-all duration-300 bg-black/80 backdrop-blur text-white text-xs px-3 py-1 rounded border border-nexus-accent whitespace-nowrap z-20
                    ${isGuidedActive 
                      ? 'opacity-100 translate-y-2 scale-110 shadow-[0_0_15px_rgba(0,240,255,0.3)]' 
                      : 'opacity-0 translate-y-0 group-hover:opacity-100 group-hover:translate-y-2'}`}
                >
                  {sector.name}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Detail Sidebar Overlay */}
      {activeSector && (
        <div className="absolute top-0 right-0 h-full w-full md:w-[500px] bg-nexus-900/95 backdrop-blur-xl border-l border-white/10 z-40 p-8 shadow-2xl transition-transform duration-500 ease-out overflow-y-auto flex flex-col">
          <button 
            onClick={() => mode === TourMode.GUIDED ? toggleMode(TourMode.IMMERSIVE) : setActiveSector(null)}
            className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-colors z-50"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="mt-8 flex-1">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-nexus-accent/10 text-nexus-accent text-sm font-mono mb-4 border border-nexus-accent/20">
              {IconMap[activeSector.iconName]}
              ID SETOR: {activeSector.id.toUpperCase()}
            </span>
            
            <h3 className="text-4xl font-display font-bold mb-4">{activeSector.name}</h3>
            
            <div className="w-full h-48 rounded-lg overflow-hidden mb-6 border border-white/10 bg-nexus-800">
              <img 
                src={activeSector.image} 
                alt={activeSector.name} 
                className="w-full h-full object-cover" 
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop";
                }}
              />
            </div>

            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              {activeSector.description}
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {activeSector.metrics.map((m, i) => (
                <div key={i} className="bg-white/5 p-4 rounded-lg border border-white/5">
                  <div className="text-nexus-accent text-2xl font-bold font-mono">{m.value}</div>
                  <div className="text-gray-500 text-xs uppercase tracking-wider">{m.label}</div>
                </div>
              ))}
            </div>

            {/* AI Integration */}
            <div className="bg-gradient-to-br from-indigo-900/40 to-purple-900/40 p-6 rounded-xl border border-indigo-500/30">
              <div className="flex items-center gap-2 mb-4">
                <Bot className="w-5 h-5 text-indigo-400" />
                <h4 className="font-semibold text-indigo-100">Insights da Nexus AI</h4>
              </div>
              
              {!aiAnalysis && !isLoadingAi && (
                <button 
                  onClick={handleAskAI}
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors font-medium flex items-center justify-center gap-2"
                >
                  Analisar Eficiência do Setor
                </button>
              )}

              {isLoadingAi && (
                <div className="flex items-center gap-2 text-indigo-300 animate-pulse">
                  <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce delay-100"></div>
                  <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce delay-200"></div>
                  Processando...
                </div>
              )}

              {aiAnalysis && (
                <div className="prose prose-invert prose-sm">
                  <p className="text-indigo-100 italic">"{aiAnalysis}"</p>
                </div>
              )}
            </div>
          </div>

          {/* Guided Tour Controls */}
          {mode === TourMode.GUIDED && (
             <div className="mt-6 pt-6 border-t border-white/10">
                <div className="flex items-center justify-between mb-4">
                    <span className="text-xs text-gray-400 uppercase tracking-widest">Controles do Guia</span>
                    <span className="text-xs text-nexus-accent font-mono">{currentStep + 1} / {SECTORS.length}</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                    <button 
                        onClick={handlePrevStep}
                        disabled={currentStep === 0}
                        className="p-3 rounded-full bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                        title="Anterior"
                    >
                        <ChevronLeft size={20} />
                    </button>

                    <div className="flex-1 flex gap-1 justify-center">
                        {SECTORS.map((_, idx) => (
                            <div 
                                key={idx} 
                                className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentStep ? 'w-8 bg-nexus-accent shadow-[0_0_10px_rgba(0,240,255,0.5)]' : 'w-2 bg-white/10'}`} 
                            />
                        ))}
                    </div>

                    <button 
                        onClick={handleNextStep}
                        className="px-6 py-3 bg-nexus-accent text-nexus-900 rounded-lg font-bold hover:bg-white transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(0,240,255,0.3)] hover:shadow-[0_0_20px_rgba(0,240,255,0.6)]"
                    >
                        {currentStep === SECTORS.length - 1 ? 'Concluir' : 'Próximo'} <ChevronRight size={18} />
                    </button>
                </div>
             </div>
          )}
        </div>
      )}
    </section>
  );
};

export default VirtualTour;