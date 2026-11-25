import Image from "next/image";
import Link from "next/link";
import { existsSync } from "node:fs";
import { join } from "node:path";
import {
  ArrowDown,
  ArrowUpRight,
  BrainCircuit,
  Download,
  Mail,
  MapPin,
  Phone,
  Trophy,
} from "lucide-react";
import {
  CountUp,
  FloatingBadge,
  Reveal,
  TechMarquee,
  TypingText,
} from "@/components/motion-primitives";
import { HackathonGrid } from "@/components/hackathon-grid";
import { ProjectScreenshot } from "@/components/project-screenshot";
import { portfolio } from "@/data/portfolio";

export default function Home() {
  const { personal, site } = portfolio;
  const { home } = site;
  const [cgpaStat, internshipStat] = home.stats;
  const featuredProjects = portfolio.projects.map((project) => ({
    ...project,
    screenshotAvailable: existsSync(
      join(process.cwd(), "public", project.screenshot.slice(1)),
    ),
  }));
  const stats = [
    {
      value: portfolio.hackathons.filter((event) =>
        /prize|finalist/i.test(event.award),
      ).length,
      decimals: 0,
      label: "Hackathon Podium Wins",
      description: "State & National Competitions",
      suffix: "+",
    },
    {
      value: portfolio.projects.length,
      decimals: 0,
      label: "Projects",
      description: "Full-Stack, AI & Mobile Apps",
      suffix: "+",
    },
    {
      ...cgpaStat,
      description: "B.Tech AI & DS",
    },
    {
      ...internshipStat,
      description: "Data Analytics Experience",
    },
    {
      value: portfolio.certificates.length,
      decimals: 0,
      label: "Certifications",
      description: "Internship, Courses & Competitions",
      suffix: "+",
    },
  ];

  return (
    <main className="flex-1">
      <section
        id="home"
        className="relative flex min-h-[calc(100svh-4rem)] scroll-mt-20 items-center overflow-hidden px-5 py-16 sm:px-8 lg:py-20"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-[62%] top-1/2 -z-10 h-[34rem] w-[34rem] -translate-y-1/2 rounded-full bg-accent-violet/10 blur-[120px]"
        />
        <div className="mx-auto grid w-full max-w-7xl items-center gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <Reveal className="relative z-10">
            <p className="font-mono text-sm text-accent-violet">
              {personal.location}
            </p>
            <h1
              aria-label={home.greeting}
              className="mt-5 min-h-[2.1em] max-w-3xl text-4xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-6xl xl:text-7xl"
            >
              <TypingText text={home.greeting} />
            </h1>
            <p className="mt-5 text-lg font-medium text-accent-cyan sm:text-xl">
              {personal.title}
            </p>
            <p className="mt-5 max-w-2xl text-base leading-8 text-foreground/65">
              {home.intro}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 rounded-full bg-accent-cyan px-5 py-3 text-sm font-semibold text-background transition-colors hover:bg-cyan-200"
              >
                {home.actions.exploreProjects}
                <ArrowDown aria-hidden="true" size={16} />
              </Link>
              <a
                href={site.resumeHref}
                download
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm text-foreground/80 transition-colors hover:border-accent-violet/60 hover:text-accent-violet"
              >
                <Download aria-hidden="true" size={16} />
                {home.actions.downloadCv}
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full px-4 py-3 text-sm text-foreground/70 transition-colors hover:text-accent-cyan"
              >
                {home.actions.contactMe}
                <ArrowUpRight aria-hidden="true" size={15} />
              </a>
            </div>
          </Reveal>

          <Reveal className="relative mx-auto w-full max-w-[27rem]" delay={0.15}>
            <div
              aria-hidden="true"
              className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-accent-cyan/35 via-accent-violet/20 to-transparent opacity-70 blur-2xl"
            />
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/15 bg-white/[0.04] shadow-[0_0_70px_rgba(34,211,238,0.12)]">
              <Image
                src={home.profileImage}
                alt={home.profileImageAlt}
                fill
                priority
                sizes="(max-width: 1024px) 80vw, 430px"
                className="object-cover object-top"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent"
              />
            </div>
            <FloatingBadge className="absolute -left-5 bottom-16 sm:-left-10">
              <div className="flex items-center gap-3 rounded-2xl border border-white/15 bg-background/85 px-4 py-3 shadow-xl backdrop-blur-xl">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent-violet/15 text-accent-violet">
                  <Trophy aria-hidden="true" size={18} />
                </span>
                <span className="text-sm font-medium text-foreground">
                  {home.badges[0]}
                </span>
              </div>
            </FloatingBadge>
            <FloatingBadge
              className="absolute -right-3 top-14 sm:-right-8"
              delay={0.7}
            >
              <div className="flex items-center gap-3 rounded-2xl border border-white/15 bg-background/85 px-4 py-3 shadow-xl backdrop-blur-xl">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent-cyan/15 text-accent-cyan">
                  <BrainCircuit aria-hidden="true" size={18} />
                </span>
                <span className="text-sm font-medium text-foreground">
                  {home.badges[1]}
                </span>
              </div>
            </FloatingBadge>
          </Reveal>
        </div>
      </section>

      <section
        aria-label={home.statsHeading}
        className="border-y border-white/5 bg-white/[0.02] px-5 py-8 sm:px-8"
      >
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 sm:gap-4 lg:grid-cols-5">
          {stats.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 0.08}>
              <div className="text-center">
                <p className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                  <CountUp
                    value={stat.value}
                    decimals={stat.decimals}
                    suffix={"suffix" in stat ? stat.suffix : undefined}
                  />
                </p>
                <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.14em] text-foreground/50 sm:text-xs">
                  {stat.label}
                </p>
                <p className="mt-1 text-xs leading-5 text-foreground/45">
                  {stat.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <TechMarquee items={home.techMarquee} label={home.techMarqueeLabel} />

      <section
        id="about"
        className="scroll-mt-20 border-t border-white/5 px-5 py-24 sm:px-8"
      >
        <div className="mx-auto max-w-5xl">
          <SectionHeading title={site.sections.about} />
          <p className="mt-7 max-w-3xl text-base leading-8 text-foreground/70">
            {portfolio.bio}
          </p>

          <div className="mt-14 grid gap-10 md:grid-cols-2">
            <div>
              <h3 className="text-sm font-semibold text-accent-cyan">
                {site.labels.education}
              </h3>
              <div className="mt-5 space-y-4">
                {portfolio.education.map((item) => (
                  <article
                    key={item.qualification}
                    className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h4 className="font-medium text-foreground">
                        {item.qualification}
                      </h4>
                      {item.period && (
                        <span className="font-mono text-xs text-foreground/45">
                          {item.period}
                        </span>
                      )}
                    </div>
                    <p className="mt-2 text-sm text-foreground/60">
                      {item.institution}
                    </p>
                    <p className="mt-2 text-sm text-accent-violet">
                      {item.result}
                    </p>
                  </article>
                ))}
              </div>
            </div>

            <div className="space-y-10">
              <div>
                <h3 className="text-sm font-semibold text-accent-cyan">
                  {site.labels.internship}
                </h3>
                <article className="mt-5 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                  <h4 className="font-medium text-foreground">
                    {portfolio.internship.role}
                  </h4>
                  <p className="mt-2 text-sm text-foreground/60">
                    {portfolio.internship.organization}
                  </p>
                  <p className="mt-2 font-mono text-xs text-foreground/45">
                    {portfolio.internship.period}
                  </p>
                </article>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-accent-cyan">
                  {site.labels.positions}
                </h3>
                <div className="mt-5 space-y-3">
                  {portfolio.positions.map((position) => (
                    <article
                      key={position.organization}
                      className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
                    >
                      <h4 className="font-medium text-foreground">
                        {position.role}
                      </h4>
                      <p className="mt-2 text-sm text-foreground/60">
                        {position.organization}
                      </p>
                      <p className="mt-2 font-mono text-xs text-foreground/45">
                        {position.period}
                      </p>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="projects"
        className="scroll-mt-20 border-t border-white/5 px-5 py-24 sm:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <SectionHeading title={home.featuredProjectsTitle} />
            <p className="mt-4 max-w-2xl text-sm leading-7 text-foreground/60">
              {home.featuredProjectsIntro}
            </p>
          </Reveal>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {featuredProjects.map((project, index) => (
              <Reveal
                key={project.name}
                delay={index * 0.1}
                initialVisible
              >
                <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] transition-colors hover:border-accent-cyan/40">
                  <div className="relative">
                    <ProjectScreenshot
                      src={project.screenshot}
                      alt={`${project.name} screenshot`}
                      available={project.screenshotAvailable}
                      placeholder={site.projects.labels.screenshotUnavailable}
                      className="aspect-video border-b border-white/5"
                    />
                    <span className="absolute right-5 top-5 font-mono text-xs text-foreground/80">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <p className="font-mono text-xs text-accent-violet">
                      {project.name}
                    </p>
                    <h3 className="mt-3 text-xl font-semibold text-foreground">
                      {project.title}
                    </h3>
                    <p className="mt-4 flex-1 text-sm leading-7 text-foreground/65">
                      {project.description}
                    </p>
                    <ul className="mt-6 flex flex-wrap gap-2">
                      {project.stack.slice(0, 4).map((item) => (
                        <li
                          key={item}
                          className="rounded-full border border-white/10 px-3 py-1 font-mono text-[11px] text-foreground/60"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
                      <Link
                        className="inline-flex w-fit items-center gap-2 text-sm text-accent-cyan transition-colors hover:text-accent-violet"
                        href={`/projects/${project.slug}`}
                      >
                        {site.projects.labels.viewCaseStudy}
                        <ArrowUpRight aria-hidden="true" size={15} />
                      </Link>
                      {project.githubUrl && (
                        <a
                          className="inline-flex w-fit items-center gap-2 text-sm text-foreground/60 transition-colors hover:text-accent-cyan"
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {site.labels.github}
                          <ArrowUpRight aria-hidden="true" size={15} />
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 pb-24 sm:px-8">
        <Reveal>
          <div className="relative mx-auto flex max-w-7xl flex-col items-start justify-between gap-7 overflow-hidden rounded-[2rem] border border-accent-violet/20 bg-gradient-to-r from-accent-violet/[0.12] via-white/[0.03] to-accent-cyan/[0.1] p-8 sm:flex-row sm:items-center sm:p-12">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-16 -top-32 h-72 w-72 rounded-full bg-accent-cyan/10 blur-[90px]"
            />
            <div className="relative">
              <h2 className="max-w-3xl text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                {home.ctaHeading}
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-foreground/65">
                {home.ctaDescription}
              </p>
            </div>
            <a
              href="#contact"
              className="relative inline-flex shrink-0 items-center gap-2 rounded-full bg-accent-cyan px-5 py-3 text-sm font-semibold text-background transition-colors hover:bg-cyan-200"
            >
              {home.ctaButton}
              <ArrowUpRight aria-hidden="true" size={16} />
            </a>
          </div>
        </Reveal>
      </section>

      <section
        id="hackathons"
        className="scroll-mt-20 border-t border-white/5 px-5 py-24 sm:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <SectionHeading title={site.sections.hackathons} />
          <HackathonGrid events={portfolio.hackathons} />
        </div>
      </section>

      <section
        id="skills"
        className="scroll-mt-20 border-t border-white/5 px-5 py-24 sm:px-8"
      >
        <div className="mx-auto max-w-5xl">
          <SectionHeading title={site.sections.skills} />
          <h3 className="mt-10 text-sm font-semibold text-accent-cyan">
            {site.labels.technicalSkills}
          </h3>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {portfolio.skills.technical.map((group) => (
              <article
                key={group.category}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
              >
                <h4 className="font-medium text-foreground">
                  {group.category}
                </h4>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <li
                      key={skill}
                      className="rounded-full bg-white/[0.06] px-3 py-1.5 text-xs text-foreground/65"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <h3 className="mt-10 text-sm font-semibold text-accent-cyan">
            {site.labels.softSkills}
          </h3>
          <ul className="mt-4 flex flex-wrap gap-2">
            {portfolio.skills.soft.map((skill) => (
              <li
                key={skill}
                className="rounded-full border border-accent-violet/30 px-4 py-2 text-sm text-foreground/75"
              >
                {skill}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        id="certifications"
        className="scroll-mt-20 border-t border-white/5 px-5 py-24 sm:px-8"
      >
        <div className="mx-auto max-w-5xl">
          <SectionHeading title={site.sections.certifications} />
          <p className="mt-5 max-w-2xl text-sm leading-7 text-foreground/60">
            Browse course completions, competition awards, and internship
            certificates.
          </p>
          <Link
            href="/certifications"
            className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-accent-cyan transition-colors hover:text-accent-violet"
          >
            View all {portfolio.certificates.length} certificates
            <ArrowUpRight aria-hidden="true" size={15} />
          </Link>
        </div>
      </section>

      <section
        id="resume"
        className="scroll-mt-20 border-t border-white/5 px-5 py-24 sm:px-8"
      >
        <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-8 rounded-3xl border border-accent-cyan/20 bg-accent-cyan/[0.04] p-8 sm:flex-row sm:items-center sm:p-10">
          <div>
            <SectionHeading title={site.sections.resume} />
            <p className="mt-4 max-w-xl text-sm leading-7 text-foreground/65">
              {site.labels.resumeDescription}
            </p>
          </div>
          <a
            href={site.resumeHref}
            download
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-accent-cyan px-5 py-3 text-sm font-semibold text-background transition-colors hover:bg-cyan-200"
          >
            <Download aria-hidden="true" size={16} />
            {site.resumeLabel}
          </a>
        </div>
      </section>

      <section
        id="contact"
        className="scroll-mt-20 border-t border-white/5 px-5 py-24 sm:px-8"
      >
        <div className="mx-auto max-w-5xl">
          <SectionHeading title={site.sections.contact} />
          <p className="mt-5 max-w-xl text-sm leading-7 text-foreground/60">
            {site.labels.contactDescription}
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
            <a
              className="inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-sm text-foreground/75 transition-colors hover:border-accent-cyan/40"
              href={`mailto:${personal.email}`}
            >
              <Mail aria-hidden="true" className="text-accent-cyan" size={17} />
              {personal.email}
            </a>
            <a
              className="inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-sm text-foreground/75 transition-colors hover:border-accent-cyan/40"
              href={`tel:${personal.phone.replaceAll(" ", "")}`}
            >
              <Phone
                aria-hidden="true"
                className="text-accent-cyan"
                size={17}
              />
              {personal.phone}
            </a>
            <div className="inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-sm text-foreground/75">
              <MapPin
                aria-hidden="true"
                className="text-accent-cyan"
                size={17}
              />
              {personal.location}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function SectionHeading({ title }: { title: string }) {
  return (
    <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
      {title}
    </h2>
  );
}
