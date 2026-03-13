import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ChevronRight, ShieldCheck, AlertTriangle, CheckCircle, Wrench, ArrowRight, Clock, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';

interface ModelIssue {
  issue: string;
  severity: 'high' | 'medium' | 'low';
  description: string;
}

export default function BesiktningModelPage() {
  const { brand, model } = useParams<{ brand: string; model: string }>();
  const brandName = brand ? brand.charAt(0).toUpperCase() + brand.slice(1) : '';
  const modelName = model ? model.toUpperCase().replace(/-/g, ' ') : '';
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Try to fetch model-specific data from API
    fetch(`/api/market/${encodeURIComponent(brandName)}/${encodeURIComponent(modelName.replace(/ /g, '-'))}`)
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, [brand, model]);

  // Common issues database (static for now, could be API-driven)
  const commonIssues: Record<string, ModelIssue[]> = {
    'volvo': [
      { issue: 'Oljespill från motor', severity: 'medium', description: 'Vanligt på äldre 5-cylindriga motorer. Kontrollera packningar runt kamaxeltätning.' },
      { issue: 'Rostangrepp på hjulhus', severity: 'high', description: 'Särskilt bakre hjulhus. Kontrollera noggrant under plastskydd.' },
      { issue: 'Fjädringsljud', severity: 'low', description: 'Krängningshämmarbussningar och stötdämparinfästningar slits.' },
      { issue: 'ABS-sensor', severity: 'medium', description: 'Sensorer kan sluta fungera, ger varningslampa och underkänt vid besiktning.' },
      { issue: 'Avgasrening (katalysator)', severity: 'high', description: 'Äldre Volvo kan få underkänt på avgasvärden. Kontrollera lambdasonder.' },
    ],
    'volkswagen': [
      { issue: 'DSG-växellåda rycker', severity: 'high', description: 'Dubbelkopplingslådan kan ge ryck vid låga hastigheter. Mjukvaruuppdatering kan hjälpa.' },
      { issue: 'Oljeförbrukning (TSI)', severity: 'medium', description: 'TSI-motorer 2008-2013 kan dra olja. Kontrollera nivå regelbundet.' },
      { issue: 'EGR-ventil igensatt', severity: 'medium', description: 'Dieselmodeller. Ger motorlampa och kan ge underkänt på avgaser.' },
      { issue: 'Rattslitage', severity: 'low', description: 'Mjukplast på ratten kan slitas, inga besiktningsproblem men estetiskt.' },
    ],
    'toyota': [
      { issue: 'Extremt få besiktningsproblem', severity: 'low', description: 'Toyota toppar pålitlighetsstatistiken. Vanligaste felet är slitna bromsskivor.' },
      { issue: 'Hybridbatteri (äldre Prius)', severity: 'medium', description: 'Batteriet kan tappa kapacitet efter 15+ år men besiktningsproblem är ovanliga.' },
    ],
    'bmw': [
      { issue: 'Oljeläckage (N47/N57)', severity: 'high', description: 'Ventillockspackning och oljekylare. Vanligt på 2008-2013 modeller.' },
      { issue: 'Kamkedja (N47)', severity: 'high', description: 'Kan sträckas och ge motorskada. Lyssna efter rassling vid kallstart.' },
      { issue: 'Elektronikproblem', severity: 'medium', description: 'Varningslampor för TPMS, ABS, airbag. Åtgärda innan besiktning.' },
      { issue: 'Rost i hjulhus', severity: 'medium', description: 'Vanligt på äldre 3-serien och 5-serien.' },
    ],
  };

  const issues = commonIssues[brand || ''] || [
    { issue: 'Bromsar (belägg och skivor)', severity: 'medium' as const, description: 'Kontrollera tjocklek och slitage. Vanligaste orsaken till underkänd besiktning.' },
    { issue: 'Belysning', severity: 'low' as const, description: 'Alla lampor måste fungera. Kontrollera strålkastare, bromsljus och blinkers.' },
    { issue: 'Däck (mönsterdjup)', severity: 'medium' as const, description: 'Minst 1.6mm sommardäck, 3mm vinterdäck. Ojämnt slitage kan indikera chassiproblem.' },
    { issue: 'Avgassystem', severity: 'high' as const, description: 'Läckage i avgasrör eller defekt katalysator ger underkänt.' },
  ];

  const severityColors = {
    high: { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', dot: 'bg-red-500', label: 'Hög risk' },
    medium: { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', dot: 'bg-amber-500', label: 'Medel risk' },
    low: { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', dot: 'bg-emerald-500', label: 'Låg risk' },
  };

  return (
    <div className="bg-white min-h-screen pb-32 selection:bg-accent selection:text-white">
      {/* Breadcrumbs */}
      <div className="bg-zinc-50/50 border-b border-zinc-100 pt-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center text-[10px] font-bold uppercase tracking-widest text-zinc-400">
            <Link to="/" className="hover:text-accent transition-colors">Hem</Link>
            <ChevronRight className="w-3 h-3 mx-3 opacity-50" />
            <Link to="/besiktning" className="hover:text-accent transition-colors">Besiktning</Link>
            <ChevronRight className="w-3 h-3 mx-3 opacity-50" />
            <Link to={`/besiktning/${brand}`} className="hover:text-accent transition-colors">{brandName}</Link>
            <ChevronRight className="w-3 h-3 mx-3 opacity-50" />
            <span className="text-black">{modelName}</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="relative pt-16 pb-20 overflow-hidden border-b border-zinc-100">
        <div className="absolute top-0 right-0 w-[40%] h-full bg-blue-500/5 blur-[100px] rounded-full pointer-events-none"></div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center gap-10">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-20 h-20 bg-white border border-zinc-200 rounded-[1.5rem] flex items-center justify-center shadow-xl shadow-black/5"
            >
              <ShieldCheck className="w-8 h-8 text-accent" strokeWidth={1.5} />
            </motion.div>
            <div>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="micro-label text-accent mb-4">Besiktningsguide</motion.div>
              <motion.h1 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-6xl font-light text-black tracking-tighter mb-4"
              >
                {brandName} {modelName}
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-lg text-zinc-500 font-light max-w-2xl"
              >
                Vanliga besiktningsfel, tips för godkänd kontroll och vad du bör kolla innan du besiktigar din {brandName} {modelName}.
              </motion.p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        {/* Common Issues */}
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-10">
            <div className="micro-label text-accent flex items-center gap-2">
              <div className="w-8 h-[1px] bg-accent"></div>
              Vanliga besiktningsfel
            </div>
          </div>
          <h2 className="text-3xl font-light text-black tracking-tight mb-4">
            Kända problem — {brandName} {modelName}
          </h2>
          <p className="text-zinc-500 font-light text-lg mb-12">
            Baserat på besiktningsstatistik och verkstadsdata. Kontrollera dessa punkter innan besiktning.
          </p>

          <div className="space-y-4">
            {issues.map((issue, i) => {
              const sev = severityColors[issue.severity];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className={`card p-8 border-l-4 ${sev.border}`}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <AlertTriangle className={`w-5 h-5 ${sev.text}`} />
                        <h3 className="text-lg font-medium text-black">{issue.issue}</h3>
                      </div>
                      <p className="text-zinc-500 font-light">{issue.description}</p>
                    </div>
                    <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest ${sev.bg} ${sev.text} whitespace-nowrap`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${sev.dot}`}></div>
                      {sev.label}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Checklist */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-zinc-50 rounded-[2.5rem] p-12 mb-20"
        >
          <h2 className="text-3xl font-light text-black tracking-tight mb-10">Checklista före besiktning</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { icon: <CheckCircle className="w-5 h-5 text-emerald-500" />, text: 'Alla lampor fungerar (strålkastare, bromsljus, blinkers)' },
              { icon: <CheckCircle className="w-5 h-5 text-emerald-500" />, text: 'Däck: minst 1.6mm mönsterdjup (3mm vinterdäck)' },
              { icon: <CheckCircle className="w-5 h-5 text-emerald-500" />, text: 'Vindrutetorkare fungerar, spolarvätska fylld' },
              { icon: <CheckCircle className="w-5 h-5 text-emerald-500" />, text: 'Ingen motorlampa lyser' },
              { icon: <CheckCircle className="w-5 h-5 text-emerald-500" />, text: 'Bromsar: inga ljud, bra verkan' },
              { icon: <CheckCircle className="w-5 h-5 text-emerald-500" />, text: 'Avgassystem: inga läckage eller ovanliga ljud' },
              { icon: <CheckCircle className="w-5 h-5 text-emerald-500" />, text: 'Stenskott i vindrutan lagade' },
              { icon: <CheckCircle className="w-5 h-5 text-emerald-500" />, text: 'Säkerhetsbälten fungerar i alla säten' },
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex items-start gap-4 p-4"
              >
                {item.icon}
                <span className="text-zinc-700 font-light">{item.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-black text-white rounded-[2.5rem] p-12 text-center relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-[60%] h-full bg-accent/20 blur-[100px] rounded-full pointer-events-none"></div>
          <div className="relative z-10">
            <h3 className="text-3xl md:text-4xl font-light mb-6 tracking-tight">Sök din {brandName} {modelName}</h3>
            <p className="text-zinc-400 font-light text-lg mb-10 max-w-xl mx-auto">
              Ange registreringsnumret och få besiktningsdatum, skatt, marknadsvärde och AI-rådgivning.
            </p>
            <Link 
              to="/sok" 
              className="inline-flex items-center gap-2 bg-accent text-white px-10 py-5 rounded-full font-bold text-lg shadow-2xl shadow-accent/40 hover:scale-105 transition-transform"
            >
              Sök fordon <ArrowRight size={20} />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
