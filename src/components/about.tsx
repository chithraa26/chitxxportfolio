import Reveal from "./reveal";
import Snapshot from "./snapshot";
import { about } from "@/lib/content";

/**
 * Centred, single column. The hero has just shrunk to the top of the screen,
 * so this section picks the story up directly underneath it — same axis, same
 * measure. One vertical line runs down the middle of the whole page.
 */
export default function About() {
  return (
    <section id="about" className="relative bg-paper section-x section-pb">
      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <Reveal>
          <Snapshot />
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="mt-10 font-display text-[clamp(1.5rem,5vw,2.5rem)] leading-[1.15] tracking-[-0.005em]">
            {about.headline}
          </h2>
        </Reveal>

        {/*
          Centred body copy needs a shorter line than left-aligned copy — the
          eye has to find a new start point on every line, so 54ch instead of
          the usual 62ch keeps the return sweep short enough to stay easy.
        */}
        <div className="mt-6 max-w-[54ch] space-y-5 text-[17px] leading-[1.65] text-ink-soft md:text-[18px]">
          {about.body.map((paragraph, i) => (
            <Reveal key={i} delay={0.08 + 0.05 * i}>
              <p>{paragraph}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
