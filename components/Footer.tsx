import React from 'react';
import { Facebook, Twitter, Linkedin, Instagram, ArrowUpRight } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black border-t border-white/10 pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start mb-16">
          <div className="mb-10 md:mb-0">
             <div className="text-3xl font-display font-bold tracking-tighter mb-6">NEXUS</div>
             <p className="text-gray-500 max-w-sm">
               Engenharia do impossível. Inovando para um futuro sustentável através de manufatura avançada e logística impulsionada por IA.
             </p>
          </div>
          
          <div className="flex gap-12 md:gap-24">
            <div>
              <h4 className="font-bold text-white mb-6">Explorar</h4>
              <ul className="space-y-4 text-gray-400">
                <li className="hover:text-nexus-accent cursor-pointer transition-colors">Tour Virtual</li>
                <li className="hover:text-nexus-accent cursor-pointer transition-colors">Tecnologia</li>
                <li className="hover:text-nexus-accent cursor-pointer transition-colors">Carreiras</li>
                <li className="hover:text-nexus-accent cursor-pointer transition-colors">Relações com Investidores</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-6">Legal</h4>
              <ul className="space-y-4 text-gray-400">
                <li className="hover:text-nexus-accent cursor-pointer transition-colors">Política de Privacidade</li>
                <li className="hover:text-nexus-accent cursor-pointer transition-colors">Termos de Serviço</li>
                <li className="hover:text-nexus-accent cursor-pointer transition-colors">Certificações ISO</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-gray-600 text-sm">
            © 2024 Nexus Industries Inc. Todos os direitos reservados.
          </div>
          
          <div className="flex gap-6">
            <a href="#" className="text-gray-400 hover:text-white transition-colors"><Linkedin size={20} /></a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors"><Twitter size={20} /></a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors"><Instagram size={20} /></a>
          </div>

          <button className="flex items-center gap-2 text-nexus-accent border-b border-nexus-accent pb-1 hover:text-white hover:border-white transition-colors">
            Baixar Apresentação Corporativa <ArrowUpRight size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;