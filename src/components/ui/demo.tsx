'use client'

import { SplineScene } from "@/components/ui/splite";
import { Spotlight } from "@/components/ui/spotlight"
import { motion } from "framer-motion"
import { ArrowRight, Instagram } from "lucide-react"
import { TextReveal } from "@/components/ui/text-reveal"
import { AnimatedTitle } from "@/components/ui/animated-title"
import { CountUp } from "@/components/ui/count-up"
import { NeonButton } from "@/components/ui/neon-button"

const stats = [
  { label: 'Projects Built', value: 20, prefix: '' },
  { label: 'Technologies', value: 12, prefix: '' },
  { label: 'GitHub Repos', value: 35, prefix: '' },
];

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export function SplineSceneBasic() {
  return (
    <div className="w-full min-h-[700px] md:min-h-[600px] md:h-[600px] relative overflow-hidden flex flex-col md:flex-row rounded-3xl border border-white/10 bg-black/40 backdrop-blur-3xl shadow-2xl shadow-white/5">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
      
      <div className="flex flex-col md:flex-row w-full flex-1 relative z-10">
        {/* Left content */}
        <div className="flex-none md:flex-1 p-8 pt-12 pb-4 md:p-16 md:pt-16 md:pb-16 relative z-10 flex flex-col justify-center items-center text-center md:items-start md:text-left overflow-hidden">
          
          {/* Subtle Background Portrait */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute inset-0 z-[-1] pointer-events-none"
          >
            <img 
              src="/ChatGPT Image May 8, 2026, 08_11_03 PM.png" 
              alt="Ayush Background"
              className="w-full h-full object-cover object-center mix-blend-luminosity grayscale opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/60" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/20 to-black/80" />
          </motion.div>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-neutral-300 text-xs font-medium mb-6 backdrop-blur-md"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            // Personal Portfolio
          </motion.div>

          {/* Hero Title */}
          <h1 className="text-5xl sm:text-6xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1]">
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-neutral-200 to-neutral-500">
              <AnimatedTitle text="Hi, I'm" />
            </span>{' '}
            <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-300 to-neutral-600">
              <AnimatedTitle text="Ayush Duwadi" />
            </span>
          </h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
            className="mt-4 text-emerald-400 font-display font-medium tracking-wide uppercase text-xs md:text-sm"
          >
            Python Developer • Node.js Developer • React Enthusiast • Linux Explorer
          </motion.p>

          <div className="mt-6">
            <TextReveal 
              text="I am a passionate tech enthusiast from Bharatpur, Chitwan, Nepal. I enjoy building modern applications, exploring Linux systems, creating interactive experiences, and learning new technologies."
              className="text-neutral-400 max-w-[280px] sm:max-w-[320px] md:max-w-lg text-[15px] md:text-lg leading-relaxed font-light"
            />
          </div>

          {/* CountUp Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: "easeOut" }}
            className="mt-8 flex items-center gap-6 md:gap-8"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center md:items-start">
                <span className="text-2xl md:text-3xl font-extrabold text-white">
                  <CountUp to={stat.value} from={0} duration={2.5} prefix={stat.prefix} />
                  <span className="text-purple-400">+</span>
                </span>
                <span className="text-neutral-500 text-xs font-medium mt-0.5">{stat.label}</span>
              </div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="mt-8 flex flex-col sm:flex-row items-center gap-3"
          >
            {/* About Me → links to Instagram */}
            <a
              href="https://instagram.com/a.yuss__"
              target="_blank"
              rel="noopener noreferrer"
            >
              <NeonButton
                label="About Me"
                hoverText="@a.yuss__"
                variant="primary"
              />
            </a>

            {/* Projects → scroll to projects section */}
            <NeonButton
              label="Projects"
              hoverText="View Work"
              variant="outline"
              onClick={() => scrollToSection('projects')}
            />

            {/* Contact → scroll to skills/contact section */}
            <NeonButton
              label="Contact"
              hoverText="Let's Talk"
              variant="ghost"
              onClick={() => scrollToSection('skills')}
            />
          </motion.div>
        </div>

        {/* Right — 3D Robot */}
        <div className="flex-1 relative min-h-[400px] md:min-h-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-20 pointer-events-none md:hidden" />
          
          <motion.div 
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute inset-0 z-0 overflow-hidden"
          >
            <img 
              src="/input_file_1.png" 
              alt="Ayush Duwadi Portrait"
              className="w-full h-full object-cover grayscale opacity-40 mix-blend-luminosity scale-[1.2]"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/20 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
          </motion.div>

          <SplineScene 
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="w-full h-full relative z-10 scale-[1.1] sm:scale-125 md:scale-100 origin-center"
          />
        </div>
      </div>
    </div>
  )
}
