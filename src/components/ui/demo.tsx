'use client'

import { SplineScene } from "@/components/ui/splite";
import { Spotlight } from "@/components/ui/spotlight"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { TextReveal } from "@/components/ui/text-reveal"

export function SplineSceneBasic() {
  return (
    <div className="w-full min-h-[700px] md:min-h-[600px] md:h-[600px] relative overflow-hidden flex flex-col md:flex-row rounded-3xl border border-white/10 bg-black/40 backdrop-blur-3xl shadow-2xl shadow-white/5">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
      
      <div className="flex flex-col md:flex-row w-full flex-1 relative z-10">
        {/* Left content with cinematic background image */}
        <div className="flex-none md:flex-1 p-8 pt-12 pb-4 md:p-16 md:pt-16 md:pb-16 relative z-10 flex flex-col justify-center items-center text-center md:items-start md:text-left overflow-hidden">
          
          {/* Subtle Background Portrait for Left Side */}
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
            {/* Gradient masks to blend the image into the black background */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/60" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/20 to-black/80" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-neutral-300 text-xs font-medium mb-6 backdrop-blur-md"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            // Personal Portfolio
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="text-5xl sm:text-6xl md:text-6xl lg:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-b from-white via-neutral-200 to-neutral-500 tracking-tight leading-[1.1]"
          >
            Hi, I'm <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-300 to-neutral-600">Ayush Duwadi</span>
          </motion.h1>
          
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
              text="I am a passionate tech enthusiast from Bharatpur, Chitwan, Nepal. I enjoy building modern applications, exploring Linux systems, creating interactive experiences, and learning new technologies. I love coding, problem-solving, and designing creative digital projects."
              className="text-neutral-400 max-w-[280px] sm:max-w-[320px] md:max-w-lg text-[15px] md:text-lg leading-relaxed font-light"
            />
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="mt-10 flex flex-col sm:flex-row items-center gap-4"
          >
            <button className="group relative inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-medium text-black bg-white rounded-full overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]">
              <span className="relative z-10">About Me</span>
              <ArrowRight className="relative z-10 size-4 transition-transform group-hover:translate-x-1" />
              <div className="absolute inset-0 bg-gradient-to-r from-white via-neutral-200 to-white opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
            <button className="px-8 py-3.5 text-sm font-medium text-white rounded-full border border-white/10 hover:bg-white/5 transition-colors">
              Projects
            </button>
            <button className="px-8 py-3.5 text-sm font-medium text-white/60 hover:text-white transition-colors">
              Contact
            </button>
          </motion.div>
        </div>

        {/* Right content */}
        <div className="flex-1 relative min-h-[450px] sm:min-h-[500px] md:min-h-0">
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-20 pointer-events-none md:hidden" />
          
          {/* Hero Portrait with dark cinematic blending */}
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
            className="w-full h-full relative z-10 scale-[1.35] sm:scale-125 md:scale-100 origin-center"
          />
        </div>
      </div>
    </div>
  )
}
