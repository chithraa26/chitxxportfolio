import Reveal from "./reveal";
import CategoryCard from "./category-card";
import { writingByCategory, writingHeadline } from "@/lib/content";

/**
 * SELECTED WORKS — six doors, not a list of links.
 *
 * The homepage's job here is to say what kinds of writing exist and how much
 * of each there is. The pieces themselves live one click away on their own
 * page, so this section never grows as the portfolio does.
 */
export default function Writing() {
  const groups = writingByCategory();

  return (
    <section id="writing" className="relative z-10 bg-paper section-x section-pb">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h2 className="text-center font-display text-[clamp(1.5rem,5vw,2.5rem)] leading-[1.15]">
            {writingHeadline}
          </h2>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 md:mt-14 lg:grid-cols-3 lg:gap-6">
          {groups.map(({ category, items }, i) => (
            <Reveal key={category.slug} delay={Math.min(i, 5) * 0.06}>
              <CategoryCard category={category} count={items.length} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
