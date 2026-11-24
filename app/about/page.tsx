import { portfolio } from "@/data/portfolio";
import { Reveal, TimelineDot } from "@/components/motion-primitives";
import { createPageMetadata } from "@/lib/metadata";

const aboutContent = portfolio.site.about;

export const metadata = createPageMetadata({
  title: portfolio.site.sections.about,
  description: portfolio.bio,
  path: "/about",
});

export default function AboutPage() {
  const experience = [
    {
      role: portfolio.internship.role,
      organization: portfolio.internship.organization,
      period: portfolio.internship.period,
      location: portfolio.internship.location,
    },
    ...portfolio.positions.map((position) => ({
      role: position.role,
      organization: position.organization,
      period: position.period,
      location: null,
    })),
  ];

  return (
    <main className="flex-1">
      <section className="px-5 pb-14 pt-20 sm:px-8 sm:pt-28">
        <Reveal className="mx-auto max-w-5xl">
          <p className="font-mono text-sm text-accent-violet">
            {portfolio.personal.title}
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground sm:text-6xl">
            {portfolio.site.sections.about}
          </h1>
          <div className="mt-12 max-w-3xl">
            <h2 className="text-xl font-semibold text-accent-cyan">
              {aboutContent.bioHeading}
            </h2>
            <p className="mt-5 text-base leading-8 text-foreground/70">
              {portfolio.bio}
            </p>
          </div>
        </Reveal>
      </section>

      <section className="border-t border-white/5 px-5 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              {aboutContent.educationHeading}
            </h2>
          </Reveal>
          <div className="relative ml-2 mt-9 border-l border-accent-cyan/20 pl-8">
            {portfolio.education.map((item, index) => (
              <Reveal
                key={item.qualification}
                className="relative pb-7 last:pb-0"
                delay={index * 0.1}
              >
                <TimelineDot className="absolute -left-[2.4rem] top-6 h-3 w-3 rounded-full border border-accent-cyan bg-background shadow-[0_0_14px_rgba(34,211,238,0.9)]" />
                <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-colors hover:border-accent-cyan/30 sm:p-6">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-lg font-semibold text-foreground">
                      {item.qualification}
                    </h3>
                    {item.period && (
                      <span className="font-mono text-xs text-accent-violet">
                        {item.period}
                      </span>
                    )}
                  </div>
                  <p className="mt-2 text-sm text-foreground/60">
                    {item.institution}
                  </p>
                  <p className="mt-3 text-sm font-medium text-accent-cyan">
                    {item.result}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/5 px-5 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              {aboutContent.experienceHeading}
            </h2>
          </Reveal>
          <div className="relative ml-2 mt-9 border-l border-accent-violet/25 pl-8">
            {experience.map((item, index) => (
              <Reveal
                key={`${item.organization}-${item.role}`}
                className="relative pb-7 last:pb-0"
                delay={index * 0.12}
              >
                <TimelineDot className="absolute -left-[2.4rem] top-6 h-3 w-3 rounded-full border border-accent-violet bg-background shadow-[0_0_14px_rgba(168,85,247,0.9)]" />
                <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-colors hover:border-accent-violet/30 sm:p-6">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-lg font-semibold text-foreground">
                      {item.role}
                    </h3>
                    <span className="font-mono text-xs text-accent-violet">
                      {item.period}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-foreground/65">
                    {item.organization}
                  </p>
                  {item.location && (
                    <p className="mt-2 text-sm text-foreground/45">
                      {item.location}
                    </p>
                  )}
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/5 px-5 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              {aboutContent.interestsHeading}
            </h2>
          </Reveal>
          <div className="mt-9 grid gap-4 md:grid-cols-3">
            {aboutContent.interests.map((interest, index) => (
              <Reveal key={interest.title} delay={index * 0.1}>
                <article className="h-full rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-accent-cyan/30">
                  <h3 className="text-lg font-semibold text-accent-cyan">
                    {interest.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-foreground/65">
                    {interest.description}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
