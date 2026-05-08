'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, MessageCircle, Facebook, ArrowUpRight, CheckCircle2 } from 'lucide-react';

const contactCards = [
  {
    label: "Instagram",
    username: "@a.yuss__",
    description: "Follow my creative journey, cinematic visuals, modern projects, and futuristic digital experiences.",
    button: "Open Instagram",
    icon: Instagram,
    href: "https://instagram.com/a.yuss__"
  },
  {
    label: "WhatsApp",
    username: "+977 9764354363",
    description: "Contact me directly for website projects, collaborations, cinematic portfolios, or development services.",
    button: "Message Now",
    icon: MessageCircle,
    href: "https://wa.me/9779764354363"
  },
  {
    label: "Facebook",
    username: "ayushduwadi.94",
    description: "Connect with me and stay updated with my latest creative work and technology projects.",
    button: "Visit Profile",
    icon: Facebook,
    href: "https://facebook.com/ayushduwadi.94"
  }
];

const pricingData = [
  {
    title: "Basic Portfolio",
    price: "$50",
    features: [
      "Responsive Design",
      "Modern UI",
      "Fast Performance",
      "Simple Animations",
      "Deployment Included"
    ]
  },
  {
    title: "Cinematic Portfolio",
    price: "$120",
    features: [
      "Framer Motion",
      "3D Interactions",
      "Cinematic Design",
      "Premium Animations",
      "Advanced UI/UX",
      "Deployment Included"
    ]
  },
  {
    title: "Custom Experience",
    price: "Custom",
    features: [
      "Full Custom Design",
      "Advanced Interactions",
      "Premium Development",
      "API Integrations",
      "Modern Technologies",
      "Personalized Features"
    ]
  }
];

export function ContactSection() {
  return (
    <section id="contact" className="py-24 md:py-36 w-full bg-[#0C0C0C] rounded-t-[40px] md:rounded-t-[80px] relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-white/10" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-24">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-emerald-400 font-mono text-xs mb-4 tracking-widest uppercase"
          >
            // Contact
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-[120px] font-black text-white leading-none tracking-tight uppercase"
          >
            Let's Build<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-200 to-white">Something</span><br />
            Extraordinary
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-12 text-[#D7E2EA] text-lg md:text-xl max-w-3xl mx-auto font-light leading-relaxed"
          >
            If you want a modern cinematic website, futuristic portfolio, 3D interactive experience, or creative digital project, feel free to contact me. I focus on building immersive and visually powerful experiences.
          </motion.p>
        </div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-32">
          {contactCards.map((card, i) => (
            <motion.a
              key={card.label}
              href={card.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative p-10 rounded-[40px] bg-white/[0.03] border border-white/10 hover:border-emerald-500/30 backdrop-blur-3xl overflow-hidden transition-all hover:-translate-y-2 flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-8 border border-white/5 group-hover:scale-110 transition-transform">
                <card.icon className="w-8 h-8 text-white" />
              </div>
              <p className="text-emerald-400 text-xs font-mono mb-2">{card.label}</p>
              <h4 className="text-xl font-bold text-white mb-4 italic font-display">{card.username}</h4>
              <p className="text-neutral-500 text-sm font-light mb-8 leading-relaxed max-w-[200px]">
                {card.description}
              </p>
              <div className="mt-auto inline-flex items-center gap-2 text-white text-sm font-medium border-b border-white/20 group-hover:border-emerald-500/50 pb-1 transition-all">
                {card.button} <ArrowUpRight className="w-4 h-4 opacity-50" />
              </div>
            </motion.a>
          ))}
        </div>

        {/* Pricing Section */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">Project Pricing</h3>
            <p className="text-neutral-500 font-light italic">Flexible pricing based on design complexity, animations, and features.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingData.map((plan, i) => (
              <motion.div
                key={plan.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`p-10 rounded-[48px] bg-white/[0.02] border border-white/5 relative overflow-hidden flex flex-col ${i === 1 ? 'md:scale-105 bg-white/[0.04] border-white/20' : ''}`}
              >
                {i === 1 && (
                  <div className="absolute top-8 right-8 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] uppercase font-bold tracking-widest">
                    Best Value
                  </div>
                )}
                <h4 className="text-neutral-400 text-sm font-mono mb-4">{plan.title}</h4>
                <div className="flex items-baseline gap-1 mb-10">
                  <span className="text-4xl md:text-6xl font-bold text-white tracking-tight">{plan.price}</span>
                  {plan.price !== 'Custom' && <span className="text-neutral-600 text-sm font-light italic">/ starting from</span>}
                </div>
                
                <ul className="space-y-4 mb-10">
                  {plan.features.map(feat => (
                    <li key={feat} className="flex items-center gap-3 text-neutral-400 text-sm font-light">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500/50" />
                      {feat}
                    </li>
                  ))}
                </ul>

                <button className="w-full py-4 rounded-3xl bg-white/5 hover:bg-white text-neutral-400 hover:text-black text-sm font-bold transition-all mt-auto border border-white/5 hover:border-white">
                  Get Started
                </button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center py-24 relative overflow-hidden rounded-[80px] bg-gradient-to-b from-white/[0.03] to-transparent">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-6xl font-display font-medium text-white mb-12 italic"
          >
            Ready to create something unforgettable?
          </motion.h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button className="px-10 py-5 rounded-full bg-white text-black font-bold text-base hover:scale-105 transition-all shadow-white/20 shadow-2xl">
              Start a Project
            </button>
            <button className="px-10 py-5 rounded-full border border-white/10 text-white hover:bg-white/5 transition-all">
              Contact Me
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
