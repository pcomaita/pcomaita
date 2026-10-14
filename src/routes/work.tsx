import { useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import { allProjectsByDate } from "@/data/projects";
import { Contact, Footer, ProjectGrid, SiteNav } from "@/components/site";

const SUBTITLE =
  "Advertising, product films, automotive and cinematic work — from concept to final render.";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title: "All projects — Paul Comaïta" },
      { name: "description", content: SUBTITLE },
      { property: "og:title", content: "All projects — Paul Comaïta" },
      { property: "og:description", content: SUBTITLE },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: WorkPage,
});

function WorkPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen w-full bg-background text-foreground">
      <SiteNav />
      <main>
        <section className="w-full">
          <div className="mx-auto w-full max-w-7xl px-6 pb-28 pt-40 lg:px-10 lg:pb-36 lg:pt-48">
            <Reveal>
              <p className="text-[12px] tracking-[0.35em] uppercase text-primary">Work</p>
              <h1 className="mt-4 font-display text-4xl font-medium tracking-tight text-foreground sm:text-5xl">
                All projects
              </h1>
              <p className="mt-5 max-w-xl text-sm font-light text-muted-foreground sm:text-base">
                {SUBTITLE}
              </p>
            </Reveal>
            <ProjectGrid items={allProjectsByDate} columns={3} withFilters />
          </div>
        </section>
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
