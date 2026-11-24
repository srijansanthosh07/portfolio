import { Download } from "lucide-react";
import { Reveal } from "@/components/motion-primitives";
import { portfolio } from "@/data/portfolio";
import { createPageMetadata } from "@/lib/metadata";

const { personal, site } = portfolio;

export const metadata = createPageMetadata({
  title: site.sections.resume,
  description: site.labels.resumeDescription,
  path: "/resume",
});

export default function ResumePage() {
  return (
    <main className="flex-1 px-5 pb-20 pt-20 sm:px-8 sm:pt-28">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <p className="font-mono text-sm text-accent-violet">
            {personal.title}
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground sm:text-6xl">
            {site.sections.resume}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-foreground/65">
            {site.labels.resumeDescription}
          </p>
          <a
            href={site.resumeHref}
            download
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-accent-cyan px-5 py-3 text-sm font-semibold text-background transition-colors hover:bg-cyan-200"
          >
            <Download aria-hidden="true" size={16} />
            {site.resumeLabel}
          </a>
        </Reveal>

        <div className="mt-10 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] shadow-[0_0_50px_rgba(34,211,238,0.08)]">
          <iframe
            className="h-[75vh] min-h-[36rem] w-full border-0 bg-white"
            src={site.resumeHref}
            title={site.resumePage.viewerTitle}
          />
        </div>
      </div>
    </main>
  );
}
