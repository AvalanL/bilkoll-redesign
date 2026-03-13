import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ChevronRight, ShieldCheck, AlertTriangle, CheckCircle, Clock, ArrowRight, Car, MapPin, Calendar } from 'lucide-react';
import { motion } from 'motion/react';

interface BrandInfo {
  slug: string;
  name: string;
  modelCount: number;
}

interface ModelInfo {
  model: string;
  slug: string;
  issues: string[];
}

// Brand index page
function BrandIndex() {
  const brands: BrandInfo[] = [
    { slug: 'volvo', name: 'Volvo', modelCount: 13 },
    { slug: 'volkswagen', name: 'Volkswagen', modelCount: 14 },
    { slug: 'toyota', name: 'Toyota', modelCount: 11 },
    { slug: 'bmw', name: 'BMW', modelCount: 14 },
    { slug: 'mercedes-benz', name: 'Mercedes-Benz', modelCount: 12 },
    { slug: 'audi', name: 'Audi', modelCount: 10 },
    { slug: 'kia', name: 'Kia', modelCount: 8 },
    { slug: 'hyundai', name: 'Hyundai', modelCount: 7 },
    { slug: 'skoda', name: 'Skoda', modelCount: 6 },
    { slug: 'tesla', name: 'Tesla', modelCount: 4 },
    { slug: 'ford', name: 'Ford', modelCount: 8 },
    { slug: 'nissan', name: 'Nissan', modelCount: 6 },
    { slug: 'mazda', name: 'Mazda', modelCount: 5 },
    { slug: 'peugeot', name: 'Peugeot', modelCount: 5 },
    { slug: 'renault', name: 'Renault', modelCount: 5 },
    { slug: 'opel', name: 'Opel', modelCount: 4 },
    { slug: 'honda', name: 'Honda', modelCount: 4 },
    { slug: 'suzuki', name: 'Suzuki', modelCount: 3 },
    { slug: 'saab', name: 'Saab', modelCount: 3 },
    { slug: 'fiat', name: 'Fiat', modelCount: 3 },
    { slug: 'citroen', name: 'Citroën', modelCount: 4 },
    { slug: 'seat', name: 'SEAT', modelCount: 3 },
    { slug: 'cupra', name: 'CUPRA', modelCount: 3 },
    { slug: 'dacia', name: 'Dacia', modelCount: 3 },
    { slug: 'mini', name: 'MINI', modelCount: 2 },
    { slug: 'porsche', name: 'Porsche', modelCount: 4 },
    { slug: 'mg', name: 'MG', modelCount: 2 },
    { slug: 'polestar', name: 'Polestar', modelCount: 2 },
    { slug: 'mitsubishi', name: 'Mitsubishi', modelCount: 3 },
    { slug: 'jeep', name: 'Jeep', modelCount: 4 },
  ];

  return (
    <div className="bg-white min-h-screen pb-32 selection:bg-accent selection:text-white">
      {/* Hero */}
      <section className="relative pt-40 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none overflow-hidden z-0">
          <motion.div 
            animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[-10%] left-[15%] w-[50%] h-[50%] bg-blue-500/10 rounded-full blur-[120px]"
          />
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.3, 0.15] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-[-10%] right-[10%] w-[40%] h-[40%] bg-accent/10 rounded-full blur-[100px]"
          />
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/5 border border-accent/10 text-accent text-[10px] font-bold uppercase tracking-[0.2em] mb-12"
          >
            <ShieldCheck size={14} />
            Besiktningsguider
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-6xl md:text-8xl font-light text-black tracking-tighter mb-12 leading-[0.9]"
          >
            Besiktning.<br/>
            <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent via-accent-vibrant to-accent">Utan stress.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-zinc-500 mb-16 max-w-2xl mx-auto font-light leading-relaxed"
          >
            Vanliga fel, tips och insikter per bilmodell. Vet exakt vad besiktningsmännen kollar — innan du åker dit.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 text-[10px] font-bold text-zinc-400 uppercase tracking-[0.25em]"
          >
            <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-accent"></div> 30 märken</span>
            <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-accent"></div> 188 modeller</span>
            <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-accent"></div> Uppdateras löpande</span>
          </motion.div>
        </div>
      </section>

      {/* Quick Tips */}
      <section className="py-20 bg-zinc-50 border-y border-zinc-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <AlertTriangle className="w-6 h-6 text-amber-500" />, title: 'Vanligaste felen', desc: 'Bromsbelägg, däck, belysning och avgassystem toppar listan varje år.', color: 'bg-amber-50' },
              { icon: <Calendar className="w-6 h-6 text-blue-500" />, title: 'Boka i tid', desc: 'Besiktningen ska göras under din besiktningsmånad. Boka minst 2 veckor i förväg.', color: 'bg-blue-50' },
              { icon: <CheckCircle className="w-6 h-6 text-emerald-500" />, title: '85% godkänns', desc: 'De flesta bilar klarar besiktningen. Med rätt förberedelse ökar du chanserna.', color: 'bg-emerald-50' },
            ].map((tip, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`card p-10 relative overflow-hidden`}
              >
                <div className={`absolute top-0 right-0 w-32 h-32 ${tip.color} opacity-30 rounded-bl-full -mr-16 -mt-16`}></div>
                <div className="w-14 h-14 rounded-2xl bg-zinc-50 flex items-center justify-center mb-8">
                  {tip.icon}
                </div>
                <h3 className="text-xl font-medium text-black mb-3">{tip.title}</h3>
                <p className="text-zinc-500 font-light leading-relaxed">{tip.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Brands Grid */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-6">
            <div>
              <div className="micro-label mb-6 text-accent flex items-center gap-2">
                <div className="w-8 h-[1px] bg-accent"></div>
                Välj märke
              </div>
              <h2 className="text-4xl md:text-5xl font-light text-black mb-4 tracking-tight">Besiktningsguider per märke</h2>
              <p className="text-zinc-500 font-light text-lg">Hitta vanliga fel och tips för just din bil.</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {brands.map((brand, index) => (
              <motion.div
                key={brand.slug}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.03 }}
                whileHover={{ y: -4, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <a 
                  href={`/besiktning/${brand.slug}`}
                  className="bg-white border border-zinc-200 rounded-2xl p-8 flex flex-col items-center justify-center text-center hover:border-accent hover:shadow-xl hover:shadow-accent/5 transition-all duration-500 h-full gap-3"
                >
                  <span className="font-medium text-black text-base tracking-tight">{brand.name}</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">{brand.modelCount} modeller</span>
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Station Finder CTA */}
      <section className="relative py-32 bg-black text-white overflow-hidden px-4">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-0 right-0 w-[70%] h-full bg-blue-500/20 blur-[150px] rounded-full pointer-events-none"
        />
        
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="micro-label text-accent mb-10"
          >
            Hitta station
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-light mb-12 leading-[0.9] tracking-tighter"
          >
            142 stationer.<br/>Hela Sverige.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-zinc-400 font-light text-xl mb-16 max-w-2xl mx-auto leading-relaxed"
          >
            Bilprovningen och Opus — hitta närmaste besiktningsstation och boka din tid.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <motion.a 
              href="https://www.bilprovningen.se/boka"
              target="_blank"
              rel="noopener"
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="bg-accent text-white font-bold rounded-full px-12 py-5 transition-all w-full sm:w-auto shadow-2xl shadow-accent/40 text-base"
            >
              Boka Bilprovningen
            </motion.a>
            <motion.a 
              href="https://www.opus.se/boka-besiktning"
              target="_blank"
              rel="noopener"
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 text-white font-bold rounded-full px-12 py-5 transition-all w-full sm:w-auto text-base"
            >
              Boka Opus
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

// Brands list page (e.g., /besiktning/volvo)
function BrandModels() {
  const { brand } = useParams<{ brand: string }>();
  const brandName = brand ? brand.charAt(0).toUpperCase() + brand.slice(1) : '';
  const [models, setModels] = useState<ModelInfo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch model list from API
    fetch(`/api/market/models/${encodeURIComponent(brandName)}`)
      .then(r => r.json())
      .then(d => {
        if (d.models) {
          setModels(d.models.map((m: any) => ({
            model: m.model,
            slug: m.model.toLowerCase().replace(/\s+/g, '-'),
            issues: []
          })));
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [brand, brandName]);

  return (
    <div className="bg-white min-h-screen pb-32 selection:bg-accent selection:text-white">
      <div className="bg-zinc-50/50 border-b border-zinc-100 pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center text-[10px] font-bold uppercase tracking-widest text-zinc-400">
            <Link to="/" className="hover:text-accent transition-colors">Hem</Link>
            <ChevronRight className="w-3 h-3 mx-3 opacity-50" />
            <Link to="/besiktning" className="hover:text-accent transition-colors">Besiktning</Link>
            <ChevronRight className="w-3 h-3 mx-3 opacity-50" />
            <span className="text-black">{brandName}</span>
          </nav>
        </div>
      </div>

      <section className="relative pt-16 pb-20 overflow-hidden border-b border-zinc-100">
        <div className="absolute top-0 right-0 w-[40%] h-full bg-blue-500/5 blur-[100px] rounded-full pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center gap-10">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-24 h-24 bg-white border border-zinc-200 rounded-[2rem] flex items-center justify-center shadow-xl shadow-black/5"
            >
              <ShieldCheck className="w-10 h-10 text-accent" strokeWidth={1.5} />
            </motion.div>
            <div>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="micro-label text-accent mb-4">Besiktningsguide</motion.div>
              <motion.h1 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-5xl md:text-7xl font-light text-black tracking-tighter mb-4"
              >
                {brandName}
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-xl text-zinc-500 font-light"
              >
                Vanliga besiktningsfel och tips för {brandName}-modeller.
              </motion.p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        {loading ? (
          <div className="text-center py-20"><p className="text-zinc-400 font-light">Laddar modeller...</p></div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {models.map((model, i) => (
              <motion.div
                key={model.model}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -6 }}
              >
                <a 
                  href={`/besiktning/${brand}/${model.slug}`}
                  className="card p-8 flex items-center justify-between group relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-bl-full -mr-12 -mt-12"></div>
                  <div className="relative z-10">
                    <h3 className="text-xl font-medium text-black group-hover:text-accent transition-colors duration-300">
                      {brandName} {model.model}
                    </h3>
                    <p className="text-sm text-zinc-400 font-light mt-2">Besiktningsguide</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-zinc-50 flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-all duration-300 relative z-10">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </a>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function BesiktningPage() {
  const { brand } = useParams<{ brand: string }>();
  
  if (brand) {
    return <BrandModels />;
  }
  
  return <BrandIndex />;
}
