// Projects are loaded from src/data/projects.ts
import { useEffect, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowDown } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { ATMOSPHERES, featuredProjects, profile } from "@/data/projects";
import { Contact, EXT, Footer, ProjectGrid, SiteNav } from "@/components/site";
import { Expertise } from "@/components/expertise";
import { ExperienceTimeline } from "@/components/experience-timeline";

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

function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData =
      "connection" in navigator &&
      Boolean((navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData);
    if (reduced || saveData) return;
    const mobile = window.matchMedia("(max-width: 767px)").matches;
    setVideoSrc(mobile ? "/hero-mobile.mp4" : "/hero-desktop.mp4");
  }, []);

  useEffect(() => {
    if (videoRef.current) videoRef.current.muted = true;
  }, [videoSrc]);

  return (
    <section
      id="home"
      className="theme-dark grain relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-background"
    >
      {/* Poster = first frame of the video, so the switch to the video is invisible */}
      <img
        src="/hero-poster.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      {videoSrc && (
        <video
          ref={videoRef}
          src={videoSrc}
          poster="/hero-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          disablePictureInPicture
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
      )}
      {/* Readability overlay */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 55% at 50% 50%, rgba(10,10,10,0.68) 0%, rgba(10,10,10,0.40) 60%, rgba(10,10,10,0.25) 100%)",
        }}
      />
      {/* Bottom fade into the dark page (hidden in light mode, see styles.css) */}
      <div
        className="hero-fade pointer-events-none absolute inset-0"
        style={{ background: "linear-gradient(to bottom, transparent 70%, oklch(14.5% 0 0) 100%)" }}
      />

      <div className="pointer-events-none relative z-10 flex w-full max-w-5xl flex-col items-center px-6 text-center">
        <p
          className="hero-rise text-[12px] font-normal tracking-[0.35em] uppercase text-primary"
          style={{ animationDelay: "100ms", textShadow: "0 2px 12px rgba(0,0,0,0.6)" }}
        >
          3D Artist — Advertising · Motion · Product
        </p>
        <h1
          className="hero-rise mt-6 font-display text-[clamp(4.5rem,12vw,8rem)] leading-[0.95] font-medium tracking-tight text-foreground"
          style={{ animationDelay: "220ms" }}
        >
          Paul Comaïta
        </h1>
        <p
          className="hero-rise mt-6 max-w-xl text-base font-light tracking-wide text-muted-foreground sm:text-lg"
          style={{ animationDelay: "360ms", textShadow: "0 2px 12px rgba(0,0,0,0.6)" }}
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

function Portfolio() {
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

        <ProjectGrid items={featuredProjects} columns={2} />

      </div>
    </section>
  );
}

function About() {
  return (
    <section
      id="about"
      className="about-bg w-full border-t border-border/60"
    >
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-start gap-12 px-6 py-28 sm:gap-16 lg:grid-cols-[260px_minmax(0,1fr)_minmax(0,1fr)] lg:gap-14 lg:px-10 lg:py-36 xl:gap-20">
        <Reveal className="justify-self-center lg:justify-self-start">
          <div className="relative">
            <img
              src={profile.avatar}
              alt={profile.fullName}
              width={300}
              height={360}
              loading="lazy"
              className="aspect-[5/6] w-[260px] rounded-2xl object-cover grayscale-[35%] ring-1 ring-primary/50 sm:w-[300px] lg:w-[260px]"
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
            About
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
          <p className="mt-4 text-[15px] font-light tracking-wide text-muted-foreground">
            Based in Paris — available for full-time, contract and freelance
            work.
          </p>
          <p className="mt-3 text-[15px] font-light tracking-wide text-muted-foreground">
            I&apos;ve worked with the agency{" "}
            <a
              href={ATMOSPHERES.url}
              {...EXT}
              className="underline-offset-4 transition-colors duration-300 hover:text-primary hover:underline"
            >
              Atmosphères
            </a>{" "}
            on 3D content for the{" "}
            <a
              href={ATMOSPHERES.contextUrl}
              {...EXT}
              className="underline-offset-4 transition-colors duration-300 hover:text-primary hover:underline"
            >
              Microsoft ExpertZone France
            </a>{" "}
            channel.
          </p>
        </Reveal>

        <Reveal delay={240}>
          <ExperienceTimeline />
        </Reveal>
      </div>

      <Expertise />
    </section>
  );
}

function Index() {
  return (
    <div className="min-h-screen w-full bg-background text-foreground">
      <SiteNav overHero />
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
