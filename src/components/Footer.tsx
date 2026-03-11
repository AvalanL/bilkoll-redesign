import { Link } from 'react-router-dom';
import { CarFront, Instagram, Twitter, Facebook, Mail } from 'lucide-react';
import { motion } from 'motion/react';

export default function Footer() {
  return (
    <footer className="bg-zinc-50 border-t border-zinc-100 pt-24 pb-12 selection:bg-accent selection:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 mb-20">
          
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-8 group">
              <div className="bg-black text-accent p-2 rounded-2xl group-hover:bg-accent group-hover:text-white transition-all duration-500">
                <CarFront size={28} strokeWidth={1.5} />
              </div>
              <span className="font-bold text-2xl tracking-tighter text-black">BilKoll</span>
            </Link>
            <p className="text-zinc-500 text-lg font-light mb-10 max-w-xs leading-relaxed">
              Sveriges smartaste bilportal. Sök på registreringsnummer och få all information du behöver, helt gratis.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-zinc-200 flex items-center justify-center text-zinc-400 hover:text-accent hover:border-accent transition-all">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-zinc-200 flex items-center justify-center text-zinc-400 hover:text-accent hover:border-accent transition-all">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-zinc-200 flex items-center justify-center text-zinc-400 hover:text-accent hover:border-accent transition-all">
                <Facebook size={18} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-black mb-8">Populära märken</h3>
            <ul className="space-y-4 text-sm text-zinc-500 font-light">
              <li><Link to="/bil/volvo" className="hover:text-accent transition-colors">Volvo</Link></li>
              <li><Link to="/bil/volkswagen" className="hover:text-accent transition-colors">Volkswagen</Link></li>
              <li><Link to="/bil/toyota" className="hover:text-accent transition-colors">Toyota</Link></li>
              <li><Link to="/bil/bmw" className="hover:text-accent transition-colors">BMW</Link></li>
              <li><Link to="/bil/mercedes" className="hover:text-accent transition-colors">Mercedes-Benz</Link></li>
              <li><Link to="/bil/tesla" className="hover:text-accent transition-colors">Tesla</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-black mb-8">Verktyg</h3>
            <ul className="space-y-4 text-sm text-zinc-500 font-light">
              <li><Link to="/sok" className="hover:text-accent transition-colors">Sök regnummer</Link></li>
              <li><Link to="/marknad" className="hover:text-accent transition-colors">Marknadsöversikt</Link></li>
              <li><Link to="/guide/besiktning" className="hover:text-accent transition-colors">Besiktningsguide</Link></li>
              <li><Link to="/skatt" className="hover:text-accent transition-colors">Fordonsskatt</Link></li>
              <li><Link to="/vardering" className="hover:text-accent transition-colors">Bilvärdering</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-black mb-8">Företaget</h3>
            <ul className="space-y-4 text-sm text-zinc-500 font-light">
              <li><Link to="/om-oss" className="hover:text-accent transition-colors">Om oss</Link></li>
              <li><Link to="/kontakt" className="hover:text-accent transition-colors">Kontakt</Link></li>
              <li><Link to="/annonsera" className="hover:text-accent transition-colors">Annonsera</Link></li>
              <li><Link to="/press" className="hover:text-accent transition-colors">Press</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-black mb-8">Support</h3>
            <ul className="space-y-4 text-sm text-zinc-500 font-light">
              <li><Link to="/hjalp" className="hover:text-accent transition-colors">Hjälpcenter</Link></li>
              <li><Link to="/integritet" className="hover:text-accent transition-colors">Integritetspolicy</Link></li>
              <li><Link to="/villkor" className="hover:text-accent transition-colors">Användarvillkor</Link></li>
              <li><Link to="/cookies" className="hover:text-accent transition-colors">Cookies</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-zinc-200 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-6">
            <p className="text-sm text-zinc-400 font-light">
              &copy; {new Date().getFullYear()} BilKoll AB.
            </p>
            <div className="hidden sm:flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-zinc-300">
              <span>7.3M+ fordon</span>
              <span className="w-1 h-1 rounded-full bg-zinc-200"></span>
              <span>Data uppdateras dagligen</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2 px-4 py-2 bg-white border border-zinc-100 rounded-full shadow-sm">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">System Status: Online</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
