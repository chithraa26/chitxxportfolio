"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Lenis owns the page's scroll — every scroll-linked animation on the site
 * (hero zoom-out, nav state, reveals) rides on the same smoothed value,
 * so nothing ever fights anything else. Initialised once, at the root.
 */
let lenis: Lenis | null = null;

/** Let other components (mobile menu) freeze scrolling without prop-drilling. */
export function lockScroll(locked: boolean) {
  if (locked) {
    lenis?.stop();
    document.body.style.overflow = "hidden";
  } else {
    lenis?.start();
    document.body.style.overflow = "";
  }
}

export default function SmoothScroll() {
  useEffect(() => {
    // Anyone who asked their OS for less motion gets plain native scrolling.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    let frame = 0;
    const raf = (time: number) => {
      lenis?.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis?.destroy();
      lenis = null;
    };
  }, []);

  return null;
}
