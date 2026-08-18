import { skills } from "@/lib/content";

/**
 * A thin inverted band between Work and Contact — a breath, not a section.
 * The drift is slow enough to read and pauses entirely under reduced motion.
 */
export default function SkillsStrip() {
  return (
    <div className="relative z-10 overflow-hidden bg-ink py-5">
      <div className="flex w-max animate-drift">
        {[0, 1].map((copy) => (
          // Two identical copies + translateX(-50%) = a seamless loop
          <ul key={copy} className="flex shrink-0 items-center" aria-hidden={copy === 1}>
            {skills.map((skill) => (
              <li key={skill} className="label flex items-center text-paper-soft">
                <span className="px-6">{skill}</span>
                <span className="text-accent-muted">·</span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
