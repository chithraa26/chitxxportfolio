"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";
import Reveal from "./reveal";
import { ExternalArrow } from "./preview-grid";
import { work, workHeadline } from "@/lib/content";

/**
 * THE SPINE.
 *
 * Roles stacked on the page's centre line, newest first. A hairline runs down
 * the middle behind them and an accent line DRAWS ITSELF along it as you
 * scroll — riding the same Lenis scroll value as the hero, so the page reads
 * as one continuous movement.
 *
 * The entries carry a paper background, so the line only shows in the gaps
 * between them: the spine appears as a series of dashes filling in, and no
 * rule ever runs through a word.
 */
export default function Work() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 70%"],
  });
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section id="work" className="relative bg-paper section-x section-pb">
      <div className="mx-auto max-w-3xl text-center">
        <Reveal>
          <h2 className="font-display text-[clamp(1.5rem,5vw,2.5rem)] leading-[1.15] tracking-[-0.005em]">
            {workHeadline}
          </h2>
        </Reveal>

        <div ref={ref} className="relative mt-12 flex flex-col gap-12 md:mt-16 md:gap-14">
          {/* the spine, behind everything */}
          <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-line">
            {!reduced && (
              <motion.div
                style={{ scaleY }}
                className="h-full w-full origin-top bg-accent"
              />
            )}
          </div>

          {work.map((item) => (
            <Reveal key={item.company} delay={0.04}>
              {/* bg-paper masks the spine so it only shows in the gaps */}
              <div className="relative bg-paper py-2">
                <p className="label text-ink-soft">{item.period}</p>

                <h3 className="mt-3 font-display text-[clamp(1.15rem,4vw,2rem)] leading-[1.15] tracking-[-0.005em]">
                  {item.href ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-baseline gap-2 transition-colors duration-150 ease-default hover:text-accent"
                    >
                      {item.company}
                      <ExternalArrow />
                    </a>
                  ) : (
                    item.company
                  )}
                </h3>

                <p className="mx-auto mt-3 max-w-[52ch] text-[16px] leading-[1.6] text-ink-soft md:text-[17px]">
                  {item.description}
                </p>

                {item.stat && (
                  // The one number worth interrupting the rhythm for
                  <div className="mt-5">
                    <span className="block font-display text-[clamp(2.5rem,5vw,3.5rem)] italic leading-none text-accent">
                      {item.stat.value}
                    </span>
                    <span className="mx-auto mt-2 block max-w-[46ch] text-balance text-[15px] leading-[1.45] text-ink-soft">
                      {item.stat.label}
                    </span>
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
