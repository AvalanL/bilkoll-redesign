import { Link } from 'react-router-dom';
import { Printer, Share2, Search, CheckCircle2, AlertTriangle, Info, TrendingUp, ShieldCheck, Download, ArrowLeft, ExternalLink, Activity, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export default function ReportViewPage() {
  return (
    <div className="bg-white min-h-screen pb-32 selection:bg-accent selection:text-white">
      {/* Top Bar */}
      <motion.div 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-zinc-200/50 py-4 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6">
            <Link to="/" className="text-zinc-400 hover:text-black transition-colors">
              <ArrowLeft size={20} />
            </Link>
            <div className="flex items-center gap-3">
              <span className="bg-black text-white px-3 py-1 rounded-lg text-[10px] font-bold tracking-[0.2em] uppercase">ABC 123</span>
              <h1 className="hidden md:block text-sm font-bold text-black tracking-tight">Volvo XC60 D4 AWD</h1>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="w-10 h-10 flex items-center justify-center rounded-full text-zinc-400 hover:text-black hover:bg-zinc-100 transition-all">
              <Share2 size={18} strokeWidth={1.5} />
            </button>
            <button className="bg-black text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-accent transition-all duration-300 shadow-lg shadow-black/5 flex items-center gap-2">
              <Download size={16} />
              <span className="hidden sm:inline">Exportera PDF</span>
            </button>
          </div>
        </div>
      </motion.div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 space-y-10">
        
        {/* Header & Score */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card p-12 bg-white relative overflow-hidden"
        >
          {/* Atmospheric Background */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
            <div className="absolute top-[-20%] left-[-10%] w-[40%] h-[60%] bg-accent/10 rounded-full blur-[100px]"></div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
            <div className="text-center md:text-left flex-grow">
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="micro-label text-accent mb-6"
              >
                Premium Rapport
              </motion.div>
              <h1 className="text-5xl md:text-7xl font-light text-black mb-6 tracking-tighter leading-tight">Volvo XC60 <br/><span className="font-bold">D4 AWD Inscription</span></h1>
              <p className="text-zinc-500 text-xl font-light mb-8">2020 • 12 450 mil • Automat • Diesel</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-3">
                <span className="px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 text-[10px] font-bold uppercase tracking-widest">Inga anmärkningar</span>
                <span className="px-4 py-1.5 rounded-full bg-accent/5 text-accent border border-accent/10 text-[10px] font-bold uppercase tracking-widest">Svensksåld</span>
                <span className="px-4 py-1.5 rounded-full bg-zinc-50 text-zinc-500 border border-zinc-100 text-[10px] font-bold uppercase tracking-widest">3 ägare</span>
              </div>
            </div>
            
            {/* Score Ring */}
            <div className="relative w-48 h-48 flex-shrink-0">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <circle
                  cx="18" cy="18" r="16"
                  fill="none"
                  className="stroke-zinc-50"
                  strokeWidth="2.5"
                />
                <motion.circle
                  cx="18" cy="18" r="16"
                  fill="none"
                  className="stroke-accent"
                  strokeWidth="2.5"
                  strokeDasharray="100 100"
                  initial={{ strokeDashoffset: 100 }}
                  animate={{ strokeDashoffset: 15 }}
                  transition={{ duration: 2, ease: "circOut", delay: 0.5 }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <motion.span 
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1, duration: 0.5 }}
                  className="text-6xl font-bold text-black tracking-tighter"
                >
                  85
                </motion.span>
                <span className="micro-label text-accent">Score</span>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-10">
            {/* Valuation */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="card p-12 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-[100px] -mr-32 -mt-32"></div>
              <div className="flex items-center gap-4 mb-12 relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-accent/5 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-accent" strokeWidth={1.5} />
                </div>
                <h2 className="text-3xl font-light text-black tracking-tight">Marknadsvärdering</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 relative z-10">
                <div className="bg-zinc-50 p-8 rounded-[2rem] text-center border border-zinc-100">
                  <div className="micro-label mb-3">Privatköp</div>
                  <div className="text-2xl font-bold text-black tracking-tight">295 000 kr</div>
                </div>
                <div className="bg-black p-8 rounded-[2rem] text-center shadow-2xl shadow-black/20 transform md:-translate-y-4">
                  <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent mb-3">Bilhandlare</div>
                  <div className="text-3xl font-bold text-white tracking-tight">315 000 kr</div>
                </div>
                <div className="bg-zinc-50 p-8 rounded-[2rem] text-center border border-zinc-100">
                  <div className="micro-label mb-3">Inbyte</div>
                  <div className="text-2xl font-bold text-black tracking-tight">270 000 kr</div>
                </div>
              </div>

              <div className="bg-zinc-50/50 p-8 rounded-[2rem] border border-zinc-100 relative z-10">
                <div className="flex items-center gap-2 mb-4">
                  <Activity size={16} className="text-accent" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-black">AI Marknadsanalys</span>
                </div>
                <p className="text-zinc-500 font-light leading-relaxed">
                  Värderingen baseras på <span className="text-black font-medium">42 liknande bilar</span> på Blocket. Bilen ligger i det övre prissegmentet för sin årsmodell, vilket motiveras av låga miltal och "Inscription"-paketet.
                </p>
              </div>
            </motion.div>

            {/* AI Analysis */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="card p-12"
            >
              <div className="flex items-center gap-4 mb-12">
                <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center">
                  <span className="text-white font-bold text-xs tracking-widest">AI</span>
                </div>
                <h2 className="text-3xl font-light text-black tracking-tight">AI-Rådgivning</h2>
              </div>

              <div className="space-y-12">
                <div className="flex items-start gap-8">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-6 h-6 text-emerald-600" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-xl font-medium text-black mb-3">Starkt köpläge</h3>
                    <p className="text-zinc-500 font-light text-lg leading-relaxed">Bilen har en mycket ren historik med få ägare och inga anmärkningar vid besiktning. Modellen (XC60 D4) är känd för hög driftsäkerhet och andrahandsvärdet står sig starkt.</p>
                  </div>
                </div>
                <div className="flex items-start gap-8">
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center flex-shrink-0">
                    <AlertTriangle className="w-6 h-6 text-amber-600" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-xl font-medium text-black mb-3">Kommande servicekostnad</h3>
                    <p className="text-zinc-500 font-light text-lg leading-relaxed">Vid 15 000 mil (om ca 2 500 mil) är det dags för ett större serviceintervall inklusive kamremsbyte. Detta kostar vanligtvis mellan 8 000 - 12 000 kr. Ha detta i åtanke vid prisförhandling.</p>
                  </div>
                </div>
                <div className="flex items-start gap-8">
                  <div className="w-12 h-12 rounded-2xl bg-accent/5 flex items-center justify-center flex-shrink-0">
                    <Info className="w-6 h-6 text-accent" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-xl font-medium text-black mb-3">Skatt och försäkring</h3>
                    <p className="text-zinc-500 font-light text-lg leading-relaxed">Fordonsskatten är relativt låg (3 240 kr/år) för en diesel-SUV av denna storlek. Försäkringspremien är dock ofta högre än snittet för Volvo-bilar. Jämför försäkringar innan köp.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-10">
            {/* Comparable Ads */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="card p-10"
            >
              <h2 className="text-2xl font-light text-black tracking-tight mb-8">Marknadskoll</h2>
              <p className="text-zinc-500 font-light text-sm mb-10 leading-relaxed">Här är 3 liknande bilar som ligger ute till försäljning just nu.</p>
              
              <div className="space-y-4">
                {[
                  { price: '319 000 kr', miles: '11 500 mil', dealer: 'Bilia Segeltorp', diff: '+4 000 kr' },
                  { price: '312 000 kr', miles: '13 200 mil', dealer: 'Riddermark Bil', diff: '-3 000 kr' },
                  { price: '298 000 kr', miles: '14 800 mil', dealer: 'Privatsäljare', diff: '-17 000 kr' }
                ].map((ad, index) => (
                  <motion.div 
                    key={index} 
                    whileHover={{ x: 4 }}
                    className="p-6 bg-zinc-50/50 border border-zinc-100 rounded-2xl hover:bg-white hover:border-accent/20 hover:shadow-lg hover:shadow-accent/5 transition-all cursor-pointer group"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="font-bold text-black text-lg tracking-tight">{ad.price}</div>
                      <div className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${ad.diff.startsWith('+') ? 'bg-rose-50 text-rose-600' : 'bg-emerald-50 text-emerald-600'}`}>
                        {ad.diff}
                      </div>
                    </div>
                    <div className="text-sm text-zinc-400 font-light mb-4">{ad.miles} • {ad.dealer}</div>
                    <div className="flex items-center text-[10px] font-bold uppercase tracking-widest text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                      Visa annons <ExternalLink size={10} className="ml-1" />
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <button className="w-full mt-10 py-4 rounded-full border border-zinc-200 text-[11px] font-bold uppercase tracking-widest text-zinc-400 hover:text-black hover:border-black transition-all">
                Visa alla 42 annonser
              </button>
            </motion.div>

            {/* Quick Links */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="card p-10 bg-black text-white overflow-hidden relative"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 blur-3xl rounded-full"></div>
              <h3 className="text-xl font-medium mb-8 relative z-10">Nästa steg</h3>
              <div className="space-y-4 relative z-10">
                <button className="w-full p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all flex items-center justify-between group">
                  <span className="text-sm font-medium">Boka besiktning</span>
                  <ArrowRight size={16} className="text-accent group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="w-full p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all flex items-center justify-between group">
                  <span className="text-sm font-medium">Jämför försäkring</span>
                  <ArrowRight size={16} className="text-accent group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="w-full p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all flex items-center justify-between group">
                  <span className="text-sm font-medium">Historik-check</span>
                  <ArrowRight size={16} className="text-accent group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
