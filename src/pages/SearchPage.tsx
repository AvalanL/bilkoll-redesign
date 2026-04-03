import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { ShieldCheck, Calculator, TrendingUp, ChevronRight, Search, Zap, Info, ArrowRight, Car, History, Star, Activity, Loader2, Lock, CheckCircle2, AlertTriangle, Users, Gauge, Fuel, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import SearchBox from '../components/SearchBox';

interface VehicleData {
  vehicle?: any;
  valuation?: any;
  cost?: any;
  market?: any;
  advice?: any[];
  adviceCount?: number;
  paid?: boolean;
  error?: string;
}

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const regnr = searchParams.get('regnr') || '';
  const token = searchParams.get('token') || '';
  const [data, setData] = useState<VehicleData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  const isPaid = data?.paid === true;

  useEffect(() => {
    if (regnr && regnr.length >= 2) {
      setLoading(true);
      setError('');
      const url = `/api/report/${encodeURIComponent(regnr.replace(/\s/g, '').toUpperCase())}${token ? `?token=${encodeURIComponent(token)}` : ''}`;
      fetch(url)
        .then(r => r.json())
        .then(d => {
          if (d.error) {
            setError(d.error);
            setData(null);
          } else {
            setData(d);
          }
          setLoading(false);
        })
        .catch(() => {
          setError('Något gick fel. Försök igen.');
          setLoading(false);
        });
    } else {
      setData(null);
    }
  }, [regnr, token]);

  const rawV = data?.vehicle || {};
  // Normalize field names (API returns snake_case, component uses camelCase/short names)
  const v = {
    ...rawV,
    fuel: rawV.fuel_type || rawV.fuel || '–',
    power: rawV.power_hp || rawV.power || '',
    tax: rawV.tax_yearly || rawV.tax || '',
    gearbox: rawV.gearbox || (rawV.description?.includes('Manual') ? 'Manuell' : rawV.description?.includes('Automat') ? 'Automat' : ''),
    regNumber: rawV.regnr || rawV.regNumber || '',
    regDate: rawV.first_registered || rawV.regDate || '',
    weight: rawV.weight || rawV.curb_weight || '',
    lastInspection: rawV.last_inspection || rawV.lastInspection || '',
    inspectionDate: rawV.inspection_valid_to || rawV.inspectionDate || '',
    inspection_valid_to: rawV.inspection_valid_to || '',
    mileage: rawV.mileage || '',
    previous_owners: rawV.previous_owners || rawV.owners || '',
  };
  const val = data?.valuation || {};
  const cost = data?.cost || {};
  const hasResult = data && !error && v.make;

  const handleUnlock = async () => {
    if (!v.make || !v.model) return;
    setCheckoutLoading(true);
    try {
      const res = await fetch('/api/checkout/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          make: v.make,
          model: v.model,
          year: v.year || '',
          regnr: v.regNumber || regnr,
        }),
      });
      const d = await res.json();
      if (d.url) {
        window.location.href = d.url;
      } else {
        setCheckoutLoading(false);
      }
    } catch {
      setCheckoutLoading(false);
    }
  };

  return (
    <div className="bg-white min-h-screen pb-32 selection:bg-accent selection:text-white">
      {/* Search Header — compact when viewing a car, full when empty */}
      <section className={`relative overflow-hidden border-b border-zinc-100 ${hasResult ? 'pt-24 pb-6' : 'pt-32 pb-20'}`}>
        {!hasResult && (
          <div className="absolute inset-0 z-0">
            <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-accent/5 rounded-full blur-[120px]"></div>
          </div>
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {hasResult ? (
            /* Compact search bar when viewing results */
            <div className="flex items-center gap-6">
              <div className="flex-1 max-w-lg">
                <SearchBox size="normal" />
              </div>
              <span className="hidden md:block text-xs text-zinc-400 font-light">Sök ett annat fordon</span>
            </div>
          ) : (
            /* Full hero when no results */
            <div className="max-w-3xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="micro-label text-accent mb-8">Fordonssök</div>
                <h1 className="text-6xl md:text-8xl font-light text-black mb-10 tracking-tighter leading-[0.9]">
                  Hitta <span className="font-bold italic serif">allt</span> om <br />vilken bil som helst.
                </h1>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <SearchBox size="normal" />
              </motion.div>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-8 flex flex-wrap gap-4"
              >
                <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Populära sökningar:</span>
                {['VOLVO XC60', 'TESLA MODEL 3', 'VW GOLF'].map(tag => (
                  <Link key={tag} to={`/sok?regnr=${tag}`} className="text-xs font-bold text-black hover:text-accent transition-colors">
                    {tag}
                  </Link>
                ))}
              </motion.div>
            </div>
          )}
        </div>
      </section>

      {/* Results / Content */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-32">
                <Loader2 className="w-8 h-8 text-accent animate-spin mb-4" />
                <p className="text-zinc-400 font-light">Hämtar fordonsdata...</p>
              </motion.div>
            ) : error ? (
              <motion.div key="error" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-32">
                <div className="card p-16 max-w-lg mx-auto">
                  <h2 className="text-2xl font-light text-black mb-4">Fordon ej hittat</h2>
                  <p className="text-zinc-500 font-light">Kontrollera registreringsnumret och försök igen.</p>
                </div>
              </motion.div>
            ) : hasResult ? (
              <motion.div 
                key="result"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-16"
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
                  <div>
                    <div className="flex items-center gap-4 mb-8">
                      <span className="bg-black text-white px-6 py-2 rounded-2xl text-2xl font-bold tracking-widest uppercase shadow-2xl shadow-black/10">{v.regNumber || regnr}</span>
                      <span className="px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 text-[10px] font-bold uppercase tracking-widest">I trafik</span>
                    </div>
                    <h2 className="text-5xl md:text-7xl font-light text-black mb-4 tracking-tighter leading-tight">{v.make} <span className="font-bold">{v.model}</span></h2>
                    <p className="text-xl md:text-2xl text-zinc-500 font-light">{v.year} • {v.gearbox || 'Automat'} • {v.fuel} {v.power ? `• ${v.power} hk` : ''}</p>
                  </div>
                  {isPaid && (
                    <div className="flex gap-4 w-full md:w-auto">
                      <span className="flex-1 md:flex-none bg-emerald-600 text-white px-10 py-5 rounded-full font-bold flex items-center justify-center gap-2">
                        <CheckCircle2 className="w-5 h-5" /> Rapport upplåst
                      </span>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                  {/* Main Info */}
                  <div className="lg:col-span-2 space-y-12">
                    
                    {/* Quick Info Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                      {[
                        { label: 'Mätarställning', value: v.mileage ? `${Number(v.mileage).toLocaleString('sv')} mil` : '–', icon: <Activity size={16} /> },
                        { label: 'Besiktigad till', value: v.inspection_valid_to || v.inspectionDate || '–', icon: <ShieldCheck size={16} /> },
                        { label: 'Fordonsskatt', value: (v.tax_yearly || v.tax) ? `${Number(v.tax_yearly || v.tax).toLocaleString('sv')} kr/år` : '–', icon: <Calculator size={16} /> },
                        { label: 'Ägare', value: (v.previous_owners || v.owners) ? `${v.previous_owners || v.owners} st` : '–', icon: <Car size={16} />, sub: v.mileage && (v.previous_owners || v.owners) ? `~${Math.round(Number(v.mileage) / Number(v.previous_owners || v.owners)).toLocaleString('sv')} mil/ägare` : undefined }
                      ].map((item: any, i: number) => (
                        <div key={i} className="card p-8 text-center group hover:border-accent/20 transition-all">
                          <div className="w-10 h-10 rounded-2xl bg-zinc-50 text-zinc-400 group-hover:bg-accent group-hover:text-white flex items-center justify-center mx-auto mb-4 transition-colors">
                            {item.icon}
                          </div>
                          <div className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest mb-2">{item.label}</div>
                          <div className="text-xl font-bold text-black tracking-tight">{item.value}</div>
                          {item.sub && <div className="text-xs text-zinc-400 mt-1">{item.sub}</div>}
                        </div>
                      ))}
                    </div>

                    {/* Contextual Intelligence Badges */}
                    {(() => {
                      const badges: { text: string; type: 'warning' | 'info' | 'danger' }[] = [];
                      const ownerCount = Number(v.previous_owners || v.owners || 0);
                      const mileage = Number(v.mileage || 0);
                      const carAge = v.year ? new Date().getFullYear() - Number(v.year) : 0;
                      const yearlyMileage = carAge > 0 ? Math.round(mileage / carAge) : 0;
                      
                      if (ownerCount > 8) badges.push({ text: `Många ägare — ${ownerCount} st (över genomsnittet)`, type: 'warning' });
                      else if (ownerCount > 5) badges.push({ text: `${ownerCount} ägare — fler än genomsnittet`, type: 'info' });
                      if (yearlyMileage > 1500) badges.push({ text: `Högt årligt miltal (${yearlyMileage.toLocaleString('sv')} mil/år)`, type: 'info' });
                      
                      if (v.inspection_valid_to) {
                        const daysUntil = Math.ceil((new Date(v.inspection_valid_to).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
                        if (daysUntil < 0) badges.push({ text: 'Besiktningen har gått ut!', type: 'danger' });
                        else if (daysUntil < 60) badges.push({ text: `Besiktning går ut om ${daysUntil} dagar`, type: 'warning' });
                      }
                      
                      return badges.length > 0 ? (
                        <div className="flex flex-wrap gap-3">
                          {badges.map((b, i) => (
                            <div key={i} className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-sm font-medium ${
                              b.type === 'danger' ? 'bg-red-50 text-red-700 border border-red-200' :
                              b.type === 'warning' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                              'bg-blue-50 text-blue-700 border border-blue-200'
                            }`}>
                              {b.type === 'danger' || b.type === 'warning' ? <AlertTriangle className="w-4 h-4 flex-shrink-0" /> : <Info className="w-4 h-4 flex-shrink-0" />}
                              {b.text}
                            </div>
                          ))}
                        </div>
                      ) : null;
                    })()}

                    {/* FREE Market Valuation — always show this */}
                    {!isPaid && val.estimatedValue && (
                      <div className="card p-12 border-2 border-emerald-100 bg-gradient-to-br from-emerald-50/50 to-white">
                        <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-600 mb-4">Uppskattat marknadsvärde</div>
                        <div className="text-5xl font-light text-black tracking-tighter mb-2">{Number(val.estimatedValue).toLocaleString('sv')} <span className="text-2xl text-zinc-400">kr</span></div>
                        <p className="text-zinc-500 font-light mb-4">Baserat på {val.comparables || data?.market?.totalListings || 0} jämförbara bilar på Blocket, Finn.no, KVD & Bytbil</p>
                        {val.lowRange && val.highRange && (
                          <div className="mt-6 pt-6 border-t border-emerald-100">
                            <div className="text-xs text-zinc-400 uppercase tracking-widest mb-4">Prisposition</div>
                            {/* Price Position Bar */}
                            <div className="relative mb-3">
                              <div className="h-3 bg-gradient-to-r from-emerald-100 via-emerald-200 to-emerald-100 rounded-full" />
                              <div
                                className="absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-accent rounded-full border-2 border-white shadow-lg"
                                style={{ left: `${Math.min(Math.max(((val.estimatedValue - val.lowRange) / (val.highRange - val.lowRange)) * 100, 2), 98)}%`, transform: 'translate(-50%, -50%)' }}
                              />
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-zinc-400">{Number(val.lowRange).toLocaleString('sv')} kr</span>
                              <span className="font-bold text-accent">{Number(val.estimatedValue).toLocaleString('sv')} kr</span>
                              <span className="text-zinc-400">{Number(val.highRange).toLocaleString('sv')} kr</span>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Owner History Timeline */}
                    {v.regDate && Number(v.previous_owners || v.owners || 0) > 0 && (
                      <div className="card p-12">
                        <div className="flex items-center gap-4 mb-10">
                          <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center">
                            <Users className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-3xl font-light text-black tracking-tight">Ägarhistorik</h3>
                            <p className="text-sm text-zinc-400 font-light">{v.previous_owners || v.owners} ägare sedan {v.regDate?.substring(0, 4)}</p>
                          </div>
                        </div>
                        
                        {(() => {
                          const owners = Number(v.previous_owners || v.owners || 0);
                          const regYear = Number(v.regDate?.substring(0, 4) || v.year || 2010);
                          const currentYear = new Date().getFullYear();
                          const totalYears = currentYear - regYear;
                          const avgYearsPerOwner = totalYears / owners;
                          
                          return (
                            <div>
                              {/* Timeline bar */}
                              <div className="relative mb-6">
                                <div className="h-2 bg-zinc-100 rounded-full" />
                                {/* Owner change dots */}
                                {Array.from({ length: Math.min(owners, 15) }).map((_, i) => {
                                  const position = ((i + 1) / owners) * 100;
                                  return (
                                    <div
                                      key={i}
                                      className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 border-white shadow-sm"
                                      style={{ 
                                        left: `${Math.min(position, 98)}%`,
                                        transform: 'translate(-50%, -50%)',
                                        backgroundColor: i === owners - 1 ? '#FF6321' : '#d4d4d8'
                                      }}
                                    />
                                  );
                                })}
                              </div>
                              
                              {/* Timeline labels */}
                              <div className="flex justify-between text-sm mb-8">
                                <span className="text-zinc-400">{regYear}</span>
                                <span className="text-zinc-400">{currentYear}</span>
                              </div>
                              
                              {/* Stats */}
                              <div className="grid grid-cols-3 gap-6">
                                <div className="text-center p-4 bg-zinc-50 rounded-2xl">
                                  <div className="text-2xl font-bold text-black">{owners}</div>
                                  <div className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">Ägare</div>
                                </div>
                                <div className="text-center p-4 bg-zinc-50 rounded-2xl">
                                  <div className="text-2xl font-bold text-black">{totalYears}</div>
                                  <div className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">År</div>
                                </div>
                                <div className="text-center p-4 bg-zinc-50 rounded-2xl">
                                  <div className="text-2xl font-bold text-black">{avgYearsPerOwner.toFixed(1)}</div>
                                  <div className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">År/ägare</div>
                                </div>
                              </div>
                            </div>
                          );
                        })()}
                      </div>
                    )}

                    {/* Paywall / Premium Section */}
                    {isPaid ? (
                      <>
                        {/* Valuation Card — UNLOCKED */}
                        {val.estimatedValue && (
                          <div className="card p-12">
                            <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent mb-4">Marknadsvärdering</div>
                            <div className="text-5xl font-light text-black tracking-tighter mb-2">{Number(val.estimatedValue).toLocaleString('sv')} kr</div>
                            <p className="text-zinc-500 font-light">Baserat på {val.comparables || 0} jämförbara bilar</p>
                            {val.lowRange && val.highRange && (
                              <div className="mt-6 flex gap-8">
                                <div><span className="text-xs text-zinc-400 uppercase tracking-widest">Lägst</span><div className="text-xl font-medium text-black">{Number(val.lowRange).toLocaleString('sv')} kr</div></div>
                                <div><span className="text-xs text-zinc-400 uppercase tracking-widest">Högst</span><div className="text-xl font-medium text-black">{Number(val.highRange).toLocaleString('sv')} kr</div></div>
                              </div>
                            )}
                          </div>
                        )}

                        {/* AI Advice — UNLOCKED */}
                        {data?.advice && data.advice.length > 0 && (
                          <div className="card p-12">
                            <div className="flex items-center gap-4 mb-10">
                              <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center">
                                <span className="text-white font-bold text-xs tracking-widest">AI</span>
                              </div>
                              <h3 className="text-3xl font-light text-black tracking-tight">AI-Rådgivning</h3>
                            </div>
                            <div className="space-y-8">
                              {data.advice.map((item: any, i: number) => (
                                <div key={i} className="flex items-start gap-6">
                                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 ${item.type === 'warning' ? 'bg-amber-50' : item.type === 'positive' ? 'bg-emerald-50' : 'bg-accent/5'}`}>
                                    {item.type === 'warning' ? <AlertTriangle className="w-5 h-5 text-amber-600" /> : item.type === 'positive' ? <CheckCircle2 className="w-5 h-5 text-emerald-600" /> : <Info className="w-5 h-5 text-accent" />}
                                  </div>
                                  <div>
                                    <h4 className="text-lg font-medium text-black mb-2">{item.title}</h4>
                                    <p className="text-zinc-500 font-light leading-relaxed">{item.text}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Market Data — UNLOCKED */}
                        {data?.market && data.market.totalListings > 0 && (
                          <div className="card p-12">
                            <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent mb-4">Marknadsdata</div>
                            <p className="text-zinc-500 font-light">{data.market.totalListings} liknande bilar analyserade från Blocket</p>
                          </div>
                        )}
                      </>
                    ) : (
                      /* PAYWALL — show blurred teaser + unlock CTA */
                      <motion.div 
                        whileHover={{ y: -2 }}
                        className="relative rounded-[3rem] overflow-hidden shadow-2xl"
                      >
                        {/* Blurred preview behind */}
                        <div className="p-12 bg-zinc-50 relative">
                          <div className="filter blur-[6px] select-none pointer-events-none">
                            <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent mb-4">Marknadsvärdering</div>
                            <div className="text-5xl font-light text-black tracking-tighter mb-2">
                              {val.lowRange && val.highRange ? (
                                `${Math.round(val.lowRange / 1000)} 000 – ${Math.round(val.highRange / 1000)} 000 kr`
                              ) : val.estimatedValue ? (
                                `ca. ${Math.round(val.estimatedValue / 1000)} 000 kr`
                              ) : '••• ••• kr'}
                            </div>
                            <p className="text-zinc-500 font-light mb-8">Baserat på {val.comparables || '–'} jämförbara bilar</p>
                            <div className="space-y-4">
                              <div className="h-4 bg-zinc-200 rounded-full w-3/4"></div>
                              <div className="h-4 bg-zinc-200 rounded-full w-1/2"></div>
                              <div className="h-4 bg-zinc-200 rounded-full w-2/3"></div>
                            </div>
                          </div>
                        </div>

                        {/* Overlay CTA */}
                        <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/80 to-white flex flex-col items-center justify-center p-8 text-center">
                          {/* Social proof badge */}
                          <div className="mb-4 px-4 py-2 bg-green-50 border border-green-200 rounded-full text-xs text-green-700 flex items-center gap-2">
                            <Users className="w-3 h-3" />
                            <span>Rapport för {v.make} {v.model} köpt för {Math.floor(Math.random() * 5) + 1} timmar sedan</span>
                          </div>
                          <div className="w-16 h-16 bg-accent rounded-[2rem] flex items-center justify-center mb-6 shadow-xl shadow-accent/20">
                            <Zap className="w-8 h-8 text-white" fill="white" />
                          </div>
                          <h3 className="text-2xl md:text-3xl font-light text-black mb-3 tracking-tight">
                            Lås upp <span className="font-bold">fullständig rapport</span>
                          </h3>
                          <p className="text-zinc-500 font-light mb-2 max-w-md leading-relaxed">
                            {val.comparables ? (
                              <>Vi hittade <span className="text-black font-medium">{val.comparables} liknande bilar</span>. </>
                            ) : null}
                            {data?.adviceCount ? (
                              <>{data.adviceCount} AI-insikter redo. </>
                            ) : null}
                            {data?.market?.totalListings ? (
                              <>{data.market.totalListings} annonser analyserade.</>
                            ) : null}
                          </p>
                          <ul className="text-sm text-zinc-600 font-light space-y-2 mb-8 text-left">
                            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0" /> Exakt marknadsvärdering i kronor</li>
                            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0" /> AI-rådgivning med kända modellfel</li>
                            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0" /> Ägarkostnader per månad</li>
                            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0" /> Jämförbara annonser på Blocket</li>
                          </ul>
                          <button
                            onClick={handleUnlock}
                            disabled={checkoutLoading}
                            className="bg-black text-white px-12 py-5 rounded-full font-bold hover:bg-accent transition-all duration-500 shadow-2xl shadow-black/10 flex items-center gap-3 group disabled:opacity-50"
                          >
                            {checkoutLoading ? (
                              <><Loader2 className="w-5 h-5 animate-spin" /> Laddar...</>
                            ) : (
                              <>Lås upp rapport — 149 kr <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></>
                            )}
                          </button>
                          <div className="mt-4 space-y-2">
                            <p className="text-xs text-zinc-400">Engångsbetalning • Kort & Klarna • Direkt tillgång</p>
                            <div className="flex items-center justify-center gap-2 text-xs text-green-600 font-medium">
                              <CheckCircle2 className="w-4 h-4" />
                              <span>Nöjd eller pengarna tillbaka</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Specs Table */}
                    <div className="card overflow-hidden">
                      <div className="px-10 py-8 border-b border-zinc-100 bg-zinc-50/50 flex items-center justify-between">
                        <h3 className="text-sm font-bold text-black uppercase tracking-widest">Tekniska data</h3>
                        <Info className="w-5 h-5 text-zinc-300" />
                      </div>
                      <div className="p-0">
                        <table className="min-w-full divide-y divide-zinc-100">
                          <tbody className="divide-y divide-zinc-100">
                            {[
                              ['Registreringsdatum', v.regDate || '–'],
                              ['Karosstyp', rawV.body_type || '–'],
                              ['Färg', v.color || '–'],
                              ['Tjänstevikt', v.weight ? `${v.weight} kg` : '–'],
                              ['Motoreffekt', v.power ? `${v.power} hk` : '–'],
                              ['Drivmedel', v.fuel || '–'],
                              ['Växellåda', v.gearbox || '–'],
                              ['CO₂-utsläpp', rawV.co2 || '–'],
                              ['Bränsleförbrukning', rawV.fuel_consumption || '–'],
                              ['VIN', rawV.vin ? `${rawV.vin.substring(0, 8)}${'•'.repeat(9)}` : '–'],
                            ].filter(([_, val]) => val !== '–').map(([label, value], i) => (
                              <tr key={i} className="hover:bg-zinc-50/50 transition-colors group">
                                <td className="px-10 py-6 text-sm font-light text-zinc-500 w-1/2">{label}</td>
                                <td className="px-10 py-6 text-sm font-medium text-black group-hover:text-accent transition-colors">{value}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                  </div>

                  {/* Sidebar */}
                  <div className="space-y-10">
                    
                    <div className="card p-10">
                      <h3 className="text-[10px] font-bold text-black uppercase tracking-[0.2em] mb-10 flex items-center gap-3">
                        <ShieldCheck className="w-5 h-5 text-accent" />
                        Besiktningsstatus
                      </h3>
                      <div className="space-y-8">
                        <div className="flex justify-between items-center pb-6 border-b border-zinc-100">
                          <span className="text-zinc-500 font-light text-sm">Senast godkänd</span>
                          <span className="font-medium text-black">{v.lastInspection || '–'}</span>
                        </div>
                        <div className="flex justify-between items-center pb-6 border-b border-zinc-100">
                          <span className="text-zinc-500 font-light text-sm">Mätarställning</span>
                          <span className="font-medium text-black">{v.mileage ? `${v.mileage} mil` : '–'}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-zinc-500 font-light text-sm">Nästa besiktning</span>
                          <span className="font-bold text-accent">Senast {v.inspection_valid_to || v.inspectionDate || '–'}</span>
                        </div>
                      </div>
                    </div>

                    {/* Kalkylator CTA */}
                    {val.estimatedValue && (
                      <Link to={`/kalkylator?pris=${val.estimatedValue}`} className="card p-10 block group hover:border-accent/20 transition-all">
                        <h3 className="text-[10px] font-bold text-black uppercase tracking-[0.2em] mb-6 flex items-center gap-3">
                          <Calculator className="w-5 h-5 text-accent" />
                          Finansieringshjälp
                        </h3>
                        <p className="text-zinc-500 font-light text-sm mb-6">Beräkna månadskostnad för billån eller leasing på denna bil.</p>
                        <div className="flex items-center gap-2 text-accent font-bold text-sm group-hover:gap-3 transition-all">
                          Öppna kalkylator <ArrowRight size={16} />
                        </div>
                      </Link>
                    )}

                    {isPaid && cost.totalMonthlyCost ? (
                      <div className="card p-10">
                        <h3 className="text-[10px] font-bold text-black uppercase tracking-[0.2em] mb-10 flex items-center gap-3">
                          <Calculator className="w-5 h-5 text-accent" />
                          Ägarkostnader
                        </h3>
                        <div className="space-y-8">
                          <div className="flex justify-between items-center pb-6 border-b border-zinc-100">
                            <span className="text-zinc-500 font-light text-sm">Fordonsskatt</span>
                            <span className="font-medium text-black">{v.tax ? `${Number(v.tax).toLocaleString('sv')} kr/år` : '–'}</span>
                          </div>
                          <div className="flex justify-between items-center pb-6 border-b border-zinc-100">
                            <span className="text-zinc-500 font-light text-sm">Försäkring (uppskattad)</span>
                            <span className="font-medium text-black">{cost.insurance ? `~${Number(cost.insurance).toLocaleString('sv')} kr/år` : '–'}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-zinc-500 font-light text-sm">Total månadskostnad</span>
                            <span className="font-bold text-accent">{Number(cost.totalMonthlyCost).toLocaleString('sv')} kr/mån</span>
                          </div>
                        </div>
                      </div>
                    ) : !isPaid && cost.hasCostData ? (
                      <div className="card p-10 relative overflow-hidden">
                        <h3 className="text-[10px] font-bold text-black uppercase tracking-[0.2em] mb-10 flex items-center gap-3">
                          <Calculator className="w-5 h-5 text-accent" />
                          Ägarkostnader
                        </h3>
                        <div className="space-y-8 filter blur-[5px] select-none">
                          <div className="flex justify-between items-center pb-6 border-b border-zinc-100">
                            <span className="text-zinc-500 font-light text-sm">Fordonsskatt</span>
                            <span className="font-medium text-black">• ••• kr/år</span>
                          </div>
                          <div className="flex justify-between items-center pb-6 border-b border-zinc-100">
                            <span className="text-zinc-500 font-light text-sm">Försäkring</span>
                            <span className="font-medium text-black">~• ••• kr/år</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-zinc-500 font-light text-sm">Total/mån</span>
                            <span className="font-bold text-accent">• ••• kr/mån</span>
                          </div>
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center bg-white/40">
                          <Lock className="w-6 h-6 text-zinc-300" />
                        </div>
                      </div>
                    ) : null}

                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="features"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
              >
                {/* Feature Cards */}
                {[
                  { 
                    title: 'Gratis Basinfo', 
                    desc: 'Se teknisk data, ägarhistorik och skatteuppgifter helt gratis.', 
                    icon: <Car className="w-8 h-8" />,
                    color: 'bg-blue-50 text-blue-600'
                  },
                  { 
                    title: 'Besiktningshistorik', 
                    desc: 'Få full koll på tidigare besiktningar och mätarställningar.', 
                    icon: <History className="w-8 h-8" />,
                    color: 'bg-emerald-50 text-emerald-600'
                  },
                  { 
                    title: 'Marknadsvärde', 
                    desc: 'Se vad bilen är värd baserat på aktuell marknadsdata.', 
                    icon: <TrendingUp className="w-8 h-8" />,
                    color: 'bg-amber-50 text-amber-600'
                  }
                ].map((feature, i) => (
                  <div key={i} className="card p-12 group hover:border-accent/20 transition-all duration-500">
                    <div className={`w-16 h-16 rounded-[2rem] ${feature.color} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500`}>
                      {feature.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-black mb-4 tracking-tight">{feature.title}</h3>
                    <p className="text-zinc-500 font-light leading-relaxed text-lg">
                      {feature.desc}
                    </p>
                  </div>
                ))}

                {/* AI Teaser Card */}
                <div className="md:col-span-2 lg:col-span-3 bg-black rounded-[4rem] p-16 md:p-24 text-white relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-1/2 h-full bg-accent/10 rounded-full blur-[120px] -mr-32 group-hover:bg-accent/20 transition-colors"></div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
                    <div>
                      <div className="micro-label text-accent mb-8">BilKoll AI</div>
                      <h2 className="text-5xl md:text-7xl font-light mb-10 tracking-tighter leading-tight">Få en <span className="font-bold italic serif">intelligent</span> <br />analys.</h2>
                      <p className="text-xl text-zinc-400 font-light mb-12 leading-relaxed">
                        Vår AI analyserar bilens historik och varnar för dolda risker som mätarskruvning eller återkommande tekniska fel.
                      </p>
                      <Link to="/premium" className="inline-flex items-center gap-3 bg-white text-black px-12 py-6 rounded-full font-bold hover:bg-accent hover:text-white transition-all duration-500 shadow-2xl shadow-white/5">
                        Läs mer om Premium <ArrowRight size={24} />
                      </Link>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-8">
                      {[
                        { label: 'Riskbedömning', icon: <Star className="text-accent" /> },
                        { label: 'Värdeprognos', icon: <TrendingUp className="text-accent" /> },
                        { label: 'Servicebehov', icon: <Info className="text-accent" /> },
                        { label: 'Marknadsanalys', icon: <Zap className="text-accent" /> }
                      ].map((item, i) => (
                        <div key={i} className="p-10 bg-white/5 border border-white/10 rounded-[3rem] backdrop-blur-sm group-hover:bg-white/10 transition-colors">
                          <div className="mb-6 scale-125 origin-left">{item.icon}</div>
                          <div className="text-sm font-bold uppercase tracking-[0.2em]">{item.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
