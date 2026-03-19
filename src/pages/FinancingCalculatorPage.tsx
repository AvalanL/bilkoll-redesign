import { useState } from 'react';
import { motion } from 'motion/react';
import { Calculator, TrendingUp, DollarSign, Clock, Car, Fuel, ShieldCheck, Wrench, ChevronRight, ArrowRight } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';

export default function FinancingCalculatorPage() {
  const [searchParams] = useSearchParams();
  const prefill = (window as any).__CALC_PREFILL__;
  const initialPrice = Number(searchParams.get('pris')) || prefill?.price || 300000;
  const prefillMake = prefill?.make || '';
  const prefillModel = prefill?.model || '';
  const prefillListings = prefill?.listings || 0;
  const prefillTrend = prefill?.trend || '';
  
  // Loan calculator state
  const [carPrice, setCarPrice] = useState(initialPrice);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [interestRate, setInterestRate] = useState(6.5);
  const [loanTermMonths, setLoanTermMonths] = useState(60);
  
  // Leasing comparison state
  const [leasingMonthlyCost, setLeasingMonthlyCost] = useState(4500);
  
  // Ownership cost state
  const [yearlyTax, setYearlyTax] = useState(3240);
  const [yearlyInsurance, setYearlyInsurance] = useState(6000);
  const [monthlyFuel, setMonthlyFuel] = useState(1500);
  const [yearlyService, setYearlyService] = useState(5000);

  // Calculate loan payment (annuity formula)
  const downPayment = (carPrice * downPaymentPercent) / 100;
  const loanAmount = carPrice - downPayment;
  const monthlyInterestRate = interestRate / 100 / 12;
  const monthlyPayment = monthlyInterestRate > 0
    ? loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, loanTermMonths) / (Math.pow(1 + monthlyInterestRate, loanTermMonths) - 1)
    : loanAmount / loanTermMonths;
  const totalLoanCost = monthlyPayment * loanTermMonths;
  const totalInterestCost = totalLoanCost - loanAmount;

  // Leasing vs buy comparison (3 years)
  const threeYearLoanCost = Math.min(loanTermMonths, 36) * monthlyPayment;
  const threeYearLeasingCost = 36 * leasingMonthlyCost;
  const difference = Math.abs(threeYearLoanCost - threeYearLeasingCost);
  const loanCheaper = threeYearLoanCost < threeYearLeasingCost;

  // Total ownership cost
  const monthlyRunningCosts = (yearlyTax + yearlyInsurance + yearlyService) / 12 + monthlyFuel;
  const totalMonthlyCost = monthlyPayment + monthlyRunningCosts;

  const fmt = (value: number) => {
    return new Intl.NumberFormat('sv-SE', { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);
  };

  return (
    <div className="bg-white min-h-screen pb-32 selection:bg-accent selection:text-white">
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden border-b border-zinc-100">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-accent/5 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="micro-label text-accent mb-8">{prefillMake && prefillModel ? `${prefillMake} ${prefillModel}` : 'Gratis kalkylator'}</div>
              <h1 className="text-6xl md:text-8xl font-light text-black mb-6 tracking-tighter leading-[0.9]">
                {prefillMake ? (
                  <>Vad kostar en <span className="font-bold italic serif">{prefillMake} {prefillModel}?</span></>
                ) : (
                  <>Beräkna din <span className="font-bold italic serif">bilkostnad.</span></>
                )}
              </h1>
              <p className="text-xl text-zinc-500 font-light max-w-xl">
                {prefillMake && prefillListings > 0 ? (
                  <>Medianpris: {initialPrice.toLocaleString('sv-SE')} kr baserat på {prefillListings} annonser. {prefillTrend && `Pristrend: ${prefillTrend}.`}</>
                ) : (
                  <>Billån, leasing eller kontant? Räkna ut månadskostnad och jämför dina alternativ.</>
                )}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Main Column */}
            <div className="lg:col-span-2 space-y-12">

              {/* Section 1: Loan Calculator */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <div className="flex items-center gap-4 mb-10">
                  <div className="w-12 h-12 bg-accent rounded-2xl flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-light text-black tracking-tight">Billån</h2>
                    <p className="text-sm text-zinc-400 font-light">Beräkna din månadskostnad</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  {/* Inputs */}
                  <div className="space-y-8">
                    <div>
                      <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-3 block">Bilpris (kr)</label>
                      <input
                        type="number"
                        value={carPrice}
                        onChange={(e) => setCarPrice(Number(e.target.value))}
                        className="w-full px-6 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl text-black text-lg font-medium focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-3 block">
                        Kontantinsats: {downPaymentPercent}% ({fmt(downPayment)} kr)
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="50"
                        step="5"
                        value={downPaymentPercent}
                        onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                        className="w-full h-2 bg-zinc-200 rounded-full appearance-none cursor-pointer accent-accent"
                      />
                      <div className="flex justify-between text-xs text-zinc-400 mt-1">
                        <span>0%</span>
                        <span>50%</span>
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-3 block">Ränta (%)</label>
                      <input
                        type="number"
                        step="0.1"
                        value={interestRate}
                        onChange={(e) => setInterestRate(Number(e.target.value))}
                        className="w-full px-6 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl text-black text-lg font-medium focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-3 block">
                        Löptid: {loanTermMonths} månader ({(loanTermMonths / 12).toFixed(1)} år)
                      </label>
                      <input
                        type="range"
                        min="12"
                        max="84"
                        step="12"
                        value={loanTermMonths}
                        onChange={(e) => setLoanTermMonths(Number(e.target.value))}
                        className="w-full h-2 bg-zinc-200 rounded-full appearance-none cursor-pointer accent-accent"
                      />
                      <div className="flex justify-between text-xs text-zinc-400 mt-1">
                        <span>1 år</span>
                        <span>7 år</span>
                      </div>
                    </div>
                  </div>

                  {/* Results */}
                  <div className="space-y-6">
                    <div className="card p-10 border-2 border-accent/20 bg-gradient-to-br from-accent/5 to-white">
                      <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent mb-2">Månadskostnad</div>
                      <div className="text-5xl font-light text-black tracking-tighter">{fmt(monthlyPayment)} <span className="text-2xl text-zinc-400">kr</span></div>
                    </div>

                    <div className="card p-8">
                      <div className="space-y-4">
                        <div className="flex justify-between items-center pb-4 border-b border-zinc-100">
                          <span className="text-sm text-zinc-500 font-light">Lånebelopp</span>
                          <span className="font-medium text-black">{fmt(loanAmount)} kr</span>
                        </div>
                        <div className="flex justify-between items-center pb-4 border-b border-zinc-100">
                          <span className="text-sm text-zinc-500 font-light">Total lånekostnad</span>
                          <span className="font-medium text-black">{fmt(totalLoanCost)} kr</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-zinc-500 font-light">Räntekostnad</span>
                          <span className="font-bold text-accent">{fmt(totalInterestCost)} kr</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Section 2: Leasing vs Buy */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <div className="flex items-center gap-4 mb-10">
                  <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-light text-black tracking-tight">Leasing vs Köp</h2>
                    <p className="text-sm text-zinc-400 font-light">Jämförelse över 3 år</p>
                  </div>
                </div>

                <div className="mb-8">
                  <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-3 block">Månadskostnad leasing (kr)</label>
                  <input
                    type="number"
                    value={leasingMonthlyCost}
                    onChange={(e) => setLeasingMonthlyCost(Number(e.target.value))}
                    className="w-full max-w-xs px-6 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl text-black text-lg font-medium focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className={`card p-10 border-2 transition-all ${loanCheaper ? 'border-accent bg-accent/5' : 'border-zinc-200'}`}>
                    <div className="flex items-center gap-3 mb-6">
                      <DollarSign size={20} className={loanCheaper ? 'text-accent' : 'text-zinc-400'} />
                      <h3 className="text-xl font-bold text-black">Köp med lån</h3>
                    </div>
                    <div className="text-4xl font-light text-black tracking-tighter mb-2">{fmt(threeYearLoanCost)} <span className="text-xl text-zinc-400">kr</span></div>
                    <p className="text-sm text-zinc-500 font-light">Total kostnad över 3 år</p>
                    {loanCheaper && (
                      <div className="mt-6 px-4 py-3 rounded-xl bg-accent/10 border border-accent/20">
                        <p className="text-sm font-bold text-accent">✓ Billigare med {fmt(difference)} kr</p>
                      </div>
                    )}
                  </div>

                  <div className={`card p-10 border-2 transition-all ${!loanCheaper ? 'border-emerald-500 bg-emerald-50' : 'border-zinc-200'}`}>
                    <div className="flex items-center gap-3 mb-6">
                      <Clock size={20} className={!loanCheaper ? 'text-emerald-600' : 'text-zinc-400'} />
                      <h3 className="text-xl font-bold text-black">Leasing</h3>
                    </div>
                    <div className="text-4xl font-light text-black tracking-tighter mb-2">{fmt(threeYearLeasingCost)} <span className="text-xl text-zinc-400">kr</span></div>
                    <p className="text-sm text-zinc-500 font-light">Total kostnad över 3 år</p>
                    {!loanCheaper && (
                      <div className="mt-6 px-4 py-3 rounded-xl bg-emerald-50 border border-emerald-200">
                        <p className="text-sm font-bold text-emerald-600">✓ Billigare med {fmt(difference)} kr</p>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>

              {/* Section 3: Total Ownership Cost */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <div className="flex items-center gap-4 mb-10">
                  <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center">
                    <Car className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-light text-black tracking-tight">Total Ägandekostnad</h2>
                    <p className="text-sm text-zinc-400 font-light">Alla kostnader per månad</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    {[
                      { icon: <ShieldCheck size={18} />, label: 'Fordonsskatt (kr/år)', value: yearlyTax, setter: setYearlyTax },
                      { icon: <ShieldCheck size={18} />, label: 'Försäkring (kr/år)', value: yearlyInsurance, setter: setYearlyInsurance },
                      { icon: <Fuel size={18} />, label: 'Bränsle/Laddning (kr/mån)', value: monthlyFuel, setter: setMonthlyFuel },
                      { icon: <Wrench size={18} />, label: 'Service (kr/år)', value: yearlyService, setter: setYearlyService },
                    ].map((item, i) => (
                      <div key={i} className="card p-6 flex items-center gap-4 group hover:border-accent/20 transition-all">
                        <div className="w-10 h-10 rounded-2xl bg-zinc-50 text-zinc-400 group-hover:bg-accent group-hover:text-white flex items-center justify-center transition-colors flex-shrink-0">
                          {item.icon}
                        </div>
                        <div className="flex-1">
                          <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block">{item.label}</label>
                          <input
                            type="number"
                            value={item.value}
                            onChange={(e) => item.setter(Number(e.target.value))}
                            className="w-full bg-transparent text-black font-medium text-lg focus:outline-none"
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col justify-center">
                    <div className="card p-12 border-2 border-accent/20 bg-gradient-to-br from-accent/5 to-white text-center">
                      <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent mb-4">Total månadskostnad</div>
                      <div className="text-6xl font-light text-black tracking-tighter mb-6">{fmt(totalMonthlyCost)} <span className="text-2xl text-zinc-400">kr</span></div>
                      <div className="space-y-3 text-left max-w-xs mx-auto">
                        <div className="flex justify-between pb-3 border-b border-zinc-100">
                          <span className="text-sm text-zinc-500 font-light">Lån</span>
                          <span className="font-medium text-black">{fmt(monthlyPayment)} kr</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-zinc-500 font-light">Driftskostnader</span>
                          <span className="font-medium text-black">{fmt(monthlyRunningCosts)} kr</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

            </div>

            {/* Sidebar */}
            <div className="space-y-10">
              {/* CTA: Search specific car */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
                <div className="bg-black rounded-[3rem] p-10 text-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-1/2 h-full bg-accent/10 rounded-full blur-[80px] -mr-16" />
                  <div className="relative z-10">
                    <div className="w-12 h-12 bg-accent rounded-2xl flex items-center justify-center mb-6">
                      <Calculator className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-light tracking-tight mb-4">
                      {prefillMake ? `Sök din ${prefillMake} ${prefillModel}` : <>Exakt kostnad för <span className="font-bold italic">din</span> bil?</>}
                    </h3>
                    <p className="text-zinc-400 font-light mb-8 leading-relaxed">
                      Sök på registreringsnummer och få personlig analys med verklig värdeminskning baserad på 29 000+ annonser.
                    </p>
                    <Link
                      to="/sok"
                      className="flex items-center justify-center gap-2 w-full bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-accent hover:text-white transition-all duration-500"
                    >
                      Sök regnummer <ArrowRight size={18} />
                    </Link>
                  </div>
                </div>
              </motion.div>

              {/* Quick facts */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
                <div className="card p-10">
                  <h3 className="text-[10px] font-bold text-black uppercase tracking-[0.2em] mb-10 flex items-center gap-3">
                    <TrendingUp className="w-5 h-5 text-accent" />
                    Snabbfakta
                  </h3>
                  <div className="space-y-8">
                    <div className="flex justify-between items-center pb-6 border-b border-zinc-100">
                      <span className="text-zinc-500 font-light text-sm">Vanlig ränta</span>
                      <span className="font-medium text-black">5–12%</span>
                    </div>
                    <div className="flex justify-between items-center pb-6 border-b border-zinc-100">
                      <span className="text-zinc-500 font-light text-sm">Rekommenderad insats</span>
                      <span className="font-medium text-black">Min 20%</span>
                    </div>
                    <div className="flex justify-between items-center pb-6 border-b border-zinc-100">
                      <span className="text-zinc-500 font-light text-sm">Populärast löptid</span>
                      <span className="font-medium text-black">60 mån</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-zinc-500 font-light text-sm">Leasing vs lån</span>
                      <span className="font-bold text-accent">Lån billigare &gt;4 år</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* FAQ */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mt-24">
            <div className="text-center mb-16">
              <div className="micro-label text-accent mb-6">Vanliga frågor</div>
              <h2 className="text-5xl md:text-6xl font-light text-black tracking-tighter">Om bilfinansiering</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  q: 'Vad är en bra ränta för billån?',
                  a: 'I Sverige ligger räntan för billån vanligtvis mellan 5–12% beroende på din kreditvärdighet och lånets storlek. Banker erbjuder oftast lägre räntor än bilhandlare.'
                },
                {
                  q: 'Hur stor kontantinsats bör jag ha?',
                  a: 'Rekommendationen är minst 20% kontantinsats för bättre lånevillkor och lägre månadskostnader. Ju mer du lägger, desto lägre räntekostnad.'
                },
                {
                  q: 'Är leasing eller köp billigare?',
                  a: 'Det beror på hur länge du planerar att ha bilen. Leasing passar dig som byter bil ofta (2–3 år). Köp med lån är ofta billigare om du behåller bilen längre än 4 år.'
                },
                {
                  q: 'Vad ingår i total ägandekostnad?',
                  a: 'Total ägandekostnad inkluderar lånekostnad, fordonsskatt, försäkring, bränsle eller laddning, service, däck och värdeminskning. En medelklassbil kostar ofta 4 000–6 000 kr/månad.'
                },
                {
                  q: 'Kan jag få billån med betalningsanmärkning?',
                  a: 'Det är svårare men inte omöjligt. Vissa finansbolag erbjuder lån till högre ränta. Alternativet är privatleasing med kortare bindningstid.'
                }
              ].map((faq, i) => (
                <div key={i} className="card p-10 group hover:border-accent/20 transition-all">
                  <h3 className="text-lg font-bold text-black mb-4 tracking-tight">{faq.q}</h3>
                  <p className="text-zinc-500 font-light leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
