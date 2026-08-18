/**
 * FIVE STICKERS.
 *
 * The reference is bright, comic, marker-drawn. We can't take its palette —
 * ours is paper and ink — so the comedy has to come from somewhere else:
 * from the DRAWING. Thick 6px strokes, rounded caps, wonky proportions,
 * everything sitting on a warm paper fill. Line-art doodles in the Notion
 * vein, with exactly one accent-coloured element each so the eye has a
 * single place to land per sticker.
 *
 * All five share a 200×200 box and the same stroke weight, which is what
 * keeps a set of five different drawings reading as one family.
 */

const svg = {
  viewBox: "0 0 200 200",
  fill: "none",
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

/** Blogs — two stacked pages, ruled, with a signature squiggle. */
function Blogs() {
  return (
    <svg {...svg} className="h-full w-full">
      <rect
        x="52"
        y="30"
        width="112"
        height="132"
        rx="12"
        className="fill-paper stroke-ink"
        strokeWidth="6"
      />
      <rect
        x="34"
        y="48"
        width="112"
        height="132"
        rx="12"
        className="fill-card stroke-ink"
        strokeWidth="6"
      />
      <path d="M54 84h72M54 106h72M54 128h48" className="stroke-ink" strokeWidth="6" />
      <path
        d="M54 152c7-11 14 9 21 0s14 9 21 0"
        className="stroke-accent"
        strokeWidth="6"
      />
    </svg>
  );
}

/** Website content — a browser window with a fat cursor. */
function Website() {
  return (
    <svg {...svg} className="h-full w-full">
      <rect
        x="24"
        y="44"
        width="152"
        height="114"
        rx="14"
        className="fill-card stroke-ink"
        strokeWidth="6"
      />
      <path d="M24 76h152" className="stroke-ink" strokeWidth="6" />
      <circle cx="44" cy="60" r="5" className="fill-ink" />
      <circle cx="62" cy="60" r="5" className="fill-ink" />
      <circle cx="80" cy="60" r="5" className="fill-accent" />
      <path d="M46 100h58M46 122h40" className="stroke-ink" strokeWidth="6" />
      <path
        d="M112 104l38 16-16 6-6 16z"
        className="fill-accent stroke-ink"
        strokeWidth="5"
      />
    </svg>
  );
}

/** Articles — a newspaper with a solid masthead. */
function Articles() {
  return (
    <svg {...svg} className="h-full w-full">
      <rect
        x="28"
        y="38"
        width="144"
        height="128"
        rx="10"
        className="fill-card stroke-ink"
        strokeWidth="6"
      />
      <rect
        x="46"
        y="56"
        width="108"
        height="22"
        rx="6"
        className="fill-accent stroke-ink"
        strokeWidth="5"
      />
      <path d="M46 98h46M46 116h46M46 134h46" className="stroke-ink" strokeWidth="5" />
      <rect
        x="106"
        y="96"
        width="48"
        height="40"
        rx="6"
        className="fill-paper stroke-ink"
        strokeWidth="5"
      />
      <path d="M46 150h108" className="stroke-ink" strokeWidth="5" />
    </svg>
  );
}

/** Social media — a burst with a heart at the middle. */
function Social() {
  return (
    <svg {...svg} className="h-full w-full">
      <g className="stroke-ink" strokeWidth="6">
        <path d="M100 16v18M100 166v18M16 100h18M166 100h18M41 41l13 13M146 146l13 13M159 41l-13 13M54 146l-13 13" />
      </g>
      <circle cx="100" cy="100" r="52" className="fill-card stroke-ink" strokeWidth="6" />
      <path
        d="M100 129c-23-16-33-27-33-39a17 17 0 0 1 33-8 17 17 0 0 1 33 8c0 12-10 23-33 39z"
        className="fill-accent stroke-ink"
        strokeWidth="5"
      />
    </svg>
  );
}

/** Newsletters — a sheet climbing out of an envelope. */
function Newsletters() {
  return (
    <svg {...svg} className="h-full w-full">
      <rect
        x="60"
        y="24"
        width="80"
        height="74"
        rx="8"
        className="fill-paper stroke-ink"
        strokeWidth="6"
      />
      <path d="M78 48h44M78 68h28" className="stroke-ink" strokeWidth="5" />
      <path
        d="M26 82h148v80a12 12 0 0 1-12 12H38a12 12 0 0 1-12-12z"
        className="fill-card stroke-ink"
        strokeWidth="6"
      />
      <path d="M26 82l74 54 74-54" className="stroke-accent" strokeWidth="6" />
    </svg>
  );
}

/** Posters — a pinned sheet, corner curling off the wall. */
function Posters() {
  return (
    <svg {...svg} className="h-full w-full">
      <path
        d="M40 30h120v112l-30 28H40z"
        className="fill-paper stroke-ink"
        strokeWidth="6"
        strokeLinejoin="round"
      />
      {/* the curl: the corner folds back on itself, which is what says paper */}
      <path
        d="M130 170v-28h30z"
        className="fill-card stroke-ink"
        strokeWidth="6"
        strokeLinejoin="round"
      />
      <path d="M62 62h76M62 88h50" className="stroke-ink" strokeWidth="6" />
      <circle cx="100" cy="30" r="11" className="fill-accent stroke-ink" strokeWidth="5" />
    </svg>
  );
}

export const CATEGORY_ART: Record<string, () => React.JSX.Element> = {
  blogs: Blogs,
  "website-content": Website,
  articles: Articles,
  "social-media": Social,
  newsletters: Newsletters,
  posters: Posters,
};
