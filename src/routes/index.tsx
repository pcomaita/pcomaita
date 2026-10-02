import { useEffect, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowDown,
  ArrowUpRight,
  Dribbble,
  Instagram,
  Linkedin,
  Play,
  Twitter,
  X,
} from "lucide-react";
import { HeroScene } from "@/components/HeroScene";
import { Reveal } from "@/components/Reveal";
import workParfum from "@/assets/work-parfum.jpg";
import workSneaker from "@/assets/work-sneaker.jpg";
import workWatch from "@/assets/work-watch.jpg";
import workMotion from "@/assets/work-motion.jpg";
import workNebula from "@/assets/work-nebula.jpg";
import workHeadphones from "@/assets/work-headphones.jpg";
import portrait from "@/assets/portrait.jpg";

export const Route = createFileRoute("/")({
  ssr: false, // WebGL hero canvas — client-only
  head: () => ({
    meta: [
      { title: "Paul Comaïta — 3D Artist & Art Director" },
      {
        name: "description",
        content:
          "Publicité, motion graphics et animation produit — découvrez l'univers 3D de Paul Comaïta.",
      },
      { property: "og:title", content: "Paul Comaïta — 3D Artist & Art Director" },
      {
        property: "og:description",
        content:
          "Publicité, motion graphics et animation produit — découvrez l'univers 3D de Paul Comaïta.",
      },
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

const CATEGORIES = [
  "Tous",
  "Advertising",
  "Product Animation",
  "Motion Graphics",
  "CG/Cinematic",
] as const;
type Category = (typeof CATEGORIES)[number];

interface Project {
  title: string;
  category: Exclude<Category, "Tous">;
  year: string;
  image: string;
  description: string;
  context: string;
  tools: string[];
  isVideo?: boolean;
}

const PROJECTS: Project[] = [
  {
    title: "Vélora Paris",
    category: "Advertising",
    year: "2026",
    image: workParfum,
    description: "Film publicitaire produit pour un parfum de niche",
    context:
      "Film de lancement pour la nouvelle fragrance de Vélora Paris. Rendu entièrement en 3D — flacon, liquides et matières — avec une direction artistique lumineuse pensée pour les réseaux sociaux et le cinéma.",
    tools: ["Blender", "Octane Render", "After Effects"],
  },
  {
    title: "Liquid Chrome",
    category: "Motion Graphics",
    year: "2025",
    image: workMotion,
    description: "Exploration de chrome liquide et simulation de fluides",
    context:
      "Pièce motion design personnelle explorant le chrome liquide et les simulations de fluides. Cycle complet : simulation Houdini, lookdev, éclairage et compositing.",
    tools: ["Houdini", "Cinema 4D", "Redshift", "Nuke"],
    isVideo: true,
  },
  {
    title: "Pulse Watch",
    category: "Product Animation",
    year: "2025",
    image: workWatch,
    description: "Animation produit macro pour une montre connectée",
    context:
      "Animation produit pour le lancement d'une montre connectée : vues macro sur les matériaux, éclaté du boîtier et mise en scène du cadran, déclinée en formats 16:9 et 9:16.",
    tools: ["Blender", "Cycles", "After Effects"],
    isVideo: true,
  },
  {
    title: "Kinetic X1",
    category: "Advertising",
    year: "2024",
    image: workSneaker,
    description: "Campagne sneakers — key visuals & boucles sociales",
    context:
      "Campagne publicitaire pour une sneaker en édition limitée. Key visuals et boucles animées pour les réseaux sociaux, à partir du scan 3D du produit réel.",
    tools: ["Cinema 4D", "Octane Render", "Nuke"],
  },
  {
    title: "Nébula",
    category: "CG/Cinematic",
    year: "2025",
    image: workNebula,
    description: "Court-métrage CG — chrome, brume et lumière cyan",
    context:
      "Exploration cinématographique personnelle : nébuleuse de chrome liquide traversée de brume lumineuse. Rendu en résolution 4K avec grading filmique.",
    tools: ["Houdini", "Karma", "DaVinci Resolve"],
    isVideo: true,
  },
  {
    title: "Drift Audio",
    category: "Product Animation",
    year: "2024",
    image: workHeadphones,
    description: "Film produit pour un casque audio premium",
    context:
      "Film d'animation produit pour un casque sans fil haut de gamme : rotation studio, focus matériaux et détail des mousses, pensé pour l'e-commerce et la publicité en ligne.",
    tools: ["Blender", "Octane Render", "After Effects"],
  },
];

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
          3D Studio — Publicité · Motion · Animation
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
            Voir le portfolio
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

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={`Projet ${project.title}`}
    >
      <div
        className="absolute inset-0 animate-in fade-in duration-300 bg-background/85 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="animate-in fade-in zoom-in-95 duration-300 shadow-soft relative max-h-full w-full max-w-3xl overflow-y-auto rounded-lg border border-border/60 bg-surface">
        <button
          onClick={onClose}
          aria-label="Fermer"
          className="absolute right-4 top-4 z-10 flex size-9 items-center justify-center rounded-full border border-border bg-background/70 text-foreground backdrop-blur-sm transition-colors duration-300 hover:border-primary/50 hover:text-primary"
        >
          <X className="size-4" />
        </button>

        <div className="relative aspect-video overflow-hidden">
          <img
            src={project.image}
            alt={`${project.title} — ${project.category}`}
            width={1280}
            height={720}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />
        </div>

        <div className="px-6 pb-8 pt-4 sm:px-8">
          <p className="text-[11px] tracking-[0.3em] uppercase text-primary">
            {project.category} · {project.year}
          </p>
          <h3 className="mt-3 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl">
            {project.title}
          </h3>
          <p className="mt-4 max-w-2xl text-sm font-light leading-relaxed text-muted-foreground sm:text-base">
            {project.context}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {project.tools.map((tool) => (
              <span
                key={tool}
                className="rounded-full border border-border bg-background px-3.5 py-1.5 text-[12px] font-light text-muted-foreground"
              >
                {tool}
              </span>
            ))}
          </div>

          <a
            href="#contact"
            onClick={onClose}
            className="group mt-8 inline-flex items-center gap-2.5 rounded-full bg-foreground px-6 py-2.5 text-sm font-medium tracking-wide text-background transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
          >
            Discuter d&apos;un projet similaire
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </div>
  );
}

function Portfolio() {
  const [activeCategory, setActiveCategory] = useState<Category>("Tous");
  const [selected, setSelected] = useState<Project | null>(null);

  const visible =
    activeCategory === "Tous"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeCategory);

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
                Projets sélectionnés
              </h2>
            </div>
            <p className="hidden max-w-xs text-sm font-light text-muted-foreground md:block">
              Campagnes publicitaires, films produits et explorations motion —
              du storyboard au rendu final.
            </p>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-12 flex flex-wrap gap-2.5" role="group" aria-label="Filtres de projets">
            {CATEGORIES.map((category) => {
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
            <Reveal key={project.title} delay={(i % 3) * 100}>
              <button
                onClick={() => setSelected(project)}
                className="group block h-full w-full overflow-hidden rounded-lg border border-border/60 bg-surface text-left shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:bg-surface-raised"
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={project.image}
                    alt={`${project.title} — ${project.category}`}
                    width={1280}
                    height={720}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent opacity-80" />
                  <span className="absolute inset-0 flex items-center justify-center bg-background/30 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100">
                    <span className="flex items-center gap-2 rounded-full border border-border/60 bg-background/70 px-4 py-2 text-[11px] tracking-[0.16em] uppercase text-foreground">
                      {project.isVideo ? (
                        <Play className="size-3.5" />
                      ) : (
                        <ArrowUpRight className="size-3.5" />
                      )}
                      {project.isVideo ? "Voir la vidéo" : "Voir le projet"}
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
                    {project.description}
                  </p>
                </div>
              </button>
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
              src={portrait}
              alt="Paul Comaïta"
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
            À propos
          </p>
          <h2 className="mt-4 font-display text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
            Qui suis-je ?
          </h2>
          <p className="mt-8 max-w-[620px] text-[17px] font-light leading-[1.8] text-foreground/75">
            Je suis artiste 3D spécialisé en publicité et direction artistique.
            Passionné par la création d&apos;images immersives et la narration
            visuelle, j&apos;explore le potentiel de la 3D dans la publicité,
            la motion graphics et l&apos;animation produit.
          </p>
          <p className="mt-6 text-[15px] font-light tracking-wide text-muted-foreground">
            Master en 3D Animation &amp; Production — IIM
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
            Donnons vie à votre
            <br />
            prochaine campagne
          </h2>
          <p className="mx-auto mt-6 max-w-md text-base font-light text-muted-foreground">
            Disponible pour des collaborations en publicité, motion design et
            animation produit.
          </p>
          <a
            href="mailto:hello@paulcomaita.com"
            className="mt-10 inline-flex items-center gap-3 rounded-full bg-primary px-8 py-3.5 text-sm font-medium tracking-wide text-primary-foreground transition-all hover:opacity-90"
          >
            hello@paulcomaita.com
            <ArrowUpRight className="size-4" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  const socials = [
    { label: "Instagram", href: "https://instagram.com", Icon: Instagram },
    { label: "Twitter", href: "https://twitter.com", Icon: Twitter },
    { label: "LinkedIn", href: "https://linkedin.com", Icon: Linkedin },
    { label: "Dribbble", href: "https://dribbble.com", Icon: Dribbble },
  ];
  return (
    <footer className="w-full border-t border-border/60">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-6 px-6 py-10 sm:flex-row lg:px-10">
        <p className="text-[13px] font-light text-muted-foreground">
          © 2026 Paul Comaïta — Tous droits réservés
        </p>
        <ul className="flex items-center gap-5">
          {socials.map(({ label, href, Icon }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
              >
                <Icon className="size-4" />
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
