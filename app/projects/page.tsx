import { existsSync } from "node:fs";
import { join } from "node:path";
import { ProjectGallery } from "@/components/project-gallery";
import { Reveal } from "@/components/motion-primitives";
import { portfolio } from "@/data/portfolio";
import { createPageMetadata } from "@/lib/metadata";

const projectContent = portfolio.site.projects;

export const metadata = createPageMetadata({
  title: projectContent.title,
  description: projectContent.intro,
  path: "/projects",
});

export default function ProjectsPage() {
  const projects = portfolio.projects.map((project) => ({
    ...project,
    screenshotAvailable: existsSync(
      join(process.cwd(), "public", project.screenshot.slice(1)),
    ),
  }));

  return (
    <main className="flex-1 px-5 pb-24 pt-20 sm:px-8 sm:pt-28">
      <div className="mx-auto max-w-7xl">
        <Reveal initialVisible>
          <p className="font-mono text-sm text-accent-violet">
            {portfolio.personal.title}
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground sm:text-6xl">
            {projectContent.title}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-foreground/65">
            {projectContent.intro}
          </p>
        </Reveal>

        <ProjectGallery projects={projects} content={projectContent} />
      </div>
    </main>
  );
}
