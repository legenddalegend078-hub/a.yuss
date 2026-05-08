'use client';
import React from 'react';
import { motion } from 'framer-motion';

const outfitCards = [
  {
    title: "Streetwear",
    description: "Oversized silhouettes, relaxed fits, layered fashion, and modern urban aesthetics.",
    tags: ["Oversized", "Relaxed Fit", "Dark Tones", "Everyday Style"]
  },
  {
    title: "Formal",
    description: "Clean monochrome outfits with timeless tailoring and premium minimal styling.",
    tags: ["Black Blazer", "White Shirt", "Modern Fit", "Elegant"]
  },
  {
    title: "Futuristic",
    description: "Space-inspired fashion aesthetics mixed with cinematic lighting and modern textures.",
    tags: ["Techwear", "Metallic", "Minimal", "Cinematic"]
  }
];

const galleryImages = [
  "/PIC 4.jpeg",
  "/PIC 8.jpeg",
  "/PIC 9.jpeg",
  "/PIC 11.jpeg",
  "/PIC 12.jpeg",
  "/PIC 13.jpeg",
  "/PIC5.jpeg",
  "/WhatsApp Image 2026-04-12 at 1.19.23 AM.jpeg",
  "/WhatsApp Image 2026-04-12 at 1.19.27 AM.jpeg",
  "/WhatsApp Image 2026-04-12 at 1.19.28 AM.jpeg",
  "/ChatGPT Image May 8, 2026, 08_11_03 PM.png",
  "/ChatGPT Image May 8, 2026, 08_11_20 PM.png",
];

export function OutfitSection() {
  return (
    <section id="outfit" className="py-24 md:py-36 w-full bg-[#0C0C0C] rounded-t-[40px] md:rounded-t-[80px] relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-x-0 top-0 h-px bg-white/10" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(99,102,241,0.05)_0%,transparent_50%)]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Hero Section */}
        <div className="mb-24">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-emerald-400 font-mono text-xs mb-4 tracking-widest uppercase"
          >
            // Personal Style
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-8xl font-serif font-bold text-white mb-8 leading-tight italic"
          >
            Minimal Style.<br />
            Maximum Presence.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-neutral-400 text-lg md:text-xl max-w-2xl font-body font-light leading-relaxed"
          >
            My fashion style combines modern streetwear, cinematic aesthetics, and futuristic minimalism. I prefer clean dark outfits, premium layering, and timeless styles that feel confident, calm, and visually powerful.
          </motion.p>
        </div>

        {/* Categories Section */}
        <div className="mb-32">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-20">
            <motion.h3 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-white font-mono text-sm uppercase tracking-[0.4em] opacity-50 whitespace-nowrap"
            >
              Style Identity
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-neutral-400 text-lg md:text-2xl font-serif italic max-w-2xl leading-relaxed"
            >
              My style focuses on simplicity, confidence, and clean aesthetics. I enjoy dark tones, oversized silhouettes, premium textures, and cinematic outfit combinations inspired by futuristic fashion and modern design culture.
            </motion.p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {outfitCards.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group p-10 rounded-[48px] bg-white/[0.02] border border-white/5 hover:border-white/20 backdrop-blur-3xl transition-all hover:-translate-y-2"
              >
                <h4 className="text-3xl font-serif italic text-white mb-4">{card.title}</h4>
                <p className="text-neutral-500 font-body font-light mb-8 text-sm leading-relaxed">
                  {card.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {card.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 rounded-full bg-white/[0.05] text-neutral-600 text-[10px] font-mono uppercase tracking-wider">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Quote Section */}
        <div className="mb-32 text-center py-32 relative">
          <div className="absolute inset-0 bg-white/[0.01] blur-[120px] rounded-full" />
          <motion.h2
            initial={{ filter: 'blur(10px)', opacity: 0 }}
            whileInView={{ filter: 'blur(0px)', opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-5xl md:text-9xl font-serif font-medium text-white italic max-w-5xl mx-auto leading-none tracking-tight"
          >
            "Style is not about attention. It is about presence."
          </motion.h2>
        </div>

        {/* Visual Identity / Gallery */}
        <div id="gallery" className="mb-24">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
            <div>
              <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="text-emerald-400 font-mono text-xs mb-4 uppercase tracking-widest"
              >
                // Gallery
              </motion.p>
              <h3 className="text-white font-serif italic text-5xl md:text-7xl font-bold mb-4">Visual Identity</h3>
              <p className="text-neutral-500 max-w-md font-body font-light">A cinematic collection of personal fashion, aesthetics, and modern style.</p>
            </div>
          </div>
          
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {galleryImages.map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="relative rounded-[40px] overflow-hidden group cursor-none"
              >
                <img 
                  src={img} 
                  className="w-full h-auto object-cover transition-transform duration-[1.5s] group-hover:scale-110 grayscale group-hover:grayscale-0"
                  alt={`Style Gallery ${i}`}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-10">
                  <p className="text-white font-serif italic text-2xl">Shot {i + 1}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
