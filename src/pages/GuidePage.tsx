import { Link } from 'react-router-dom';
import { ChevronRight, Calendar, User, Clock, ArrowLeft, Share2, Bookmark, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export default function GuidePage() {
  return (
    <div className="bg-white min-h-screen pb-32 selection:bg-accent selection:text-white">
      {/* Breadcrumbs */}
      <div className="bg-zinc-50/50 border-b border-zinc-100 pt-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center text-[10px] font-bold uppercase tracking-widest text-zinc-400">
            <Link to="/" className="hover:text-accent transition-colors">Hem</Link>
            <ChevronRight className="w-3 h-3 mx-3 opacity-50" />
            <Link to="/guide" className="hover:text-accent transition-colors">Guider</Link>
            <ChevronRight className="w-3 h-3 mx-3 opacity-50" />
            <span className="text-black truncate">Besiktning 2026</span>
          </nav>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        {/* Article Header */}
        <header className="mb-20 relative">
          {/* Atmospheric Blur */}
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-accent/5 blur-[100px] rounded-full pointer-events-none"></div>
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap items-center gap-6 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 mb-10"
          >
            <span className="px-3 py-1 rounded-full bg-accent/5 text-accent border border-accent/10">Besiktning</span>
            <div className="flex items-center gap-2"><Calendar className="w-3.5 h-3.5" /> 10 mars 2026</div>
            <div className="flex items-center gap-2"><Clock className="w-3.5 h-3.5" /> 5 min läsning</div>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-light text-black tracking-tighter mb-10 leading-[0.95]"
          >
            Nya besiktningsregler 2026: <br/>
            <span className="font-bold italic serif text-accent">Allt du behöver veta.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-zinc-500 font-light leading-relaxed max-w-2xl"
          >
            Från och med maj 2026 införs nya, strängare regler för kontrollbesiktning i Sverige. Här går vi igenom vad som gäller för din bil och hur du undviker onödiga ombesiktningar.
          </motion.p>

          {/* Social Actions */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex items-center gap-4 mt-12 pt-12 border-t border-zinc-100"
          >
            <button className="w-10 h-10 rounded-full border border-zinc-200 flex items-center justify-center text-zinc-400 hover:text-accent hover:border-accent transition-all">
              <Share2 size={18} />
            </button>
            <button className="w-10 h-10 rounded-full border border-zinc-200 flex items-center justify-center text-zinc-400 hover:text-accent hover:border-accent transition-all">
              <Bookmark size={18} />
            </button>
          </motion.div>
        </header>

        {/* Article Content */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="prose prose-zinc prose-lg max-w-none"
        >
          <p className="text-xl text-zinc-600 font-light leading-relaxed mb-12">
            Transportstyrelsen har uppdaterat föreskrifterna för kontrollbesiktning för att anpassa sig till nya EU-direktiv. De största förändringarna rör elektroniska system, avgasrening och elbilar.
          </p>

          <h2 className="text-3xl font-light text-black tracking-tight mt-16 mb-8">1. Hårdare krav på avgasrening (OBD)</h2>
          <p className="text-zinc-600 font-light leading-relaxed mb-8">
            För bilar tillverkade efter 2010 kommer besiktningsorganen nu att läsa av bilens omborddiagnostik (OBD) mycket mer noggrant. Om systemet indikerar att avgasreningen (t.ex. partikelfilter eller EGR-ventil) har manipulerats eller inte fungerar optimalt, blir det automatiskt underkänt.
          </p>
          
          <div className="bg-accent/5 border-l-4 border-accent p-10 my-12 rounded-r-[2rem]">
            <h4 className="text-xl font-medium text-black mb-4 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-accent"></div>
              BilKoll tipsar:
            </h4>
            <p className="text-zinc-600 font-light italic leading-relaxed m-0">
              "Om bilens motorlampa lyser, åk inte till besiktningen. Läs av felkoderna på en verkstad först, annars får du garanterat en tvåa."
            </p>
          </div>

          <h2 className="text-3xl font-light text-black tracking-tight mt-16 mb-8">2. Nya kontroller för elbilar</h2>
          <p className="text-zinc-600 font-light leading-relaxed mb-8">
            I takt med att elbilarna blir äldre införs nu specifika kontrollpunkter för högvoltssystemet. Besiktningsteknikern kommer att visuellt inspektera batteripaketets hölje för skador och kontrollera laddkablar och kontakter.
          </p>
          <ul className="space-y-4 text-zinc-600 font-light">
            <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-accent"></div> Visuell kontroll av batteripaket</li>
            <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-accent"></div> Kontroll av laddkontaktens låsmekanism</li>
            <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-accent"></div> Kontroll av varningsdekaler för högspänning</li>
          </ul>

          <h2 className="text-3xl font-light text-black tracking-tight mt-16 mb-8">3. Belysning och LED-konvertering</h2>
          <p className="text-zinc-600 font-light leading-relaxed mb-12">
            Reglerna kring eftermonterad LED-belysning i halogenlyktor skärps ytterligare. Det är fortfarande olagligt att sätta LED-lampor i en strålkastare som är typgodkänd för halogen, och besiktningsstationerna har fått nya direktiv att slå ner hårdare på detta på grund av bländningsrisken.
          </p>

          <h2 className="text-3xl font-light text-black tracking-tight mt-16 mb-8">När ska min bil besiktigas?</h2>
          <p className="text-zinc-600 font-light mb-10">
            Grundregeln (3-2-1-regeln) gäller fortfarande:
          </p>
          
          <div className="overflow-hidden rounded-3xl border border-zinc-100 shadow-xl shadow-black/5 my-12">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-zinc-50">
                  <th className="px-8 py-6 text-left text-[10px] font-bold uppercase tracking-widest text-zinc-400 border-b border-zinc-100">Fordonets ålder</th>
                  <th className="px-8 py-6 text-left text-[10px] font-bold uppercase tracking-widest text-zinc-400 border-b border-zinc-100">Besiktningsintervall</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                <tr className="hover:bg-zinc-50/50 transition-colors">
                  <td className="px-8 py-6 text-black font-medium">Ny bil</td>
                  <td className="px-8 py-6 text-zinc-500 font-light">Första gången efter 3 år</td>
                </tr>
                <tr className="hover:bg-zinc-50/50 transition-colors">
                  <td className="px-8 py-6 text-black font-medium">Efter första besiktningen</td>
                  <td className="px-8 py-6 text-zinc-500 font-light">Andra gången efter 2 år</td>
                </tr>
                <tr className="hover:bg-zinc-50/50 transition-colors">
                  <td className="px-8 py-6 text-black font-medium">Äldre än 5 år</td>
                  <td className="px-8 py-6 text-zinc-500 font-light">Varje år (senast 14 månader efter föregående)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-zinc-500 italic font-light text-lg mt-12">
            Är du osäker på när din bil ska besiktigas? Sök på ditt registreringsnummer på BilKolls startsida så ser du exakt datum.
          </p>
        </motion.div>

        {/* Author / Share */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 pt-12 border-t border-zinc-100 flex flex-col sm:flex-row items-center justify-between gap-8"
        >
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-zinc-100 rounded-2xl flex items-center justify-center">
              <User className="w-8 h-8 text-zinc-400" />
            </div>
            <div>
              <div className="text-xl font-medium text-black">BilKoll Redaktionen</div>
              <div className="text-sm text-zinc-400 font-bold uppercase tracking-widest mt-1">Fordonsexperter</div>
            </div>
          </div>
          <Link to="/sok" className="bg-black text-white px-10 py-4 rounded-full font-bold hover:bg-accent transition-all duration-300 shadow-xl shadow-black/10 flex items-center gap-2">
            Sök regnummer <ArrowRight size={18} />
          </Link>
        </motion.div>
      </article>
    </div>
  );
}
