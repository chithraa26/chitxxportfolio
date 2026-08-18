import Image from "next/image";
import type { WritingItem } from "@/lib/content";

/** Small ↗ — the universal "this leaves the site" tell. */
export function ExternalArrow() {
  return (
    <svg
      viewBox="0 0 12 12"
      aria-hidden="true"
      className="h-3 w-3 shrink-0 translate-y-1 text-accent-muted transition-transform duration-150 ease-default group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
    >
      <path
        d="M3 9L9 3M9 3H4M9 3v5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * READING WORK — blogs, articles and website copy.
 *
 * Each tile is the publisher's own header image with the headline under it.
 * Two reasons that beats a text card:
 *
 *   1. It's the piece as it actually shipped, not a description of it.
 *   2. A grid of images scans in one pass. A grid of paragraphs does not.
 *
 * The images were fetched once and committed to /public, so the page never
 * waits on — or breaks with — someone else's CMS.
 */
export default function PreviewGrid({ items }: { items: WritingItem[] }) {
  return (
    <div className="grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((piece) => (
        <a
          key={piece.href}
          href={piece.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group block"
        >
          <div
            className={`relative aspect-[16/10] overflow-hidden rounded-[14px] border border-line ${
              piece.contain ? "bg-white" : "bg-card"
            }`}
          >
            {piece.preview ? (
              <Image
                src={piece.preview}
                alt=""
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className={
                  piece.contain
                    ? "object-contain p-8"
                    : "object-cover transition-transform duration-500 ease-default group-hover:scale-[1.04]"
                }
              />
            ) : null}
            {/* The label rides on the image so the caption below stays two lines */}
            <span className="label absolute top-3 left-3 rounded-full bg-paper/90 px-2.5 py-1 text-ink backdrop-blur-sm">
              {piece.kind}
            </span>
          </div>

          <div className="mt-3.5 flex items-start justify-between gap-3">
            <div>
              <h3 className="font-display text-[15px] leading-[1.35] tracking-[-0.005em] transition-colors duration-150 ease-default group-hover:text-accent">
                {piece.title}
              </h3>
              <p className="label mt-2 text-accent-muted">{piece.client}</p>
            </div>
            <ExternalArrow />
          </div>
        </a>
      ))}
    </div>
  );
}
