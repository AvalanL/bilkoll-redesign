import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { TrendingUp, Bell, ChevronRight, Info, Zap, Mail, ArrowRight, Activity, DollarSign, Star, Shield } from 'lucide-react';
import { motion } from 'motion/react';

const mockData = [
  { name: '150-200k', count: 12, color: '#F4F4F5' },
  { name: '200-250k', count: 45, color: '#F4F4F5' },
  { name: '250-300k', count: 86, color: '#F4F4F5' },
  { name: '300-350k', count: 124, color: '#FF6321' },
  { name: '350-400k', count: 64, color: '#F4F4F5' },
  { name: '400-450k', count: 23, color: '#F4F4F5' },
  { name: '450k+', count: 8, color: '#F4F4F5' },
];

export default function MarketPage() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubscribed(true);
  };

  return (
    <div className="bg-white min-h-screen pb-32 selection:bg-accent selection:text-white">
      {/* Market Header */}
      <section className="relative pt-32 pb-20 overflow-hidden border-b border-zinc-100">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-accent/5 rounded-full blur-[120px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="micro-label text-accent mb-8">Marknadsanalys</div>
              <h1 className="text-6xl md:text-8xl font-light text-black mb-10 tracking-tighter leading-[0.9]">
                Förstå <span className="font-bold italic serif">värdet</span> på <br />bilmarknaden.
              </h1>
              <p className="text-xl md:text-2xl text-zinc-500 font-light leading-relaxed mb-12">
                Vi analyserar tusentals annonser dagligen för att ge dig den mest pricksäkra värderingen i Sverige.
              </p>
            </motion.div>

            {/* Selectors */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex flex-col sm:flex-row gap-4 max-w-3xl"
            >
              <div className="flex-1 grid grid-cols-3 gap-4">
                <select className="bg-zinc-50 border-2 border-zinc-100 rounded-2xl px-6 py-4 text-sm font-medium focus:outline-none focus:border-accent transition-all">
                  <option>Volvo</option>
                  <option>Volkswagen</option>
                  <option>Toyota</option>
                </select>
                <select className="bg-zinc-50 border-2 border-zinc-100 rounded-2xl px-6 py-4 text-sm font-medium focus:outline-none focus:border-accent transition-all">
                  <option>XC60</option>
                  <option>V60</option>
                  <option>XC40</option>
                </select>
                <select className="bg-zinc-50 border-2 border-zinc-100 rounded-2xl px-6 py-4 text-sm font-medium focus:outline-none focus:border-accent transition-all">
                  <option>2020</option>
                  <option>2019</option>
                  <option>2018</option>
                </select>
              </div>
              <button className="bg-black text-white px-10 py-4 rounded-2xl font-bold hover:bg-accent transition-all duration-500">Uppdatera</button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Stats & Chart */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Chart Section */}
            <div className="lg:col-span-2 space-y-12">
              <div className="card p-12">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-6">
                  <div>
                    <h3 className="text-sm font-bold text-black uppercase tracking-widest mb-2">Prisfördelning</h3>
                    <p className="text-zinc-400 font-light">Volvo XC60 2020 • 362 annonser just nu</p>
                  </div>
                  <div className="bg-accent/5 text-accent px-6 py-3 rounded-2xl text-sm font-bold uppercase tracking-widest border border-accent/10">
                    Snittpris: 312 500 kr
                  </div>
                </div>

                <div className="h-[400px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={mockData} onMouseMove={(state) => {
                      if (state.activeTooltipIndex !== undefined) setHoveredBar(state.activeTooltipIndex);
                    }} onMouseLeave={() => setHoveredBar(null)}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F4F4F5" />
                      <XAxis 
                        dataKey="name" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: '#A1A1AA', fontSize: 12, fontWeight: 500 }}
                        dy={15}
                      />
                      <YAxis hide />
                      <Tooltip 
                        cursor={{ fill: 'transparent' }}
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            return (
                              <div className="bg-black text-white px-6 py-3 rounded-xl shadow-2xl border border-white/10 backdrop-blur-xl">
                                <div className="text-[10px] font-bold uppercase tracking-widest mb-1 opacity-60">Antal bilar</div>
                                <div className="text-xl font-bold">{payload[0].value} st</div>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Bar dataKey="count" radius={[12, 12, 0, 0]}>
                        {mockData.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={index === hoveredBar ? '#FF6321' : entry.color}
                            style={{ transition: 'fill 0.3s ease' }}
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* AI Market Analysis */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="card p-10 bg-zinc-50 border-none group"
                >
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 transition-transform">
                    <TrendingUp className="text-emerald-500" />
                  </div>
                  <h4 className="text-xl font-bold text-black mb-4 tracking-tight">Stigande efterfrågan</h4>
                  <p className="text-zinc-500 font-light leading-relaxed">
                    Efterfrågan på laddhybrider har ökat med <span className="text-emerald-600 font-bold">12%</span> senaste månaden.
                  </p>
                </motion.div>

                <motion.div 
                  whileHover={{ y: -5 }}
                  className="card p-10 bg-zinc-50 border-none group"
                >
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 transition-transform">
                    <Activity className="text-blue-500" />
                  </div>
                  <h4 className="text-xl font-bold text-black mb-4 tracking-tight">Snabba affärer</h4>
                  <p className="text-zinc-500 font-light leading-relaxed">
                    Genomsnittlig annonstid är nu <span className="text-blue-600 font-bold">14 dagar</span>, vilket är lägre än snittet.
                  </p>
                </motion.div>
              </div>
            </div>

            {/* Sidebar Widgets */}
            <div className="space-y-10">
              
              {/* Price Alert Widget */}
              <div className="card p-10 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-accent/10 transition-colors"></div>
                
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-accent rounded-2xl flex items-center justify-center shadow-lg shadow-accent/20">
                    <Bell className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-black tracking-tight">Prisbevakning</h3>
                </div>
                <p className="text-zinc-500 font-light mb-8 leading-relaxed">
                  Få ett mail när snittpriset för <span className="text-black font-medium">Volvo XC60 2020</span> ändras med mer än 2%.
                </p>
                
                {subscribed ? (
                  <div className="bg-accent/5 text-accent p-6 rounded-2xl text-sm font-bold uppercase tracking-widest text-center border border-accent/10">
                    Bevakning aktiverad
                  </div>
                ) : (
                  <form onSubmit={handleSubscribe} className="space-y-4">
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                      <input 
                        type="email" 
                        placeholder="Din e-postadress" 
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-zinc-50 border-2 border-zinc-100 rounded-2xl pl-12 pr-4 py-4 focus:outline-none focus:border-accent text-sm transition-all"
                      />
                    </div>
                    <button type="submit" className="w-full bg-black text-white py-4 rounded-2xl font-bold hover:bg-accent transition-all duration-500">
                      Starta gratis bevakning
                    </button>
                  </form>
                )}
              </div>

              {/* Premium CTA */}
              <div className="card p-10 bg-black text-white relative overflow-hidden group shadow-2xl">
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-accent/30 transition-colors"></div>
                
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center shadow-lg shadow-accent/20">
                    <Zap className="text-white w-5 h-5" fill="white" />
                  </div>
                  <span className="text-[10px] font-bold text-accent uppercase tracking-widest">Premium Insights</span>
                </div>
                <h3 className="text-2xl font-light mb-4 tracking-tight">Lås upp full analys</h3>
                <p className="text-zinc-400 font-light mb-10 leading-relaxed">
                  Få tillgång till historiska slutpriser, lageromsättning och framtida värdeprognoser.
                </p>
                <Link to="/premium" className="flex items-center justify-between group text-accent font-bold uppercase tracking-widest text-[11px] hover:text-white transition-colors">
                  Se alla funktioner <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* Market Health */}
              <div className="card p-10">
                <h3 className="text-[10px] font-bold text-black uppercase tracking-widest mb-10">Marknadshälsa</h3>
                <div className="space-y-8">
                  {[
                    { label: 'Prisstabilitet', value: 'Hög', color: 'text-emerald-500' },
                    { label: 'Utbud', value: 'Normalt', color: 'text-blue-500' },
                    { label: 'Köptryck', value: 'Växande', color: 'text-accent' }
                  ].map((stat, i) => (
                    <div key={i} className="flex justify-between items-center">
                      <span className="text-zinc-500 font-light text-sm">{stat.label}</span>
                      <span className={`font-bold ${stat.color}`}>{stat.value}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
