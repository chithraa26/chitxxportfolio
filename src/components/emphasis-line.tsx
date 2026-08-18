"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export type Word = { text: string; em?: boolean };

/**
 * THE SIGNATURE MOVE.
 * A sentence where the words that carry the feeling look like they carry it —
 * italic, heavier, accent-coloured, 1.15× the size of everything around them.
 *
 * Rationing is what makes it work: twice per page, max. Used more, it reads
 * as decoration and stops meaning anything.
 */
export default function EmphasisLine({
  words,
  className,
  emClassName = "text-accent",
  animate = true,
}: {
  words: Word[];
  className?: string;
  emClassName?: string;
  animate?: boolean;
}) {
  const reduced = useReducedMotion();
  const shouldAnimate = animate && !reduced;

  return (
    <span className={cn("inline", className)}>
      {words.map((word, i) => (
        // A REAL space between spans, not a margin. Margins are invisible to
        // copy-paste, screen readers and search engines — which is how
        // "Turning scrolls into stories." became "Turningscrollsintostories."
        <span key={`${word.text}-${i}`}>
          {i > 0 && " "}
          <motion.span
            // inline-block so the transform applies to the word as a unit
            className={cn(
              "inline-block",
              // medium, not semibold — the italic already does the emphasising
              word.em && cn("italic font-medium text-[1.12em]", emClassName),
            )}
            initial={
              shouldAnimate
                ? // The emphasised words arrive from further down and slightly
                  // small, so they *land* rather than fade — the eye catches the
                  // movement and reads them as the beat of the sentence.
                  { opacity: 0, y: word.em ? "0.5em" : "0.25em", scale: word.em ? 0.88 : 1 }
                : false
            }
            animate={shouldAnimate ? { opacity: 1, y: 0, scale: 1 } : undefined}
            transition={{
              duration: word.em ? 1 : 0.7,
              delay: i * 0.04, // 40ms stagger — one phrase landing, not N words
              // spring-ish settle for the emphasis, plain ease for the rest
              ease: word.em ? [0.34, 1.2, 0.64, 1] : [0.16, 1, 0.3, 1],
            }}
          >
            {word.text}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
