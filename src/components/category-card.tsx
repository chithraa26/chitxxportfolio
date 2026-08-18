import Link from "next/link";
import type { Category } from "@/lib/content";

/**
 * THE CATEGORY CARD — one component, three places.
 *
 * The homepage grid, the /work index and the "more work" rail at the bottom of
 * every category page all render this. Written once so a card can never mean
 * one thing in one place and something else in another.
 *
 * Its anatomy is really three moves:
 *
 *   1. a black frame with a lighter panel inset inside it (padding, not border)
 *   2. a clean colour field up top
 *   3. a black FOLDER TAB that rises out of the bottom slab and cuts into the
 *      colour — the tab is what stops it reading as a plain header-and-body card
 *
 * The tab is two rectangles, not a clip-path: a short one holding the title,
 * and the slab below it with only its top-RIGHT corner rounded. Where they
 * meet they sit flush, so the two read as one folded shape.
 */
const FIELDS: Record<string, string> = {
  blogs: "radial-gradient(130% 130% at 25% 15%, #ff9d4d 0%, #f2521c 45%, #8e1c06 100%)",
  "website-content":
    "radial-gradient(130% 130% at 25% 15%, #7fd4ff 0%, #1f7fe0 45%, #0a2f6b 100%)",
  articles: "radial-gradient(130% 130% at 25% 15%, #d9a3ff 0%, #8b3fd4 45%, #33115e 100%)",
  "social-media":
    "radial-gradient(130% 130% at 25% 15%, #86e8c0 0%, #17a06d 45%, #08402c 100%)",
  // The two empty categories stay desaturated — colour is earned by having
  // work in it. They're still distinct from each other: warm sand vs cool slate.
  newsletters: "radial-gradient(130% 130% at 25% 15%, #e2d9c9 0%, #9a8e78 45%, #3d3729 100%)",
  posters: "radial-gradient(130% 130% at 25% 15%, #cfd7de 0%, #7b8894 45%, #2c343b 100%)",
};

export default function CategoryCard({
  category,
  count,
  compact = false,
}: {
  category: Category;
  count: number;
  /** The bottom-of-page rail, where cards are secondary and shouldn't shout. */
  compact?: boolean;
}) {
  const empty = count === 0;

  const card = (
    <div
      className={`rounded-[26px] bg-ink shadow-card transition-transform duration-300 ease-default group-hover:-translate-y-1 ${
        compact ? "p-2" : "p-2.5"
      }`}
    >
      <div
        className="relative aspect-[10/9] overflow-hidden rounded-[18px]"
        style={{ backgroundImage: FIELDS[category.slug] }}
      >
        {/* tab + slab, flush where they meet */}
        <div className="absolute top-[27%] left-0 h-[26%] w-[72%] rounded-t-[16px] bg-ink" />
        <div className="absolute inset-x-0 top-[51%] bottom-0 rounded-tr-[22px] bg-ink" />

        <div className="absolute inset-x-0 top-[27%] bottom-0 flex flex-col justify-between p-4">
          <div className="max-w-[70%]">
            <p className="font-display text-[16px] leading-tight text-white">
              {category.name}
            </p>
            <p className="mt-1 text-[13px] leading-snug text-white/45">{category.note}</p>
          </div>

          <div className="flex items-end justify-between gap-3">
            <p className="text-white">
              <span className="font-display text-[28px] leading-none">
                {String(count).padStart(2, "0")}
              </span>{" "}
              <span className="text-[14px] text-white/70">
                {count === 1 ? "Piece" : "Pieces"}
              </span>
            </p>
            {!empty && (
              <span className="text-[13px] font-semibold text-white transition-transform duration-150 ease-default group-hover:translate-x-0.5">
                View →
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  // An empty category isn't a link — no destination, no affordance
  if (empty) return <div className="opacity-55">{card}</div>;

  return (
    <Link href={`/work/${category.slug}`} className="group block">
      {card}
    </Link>
  );
}
