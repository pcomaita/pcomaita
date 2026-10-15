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
/** Duration of one date-to-date step (desktop), in ms. */
const STEP_DURATION = 700;
/** Dot follow speed when tracking free scroll (mobile), per second. */
const FOLLOW_SPEED = 9;
/** Wheel events closer than this (ms) belong to the same gesture: one gesture = one date. */
const GESTURE_GAP = 220;
/** Each step stops this far above the entry, so the top fade only covers the previous entry. */
const STEP_OFFSET = 24;

const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

/**
 * Experience timeline driven by scroll:
 * - one cyan dot travels down the line as the visitor scrolls, and the line fills behind it;
 * - the entry the dot has reached gets its date highlighted (cyan, larger);
 * - dates are sticky, so the active one stays next to its entry while it scrolls.
 * Desktop: the list moves one date per wheel notch / swipe (list and dot animate together),
 * with no visible scrollbar. Mobile: the page scrolls and the dot follows.
 */
export function ExperienceTimeline() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLOListElement>(null);
  const dotRef = useRef<HTMLSpanElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);
  const rowRefs = useRef<(HTMLLIElement | null)[]>([]);
  const activeRef = useRef(0);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const scroller = scrollRef.current;
    const list = listRef.current;
    const dot = dotRef.current;
    const fill = fillRef.current;
    if (!scroller || !list || !dot || !fill) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const count = experiences.length;
    let stations: number[] = [];
    let rowTops: number[] = [];
    let first = STATION_Y;
    let last = STATION_Y;

    let step = 0; // entry the list is snapped to (desktop)
    let dotY = STATION_Y;
    let dotTarget = STATION_Y; // used when following free scroll (mobile / touch)
    let tween: {
      s0: number;
      s1: number;
      d0: number;
      d1: number;
      t0: number;
      dur: number;
    } | null = null;
    let raf = 0;
    let prev = 0;
    let locked = false; // one step per wheel gesture
    let lastWheel = 0;
    let unlockTimer = 0;
    let idleTimer = 0;

    const maxScroll = () => scroller.scrollHeight - scroller.clientHeight;
    const innerScroll = () => getComputedStyle(scroller).overflowY !== "visible" && maxScroll() > 4;

    const measure = () => {
      // Desktop: leave room under the last entry so every date (even the last) can reach the top.
      const lastRow = rowRefs.current[count - 1];
      if (getComputedStyle(scroller).overflowY !== "visible" && lastRow) {
        list.style.paddingBottom = `${Math.max(48, scroller.clientHeight - lastRow.offsetHeight - STEP_OFFSET)}px`;
      } else list.style.paddingBottom = "";
      rowTops = rowRefs.current.map((li) => (li ? li.offsetTop : 0));
      stations = rowTops.map((t) => t + STATION_Y);
      first = stations[0] ?? STATION_Y;
      last = stations[stations.length - 1] ?? first;
      fill.style.top = `${first}px`;
      fill.style.height = `${Math.max(0, last - first)}px`;
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

    const updateFades = () => {
      const max = maxScroll();
      scroller.style.setProperty("--fade-top", scroller.scrollTop > 2 ? "28px" : "0px");
      scroller.style.setProperty("--fade-bottom", scroller.scrollTop < max - 2 ? "56px" : "0px");
    };

    const render = () => {
      dot.style.transform = `translate3d(0, ${dotY - 5}px, 0)`;
      const p = last > first ? (dotY - first) / (last - first) : 0;
      fill.style.transform = `scaleY(${Math.min(1, Math.max(0, p))})`;
      updateActive(dotY);
    };

    const tick = (now: number) => {
      const dt = prev ? Math.min(0.05, (now - prev) / 1000) : 1 / 60;
      prev = now;
      let moving = false;

      if (tween) {
        const t = tween.dur > 0 ? Math.min(1, (now - tween.t0) / tween.dur) : 1;
        const e = easeInOutCubic(t);
        scroller.scrollTop = tween.s0 + (tween.s1 - tween.s0) * e;
        dotY = tween.d0 + (tween.d1 - tween.d0) * e;
        if (t >= 1) tween = null;
        else moving = true;
      } else {
        const k = reduced ? 1 : 1 - Math.exp(-FOLLOW_SPEED * dt);
        dotY += (dotTarget - dotY) * k;
        if (Math.abs(dotTarget - dotY) < 0.2) dotY = dotTarget;
        else moving = true;
      }

      render();
      if (moving) raf = requestAnimationFrame(tick);
      else {
        raf = 0;
        prev = 0;
      }
    };

    const start = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    /** Desktop: scroll the list and move the dot together, straight to entry i. */
    const goTo = (i: number) => {
      step = Math.max(0, Math.min(count - 1, i));
      const s1 = Math.min(maxScroll(), Math.max(0, (rowTops[step] ?? 0) - STEP_OFFSET));
      const d1 = stations[step] ?? first;
      tween = {
        s0: scroller.scrollTop,
        s1,
        d0: dotY,
        d1,
        t0: performance.now(),
        dur: reduced ? 0 : STEP_DURATION,
      };
      dotTarget = d1;
      start();
    };

    /** Entry closest to the current free-scroll position (used after touch / native scroll). */
    const nearestStep = () => {
      const max = maxScroll();
      const y = first + (max > 0 ? scroller.scrollTop / max : 0) * (last - first);
      let best = 0;
      stations.forEach((s, i) => {
        if (Math.abs(s - y) < Math.abs((stations[best] ?? 0) - y)) best = i;
      });
      return best;
    };

    const compute = () => {
      if (stations.length === 0) measure();
      if (innerScroll()) {
        updateFades();
        if (tween) return; // our own animation is driving the scroll
        // Free scroll (touch, keyboard outside our handler): follow, then snap to the nearest date.
        const max = maxScroll();
        dotTarget = first + (scroller.scrollTop / max) * (last - first);
        window.clearTimeout(idleTimer);
        idleTimer = window.setTimeout(() => {
          if (!tween) goTo(nearestStep());
        }, 140);
        start();
      } else {
        // Mobile: the page scrolls; the dot sits at the middle of the screen.
        const y = window.innerHeight * 0.5 - list.getBoundingClientRect().top;
        dotTarget = Math.min(last, Math.max(first, y));
        start();
      }
    };

    const scheduleUnlock = () => {
      window.clearTimeout(unlockTimer);
      unlockTimer = window.setTimeout(function check() {
        if (!tween && performance.now() - lastWheel >= GESTURE_GAP) locked = false;
        else unlockTimer = window.setTimeout(check, 60);
      }, GESTURE_GAP);
    };

    // Desktop wheel: one notch / one trackpad swipe = one date.
    const onWheel = (e: WheelEvent) => {
      if (!innerScroll() || e.ctrlKey) return;
      const unit = e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? scroller.clientHeight : 1;
      const delta = e.deltaY * unit;
      if (Math.abs(delta) < 2) return;
      const dir = delta > 0 ? 1 : -1;
      const now = performance.now();
      const atEdge = (dir > 0 && step >= count - 1) || (dir < 0 && step <= 0);

      if (locked) {
        // Same gesture (trackpad inertia or fast notches): swallow it, don't skip dates.
        e.preventDefault();
        lastWheel = now;
        scheduleUnlock();
        return;
      }
      if (atEdge) {
        // First/last date reached: hand the wheel back to the page.
        e.preventDefault();
        window.scrollBy({ top: delta });
        return;
      }
      e.preventDefault();
      locked = true;
      lastWheel = now;
      goTo(step + dir);
      scheduleUnlock();
    };

    const onKey = (e: KeyboardEvent) => {
      if (!innerScroll()) return;
      const map: Record<string, number> = {
        ArrowDown: step + 1,
        PageDown: step + 1,
        ArrowUp: step - 1,
        PageUp: step - 1,
        Home: 0,
        End: count - 1,
      };
      const next = map[e.key];
      if (next === undefined || next < 0 || next > count - 1 || next === step) return;
      e.preventDefault();
      goTo(next);
    };

    const onResize = () => {
      measure();
      if (innerScroll()) {
        tween = null;
        scroller.scrollTop = Math.min(maxScroll(), Math.max(0, (rowTops[step] ?? 0) - STEP_OFFSET));
        dotY = dotTarget = stations[step] ?? first;
        updateFades();
        render();
      } else compute();
    };

    measure();
    dotY = dotTarget = first;
    if (innerScroll()) updateFades();
    else compute();
    render();

    scroller.addEventListener("scroll", compute, { passive: true });
    scroller.addEventListener("wheel", onWheel, { passive: false });
    scroller.addEventListener("keydown", onKey);
    window.addEventListener("scroll", compute, { passive: true });
    window.addEventListener("resize", onResize);
    const ro = new ResizeObserver(onResize);
    ro.observe(list);

    return () => {
      scroller.removeEventListener("scroll", compute);
      scroller.removeEventListener("wheel", onWheel);
      scroller.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", compute);
      window.removeEventListener("resize", onResize);
      ro.disconnect();
      window.clearTimeout(unlockTimer);
      window.clearTimeout(idleTimer);
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
          className="exp-scroll rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring lg:max-h-[360px] lg:overflow-y-auto"
        >
          <ol ref={listRef} className="relative">
            {/* Progress: the line fills in cyan behind the dot */}
            <span
              ref={fillRef}
              aria-hidden="true"
              className="pointer-events-none absolute z-[15] w-px origin-top bg-primary/70 will-change-transform"
              style={{ left: DATE_COL + GAP, top: STATION_Y, transform: "scaleY(0)" }}
            />
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
