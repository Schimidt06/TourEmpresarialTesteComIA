import React from 'react';
import { MessageCircle, Calendar, Phone } from 'lucide-react';

const StickySidebar: React.FC = () => {
  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex fixed right-0 top-1/2 -translate-y-1/2 z-50 flex-col gap-4 p-2 bg-nexus-900/80 backdrop-blur-md border-l border-y border-white/10 rounded-l-xl shadow-2xl w-20 hover:w-64 transition-all duration-300 group overflow-hidden">
        <div className="flex flex-col gap-6 py-4">
          
          <div className="flex items-center gap-4 px-3 cursor-pointer hover:bg-white/5 rounded-lg p-2 transition-colors">
            <div className="min-w-[40px] h-10 flex items-center justify-center bg-nexus-accent text-nexus-900 rounded-full font-bold">
              <MessageCircle size={20} />
            </div>
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap font-medium text-white">
              Solicitar Orçamento
            </span>
          </div>

          <div className="flex items-center gap-4 px-3 cursor-pointer hover:bg-white/5 rounded-lg p-2 transition-colors">
            <div className="min-w-[40px] h-10 flex items-center justify-center bg-white/10 text-white rounded-full">
              <Calendar size={20} />
            </div>
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap font-medium text-gray-300">
              Agendar Visita
            </span>
          </div>

           <div className="flex items-center gap-4 px-3 cursor-pointer hover:bg-white/5 rounded-lg p-2 transition-colors">
            <div className="min-w-[40px] h-10 flex items-center justify-center bg-green-500/20 text-green-400 rounded-full">
              <Phone size={20} />
            </div>
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap font-medium text-gray-300">
              Falar com Vendas
            </span>
          </div>

        </div>
      </div>

      {/* Mobile Bottom Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-nexus-900 border-t border-white/10 p-4 flex justify-around backdrop-blur-lg">
         <button className="flex flex-col items-center gap-1 text-xs text-nexus-accent">
           <MessageCircle size={20} />
           <span>Orçamento</span>
         </button>
         <button className="flex flex-col items-center gap-1 text-xs text-white">
           <Calendar size={20} />
           <span>Visita</span>
         </button>
         <button className="flex flex-col items-center gap-1 text-xs text-white">
           <Phone size={20} />
           <span>Ligar</span>
         </button>
      </div>
    </>
  );
};

export default StickySidebar;