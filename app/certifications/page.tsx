import { CertificateGallery } from "@/components/certificate-gallery";
import { Reveal } from "@/components/motion-primitives";
import { portfolio } from "@/data/portfolio";
import { createPageMetadata } from "@/lib/metadata";

const pageDescription =
  "Internship certificates, course completions, and competition awards.";

export const metadata = createPageMetadata({
  title: portfolio.site.sections.certifications,
  description: pageDescription,
  path: "/certifications",
});

export default function CertificationsPage() {
  return (
    <main className="flex-1 px-5 pb-24 pt-20 sm:px-8 sm:pt-28">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="font-mono text-sm text-accent-violet">
            {portfolio.personal.title}
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground sm:text-6xl">
            {portfolio.site.sections.certifications}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-foreground/65">
            {pageDescription}
          </p>
          <p className="mt-4 font-mono text-sm text-accent-cyan">
            {portfolio.certificates.length} certificates
          </p>
        </Reveal>

        <CertificateGallery certificates={portfolio.certificates} />
      </div>
    </main>
  );
}
