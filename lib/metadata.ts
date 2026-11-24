import type { Metadata } from "next";
import { portfolio } from "@/data/portfolio";

const siteName = portfolio.personal.name;
const socialImage = {
  url: portfolio.site.home.profileImage,
  alt: portfolio.site.home.profileImageAlt,
};

export const siteUrl = new URL(
  process.env.SITE_URL ??
    (process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000"),
);

export function createPageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path?: string;
}): Metadata {
  const fullTitle = `${title} | ${siteName}`;

  return {
    title,
    description,
    alternates: path ? { canonical: path } : undefined,
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      siteName,
      locale: "en_IN",
      type: "website",
      images: [socialImage],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [socialImage.url],
    },
  };
}
