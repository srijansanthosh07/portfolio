import Link from "next/link";
import { portfolio } from "@/data/portfolio";
import { createPageMetadata } from "@/lib/metadata";

const content = portfolio.site.notFoundPage;

export const metadata = createPageMetadata({
  title: content.title,
  description: content.description,
});

export default function NotFound() {
  return (
    <main className="flex flex-1 items-center px-5 py-24 sm:px-8">
      <section className="mx-auto w-full max-w-3xl rounded-3xl border border-white/10 bg-white/[0.03] p-8 text-center sm:p-14">
        <p className="font-mono text-sm text-accent-violet">404</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          {content.title}
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-foreground/65">
          {content.description}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            className="rounded-full bg-accent-cyan px-5 py-3 text-sm font-semibold text-background transition-colors hover:bg-cyan-200"
            href="/"
          >
            {content.homeAction}
          </Link>
          <Link
            className="rounded-full border border-white/15 px-5 py-3 text-sm text-foreground/80 transition-colors hover:border-accent-violet/50 hover:text-accent-violet"
            href="/projects"
          >
            {content.projectsAction}
          </Link>
        </div>
      </section>
    </main>
  );
}
