import { Trophy } from "lucide-react";
import { Reveal } from "@/components/motion-primitives";
import { HackathonGrid } from "@/components/hackathon-grid";
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
        <div className="mx-auto max-w-7xl">
          <HackathonGrid events={hackathons} />
        </div>
      </section>
    </main>
  );
}
