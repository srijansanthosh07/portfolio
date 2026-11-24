import { existsSync } from "node:fs";
import { join } from "node:path";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ProjectScreenshot } from "@/components/project-screenshot";
import { Reveal } from "@/components/motion-primitives";
import { portfolio } from "@/data/portfolio";
import { createPageMetadata } from "@/lib/metadata";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return portfolio.projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps) {
  const { slug } = await params;
  const project = portfolio.projects.find((item) => item.slug === slug);

  if (!project) {
    return createPageMetadata({
      title: portfolio.site.notFoundPage.title,
      description: portfolio.site.notFoundPage.description,
      path: `/projects/${slug}`,
    });
  }

  return createPageMetadata({
    title: project.name,
    description: project.description,
    path: `/projects/${project.slug}`,
  });
}

export default function ProjectCaseStudy({ params }: ProjectPageProps) {
  return (
    <Suspense
      fallback={
        <main className="flex-1 px-5 pb-24 pt-16 sm:px-8 sm:pt-24">
          <div className="mx-auto h-96 max-w-5xl animate-pulse rounded-3xl bg-white/[0.03]" />
        </main>
      }
    >
      <ProjectCaseStudyContent params={params} />
    </Suspense>
  );
}

async function ProjectCaseStudyContent({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = portfolio.projects.find((item) => item.slug === slug);

  if (!project) {
    notFound();
  }

  const labels = portfolio.site.projects.labels;
  const screenshotAvailable = existsSync(
    join(process.cwd(), "public", project.screenshot.slice(1)),
  );

  return (
    <main className="flex-1 px-5 pb-24 pt-16 sm:px-8 sm:pt-24">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm text-foreground/60 transition-colors hover:text-accent-cyan"
          >
            <ArrowLeft aria-hidden="true" size={16} />
            {labels.allProjects}
          </Link>
          <p className="mt-10 font-mono text-sm text-accent-violet">
            {project.name}
          </p>
          <h1 className="mt-3 max-w-4xl text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-6xl">
            {project.title}
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-foreground/65">
            {project.description}
          </p>
          <p className="mt-5 inline-flex rounded-full border border-accent-cyan/25 bg-accent-cyan/[0.06] px-3 py-1 font-mono text-xs text-accent-cyan">
            {project.category}
          </p>
        </Reveal>

        <Reveal className="mt-10" delay={0.1}>
          <ProjectScreenshot
            src={project.screenshot}
            alt={`${project.name} screenshot`}
            available={screenshotAvailable}
            placeholder={labels.screenshotUnavailable}
            className="aspect-video rounded-3xl border border-white/10"
          />
        </Reveal>

        <section className="mt-16 grid gap-10 md:grid-cols-2">
          <Reveal>
            <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-accent-cyan">
              {labels.overview}
            </h2>
            <p className="mt-4 text-base leading-8 text-foreground/70">
              {project.description}
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-accent-violet">
              {labels.problem}
            </h2>
            <p className="mt-4 text-base leading-8 text-foreground/70">
              {project.problem}
            </p>
          </Reveal>
          <Reveal>
            <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-accent-violet">
              {labels.solution}
            </h2>
            <p className="mt-4 text-base leading-8 text-foreground/70">
              {project.solution}
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-accent-cyan">
              {labels.keyFeatures}
            </h2>
            <ul className="mt-4 space-y-3">
              {project.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-3 text-sm leading-6 text-foreground/70"
                >
                  <span
                    aria-hidden="true"
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-cyan shadow-[0_0_10px_#22d3ee]"
                  />
                  {feature}
                </li>
              ))}
            </ul>
          </Reveal>
        </section>

        <Reveal className="mt-16">
          <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-accent-cyan">
            {labels.techStack}
          </h2>
          <ul className="mt-5 flex flex-wrap gap-2">
            {project.stack.map((item) => (
              <li
                key={item}
                className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 font-mono text-xs text-foreground/70"
              >
                {item}
              </li>
            ))}
          </ul>
        </Reveal>

        {(project.githubUrl || project.liveUrl) && (
          <Reveal className="mt-12 flex flex-wrap gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm text-foreground/75 transition-colors hover:border-accent-cyan/40 hover:text-accent-cyan"
              >
                {labels.github}
                <ArrowUpRight aria-hidden="true" size={15} />
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-accent-cyan px-5 py-3 text-sm font-medium text-background transition-colors hover:bg-cyan-200"
              >
                {labels.liveDemo}
                <ArrowUpRight aria-hidden="true" size={15} />
              </a>
            )}
          </Reveal>
        )}
      </div>
    </main>
  );
}
