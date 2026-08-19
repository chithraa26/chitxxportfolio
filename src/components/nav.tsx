"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { nav, site } from "@/lib/content";
import { lockScroll } from "./smooth-scroll";
import { cn } from "@/lib/utils";

/** Hash links stay plain <a> so the browser scrolls them; routes get prefetch. */
function NavLink({
  href,
  className,
  onClick,
  children,
}: {
  href: string;
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  // A PDF isn't a route — it opens in its own tab so the site stays put behind it
  if (href.endsWith(".pdf")) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        onClick={onClick}
      >
        {children}
      </a>
    );
  }

  if (href.includes("#")) {
    return (
      <a href={href} className={className} onClick={onClick}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className} onClick={onClick}>
      {children}
    </Link>
  );
}

/**
 * A sticky MENU tab, floating clear of the page.
 *
 * It has to survive two completely different backdrops — a dark photograph at
 * the top, then white page below — so it reads its own position and swaps:
 * frosted-white-on-dark over the hero, solid-with-hairline once past it.
 * One state, two skins, no flash.
 */
export default function Nav({ solid = false }: { solid?: boolean }) {
  const [scrolled, setScrolled] = useState(solid);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (solid) return;
    // Flip once the hero photo is behind us
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.75);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [solid]);

  useEffect(() => {
    lockScroll(open);
    return () => lockScroll(false);
  }, [open]);

  const onDark = !scrolled;

  return (
    <header className="section-x fixed inset-x-0 top-6 z-50 md:top-9">
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "mx-auto w-full max-w-[420px] overflow-hidden rounded-btn backdrop-blur-xl transition-colors duration-300 ease-default",
          onDark
            ? "border border-white/20 bg-white/10"
            : "border border-line bg-paper/85 shadow-card",
        )}
      >
        <div className="flex items-center justify-between gap-4 px-5 py-3.5">
          <NavLink
            href="/"
            className={cn(
              "label transition-colors duration-300",
              onDark ? "text-white" : "text-ink",
            )}
          >
            {open ? site.name : "Menu"}
          </NavLink>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="flex h-6 w-6 flex-col items-center justify-center gap-[5px]"
          >
            <span
              className={cn(
                "block h-px w-5 transition-all duration-300 ease-default",
                onDark ? "bg-white" : "bg-ink",
                open && "translate-y-[3px] rotate-45",
              )}
            />
            <span
              className={cn(
                "block h-px w-5 transition-all duration-300 ease-default",
                onDark ? "bg-white" : "bg-ink",
                open && "-translate-y-[3px] -rotate-45",
              )}
            />
          </button>
        </div>

        {/* The tab grows downward rather than covering the page */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <nav
                className={cn(
                  "flex flex-col gap-4 border-t px-5 py-5",
                  onDark ? "border-white/20" : "border-line",
                )}
              >
                {nav.map((item, i) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.06 + i * 0.05,
                      duration: 0.4,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <NavLink
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "block font-display text-[22px] leading-[1.2] tracking-[-0.01em] transition-colors duration-150",
                        onDark ? "text-white hover:text-white/70" : "text-ink hover:text-accent",
                      )}
                    >
                      {item.label}
                    </NavLink>
                  </motion.div>
                ))}
                <a
                  href={`mailto:${site.email}`}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "label mt-2 transition-colors duration-150",
                    onDark ? "text-white/60" : "text-ink-soft",
                  )}
                >
                  {site.email}
                </a>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </header>
  );
}
