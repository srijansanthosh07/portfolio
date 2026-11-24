import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { ScrollProgress } from "@/components/scroll-progress";
import { SiteFooter } from "@/components/site-footer";
import { SiteNavbar } from "@/components/site-navbar";
import { portfolio } from "@/data/portfolio";
import { siteUrl } from "@/lib/metadata";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: siteUrl,
  alternates: {
    canonical: "/",
  },
  title: {
    default: `${portfolio.personal.name} | ${portfolio.personal.title}`,
    template: `%s | ${portfolio.personal.name}`,
  },
  description: portfolio.bio,
  openGraph: {
    title: `${portfolio.personal.name} | ${portfolio.personal.title}`,
    description: portfolio.bio,
    url: "/",
    siteName: portfolio.personal.name,
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: portfolio.site.home.profileImage,
        alt: portfolio.site.home.profileImageAlt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${portfolio.personal.name} | ${portfolio.personal.title}`,
    description: portfolio.bio,
    images: [portfolio.site.home.profileImage],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetBrainsMono.variable} h-full antialiased`}
      data-scroll-behavior="smooth"
    >
      <body className="flex min-h-full flex-col">
        <ScrollProgress />
        <SiteNavbar />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
