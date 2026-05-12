import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

export function AnimatedTitle({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  const container = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.05 },
    },
  };

  const child = {
    hidden: { y: "-120%" },
    visible: {
      y: "0%",
      transition: { duration: 0.6, ease: [0.33, 1, 0.68, 1] },
    },
  };

  return (
    <span ref={ref} className={cn("inline-flex flex-wrap", className)}>
      <motion.span
        variants={container}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="flex flex-wrap"
      >
        {text.split(" ").map((word, wordIdx) => (
          <span key={wordIdx} className="inline-flex overflow-hidden mr-[0.25em] pb-[0.1em]">
            {word.split("").map((char, charIdx) => (
              <motion.span
                key={charIdx}
                variants={child}
                className="inline-block"
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </span>
        ))}
      </motion.span>
    </span>
  );
}
