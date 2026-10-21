import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Lightbulb, LightbulbOff } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { profile, type Project, type ProjectClient } from "@/data/projects";

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/#work" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

export const EXT = { target: "_blank", rel: "noopener noreferrer" } as const;

const THEME_KEY = "theme";

/** Lamp toggle: lights off = dark theme (default), lights on = light theme. */
export function ThemeToggle() {
  const [light, setLight] = useState(false);

  useEffect(() => {
    setLight(document.documentElement.classList.contains("light"));
  }, []);

  const toggle = () => {
    const next = !light;
    const root = document.documentElement;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduced) {
      root.classList.add("theme-switching");
      window.setTimeout(() => root.classList.remove("theme-switching"), 400);
    }
    root.classList.toggle("light", next);
    try {
      localStorage.setItem(THEME_KEY, next ? "light" : "dark");
    } catch {
      /* storage unavailable: the choice simply isn't remembered */
    }
    setLight(next);
  };

  const label = light ? "Lights off" : "Lights on";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className="relative flex size-9 items-center justify-center rounded-full border border-primary/40 text-muted-foreground transition-colors hover:border-primary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <LightbulbOff
        aria-hidden="true"
        className={`absolute size-4 transition-all duration-200 ${
          light ? "rotate-45 scale-75 opacity-0" : "rotate-0 scale-100 opacity-100"
        }`}
      />
      <Lightbulb
        aria-hidden="true"
        className={`absolute size-4 text-primary transition-all duration-200 ${
          light ? "rotate-0 scale-100 opacity-100" : "-rotate-45 scale-75 opacity-0"
        }`}
        style={{ filter: light ? "drop-shadow(0 0 6px var(--primary))" : undefined }}
      />
    </button>
  );
}

/**
 * `overHero`: on the homepage the navbar stays dark while it sits over the
 * (always dark) hero video, then follows the current theme once scrolled past it.
 */
export function SiteNav({ overHero = false }: { overHero?: boolean }) {
  const [onHero, setOnHero] = useState(overHero);

  useEffect(() => {
    if (!overHero) return;
    const update = () => setOnHero(window.scrollY < window.innerHeight - 64);
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [overHero]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-md ${
        onHero ? "theme-dark" : ""
      }`}
    >
      <nav className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6 lg:px-10">
        <a
          href="/"
          className="font-display text-sm font-medium tracking-[0.18em] uppercase text-foreground"
        >
          Paul Comaïta<span className="text-primary">.</span>
        </a>
        <ul className="flex items-center gap-3 sm:gap-8">
          {NAV_LINKS.map((link) => (
            <li key={link.href} className="hidden sm:block">
              <a
                href={link.href}
                className="text-[13px] font-normal tracking-[0.14em] uppercase text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <ThemeToggle />
          </li>
          <li>
            <a
              href="/#contact"
              className="rounded-full border border-primary/40 px-4 py-1.5 text-[13px] tracking-[0.1em] uppercase text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              Contact
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

/** `linked={false}` inside a card that is itself a link (no nested <a>). */
function ClientLine({ client, linked = true }: { client: ProjectClient; linked?: boolean }) {
  return (
    <p className="text-[13px] font-light text-foreground/85">
      Client:{" "}
      {!linked ? (
        client.name
      ) : (
        <a
          href={client.url}
          {...EXT}
          className="underline-offset-4 transition-colors duration-300 hover:text-primary hover:underline"
        >
          {client.name}
        </a>
      )}
    </p>
  );
}

export { ClientLine };

/** Homepage card: the whole card links to the project's case study page. */
export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      to="/work/$slug"
      params={{ slug: project.slug }}
      className="group block h-full w-full overflow-hidden rounded-lg border border-border/60 bg-surface text-left shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:bg-surface-raised focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <div className="relative aspect-video overflow-hidden">
        <img
          src={project.cover}
          alt={`${project.title} — ${project.subtitle}`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent opacity-80" />
        <span className="absolute left-3 top-3 rounded-full border border-border/60 bg-background/70 px-2.5 py-1 text-[10px] tracking-[0.14em] uppercase text-foreground/85 backdrop-blur-sm">
          {project.projectType}
        </span>
        <span className="absolute inset-0 flex items-center justify-center bg-background/30 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100">
          <span className="flex items-center gap-2 rounded-full border border-border/60 bg-background/70 px-4 py-2 text-[11px] tracking-[0.16em] uppercase text-foreground">
            <ArrowUpRight className="size-3.5" />
            View case study
          </span>
        </span>
      </div>
      <div className="px-5 py-5">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="font-display text-base font-medium text-foreground sm:text-lg">
            {project.title}
            <span className="font-normal text-muted-foreground"> — {project.subtitle}</span>
          </h3>
          <span className="text-sm font-light text-muted-foreground">{project.year}</span>
        </div>
        <p className="mt-1.5 text-sm font-light leading-relaxed text-muted-foreground">
          {project.excerpt}
        </p>
        {project.client && (
          <div className="mt-3">
            <ClientLine client={project.client} linked={false} />
          </div>
        )}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.software.map((tool) => (
            <span
              key={tool}
              className="rounded-full border border-border bg-background px-2.5 py-1 text-[11px] font-light text-muted-foreground"
            >
              {tool}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}

export function ProjectGrid({ items }: { items: Project[] }) {
  return (
    <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
      {items.map((project, i) => (
        <Reveal key={project.slug} delay={(i % 2) * 100}>
          <ProjectCard project={project} />
        </Reveal>
      ))}
    </div>
  );
}

/** Social links. Instagram only appears once its URL is set in src/data/projects.ts. */
const CONTACT_SOCIALS = [
  { label: "ArtStation", href: profile.artstationUrl },
  { label: "LinkedIn", href: profile.linkedinUrl },
  { label: "Instagram", href: profile.instagramUrl },
].filter((link) => link.href);

export function Contact() {
  return (
    <section
      id="contact"
      className="grain relative w-full overflow-hidden border-t border-border/60"
    >
      <div className="pointer-events-none absolute left-1/2 top-1/2 size-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[140px]" />
      <div className="relative mx-auto flex w-full max-w-4xl flex-col items-center px-6 py-32 text-center lg:py-44">
        <Reveal>
          <p className="text-[12px] tracking-[0.35em] uppercase text-primary">Contact</p>
          <h2 className="mt-6 font-display text-5xl font-medium tracking-tight text-foreground sm:text-6xl">
            Get in touch
          </h2>
          <p className="mx-auto mt-6 max-w-md text-base font-light text-muted-foreground">
            Advertising, motion design, product animation — tell me about your idea and I&apos;ll
            bring it to life.
          </p>
          <a
            href={`mailto:${profile.email}`}
            className="group mt-10 inline-flex items-center gap-3 rounded-full border border-foreground/80 bg-transparent px-8 py-3.5 text-sm font-medium tracking-wide text-foreground transition-all duration-300 hover:scale-[1.05] hover:border-foreground hover:bg-foreground hover:text-background"
          >
            Contact me
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <p className="mt-5">
            <a
              href={`mailto:${profile.email}`}
              className="text-sm font-light tracking-wide text-muted-foreground underline-offset-4 transition-colors duration-300 hover:text-primary hover:underline"
            >
              {profile.email}
            </a>
          </p>

          <ul className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            {CONTACT_SOCIALS.map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 text-[13px] tracking-[0.14em] uppercase text-muted-foreground transition-colors duration-300 hover:text-primary"
                >
                  {label}
                  <ArrowUpRight className="size-3.5 opacity-0 transition-all duration-300 group-hover:opacity-100" />
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="w-full border-t border-border/60">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-6 px-6 py-10 sm:flex-row lg:px-10">
        <p className="text-[13px] font-light text-muted-foreground">
          © 2026 Paul Comaïta — All rights reserved
        </p>
        <ul className="flex items-center gap-5">
          {CONTACT_SOCIALS.map(({ label, href }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[12px] tracking-[0.14em] uppercase text-muted-foreground transition-colors duration-300 hover:text-primary"
              >
                {label}
              </a>
            </li>
          ))}
          <li>
            <a
              href={`mailto:${profile.email}`}
              className="text-[12px] tracking-[0.14em] uppercase text-muted-foreground transition-colors duration-300 hover:text-primary"
            >
              Email
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
