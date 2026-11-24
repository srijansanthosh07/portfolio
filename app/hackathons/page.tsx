import { CalendarDays, Trophy } from "lucide-react";
import { Reveal } from "@/components/motion-primitives";
import { portfolio } from "@/data/portfolio";
import { createPageMetadata } from "@/lib/metadata";

const pageContent = portfolio.site.hackathonsPage;

export const metadata = createPageMetadata({
  title: portfolio.site.sections.hackathons,
  description: pageContent.intro,
  path: "/hackathons",
});

export default function HackathonsPage() {
  const { hackathons, personal, site } = portfolio;

  return (
    <main className="flex-1">
      <section className="relative overflow-hidden px-5 pb-14 pt-20 sm:px-8 sm:pt-28">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 top-8 -z-10 h-96 w-96 rounded-full bg-accent-violet/10 blur-[120px]"
        />
        <Reveal className="mx-auto max-w-5xl">
          <p className="font-mono text-sm text-accent-violet">
            {personal.title}
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground sm:text-6xl">
            {site.sections.hackathons}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-foreground/65 sm:text-lg">
            {pageContent.intro}
          </p>
          <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-accent-cyan/20 bg-accent-cyan/5 px-4 py-2.5 text-sm text-accent-cyan">
            <Trophy aria-hidden="true" size={17} />
            <span>
              <span className="font-semibold">{hackathons.length}</span>{" "}
              {pageContent.countLabel}
            </span>
          </div>
        </Reveal>
      </section>

      <section className="border-t border-white/5 px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-2 lg:grid-cols-3">
          {hackathons.map((event, index) => (
            <Reveal key={event.event} delay={index * 0.1}>
              <article className="group relative h-full overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent-violet/40 hover:bg-white/[0.05] hover:shadow-[0_0_35px_rgba(168,85,247,0.12)] sm:p-7">
                <div
                  aria-hidden="true"
                  className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-accent-cyan/5 blur-3xl transition-colors group-hover:bg-accent-violet/10"
                />
                <div className="relative flex h-full flex-col">
                  <div className="flex items-start justify-between gap-4">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-accent-cyan/20 bg-accent-cyan/5 text-accent-cyan">
                      <Trophy aria-hidden="true" size={20} />
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 font-mono text-xs text-foreground/60">
                      <CalendarDays
                        aria-hidden="true"
                        className="text-accent-violet"
                        size={14}
                      />
                      {event.date}
                    </span>
                  </div>
                  <p className="mt-7 font-mono text-sm font-medium text-accent-violet">
                    {event.award}
                  </p>
                  <h2 className="mt-2 text-xl font-semibold leading-snug text-foreground">
                    {event.event}
                  </h2>
                  <p className="mt-4 flex-1 text-sm leading-7 text-foreground/60">
                    {event.description}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  );
}
