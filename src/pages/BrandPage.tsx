import { Link, useParams } from 'react-router-dom';
import { ChevronRight, Car, Info, ArrowRight, Activity, TrendingUp, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

export default function BrandPage() {
  const { brand } = useParams<{ brand: string }>();
  const brandName = brand ? brand.charAt(0).toUpperCase() + brand.slice(1) : 'Volvo';

  const models = [
    { name: 'XC60', count: '145 230', trend: '+2.4%' },
    { name: 'V60', count: '132 450', trend: '-1.2%' },
    { name: 'XC40', count: '89 120', trend: '+5.8%' },
    { name: 'V90', count: '76 540', trend: '+0.5%' },
    { name: 'XC90', count: '54 320', trend: '-0.8%' },
    { name: 'S60', count: '45 100', trend: '+1.1%' },
    { name: 'V40', count: '42 800', trend: '-3.4%' },
    { name: 'C40', count: '12 400', trend: '+12.4%' },
    { name: 'EX30', count: '8 500', trend: 'New' },
  ];

  return (
    <div className="bg-white min-h-screen pb-32 selection:bg-accent selection:text-white">
      {/* Breadcrumbs */}
      <div className="bg-zinc-50/50 border-b border-zinc-100 pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center text-[10px] font-bold uppercase tracking-widest text-zinc-400">
            <Link to="/" className="hover:text-accent transition-colors">Hem</Link>
            <ChevronRight className="w-3 h-3 mx-3 opacity-50" />
            <Link to="/bil" className="hover:text-accent transition-colors">Märken</Link>
            <ChevronRight className="w-3 h-3 mx-3 opacity-50" />
            <span className="text-black">{brandName}</span>
          </nav>
        </div>
      </div>

      {/* Header */}
      <section className="relative pt-16 pb-24 overflow-hidden border-b border-zinc-100">
        {/* Atmospheric Background */}
        <div className="absolute top-0 right-0 w-[40%] h-full bg-accent/5 blur-[100px] rounded-full pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center gap-10">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-24 h-24 bg-white border border-zinc-200 rounded-[2rem] flex items-center justify-center shadow-xl shadow-black/5"
            >
              <Car className="w-10 h-10 text-accent" strokeWidth={1.5} />
            </motion.div>
            
            <div className="flex-grow">
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="micro-label text-accent mb-4"
              >
                Bilmarknad Sverige
              </motion.div>
              <motion.h1 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-5xl md:text-7xl font-light text-black tracking-tighter mb-6"
              >
                {brandName}
              </motion.h1>
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex flex-wrap gap-8"
              >
                <div className="flex items-center gap-3">
                  <Activity size={18} className="text-accent" />
                  <span className="text-xl font-light text-zinc-500"><span className="font-bold text-black">606 460</span> fordon i trafik</span>
                </div>
                <div className="flex items-center gap-3">
                  <TrendingUp size={18} className="text-emerald-500" />
                  <span className="text-xl font-light text-zinc-500">Marknadsandel <span className="font-bold text-black">12.4%</span></span>
                </div>
              </motion.div>
            </div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-12 max-w-3xl text-zinc-500 text-lg font-light leading-relaxed"
          >
            <p>
              {brandName} är ett av Sveriges mest populära bilmärken. Här hittar du information om alla modeller, 
              specifikationer, vanliga besiktningsanmärkningar och marknadsvärderingar för {brandName}-bilar.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl font-light text-black tracking-tight">Modeller <span className="text-zinc-300 ml-2">({models.length})</span></h2>
            <p className="text-zinc-500 font-light mt-2">De mest populära modellerna från {brandName} i Sverige.</p>
          </div>
          <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-50 border border-zinc-100 text-[10px] font-bold uppercase tracking-widest text-zinc-400">
            Sorterat efter popularitet
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {models.map((model, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -6 }}
            >
              <Link 
                to={`/bil/${brand?.toLowerCase() || 'volvo'}/${model.name.toLowerCase()}`}
                className="card p-8 flex items-center justify-between group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-bl-full -mr-12 -mt-12"></div>
                
                <div className="relative z-10">
                  <h3 className="text-xl font-medium text-black group-hover:text-accent transition-colors duration-300">
                    {brandName} {model.name}
                  </h3>
                  <div className="flex items-center gap-4 mt-3">
                    <p className="text-sm text-zinc-400 font-light">{model.count} i trafik</p>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      model.trend === 'New' ? 'bg-accent/10 text-accent' : 
                      model.trend.startsWith('+') ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                    }`}>
                      {model.trend}
                    </span>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-full bg-zinc-50 flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-all duration-300 relative z-10">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Info Box */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 bg-accent/5 rounded-[2.5rem] p-12 border border-accent/10 flex flex-col md:flex-row items-center gap-8 text-center md:text-left"
        >
          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg shadow-accent/5 flex-shrink-0">
            <Info className="w-8 h-8 text-accent" strokeWidth={1.5} />
          </div>
          <div className="flex-grow">
            <h4 className="text-2xl font-medium text-black mb-3">Saknar du en modell?</h4>
            <p className="text-zinc-500 font-light text-lg leading-relaxed max-w-3xl">
              Vi visar endast modeller med fler än 100 fordon i trafik för att säkerställa tillförlitlig statistik. 
              Du kan alltid söka på ett specifikt registreringsnummer för att hitta information om ovanligare modeller.
            </p>
          </div>
          <Link 
            to="/sok"
            className="bg-black text-white px-8 py-4 rounded-full font-bold hover:bg-accent transition-all duration-300 shadow-xl shadow-black/10 flex-shrink-0"
          >
            Sök specifikt fordon
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
