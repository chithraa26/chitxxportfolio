"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { about } from "@/lib/content";

/** The four corners, as [vertical, horizontal] border edges + placement. */
const CORNERS = [
  { pos: "-top-2 -left-2", border: "border-t border-l" },
  { pos: "-top-2 -right-2", border: "border-t border-r" },
  { pos: "-bottom-2 -left-2", border: "border-b border-l" },
  { pos: "-bottom-2 -right-2", border: "border-b border-r" },
];

/**
 * The snapshot, pinned by CROP MARKS.
 *
 * Not tape, not stickers, not a scrapbook. Crop marks are what a photo wears
 * on its way to being printed — which is exactly the right vocabulary for a
 * writer's page built out of paper and ink. They draw themselves in at the
 * four corners as the photo arrives, so the image reads as *placed* on the
 * page rather than dropped into it.
 */
export default function Snapshot() {
  const reduced = useReducedMotion();

  return (
    // Definite width, not w-full: this sits inside a centred flex column, so
    // a percentage width would resolve against a shrink-to-fit parent and
    // collapse the frame to nothing.
    <div className="relative mx-auto w-[250px] max-w-full">
      <motion.div
        initial={reduced ? false : { opacity: 0, scale: 0.96 }}
        whileInView={reduced ? undefined : { opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative rounded-photo bg-card p-2.5 shadow-snapshot"
      >
        <div className="relative aspect-4/5 overflow-hidden rounded-[2px]">
          <Image
            src={about.photo.src}
            alt={about.photo.alt}
            fill
            sizes="250px"
            className="object-cover"
            priority
          />
        </div>
      </motion.div>

      {CORNERS.map((corner, i) => (
        <motion.span
          key={corner.pos}
          aria-hidden="true"
          className={`absolute h-4 w-4 border-accent ${corner.pos} ${corner.border}`}
          initial={reduced ? false : { opacity: 0, scale: 0.4 }}
          whileInView={reduced ? undefined : { opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{
            duration: 0.5,
            delay: 0.35 + i * 0.07, // corners pin one after another, clockwise-ish
            ease: [0.16, 1, 0.3, 1],
          }}
        />
      ))}
    </div>
  );
}
