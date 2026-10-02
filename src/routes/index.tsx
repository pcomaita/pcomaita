import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowDown,
  ArrowUpRight,
  Dribbble,
  Instagram,
  Linkedin,
  Twitter,
} from "lucide-react";
import { HeroScene } from "@/components/HeroScene";
import { Reveal } from "@/components/Reveal";
import workParfum from "@/assets/work-parfum.jpg";
import workSneaker from "@/assets/work-sneaker.jpg";
import workWatch from "@/assets/work-watch.jpg";
import workMotion from "@/assets/work-motion.jpg";
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

const PROJECTS = [
  {
    title: "Vélora Paris",
    category: "Publicité produit",
    year: "2026",
    image: workParfum,
  },
  {
    title: "Liquid Chrome",
    category: "Motion design",
    year: "2025",
    image: workMotion,
  },
  {
    title: "Pulse Watch",
    category: "Animation produit",
    year: "2025",
    image: workWatch,
  },
  {
    title: "Kinetic X1",
    category: "Campagne sneakers",
    year: "2024",
    image: workSneaker,
  },
];

const SKILLS = [
  "Blender",
  "Cinema 4D",
  "Houdini",
  "After Effects",
  "Octane Render",
  "Nuke",
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

function Work() {
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

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2">
          {PROJECTS.map((project, i) => (
            <Reveal key={project.title} delay={(i % 2) * 120}>
              <a
                href="#contact"
                className="group block overflow-hidden rounded-lg border border-border/60 bg-surface"
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
                  <span className="absolute right-5 top-5 flex size-10 items-center justify-center rounded-full border border-foreground/20 bg-background/40 text-foreground opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                    <ArrowUpRight className="size-4" />
                  </span>
                </div>
                <div className="flex items-baseline justify-between px-6 py-5">
                  <div>
                    <h3 className="font-display text-lg font-medium text-foreground">
                      {project.title}
                    </h3>
                    <p className="mt-1 text-sm font-light text-muted-foreground">
                      {project.category}
                    </p>
                  </div>
                  <span className="text-sm font-light text-muted-foreground">
                    {project.year}
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section
      id="about"
      className="w-full border-t border-border/60 bg-surface/40"
    >
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-16 px-6 py-28 lg:grid-cols-[2fr_3fr] lg:px-10 lg:py-36">
        <Reveal>
          <div className="relative mx-auto max-w-sm lg:max-w-none">
            <div className="absolute -inset-3 rounded-lg border border-primary/25" />
            <img
              src={portrait}
              alt="Paul Comaïta dans son studio"
              width={896}
              height={1152}
              loading="lazy"
              className="relative w-full rounded-lg object-cover grayscale-[35%]"
            />
          </div>
        </Reveal>

        <div>
          <Reveal>
            <p className="text-[12px] tracking-[0.35em] uppercase text-primary">
              About
            </p>
            <h2 className="mt-4 font-display text-4xl font-medium tracking-tight text-foreground sm:text-5xl">
              La 3D au service de l&apos;image de marque
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-8 max-w-2xl text-base font-light leading-relaxed text-muted-foreground">
              Artiste 3D et directeur artistique, je conçois des images de
              synthèse qui donnent aux marques une présence cinématographique.
              De la publicité produit aux films motion design, je pilote chaque
              étape — modélisation, lookdev, éclairage, animation et compositing
              — avec une obsession : le détail qui fait mouche.
            </p>
            <p className="mt-5 max-w-2xl text-base font-light leading-relaxed text-muted-foreground">
              Basé à Paris, je collabore avec des studios, des agences et des
              marques en direct, en France et à l&apos;international.
            </p>
          </Reveal>

          <Reveal delay={200}>
            <ul className="mt-10 flex flex-wrap gap-2.5">
              {SKILLS.map((skill) => (
                <li
                  key={skill}
                  className="rounded-full border border-border bg-background px-4 py-1.5 text-[13px] font-light text-muted-foreground"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={280}>
            <dl className="mt-12 grid grid-cols-3 gap-6 border-t border-border/60 pt-10">
              {[
                { value: "8+", label: "Années d'expérience" },
                { value: "120+", label: "Projets livrés" },
                { value: "40+", label: "Marques accompagnées" },
              ].map((stat) => (
                <div key={stat.label}>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd className="font-display text-3xl font-medium text-foreground sm:text-4xl">
                    {stat.value}
                  </dd>
                  <dd className="mt-2 text-[13px] font-light text-muted-foreground">
                    {stat.label}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
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
        <Work />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
