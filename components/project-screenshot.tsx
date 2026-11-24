"use client";

import Image from "next/image";

export function ProjectScreenshot({
  src,
  alt,
  available,
  placeholder,
  className,
}: {
  src: string;
  alt: string;
  available: boolean;
  placeholder: string;
  className: string;
}) {
  return (
    <div
      className={`group relative overflow-hidden bg-gradient-to-br from-accent-cyan/[0.08] via-background to-accent-violet/[0.12] ${className}`}
    >
      {available ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 600px"
          className="object-cover motion-safe:transition-transform motion-safe:duration-700 motion-safe:group-hover:scale-[1.03]"
        />
      ) : (
        <div
          role="img"
          aria-label={`${alt}: ${placeholder}`}
          className="absolute inset-0 flex items-center justify-center px-6 text-center"
        >
          <div
            aria-hidden="true"
            className="absolute h-40 w-40 rounded-full bg-accent-violet/15 blur-3xl"
          />
          <p className="relative max-w-xs font-mono text-xs leading-6 text-foreground/45">
            {placeholder}
          </p>
        </div>
      )}
      {available && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/35 via-transparent to-transparent"
        />
      )}
    </div>
  );
}
