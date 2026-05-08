'use client';
import React from 'react';
import { Zap, Cpu, Fingerprint, Pencil, Settings2, Sparkles } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { FeatureCard } from '@/components/ui/grid-feature-cards';

const features = [
	{
		title: 'Modern Web Development',
		icon: Cpu,
		description: 'Building responsive and high-performance websites using modern technologies like React, Node.js, and advanced frontend systems.',
	},
	{
		title: 'Cinematic Motion Design',
		icon: Sparkles,
		description: 'Smooth animations, Framer Motion interactions, cinematic transitions, and immersive visual storytelling experiences.',
	},
	{
		title: '3D Interactive Experience',
		icon: Zap,
		description: 'Modern immersive websites featuring futuristic interactions, liquid-glass interfaces, and cinematic responsiveness.',
	},
	{
		title: 'Linux & System Knowledge',
		icon: Settings2,
		description: 'Exploring Linux systems, development environments, server technologies, and performance optimization workflows.',
	},
	{
		title: 'Creative UI/UX Design',
		icon: Pencil,
		description: 'Designing clean, futuristic, and visually powerful interfaces focused on experience, usability, and aesthetics.',
	},
	{
		title: 'Deployment & Optimization',
		icon: Fingerprint,
		description: 'Deploying fast modern websites with optimized performance, responsiveness, and premium visual presentation.',
	},
];

export default function DemoOne() {
	return (
		<section className="py-24 md:py-32 w-full relative">
			<div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent pointer-events-none" />
			<div className="mx-auto w-full max-w-6xl space-y-16 px-4 relative z-10">
				<AnimatedContainer className="mx-auto max-w-3xl text-center">
					<div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-neutral-300 text-sm font-medium mb-6 backdrop-blur-md">
						<Sparkles className="w-4 h-4 mr-2 text-white" />
						Core Features
					</div>
					<h2 className="text-5xl font-extrabold tracking-tight text-balance md:text-6xl lg:text-8xl text-white leading-none">
						Future <br />
						<span className="text-transparent bg-clip-text bg-gradient-to-l from-[#6366f1] via-[#a855f7] to-[#fcd34d]">Experiences</span>
					</h2>
					<p className="text-neutral-400 mt-8 text-lg md:text-xl tracking-wide text-balance max-w-2xl mx-auto font-light leading-relaxed">
						Creating cinematic websites, futuristic portfolios, immersive UI experiences, and powerful modern digital projects with creativity, motion, and technology.
					</p>
				</AnimatedContainer>

				<AnimatedContainer
					delay={0.2}
					className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
				>
					{features.map((feature, i) => (
						<FeatureCard key={i} feature={feature} />
					))}
				</AnimatedContainer>

				<AnimatedContainer delay={0.4} className="pt-32 pb-16 text-center border-t border-white/5">
					<h3 className="text-white font-display text-4xl md:text-5xl font-bold mb-8 italic">
						What This Website Represents
					</h3>
					<p className="text-neutral-400 text-lg md:text-xl max-w-3xl mx-auto font-light leading-relaxed mb-24">
						This portfolio represents creativity, technology, cinematic motion, futuristic design, and immersive digital storytelling. Every section is designed to feel modern, smooth, interactive, and visually unforgettable.
					</p>

          <div className="w-full overflow-hidden relative py-12">
            <div className="flex gap-12 animate-marquee whitespace-nowrap">
              {['React', 'Node.js', 'Python', 'Linux', 'Framer', 'JavaScript'].map((tech) => (
                <div key={tech} className="text-5xl md:text-7xl font-display font-black text-white/10 hover:text-white/40 transition-colors cursor-default select-none uppercase tracking-tighter">
                  {tech}
                </div>
              ))}
              {/* Duplicate for infinite loop */}
              {['React', 'Node.js', 'Python', 'Linux', 'Framer', 'JavaScript'].map((tech) => (
                <div key={`${tech}-2`} className="text-5xl md:text-7xl font-display font-black text-white/10 hover:text-white/40 transition-colors cursor-default select-none uppercase tracking-tighter">
                  {tech}
                </div>
              ))}
            </div>
          </div>
				</AnimatedContainer>
			</div>
		</section>
	);
}

type ViewAnimationProps = {
	delay?: number;
	className?: React.ComponentProps<typeof motion.div>['className'];
	children: React.ReactNode;
};

function AnimatedContainer({ className, delay = 0.1, children }: ViewAnimationProps) {
	const shouldReduceMotion = useReducedMotion();

	if (shouldReduceMotion) {
		return <div className={className}>{children}</div>;
	}

	return (
		<motion.div
			initial={{ filter: 'blur(10px)', y: 20, opacity: 0 }}
			whileInView={{ filter: 'blur(0px)', y: 0, opacity: 1 }}
			viewport={{ once: true, margin: "-100px" }}
			transition={{ delay, duration: 0.8, ease: "easeOut" }}
			className={className}
		>
			{children}
		</motion.div>
	);
}
