import { cn } from '@/lib/utils';
import React from 'react';
import { FlipCard } from '@/components/ui/flip-card';
import { GlowingCard } from '@/components/ui/glowing-card';

type FeatureType = {
	title: string;
	icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
	description: string;
};

type FeatureCardProps = React.ComponentProps<'div'> & {
	feature: FeatureType;
};

export function FeatureCard({ feature, className, ...props }: FeatureCardProps) {
	const FrontContent = (
		<div className="flex flex-col items-center justify-center h-full gap-4">
			<div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5 border border-white/10 group-hover:bg-white/10 transition-all duration-500">
				<feature.icon className="text-white size-8" strokeWidth={1.5} aria-hidden />
			</div>
			<h3 className="text-xl font-semibold text-white tracking-tight">{feature.title}</h3>
		</div>
	);

	const BackContent = (
		<div className="flex flex-col items-center justify-center h-full gap-4 text-center">
			<div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 border border-white/20 mb-2">
				<feature.icon className="text-white size-6" strokeWidth={1.5} aria-hidden />
			</div>
			<h3 className="text-lg font-semibold text-white tracking-tight">{feature.title}</h3>
			<p className="text-neutral-400 text-sm leading-relaxed font-light">{feature.description}</p>
		</div>
	);

	return (
		<GlowingCard className={cn('h-full', className)} {...props}>
			<FlipCard 
				frontBackground="bg-white/[0.02]"
				frontContent={FrontContent}
				backContent={BackContent}
			/>
		</GlowingCard>
	);
}

function GridPattern({
	width,
	height,
	x,
	y,
	squares,
	...props
}: React.ComponentProps<'svg'> & { width: number; height: number; x: string; y: string; squares?: number[][] }) {
	const patternId = React.useId();

	return (
		<svg aria-hidden="true" {...props}>
			<defs>
				<pattern id={patternId} width={width} height={height} patternUnits="userSpaceOnUse" x={x} y={y}>
					<path d={`M.5 ${height}V.5H${width}`} fill="none" />
				</pattern>
			</defs>
			<rect width="100%" height="100%" strokeWidth={0} fill={`url(#${patternId})`} />
			{squares && (
				<svg x={x} y={y} className="overflow-visible">
					{squares.map(([x, y], index) => (
						<rect strokeWidth="0" key={index} width={width + 1} height={height + 1} x={x * width} y={y * height} />
					))}
				</svg>
			)}
		</svg>
	);
}

function genRandomPattern(length?: number): number[][] {
	length = length ?? 5;
	return Array.from({ length }, () => [
		Math.floor(Math.random() * 4) + 7, // random x between 7 and 10
		Math.floor(Math.random() * 6) + 1, // random y between 1 and 6
	]);
}
