"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { WritingItem } from "@/lib/content";
import { lockScroll } from "./smooth-scroll";

/**
 * DESIGN WORK — newsletters and posters.
 *
 * Both are shown, not described: the tile is the piece itself rather than a
 * title you have to trust. Where the click lands differs by kind — see the
 * note on `viewable` below.
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

  /*
    Two kinds of tile share this grid.

    A NEWSLETTER has a document behind it: the tile shows page one and the
    click opens the PDF. Trapping that in a lightbox would show you the cover
    you already clicked and hide the thing you wanted.

    A POSTER is the whole artefact. Nothing to open, so it opens in place.

    The lightbox therefore indexes only the pieces without a destination —
    otherwise the arrows would cycle onto covers that have no full view.
  */
  const viewable = items.filter((item) => !item.href);

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback(
    (delta: number) =>
      setOpen((current) =>
        current === null ? null : (current + delta + viewable.length) % viewable.length,
      ),
    [viewable.length],
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

  const active = open === null ? null : viewable[open];

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
        {items.map((item) => {
          const inner = (
            <>
              <Image
                src={item.image!}
                alt={item.title}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover object-top transition-transform duration-500 ease-default group-hover:scale-[1.04]"
              />
              {/* Reveals only on hover — the artwork owns the tile at rest */}
              <span className="label absolute inset-x-0 bottom-0 bg-linear-to-t from-ink/80 to-transparent px-3 pt-8 pb-3 text-left text-white opacity-0 transition-opacity duration-200 ease-default group-hover:opacity-100">
                {item.href ? "Read PDF" : "View"}
              </span>
            </>
          );

          const tile =
            "group relative aspect-[2/3] overflow-hidden rounded-[14px] border border-line bg-card";

          return item.href ? (
            <a
              key={item.image}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Read ${item.title} (PDF)`}
              className={tile}
            >
              {inner}
            </a>
          ) : (
            <button
              key={item.image}
              type="button"
              onClick={() => setOpen(viewable.indexOf(item))}
              aria-label={`Open ${item.title}`}
              className={tile}
            >
              {inner}
            </button>
          );
        })}
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
            className="fixed inset-0 z-60 flex flex-col items-center justify-center gap-4 bg-ink/92 p-4 backdrop-blur-md sm:p-8"
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
                {open! + 1} / {viewable.length}
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
