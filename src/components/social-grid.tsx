"use client";

import { useEffect, useRef, useState } from "react";
import type { WritingItem } from "@/lib/content";
import { ExternalArrow } from "./preview-grid";

/**
 * SOCIAL WORK — live Instagram embeds, not screenshots.
 *
 * A screenshot of a carousel is one slide and a screenshot of a reel is a
 * frozen frame. Embedding the real post keeps carousels swipeable and reels
 * playable, which is the whole point of showing social work at all.
 *
 * Three things keep fifteen embeds from turning the page into a brick:
 *
 *   1. LAZY. Nothing loads until the tile is within 600px of the viewport, so
 *      arriving on the page costs one screen's worth of iframes, not fifteen.
 *   2. SQUARE. Every tile is the same square regardless of whether the post is
 *      a 1:1 carousel or a 9:16 reel, so the grid stays a grid. The embed is
 *      taller than the square and the overflow is clipped — the account header
 *      and the media survive, Instagram's own action bar is what gets cut.
 *   3. OUR OWN CAPTION. The label and the link live outside the iframe. If
 *      Instagram declines to render — it rate-limits embeds and shows a
 *      "post may be unavailable" card to some visitors — the tile still reads
 *      as a piece of work and still clicks through to the real post.
 */
function Embed({ item }: { item: WritingItem }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    // No IntersectionObserver (very old browsers) → just load it. Deferred by
    // a tick rather than set inline, so this stays out of the render pass.
    if (typeof IntersectionObserver === "undefined") {
      const timer = setTimeout(() => setVisible(true), 0);
      return () => clearTimeout(timer);
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "600px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div>
      <div
        ref={ref}
        className="relative aspect-square overflow-hidden rounded-[14px] border border-line bg-card"
      >
        {visible ? (
          <iframe
            src={`https://www.instagram.com/${item.embedType}/${item.embed}/embed/`}
            title={`${item.kind} on Instagram`}
            loading="lazy"
            scrolling="no"
            allowFullScreen
            /*
              Taller than the square on purpose. The embed lays out as
              header → media → actions; at this height the square lands on the
              header and the media, and clips the rest.
            */
            className="absolute top-0 left-0 h-[620px] w-full border-0"
          />
        ) : (
          // Holds the exact same box before load, so nothing reflows
          <div className="absolute inset-0 animate-pulse bg-linear-to-br from-card to-line" />
        )}
      </div>

      <div className="mt-3 flex items-center justify-between gap-3">
        <span className="label text-accent-muted">{item.kind}</span>
        <a
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className="label group flex items-center gap-1.5 text-ink-soft transition-colors duration-150 ease-default hover:text-accent"
        >
          Instagram
          <ExternalArrow />
        </a>
      </div>
    </div>
  );
}

export default function SocialGrid({ items }: { items: WritingItem[] }) {
  return (
    <div
      /*
        auto-fill with a 330px floor, not fixed breakpoint columns: Instagram's
        embed refuses to lay out below ~326px and starts clipping its own
        content, so the column width — not the viewport — is what has to be
        guaranteed.
      */
      className="mx-auto grid max-w-[1120px] gap-x-5 gap-y-8 grid-cols-[repeat(auto-fill,minmax(min(100%,330px),1fr))]"
    >
      {items.map((item) => (
        <Embed key={item.embed} item={item} />
      ))}
    </div>
  );
}
