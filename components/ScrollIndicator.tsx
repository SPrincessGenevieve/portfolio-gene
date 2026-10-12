"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, Mouse } from "lucide-react";

interface ScrollIndicatorProps {
  target: number;
  label?: string;
  className?: string;
}

export default function ScrollIndicator({
  target,
  label = "Explore more",
  className = "",
}: ScrollIndicatorProps) {
  const reduceMotion = useReducedMotion();

  const handleScroll = () => {
    window.scrollTo({
      top: window.innerHeight * target,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  };

  return (
    <div
      className={`flex h-40 w-full items-center justify-center ${className}`}
    >
      <motion.button
        type="button"
        onClick={handleScroll}
        aria-label="Scroll to the next section"
        initial={reduceMotion ? false : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: reduceMotion ? 0 : 0.8 }}
        className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2 text-slate-400 transition-colors duration-300 hover:text-white sm:bottom-7"
      >
        <span className="hidden text-[10px] uppercase tracking-[0.25em] sm:block">
          {label}
        </span>

        <span className="relative flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] transition-all duration-300 hover:border-blue-300/40 hover:bg-[#0C1D74]/40">
          <Mouse size={19} strokeWidth={1.5} />
          <ArrowDown
            size={12}
            className="absolute translate-y-5 animate-bounce"
          />
        </span>
      </motion.button>
    </div>
  );
}
