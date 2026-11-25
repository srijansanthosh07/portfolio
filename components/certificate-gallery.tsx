"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Download, ExternalLink, X } from "lucide-react";
import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/components/use-prefers-reduced-motion";
import type {
  CertificateCategory,
  PortfolioCertificate,
} from "@/data/portfolio";

const filters: ("All" | CertificateCategory)[] = [
  "All",
  "Internship",
  "Course",
  "Competition",
];

export function CertificateGallery({
  certificates,
}: {
  certificates: PortfolioCertificate[];
}) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [activeFilter, setActiveFilter] =
    useState<(typeof filters)[number]>("All");
  const [activeCertificate, setActiveCertificate] =
    useState<PortfolioCertificate | null>(null);
  const visibleCertificates =
    activeFilter === "All"
      ? certificates
      : certificates.filter(
          (certificate) => certificate.category === activeFilter,
        );

  useEffect(() => {
    if (!activeCertificate) {
      return;
    }

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActiveCertificate(null);
      }
    }

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [activeCertificate]);

  return (
    <>
      <div
        aria-label="Filter certificates"
        className="mt-9 flex flex-wrap gap-2"
        role="group"
      >
        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            aria-pressed={activeFilter === filter}
            onClick={() => setActiveFilter(filter)}
            className={`rounded-full border px-4 py-2 text-sm transition-colors ${
              activeFilter === filter
                ? "border-accent-cyan/50 bg-accent-cyan/10 text-accent-cyan"
                : "border-white/10 text-foreground/60 hover:border-white/25 hover:text-foreground"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <motion.div
        className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
        layout={!prefersReducedMotion}
      >
        <AnimatePresence mode="popLayout">
          {visibleCertificates.map((certificate, index) => (
            <motion.article
              key={certificate.file}
              className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] transition-colors hover:border-accent-cyan/30"
              layout
              initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? undefined : { opacity: 0, y: -8 }}
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : { duration: 0.2, delay: index * 0.025 }
              }
            >
              <button
                type="button"
                aria-label={`Preview ${certificate.name}`}
                onClick={() => setActiveCertificate(certificate)}
                className="relative block aspect-[4/3] w-full overflow-hidden bg-black/30 p-3 text-left"
              >
                <CertificatePreview
                  certificate={certificate}
                  thumbnail
                />
                <span className="absolute bottom-3 right-3 rounded-full border border-white/15 bg-background/85 px-3 py-1 font-mono text-[10px] text-accent-cyan backdrop-blur">
                  Preview
                </span>
              </button>

              <div className="flex flex-1 flex-col p-5">
                <span className="w-fit rounded-full border border-accent-violet/25 bg-accent-violet/5 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide text-accent-violet">
                  {certificate.category}
                </span>
                <h2 className="mt-4 text-lg font-semibold leading-snug text-foreground">
                  {certificate.name}
                </h2>
                <p className="mt-2 text-sm text-foreground/60">
                  {certificate.issuer}
                </p>
                <p className="mt-2 font-mono text-xs text-foreground/45">
                  {certificate.date}
                </p>
                <div className="mt-5 flex items-center gap-4 border-t border-white/10 pt-4">
                  <a
                    href={certificate.file}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-cyan transition-colors hover:text-accent-violet"
                  >
                    <ExternalLink aria-hidden="true" size={14} />
                    View
                  </a>
                  <a
                    href={certificate.file}
                    download
                    className="inline-flex items-center gap-1.5 text-sm text-foreground/60 transition-colors hover:text-foreground"
                  >
                    <Download aria-hidden="true" size={14} />
                    Download
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {activeCertificate && (
          <motion.div
            className="fixed inset-0 z-[70] flex items-center justify-center bg-background/85 p-4 backdrop-blur-md sm:p-8"
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0 }}
            onClick={(event) => {
              if (event.target === event.currentTarget) {
                setActiveCertificate(null);
              }
            }}
          >
            <motion.section
              role="dialog"
              aria-modal="true"
              aria-labelledby="certificate-modal-title"
              className="flex max-h-[90svh] w-full max-w-5xl flex-col overflow-hidden rounded-3xl border border-white/15 bg-[#101018] shadow-[0_0_70px_rgba(34,211,238,0.12)]"
              initial={
                prefersReducedMotion
                  ? false
                  : { opacity: 0, y: 16, scale: 0.98 }
              }
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={
                prefersReducedMotion
                  ? undefined
                  : { opacity: 0, y: 12, scale: 0.98 }
              }
              transition={prefersReducedMotion ? { duration: 0 } : undefined}
            >
              <header className="flex items-start justify-between gap-5 border-b border-white/10 p-5 sm:px-7">
                <div>
                  <h2
                    id="certificate-modal-title"
                    className="text-lg font-semibold text-foreground"
                  >
                    {activeCertificate.name}
                  </h2>
                  <p className="mt-1 text-sm text-foreground/55">
                    {activeCertificate.issuer} · {activeCertificate.date}
                  </p>
                </div>
                <button
                  type="button"
                  aria-label="Close preview"
                  onClick={() => setActiveCertificate(null)}
                  className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 text-foreground/70 transition-colors hover:border-accent-cyan/40 hover:text-accent-cyan"
                >
                  <X aria-hidden="true" size={18} />
                </button>
              </header>
              <div className="min-h-0 flex-1 overflow-auto bg-black/30 p-3 sm:p-6">
                <CertificatePreview certificate={activeCertificate} />
              </div>
              <footer className="flex flex-wrap items-center gap-4 border-t border-white/10 p-5 sm:px-7">
                <a
                  href={activeCertificate.file}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-accent-cyan px-4 py-2.5 text-sm font-semibold text-background transition-colors hover:bg-cyan-200"
                >
                  <ExternalLink aria-hidden="true" size={15} />
                  View certificate
                </a>
                <a
                  href={activeCertificate.file}
                  download
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2.5 text-sm text-foreground/75 transition-colors hover:border-accent-violet/50 hover:text-accent-violet"
                >
                  <Download aria-hidden="true" size={15} />
                  Download
                </a>
              </footer>
            </motion.section>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function CertificatePreview({
  certificate,
  thumbnail = false,
}: {
  certificate: PortfolioCertificate;
  thumbnail?: boolean;
}) {
  if (certificate.format === "pdf") {
    return (
      <iframe
        title={`${certificate.name} PDF preview`}
        src={`${certificate.file}#toolbar=0&navpanes=0`}
        className={
          thumbnail
            ? "pointer-events-none h-full w-full border-0"
            : "h-[65svh] min-h-80 w-full border-0"
        }
      />
    );
  }

  if (thumbnail) {
    return (
      <Image
        src={certificate.file}
        alt={certificate.name}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
        className="object-contain p-2 transition-transform duration-300 group-hover:scale-[1.03]"
      />
    );
  }

  return (
    <Image
      src={certificate.file}
      alt={certificate.name}
      width={1600}
      height={1200}
      sizes="(max-width: 768px) 100vw, 900px"
      className="mx-auto max-h-[65svh] w-auto max-w-full object-contain"
    />
  );
}
