import { useEffect, useState } from "react";
import { ArrowUpRight, Lightbulb, LightbulbOff, Play, X } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import {
  categories,
  profile,
  type Project,
  type ProjectCategory,
  type ProjectClient,
} from "@/data/projects";

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

type Filter = "All" | ProjectCategory;
const FILTERS: Filter[] = ["All", ...categories];

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

function ClientLine({ client }: { client: ProjectClient }) {
  return (
    <div className="mt-3 text-[13px] font-light leading-relaxed">
      <p className="text-foreground/85">
        Client:{" "}
        <a
          href={client.url}
          {...EXT}
          onClick={(e) => e.stopPropagation()}
          className="underline-offset-4 transition-colors duration-300 hover:text-primary hover:underline"
        >
          {client.name}
        </a>
      </p>
      <p className="mt-0.5 text-muted-foreground">
        {client.contextUrl ? (
          <a
            href={client.contextUrl}
            {...EXT}
            onClick={(e) => e.stopPropagation()}
            className="underline-offset-4 transition-colors duration-300 hover:text-primary hover:underline"
          >
            {client.context}
          </a>
        ) : (
          client.context
        )}
      </p>
    </div>
  );
}

export function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const video = project.video;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={`Project ${project.title}`}
    >
      <div
        className="absolute inset-0 animate-in fade-in duration-300 bg-background/85 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="animate-in fade-in zoom-in-95 duration-300 shadow-soft relative max-h-full w-full max-w-3xl overflow-y-auto rounded-lg border border-border/60 bg-surface">
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-10 flex size-9 items-center justify-center rounded-full border border-border bg-background/70 text-foreground backdrop-blur-sm transition-colors duration-300 hover:border-primary/50 hover:text-primary"
        >
          <X className="size-4" />
        </button>

        <div className="relative aspect-video overflow-hidden">
          {video && video.stable ? (
            <iframe
              src={video.embedUrl}
              title={`${project.title} — video`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="h-full w-full"
            />
          ) : (
            <>
              <img
                src={video ? video.poster : project.cover}
                alt={`${project.title} — ${project.category}`}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />
              {video && (
                <a
                  href={project.artstationUrl}
                  {...EXT}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <span className="flex items-center gap-2 rounded-full border border-border/60 bg-background/70 px-4 py-2 text-[11px] tracking-[0.16em] uppercase text-foreground transition-colors duration-300 hover:text-primary">
                    <Play className="size-3.5" />
                    Watch the animation on ArtStation
                  </span>
                </a>
              )}
            </>
          )}
        </div>

        <div className="px-6 pb-8 pt-4 sm:px-8">
          <p className="text-[11px] tracking-[0.3em] uppercase text-primary">
            {project.category} · {project.year} · {project.projectType}
          </p>
          <h3 className="mt-3 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl">
            {project.title}
          </h3>
          {project.client && <ClientLine client={project.client} />}

          <p className="mt-4 max-w-2xl text-sm font-light leading-relaxed text-foreground/85 sm:text-base">
            {project.excerpt}
          </p>

          {project.images.length > 0 && (
            <div
              className={`mt-6 grid grid-cols-1 gap-3 ${
                project.images.length > 1 ? "sm:grid-cols-2" : ""
              }`}
            >
              {project.images.map((src, i) => (
                <img
                  key={src}
                  src={src}
                  alt={`${project.title} — image ${i + 1}`}
                  loading="lazy"
                  className="w-full rounded-md border border-border/60 object-cover"
                />
              ))}
            </div>
          )}

          {project.result ? (
            <dl className="mt-6 max-w-2xl space-y-3 text-sm font-light sm:text-base">
              {project.role && (
                <div>
                  <dt className="inline text-[11px] tracking-[0.18em] uppercase text-primary">
                    Role
                  </dt>
                  <dd className="mt-1 text-muted-foreground">{project.role}</dd>
                </div>
              )}
              <div>
                <dt className="inline text-[11px] tracking-[0.18em] uppercase text-primary">
                  Tools
                </dt>
                <dd className="mt-1 text-muted-foreground">
                  {project.software.join(", ")}
                </dd>
              </div>
              <div>
                <dt className="inline text-[11px] tracking-[0.18em] uppercase text-primary">
                  Result
                </dt>
                <dd className="mt-1 text-muted-foreground">{project.result}</dd>
              </div>
            </dl>
          ) : (
            <>
              {project.description && (
                <p className="mt-6 max-w-2xl text-sm font-light leading-relaxed text-muted-foreground sm:text-base">
                  {project.description}
                </p>
              )}
              {project.role && (
                <p className="mt-4 text-sm font-light text-foreground/85">
                  Role: {project.role}
                </p>
              )}
              <div className="mt-6 flex flex-wrap gap-2">
                {project.software.map((tool) => (
                  <span
                    key={tool}
                    className="rounded-full border border-border bg-background px-3.5 py-1.5 text-[12px] font-light text-muted-foreground"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </>
          )}

          <a
            href={project.artstationUrl}
            {...EXT}
            className="group mt-8 inline-flex items-center gap-2.5 rounded-full bg-foreground px-6 py-2.5 text-sm font-medium tracking-wide text-background transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
          >
            View on ArtStation
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </div>
  );
}

export function ProjectCard({ project, onOpen }: { project: Project; onOpen: (p: Project) => void }) {
  return (
              <div
                role="button"
                tabIndex={0}
                onClick={() => onOpen(project)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onOpen(project);
                  }
                }}
                className="group block h-full w-full cursor-pointer overflow-hidden rounded-lg border border-border/60 bg-surface text-left shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:bg-surface-raised"
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={project.cover}
                    alt={`${project.title} — ${project.category}`}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent opacity-80" />
                  <span className="absolute left-3 top-3 rounded-full border border-border/60 bg-background/70 px-2.5 py-1 text-[10px] tracking-[0.14em] uppercase text-foreground/85 backdrop-blur-sm">
                    {project.projectType}
                  </span>
                  <span className="absolute inset-0 flex items-center justify-center bg-background/30 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100">
                    <span className="flex items-center gap-2 rounded-full border border-border/60 bg-background/70 px-4 py-2 text-[11px] tracking-[0.16em] uppercase text-foreground">
                      {project.video ? (
                        <Play className="size-3.5" />
                      ) : (
                        <ArrowUpRight className="size-3.5" />
                      )}
                      {project.video ? "Watch the video" : "View project"}
                    </span>
                  </span>
                </div>
                <div className="px-5 py-5">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-display text-base font-medium text-foreground sm:text-lg">
                      {project.title}
                    </h3>
                    <span className="text-sm font-light text-muted-foreground">
                      {project.year}
                    </span>
                  </div>
                  <p className="mt-1.5 text-sm font-light leading-relaxed text-muted-foreground">
                    {project.excerpt}
                  </p>
                  {project.client && <ClientLine client={project.client} />}
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
              </div>
  );
}

export function ProjectGrid({
  items,
  columns,
  withFilters,
}: {
  items: Project[];
  columns: 2 | 3;
  withFilters?: boolean;
}) {
  const [activeCategory, setActiveCategory] = useState<Filter>("All");
  const [selected, setSelected] = useState<Project | null>(null);
  const visible =
    activeCategory === "All" ? items : items.filter((p) => p.category === activeCategory);

  return (
    <>
      {withFilters && (
        <Reveal delay={120}>
          <div className="mt-12 flex flex-wrap gap-2.5" role="group" aria-label="Project filters">
            {FILTERS.map((category) => {
              const isActive = category === activeCategory;
              return (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  aria-pressed={isActive}
                  className={`rounded-full border px-4 py-1.5 text-[13px] tracking-[0.08em] transition-all duration-300 ${
                    isActive
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-background text-muted-foreground hover:border-primary/40 hover:text-foreground"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </Reveal>
      )}

      <div
        className={`mt-12 grid grid-cols-1 gap-8 ${
          columns === 3 ? "sm:grid-cols-2 lg:grid-cols-3" : "lg:grid-cols-2"
        }`}
      >
        {visible.map((project, i) => (
          <Reveal key={project.id} delay={(i % columns) * 100}>
            <ProjectCard project={project} onOpen={setSelected} />
          </Reveal>
        ))}
      </div>

      {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
    </>
  );
}

const CONTACT_SOCIALS = [
  { label: "ArtStation", href: profile.artstationUrl },
  { label: "LinkedIn", href: profile.linkedinUrl },
];

export function Contact() {
  return (
    <section
      id="contact"
      className="grain relative w-full overflow-hidden border-t border-border/60"
    >
      <div className="pointer-events-none absolute left-1/2 top-1/2 size-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[140px]" />
      <div className="relative mx-auto flex w-full max-w-4xl flex-col items-center px-6 py-32 text-center lg:py-44">
        <Reveal>
          <p className="text-[12px] tracking-[0.35em] uppercase text-primary">
            Contact
          </p>
          <h2 className="mt-6 font-display text-5xl font-medium tracking-tight text-foreground sm:text-6xl">
            Get in touch
          </h2>
          <p className="mx-auto mt-6 max-w-md text-base font-light text-muted-foreground">
            Advertising, motion design, product animation — tell me about your
            idea and I&apos;ll bring it to life.
          </p>
          <a
            href="mailto:contact@paulcomaita.art"
            className="group mt-10 inline-flex items-center gap-3 rounded-full border border-foreground/80 bg-transparent px-8 py-3.5 text-sm font-medium tracking-wide text-foreground transition-all duration-300 hover:scale-[1.05] hover:border-foreground hover:bg-foreground hover:text-background"
          >
            Contact me
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>

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
        </ul>
      </div>
    </footer>
  );
}
