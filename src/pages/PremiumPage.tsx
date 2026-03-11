import React from 'react';
import { motion } from 'motion/react';
import { Zap, Check, Shield, Star, TrendingUp, Activity, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PremiumPage() {
  const plans = [
    {
      name: 'Bas',
      price: '0 kr',
      description: 'Grundläggande fordonsdata för alla.',
      features: [
        'Basfakta om fordonet',
        'Besiktningshistorik',
        'Tekniska specifikationer',
        'Marknadsöversikt'
      ],
      cta: 'Börja gratis',
      popular: false
    },
    {
      name: 'Premium',
      price: '99 kr',
      description: 'Den kompletta rapporten för trygga affärer.',
      features: [
        'Allt i Bas-planen',
        'AI-analys av historik',
        'Värdeprognos (3 år)',
        'Dolda fel-varningar',
        'Mätarställningsanalys',
        'Ägarhistorik detaljerad'
      ],
      cta: 'Köp rapport',
      popular: true
    },
    {
      name: 'Pro',
      price: '249 kr',
      description: 'För dig som letar bil aktivt.',
      features: [
        '5 Premium-rapporter',
        'Obegränsade prisbevakningar',
        'Prioriterad support',
        'Export till PDF',
        'Spara favoriter'
      ],
      cta: 'Skaffa Pro',
      popular: false
    }
  ];

  return (
    <div className="bg-white min-h-screen pb-32 selection:bg-accent selection:text-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden border-b border-zinc-100">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-accent/5 rounded-full blur-[120px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="micro-label text-accent mb-8">BilKoll Premium</div>
            <h1 className="text-6xl md:text-8xl font-light text-black mb-10 tracking-tighter leading-[0.9]">
              Gör en <span className="font-bold italic serif">tryggare</span> <br />bilaffär.
            </h1>
            <p className="text-xl md:text-2xl text-zinc-500 font-light leading-relaxed mb-12 max-w-3xl mx-auto">
              Våra premiumtjänster ger dig insikter som inte syns på ytan. Undvik dolda fel och gör en bättre affär med AI-driven dataanalys.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`card p-10 flex flex-col relative ${plan.popular ? 'border-accent shadow-2xl shadow-accent/5' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-10 -translate-y-1/2 bg-accent text-white px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                    Mest populär
                  </div>
                )}
                
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-black mb-2">{plan.name}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-black">{plan.price}</span>
                    {plan.name !== 'Bas' && <span className="text-zinc-400 text-sm">/rapport</span>}
                  </div>
                  <p className="text-zinc-500 font-light mt-4 text-sm">{plan.description}</p>
                </div>

                <div className="space-y-4 mb-12 flex-grow">
                  {plan.features.map((feature, j) => (
                    <div key={j} className="flex items-start gap-3">
                      <div className={`mt-1 w-5 h-5 rounded-full flex items-center justify-center ${plan.popular ? 'bg-accent/10 text-accent' : 'bg-zinc-100 text-zinc-400'}`}>
                        <Check size={12} strokeWidth={3} />
                      </div>
                      <span className="text-zinc-600 text-sm font-light">{feature}</span>
                    </div>
                  ))}
                </div>

                <button className={`w-full py-4 rounded-2xl font-bold transition-all duration-500 ${
                  plan.popular 
                    ? 'bg-accent text-white hover:bg-black shadow-lg shadow-accent/20' 
                    : 'bg-zinc-100 text-black hover:bg-zinc-200'
                }`}>
                  {plan.cta}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-light text-black tracking-tight mb-4">Varför välja Premium?</h2>
            <p className="text-zinc-500 font-light">Vi gräver djupare för att du ska slippa obehagliga överraskningar.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {[
              {
                title: 'AI-Riskbedömning',
                desc: 'Vår AI flaggar för avvikelser i historiken som kan tyda på mätarskruvning eller dolda skador.',
                icon: <Zap className="text-accent" />
              },
              {
                title: 'Värdeprognos',
                desc: 'Se hur bilens värde förväntas utvecklas de kommande 3 åren baserat på marknadstrender.',
                icon: <TrendingUp className="text-accent" />
              },
              {
                title: 'Ägarhistorik',
                desc: 'Få detaljerad information om tidigare ägare, användningsområde och geografisk historik.',
                icon: <Shield className="text-accent" />
              },
              {
                title: 'Marknadsanalys',
                desc: 'Se hur priset står sig mot liknande bilar på marknaden just nu.',
                icon: <Activity className="text-accent" />
              },
              {
                title: 'Teknisk hälsa',
                desc: 'Analys av besiktningsprotokoll för att identifiera återkommande tekniska problem.',
                icon: <Star className="text-accent" />
              },
              {
                title: 'Trygg affär',
                desc: 'Ett juridiskt underlag som kan användas vid köp eller försäljning mellan privatpersoner.',
                icon: <Check className="text-accent" />
              }
            ].map((feature, i) => (
              <div key={i} className="flex gap-6">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm shrink-0">
                  {feature.icon}
                </div>
                <div>
                  <h4 className="text-lg font-bold text-black mb-2">{feature.title}</h4>
                  <p className="text-zinc-500 font-light text-sm leading-relaxed">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32">
        <div className="max-w-5xl mx-auto px-4">
          <div className="card p-16 bg-black text-white relative overflow-hidden text-center">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-[100px] -mr-32 -mt-32"></div>
            <div className="relative z-10">
              <h2 className="text-5xl font-light mb-8 tracking-tight">Redo att göra en <span className="italic serif font-bold text-accent">bättre</span> affär?</h2>
              <p className="text-zinc-400 font-light mb-12 text-xl max-w-2xl mx-auto">
                Sök på ett registreringsnummer och få din första Premium-rapport på under 30 sekunder.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/sok" className="bg-accent text-white px-12 py-6 rounded-full font-bold hover:bg-white hover:text-black transition-all duration-500 shadow-2xl shadow-accent/20">
                  Sök fordon nu
                </Link>
                <Link to="/" className="bg-white/10 text-white px-12 py-6 rounded-full font-bold hover:bg-white/20 transition-all duration-500 backdrop-blur-sm">
                  Tillbaka till start
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
