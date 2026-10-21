import { useState } from "react";
import { Reveal } from "@/components/Reveal";
import { Link } from "@tanstack/react-router";
import { BLENDER_PATH, DAVINCI_RESOLVE_PATH, NUKE_PATH } from "@/components/tool-icon-paths";
import { projects } from "@/data/projects";

type StepId = "modeling" | "texturing" | "animation" | "lighting" | "compositing" | "editing";

const STEPS: { id: StepId; label: string }[] = [
  { id: "modeling", label: "Modeling" },
  { id: "texturing", label: "Texturing & Shading" },
  { id: "animation", label: "Animation" },
  { id: "lighting", label: "Lighting & Rendering" },
  { id: "compositing", label: "Compositing" },
  { id: "editing", label: "Editing & Grading" },
];

interface Tool {
  /** Must match the names used in projects[].software */
  name: string;
  role: string;
  steps: StepId[];
  description: string;
  icon: { path: string } | { letters: string };
}

const TOOLS: Tool[] = [
  {
    name: "Blender",
    role: "Main 3D tool",
    steps: ["modeling", "texturing", "animation", "lighting"],
    description:
      "Modeling, shading, animation, lighting and rendering. Most projects on this site are built and rendered in Blender.",
    icon: { path: BLENDER_PATH },
  },
  {
    name: "Photoshop",
    role: "Textures & stills",
    steps: ["texturing"],
    description: "Texture work and final retouching of still renders.",
    icon: { letters: "Ps" },
  },
  {
    name: "Nuke",
    role: "Compositing",
    steps: ["compositing"],
    description: "Compositing render passes into the final image.",
    icon: { path: NUKE_PATH },
  },
  {
    name: "DaVinci Resolve",
    role: "Edit & grade",
    steps: ["editing"],
    description: "Editing, color grading and final delivery of my films.",
    icon: { path: DAVINCI_RESOLVE_PATH },
  },
];

function ToolIcon({ icon }: { icon: Tool["icon"] }) {
  if ("path" in icon) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="size-9 fill-current">
        <path d={icon.path} />
      </svg>
    );
  }
  return (
    <span
      aria-hidden="true"
      className="flex size-9 items-center justify-center rounded-[7px] border-[1.5px] border-current font-display text-[15px] font-semibold tracking-tight"
    >
      {icon.letters}
    </span>
  );
}

export function Expertise() {
  const [active, setActive] = useState<string>("Blender");

  const tool: Tool = TOOLS.find((t) => t.name === active) ?? (TOOLS[0] as Tool);
  const usedIn = projects
    .filter((p) => p.software.includes(tool.name))
    .sort((a, b) => b.year - a.year);

  return (
    <div className="border-t border-border/40 bg-primary/[0.04]">
      <div className="mx-auto w-full max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
        <Reveal>
          <p className="text-[12px] tracking-[0.35em] uppercase text-primary">Expertise</p>
          <h3 className="mt-4 font-display text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
            How I work
          </h3>
          <p className="mt-4 max-w-xl text-[15px] font-light text-muted-foreground">
            One pipeline, four tools — from the first polygon to the final grade.
          </p>
        </Reveal>

        {/* Pipeline */}
        <Reveal delay={120}>
          <ol className="relative mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6 lg:gap-4">
            <span
              aria-hidden="true"
              className="absolute left-0 right-0 top-1/2 hidden h-px -translate-y-1/2 bg-border lg:block"
            />
            {STEPS.map((step, i) => {
              const on = tool.steps.includes(step.id);
              return (
                <li
                  key={step.id}
                  className={`relative rounded-lg border px-4 py-3.5 transition-all duration-200 ${
                    on
                      ? "border-primary/70 bg-background text-foreground"
                      : "border-border/70 bg-background text-muted-foreground/55"
                  }`}
                >
                  <span
                    className={`block text-[11px] tracking-[0.2em] transition-colors duration-200 ${
                      on ? "text-primary" : "text-muted-foreground/45"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="mt-1 block text-[14px] font-normal leading-snug">
                    {step.label}
                  </span>
                </li>
              );
            })}
          </ol>
          <p className="mt-5 text-[13px] font-light text-muted-foreground">
            Art direction runs through every step — references, framing, light and grade.
          </p>
        </Reveal>

        {/* Tools */}
        <Reveal delay={200}>
          <div
            className="mt-12 grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4"
            role="group"
            aria-label="Tools — select one to see where it fits in the pipeline"
          >
            {TOOLS.map((t) => {
              const on = t.name === tool.name;
              return (
                <button
                  key={t.name}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setActive(t.name)}
                  onMouseEnter={() => setActive(t.name)}
                  onFocus={() => setActive(t.name)}
                  className={`flex items-center gap-4 rounded-lg border p-4 text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:p-5 ${
                    on
                      ? "border-primary bg-primary/[0.07] text-foreground"
                      : "border-border bg-surface text-muted-foreground hover:border-primary/40 hover:text-foreground"
                  }`}
                >
                  <span className={on ? "text-foreground" : ""}>
                    <ToolIcon icon={t.icon} />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-display text-[15px] font-medium text-foreground sm:text-base">
                      {t.name}
                    </span>
                    <span className="mt-0.5 block text-[12px] font-light tracking-wide">
                      {t.role}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* Detail */}
          <div
            aria-live="polite"
            className="mt-4 rounded-lg border border-border bg-surface px-5 py-5 sm:px-6"
          >
            <p className="text-[15px] font-light leading-relaxed text-foreground/85">
              <span className="font-normal text-foreground">{tool.name}</span> — {tool.description}
            </p>
            {usedIn.length > 0 && (
              <p className="mt-3 flex flex-wrap items-baseline gap-x-1.5 gap-y-1 text-[13px] font-light text-muted-foreground">
                <span className="tracking-wide">Used in:</span>
                {usedIn.map((p, i) => (
                  <span key={p.slug}>
                    <Link
                      to="/work/$slug"
                      params={{ slug: p.slug }}
                      className="text-foreground/85 underline-offset-4 transition-colors duration-200 hover:text-primary hover:underline focus-visible:text-primary focus-visible:underline focus-visible:outline-none"
                    >
                      {p.title}
                    </Link>
                    {i < usedIn.length - 1 && <span aria-hidden="true">,</span>}
                  </span>
                ))}
              </p>
            )}
          </div>
        </Reveal>
      </div>
    </div>
  );
}
