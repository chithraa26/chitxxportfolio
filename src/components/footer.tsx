import Image from "next/image";
import EmphasisLine from "./emphasis-line";
import Reveal from "./reveal";
import { contact, site } from "@/lib/content";

/**
 * THE ENDING — one compact glass band, not a full section.
 *
 * It was a page-height contact block plus a separate footer. Both are gone;
 * what's left is the line, one social mark and the copyright, floating on a
 * frosted panel over the same photograph the hero uses. Glass needs something
 * behind it to be glass, which is exactly why the image is here rather than
 * flat black.
 *
 * It carries id="contact" so the nav's Contact link still lands somewhere.
 */
export default function Footer() {
  return (
    <footer id="contact" className="relative z-10 overflow-hidden bg-ink">
      <Image
        src="/images/chbg.png"
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-center opacity-60"
      />
      <div className="absolute inset-0 bg-ink/55" />

      <div className="section-x relative py-[clamp(40px,6vw,72px)]">
        <div className="mx-auto max-w-[1000px] rounded-[24px] border border-white/15 bg-white/10 px-6 py-8 backdrop-blur-2xl md:px-10 md:py-10">
          <Reveal>
            <div className="flex flex-col items-center gap-7 text-center">
              <h2 className="max-w-[18ch] text-balance font-display text-[clamp(1.5rem,4.5vw,2.5rem)] leading-[1.15] text-white">
                <EmphasisLine
                  words={contact.headline}
                  animate={false}
                  emClassName="text-white/70"
                />
              </h2>

              {/* One subtle mark, one quiet link — no button */}
              <div className="flex items-center gap-4">
                <LinkedIn />
                <a
                  href={site.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="label flex h-11 items-center rounded-full border border-white/25 px-5 text-white transition-colors duration-150 ease-default hover:border-white hover:bg-white hover:text-ink"
                >
                  Resume
                </a>
              </div>

              <div className="flex w-full flex-col items-center gap-1 border-t border-white/15 pt-6 sm:flex-row sm:justify-between">
                <p className="font-display text-[15px] text-white">{site.name}</p>
                <p className="label text-white/55">
                  © {new Date().getFullYear()} — {site.role}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </footer>
  );
}

function LinkedIn() {
  const mark = (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-[18px] w-[18px]">
      <path
        d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3zM10 9h3.8v1.7h.05c.53-.95 1.83-1.95 3.77-1.95C21.4 8.75 22 11.1 22 14.2V21h-4v-6.03c0-1.44-.03-3.3-2.02-3.3-2.02 0-2.33 1.57-2.33 3.2V21h-3.9z"
        fill="currentColor"
      />
    </svg>
  );

  const base =
    "flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-white transition-colors duration-150 ease-default";

  // No URL yet → show the mark, but don't pretend it goes anywhere
  if (!site.linkedin) {
    return (
      <span
        aria-label="LinkedIn — link coming soon"
        className={`${base} cursor-default opacity-40`}
      >
        {mark}
      </span>
    );
  }

  return (
    <a
      href={site.linkedin}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${site.name} on LinkedIn`}
      className={`${base} hover:border-white hover:bg-white hover:text-ink`}
    >
      {mark}
    </a>
  );
}
