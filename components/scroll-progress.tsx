"use client";

import { motion, useScroll } from "framer-motion";
import { usePrefersReducedMotion } from "@/components/use-prefers-reduced-motion";

export function ScrollProgress() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll();

  if (prefersReducedMotion) {
    return null;
  }

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[60] h-1 origin-left bg-gradient-to-r from-accent-cyan to-accent-violet"
      style={{ scaleX: scrollYProgress }}
    />
  );
}
