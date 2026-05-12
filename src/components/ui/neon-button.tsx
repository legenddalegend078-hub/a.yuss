import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface NeonButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  hoverText?: string;
  variant?: 'primary' | 'ghost' | 'outline';
}

/**
 * NeonButton — on hover, types out hoverText letter by letter with a blinking cursor.
 * Neon purple glow effect on hover.
 */
export function NeonButton({ label, hoverText, variant = 'primary', className, onClick, ...props }: NeonButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [displayed, setDisplayed] = useState('');
  const [showCursor, setShowCursor] = useState(false);
  const intervalRef = useRef<number | null>(null);
  const cursorRef = useRef<number | null>(null);
  const target = hoverText || label;

  useEffect(() => {
    if (isHovered) {
      setDisplayed('');
      setShowCursor(true);
      let i = 0;
      intervalRef.current = window.setInterval(() => {
        i++;
        setDisplayed(target.slice(0, i));
        if (i >= target.length) { clearInterval(intervalRef.current!); }
      }, 50);
      cursorRef.current = window.setInterval(() => setShowCursor(c => !c), 500);
    } else {
      clearInterval(intervalRef.current!);
      clearInterval(cursorRef.current!);
      setDisplayed('');
      setShowCursor(false);
    }
    return () => { clearInterval(intervalRef.current!); clearInterval(cursorRef.current!); };
  }, [isHovered, target]);

  const base = 'relative inline-flex items-center justify-center gap-2 font-semibold text-sm tracking-wide rounded-full transition-all duration-300 overflow-hidden select-none';

  const variants = {
    primary: 'px-8 py-3.5 bg-white text-black hover:bg-transparent hover:text-white hover:shadow-[0_0_20px_rgba(139,92,246,0.8),0_0_40px_rgba(139,92,246,0.4)] hover:border-purple-500 border border-transparent',
    ghost: 'px-8 py-3.5 text-white/60 hover:text-white hover:shadow-[0_0_15px_rgba(139,92,246,0.6)] border border-white/10 hover:border-purple-500/60',
    outline: 'px-8 py-3.5 text-white rounded-full border border-white/10 hover:bg-white/5 hover:shadow-[0_0_15px_rgba(139,92,246,0.4)] hover:border-purple-400/50',
  };

  return (
    <button
      className={cn(base, variants[variant], className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setIsHovered(false)}
      onClick={onClick}
      {...props}
    >
      {/* Neon glow overlay */}
      {isHovered && (
        <span className="absolute inset-0 rounded-[inherit] bg-gradient-to-r from-purple-600/20 to-blue-600/20 pointer-events-none" />
      )}
      <span className="relative z-10 min-w-[60px] text-center">
        {isHovered ? (
          <>
            <span className="text-purple-300">{displayed}</span>
            <span className={`inline-block w-0.5 h-4 bg-purple-400 ml-0.5 align-middle transition-opacity ${showCursor ? 'opacity-100' : 'opacity-0'}`} />
          </>
        ) : label}
      </span>
    </button>
  );
}
