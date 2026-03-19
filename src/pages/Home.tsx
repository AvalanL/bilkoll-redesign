import { Link } from 'react-router-dom';
import { ShieldCheck, Calculator, TrendingUp, Settings, ArrowRight, Zap, Star, Users, Database, Activity } from 'lucide-react';
import { motion } from 'motion/react';
import SearchBox from '../components/SearchBox';

export default function Home() {
  const features = [
    {
      title: 'Besiktning',
      description: 'Historik, vanliga fel och insikter inför nästa kontroll.',
      icon: <ShieldCheck className="w-6 h-6 text-accent" strokeWidth={1.5} />,
      link: '/besiktning',
      color: 'bg-blue-50'
    },
    {
      title: 'Fordonsskatt',
      description: 'Exakt skatteberäkning baserat på utsläpp och vikt.',
      icon: <Calculator className="w-6 h-6 text-accent" strokeWidth={1.5} />,
      link: '/skatt',
      color: 'bg-indigo-50'
    },
    {
      title: 'Bilvärdering',
      description: 'Marknadsvärde baserat på realtidsdata från tusentals annonser.',
      icon: <TrendingUp className="w-6 h-6 text-accent" strokeWidth={1.5} />,
      link: '/vardering',
      color: 'bg-cyan-50'
    },
    {
      title: 'Kalkylator',
      description: 'Beräkna billån, jämför leasing vs köp och total ägandekostnad.',
      icon: <Calculator className="w-6 h-6 text-accent" strokeWidth={1.5} />,
      link: '/kalkylator',
      color: 'bg-amber-50'
    },
    {
      title: 'Däck & Service',
      description: 'Dimensioner, rekommendationer och serviceintervaller.',
      icon: <Settings className="w-6 h-6 text-accent" strokeWidth={1.5} />,
      link: '/dack',
      color: 'bg-emerald-50'
    }
  ];

  const brands = [
    'Volvo', 'Volkswagen', 'Toyota', 'BMW', 'Mercedes-Benz', 'Kia',
    'Audi', 'Skoda', 'Peugeot', 'Ford', 'Nissan', 'Tesla'
  ];

  return (
    <div className="flex flex-col bg-white selection:bg-accent selection:text-white">
      {/* Hero Section */}
      <section className="relative pt-40 pb-48 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Atmospheric Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none overflow-hidden z-0">
          <motion.div 
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3],
              x: [0, 50, 0],
              y: [0, -30, 0]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[-10%] left-[10%] w-[60%] h-[60%] bg-accent/10 rounded-full blur-[120px]"
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2],
              x: [0, -40, 0],
              y: [0, 40, 0]
            }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-[-10%] right-[10%] w-[50%] h-[50%] bg-accent-vibrant/10 rounded-full blur-[100px]"
          />
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/5 border border-accent/10 text-accent text-[10px] font-bold uppercase tracking-[0.2em] mb-12"
          >
            <div className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
            </div>
            Sveriges mest kompletta bilportal
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-7xl md:text-9xl font-light text-black tracking-tighter mb-12 leading-[0.9] md:leading-[0.85]"
          >
            Fordonets data.<br/>
            <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent via-accent-vibrant to-accent">Helt transparent.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-zinc-500 mb-16 max-w-2xl mx-auto font-light leading-relaxed"
          >
            Sök på registreringsnummer och få besiktningshistorik, skatt, marknadsvärdering och AI-rådgivning. Utan kostnad.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="max-w-2xl mx-auto mb-16"
          >
            <SearchBox size="large" className="shadow-2xl shadow-accent/10" />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 text-[10px] font-bold text-zinc-400 uppercase tracking-[0.25em]"
          >
            <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-accent"></div> 100% Gratis</span>
            <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-accent"></div> Ingen inloggning</span>
            <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-accent"></div> Uppdateras dagligen</span>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-zinc-50 border-y border-zinc-100 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            {[
              { label: 'Fordon i databasen', value: '7.3M', icon: <Database className="w-4 h-4 mb-2 mx-auto text-accent" /> },
              { label: 'Bilmärken', value: '30+', icon: <Activity className="w-4 h-4 mb-2 mx-auto text-accent" /> },
              { label: 'Prisanalyser / dag', value: '10k', icon: <TrendingUp className="w-4 h-4 mb-2 mx-auto text-accent" /> },
              { label: 'Användarbetyg', value: '4.8', icon: <Star className="w-4 h-4 mb-2 mx-auto text-accent" /> }
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group"
              >
                {stat.icon}
                <div className="text-5xl md:text-6xl font-light text-black mb-3 tracking-tighter group-hover:text-accent transition-colors duration-500">{stat.value}</div>
                <div className="micro-label">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="micro-label mb-6 text-accent flex items-center gap-2"
              >
                <div className="w-8 h-[1px] bg-accent"></div>
                Våra tjänster
              </motion.div>
              <h2 className="text-5xl md:text-6xl font-light text-black mb-8 tracking-tight leading-tight">Allt du behöver veta. <br/><span className="text-zinc-300 italic serif">På ett ställe.</span></h2>
              <p className="text-zinc-500 font-light text-xl leading-relaxed max-w-xl">
                Vi aggregerar data från Transportstyrelsen, Blocket och andra källor för att ge dig en komplett, oberoende bild av ditt fordon.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -12 }}
                className="flex"
              >
                <Link to={feature.link} className="card p-12 h-full flex flex-col group relative overflow-hidden">
                  <div className={`absolute top-0 right-0 w-32 h-32 ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-bl-full -mr-16 -mt-16`}></div>
                  
                  <div className="w-14 h-14 rounded-2xl bg-zinc-50 flex items-center justify-center mb-10 group-hover:bg-accent group-hover:text-white transition-all duration-500 relative z-10">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-medium text-black mb-4 relative z-10">{feature.title}</h3>
                  <p className="text-zinc-500 text-base font-light mb-10 leading-relaxed flex-grow relative z-10">{feature.description}</p>
                  <div className="flex items-center text-[11px] font-bold uppercase tracking-[0.2em] text-accent group-hover:translate-x-2 transition-transform duration-300 relative z-10">
                    Läs mer <ArrowRight className="w-4 h-4 ml-2" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Brands */}
      <section className="py-32 bg-zinc-50 border-t border-zinc-100 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-6">
            <div>
              <div className="micro-label mb-6 text-accent flex items-center gap-2">
                <div className="w-8 h-[1px] bg-accent"></div>
                Marknadsdata
              </div>
              <h2 className="text-4xl font-light text-black mb-4 tracking-tight">Utforska märken</h2>
              <p className="text-zinc-500 font-light text-lg">Statistik och data per tillverkare.</p>
            </div>
            <Link to="/bil" className="flex items-center text-[11px] font-bold uppercase tracking-[0.2em] text-black hover:text-accent transition-colors group">
              Visa alla märken <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {brands.map((brand, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -4, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link 
                  to={`/bil/${brand.toLowerCase()}`}
                  className="bg-white border border-zinc-200 rounded-2xl p-10 flex items-center justify-center text-center hover:border-accent hover:shadow-xl hover:shadow-accent/5 transition-all duration-500 h-full"
                >
                  <span className="font-medium text-black text-base tracking-tight">{brand}</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-48 bg-black text-white overflow-hidden px-4">
        {/* Abstract Background */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-0 right-0 w-[70%] h-full bg-accent/20 blur-[150px] rounded-full pointer-events-none"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{ duration: 15, repeat: Infinity, delay: 2 }}
          className="absolute bottom-0 left-0 w-[50%] h-full bg-accent-vibrant/10 blur-[120px] rounded-full pointer-events-none"
        />
        
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="micro-label text-accent mb-10"
          >
            Kommande release
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-light mb-12 leading-[0.9] tracking-tighter"
          >
            Få stenkoll <br/>i fickan.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-zinc-400 font-light text-xl md:text-2xl mb-20 max-w-2xl mx-auto leading-relaxed"
          >
            Ladda ner BilKoll-appen för att få pushnotiser vid prisförändringar, påminnelser om besiktning och mycket mer.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-8"
          >
            <motion.button 
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="bg-accent text-white font-bold rounded-full px-12 py-6 transition-all w-full sm:w-auto shadow-2xl shadow-accent/40 text-lg"
            >
              Ladda ner för iOS
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 text-white font-bold rounded-full px-12 py-6 transition-all w-full sm:w-auto text-lg"
            >
              Ladda ner för Android
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
