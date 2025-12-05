import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell } from 'recharts';

const PRODUCTION_DATA = [
  { name: 'T1', output: 4000 },
  { name: 'T2', output: 4500 },
  { name: 'T3', output: 5100 },
  { name: 'T4', output: 5800 },
];

const SATISFACTION_DATA = [
  { name: 'Muito Satisfeito', value: 75 },
  { name: 'Satisfeito', value: 20 },
  { name: 'Neutro', value: 5 },
];

const COLORS = ['#00f0ff', '#0090ff', '#666'];

const StatsSection: React.FC = () => {
  return (
    <section className="py-20 bg-nexus-800">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-display font-bold mb-12 text-center">
          Números que <span className="text-nexus-accent">Impressionam</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Bar Chart */}
          <div className="bg-nexus-900/50 p-8 rounded-2xl border border-white/5">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <div className="w-2 h-8 bg-nexus-accent rounded-full"></div>
              Crescimento Anual de Produção
            </h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={PRODUCTION_DATA}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="name" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#111', borderColor: '#333' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Bar dataKey="output" fill="#00f0ff" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Pie Chart / Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-nexus-900/50 p-6 rounded-2xl border border-white/5 flex flex-col items-center justify-center">
               <h3 className="text-lg font-bold mb-4 text-center">Satisfação do Cliente</h3>
               <div className="h-40 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={SATISFACTION_DATA}
                        innerRadius={40}
                        outerRadius={60}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {SATISFACTION_DATA.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
               </div>
               <div className="text-3xl font-bold text-white mt-2">95%</div>
            </div>

            <div className="grid grid-rows-2 gap-6">
              <div className="bg-nexus-900/50 p-6 rounded-2xl border border-white/5 flex flex-col justify-center">
                <div className="text-gray-400 text-sm uppercase tracking-widest">Eficiência</div>
                <div className="text-4xl font-mono font-bold text-nexus-accent mt-2">+24%</div>
                <div className="text-xs text-gray-500 mt-1">Ano a Ano</div>
              </div>
              <div className="bg-nexus-900/50 p-6 rounded-2xl border border-white/5 flex flex-col justify-center">
                <div className="text-gray-400 text-sm uppercase tracking-widest">Alcance Global</div>
                <div className="text-4xl font-mono font-bold text-white mt-2">120+</div>
                <div className="text-xs text-gray-500 mt-1">Países Atendidos</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;