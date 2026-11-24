import { CodeXml, Link2, Mail } from "lucide-react";
import Link from "next/link";
import { portfolio } from "@/data/portfolio";

export function SiteFooter() {
  const { personal, site } = portfolio;

  return (
    <footer className="border-t border-white/10 bg-black/20">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-8 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <Link
            className="text-lg font-semibold tracking-tight text-foreground"
            href="/#home"
          >
            {site.logo}
          </Link>
          <p className="mt-3 max-w-sm text-sm leading-6 text-foreground/55">
            {personal.title}
          </p>
        </div>

        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground/45">
            {site.labels.footerNavigation}
          </h2>
          <nav aria-label={site.labels.footerNavigation} className="mt-4">
            <ul className="grid grid-cols-2 gap-x-4 gap-y-3">
              {site.navigation.map((item) => (
                <li key={item.href}>
                  <a
                    className="text-sm text-foreground/65 transition-colors hover:text-accent-cyan"
                    href={item.href}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground/45">
            {site.labels.footerConnect}
          </h2>
          <ul className="mt-4 space-y-3">
            <li>
              <a
                className="inline-flex items-center gap-2 text-sm text-foreground/65 transition-colors hover:text-accent-cyan"
                href={`mailto:${personal.email}`}
              >
                <Mail aria-hidden="true" size={16} />
                {site.labels.email}
              </a>
            </li>
            <li>
              <a
                className="inline-flex items-center gap-2 text-sm text-foreground/65 transition-colors hover:text-accent-cyan"
                href={personal.links.github}
                target="_blank"
                rel="noreferrer"
              >
                <CodeXml aria-hidden="true" size={16} />
                {site.labels.github}
              </a>
            </li>
            {personal.links.linkedin && (
              <li>
                <a
                  className="inline-flex items-center gap-2 text-sm text-foreground/65 transition-colors hover:text-accent-cyan"
                  href={personal.links.linkedin}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Link2 aria-hidden="true" size={16} />
                  {site.labels.linkedin}
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/5 px-5 py-4 text-center text-xs text-foreground/40 sm:px-8">
        {personal.name}
      </div>
    </footer>
  );
}
