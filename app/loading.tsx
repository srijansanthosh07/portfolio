import { portfolio } from "@/data/portfolio";

export default function Loading() {
  return (
    <main className="flex-1 px-5 py-20 sm:px-8 sm:py-28">
      <div
        aria-busy="true"
        aria-label={portfolio.site.loadingLabel}
        className="mx-auto max-w-7xl"
        role="status"
      >
        <span className="sr-only">{portfolio.site.loadingLabel}</span>
        <div className="h-4 w-44 animate-pulse rounded-full bg-white/10" />
        <div className="mt-6 h-12 max-w-xl animate-pulse rounded-xl bg-white/[0.07] sm:h-16" />
        <div className="mt-5 h-4 max-w-2xl animate-pulse rounded-full bg-white/[0.06]" />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[0, 1, 2].map((item) => (
            <div
              key={item}
              className="h-56 animate-pulse rounded-3xl border border-white/5 bg-white/[0.03]"
            />
          ))}
        </div>
      </div>
    </main>
  );
}
