"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import EmphasisLine from "./emphasis-line";
import { heroLine, site } from "@/lib/content";

/**
 * THE OPENER — a full-bleed photograph with the line set into its bottom-left.
 *
 * Two things make it work:
 *
 * 1. The photo has an empty left two-thirds and the subject sitting right of
 *    centre, so the type goes bottom-LEFT and never fights her for space.
 *
 * 2. It's `sticky`, not scrolled. The hero stays pinned at the top of the
 *    viewport while the next section — which carries a solid background and a
 *    higher z-index — climbs over it. The photo doesn't move; the page moves
 *    over the photo. That's the whole effect, and it costs one property.
 */
export default function Hero() {
  const reduced = useReducedMotion();

  return (
    <section
      id="hero"
      /*
        85svh, not 100 — the last strip of the screen shows the white slab
        below, so you can see there's a page under the photograph before you
        scroll. The overlap is unaffected: a sticky element only has to be
        SHORTER than the viewport, not equal to it. It still pins at top-0 and
        the slab still climbs over it.
      */
      className="sticky top-0 z-0 h-[85svh] w-full overflow-hidden"
      aria-label="Introduction"
    >
      {/* The image drifts in from slightly oversized — a slow settle, not a zoom */}
      <motion.div
        initial={reduced ? false : { scale: 1.18 }}
        animate={reduced ? undefined : { scale: 1 }}
        transition={{ duration: 2, delay: 0.2, ease: [0.12, 0.23, 0.5, 1] }}
        className="absolute inset-0"
      >
        <Image
          src="/images/chbg.png"
          alt=""
          fill
          priority
          sizes="100vw"
          /*
            She stands centre-right and runs to the bottom edge, so on phones
            (which crop horizontally) the focal point holds at 58% to keep her
            in frame without pushing the orchids out.
          */
          className="object-cover object-[58%_center]"
        />
      </motion.div>

      {/*
        Her dress is the one pale thing in a dark frame and it sits exactly
        where the type lands, so the lower scrim carries most of the work —
        it sinks the floor and the dress far enough for white to hold.
      */}
      <div className="absolute inset-0 bg-black/30" />
      <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-black/80 via-black/45 to-transparent" />

      {/* Sits low — close enough to the white slab to read as one edge */}
      <div className="section-x relative flex h-full flex-col items-center justify-end pb-[7%] text-center">
        <div className="mx-auto w-full max-w-[1440px]">
          <motion.p
            initial={reduced ? false : { opacity: 0, y: 8 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="label mb-4 text-white/70 md:mb-5"
          >
            {site.name} — {site.role}
          </motion.p>

          {/*
            Emphasis reads as light-on-light here rather than accent-on-dark:
            over a photograph the espresso would sink, so the emphasised words
            go pure white and the rest of the line holds back at 75%.
          */}
          {/*
            The one serif on the site, and the only place the emphasis runs on
            WEIGHT as well as slant: the line sits at 300 and the caught words
            jump to 600. That gap is only legible in a family with real optical
            contrast between its cuts — which is why Fraunces stayed for this
            element after everything else moved to Inter.
          */}
          <h1 className="mx-auto max-w-[20ch] text-balance font-serif text-[clamp(1.75rem,5vw,4rem)] leading-[1.12] font-light tracking-[-0.01em] text-white/80">
            <EmphasisLine
              words={heroLine}
              emClassName="font-semibold text-[1.15em] text-white"
            />
          </h1>
        </div>
      </div>
    </section>
  );
}
