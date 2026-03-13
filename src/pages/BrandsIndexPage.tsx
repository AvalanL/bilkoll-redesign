import { Link } from 'react-router-dom';
import { ArrowRight, Car, TrendingUp, Database } from 'lucide-react';
import { motion } from 'motion/react';

export default function BrandsIndexPage() {
  const brands = [
    { name: 'Volvo', slug: 'volvo', country: '🇸🇪' },
    { name: 'Volkswagen', slug: 'volkswagen', country: '🇩🇪' },
    { name: 'Toyota', slug: 'toyota', country: '🇯🇵' },
    { name: 'BMW', slug: 'bmw', country: '🇩🇪' },
    { name: 'Mercedes-Benz', slug: 'mercedes-benz', country: '🇩🇪' },
    { name: 'Audi', slug: 'audi', country: '🇩🇪' },
    { name: 'Kia', slug: 'kia', country: '🇰🇷' },
    { name: 'Hyundai', slug: 'hyundai', country: '🇰🇷' },
    { name: 'Skoda', slug: 'skoda', country: '🇨🇿' },
    { name: 'Tesla', slug: 'tesla', country: '🇺🇸' },
    { name: 'Ford', slug: 'ford', country: '🇺🇸' },
    { name: 'Nissan', slug: 'nissan', country: '🇯🇵' },
    { name: 'Mazda', slug: 'mazda', country: '🇯🇵' },
    { name: 'Peugeot', slug: 'peugeot', country: '🇫🇷' },
    { name: 'Renault', slug: 'renault', country: '🇫🇷' },
    { name: 'Opel', slug: 'opel', country: '🇩🇪' },
    { name: 'Honda', slug: 'honda', country: '🇯🇵' },
    { name: 'Suzuki', slug: 'suzuki', country: '🇯🇵' },
    { name: 'Saab', slug: 'saab', country: '🇸🇪' },
    { name: 'Fiat', slug: 'fiat', country: '🇮🇹' },
    { name: 'Citroën', slug: 'citroen', country: '🇫🇷' },
    { name: 'SEAT', slug: 'seat', country: '🇪🇸' },
    { name: 'CUPRA', slug: 'cupra', country: '🇪🇸' },
    { name: 'Dacia', slug: 'dacia', country: '🇷🇴' },
    { name: 'MINI', slug: 'mini', country: '🇬🇧' },
    { name: 'Porsche', slug: 'porsche', country: '🇩🇪' },
    { name: 'MG', slug: 'mg', country: '🇬🇧' },
    { name: 'Polestar', slug: 'polestar', country: '🇸🇪' },
    { name: 'Mitsubishi', slug: 'mitsubishi', country: '🇯🇵' },
    { name: 'Jeep', slug: 'jeep', country: '🇺🇸' },
  ];

  return (
    <div className="bg-white min-h-screen pb-32 selection:bg-accent selection:text-white">
      <section className="relative pt-40 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none overflow-hidden z-0">
          <motion.div 
            animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[-10%] left-[10%] w-[60%] h-[60%] bg-accent/10 rounded-full blur-[120px]"
          />
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/5 border border-accent/10 text-accent text-[10px] font-bold uppercase tracking-[0.2em] mb-12"
          >
            <Database size={14} />
            Alla märken
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-6xl md:text-8xl font-light text-black tracking-tighter mb-12 leading-[0.9]"
          >
            30 märken.<br/>
            <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent via-accent-vibrant to-accent">Tusentals bilar.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-zinc-500 mb-16 max-w-2xl mx-auto font-light leading-relaxed"
          >
            Utforska marknadsdata, specifikationer och prishistorik för alla populära bilmärken i Sverige.
          </motion.p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {brands.map((brand, index) => (
              <motion.div
                key={brand.slug}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.03 }}
                whileHover={{ y: -6, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link 
                  to={`/bil/${brand.slug}`}
                  className="bg-white border border-zinc-200 rounded-2xl p-10 flex flex-col items-center justify-center text-center hover:border-accent hover:shadow-xl hover:shadow-accent/5 transition-all duration-500 h-full gap-2"
                >
                  <span className="text-2xl mb-2">{brand.country}</span>
                  <span className="font-medium text-black text-lg tracking-tight">{brand.name}</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
