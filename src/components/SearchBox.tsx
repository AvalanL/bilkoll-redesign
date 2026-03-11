import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { motion } from 'motion/react';

interface SearchBoxProps {
  size?: 'normal' | 'large';
  placeholder?: string;
  className?: string;
}

export default function SearchBox({ size = 'normal', placeholder = 'Registreringsnummer (t.ex. ABC 123)', className = '' }: SearchBoxProps) {
  const [regnr, setRegnr] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (regnr.trim()) {
      navigate(`/sok?regnr=${encodeURIComponent(regnr.replace(/\s/g, '').toUpperCase())}`);
    }
  };

  const isLarge = size === 'large';

  return (
    <motion.form 
      onSubmit={handleSearch} 
      className={`relative w-full mx-auto ${className}`}
      initial={false}
      animate={isFocused ? { scale: 1.02 } : { scale: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <div 
        className={`relative flex items-center bg-white rounded-full border transition-all duration-500 p-1.5 ${
          isFocused 
            ? 'border-accent shadow-[0_20px_50px_rgba(255,99,33,0.15)]' 
            : 'border-zinc-200 shadow-[0_2px_10px_rgba(0,0,0,0.04)]'
        }`}
      >
        <div className="pl-5 pr-2 flex items-center pointer-events-none">
          <Search 
            className={`${isLarge ? 'h-6 w-6' : 'h-5 w-5'} transition-colors duration-300 ${isFocused ? 'text-accent' : 'text-zinc-400'}`} 
            strokeWidth={1.5} 
          />
        </div>
        <input
          type="text"
          value={regnr}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={(e) => setRegnr(e.target.value)}
          className={`block w-full bg-transparent border-none focus:ring-0 text-black uppercase placeholder:normal-case placeholder:text-zinc-400 font-medium tracking-wider
            ${isLarge ? 'py-4 text-xl' : 'py-2.5 text-base'}`}
          placeholder={placeholder}
          maxLength={7}
          style={{ outline: 'none' }}
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className={`bg-black text-white rounded-full hover:bg-accent transition-colors font-bold ${
            isLarge ? 'px-10 py-4 text-base' : 'px-6 py-2.5 text-sm'
          }`}
        >
          Sök
        </motion.button>
      </div>
      
      {/* Decorative focus ring */}
      {isFocused && (
        <motion.div 
          layoutId="focus-ring"
          className="absolute -inset-1 rounded-[40px] border-2 border-accent/20 pointer-events-none z-0"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
        />
      )}
    </motion.form>
  );
}
