import { Link, useParams } from 'react-router-dom';
import { ChevronRight, Calendar, Info, ShieldCheck, Calculator, TrendingUp, AlertTriangle, CheckCircle2, ArrowRight, Activity, Gauge, Droplets, Zap } from 'lucide-react';
import { motion } from 'motion/react';

export default function ModelYearPage() {
  const { brand, model, year } = useParams();
  
  const b = brand ? brand.charAt(0).toUpperCase() + brand.slice(1) : 'Volvo';
  const m = model ? model.toUpperCase() : 'XC60';
  const y = year || '2020';

  return (
    <div className="bg-white min-h-screen pb-32 selection:bg-accent selection:text-white">
      {/* Breadcrumbs */}
      <div className="bg-zinc-50/50 border-b border-zinc-100 pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center text-[10px] font-bold uppercase tracking-widest text-zinc-400 overflow-x-auto whitespace-nowrap no-scrollbar">
            <Link to="/" className="hover:text-accent transition-colors">Hem</Link>
            <ChevronRight className="w-3 h-3 mx-3 opacity-50 flex-shrink-0" />
            <Link to="/bil" className="hover:text-accent transition-colors">Märken</Link>
            <ChevronRight className="w-3 h-3 mx-3 opacity-50 flex-shrink-0" />
            <Link to={`/bil/${brand}`} className="hover:text-accent transition-colors">{b}</Link>
            <ChevronRight className="w-3 h-3 mx-3 opacity-50 flex-shrink-0" />
            <Link to={`/bil/${brand}/${model}`} className="hover:text-accent transition-colors">{m}</Link>
            <ChevronRight className="w-3 h-3 mx-3 opacity-50 flex-shrink-0" />
            <span className="text-black">{y}</span>
          </nav>
        </div>
      </div>

      {/* Header */}
      <div className="relative pt-16 pb-20 px-4 overflow-hidden border-b border-zinc-100">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none z-0">
          <div className="absolute top-[-50%] left-[10%] w-[80%] h-[80%] bg-accent/5 rounded-full blur-[120px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
            <div>
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3 mb-6"
              >
                <span className="px-3 py-1 rounded-full bg-black text-white text-[10px] font-bold uppercase tracking-widest">{y}</span>
                <span className="px-3 py-1 rounded-full bg-accent/5 text-accent border border-accent/10 text-[10px] font-bold uppercase tracking-widest">SUV</span>
              </motion.div>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-5xl md:text-7xl font-light text-black mb-4 tracking-tighter leading-tight"
              >
                {b} <span className="font-bold">{m}</span>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl md:text-2xl text-zinc-500 font-light"
              >
                D4 AWD Geartronic, 190hk
              </motion.p>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="flex gap-4"
            >
              <Link to={`/sok`} className="bg-black text-white px-10 py-4 rounded-full font-bold hover:bg-accent transition-all duration-300 shadow-xl shadow-black/10 flex items-center gap-2">
                Sök specifikt regnr <ArrowRight size={18} />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Main Content (Left 2/3) */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {[
                { label: 'Nypris (ca)', value: '469 000 kr', icon: <TrendingUp size={16} /> },
                { label: 'Begagnat (ca)', value: '310 000 kr', icon: <Activity size={16} />, highlight: true },
                { label: 'Fordonsskatt', value: '3 240 kr/år', icon: <Calculator size={16} /> },
                { label: 'Förbrukning', value: '0.56 l/mil', icon: <Droplets size={16} /> }
              ].map((stat, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + (i * 0.1) }}
                  className={`card p-8 text-center group hover:border-accent/20 transition-all ${stat.highlight ? 'bg-accent/5 border-accent/20' : ''}`}
                >
                  <div className={`flex items-center justify-center w-10 h-10 rounded-2xl mx-auto mb-4 transition-colors ${stat.highlight ? 'bg-accent text-white' : 'bg-zinc-50 text-zinc-400 group-hover:bg-accent group-hover:text-white'}`}>
                    {stat.icon}
                  </div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-2">{stat.label}</div>
                  <div className={`text-xl font-bold tracking-tight ${stat.highlight ? 'text-accent' : 'text-black'}`}>{stat.value}</div>
                </motion.div>
              ))}
            </div>

            {/* Specifications */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="card overflow-hidden"
            >
              <div className="px-10 py-8 border-b border-zinc-100 bg-zinc-50/50 flex items-center justify-between">
                <h2 className="text-xl font-bold text-black uppercase tracking-widest">Specifikationer</h2>
                <Info size={18} className="text-zinc-300" />
              </div>
              <div className="p-0">
                <table className="min-w-full divide-y divide-zinc-100">
                  <tbody className="divide-y divide-zinc-100">
                    {[
                      ['Drivmedel', 'Diesel'],
                      ['Växellåda', 'Automat (Geartronic)'],
                      ['Motoreffekt', '140 kW (190 hk)'],
                      ['Drivning', 'Fyrhjulsdrift (AWD)'],
                      ['Tjänstevikt', '1 950 kg'],
                      ['CO2-utsläpp (WLTP)', '147 g/km']
                    ].map(([label, value], i) => (
                      <tr key={i} className="hover:bg-zinc-50/50 transition-colors group">
                        <td className="px-10 py-6 text-sm font-light text-zinc-500 w-1/3">{label}</td>
                        <td className="px-10 py-6 text-sm font-medium text-black group-hover:text-accent transition-colors">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>

            {/* Inspection Data */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="card p-12 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-[100px] -mr-32 -mt-32"></div>
              
              <div className="flex items-center gap-4 mb-10 relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6 text-emerald-600" strokeWidth={1.5} />
                </div>
                <h2 className="text-3xl font-light text-black tracking-tight">Besiktningsstatistik</h2>
              </div>
              
              <div className="flex flex-col md:flex-row items-center gap-10 mb-12 relative z-10">
                <div className="relative w-32 h-32 flex-shrink-0">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                    <circle cx="18" cy="18" r="16" fill="none" className="stroke-zinc-100" strokeWidth="2.5" />
                    <motion.circle 
                      cx="18" cy="18" r="16" fill="none" className="stroke-emerald-500" strokeWidth="2.5" 
                      strokeDasharray="100 100"
                      initial={{ strokeDashoffset: 100 }}
                      whileInView={{ strokeDashoffset: 18 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, ease: "circOut" }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold text-black">82%</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-black mb-3">Hög godkännandegrad</h3>
                  <p className="text-zinc-500 font-light text-lg leading-relaxed">
                    82% av alla <span className="text-black font-medium">{b} {m}</span> från <span className="text-black font-medium">{y}</span> godkänns utan anmärkning. Detta är <span className="text-emerald-600 font-medium italic serif">bättre än medelbilen.</span>
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                {[
                  { label: 'Positionslyktor', rate: '12%', desc: 'Felaktig inställning eller trasig lampa.' },
                  { label: 'Bromsskivor bak', rate: '8%', desc: 'Slitna eller rostskadade bromsskivor.' }
                ].map((item, i) => (
                  <div key={i} className="p-8 bg-zinc-50/50 border border-zinc-100 rounded-[2rem]">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm font-bold text-black uppercase tracking-widest">{item.label}</span>
                      <span className="text-amber-600 font-bold text-sm">{item.rate}</span>
                    </div>
                    <p className="text-zinc-500 font-light text-sm leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* FAQ Accordion */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="card p-12"
            >
              <h2 className="text-3xl font-light text-black tracking-tight mb-10">Vanliga frågor om {b} {m} {y}</h2>
              <div className="space-y-6">
                {[
                  { q: `Vad kostar skatten för en ${b} ${m} ${y}?`, a: `Fordonsskatten för en ${b} ${m} D4 AWD från ${y} ligger på cirka 3 240 kr per år. Skatten baseras på bilens koldioxidutsläpp (147 g/km) och drivmedel (diesel).` },
                  { q: `När ska kamremmen bytas?`, a: `För D4-motorn i ${b} ${m} ${y} är bytesintervallet för kamrem normalt 15 000 mil eller 10 år, beroende på vad som inträffar först. Kontrollera alltid serviceboken för din specifika bil.` }
                ].map((item, i) => (
                  <details key={i} className="group border-b border-zinc-100 pb-6">
                    <summary className="flex justify-between items-center text-xl font-light text-black cursor-pointer list-none hover:text-accent transition-colors">
                      <span>{item.q}</span>
                      <ChevronRight className="w-6 h-6 text-zinc-300 group-open:rotate-90 transition-transform" />
                    </summary>
                    <div className="text-zinc-500 font-light mt-6 text-lg leading-relaxed">
                      {item.a}
                    </div>
                  </details>
                ))}
              </div>
            </motion.div>

          </div>

          {/* Sidebar (Right 1/3) */}
          <div className="space-y-10">
            
            {/* Premium CTA Widget */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-black rounded-[2rem] p-10 text-white shadow-2xl relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-accent/30 transition-colors"></div>
              
              <div className="micro-label text-accent mb-6">BilKoll Premium</div>
              <h3 className="text-3xl font-light mb-4 tracking-tight">AI-Analys</h3>
              <p className="text-zinc-400 text-lg font-light mb-10 leading-relaxed">
                Få en komplett AI-analys och exakt marknadsvärdering för en specifik bil.
              </p>
              <ul className="space-y-4 mb-12 text-sm font-light">
                <li className="flex items-center gap-4"><CheckCircle2 className="w-5 h-5 text-accent" strokeWidth={1.5} /> Exakt värdering</li>
                <li className="flex items-center gap-4"><CheckCircle2 className="w-5 h-5 text-accent" strokeWidth={1.5} /> Jämförbara annonser</li>
                <li className="flex items-center gap-4"><CheckCircle2 className="w-5 h-5 text-accent" strokeWidth={1.5} /> AI-rådgivning</li>
              </ul>
              <Link to={`/rapport/${brand}/${model}`} className="block w-full bg-white text-black font-bold text-center py-4 rounded-full hover:bg-accent hover:text-white transition-all duration-500 shadow-xl shadow-white/5">
                Köp rapport (49 kr)
              </Link>
            </motion.div>

            {/* Links Widget */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="card p-10"
            >
              <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-black mb-8">Guider för {m}</h3>
              <div className="space-y-4">
                {[
                  { to: `/besiktning/${brand}/${model}`, icon: <ShieldCheck size={18} />, label: 'Besiktningsguide' },
                  { to: `/skatt/${brand}/${model}/${year}`, icon: <Calculator size={18} />, label: 'Skatteberäkning' },
                  { to: `/vardering/${brand}/${model}/${year}`, icon: <TrendingUp size={18} />, label: 'Värderingsguide' }
                ].map((link, i) => (
                  <Link 
                    key={i}
                    to={link.to} 
                    className="flex items-center justify-between p-5 bg-zinc-50/50 border border-zinc-100 rounded-2xl hover:bg-white hover:border-accent/20 hover:shadow-lg hover:shadow-accent/5 transition-all group"
                  >
                    <span className="flex items-center gap-4 text-sm font-medium text-zinc-600 group-hover:text-black transition-colors">
                      <div className="text-zinc-300 group-hover:text-accent transition-colors">{link.icon}</div>
                      {link.label}
                    </span>
                    <ChevronRight size={16} className="text-zinc-300 group-hover:text-accent group-hover:translate-x-1 transition-all" />
                  </Link>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </div>
  );
}
