import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, CarFront, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // spa: true = use React Router Link (client-side); false = use <a> (server-side)
  const navLinks = [
    { name: 'Märken', path: '/bil/volvo', spa: false },
    { name: 'Marknad', path: '/marknad', spa: true },
    { name: 'Besiktning', path: '/besiktning', spa: false },
    { name: 'Värdering', path: '/vardering', spa: false },
    { name: 'Premium', path: '/premium', spa: true },
    { name: 'Guider', path: '/guide', spa: false },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-white/80 backdrop-blur-xl border-b border-zinc-200/50 py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-12">
          {/* Logo */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-shrink-0 flex items-center"
          >
            <Link to="/" className="flex items-center gap-2 group">
              <div className="text-black group-hover:text-accent transition-colors duration-300">
                <CarFront size={28} strokeWidth={1.5} />
              </div>
              <span className="font-bold text-2xl tracking-tighter text-black">BilKoll</span>
            </Link>
          </motion.div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link, i) => {
              const isActive = location.pathname === link.path || location.pathname.startsWith(link.path + '/');
              const cls = `px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                isActive ? 'text-accent bg-accent/5' : 'text-zinc-500 hover:text-black hover:bg-zinc-100'
              }`;
              return (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  {link.spa ? (
                    <Link to={link.path} className={cls}>{link.name}</Link>
                  ) : (
                    <a href={link.path} className={cls}>{link.name}</a>
                  )}
                </motion.div>
              );
            })}
          </nav>

          {/* Actions (Desktop) */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden md:flex items-center gap-4"
          >
            <Link 
              to="/sok" 
              className="w-10 h-10 flex items-center justify-center rounded-full text-zinc-400 hover:text-black hover:bg-zinc-100 transition-all duration-300"
            >
              <Search size={20} strokeWidth={1.5} />
            </Link>
            <Link 
              to="/sok" 
              className="bg-black text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-accent transition-all duration-300 shadow-lg shadow-black/5 hover:shadow-accent/20"
            >
              Sök fordon
            </Link>
          </motion.div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-zinc-500 hover:text-black p-2 transition-colors"
            >
              {isMobileMenuOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-zinc-100 bg-white overflow-hidden"
          >
            <div className="px-4 pt-4 pb-8 space-y-2">
              {navLinks.map((link) => 
                link.spa ? (
                  <Link key={link.name} to={link.path} className="block px-4 py-3 rounded-2xl text-lg font-medium text-zinc-600 hover:text-accent hover:bg-accent/5 transition-all">
                    {link.name}
                  </Link>
                ) : (
                  <a key={link.name} href={link.path} className="block px-4 py-3 rounded-2xl text-lg font-medium text-zinc-600 hover:text-accent hover:bg-accent/5 transition-all">
                    {link.name}
                  </a>
                )
              )}
              <div className="pt-4">
                <Link
                  to="/sok"
                  className="flex items-center justify-center w-full px-4 py-4 rounded-2xl bg-black text-white font-bold text-center"
                >
                  Sök fordon
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
