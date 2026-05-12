import React, { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

/**
 * GlowingCard — wraps any content with a reactive neon edge-glow effect.
 * Works on both mouse (hover) and touch devices.
 */
export function GlowingCard({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const ref = useRef<HTMLDivElement>(null);

  const update = (x: number, y: number) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = ((x - rect.left) / rect.width) * 100;
    const py = ((y - rect.top) / rect.height) * 100;
    const cx = rect.width / 2, cy = rect.height / 2;
    const dx = (x - rect.left) - cx, dy = (y - rect.top) - cy;
    const kx = cx / (Math.abs(dx) || 1), ky = cy / (Math.abs(dy) || 1);
    const edge = Math.min(Math.max(1 / Math.min(kx, ky), 0), 1);
    let deg = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
    if (deg < 0) deg += 360;
    el.style.setProperty('--px', `${px.toFixed(1)}%`);
    el.style.setProperty('--py', `${py.toFixed(1)}%`);
    el.style.setProperty('--deg', `${deg.toFixed(1)}deg`);
    el.style.setProperty('--edge', `${(edge * 100).toFixed(1)}`);
  };

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => update(e.clientX, e.clientY);
    const onTouch = (e: TouchEvent) => { if (e.touches[0]) update(e.touches[0].clientX, e.touches[0].clientY); };
    const onLeave = () => { el.style.setProperty('--edge', '0'); };
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    el.addEventListener('touchmove', onTouch, { passive: true });
    return () => { el.removeEventListener('mousemove', onMove); el.removeEventListener('mouseleave', onLeave); el.removeEventListener('touchmove', onTouch); };
  }, []);

  return (
    <div
      ref={ref}
      className={cn('relative group rounded-2xl', className)}
      style={{ '--px': '50%', '--py': '50%', '--deg': '45deg', '--edge': '0' } as React.CSSProperties}
      {...props}
    >
      {/* Glow border layer */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[inherit] z-0 transition-opacity duration-300"
        style={{
          opacity: 'calc(var(--edge) / 100)',
          background: `radial-gradient(circle at var(--px) var(--py), rgba(139,92,246,0.5) 0%, rgba(59,130,246,0.3) 40%, transparent 70%)`,
          boxShadow: 'inset 0 0 0 1px rgba(139,92,246,0.4)',
        }}
      />
      {/* Outer glow */}
      <div
        className="pointer-events-none absolute -inset-px rounded-[inherit] z-0 transition-opacity duration-300"
        style={{
          opacity: 'calc(var(--edge) / 130)',
          background: `conic-gradient(from var(--deg) at var(--px) var(--py), transparent 20%, rgba(139,92,246,0.6) 40%, rgba(59,130,246,0.6) 60%, transparent 80%)`,
        }}
      />
      {/* Content */}
      <div className="relative z-10 h-full w-full rounded-[inherit]">
        {children}
      </div>
    </div>
  );
}
