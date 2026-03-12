import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Bell, ChevronRight, Info, Zap, Mail, ArrowRight, Activity, DollarSign, Star, Shield } from 'lucide-react';
import { motion } from 'motion/react';

interface MakeData {
  make: string;
  count: number;
  avgPrice: number;
}

interface ModelData {
  model: string;
  count: number;
  avgPrice: number;
  minPrice: number;
  maxPrice: number;
}

export default function MarketPage() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [makes, setMakes] = useState<MakeData[]>([]);
  const [totalListings, setTotalListings] = useState(0);
  const [selectedMake, setSelectedMake] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [models, setModels] = useState<ModelData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/market/overview')
      .then(r => r.json())
      .then(d => {
        if (d.makes) setMakes(d.makes);
        if (d.totalListings) setTotalListings(d.totalListings);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (selectedMake) {
      fetch(`/api/market/models/${encodeURIComponent(selectedMake)}`)
        .then(r => r.json())
        .then(d => {
          if (d.models) setModels(d.models);
        });
    }
  }, [selectedMake]);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubscribed(true);
  };

  const displayMake = selectedMake || (makes[0]?.make || 'Volvo');
  const displayModels = models.length > 0 ? models : [];

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
                Vi analyserar {totalListings ? totalListings.toLocaleString('sv') : 'tusentals'} annonser dagligen för att ge dig den mest pricksäkra värderingen i Sverige.
              </p>
            </motion.div>

            {/* Selectors */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex flex-col sm:flex-row gap-4 max-w-3xl"
            >
              <div className="flex-1 grid grid-cols-2 gap-4">
                <select 
                  className="bg-zinc-50 border-2 border-zinc-100 rounded-2xl px-6 py-4 text-sm font-medium focus:outline-none focus:border-accent transition-all"
                  value={selectedMake}
                  onChange={e => { setSelectedMake(e.target.value); setSelectedModel(''); setModels([]); }}
                >
                  <option value="">Välj märke</option>
                  {makes.map(m => (
                    <option key={m.make} value={m.make}>{m.make} ({m.count})</option>
                  ))}
                </select>
                <select 
                  className="bg-zinc-50 border-2 border-zinc-100 rounded-2xl px-6 py-4 text-sm font-medium focus:outline-none focus:border-accent transition-all"
                  value={selectedModel}
                  onChange={e => setSelectedModel(e.target.value)}
                  disabled={!selectedMake}
                >
                  <option value="">Välj modell</option>
                  {displayModels.map(m => (
                    <option key={m.model} value={m.model}>{m.model} ({m.count})</option>
                  ))}
                </select>
              </div>
              <Link 
                to={selectedMake && selectedModel ? `/marknad?make=${selectedMake}&model=${selectedModel}` : '#'}
                className="bg-black text-white px-10 py-4 rounded-2xl font-bold hover:bg-accent transition-all duration-500 text-center"
              >
                Visa
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Brand/Model Grid */}
            <div className="lg:col-span-2 space-y-12">
              
              {/* Makes overview or models list */}
              {selectedMake && displayModels.length > 0 ? (
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <button onClick={() => { setSelectedMake(''); setModels([]); }} className="micro-label text-accent mb-4 flex items-center gap-2 hover:text-black transition-colors">
                        <ArrowRight className="w-3 h-3 rotate-180" /> Alla märken
                      </button>
                      <h2 className="text-3xl font-light text-black tracking-tight">{selectedMake} <span className="text-zinc-300">({displayModels.length} modeller)</span></h2>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {displayModels.map((m, i) => (
                      <motion.div
                        key={m.model}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        whileHover={{ y: -4 }}
                      >
                        <Link 
                          to={`/bil/${selectedMake.toLowerCase()}/${m.model.toLowerCase()}`}
                          className="card p-8 flex items-center justify-between group"
                        >
                          <div>
                            <h3 className="text-xl font-medium text-black group-hover:text-accent transition-colors">{selectedMake} {m.model}</h3>
                            <p className="text-sm text-zinc-400 font-light mt-2">
                              {m.count} annonser · {Number(m.avgPrice).toLocaleString('sv')} kr snitt
                            </p>
                            <p className="text-xs text-zinc-300 font-light mt-1">
                              {Number(m.minPrice).toLocaleString('sv')} – {Number(m.maxPrice).toLocaleString('sv')} kr
                            </p>
                          </div>
                          <div className="w-10 h-10 rounded-full bg-zinc-50 flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-all">
                            <ArrowRight className="w-4 h-4" />
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h2 className="text-3xl font-light text-black tracking-tight">Alla märken <span className="text-zinc-300">({makes.length})</span></h2>
                      <p className="text-zinc-500 font-light mt-2">{totalListings.toLocaleString('sv')} aktiva annonser totalt</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {makes.map((m, i) => (
                      <motion.div
                        key={m.make}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.03 }}
                        whileHover={{ y: -4 }}
                      >
                        <button
                          onClick={() => setSelectedMake(m.make)}
                          className="card p-8 flex items-center justify-between group w-full text-left"
                        >
                          <div>
                            <h3 className="text-xl font-medium text-black group-hover:text-accent transition-colors">{m.make}</h3>
                            <p className="text-sm text-zinc-400 font-light mt-2">
                              {m.count} annonser · {Number(m.avgPrice).toLocaleString('sv')} kr snitt
                            </p>
                          </div>
                          <div className="w-10 h-10 rounded-full bg-zinc-50 flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-all">
                            <ChevronRight className="w-4 h-4" />
                          </div>
                        </button>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* AI Market Analysis cards */}
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
                  Få ett mail när snittpriset ändras med mer än 2%.
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
                    { label: 'Aktiva annonser', value: totalListings.toLocaleString('sv'), color: 'text-black font-bold' },
                    { label: 'Märken', value: `${makes.length} st`, color: 'text-blue-500' },
                    { label: 'Uppdateras', value: 'Varje natt', color: 'text-accent' }
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
