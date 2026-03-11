import { useSearchParams, Link } from 'react-router-dom';
import { ShieldCheck, Calculator, TrendingUp, ChevronRight, Search, Zap, Info, ArrowRight, Car, History, Star, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import SearchBox from '../components/SearchBox';

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const regnr = searchParams.get('regnr') || '';

  // Mock data for the search result
  const hasResult = regnr.length > 4;

  return (
    <div className="bg-white min-h-screen pb-32 selection:bg-accent selection:text-white">
      {/* Search Header */}
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
              <div className="micro-label text-accent mb-8">Fordonssök</div>
              <h1 className="text-6xl md:text-8xl font-light text-black mb-10 tracking-tighter leading-[0.9]">
                Hitta <span className="font-bold italic serif">allt</span> om <br />vilken bil som helst.
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <SearchBox size="normal" />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-8 flex flex-wrap gap-4"
            >
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Populära sökningar:</span>
              {['VOLVO XC60', 'TESLA MODEL 3', 'VW GOLF'].map(tag => (
                <Link key={tag} to={`/sok?regnr=${tag}`} className="text-xs font-bold text-black hover:text-accent transition-colors">
                  {tag}
                </Link>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Results / Content */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            {hasResult ? (
              <motion.div 
                key="result"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-16"
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
                  <div>
                    <div className="flex items-center gap-4 mb-8">
                      <span className="bg-black text-white px-6 py-2 rounded-2xl text-2xl font-bold tracking-widest uppercase shadow-2xl shadow-black/10">{regnr}</span>
                      <span className="px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 text-[10px] font-bold uppercase tracking-widest">I trafik</span>
                    </div>
                    <h2 className="text-5xl md:text-7xl font-light text-black mb-4 tracking-tighter leading-tight">Volvo <span className="font-bold">XC60 D4 AWD</span></h2>
                    <p className="text-xl md:text-2xl text-zinc-500 font-light">2020 • Automat • Diesel • 190 hk</p>
                  </div>
                  <div className="flex gap-4 w-full md:w-auto">
                    <Link to={`/rapport/volvo/xc60`} className="flex-1 md:flex-none bg-black text-white px-10 py-5 rounded-full font-bold hover:bg-accent transition-all duration-500 shadow-2xl shadow-black/10 flex items-center justify-center gap-2 group">
                      Köp AI-rapport <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                  {/* Main Info */}
                  <div className="lg:col-span-2 space-y-12">
                    
                    {/* Quick Info Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                      {[
                        { label: 'Mätarställning', value: '12 450 mil', icon: <Activity size={16} /> },
                        { label: 'Besiktigad till', value: '2026-10-31', icon: <ShieldCheck size={16} /> },
                        { label: 'Fordonsskatt', value: '3 240 kr/år', icon: <Calculator size={16} /> },
                        { label: 'Ägare', value: '3 st', icon: <Car size={16} /> }
                      ].map((item, i) => (
                        <div key={i} className="card p-8 text-center group hover:border-accent/20 transition-all">
                          <div className="w-10 h-10 rounded-2xl bg-zinc-50 text-zinc-400 group-hover:bg-accent group-hover:text-white flex items-center justify-center mx-auto mb-4 transition-colors">
                            {item.icon}
                          </div>
                          <div className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest mb-2">{item.label}</div>
                          <div className="text-xl font-bold text-black tracking-tight">{item.value}</div>
                        </div>
                      ))}
                    </div>

                    {/* AI Teaser - Vibrant */}
                    <motion.div 
                      whileHover={{ y: -4 }}
                      className="relative p-12 rounded-[3rem] overflow-hidden group bg-black text-white shadow-2xl"
                    >
                      <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-[100px] -mr-32 -mt-32 group-hover:bg-accent/30 transition-colors"></div>
                      
                      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-10">
                        <div className="w-20 h-20 bg-accent rounded-[2rem] flex items-center justify-center flex-shrink-0 shadow-2xl shadow-accent/20">
                          <Zap className="w-10 h-10 text-white" fill="white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-3xl font-light mb-4 tracking-tight">Marknadsvärdering & AI-analys</h3>
                          <p className="text-zinc-400 font-light mb-8 leading-relaxed text-lg">
                            Vi har hittat <span className="text-white font-medium">42</span> liknande Volvo XC60 på marknaden. 
                            Lås upp den fullständiga rapporten för att se exakt värdering och AI-rådgivning för <span className="text-white font-bold tracking-widest">{regnr}</span>.
                          </p>
                          <Link to={`/rapport/volvo/xc60`} className="inline-flex items-center gap-2 text-accent font-bold uppercase tracking-widest text-xs hover:text-accent-vibrant transition-colors">
                            Se exempelrapport <ArrowRight className="w-4 h-4" />
                          </Link>
                        </div>
                      </div>
                    </motion.div>

                    {/* Specs Table */}
                    <div className="card overflow-hidden">
                      <div className="px-10 py-8 border-b border-zinc-100 bg-zinc-50/50 flex items-center justify-between">
                        <h3 className="text-sm font-bold text-black uppercase tracking-widest">Tekniska data</h3>
                        <Info className="w-5 h-5 text-zinc-300" />
                      </div>
                      <div className="p-0">
                        <table className="min-w-full divide-y divide-zinc-100">
                          <tbody className="divide-y divide-zinc-100">
                            {[
                              ['Registreringsdatum', '2020-05-12'],
                              ['Färg', 'Vit'],
                              ['Tjänstevikt', '1 950 kg'],
                              ['Motoreffekt', '140 kW (190 hk)'],
                              ['Drivmedel', 'Diesel'],
                              ['Växellåda', 'Automat']
                            ].map(([label, value], i) => (
                              <tr key={i} className="hover:bg-zinc-50/50 transition-colors group">
                                <td className="px-10 py-6 text-sm font-light text-zinc-500 w-1/2">{label}</td>
                                <td className="px-10 py-6 text-sm font-medium text-black group-hover:text-accent transition-colors">{value}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                  </div>

                  {/* Sidebar */}
                  <div className="space-y-10">
                    
                    <div className="card p-10">
                      <h3 className="text-[10px] font-bold text-black uppercase tracking-[0.2em] mb-10 flex items-center gap-3">
                        <ShieldCheck className="w-5 h-5 text-accent" />
                        Besiktningsstatus
                      </h3>
                      <div className="space-y-8">
                        <div className="flex justify-between items-center pb-6 border-b border-zinc-100">
                          <span className="text-zinc-500 font-light text-sm">Senast godkänd</span>
                          <span className="font-medium text-black">2024-10-15</span>
                        </div>
                        <div className="flex justify-between items-center pb-6 border-b border-zinc-100">
                          <span className="text-zinc-500 font-light text-sm">Mätarställning</span>
                          <span className="font-medium text-black">11 200 mil</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-zinc-500 font-light text-sm">Nästa besiktning</span>
                          <span className="font-bold text-accent">Senast 2026-10-31</span>
                        </div>
                      </div>
                    </div>

                    <div className="card p-10">
                      <h3 className="text-[10px] font-bold text-black uppercase tracking-[0.2em] mb-10 flex items-center gap-3">
                        <Calculator className="w-5 h-5 text-accent" />
                        Ägarkostnader
                      </h3>
                      <div className="space-y-8">
                        <div className="flex justify-between items-center pb-6 border-b border-zinc-100">
                          <span className="text-zinc-500 font-light text-sm">Fordonsskatt</span>
                          <span className="font-medium text-black">3 240 kr/år</span>
                        </div>
                        <div className="flex justify-between items-center pb-6 border-b border-zinc-100">
                          <span className="text-zinc-500 font-light text-sm">Försäkring (uppskattad)</span>
                          <span className="font-medium text-black">~6 500 kr/år</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-zinc-500 font-light text-sm">Drivmedel (1500 mil)</span>
                          <span className="font-medium text-black">~16 800 kr/år</span>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="features"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
              >
                {/* Feature Cards */}
                {[
                  { 
                    title: 'Gratis Basinfo', 
                    desc: 'Se teknisk data, ägarhistorik och skatteuppgifter helt gratis.', 
                    icon: <Car className="w-8 h-8" />,
                    color: 'bg-blue-50 text-blue-600'
                  },
                  { 
                    title: 'Besiktningshistorik', 
                    desc: 'Få full koll på tidigare besiktningar och mätarställningar.', 
                    icon: <History className="w-8 h-8" />,
                    color: 'bg-emerald-50 text-emerald-600'
                  },
                  { 
                    title: 'Marknadsvärde', 
                    desc: 'Se vad bilen är värd baserat på aktuell marknadsdata.', 
                    icon: <TrendingUp className="w-8 h-8" />,
                    color: 'bg-amber-50 text-amber-600'
                  }
                ].map((feature, i) => (
                  <div key={i} className="card p-12 group hover:border-accent/20 transition-all duration-500">
                    <div className={`w-16 h-16 rounded-[2rem] ${feature.color} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500`}>
                      {feature.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-black mb-4 tracking-tight">{feature.title}</h3>
                    <p className="text-zinc-500 font-light leading-relaxed text-lg">
                      {feature.desc}
                    </p>
                  </div>
                ))}

                {/* AI Teaser Card */}
                <div className="md:col-span-2 lg:col-span-3 bg-black rounded-[4rem] p-16 md:p-24 text-white relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-1/2 h-full bg-accent/10 rounded-full blur-[120px] -mr-32 group-hover:bg-accent/20 transition-colors"></div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
                    <div>
                      <div className="micro-label text-accent mb-8">BilKoll AI</div>
                      <h2 className="text-5xl md:text-7xl font-light mb-10 tracking-tighter leading-tight">Få en <span className="font-bold italic serif">intelligent</span> <br />analys.</h2>
                      <p className="text-xl text-zinc-400 font-light mb-12 leading-relaxed">
                        Vår AI analyserar bilens historik och varnar för dolda risker som mätarskruvning eller återkommande tekniska fel.
                      </p>
                      <Link to="/premium" className="inline-flex items-center gap-3 bg-white text-black px-12 py-6 rounded-full font-bold hover:bg-accent hover:text-white transition-all duration-500 shadow-2xl shadow-white/5">
                        Läs mer om Premium <ArrowRight size={24} />
                      </Link>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-8">
                      {[
                        { label: 'Riskbedömning', icon: <Star className="text-accent" /> },
                        { label: 'Värdeprognos', icon: <TrendingUp className="text-accent" /> },
                        { label: 'Servicebehov', icon: <Info className="text-accent" /> },
                        { label: 'Marknadsanalys', icon: <Zap className="text-accent" /> }
                      ].map((item, i) => (
                        <div key={i} className="p-10 bg-white/5 border border-white/10 rounded-[3rem] backdrop-blur-sm group-hover:bg-white/10 transition-colors">
                          <div className="mb-6 scale-125 origin-left">{item.icon}</div>
                          <div className="text-sm font-bold uppercase tracking-[0.2em]">{item.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
