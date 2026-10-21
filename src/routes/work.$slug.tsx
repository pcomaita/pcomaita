import { useEffect } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, ArrowUpRight, Play } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { ClientLine, Contact, EXT, Footer, SiteNav } from "@/components/site";
import { getProject, projects, type CaseStudy, type Project } from "@/data/projects";

export const Route = createFileRoute("/work/$slug")({
  loader: ({ params }) => {
    const project = getProject(params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const { project } = loaderData;
    const title = `${project.title}: ${project.subtitle} — Paul Comaïta`;
    const description = project.caseStudy.context.split(". ")[0] + ".";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:image", content: project.cover },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: CaseStudyPage,
});

const SECTIONS: { key: keyof CaseStudy; label: string }[] = [
  { key: "context", label: "Context" },
  { key: "approach", label: "Approach" },
  { key: "result", label: "Result" },
  { key: "learnings", label: "Learnings" },
];

function HeroMedia({ project }: { project: Project }) {
  const video = project.video;
  if (video?.stable) {
    return (
      <iframe
        src={video.embedUrl}
        title={`${project.title} — video`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="h-full w-full"
      />
    );
  }
  return (
    <>
      <img
        src={video ? video.poster : project.cover}
        alt={`${project.title} — ${project.subtitle}`}
        className="h-full w-full object-cover"
      />
      {video && (
        <a
          href={project.artstationUrl}
          {...EXT}
          className="absolute inset-0 flex items-center justify-center bg-background/20 transition-colors duration-300 hover:bg-background/35"
        >
          <span className="flex items-center gap-2 rounded-full border border-border/60 bg-background/75 px-4 py-2 text-[11px] tracking-[0.16em] uppercase text-foreground backdrop-blur-sm">
            <Play className="size-3.5" />
            Watch on ArtStation
          </span>
        </a>
      )}
    </>
  );
}

function CaseStudyPage() {
  const { project } = Route.useLoaderData();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [project.slug]);

  const index = projects.findIndex((p) => p.slug === project.slug);
  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];

  const heroSrc = project.video?.stable
    ? null
    : project.video
      ? project.video.poster
      : project.cover;
  const gallery = project.images.filter((src) => src !== heroSrc);

  return (
    <div className="min-h-screen w-full bg-background text-foreground">
      <SiteNav />
      <main>
        <article className="mx-auto w-full max-w-6xl px-6 pb-24 pt-32 lg:px-10 lg:pb-32 lg:pt-40">
          <Reveal>
            <a
              href="/#work"
              className="group inline-flex items-center gap-2 text-[12px] tracking-[0.16em] uppercase text-muted-foreground transition-colors hover:text-primary"
            >
              <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
              Work
            </a>

            <p className="mt-10 text-[12px] tracking-[0.3em] uppercase text-primary">
              {project.projectType} · {project.year}
            </p>
            <h1 className="mt-4 font-display text-4xl font-medium leading-[1.05] tracking-tight text-foreground sm:text-6xl">
              {project.title}
              <span className="block text-muted-foreground">{project.subtitle}</span>
            </h1>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              {project.client && <ClientLine client={project.client} />}
              <div className="flex flex-wrap gap-2">
                {project.software.map((tool) => (
                  <span
                    key={tool}
                    className="rounded-full border border-border bg-surface px-3 py-1 text-[12px] font-light text-muted-foreground"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="relative mt-12 aspect-video overflow-hidden rounded-lg border border-border/60 bg-surface shadow-soft">
              <HeroMedia project={project} />
            </div>
          </Reveal>

          <div className="mt-16 divide-y divide-border/60 border-y border-border/60 lg:mt-24">
            {SECTIONS.map(({ key, label }, i) => (
              <Reveal key={key}>
                <section className="grid grid-cols-1 gap-3 py-8 sm:py-10 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-12">
                  <h2 className="flex items-baseline gap-3 text-[12px] tracking-[0.3em] uppercase text-muted-foreground">
                    <span className="text-primary">{String(i + 1).padStart(2, "0")}</span>
                    {label}
                  </h2>
                  <p className="max-w-2xl text-[17px] font-light leading-[1.75] text-foreground/85">
                    {project.caseStudy[key]}
                  </p>
                </section>
              </Reveal>
            ))}
          </div>

          {gallery.length > 0 && (
            <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-24">
              {gallery.map((src, i) => (
                <Reveal key={src} delay={(i % 2) * 100}>
                  <img
                    src={src}
                    alt={`${project.title} — image ${i + 1}`}
                    loading="lazy"
                    className="w-full rounded-lg border border-border/60 object-cover"
                  />
                </Reveal>
              ))}
            </div>
          )}

          <div className="mt-12">
            <a
              href={project.artstationUrl}
              {...EXT}
              className="group inline-flex items-center gap-2.5 rounded-full bg-foreground px-6 py-2.5 text-sm font-medium tracking-wide text-background transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
            >
              View on ArtStation
              <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>

          {prev && next && (
            <nav
              aria-label="Other case studies"
              className="mt-20 grid grid-cols-1 gap-4 border-t border-border/60 pt-10 sm:grid-cols-2"
            >
              <Link
                to="/work/$slug"
                params={{ slug: prev.slug }}
                className="group rounded-lg border border-border/60 bg-surface px-5 py-5 transition-colors hover:border-primary/40"
              >
                <span className="flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase text-muted-foreground">
                  <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
                  Previous
                </span>
                <span className="mt-2 block font-display text-lg font-medium text-foreground">
                  {prev.title}
                </span>
                <span className="block text-sm font-light text-muted-foreground">
                  {prev.subtitle}
                </span>
              </Link>
              <Link
                to="/work/$slug"
                params={{ slug: next.slug }}
                className="group rounded-lg border border-border/60 bg-surface px-5 py-5 text-right transition-colors hover:border-primary/40"
              >
                <span className="flex items-center justify-end gap-2 text-[11px] tracking-[0.2em] uppercase text-muted-foreground">
                  Next
                  <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
                <span className="mt-2 block font-display text-lg font-medium text-foreground">
                  {next.title}
                </span>
                <span className="block text-sm font-light text-muted-foreground">
                  {next.subtitle}
                </span>
              </Link>
            </nav>
          )}
        </article>
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
