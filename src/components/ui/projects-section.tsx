'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CircularGallery } from '@/components/ui/circular-gallery';
import { GlowingCard } from '@/components/ui/glowing-card';
import { AnimatedTitle } from '@/components/ui/animated-title';
import { X, Github, ExternalLink, Terminal, Code2, Globe, Cpu, Coffee, Layers } from 'lucide-react';

// Real photos from /public folder used as project cover images
const projects = [
  {
    id: 1,
    title: 'ArchLinux Dotfiles',
    tech: 'Linux',
    icon: Terminal,
    color: 'from-orange-500/20 to-yellow-500/10',
    border: 'border-orange-500/20',
    accent: 'text-orange-400',
    image: '/PIC 8.jpeg',
    description: 'A fully riced Arch Linux setup with custom dotfiles, i3wm window manager, polybar, rofi launcher, and a cohesive dark aesthetic across every tool.',
    tags: ['Arch Linux', 'i3wm', 'Bash', 'Polybar', 'Rofi'],
    github: 'https://github.com',
    live: null,
    year: '2024',
    quote: '"The quieter you become, the more you are able to hear." — RAM Dass',
  },
  {
    id: 2,
    title: 'NodeAPI Pro',
    tech: 'Node.js',
    icon: Code2,
    color: 'from-green-500/20 to-emerald-500/10',
    border: 'border-green-500/20',
    accent: 'text-green-400',
    image: '/PIC 9.jpeg',
    description: 'A production-ready REST API boilerplate built with Express.js, JWT authentication, MongoDB integration, rate limiting, and full Swagger documentation.',
    tags: ['Node.js', 'Express', 'MongoDB', 'JWT', 'Swagger'],
    github: 'https://github.com',
    live: 'https://example.com',
    year: '2024',
    quote: '"Code is poetry written for machines to perform." — Unknown',
  },
  {
    id: 3,
    title: 'PyVision AI',
    tech: 'Python',
    icon: Cpu,
    color: 'from-blue-500/20 to-cyan-500/10',
    border: 'border-blue-500/20',
    accent: 'text-blue-400',
    image: '/PIC 11.jpeg',
    description: 'A computer vision pipeline using OpenCV and TensorFlow to detect, classify, and track objects in real-time video streams with 94% accuracy.',
    tags: ['Python', 'OpenCV', 'TensorFlow', 'NumPy', 'CUDA'],
    github: 'https://github.com',
    live: null,
    year: '2023',
    quote: '"The best way to predict the future is to create it." — Abraham Lincoln',
  },
  {
    id: 4,
    title: 'ReactFlow Studio',
    tech: 'React',
    icon: Layers,
    color: 'from-purple-500/20 to-violet-500/10',
    border: 'border-purple-500/20',
    accent: 'text-purple-400',
    image: '/PIC 12.jpeg',
    description: 'A visual node-based workflow builder built with React Flow, featuring drag-and-drop canvas, real-time collaboration, and JSON export/import.',
    tags: ['React', 'TypeScript', 'React Flow', 'Tailwind', 'WebSocket'],
    github: 'https://github.com',
    live: 'https://example.com',
    year: '2024',
    quote: '"Simplicity is the ultimate sophistication." — Leonardo da Vinci',
  },
  {
    id: 5,
    title: 'Java Microservices',
    tech: 'Java',
    icon: Coffee,
    color: 'from-red-500/20 to-pink-500/10',
    border: 'border-red-500/20',
    accent: 'text-red-400',
    image: '/PIC 13.jpeg',
    description: 'A microservices architecture built with Spring Boot, featuring service discovery via Eureka, API gateway, and distributed tracing with Zipkin.',
    tags: ['Java', 'Spring Boot', 'Docker', 'Kubernetes', 'Kafka'],
    github: 'https://github.com',
    live: null,
    year: '2023',
    quote: '"First, solve the problem. Then, write the code." — John Johnson',
  },
  {
    id: 6,
    title: 'Portfolio Website',
    tech: 'Web Dev',
    icon: Globe,
    color: 'from-white/10 to-neutral-500/10',
    border: 'border-white/10',
    accent: 'text-white',
    image: '/ChatGPT Image May 8, 2026, 08_11_20 PM.png',
    description: 'This very portfolio — built with React, TypeScript, Three.js, and Framer Motion. Features interactive 3D backgrounds, animated titles, and cinematic scroll effects.',
    tags: ['React', 'TypeScript', 'Three.js', 'Framer Motion', 'Tailwind'],
    github: 'https://github.com',
    live: 'https://ayushduwadi.com',
    year: '2025',
    quote: '"Design is not just what it looks like. Design is how it works." — Steve Jobs',
  },
];

const galleryItems = projects.map(p => ({
  image: p.image,
  text: p.title,
}));

export function ProjectsSection() {
  const [selected, setSelected] = useState<typeof projects[0] | null>(null);

  return (
    <section id="projects" className="w-full bg-[#080808] scroll-mt-20">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8">
        <p className="text-purple-400 font-mono text-xs tracking-widest uppercase mb-4">// My Work</p>
        <h2 className="text-5xl md:text-7xl font-extrabold text-white leading-none mb-4">
          <AnimatedTitle text="Selected" />
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
            <AnimatedTitle text="Projects" />
          </span>
        </h2>
        <p className="text-neutral-500 max-w-lg font-light">
          Click any project in the gallery below to explore the full details.
        </p>
      </div>

      {/* Circular WebGL Gallery */}
      <div className="w-full h-[500px] md:h-[600px]">
        <CircularGallery
          items={galleryItems}
          bend={3}
          textColor="#ffffff"
          borderRadius={0.05}
          scrollSpeed={2}
          scrollEase={0.04}
        />
      </div>

      {/* Project Cards Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              viewport={{ once: true }}
              onClick={() => setSelected(project)}
            >
              <GlowingCard className={`cursor-pointer h-full bg-gradient-to-br ${project.color} border ${project.border} backdrop-blur-sm hover:scale-[1.02] transition-transform duration-300`}>
                <div className="p-6 flex flex-col gap-4 h-full">
                  {/* Icon + Year */}
                  <div className="flex items-start justify-between">
                    <div className={`w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center`}>
                      <project.icon className={`w-5 h-5 ${project.accent}`} />
                    </div>
                    <span className="text-neutral-600 text-xs font-mono">{project.year}</span>
                  </div>
                  {/* Title */}
                  <div>
                    <p className={`text-xs font-mono font-bold uppercase tracking-widest ${project.accent} mb-1`}>{project.tech}</p>
                    <h3 className="text-white font-bold text-xl">{project.title}</h3>
                  </div>
                  {/* Description */}
                  <p className="text-neutral-500 text-sm font-light leading-relaxed line-clamp-2 flex-1">{project.description}</p>
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-neutral-400 text-xs">{tag}</span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-neutral-500 text-xs">+{project.tags.length - 3}</span>
                    )}
                  </div>
                  {/* Click hint */}
                  <p className={`text-xs ${project.accent} opacity-60 font-medium`}>Click to view →</p>
                </div>
              </GlowingCard>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selected && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-md"
              onClick={() => setSelected(null)}
            />
            <motion.div
              key="modal"
              initial={{ opacity: 0, scale: 0.92, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 40 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-0 z-[201] flex items-center justify-center p-4 pointer-events-none"
            >
              <GlowingCard className="pointer-events-auto w-full max-w-2xl bg-[#0d0d0d] border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
                <div className="p-8 md:p-10">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${selected.color} border ${selected.border} flex items-center justify-center`}>
                        <selected.icon className={`w-6 h-6 ${selected.accent}`} />
                      </div>
                      <div>
                        <p className={`text-xs font-mono uppercase tracking-widest ${selected.accent}`}>{selected.tech}</p>
                        <h2 className="text-2xl font-bold text-white">{selected.title}</h2>
                      </div>
                    </div>
                    <button onClick={() => setSelected(null)} className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white transition-colors">
                      <X size={16} />
                    </button>
                  </div>

                  {/* Description */}
                  <p className="text-neutral-300 leading-relaxed mb-6 font-light">{selected.description}</p>

                  {/* Quote */}
                  <blockquote className="border-l-2 border-purple-500/50 pl-4 mb-6">
                    <p className="text-neutral-500 italic text-sm">{selected.quote}</p>
                  </blockquote>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {selected.tags.map(tag => (
                      <span key={tag} className={`px-3 py-1 rounded-full bg-gradient-to-r ${selected.color} border ${selected.border} text-xs font-medium ${selected.accent}`}>{tag}</span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <a href={selected.github} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-neutral-300 hover:text-white hover:bg-white/10 transition-all text-sm font-medium">
                      <Github size={16} /> View Code
                    </a>
                    {selected.live && (
                      <a href={selected.live} target="_blank" rel="noopener noreferrer"
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r ${selected.color} border ${selected.border} ${selected.accent} hover:opacity-90 transition-all text-sm font-medium`}>
                        <ExternalLink size={16} /> Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </GlowingCard>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
