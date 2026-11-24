import type { MetadataRoute } from "next";
import { portfolio } from "@/data/portfolio";
import { siteUrl } from "@/lib/metadata";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    "/",
    "/about",
    "/projects",
    "/hackathons",
    "/resume",
    "/contact",
  ];
  const projectPaths = portfolio.projects.map(
    (project) => `/projects/${project.slug}`,
  );

  return [...staticPaths, ...projectPaths].map((path) => ({
    url: new URL(path, siteUrl).toString(),
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
