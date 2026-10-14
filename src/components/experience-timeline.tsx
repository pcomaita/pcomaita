import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { EXT } from "@/components/site";
import { experiences } from "@/data/experience";
import { profile } from "@/data/projects";

/** Width of the date column and the gap before the line, in px (kept in sync with the classes below). */
const DATE_COL = 96;
const GAP = 20;
/** Vertical center of each entry's station marker, from the top of its row (top-[9px] + half of size-2). */
const STATION_Y = 13;
/** The date switches slightly before the dot lands on the station, so the change reads as "arriving". */
const LEAD = 24;
/** Follow factor of the dot per frame: lower = softer, more "motion design" easing. */
const EASE = 0.14;

/**
 * Experience timeline driven by scroll:
 * - one cyan dot travels down the line as the visitor scrolls;
 * - the entry the dot has reached gets its date highlighted (cyan, larger);
 * - dates are sticky, so the active one stays next to its entry while it scrolls.
 * Desktop: the list scrolls inside a fixed-height area. Mobile: the page scrolls.
 */
export function ExperienceTimeline() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLOListElement>(null);
  const dotRef = useRef<HTMLSpanElement>(null);
  const rowRefs = useRef<(HTMLLIElement | null)[]>([]);
  const activeRef = useRef(0);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const scroller = scrollRef.current;
    const list = listRef.current;
    const dot = dotRef.current;
    if (!scroller || !list || !dot) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let stations: number[] = [];
    let current = STATION_Y;
    let target = STATION_Y;
    let raf = 0;

    const measure = () => {
      stations = rowRefs.current.map((li) => (li ? li.offsetTop + STATION_Y : STATION_Y));
    };

    const updateActive = (y: number) => {
      let idx = 0;
      stations.forEach((s, i) => {
        if (y >= s - LEAD) idx = i;
      });
      if (idx !== activeRef.current) {
        activeRef.current = idx;
        setActive(idx);
      }
    };

    const tick = () => {
      current = reduced ? target : current + (target - current) * EASE;
      if (Math.abs(target - current) < 0.25) current = target;
      dot.style.transform = `translate3d(0, ${current - 5}px, 0)`;
      updateActive(current);
      raf = current === target ? 0 : requestAnimationFrame(tick);
    };

    const compute = () => {
      if (stations.length === 0) measure();
      const first = stations[0] ?? STATION_Y;
      const last = stations[stations.length - 1] ?? first;
      const maxScroll = scroller.scrollHeight - scroller.clientHeight;
      const innerScroll = getComputedStyle(scroller).overflowY !== "visible" && maxScroll > 4;
      let y: number;
      if (innerScroll) {
        // Desktop: map the inner scroll range onto the whole line, first entry to last.
        y = first + (scroller.scrollTop / maxScroll) * (last - first);
      } else {
        // Mobile: the dot sits at the middle of the screen while the list passes under it.
        y = window.innerHeight * 0.5 - list.getBoundingClientRect().top;
      }
      target = Math.min(last, Math.max(first, y));
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const onResize = () => {
      measure();
      compute();
    };

    measure();
    current = target = stations[0] ?? STATION_Y;
    compute();

    scroller.addEventListener("scroll", compute, { passive: true });
    window.addEventListener("scroll", compute, { passive: true });
    window.addEventListener("resize", onResize);
    const ro = new ResizeObserver(onResize);
    ro.observe(list);

    return () => {
      scroller.removeEventListener("scroll", compute);
      window.removeEventListener("scroll", compute);
      window.removeEventListener("resize", onResize);
      ro.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const last = experiences.length - 1;

  return (
    <div>
      <p className="text-[12px] tracking-[0.35em] uppercase text-primary">Career</p>
      <h2 className="mt-4 font-display text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
        Experience
      </h2>

      <div className="relative mt-8">
        <div
          ref={scrollRef}
          tabIndex={0}
          aria-label="Experience timeline (scrollable)"
          className="exp-scroll rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring lg:max-h-[360px] lg:overflow-y-auto lg:overscroll-contain lg:pr-3 lg:[mask-image:linear-gradient(to_bottom,black_calc(100%-48px),transparent)]"
        >
          <ol ref={listRef} className="relative lg:pb-12">
            {/* Travelling dot */}
            <span
              ref={dotRef}
              aria-hidden="true"
              className="pointer-events-none absolute top-0 z-20 size-[10px] rounded-full bg-primary will-change-transform"
              style={{
                left: DATE_COL + GAP - 5,
                transform: `translate3d(0, ${STATION_Y - 5}px, 0)`,
                boxShadow:
                  "0 0 0 4px color-mix(in oklab, var(--primary) 22%, transparent), 0 0 14px var(--primary)",
              }}
            />

            {experiences.map((xp, i) => {
              const on = i === active;
              const passed = i < active;
              return (
                <li
                  key={`${xp.company}-${xp.period}`}
                  ref={(el) => {
                    rowRefs.current[i] = el;
                  }}
                  aria-current={on ? "step" : undefined}
                  className="grid gap-x-5"
                  style={{ gridTemplateColumns: `${DATE_COL}px minmax(0, 1fr)` }}
                >
                  <p className="about-bg sticky top-16 z-10 self-start pb-3 pt-1 lg:top-0">
                    <span
                      className={`block origin-top-left text-[11px] leading-[1.6] tracking-[0.16em] uppercase transition-[color,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        on ? "scale-[1.22] text-primary" : "scale-100 text-muted-foreground"
                      }`}
                    >
                      {xp.period}
                    </span>
                  </p>

                  <div className={`relative border-l border-border pl-5 ${i < last ? "pb-8" : ""}`}>
                    <span
                      aria-hidden="true"
                      className={`absolute -left-[4.5px] top-[9px] size-2 rounded-full border bg-background transition-colors duration-500 ${
                        on || passed ? "border-primary/70" : "border-border"
                      }`}
                    />
                    <h3
                      className={`text-[16px] font-normal leading-snug transition-colors duration-500 ${
                        on ? "text-foreground" : "text-foreground/80"
                      }`}
                    >
                      {xp.role}
                      <span className="text-muted-foreground"> · </span>
                      {xp.companyUrl ? (
                        <a
                          href={xp.companyUrl}
                          {...EXT}
                          className="underline-offset-4 transition-colors duration-300 hover:text-primary hover:underline"
                        >
                          {xp.company}
                        </a>
                      ) : (
                        xp.company
                      )}
                    </h3>
                    <p className="mt-0.5 text-[13px] font-light text-muted-foreground">{xp.meta}</p>
                    <p className="mt-2 text-[14px] font-light leading-relaxed text-foreground/70">
                      {xp.summary}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>

      <a
        href={profile.linkedinUrl}
        {...EXT}
        className="group mt-8 inline-flex items-center gap-1.5 text-[12px] tracking-[0.14em] uppercase text-muted-foreground transition-colors duration-300 hover:text-primary"
      >
        Full profile on LinkedIn
        <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </a>
    </div>
  );
}
