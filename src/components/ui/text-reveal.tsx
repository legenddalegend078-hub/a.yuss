'use client';
import { FC, ReactNode, useRef } from 'react';
import { motion, useScroll, useSpring, useTransform, useMotionTemplate } from 'framer-motion';

export type AnimationMode = 'dimming' | 'color-shift' | 'blur-fade' | 'wave-3d' | 'slide-mask' | 'scale-in';

interface TextRevealProps {
  text: string;
  className?: string;
  mode?: AnimationMode;
  baseColor?: string;
  highlightColor?: string;
  dimOpacity?: number;
  scrollStart?: string;
  scrollEnd?: string;
  overlap?: number;
}

export const TextReveal: FC<TextRevealProps> = ({
  text,
  className = '',
  mode = 'dimming',
  baseColor = 'inherit',
  highlightColor = 'white',
  dimOpacity = 0.15,
  scrollStart = '85%',
  scrollEnd = '40%',
  overlap = 1.5,
}) => {
  const targetRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: [`start ${scrollStart}`, `end ${scrollEnd}`],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    mass: 0.4,
  });

  const words = text.split(' ');
  const totalTokens = words.length;

  return (
    <div
      ref={targetRef}
      className={`relative z-0 flex flex-wrap gap-[0.28em] ${className}`}
      style={{ perspective: '800px' }}
    >
      {words.map((word, i) => {
        const stepSize = 1 / totalTokens;
        const start = i * stepSize;
        const end = Math.min(start + stepSize * overlap, 1);

        return (
          <Token
            key={i}
            progress={smoothProgress}
            range={[start, end]}
            mode={mode}
            dimOpacity={dimOpacity}
            baseColor={baseColor}
            highlightColor={highlightColor}
          >
            {word}
          </Token>
        );
      })}
    </div>
  );
};

interface TokenProps {
  children: ReactNode;
  progress: any;
  range: [number, number];
  mode: AnimationMode;
  dimOpacity: number;
  baseColor: string;
  highlightColor: string;
}

const Token: FC<TokenProps> = ({
  children,
  progress,
  range,
  mode,
  dimOpacity,
  baseColor,
  highlightColor,
}) => {
  const opacity = useTransform(progress, range, [dimOpacity, 1]);
  const y = useTransform(progress, range, [40, 0]);
  const scale = useTransform(progress, range, [0.5, 1]);
  const rotateY = useTransform(progress, [range[0] - 0.05, range[1]], [65, 0]);
  const blurAmount = useTransform(progress, range, [14, 0]);
  const filter = useMotionTemplate`blur(${blurAmount}px)`;
  const color = useTransform(progress, range, [baseColor, highlightColor]);

  const needsClip = mode === 'slide-mask';

  const animatedStyle: any = {
    display: 'inline-block',
    willChange: 'opacity, transform, filter',
    transformStyle: 'preserve-3d',
    opacity: mode === 'dimming' || mode === 'color-shift' || mode === 'blur-fade' || mode === 'slide-mask' ? opacity : 1,
    y: mode === 'wave-3d' || mode === 'slide-mask' ? y : 0,
    rotateY: mode === 'wave-3d' ? rotateY : 0,
    filter: mode === 'blur-fade' ? filter : 'none',
    scale: mode === 'scale-in' ? scale : 1,
    color: mode === 'color-shift' ? color : 'inherit',
  };

  if (mode === 'slide-mask') {
    return (
      <span style={{ display: 'inline-block', overflow: 'hidden' }}>
        <motion.span style={animatedStyle}>{children}</motion.span>
      </span>
    );
  }

  return (
    <motion.span style={animatedStyle}>
      {children}
    </motion.span>
  );
};
