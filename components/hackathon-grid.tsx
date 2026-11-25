"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import type { PortfolioData } from "@/data/portfolio";

type Hackathon = PortfolioData["hackathons"][number];

export function HackathonGrid({ events }: { events: Hackathon[] }) {
  const [activeCertificate, setActiveCertificate] =
    useState<Hackathon | null>(null);

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
      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <article
            key={event.event}
            className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent-violet/40 hover:bg-white/[0.05] hover:shadow-[0_0_35px_rgba(168,85,247,0.12)] sm:p-7"
          >
            <div
              aria-hidden="true"
              className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-accent-cyan/5 blur-3xl transition-colors group-hover:bg-accent-violet/10"
            />
            <div className="relative flex h-full flex-1 flex-col">
              <p className="font-mono text-xs text-accent-violet">
                {event.date}
              </p>
              <p
                className={`mt-5 text-sm font-semibold ${
                  event.award === "Participation"
                    ? "text-foreground/50"
                    : "text-accent-cyan"
                }`}
              >
                {event.award}
              </p>
              <h2 className="mt-2 text-xl font-semibold leading-snug text-foreground">
                {event.event}
              </h2>
              <p className="mt-3 flex-1 text-sm leading-7 text-foreground/60">
                {event.description}
              </p>
              {event.certificateImage && (
                <button
                  type="button"
                  onClick={() => setActiveCertificate(event)}
                  className="mt-5 inline-flex w-fit items-center text-sm font-medium text-accent-cyan transition-colors hover:text-accent-violet"
                >
                  View Certificate
                </button>
              )}
            </div>
          </article>
        ))}
      </div>

      {activeCertificate?.certificateImage && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-background/85 p-4 backdrop-blur-md sm:p-8"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              setActiveCertificate(null);
            }
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="hackathon-certificate-title"
            className="flex max-h-[90svh] w-full max-w-5xl flex-col overflow-hidden rounded-3xl border border-white/15 bg-[#101018] shadow-[0_0_70px_rgba(34,211,238,0.12)]"
          >
            <header className="flex items-start justify-between gap-5 border-b border-white/10 p-5 sm:px-7">
              <h2
                id="hackathon-certificate-title"
                className="text-lg font-semibold text-foreground"
              >
                {activeCertificate.event} Certificate
              </h2>
              <button
                type="button"
                aria-label="Close certificate"
                onClick={() => setActiveCertificate(null)}
                className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 text-foreground/70 transition-colors hover:border-accent-cyan/40 hover:text-accent-cyan"
              >
                <X aria-hidden="true" size={18} />
              </button>
            </header>
            <div className="min-h-0 flex-1 overflow-auto bg-black/30 p-3 sm:p-6">
              <Image
                src={activeCertificate.certificateImage}
                alt={`${activeCertificate.event} participation certificate`}
                width={1600}
                height={1200}
                sizes="(max-width: 768px) 100vw, 900px"
                className="mx-auto max-h-[75svh] w-auto max-w-full object-contain"
              />
            </div>
          </section>
        </div>
      )}
    </>
  );
}
