import React, { useState, useEffect, useCallback } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { TrendingUp, Bell, ChevronRight, Zap, Mail, ArrowRight, Activity, ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';

interface MakeData {
  make: string;
  count: number;
  avgPrice: number;
}

interface ModelData {
  model: string;
  count: number;
  avgPrice: number;
  minPrice: number;
  maxPrice: number;
}

interface PriceBucket {
  rangeFrom: number;
  rangeTo: number;
  count: number;
  percentage: number;
}

interface YearData {
  year: number;
  avgPrice: number;
  count: number;
}

interface MarketStats {
  count: number;
  min: number;
  max: number;
  avg: number;
  median: number;
  p25: number;
  p75: number;
}

interface MarketDetail {
  available: boolean;
  stats: MarketStats;
  priceDistribution: PriceBucket[];
  priceByYear: YearData[];
  fuelDistribution: Record<string, number>;
  comparables: any[];
}

export default function MarketPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [makes, setMakes] = useState<MakeData[]>([]);
  const [totalListings, setTotalListings] = useState(0);
  const [selectedMake, setSelectedMake] = useState(searchParams.get('make') || '');
  const [selectedModel, setSelectedModel] = useState(searchParams.get('model') || '');
  const [selectedYear, setSelectedYear] = useState(searchParams.get('year') || '');
  const [models, setModels] = useState<ModelData[]>([]);
  const [loading, setLoading] = useState(true);
  const [marketDetail, setMarketDetail] = useState<MarketDetail | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);
  const [availableYears, setAvailableYears] = useState<number[]>([]);

  // Fetch overview
  useEffect(() => {
    fetch('/api/market/overview')
      .then(r => r.json())
      .then(d => {
        if (d.makes) setMakes(d.makes);
        if (d.totalListings) setTotalListings(d.totalListings);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Fetch models when make changes
  useEffect(() => {
    if (selectedMake) {
      fetch(`/api/market/models/${encodeURIComponent(selectedMake)}`)
        .then(r => r.json())
        .then(d => {
          if (d.models) setModels(d.models);
        });
    }
  }, [selectedMake]);

  // Fetch market detail when make+model selected
  const fetchDetail = useCallback(() => {
    if (!selectedMake || !selectedModel) {
      setMarketDetail(null);
      return;
    }
    setDetailLoading(true);
    const yearQ = selectedYear ? `?year=${selectedYear}` : '';
    fetch(`/api/market/${encodeURIComponent(selectedMake)}/${encodeURIComponent(selectedModel)}${yearQ}`)
      .then(r => r.json())
      .then(d => {
        if (d.available !== false) {
          setMarketDetail(d);
          // Extract available years
          if (d.priceByYear) {
            setAvailableYears(d.priceByYear.map((y: YearData) => y.year).sort((a: number, b: number) => b - a));
          }
        }
        setDetailLoading(false);
      })
      .catch(() => setDetailLoading(false));
  }, [selectedMake, selectedModel, selectedYear]);

  useEffect(() => {
    fetchDetail();
  }, [fetchDetail]);

  // Update URL params
  useEffect(() => {
    const params: Record<string, string> = {};
    if (selectedMake) params.make = selectedMake;
    if (selectedModel) params.model = selectedModel;
    if (selectedYear) params.year = selectedYear;
    setSearchParams(params, { replace: true });
  }, [selectedMake, selectedModel, selectedYear, setSearchParams]);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    
    try {
      const res = await fetch('/api/email/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          source: 'marknad',
          context: `${selectedMake || ''} ${selectedModel || ''}`.trim() || null,
        }),
      });
      
      if (res.ok) {
        setSubscribed(true);
      }
    } catch (err) {
      console.error('Subscribe error:', err);
    }
  };

  const showDetail = selectedMake && selectedModel && marketDetail && marketDetail.available !== false;

  // Prepare chart data
  const chartData = marketDetail?.priceDistribution?.map(b => ({
    name: `${Math.round(b.rangeFrom / 1000)}k`,
    fullName: `${Math.round(b.rangeFrom / 1000)}–${Math.round(b.rangeTo / 1000)}k`,
    count: b.count,
    color: '#F4F4F5',
  })) || [];

  // Find the peak bar for accent color
  const peakIdx = chartData.reduce((maxI, d, i, arr) => d.count > arr[maxI].count ? i : maxI, 0);

  return (
    <div className="bg-white min-h-screen pb-32 selection:bg-accent selection:text-white">
      {/* Market Header */}
      <section className="relative pt-32 pb-20 overflow-hidden border-b border-zinc-100">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-accent/5 rounded-full blur-[120px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="micro-label text-accent mb-8">Marknadsanalys</div>
              <h1 className="text-5xl sm:text-6xl md:text-8xl font-light text-black mb-10 tracking-tighter leading-[0.9]">
                Förstå <span className="font-bold italic serif">värdet</span> på <br />bilmarknaden.
              </h1>
              <p className="text-xl md:text-2xl text-zinc-500 font-light leading-relaxed mb-12">
                Vi analyserar {totalListings ? totalListings.toLocaleString('sv') : 'tusentals'} annonser dagligen för att ge dig den mest pricksäkra värderingen i Sverige.
              </p>
            </motion.div>

            {/* Selectors — 3 dropdowns + button */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex flex-col sm:flex-row gap-4 max-w-3xl"
            >
              <div className="flex-1 grid grid-cols-3 gap-4">
                <select 
                  className="bg-zinc-50 border-2 border-zinc-100 rounded-2xl px-4 sm:px-6 py-4 text-sm font-medium focus:outline-none focus:border-accent transition-all"
                  value={selectedMake}
                  onChange={e => { setSelectedMake(e.target.value); setSelectedModel(''); setSelectedYear(''); setModels([]); setMarketDetail(null); }}
                >
                  <option value="">Välj märke</option>
                  {makes.map(m => (
                    <option key={m.make} value={m.make}>{m.make}</option>
                  ))}
                </select>
                <select 
                  className="bg-zinc-50 border-2 border-zinc-100 rounded-2xl px-4 sm:px-6 py-4 text-sm font-medium focus:outline-none focus:border-accent transition-all"
                  value={selectedModel}
                  onChange={e => { setSelectedModel(e.target.value); setSelectedYear(''); }}
                  disabled={!selectedMake}
                >
                  <option value="">Välj modell</option>
                  {models.map(m => (
                    <option key={m.model} value={m.model}>{m.model}</option>
                  ))}
                </select>
                <select 
                  className="bg-zinc-50 border-2 border-zinc-100 rounded-2xl px-4 sm:px-6 py-4 text-sm font-medium focus:outline-none focus:border-accent transition-all"
                  value={selectedYear}
                  onChange={e => setSelectedYear(e.target.value)}
                  disabled={availableYears.length === 0}
                >
                  <option value="">Alla år</option>
                  {availableYears.map(y => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
              </div>
              <button 
                onClick={fetchDetail}
                className="bg-black text-white px-10 py-4 rounded-2xl font-bold hover:bg-accent transition-all duration-500"
              >
                Uppdatera
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Main Area */}
            <div className="lg:col-span-2 space-y-12">

              {/* === Chart View (when make+model selected) === */}
              {showDetail && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {/* Back button */}
                  <button 
                    onClick={() => { setSelectedModel(''); setSelectedYear(''); setMarketDetail(null); }}
                    className="micro-label text-accent mb-6 flex items-center gap-2 hover:text-black transition-colors"
                  >
                    <ArrowLeft className="w-3 h-3" /> Tillbaka till modeller
                  </button>

                  {/* Price Distribution Chart */}
                  <div className="card p-8 sm:p-12">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-6">
                      <div>
                        <h3 className="text-sm font-bold text-black uppercase tracking-widest mb-2">Prisfördelning</h3>
                        <p className="text-zinc-400 font-light">
                          {selectedMake} {selectedModel} {selectedYear || 'alla år'} • {marketDetail.stats.count} annonser just nu
                        </p>
                      </div>
                      <div className="bg-accent/5 text-accent px-6 py-3 rounded-2xl text-sm font-bold uppercase tracking-widest border border-accent/10">
                        Snittpris: {marketDetail.stats.avg.toLocaleString('sv')} kr
                      </div>
                    </div>

                    <div className="h-[300px] sm:h-[400px] w-full">
                      {chartData.length > 0 ? (
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={chartData} onMouseMove={(state: any) => {
                            if (state.activeTooltipIndex !== undefined) setHoveredBar(state.activeTooltipIndex);
                          }} onMouseLeave={() => setHoveredBar(null)}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F4F4F5" />
                            <XAxis 
                              dataKey="name" 
                              axisLine={false} 
                              tickLine={false} 
                              tick={{ fill: '#A1A1AA', fontSize: 12, fontWeight: 500 }}
                              dy={15}
                            />
                            <YAxis hide />
                            <Tooltip 
                              cursor={{ fill: 'transparent' }}
                              content={({ active, payload }: any) => {
                                if (active && payload && payload.length) {
                                  return (
                                    <div className="bg-black text-white px-6 py-3 rounded-xl shadow-2xl border border-white/10 backdrop-blur-xl">
                                      <div className="text-[10px] font-bold uppercase tracking-widest mb-1 opacity-60">{payload[0]?.payload?.fullName}</div>
                                      <div className="text-xl font-bold">{payload[0].value} bilar</div>
                                    </div>
                                  );
                                }
                                return null;
                              }}
                            />
                            <Bar dataKey="count" radius={[12, 12, 0, 0]}>
                              {chartData.map((entry, index) => (
                                <Cell 
                                  key={`cell-${index}`} 
                                  fill={index === hoveredBar ? '#FF6321' : (index === peakIdx ? '#FF6321' : '#F4F4F5')}
                                  style={{ transition: 'fill 0.3s ease' }}
                                />
                              ))}
                            </Bar>
                          </BarChart>
                        </ResponsiveContainer>
                      ) : (
                        <div className="flex items-center justify-center h-full text-zinc-400">
                          Inte tillräckligt med data för prisfördelning
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Quick stats row */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                    {[
                      { label: 'Median', value: `${marketDetail.stats.median.toLocaleString('sv')} kr` },
                      { label: 'Lägsta', value: `${marketDetail.stats.min.toLocaleString('sv')} kr` },
                      { label: 'Högsta', value: `${marketDetail.stats.max.toLocaleString('sv')} kr` },
                      { label: 'Annonser', value: `${marketDetail.stats.count} st` },
                    ].map((s, i) => (
                      <div key={i} className="card p-6 text-center">
                        <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2">{s.label}</div>
                        <div className="text-lg font-bold text-black tracking-tight">{s.value}</div>
                      </div>
                    ))}
                  </div>

                  {/* Year breakdown (if no specific year selected) */}
                  {!selectedYear && marketDetail.priceByYear && marketDetail.priceByYear.length > 1 && (
                    <div className="card p-8 sm:p-12 mt-8">
                      <h3 className="text-sm font-bold text-black uppercase tracking-widest mb-8">Pris per årsmodell</h3>
                      <div className="space-y-4">
                        {marketDetail.priceByYear.slice().reverse().map(y => {
                          const pct = ((y.avgPrice - marketDetail.stats.min) / (marketDetail.stats.max - marketDetail.stats.min)) * 100;
                          return (
                            <button
                              key={y.year}
                              onClick={() => setSelectedYear(String(y.year))}
                              className="w-full flex items-center gap-4 group hover:bg-zinc-50 rounded-xl p-3 -mx-3 transition-colors"
                            >
                              <span className="text-sm font-bold text-black w-12">{y.year}</span>
                              <div className="flex-1 bg-zinc-100 rounded-full h-3 overflow-hidden">
                                <div 
                                  className="bg-accent/80 h-full rounded-full transition-all group-hover:bg-accent"
                                  style={{ width: `${Math.max(5, pct)}%` }}
                                />
                              </div>
                              <span className="text-sm text-zinc-500 font-light w-28 text-right">
                                {y.avgPrice.toLocaleString('sv')} kr
                              </span>
                              <span className="text-xs text-zinc-300 w-12 text-right">
                                ({y.count})
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Comparables */}
                  {marketDetail.comparables && marketDetail.comparables.length > 0 && (
                    <div className="card p-8 sm:p-12 mt-8">
                      <h3 className="text-sm font-bold text-black uppercase tracking-widest mb-8">Annonser just nu</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {marketDetail.comparables.slice(0, 8).map((c: any, i: number) => (
                          <a 
                            key={i} 
                            href={c.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="rounded-2xl border border-zinc-100 hover:border-accent/30 hover:shadow-md transition-all group overflow-hidden"
                          >
                            {c.imageUrl && (
                              <div className="aspect-[16/10] bg-zinc-100 overflow-hidden">
                                <img 
                                  src={c.imageUrl} 
                                  alt={`${selectedMake} ${selectedModel}`}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                  loading="lazy"
                                />
                              </div>
                            )}
                            <div className="p-4">
                              <div className="flex justify-between items-start">
                                <div>
                                  <div className="text-lg font-bold text-black group-hover:text-accent transition-colors">
                                    {c.price?.toLocaleString('sv')} kr
                                  </div>
                                  <div className="text-xs text-zinc-400 mt-1">
                                    {c.year} • {c.mileage ? `${Math.round(c.mileage / 10).toLocaleString('sv')} mil` : ''} {c.fuelType ? `• ${c.fuelType}` : ''}
                                  </div>
                                </div>
                                <ArrowRight className="w-4 h-4 text-zinc-300 group-hover:text-accent transition-colors mt-1" />
                              </div>
                              {c.location && <div className="text-xs text-zinc-300 mt-2">{c.location}</div>}
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

              {/* === Model list (when make selected but not model) === */}
              {selectedMake && !selectedModel && models.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <button onClick={() => { setSelectedMake(''); setModels([]); }} className="micro-label text-accent mb-4 flex items-center gap-2 hover:text-black transition-colors">
                        <ArrowLeft className="w-3 h-3" /> Alla märken
                      </button>
                      <h2 className="text-3xl font-light text-black tracking-tight">{selectedMake} <span className="text-zinc-300">({models.length} modeller)</span></h2>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {models.map((m, i) => (
                      <motion.div
                        key={m.model}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        whileHover={{ y: -4 }}
                      >
                        <button
                          onClick={() => setSelectedModel(m.model)}
                          className="card p-8 flex items-center justify-between group w-full text-left"
                        >
                          <div>
                            <h3 className="text-xl font-medium text-black group-hover:text-accent transition-colors">{selectedMake} {m.model}</h3>
                            <p className="text-sm text-zinc-400 font-light mt-2">
                              {m.count} annonser · {Number(m.avgPrice).toLocaleString('sv')} kr snitt
                            </p>
                            <p className="text-xs text-zinc-300 font-light mt-1">
                              {Number(m.minPrice).toLocaleString('sv')} – {Number(m.maxPrice).toLocaleString('sv')} kr
                            </p>
                          </div>
                          <div className="w-10 h-10 rounded-full bg-zinc-50 flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-all">
                            <ArrowRight className="w-4 h-4" />
                          </div>
                        </button>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* === All makes grid (default view) === */}
              {!selectedMake && (
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h2 className="text-3xl font-light text-black tracking-tight">Alla märken <span className="text-zinc-300">({makes.length})</span></h2>
                      <p className="text-zinc-500 font-light mt-2">{totalListings.toLocaleString('sv')} aktiva annonser totalt</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {makes.map((m, i) => (
                      <motion.div
                        key={m.make}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.03 }}
                        whileHover={{ y: -4 }}
                      >
                        <button
                          onClick={() => setSelectedMake(m.make)}
                          className="card p-8 flex items-center justify-between group w-full text-left"
                        >
                          <div>
                            <h3 className="text-xl font-medium text-black group-hover:text-accent transition-colors">{m.make}</h3>
                            <p className="text-sm text-zinc-400 font-light mt-2">
                              {m.count} annonser · {Number(m.avgPrice).toLocaleString('sv')} kr snitt
                            </p>
                          </div>
                          <div className="w-10 h-10 rounded-full bg-zinc-50 flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-all">
                            <ChevronRight className="w-4 h-4" />
                          </div>
                        </button>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* AI Market Analysis cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="card p-10 bg-zinc-50 border-none group"
                >
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 transition-transform">
                    <TrendingUp className="text-emerald-500" />
                  </div>
                  <h4 className="text-xl font-bold text-black mb-4 tracking-tight">Stigande efterfrågan</h4>
                  <p className="text-zinc-500 font-light leading-relaxed">
                    Efterfrågan på laddhybrider har ökat med <span className="text-emerald-600 font-bold">12%</span> senaste månaden.
                  </p>
                </motion.div>

                <motion.div 
                  whileHover={{ y: -5 }}
                  className="card p-10 bg-zinc-50 border-none group"
                >
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 transition-transform">
                    <Activity className="text-blue-500" />
                  </div>
                  <h4 className="text-xl font-bold text-black mb-4 tracking-tight">Snabba affärer</h4>
                  <p className="text-zinc-500 font-light leading-relaxed">
                    Genomsnittlig annonstid är nu <span className="text-blue-600 font-bold">14 dagar</span>, vilket är lägre än snittet.
                  </p>
                </motion.div>
              </div>
            </div>

            {/* Sidebar Widgets */}
            <div className="space-y-10">
              
              {/* Price Alert Widget */}
              <div className="card p-10 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-accent/10 transition-colors"></div>
                
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-accent rounded-2xl flex items-center justify-center shadow-lg shadow-accent/20">
                    <Bell className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-black tracking-tight">Prisbevakning</h3>
                </div>
                <p className="text-zinc-500 font-light mb-8 leading-relaxed">
                  Få ett mail när snittpriset {showDetail ? `för ${selectedMake} ${selectedModel}` : ''} ändras med mer än 2%.
                </p>
                
                {subscribed ? (
                  <div className="bg-accent/5 text-accent p-6 rounded-2xl text-sm font-bold uppercase tracking-widest text-center border border-accent/10">
                    Bevakning aktiverad
                  </div>
                ) : (
                  <form onSubmit={handleSubscribe} className="space-y-4">
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                      <input 
                        type="email" 
                        placeholder="Din e-postadress" 
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-zinc-50 border-2 border-zinc-100 rounded-2xl pl-12 pr-4 py-4 focus:outline-none focus:border-accent text-sm transition-all"
                      />
                    </div>
                    <button type="submit" className="w-full bg-black text-white py-4 rounded-2xl font-bold hover:bg-accent transition-all duration-500">
                      Starta gratis bevakning
                    </button>
                  </form>
                )}
              </div>

              {/* Premium CTA */}
              <div className="card p-10 bg-black text-white relative overflow-hidden group shadow-2xl">
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-accent/30 transition-colors"></div>
                
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center shadow-lg shadow-accent/20">
                    <Zap className="text-white w-5 h-5" fill="white" />
                  </div>
                  <span className="text-[10px] font-bold text-accent uppercase tracking-widest">Premium Insights</span>
                </div>
                <h3 className="text-2xl font-light mb-4 tracking-tight">Lås upp full analys</h3>
                <p className="text-zinc-400 font-light mb-10 leading-relaxed">
                  Få tillgång till historiska slutpriser, lageromsättning och framtida värdeprognoser.
                </p>
                <Link to="/premium" className="flex items-center justify-between group text-accent font-bold uppercase tracking-widest text-[11px] hover:text-white transition-colors">
                  Se alla funktioner <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* Market Health */}
              <div className="card p-10">
                <h3 className="text-[10px] font-bold text-black uppercase tracking-widest mb-10">Marknadshälsa</h3>
                <div className="space-y-8">
                  {(showDetail ? [
                    { label: 'Prisstabilitet', value: marketDetail!.stats.p75 - marketDetail!.stats.p25 < marketDetail!.stats.median * 0.4 ? 'Hög' : 'Normal', color: marketDetail!.stats.p75 - marketDetail!.stats.p25 < marketDetail!.stats.median * 0.4 ? 'text-emerald-500' : 'text-blue-500' },
                    { label: 'Utbud', value: marketDetail!.stats.count > 50 ? 'Stort' : marketDetail!.stats.count > 20 ? 'Normalt' : 'Begränsat', color: marketDetail!.stats.count > 50 ? 'text-emerald-500' : 'text-blue-500' },
                    { label: 'Köptryck', value: 'Växande', color: 'text-accent' }
                  ] : [
                    { label: 'Aktiva annonser', value: totalListings.toLocaleString('sv'), color: 'text-black font-bold' },
                    { label: 'Märken', value: `${makes.length} st`, color: 'text-blue-500' },
                    { label: 'Uppdateras', value: 'Varje natt', color: 'text-accent' }
                  ]).map((stat, i) => (
                    <div key={i} className="flex justify-between items-center">
                      <span className="text-zinc-500 font-light text-sm">{stat.label}</span>
                      <span className={`font-bold ${stat.color}`}>{stat.value}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
