"use client";

import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { usePrefersReducedMotion } from "@/components/use-prefers-reduced-motion";

export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <motion.div
      className={className}
      data-reveal=""
      initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
      whileInView={
        prefersReducedMotion ? undefined : { opacity: 1, y: 0 }
      }
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.65,
        delay: prefersReducedMotion ? 0 : delay,
        ease: "easeOut",
      }}
    >
      {children}
    </motion.div>
  );
}

export function TypingText({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const [visibleLength, setVisibleLength] = useState(0);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || visibleLength >= text.length) {
      return;
    }

    const timeout = window.setTimeout(
      () => setVisibleLength((length) => length + 1),
      55,
    );

    return () => window.clearTimeout(timeout);
  }, [prefersReducedMotion, text, visibleLength]);

  return (
    <span className={className}>
      <span>{prefersReducedMotion ? text : text.slice(0, visibleLength)}</span>
      {!prefersReducedMotion && (
        <motion.span
          aria-hidden="true"
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.9, repeat: Infinity }}
          className="ml-1 inline-block h-[0.85em] w-[2px] translate-y-[0.08em] bg-accent-cyan"
        />
      )}
    </span>
  );
}

export function CountUp({
  value,
  decimals = 0,
}: {
  value: number;
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const prefersReducedMotion = usePrefersReducedMotion();
  const count = useMotionValue(0);
  const display = useTransform(count, (current) => current.toFixed(decimals));

  useEffect(() => {
    if (!isInView) {
      return;
    }

    if (prefersReducedMotion) {
      count.set(value);
      return;
    }

    const controls = animate(count, value, {
      duration: 1.8,
      ease: "easeOut",
    });

    return () => controls.stop();
  }, [count, isInView, prefersReducedMotion, value]);

  return (
    <span ref={ref}>
      <motion.span>{display}</motion.span>
    </span>
  );
}

export function FloatingBadge({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <motion.div
      className={className}
      animate={prefersReducedMotion ? undefined : { y: [0, -9, 0] }}
      transition={{
        duration: 3.2,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
}

export function TimelineDot({ className }: { className?: string }) {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <motion.span
      aria-hidden="true"
      className={className}
      animate={
        prefersReducedMotion
          ? undefined
          : { scale: [1, 1.18, 1], opacity: [0.8, 1, 0.8] }
      }
      transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

export function TechMarquee({
  items,
  label,
}: {
  items: string[];
  label: string;
}) {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <div
      aria-label={label}
      className={`${
        prefersReducedMotion ? "overflow-x-auto" : "overflow-hidden"
      } border-y border-white/5 bg-white/[0.02] py-5`}
      role="group"
    >
      <motion.div
        className="flex w-max"
        animate={prefersReducedMotion ? undefined : { x: ["0%", "-50%"] }}
        transition={{ duration: 36, repeat: Infinity, ease: "linear" }}
      >
        {[0, ...(prefersReducedMotion ? [] : [1])].map((copy) => (
          <ul
            key={copy}
            aria-hidden={copy === 1}
            className="flex shrink-0 items-center gap-10 pr-10 sm:gap-14 sm:pr-14"
          >
            {items.map((item) => (
              <li
                key={`${copy}-${item}`}
                className="flex items-center gap-3 whitespace-nowrap font-mono text-sm text-foreground/65"
              >
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 rounded-full bg-accent-cyan shadow-[0_0_10px_#22d3ee]"
                />
                {item}
              </li>
            ))}
          </ul>
        ))}
      </motion.div>
    </div>
  );
}
