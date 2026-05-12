import React, { useState, useEffect } from 'react';
import { Menu, X, Instagram, MessageCircle, Facebook, ArrowUpRight, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { label: 'Home',     id: 'home' },
  { label: 'Features', id: 'features' },
  { label: 'Projects', id: 'projects' },
  { label: 'Skills',   id: 'skills' },
  { label: 'Contact',  id: 'contact' },
];

const socialLinks = [
  {
    label: 'WhatsApp',
    username: '+977 9764354363',
    description: 'Chat directly for project inquiries, collaborations, or just saying hi.',
    icon: MessageCircle,
    href: 'https://wa.me/9779764354363',
    color: 'from-green-500/20 to-green-400/5',
    border: 'hover:border-green-500/40',
    accent: 'text-green-400',
    glow: 'hover:shadow-green-500/10',
  },
  {
    label: 'Instagram',
    username: '@a.yuss__',
    description: 'Follow my creative journey — cinematic visuals, modern projects, futuristic aesthetics.',
    icon: Instagram,
    href: 'https://instagram.com/a.yuss__',
    color: 'from-pink-500/20 to-purple-500/5',
    border: 'hover:border-pink-500/40',
    accent: 'text-pink-400',
    glow: 'hover:shadow-pink-500/10',
  },
  {
    label: 'Facebook',
    username: 'ayushduwadi.94',
    description: 'Connect and stay updated with my latest creative work and technology projects.',
    icon: Facebook,
    href: 'https://facebook.com/ayushduwadi.94',
    color: 'from-blue-500/20 to-blue-400/5',
    border: 'hover:border-blue-500/40',
    accent: 'text-blue-400',
    glow: 'hover:shadow-blue-500/10',
  },
];

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close modal on ESC
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShowContactModal(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  const handleNavClick = (id: string) => {
    setIsOpen(false);
    if (id === 'contact') {
      setShowContactModal(true);
    } else {
      scrollToSection(id);
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className={`fixed left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl transition-all duration-500 ${scrolled ? 'top-2 md:top-3' : 'top-4 md:top-6'}`}
      >
        <div className={`flex items-center justify-between px-4 md:px-6 py-3 md:py-4 rounded-full border border-white/10 backdrop-blur-2xl shadow-2xl transition-all duration-500 ${scrolled ? 'bg-black/70 shadow-black/80' : 'bg-black/40 shadow-black/50'}`}>
          {/* Logo */}
          <button
            onClick={() => scrollToSection('home')}
            className="flex items-center gap-2 pl-2 md:pl-0 cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-white to-neutral-500 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-black" />
            </div>
            <span className="text-white font-bold tracking-wide text-lg">Ayush Duwadi</span>
          </button>

          {/* Desktop Links */}
          <div className="flex items-center gap-2 md:gap-8">
            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-400">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className="relative hover:text-white transition-colors group cursor-pointer bg-transparent border-none"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full rounded-full" />
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowContactModal(true)}
              className="hidden md:inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-white text-black text-sm font-semibold hover:scale-105 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]"
            >
              Start Project
            </button>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden text-neutral-300 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="md:hidden absolute top-full left-0 w-full mt-2 p-4 rounded-3xl bg-black/80 border border-white/10 backdrop-blur-2xl flex flex-col gap-2 shadow-2xl overflow-hidden"
            >
              {navItems.map((item, i) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                  onClick={() => handleNavClick(item.id)}
                  className="text-neutral-300 hover:text-white text-base font-medium transition-colors px-6 py-4 rounded-xl hover:bg-white/10 text-left bg-transparent border-none cursor-pointer"
                >
                  {item.label}
                </motion.button>
              ))}
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                onClick={() => { setIsOpen(false); setShowContactModal(true); }}
                className="mt-2 mx-2 px-6 py-4 rounded-xl bg-white text-black text-base font-semibold hover:bg-neutral-200 transition-colors"
              >
                Start Project
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* ── Contact Social Modal ── */}
      <AnimatePresence>
        {showContactModal && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setShowContactModal(false)}
              className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-md"
            />

            {/* Modal */}
            <motion.div
              key="modal"
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none"
            >
              <div className="pointer-events-auto w-full max-w-2xl">
                {/* Modal Card */}
                <div className="relative bg-[#0c0c0c] border border-white/10 rounded-[40px] p-8 md:p-12 shadow-2xl shadow-black/80 overflow-hidden">
                  {/* Background glow */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.04)_0%,transparent_70%)] pointer-events-none" />

                  {/* Header */}
                  <div className="flex items-start justify-between mb-10 relative z-10">
                    <div>
                      <p className="text-emerald-400 font-mono text-xs tracking-widest uppercase mb-3">// Get In Touch</p>
                      <h2 className="text-3xl md:text-4xl font-black text-white leading-tight">
                        Let's Connect
                      </h2>
                      <p className="text-neutral-500 text-sm mt-2 font-light">Choose your preferred platform to reach out.</p>
                    </div>
                    <button
                      onClick={() => setShowContactModal(false)}
                      className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-white/10 transition-all flex-shrink-0"
                    >
                      <X size={16} />
                    </button>
                  </div>

                  {/* Social Cards */}
                  <div className="grid grid-cols-1 gap-4 relative z-10">
                    {socialLinks.map((social, i) => (
                      <motion.a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 + i * 0.08 }}
                        className={`group flex items-center gap-5 p-5 rounded-2xl bg-gradient-to-r ${social.color} border border-white/5 ${social.border} transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl ${social.glow}`}
                      >
                        {/* Icon */}
                        <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                          <social.icon className={`w-5 h-5 ${social.accent}`} />
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className={`text-xs font-mono font-bold uppercase tracking-widest ${social.accent}`}>{social.label}</span>
                          </div>
                          <p className="text-white font-semibold text-sm truncate">{social.username}</p>
                          <p className="text-neutral-500 text-xs font-light mt-0.5 leading-relaxed line-clamp-1">{social.description}</p>
                        </div>

                        {/* Arrow */}
                        <div className="flex-shrink-0">
                          <ArrowUpRight className={`w-5 h-5 text-neutral-600 group-hover:${social.accent.replace('text-', 'text-')} transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5`} />
                        </div>
                      </motion.a>
                    ))}
                  </div>

                  {/* Footer note */}
                  <p className="text-center text-neutral-600 text-xs font-light mt-8 relative z-10">
                    Tap any platform to open a direct connection ✦
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
