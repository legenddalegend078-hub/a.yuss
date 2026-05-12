import { useEffect, useRef } from "react";
import { useInView } from "framer-motion";
import { cn } from "@/lib/utils";

export function CountUp({
  to,
  from = 0,
  duration = 2,
  className,
  prefix = "",
}: {
  to: number;
  from?: number;
  duration?: number;
  className?: string;
  prefix?: string;
}) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(nodeRef, { once: true, margin: "-50px" });

  useEffect(() => {
    if (inView) {
      let startTimestamp: number | null = null;
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
        const ease = 1 - Math.pow(1 - progress, 4); // easeOutQuart
        const current = Math.floor(ease * (to - from) + from);
        
        if (nodeRef.current) {
          nodeRef.current.textContent = prefix + current.toString();
        }
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    }
  }, [inView, to, from, duration, prefix]);

  return <span ref={nodeRef} className={cn("inline-block", className)}>{prefix}{from}</span>;
}
