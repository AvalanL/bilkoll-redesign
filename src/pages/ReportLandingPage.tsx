import { Link, useParams } from 'react-router-dom';
import { ShieldCheck, Lock, TrendingUp, FileText, Zap, ArrowRight, Star, CheckCircle2, Calculator, Activity } from 'lucide-react';
import { motion } from 'motion/react';

export default function ReportLandingPage() {
  const { brand, model } = useParams();
  
  const b = brand ? brand.charAt(0).toUpperCase() + brand.slice(1) : 'Volvo';
  const m = model ? model.toUpperCase() : 'XC60';

  return (
    <div className="bg-white min-h-screen selection:bg-accent selection:text-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden border-b border-zinc-100">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-accent/5 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-accent/5 rounded-full blur-[120px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="micro-label text-accent mb-8">BilKoll Premium</div>
              <h1 className="text-6xl md:text-8xl font-light text-black mb-8 tracking-tighter leading-[0.9]">
                Köp med <br />
                <span className="font-bold italic serif">fullständig</span> <br />
                insikt.
              </h1>
              <p className="text-xl md:text-2xl text-zinc-500 font-light mb-12 leading-relaxed max-w-lg">
                Våra AI-genererade rapporter ger dig marknadens mest djupgående analys av begagnade bilar.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/sok" 
                  className="bg-black text-white px-10 py-5 rounded-full font-bold hover:bg-accent transition-all duration-500 shadow-2xl shadow-black/10 flex items-center justify-center gap-2 group"
                >
                  Skapa rapport nu <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <div className="flex items-center gap-4 px-6 py-4 rounded-full border border-zinc-100 bg-zinc-50/50">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-zinc-200 overflow-hidden">
                        <img src={`https://picsum.photos/seed/user${i}/100/100`} alt="User" referrerPolicy="no-referrer" />
                      </div>
                    ))}
                  </div>
                  <div className="text-xs font-medium text-zinc-500">
                    <span className="text-black font-bold">10k+</span> rapporter skapade
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative"
            >
              {/* Glassmorphism Pricing Card */}
              <div className="relative z-10 bg-white/40 backdrop-blur-3xl border border-white/40 rounded-[3rem] p-12 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
                
                <div className="flex justify-between items-start mb-10">
                  <div>
                    <h3 className="text-2xl font-bold text-black mb-1">Premium-rapport</h3>
                    <p className="text-sm text-zinc-500">Engångskostnad per bil</p>
                  </div>
                  <div className="text-right">
                    <div className="text-4xl font-bold text-accent">49 kr</div>
                    <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Inkl. moms</div>
                  </div>
                </div>

                <div className="space-y-6 mb-12">
                  {[
                    { icon: <TrendingUp className="text-accent" size={18} />, text: 'Exakt marknadsvärdering' },
                    { icon: <ShieldCheck className="text-accent" size={18} />, text: 'Besiktningshistorik & analys' },
                    { icon: <Calculator className="text-accent" size={18} />, text: 'Ägandekostnadskalkyl' },
                    { icon: <Activity className="text-accent" size={18} />, text: 'AI-genererad riskbedömning' }
                  ].map((item, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + (i * 0.1) }}
                      className="flex items-center gap-4"
                    >
                      <div className="w-10 h-10 rounded-xl bg-accent/5 flex items-center justify-center flex-shrink-0">
                        {item.icon}
                      </div>
                      <span className="text-zinc-700 font-medium">{item.text}</span>
                    </motion.div>
                  ))}
                </div>

                <Link to="/rapport/visa/demo-token" className="block w-full bg-black text-white text-center py-5 rounded-2xl font-bold hover:bg-accent transition-all duration-500 shadow-xl shadow-black/10">
                  Lås upp rapport nu
                </Link>
                
                <div className="mt-6 flex items-center justify-center gap-2 text-[10px] text-zinc-400 font-bold uppercase tracking-widest">
                  <Lock className="w-3 h-3" strokeWidth={2} /> Säker betalning via Stripe
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl z-0"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-32 bg-zinc-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-6xl font-light text-black mb-8 tracking-tight">Vad ingår i rapporten?</h2>
              <p className="text-xl text-zinc-500 font-light">
                Vi kombinerar data från över 20 källor med avancerad AI för att ge dig en komplett bild.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { 
                title: 'Marknadsvärde', 
                desc: 'Vi analyserar tusentals liknande annonser för att ge dig ett exakt pris.', 
                icon: <TrendingUp className="w-8 h-8" />,
                color: 'bg-blue-50 text-blue-600'
              },
              { 
                title: 'Besiktning', 
                desc: 'Hela historiken med detaljerad analys av vanliga fel för modellen.', 
                icon: <ShieldCheck className="w-8 h-8" />,
                color: 'bg-emerald-50 text-emerald-600'
              },
              { 
                title: 'AI-Analys', 
                desc: 'Vår AI hittar dolda mönster och varnar för potentiella risker.', 
                icon: <Zap className="w-8 h-8" />,
                color: 'bg-amber-50 text-amber-600'
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card p-12 group hover:border-accent/20 transition-all duration-500"
              >
                <div className={`w-16 h-16 rounded-[2rem] ${feature.color} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500`}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-black mb-4 tracking-tight">{feature.title}</h3>
                <p className="text-zinc-500 font-light leading-relaxed text-lg">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-32 border-t border-zinc-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-16">
            <div className="max-w-xl">
              <h2 className="text-4xl md:text-5xl font-light text-black mb-8 tracking-tight">Varför lita på BilKoll?</h2>
              <div className="space-y-8">
                {[
                  { title: 'Oberoende data', desc: 'Vi är inte kopplade till någon bilhandlare eller försäkringsbolag.' },
                  { title: 'Realtidsuppdaterat', desc: 'Vår data uppdateras dygnet runt för att alltid vara aktuell.' },
                  { title: 'Säker betalning', desc: 'Vi använder Stripe för att garantera din säkerhet vid köp.' }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center mt-1">
                      <CheckCircle2 className="w-4 h-4 text-accent" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-black mb-2">{item.title}</h4>
                      <p className="text-zinc-500 font-light leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative w-full md:w-1/2 aspect-square max-w-md">
              <div className="absolute inset-0 bg-accent/5 rounded-full blur-3xl"></div>
              <motion.div 
                animate={{ 
                  y: [0, -20, 0],
                  rotate: [0, 2, 0]
                }}
                transition={{ 
                  duration: 6, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                className="relative z-10 bg-white p-12 rounded-[3rem] shadow-2xl border border-zinc-100"
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-accent text-white flex items-center justify-center">
                    <Star fill="currentColor" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-black uppercase tracking-widest">Toppbetyg</div>
                    <div className="text-2xl font-bold text-accent">4.9 / 5</div>
                  </div>
                </div>
                <p className="text-xl font-light italic serif text-zinc-600 leading-relaxed mb-8">
                  "Rapporten hjälpte mig att pruta ner 15 000 kr på min nya Volvo genom att visa på kommande servicebehov."
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-zinc-100"></div>
                  <div>
                    <div className="text-sm font-bold text-black">Erik Johansson</div>
                    <div className="text-xs text-zinc-400">Köpte Volvo XC60</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-black rounded-[4rem] p-16 md:p-24 text-center text-white relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-full opacity-20">
              <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-accent rounded-full blur-[120px]"></div>
            </div>
            
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-5xl md:text-7xl font-light mb-10 tracking-tighter">Redo att göra en <br /><span className="font-bold italic serif">tryggare</span> affär?</h2>
              <p className="text-xl text-zinc-400 font-light mb-12 leading-relaxed">
                Slå in registreringsnumret och få din rapport på under 30 sekunder.
              </p>
              <Link 
                to="/sok" 
                className="inline-flex items-center gap-3 bg-white text-black px-12 py-6 rounded-full font-bold text-lg hover:bg-accent hover:text-white transition-all duration-500 shadow-2xl shadow-white/5 group"
              >
                Starta sökning <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
