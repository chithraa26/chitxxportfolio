"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { WritingItem } from "@/lib/content";
import { lockScroll } from "./smooth-scroll";

/**
 * DESIGN WORK — newsletters and posters.
 *
 * These aren't links. A newsletter has no URL to send you to; the artefact IS
 * the work, so the tile opens a lightbox rather than a new tab.
 *
 * Two decisions do the heavy lifting:
 *
 *   1. EVERY TILE IS THE SAME 2:3 PORTRAIT, cropped from the TOP. The source
 *      images range from 0.60 to 0.73 in ratio, so a uniform box needs to trim
 *      a little from someone. Anchoring to the top means the trim always comes
 *      off the bottom — and mastheads, headlines and hero art live at the top,
 *      so the crop costs the least where it lands.
 *   2. THE LIGHTBOX SHOWS THEM WHOLE. Nothing is lost to the grid crop: click
 *      any tile and the full uncropped artwork opens, arrow-navigable, so the
 *      grid can stay tidy without the work paying for it.
 */
export default function GalleryGrid({ items }: { items: WritingItem[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const reduced = useReducedMotion();

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback(
    (delta: number) =>
      setOpen((current) =>
        current === null ? null : (current + delta + items.length) % items.length,
      ),
    [items.length],
  );

  // Keyboard is the whole navigation model once the lightbox is open
  useEffect(() => {
    if (open === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close, step]);

  // Lenis keeps scrolling the page behind the overlay unless it's told not to
  useEffect(() => {
    lockScroll(open !== null);
    return () => lockScroll(false);
  }, [open]);

  const active = open === null ? null : items[open];

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
        {items.map((item, i) => (
          <button
            key={item.image}
            type="button"
            onClick={() => setOpen(i)}
            aria-label={`Open ${item.title}`}
            className="group relative aspect-[2/3] overflow-hidden rounded-[14px] border border-line bg-card"
          >
            <Image
              src={item.image!}
              alt={item.title}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover object-top transition-transform duration-500 ease-default group-hover:scale-[1.04]"
            />
            {/* Reveals only on hover — the artwork owns the tile at rest */}
            <span className="label absolute inset-x-0 bottom-0 bg-linear-to-t from-ink/80 to-transparent px-3 pt-8 pb-3 text-left text-white opacity-0 transition-opacity duration-200 ease-default group-hover:opacity-100">
              View
            </span>
          </button>
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label={active.title}
            className="fixed inset-0 z-[60] flex flex-col items-center justify-center gap-4 bg-ink/92 p-4 backdrop-blur-md sm:p-8"
          >
            <motion.div
              initial={reduced ? false : { opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduced ? undefined : { opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              // Stop the backdrop's close from firing when the art is clicked
              onClick={(event) => event.stopPropagation()}
              className="relative h-[76vh] w-full max-w-[min(92vw,620px)]"
            >
              <Image
                src={active.image!}
                alt={active.title}
                fill
                sizes="(max-width: 640px) 92vw, 620px"
                className="rounded-[14px] object-contain"
                priority
              />
            </motion.div>

            <div
              onClick={(event) => event.stopPropagation()}
              className="flex items-center gap-5"
            >
              <Arrow direction="prev" onClick={() => step(-1)} />
              <span className="label text-white/70">
                {open! + 1} / {items.length}
              </span>
              <Arrow direction="next" onClick={() => step(1)} />
            </div>

            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/25 text-white transition-colors duration-150 ease-default hover:bg-white hover:text-ink sm:top-6 sm:right-6"
            >
              <svg viewBox="0 0 16 16" aria-hidden="true" className="h-4 w-4">
                <path
                  d="M3 3l10 10M13 3L3 13"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Arrow({
  direction,
  onClick,
}: {
  direction: "prev" | "next";
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direction === "prev" ? "Previous" : "Next"}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 text-white transition-colors duration-150 ease-default hover:bg-white hover:text-ink"
    >
      <svg
        viewBox="0 0 16 16"
        aria-hidden="true"
        className={`h-4 w-4 ${direction === "prev" ? "rotate-180" : ""}`}
      >
        <path
          d="M6 3l5 5-5 5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
