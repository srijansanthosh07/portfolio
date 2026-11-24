import {
  CodeXml,
  Link2,
  Mail,
  MapPin,
  Phone,
  type LucideIcon,
} from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { Reveal } from "@/components/motion-primitives";
import { portfolio } from "@/data/portfolio";
import { createPageMetadata } from "@/lib/metadata";

const { personal, site } = portfolio;

export const metadata = createPageMetadata({
  title: site.sections.contact,
  description: site.labels.contactDescription,
  path: "/contact",
});

type ContactMethod = {
  label: string;
  value: string;
  href: string | null;
  icon: LucideIcon;
  external?: boolean;
};

export default function ContactPage() {
  const contactMethods: ContactMethod[] = [
    {
      label: site.labels.email,
      value: personal.email,
      href: `mailto:${personal.email}`,
      icon: Mail,
    },
    {
      label: site.labels.phone,
      value: personal.phone,
      href: `tel:${personal.phone.replaceAll(" ", "")}`,
      icon: Phone,
    },
    {
      label: site.labels.github,
      value: personal.links.github.replace(/^https?:\/\//, ""),
      href: personal.links.github,
      icon: CodeXml,
      external: true,
    },
    ...(personal.links.linkedin
      ? [
          {
            label: site.labels.linkedin,
            value: personal.links.linkedin
              .replace(/^https?:\/\//, "")
              .split("?")[0],
            href: personal.links.linkedin,
            icon: Link2,
            external: true,
          },
        ]
      : []),
    {
      label: site.labels.location,
      value: personal.location,
      href: null,
      icon: MapPin,
    },
  ];

  return (
    <main className="flex-1 px-5 pb-20 pt-20 sm:px-8 sm:pt-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="font-mono text-sm text-accent-violet">
            {personal.title}
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground sm:text-6xl">
            {site.sections.contact}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-foreground/65">
            {site.labels.contactDescription}
          </p>
        </Reveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {contactMethods.map((method, index) => {
            const Icon = method.icon;

            return (
              <Reveal key={method.label} delay={index * 0.06}>
                <article className="flex h-full items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-colors hover:border-accent-cyan/30">
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-accent-cyan/20 bg-accent-cyan/5 text-accent-cyan">
                    <Icon aria-hidden="true" size={19} />
                  </span>
                  <div className="min-w-0">
                    <h2 className="text-sm font-medium text-foreground/60">
                      {method.label}
                    </h2>
                    {method.href ? (
                      <a
                        className="mt-1 block break-words text-sm text-foreground transition-colors hover:text-accent-cyan"
                        href={method.href}
                        rel={method.external ? "noreferrer" : undefined}
                        target={method.external ? "_blank" : undefined}
                      >
                        {method.value}
                      </a>
                    ) : (
                      <p className="mt-1 text-sm text-foreground">
                        {method.value}
                      </p>
                    )}
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-10">
          <ContactForm content={site.contactPage} />
        </Reveal>
      </div>
    </main>
  );
}
