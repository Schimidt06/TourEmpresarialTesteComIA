import React from 'react';
import { Award, TrendingUp, ShieldCheck } from 'lucide-react';

const TIMELINE = [
  { year: '1995', title: 'Fundação', desc: 'Iniciou como uma empresa boutique de engenharia.' },
  { year: '2005', title: 'Expansão Global', desc: 'Abertura de escritórios na Ásia e Europa.' },
  { year: '2012', title: 'ISO 9001', desc: 'Certificação de qualidade de nível superior.' },
  { year: '2018', title: 'Automação', desc: 'Linha de produção totalmente autônoma v1.' },
  { year: '2023', title: 'Tecnologia Verde', desc: 'Operações certificadas como carbono neutro.' },
];

const AboutSection: React.FC = () => {
  return (
    <section className="py-20 bg-nexus-900 text-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-12 items-center mb-20">
          <div className="w-full md:w-1/2">
             <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">Construído com <span className="text-nexus-accent">Precisão</span></h2>
             <p className="text-gray-400 text-lg leading-relaxed mb-8">
               Por mais de três décadas, a Nexus Industries tem sido o motor silencioso por trás das infraestruturas mais críticas do mundo. Nós não apenas fabricamos; nós inovamos, otimizamos e entregamos excelência em escala.
             </p>
             <div className="flex gap-6">
               <div className="flex items-center gap-2">
                 <Award className="text-nexus-accent" />
                 <span className="font-medium">Líder da Indústria</span>
               </div>
               <div className="flex items-center gap-2">
                 <ShieldCheck className="text-nexus-accent" />
                 <span className="font-medium">Confiabilidade Primeiro</span>
               </div>
             </div>
          </div>
          <div className="w-full md:w-1/2 h-80 relative rounded-2xl overflow-hidden group">
            <img 
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop" 
              alt="Sede da Empresa" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-nexus-900 to-transparent opacity-80"></div>
          </div>
        </div>

        {/* Horizontal Scroll Timeline */}
        <div className="relative">
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-800 -translate-y-1/2"></div>
          <div className="flex overflow-x-auto pb-10 gap-8 hide-scrollbar snap-x">
            {TIMELINE.map((item, index) => (
              <div key={index} className="flex-shrink-0 w-64 snap-center relative pt-8">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-nexus-900 border-4 border-nexus-accent z-10"></div>
                <div className="bg-white/5 p-6 rounded-xl border border-white/5 hover:border-nexus-accent/50 transition-colors backdrop-blur-sm">
                  <span className="text-nexus-accent font-mono font-bold text-xl block mb-2">{item.year}</span>
                  <h4 className="font-bold text-lg mb-2">{item.title}</h4>
                  <p className="text-sm text-gray-400">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;