import React, { useRef } from 'react';
import Hero from './components/Hero';
import VirtualTour from './components/VirtualTour';
import AboutSection from './components/AboutSection';
import StatsSection from './components/StatsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import StickySidebar from './components/StickySidebar';

const App: React.FC = () => {
  const tourRef = useRef<HTMLDivElement>(null);

  const scrollToTour = () => {
    tourRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-nexus-900 min-h-screen text-white selection:bg-nexus-accent selection:text-nexus-900 font-sans">
      <StickySidebar />
      
      <main>
        <Hero onStartTour={scrollToTour} />
        
        <div ref={tourRef}>
          <VirtualTour />
        </div>
        
        <AboutSection />
        
        <section className="py-20 bg-nexus-900 border-y border-white/5">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                        { title: 'Operação 24/7', icon: 'clock' },
                        { title: 'Rastreabilidade Total', icon: 'search' },
                        { title: 'Logística Integrada', icon: 'truck' },
                        { title: 'Automação Escalável', icon: 'cpu' },
                    ].map((item, i) => (
                        <div key={i} className="p-6 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/5 text-center group">
                            <h3 className="font-bold text-lg mb-2 group-hover:text-nexus-accent transition-colors">{item.title}</h3>
                            <p className="text-sm text-gray-500">Padrão líder da indústria.</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        <StatsSection />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
};

export default App;