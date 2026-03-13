import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Search, ArrowRight, ShieldCheck, Calculator, TrendingUp, Settings, Car, Zap } from 'lucide-react';
import { motion } from 'motion/react';

interface GuideInfo {
  slug: string;
  title: string;
  category: string;
}

const categories = [
  { id: 'besiktning', name: 'Besiktning', icon: <ShieldCheck className="w-5 h-5" />, color: 'bg-blue-50 text-blue-600' },
  { id: 'skatt', name: 'Fordonsskatt', icon: <Calculator className="w-5 h-5" />, color: 'bg-indigo-50 text-indigo-600' },
  { id: 'vardering', name: 'Värdering', icon: <TrendingUp className="w-5 h-5" />, color: 'bg-cyan-50 text-cyan-600' },
  { id: 'elbil', name: 'Elbil', icon: <Zap className="w-5 h-5" />, color: 'bg-emerald-50 text-emerald-600' },
  { id: 'kopa', name: 'Köpa bil', icon: <Car className="w-5 h-5" />, color: 'bg-amber-50 text-amber-600' },
  { id: 'dack', name: 'Däck', icon: <Settings className="w-5 h-5" />, color: 'bg-rose-50 text-rose-600' },
  { id: 'forsakring', name: 'Försäkring', icon: <ShieldCheck className="w-5 h-5" />, color: 'bg-purple-50 text-purple-600' },
];

function slugToTitle(slug: string): string {
  return slug
    .replace(/-/g, ' ')
    .replace(/\b\w/g, l => l.toUpperCase())
    .replace(/Elbil /, 'Elbil: ')
    .replace(/Besiktning /, 'Besiktning: ');
}

function categorize(slug: string): string {
  if (slug.includes('besiktning') || slug.includes('kontroll')) return 'besiktning';
  if (slug.includes('skatt') || slug.includes('bonus-malus') || slug.includes('fordonsskatt')) return 'skatt';
  if (slug.includes('vardering') || slug.includes('varde') || slug.includes('pris')) return 'vardering';
  if (slug.includes('elbil') || slug.includes('ladd') || slug.includes('hybrid')) return 'elbil';
  if (slug.includes('kopa') || slug.includes('salja') || slug.includes('blocket')) return 'kopa';
  if (slug.includes('dack') || slug.includes('falg') || slug.includes('monsterdjup')) return 'dack';
  if (slug.includes('forsakring') || slug.includes('maskinskade')) return 'forsakring';
  return 'kopa';
}

export default function GuidesIndexPage() {
  const [guides, setGuides] = useState<GuideInfo[]>([]);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/guides')
      .then(r => r.json())
      .then(d => {
        if (d.guides) {
          setGuides(d.guides.map((g: any) => ({
            slug: g.slug || g,
            title: g.title || slugToTitle(g.slug || g),
            category: categorize(g.slug || g)
          })));
        }
      })
      .catch(() => {
        // Fallback: generate from known categories
      });
  }, []);

  const filtered = guides.filter(g => {
    if (activeCategory && g.category !== activeCategory) return false;
    if (search && !g.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="bg-white min-h-screen pb-32 selection:bg-accent selection:text-white">
      {/* Hero */}
      <section className="relative pt-40 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none overflow-hidden z-0">
          <motion.div 
            animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[-10%] left-[20%] w-[50%] h-[50%] bg-accent/10 rounded-full blur-[120px]"
          />
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/5 border border-accent/10 text-accent text-[10px] font-bold uppercase tracking-[0.2em] mb-12"
          >
            <BookOpen size={14} />
            Bilguider
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-6xl md:text-8xl font-light text-black tracking-tighter mb-12 leading-[0.9]"
          >
            Kunskap som<br/>
            <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent via-accent-vibrant to-accent">sparar pengar.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-zinc-500 mb-16 max-w-2xl mx-auto font-light leading-relaxed"
          >
            {guides.length > 0 ? `${guides.length} guider` : 'Hundratals guider'} om allt från besiktning och skatt till elbilsladdning och bilköp.
          </motion.p>

          {/* Search */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="max-w-xl mx-auto relative"
          >
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Sök bland guider..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-14 pr-6 py-5 rounded-full bg-white border border-zinc-200 text-lg font-light focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/10 shadow-xl shadow-black/5 transition-all"
            />
          </motion.div>
        </div>
      </section>

      {/* Category Pills */}
      <section className="py-8 border-b border-zinc-100 sticky top-[72px] bg-white/80 backdrop-blur-xl z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => setActiveCategory(null)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                !activeCategory ? 'bg-black text-white' : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
              }`}
            >
              Alla
            </button>
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(activeCategory === cat.id ? null : cat.id)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                  activeCategory === cat.id ? 'bg-accent text-white' : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                }`}
              >
                {cat.icon}
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Guide Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filtered.length === 0 && guides.length > 0 ? (
            <div className="text-center py-20">
              <p className="text-zinc-400 font-light text-xl">Inga guider matchade din sökning.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((guide, i) => {
                const cat = categories.find(c => c.id === guide.category) || categories[0];
                return (
                  <motion.div
                    key={guide.slug}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: (i % 12) * 0.03 }}
                    whileHover={{ y: -6 }}
                  >
                    <a
                      href={`/guide/${guide.slug}`}
                      className="card p-8 h-full flex flex-col group relative overflow-hidden"
                    >
                      <div className={`absolute top-0 right-0 w-24 h-24 ${cat.color.split(' ')[0]} opacity-0 group-hover:opacity-50 transition-opacity duration-500 rounded-bl-full -mr-12 -mt-12`}></div>
                      
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${cat.color} w-fit mb-6`}>
                        {cat.icon}
                        {cat.name}
                      </span>
                      
                      <h3 className="text-lg font-medium text-black group-hover:text-accent transition-colors duration-300 flex-grow mb-6 leading-snug">
                        {guide.title}
                      </h3>
                      
                      <div className="flex items-center text-[11px] font-bold uppercase tracking-[0.2em] text-accent group-hover:translate-x-2 transition-transform duration-300">
                        Läs guide <ArrowRight className="w-3.5 h-3.5 ml-2" />
                      </div>
                    </a>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
