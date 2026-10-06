import { useEffect, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowDown,
  ArrowUpRight,
  Play,
  X,
} from "lucide-react";
import { HeroScene } from "@/components/HeroScene";
import { Reveal } from "@/components/Reveal";
import {
  categories,
  profile,
  projects,
  type Project,
  type ProjectCategory,
  type ProjectClient,
} from "@/data/projects";

const DESCRIPTION =
  "Advertising, motion graphics and product animation — explore the 3D work of Paul Comaïta.";

export const Route = createFileRoute("/")({
  ssr: false, // WebGL hero canvas — client-only
  head: () => ({
    meta: [
      { title: "Paul Comaïta — 3D Artist & Art Director" },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: "Paul Comaïta — 3D Artist & Art Director" },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

type Filter = "All" | ProjectCategory;
const FILTERS: Filter[] = ["All", ...categories];

const EXT = { target: "_blank", rel: "noopener noreferrer" } as const;

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

const DISCIPLINES = [
  "3D Modeling",
  "Texturing",
  "Lighting",
  "Compositing",
  "Motion Graphics",
  "Art Direction",
  "Product Animation",
];

const TOOLS = [
  { name: "Blender", level: 95 },
  { name: "DaVinci Resolve", level: 90 },
  { name: "Photoshop", level: 88 },
  { name: "Nuke", level: 85 },
];

function SiteNav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-md">
      <nav className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6 lg:px-10">
        <a
          href="#home"
          className="font-display text-sm font-medium tracking-[0.18em] uppercase text-foreground"
        >
          Paul Comaïta<span className="text-primary">.</span>
        </a>
        <ul className="flex items-center gap-8">
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
            <a
              href="#contact"
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

function Hero() {
  return (
    <section
      id="home"
      className="grain relative flex min-h-screen w-full items-center justify-center overflow-hidden"
    >
      <HeroScene />
      {/* Soft vignette so type stays legible over the 3D element */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,var(--color-background)_78%)]" />

      <div className="pointer-events-none relative z-10 flex w-full max-w-5xl flex-col items-center px-6 text-center">
        <p
          className="hero-rise text-[12px] font-normal tracking-[0.35em] uppercase text-primary"
          style={{ animationDelay: "100ms" }}
        >
          3D Studio — Advertising · Motion · Animation
        </p>
        <h1
          className="hero-rise mt-6 font-display text-[clamp(4.5rem,12vw,8rem)] leading-[0.95] font-medium tracking-tight text-foreground"
          style={{ animationDelay: "220ms" }}
        >
          Paul Comaïta
        </h1>
        <p
          className="hero-rise mt-6 max-w-xl text-base font-light tracking-wide text-muted-foreground sm:text-lg"
          style={{ animationDelay: "360ms" }}
        >
          3D Artist &amp; Art Director — Blender, Motion &amp; Cinematic
        </p>
        <div
          className="hero-rise pointer-events-auto mt-10"
          style={{ animationDelay: "500ms" }}
        >
          <a
            href="#work"
            className="group inline-flex items-center gap-3 rounded-full bg-foreground px-7 py-3 text-sm font-medium tracking-wide text-background transition-all hover:bg-primary hover:text-primary-foreground"
          >
            View the work
            <ArrowDown className="size-4 transition-transform group-hover:translate-y-0.5" />
          </a>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3">
        <span className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
          Scroll
        </span>
        <span className="scroll-hint block h-12 w-px bg-primary/70" />
      </div>
    </section>
  );
}

function ProjectModal({
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

          {project.images.length > 0 && (
            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
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

          <p className="mt-6 max-w-2xl text-sm font-light leading-relaxed text-muted-foreground sm:text-base">
            {project.description}
          </p>
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

function Portfolio() {
  const [activeCategory, setActiveCategory] = useState<Filter>("All");
  const [selected, setSelected] = useState<Project | null>(null);

  const visible =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="work" className="w-full border-t border-border/60">
      <div className="mx-auto w-full max-w-7xl px-6 py-28 lg:px-10 lg:py-36">
        <Reveal>
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="text-[12px] tracking-[0.35em] uppercase text-primary">
                Work
              </p>
              <h2 className="mt-4 font-display text-4xl font-medium tracking-tight text-foreground sm:text-5xl">
                Selected projects
              </h2>
            </div>
            <p className="hidden max-w-xs text-sm font-light text-muted-foreground md:block">
              Advertising, product films, automotive and cinematic work —
              from concept to final render.
            </p>
          </div>
        </Reveal>

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

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((project, i) => (
            <Reveal key={project.id} delay={(i % 3) * 100}>
              <div
                role="button"
                tabIndex={0}
                onClick={() => setSelected(project)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelected(project);
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
            </Reveal>
          ))}
        </div>
      </div>

      {selected && (
        <ProjectModal project={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  );
}

function About() {
  return (
    <section
      id="about"
      className="w-full border-t border-border/60 bg-surface/40"
    >
      <div className="mx-auto grid w-full max-w-5xl grid-cols-1 items-center gap-12 px-6 py-28 sm:gap-16 lg:grid-cols-[300px_1fr] lg:gap-24 lg:py-36">
        <Reveal className="justify-self-center lg:justify-self-start">
          <div className="relative">
            <img
              src={profile.avatar}
              alt={profile.fullName}
              width={300}
              height={360}
              loading="lazy"
              className="aspect-[5/6] w-[260px] rounded-2xl object-cover grayscale-[35%] ring-1 ring-primary/50 sm:w-[300px]"
            />
            <span
              className="absolute -inset-3 -z-10 rounded-3xl bg-primary/10 blur-2xl"
              aria-hidden="true"
            />
          </div>
        </Reveal>

        <Reveal delay={120}>
          <p className="text-[12px] tracking-[0.35em] uppercase text-primary">
            About
          </p>
          <h2 className="mt-4 font-display text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
            Who am I?
          </h2>
          <p className="mt-8 max-w-[620px] text-[17px] font-light leading-[1.8] text-foreground/75">
            I&apos;m a 3D artist specialising in advertising and art direction.
            Passionate about creating immersive images and visual storytelling,
            I explore the potential of 3D in advertising, motion graphics and
            product animation.
          </p>
          <p className="mt-6 text-[15px] font-light tracking-wide text-muted-foreground">
            Master&apos;s in 3D Animation &amp; Production — IIM
          </p>
        </Reveal>
      </div>

      <Expertise />
    </section>
  );
}

function SkillBar({ name, level }: { name: string; level: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref}>
      <div className="flex items-baseline justify-between">
        <span className="text-[15px] font-light text-foreground/90">
          {name}
        </span>
        <span className="text-[13px] font-light tracking-wide text-muted-foreground">
          {level}%
        </span>
      </div>
      <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-border/50">
        <div
          className="h-full rounded-full bg-primary transition-[width] duration-1000 ease-out"
          style={{ width: visible ? `${level}%` : "0%" }}
        />
      </div>
    </div>
  );
}

function Expertise() {
  return (
    <div className="border-t border-border/40 bg-primary/[0.04]">
      <div className="mx-auto w-full max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
        <Reveal>
          <p className="text-[12px] tracking-[0.35em] uppercase text-primary">
            Expertise
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-24">
          <Reveal delay={120}>
            <h3 className="text-[11px] tracking-[0.3em] uppercase text-muted-foreground">
              Disciplines
            </h3>
            <ul className="mt-7">
              {DISCIPLINES.map((discipline) => (
                <li
                  key={discipline}
                  className="group flex items-center gap-5 border-b border-border/50 py-4 text-[15px] font-light text-foreground/90 transition-colors duration-300 hover:text-primary"
                >
                  <span
                    className="h-px w-5 shrink-0 bg-primary/60 transition-all duration-300 group-hover:w-8"
                    aria-hidden="true"
                  />
                  {discipline}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={240}>
            <h3 className="text-[11px] tracking-[0.3em] uppercase text-muted-foreground">
              Tools &amp; Software
            </h3>
            <ul className="mt-7 space-y-8">
              {TOOLS.map((tool) => (
                <li key={tool.name}>
                  <SkillBar name={tool.name} level={tool.level} />
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </div>
  );
}

const CONTACT_SOCIALS = [
  { label: "ArtStation", href: profile.artstationUrl },
  { label: "LinkedIn", href: profile.linkedinUrl },
  { label: "Website", href: profile.websiteUrl },
];

function Contact() {
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
            href="mailto:hello@paulcomaita.com"
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

function Footer() {
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

function Index() {
  return (
    <div className="min-h-screen w-full bg-background text-foreground">
      <SiteNav />
      <main>
        <Hero />
        <Portfolio />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
