"use client";

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import type { MouseEvent as ReactMouseEvent } from "react";
import type {
  PortfolioData,
  PortfolioProject,
  ProjectCategory,
} from "@/data/portfolio";
import { ProjectScreenshot } from "@/components/project-screenshot";
import { usePrefersReducedMotion } from "@/components/use-prefers-reduced-motion";

type GalleryProject = PortfolioProject & {
  screenshotAvailable: boolean;
};

type ProjectContent = PortfolioData["site"]["projects"];

const filters: {
  value: "All" | ProjectCategory;
  label: keyof ProjectContent["filters"];
}[] = [
  { value: "All", label: "all" },
  { value: "AI", label: "ai" },
  { value: "Full-Stack", label: "fullStack" },
  { value: "Mobile", label: "mobile" },
];

export function ProjectGallery({
  projects,
  content,
}: {
  projects: GalleryProject[];
  content: ProjectContent;
}) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [activeFilter, setActiveFilter] =
    useState<(typeof filters)[number]["value"]>("All");
  const visibleProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((project) => project.category === activeFilter);

  return (
    <>
      <div
        aria-label={content.labels.filters}
        className="mt-9 flex flex-wrap gap-2"
        role="group"
      >
        {filters.map((filter) => (
          <button
            key={filter.value}
            type="button"
            aria-pressed={activeFilter === filter.value}
            onClick={() => setActiveFilter(filter.value)}
            className={`rounded-full border px-4 py-2 text-sm transition-colors ${
              activeFilter === filter.value
                ? "border-accent-cyan/50 bg-accent-cyan/10 text-accent-cyan"
                : "border-white/10 text-foreground/60 hover:border-white/25 hover:text-foreground"
            }`}
          >
            {content.filters[filter.label]}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeFilter}
          className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={prefersReducedMotion ? undefined : { opacity: 0, y: -8 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.25 }}
        >
          {visibleProjects.map((project, index) => (
            <ProjectCard
              key={project.slug}
              project={project}
              content={content}
              index={index}
              reduceMotion={Boolean(prefersReducedMotion)}
            />
          ))}
        </motion.div>
      </AnimatePresence>
    </>
  );
}

function ProjectCard({
  project,
  content,
  index,
  reduceMotion,
}: {
  project: GalleryProject;
  content: ProjectContent;
  index: number;
  reduceMotion: boolean;
}) {
  const pointerX = useMotionValue(0.5);
  const pointerY = useMotionValue(0.5);
  const springX = useSpring(pointerX, { stiffness: 180, damping: 22 });
  const springY = useSpring(pointerY, { stiffness: 180, damping: 22 });
  const rotateX = useTransform(springY, [0, 1], [6, -6]);
  const rotateY = useTransform(springX, [0, 1], [-6, 6]);

  function handleMouseMove(event: ReactMouseEvent<HTMLElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - bounds.left) / bounds.width);
    pointerY.set((event.clientY - bounds.top) / bounds.height);
  }

  function resetTilt() {
    pointerX.set(0.5);
    pointerY.set(0.5);
  }

  return (
    <motion.article
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]"
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={
        reduceMotion
          ? { duration: 0 }
          : {
              delay: index * 0.08,
              type: "spring",
              stiffness: 160,
              damping: 22,
            }
      }
      whileHover={
        reduceMotion
          ? undefined
          : {
              y: -7,
              boxShadow: "0 24px 80px rgba(34, 211, 238, 0.12)",
            }
      }
      style={{
        rotateX: reduceMotion ? 0 : rotateX,
        rotateY: reduceMotion ? 0 : rotateY,
        transformPerspective: 1000,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={reduceMotion ? undefined : handleMouseMove}
      onMouseLeave={resetTilt}
    >
      <div className="relative">
        <ProjectScreenshot
          src={project.screenshot}
          alt={`${project.name} screenshot`}
          available={project.screenshotAvailable}
          placeholder={content.labels.screenshotUnavailable}
          className="aspect-[16/10]"
        />
        <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-background/80 px-3 py-1 font-mono text-[11px] text-accent-cyan backdrop-blur">
          {project.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="font-mono text-xs text-accent-violet">{project.name}</p>
        <h2 className="mt-2 text-xl font-semibold leading-snug text-foreground">
          {project.title}
        </h2>
        <p className="mt-3 flex-1 text-sm leading-6 text-foreground/65">
          {project.description}
        </p>

        <ul className="mt-5 flex flex-wrap gap-2">
          {project.stack.map((item) => (
            <li
              key={item}
              className="rounded-full border border-white/10 px-2.5 py-1 font-mono text-[10px] text-foreground/60"
            >
              {item}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-white/10 pt-5">
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center gap-2 text-sm font-medium text-accent-cyan transition-colors hover:text-accent-violet"
          >
            {content.labels.viewCaseStudy}
            <ArrowUpRight aria-hidden="true" size={15} />
          </Link>
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="text-sm text-foreground/60 transition-colors hover:text-foreground"
            >
              {content.labels.github}
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="text-sm text-foreground/60 transition-colors hover:text-foreground"
            >
              {content.labels.liveDemo}
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}
