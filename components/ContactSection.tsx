import React, { useState } from 'react';
import { MapPin, Mail, Phone, Plus, Minus } from 'lucide-react';

const FAQ_ITEMS = [
  { q: 'Como o tour físico difere do virtual?', a: 'O tour físico inclui um passeio guiado pelos laboratórios restritos de P&D e uma reunião com nossos engenheiros líderes.' },
  { q: 'Quais certificações a Nexus possui?', a: 'Somos certificados ISO 9001, ISO 14001 e Six Sigma em todas as instalações de produção globais.' },
  { q: 'Vocês oferecem manufatura personalizada?', a: 'Sim, nosso programa "Nexus Flex" permite execuções de manufatura sob medida para parceiros corporativos.' },
];

const ContactSection: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <section className="py-20 bg-nexus-900 relative">
      <div className="container mx-auto px-6 flex flex-col lg:flex-row gap-16">
        
        {/* Form */}
        <div className="w-full lg:w-1/2">
          <h2 className="text-4xl font-display font-bold mb-8">Inicie a Conversa</h2>
          <form className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <input type="text" placeholder="Nome" className="w-full bg-white/5 border border-white/10 rounded-lg p-4 text-white focus:border-nexus-accent focus:outline-none transition-colors" />
              <input type="text" placeholder="Empresa" className="w-full bg-white/5 border border-white/10 rounded-lg p-4 text-white focus:border-nexus-accent focus:outline-none transition-colors" />
            </div>
            <input type="email" placeholder="Endereço de E-mail" className="w-full bg-white/5 border border-white/10 rounded-lg p-4 text-white focus:border-nexus-accent focus:outline-none transition-colors" />
            <select className="w-full bg-nexus-800 border border-white/10 rounded-lg p-4 text-gray-400 focus:border-nexus-accent focus:outline-none transition-colors">
              <option>Selecione o Interesse</option>
              <option>Agendar Visita Física</option>
              <option>Solicitar Orçamento</option>
              <option>Parceria</option>
            </select>
            <textarea rows={4} placeholder="Mensagem" className="w-full bg-white/5 border border-white/10 rounded-lg p-4 text-white focus:border-nexus-accent focus:outline-none transition-colors"></textarea>
            
            <button className="w-full bg-white text-nexus-900 font-bold py-4 rounded-lg hover:bg-nexus-accent transition-colors text-lg">
              Enviar Solicitação
            </button>
          </form>

          <div className="mt-12 flex gap-8">
            <div className="flex items-center gap-3 text-gray-400">
               <div className="p-2 bg-white/5 rounded-full"><MapPin size={18} /></div>
               <span>Vale do Silício, CA</span>
            </div>
            <div className="flex items-center gap-3 text-gray-400">
               <div className="p-2 bg-white/5 rounded-full"><Mail size={18} /></div>
               <span>contato@nexus.inc</span>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="w-full lg:w-1/2">
          <h2 className="text-4xl font-display font-bold mb-8">FAQ</h2>
          <div className="space-y-4">
            {FAQ_ITEMS.map((item, index) => (
              <div key={index} className="border-b border-white/10 pb-4">
                <button 
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex justify-between items-center py-4 text-left hover:text-nexus-accent transition-colors"
                >
                  <span className="font-medium text-lg">{item.q}</span>
                  {openFaq === index ? <Minus size={20} /> : <Plus size={20} />}
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${openFaq === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <p className="text-gray-400 pb-4 pr-8">{item.a}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 p-8 bg-gradient-to-r from-nexus-800 to-nexus-900 rounded-2xl border border-white/5">
             <h4 className="font-bold mb-2">Precisa de assistência imediata?</h4>
             <p className="text-gray-400 mb-4">Nossa equipe de suporte está disponível 24/7 via WhatsApp.</p>
             <button className="text-nexus-accent font-bold hover:underline">Conversar Agora -></button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ContactSection;