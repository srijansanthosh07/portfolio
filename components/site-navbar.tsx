"use client";

import { Download, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useSyncExternalStore } from "react";
import { portfolio } from "@/data/portfolio";

function subscribeToNothing() {
  return () => {};
}

function getClientSnapshot() {
  return true;
}

function getServerSnapshot() {
  return false;
}

export function SiteNavbar() {
  const { site } = portfolio;
  const pathname = usePathname();
  const [activeHref, setActiveHref] = useState("/#home");
  const [menuOpen, setMenuOpen] = useState(false);
  const hasMounted = useSyncExternalStore(
    subscribeToNothing,
    getClientSnapshot,
    getServerSnapshot,
  );

  useEffect(() => {
    if (pathname !== "/") {
      return;
    }

    const sections = site.navigation
      .map((item) => ({
        href: item.href,
        sectionHref: item.homeHref ?? item.href,
      }))
      .filter((item) => item.sectionHref.startsWith("/#"))
      .map((item) => ({
        href: item.href,
        section: document.querySelector(item.sectionHref.slice(1)),
      }))
      .filter(
        (item): item is { href: string; section: Element } =>
          item.section !== null,
      );

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (first, second) =>
              first.boundingClientRect.top - second.boundingClientRect.top,
          );
        const activeSection = visibleSections[0];

        if (activeSection) {
          const activeNavigationItem = sections.find(
            (item) => item.section === activeSection.target,
          );

          if (activeNavigationItem) {
            setActiveHref(activeNavigationItem.href);
          }
        }
      },
      { rootMargin: "-20% 0px -65% 0px" },
    );

    sections.forEach(({ section }) => observer.observe(section));
    return () => observer.disconnect();
  }, [pathname, site.navigation]);

  function closeMenu(href: string) {
    setActiveHref(href);
    setMenuOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-background/75 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
        <Link
          className="shrink-0 text-lg font-semibold tracking-tight text-foreground"
          href="/#home"
          onClick={() => closeMenu("/#home")}
        >
          {site.logo}
        </Link>

        <nav
          aria-label={site.labels.primaryNavigation}
          className="hidden items-center gap-1 xl:flex"
        >
          {site.navigation.map((item) => {
            const isActive =
              hasMounted &&
              ((item.href === "/about" && pathname === "/about") ||
                (item.href === "/projects" &&
                  pathname.startsWith("/projects")) ||
                (item.href === "/hackathons" &&
                  pathname.startsWith("/hackathons")) ||
                (item.href === "/resume" &&
                  pathname.startsWith("/resume")) ||
                (item.href === "/contact" &&
                  pathname.startsWith("/contact")) ||
                (pathname === "/" && activeHref === item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => closeMenu(item.href)}
                aria-current={isActive ? "location" : undefined}
                className={`rounded-full px-3 py-2 text-xs transition-colors ${
                  isActive
                  ? "bg-white/10 text-accent-cyan"
                  : "text-foreground/65 hover:bg-white/5 hover:text-foreground"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto hidden items-center gap-4 lg:flex xl:ml-0">
          <span className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-emerald-400/20 bg-emerald-400/5 px-3 py-1.5 text-[11px] text-emerald-300">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            {site.availabilityLabel}
          </span>
          <a
            href={site.resumeHref}
            download
            className="inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-accent-cyan px-4 py-2 text-xs font-semibold text-background transition-colors hover:bg-cyan-200"
          >
            <Download aria-hidden="true" size={14} />
            {site.resumeLabel}
          </a>
        </div>

        <button
          type="button"
          aria-label={menuOpen ? site.labels.closeMenu : site.labels.openMenu}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((isOpen) => !isOpen)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-foreground transition-colors hover:bg-white/10 xl:hidden"
        >
          {menuOpen ? (
            <X aria-hidden="true" size={19} />
          ) : (
            <Menu aria-hidden="true" size={19} />
          )}
        </button>
      </div>

      {menuOpen && (
        <div
          id="mobile-navigation"
          className="border-t border-white/10 bg-background/95 px-5 py-5 backdrop-blur-xl sm:px-8 xl:hidden"
        >
          <nav
            aria-label={site.labels.mobileNavigation}
            className="mx-auto grid max-w-7xl grid-cols-2 gap-2 sm:grid-cols-4"
          >
              {site.navigation.map((item) => {
                const isActive =
                  hasMounted &&
                  ((item.href === "/about" && pathname === "/about") ||
                    (item.href === "/projects" &&
                      pathname.startsWith("/projects")) ||
                    (item.href === "/hackathons" &&
                      pathname.startsWith("/hackathons")) ||
                    (item.href === "/resume" &&
                      pathname.startsWith("/resume")) ||
                    (item.href === "/contact" &&
                      pathname.startsWith("/contact")) ||
                    (pathname === "/" && activeHref === item.href));

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => closeMenu(item.href)}
                    aria-current={isActive ? "location" : undefined}
                    className={`rounded-xl px-4 py-3 text-sm transition-colors ${
                      isActive
                    ? "bg-white/10 text-accent-cyan"
                    : "text-foreground/70 hover:bg-white/5 hover:text-foreground"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            <a
              href={site.resumeHref}
              download
              className="col-span-2 inline-flex items-center justify-center gap-2 rounded-xl bg-accent-cyan px-4 py-3 text-sm font-semibold text-background sm:col-span-4"
            >
              <Download aria-hidden="true" size={16} />
              {site.resumeLabel}
            </a>
          </nav>
          <p className="mx-auto mt-5 flex max-w-7xl items-center gap-2 text-xs text-emerald-300">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            {site.availabilityLabel}
          </p>
        </div>
      )}
    </header>
  );
}
