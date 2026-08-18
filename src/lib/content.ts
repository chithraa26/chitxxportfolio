/**
 * ALL site copy and data lives here — one file, no CMS, no over-structuring.
 *
 * COPY RULE: every sentence below is verbatim from Chithra's portfolio PDF.
 * Nothing here is written by anyone else. If a line needs changing, change it
 * here — the components only render, they never author.
 */

export const site = {
  name: "Chithra Prakash",
  role: "Content & Copywriter",
  description:
    "I'm Chithra, a content writer with 2 years of experience crafting content across social media, digital campaigns, brand copy, blogs, editorials and scripts.",
  email: "kvchithraprakaash@gmail.com",
  phone: "7306043032",
  linkedin: "https://www.linkedin.com/in/chithra-prakash/",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
};

export const nav = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

/**
 * Hero line, tokenised so individual words can carry emphasis.
 * `em: true` → italic, accent, 1.15× — the signature move.
 * "caught" and "catching" are the pair: emphasising both makes the sentence's
 * own mirror visible before you've finished reading it.
 */
export const heroLine = [
  { text: "Words" },
  { text: "caught", em: true },
  { text: "my" },
  { text: "attention." },
  { text: "So" },
  { text: "I" },
  { text: "made" },
  { text: "a" },
  { text: "career" },
  { text: "out" },
  { text: "of" },
  { text: "catching", em: true },
  { text: "theirs." },
];

export const about = {
  headline: "Hey, I'm Chithra",
  body: [
    "I'm a content writer with 2 years of experience creating social media, campaigns, brand copy, blogs, editorials and scripts across diverse industries, including real estate, event management, home security, furniture, health and wellness.",
    "Curious by nature, I turn complex ideas into simple, engaging stories. With experience in both client management and content, I create copy that connects, communicates and delivers.",
  ],
  photo: {
    src: "/images/chithra.jpeg",
    alt: "Portrait of Chithra Prakash",
  },
};

export type WorkItem = {
  company: string;
  period: string;
  description: string;
  /** The one result worth pulling out of the line and setting big. */
  stat?: { value: string; label: string };
  /** Present → the company name becomes a real link. Absent → plain text. */
  href?: string;
};

/** This list is her roles, so it gets a roles heading. */
export const workHeadline = "Work Experience";

/**
 * The PDF's portfolio caption belongs with the actual pieces, not the roles —
 * so it moved down here, to the section that shows the writing itself.
 */
export const writingHeadline = "Selected Works";

/** Reverse-chronological: what she's doing now reads first, 2023 reads last. */
export const work: WorkItem[] = [
  {
    company: "Happiest Health",
    period: "Oct 2025 – Present",
    description: "Copies, scripts & social media management, brief to execution",
    href: "https://www.instagram.com/happiesthealthmagazine?igsh=MXI0dDlibmwzcXhxeA==",
  },
  {
    company: "Nextvision Studio (Freelance)",
    period: "Jan 2026 – Present",
    description: "Wedding & other event management social media, reels to carousels",
  },
  {
    company: "Screen Interactiv",
    period: "June 2024 – Sept 2025",
    description:
      "Multi-format content across platforms for multiple clients, including furniture brands and home security solutions",
    stat: {
      value: "50%",
      label: "of bookings driven in 3 months for one real estate client",
    },
    href: "https://www.instagram.com/screen_interactiv?igsh=N3ZjZTk3YTBsMmRo",
  },
  {
    company: "IndiaMedToday",
    period: "Aug 2024 – Sept 2025",
    // Verbatim from the PDF — the line ends here in the source document.
    description: "B2B healthcare feature",
    href: "https://sites.google.com/view/chithra-prakash/home",
  },
  {
    company: "The New Indian Express",
    period: "June 2023 – July 2023",
    description: "City reporter, Bangalore edition",
  },
];

export type WritingItem = {
  title: string;
  client: string;
  /** Small label on the card — what form the piece took. */
  kind: string;
  /**
   * Where the piece lives online. Absent for design work — a newsletter or a
   * poster has no URL to send you to, it IS the artefact, so those open in the
   * lightbox instead of a new tab.
   */
  href?: string;
  /** Which category page this piece lives on. */
  category: string;
  /**
   * Local preview image. Blogs and articles use the publisher's own OG image;
   * website work uses a screenshot of the live site. Both were pulled once and
   * committed, so the build never depends on someone else's server being up.
   */
  preview?: string;
  /** Preview is a logo, not a photo → contain it instead of cropping. */
  contain?: boolean;
  /** Full-resolution artwork, shown uncropped in the lightbox. */
  image?: string;
  /**
   * Instagram shortcode. Present → the tile renders a live embed of the post
   * rather than a still, so carousels stay swipeable and reels stay playable.
   */
  embed?: string;
  /** "p" for posts and carousels, "reel" for reels — Instagram routes them differently. */
  embedType?: "p" | "reel";
};

/**
 * Published pieces, filed by category. Every URL here came from Chithra
 * directly or from the hyperlinks embedded in her portfolio PDF — none are
 * guessed, and none are shortened or rewritten.
 */
export const writing: WritingItem[] = [
  {
    title: "Essential Tips for First-Time Homebuyers in Bangalore",
    client: "Amberstone",
    kind: "Blog",
    category: "blogs",
    href: "https://amberstoneproperties.in/essential-tips-for-first-time-homebuyers-in-bangalore/",
    preview: "/previews/blog-first-time-homebuyers.jpg",
  },
  {
    title: "Sarjapur Road Real Estate: 2025 Trends & Market Outlook",
    client: "Amberstone",
    kind: "Blog",
    category: "blogs",
    href: "https://amberstoneproperties.in/sarjapur-road-real-estate-trends-2025-outlook/",
    preview: "/previews/blog-sarjapur-road-2025.jpg",
  },
  {
    title: "How Bangalore's Metro Expansion Is Influencing Property Prices",
    client: "Amberstone",
    kind: "Blog",
    category: "blogs",
    href: "https://amberstoneproperties.in/how-bangalores-metro-expansion-is-influencing-residential-property-prices/",
    preview: "/previews/blog-metro-expansion.jpg",
  },
  {
    title: "Holi Wooden Floor Protection: Pre & Post-Celebration Care Tips",
    client: "Kingsmen",
    kind: "Blog",
    category: "blogs",
    href: "https://www.kingsmen.in/blog/holi-floor-protection-tips/",
    preview: "/previews/blog-holi-floor-protection.jpg",
  },
  {
    title: "Interior Design Trends 2025: Wood Flooring Styles for the Year Ahead",
    client: "Kingsmen",
    kind: "Blog",
    category: "blogs",
    href: "https://www.kingsmen.in/blog/interior-design-trends-2025-must-see-wood-flooring-styles-for-the-year-ahead/",
    preview: "/previews/blog-flooring-trends-2025.jpg",
  },
  {
    title: "Key Benefits of Hardwood Flooring for Senior Citizens",
    client: "Kingsmen",
    kind: "Blog",
    category: "blogs",
    href: "https://www.kingsmen.in/blog/the-benefits-of-hardwood-flooring-for-senior-citizens/",
    preview: "/previews/blog-senior-citizens.jpg",
  },
  {
    title: "Amberstone | Top Real Estate Developers in Bangalore",
    client: "Amberstone",
    kind: "Website",
    category: "website-content",
    href: "https://amberstoneproperties.in/",
    preview: "/previews/site-amberstone.jpg",
  },
  {
    title: "Vamsiram | 25 Years of Timeless Landmarks and Iconic Living",
    client: "Vamsiram",
    kind: "Website",
    category: "website-content",
    href: "https://vamsirambuilders.com/",
    // The site runs a splash loader that never resolves to a capture, so the
    // brand mark stands in — contained, not cropped, so it reads as a logo.
    preview: "/previews/site-vamsiram.png",
    contain: true,
  },
  {
    title: "Wearable Health Tech: How Reliable Are They for Chronic Disease Management?",
    client: "IndiaMedToday",
    kind: "Article",
    category: "articles",
    href: "https://indiamedtoday.com/wearable-health-tech-how-reliable-are-they-for-chronic-disease-management/",
    preview: "/previews/article-wearable-health-tech.jpg",
  },
  {
    title: "Rise of AI Doctors: How Close Are We to Replacing Doctors?",
    client: "IndiaMedToday",
    kind: "Article",
    category: "articles",
    href: "https://indiamedtoday.com/rise-of-ai-doctors-how-close-are-we-to-replacing-doctors/",
    preview: "/previews/article-ai-doctors.jpg",
  },
  {
    title: "How 3D Printing Is a Benchmark for Precision and Personalisation",
    client: "IndiaMedToday",
    kind: "Article",
    category: "articles",
    href: "https://indiamedtoday.com/how-3d-printing-is-a-benchmark-for-precision-and-personalisation/",
    preview: "/previews/article-3d-printing.jpg",
  },
  {
    title: "Breaking Barriers, Driving Innovation and Shaping the Future",
    client: "IndiaMedToday",
    kind: "Article",
    category: "articles",
    href: "https://indiamedtoday.com/breaking-barriers-driving-innovation-and-shaping-the-future/",
    preview: "/previews/article-breaking-barriers.jpg",
  },
  {
    title: "The Role of AI to Solve Health Challenges",
    client: "IndiaMedToday",
    kind: "Article",
    category: "articles",
    href: "https://indiamedtoday.com/the-role-of-ai-to-solve-health-challenges/",
    preview: "/previews/article-ai-health-challenges.jpg",
  },
  {
    title: "Doctors want ads promoting junk food to be regulated",
    client: "The New Indian Express",
    kind: "Article",
    category: "articles",
    href: "https://www.newindianexpress.com/states/karnataka/2023/Jul/10/doctorswant-ads-promoting-junk-food-to-be-regulated-2593133.html",
    preview: "/previews/article-junk-food-ads.jpg",
  },
  {
    title: "Instagram carousel",
    client: "",
    kind: "Carousel",
    category: "social-media",
    href: "https://www.instagram.com/p/DZujpfsmjeo/",
    embed: "DZujpfsmjeo",
    embedType: "p",
  },
  {
    title: "Instagram carousel",
    client: "",
    kind: "Carousel",
    category: "social-media",
    href: "https://www.instagram.com/p/DY7GQkPGskt/",
    embed: "DY7GQkPGskt",
    embedType: "p",
  },
  {
    title: "Instagram reel",
    client: "",
    kind: "Reel",
    category: "social-media",
    href: "https://www.instagram.com/reel/DWVp48YDluv/",
    embed: "DWVp48YDluv",
    embedType: "reel",
  },
  {
    title: "Instagram reel",
    client: "",
    kind: "Reel",
    category: "social-media",
    href: "https://www.instagram.com/reel/DWf6V2_EfL9/",
    embed: "DWf6V2_EfL9",
    embedType: "reel",
  },
  {
    title: "Instagram reel",
    client: "",
    kind: "Reel",
    category: "social-media",
    href: "https://www.instagram.com/reel/DWq8A1gEswZ/",
    embed: "DWq8A1gEswZ",
    embedType: "reel",
  },
  {
    title: "Instagram reel",
    client: "",
    kind: "Reel",
    category: "social-media",
    href: "https://www.instagram.com/reel/DNxsXl-4heV/",
    embed: "DNxsXl-4heV",
    embedType: "reel",
  },
  {
    title: "Instagram reel",
    client: "",
    kind: "Reel",
    category: "social-media",
    href: "https://www.instagram.com/reel/DM7B-DxvD8K/",
    embed: "DM7B-DxvD8K",
    embedType: "reel",
  },
  {
    title: "Instagram reel",
    client: "",
    kind: "Reel",
    category: "social-media",
    href: "https://www.instagram.com/reel/DNZ0YUnhfrR/",
    embed: "DNZ0YUnhfrR",
    embedType: "reel",
  },
  {
    title: "Instagram reel",
    client: "",
    kind: "Reel",
    category: "social-media",
    href: "https://www.instagram.com/reel/DMcm2V9TcyU/",
    embed: "DMcm2V9TcyU",
    embedType: "reel",
  },
  {
    title: "Instagram post",
    client: "",
    kind: "Post",
    category: "social-media",
    href: "https://www.instagram.com/p/DL9ya_6zzpY/",
    embed: "DL9ya_6zzpY",
    embedType: "p",
  },
  {
    title: "Instagram post",
    client: "",
    kind: "Post",
    category: "social-media",
    href: "https://www.instagram.com/p/DB_W3iWydhM/",
    embed: "DB_W3iWydhM",
    embedType: "p",
  },
  {
    title: "Instagram post",
    client: "",
    kind: "Post",
    category: "social-media",
    href: "https://www.instagram.com/p/C-7a1AsoNgE/",
    embed: "C-7a1AsoNgE",
    embedType: "p",
  },
  {
    title: "Instagram post",
    client: "",
    kind: "Post",
    category: "social-media",
    href: "https://www.instagram.com/p/DDZIJDAyq0_/",
    embed: "DDZIJDAyq0_",
    embedType: "p",
  },
  {
    title: "Instagram post",
    client: "",
    kind: "Post",
    category: "social-media",
    href: "https://www.instagram.com/p/DCoLAlWp-le/",
    embed: "DCoLAlWp-le",
    embedType: "p",
  },
  {
    title: "Instagram post",
    client: "",
    kind: "Post",
    category: "social-media",
    href: "https://www.instagram.com/p/DFsUAcbqGwP/",
    embed: "DFsUAcbqGwP",
    embedType: "p",
  },
  {
    title: "Newsletter 01",
    client: "",
    kind: "Newsletter",
    category: "newsletters",
    image: "/gallery/newsletter-1.jpeg",
  },
  {
    title: "Newsletter 02",
    client: "",
    kind: "Newsletter",
    category: "newsletters",
    image: "/gallery/newsletter-2.jpeg",
  },
  {
    title: "Newsletter 03",
    client: "",
    kind: "Newsletter",
    category: "newsletters",
    image: "/gallery/newsletter-3.jpeg",
  },
  {
    title: "Newsletter 04",
    client: "",
    kind: "Newsletter",
    category: "newsletters",
    image: "/gallery/newsletter-4.jpeg",
  },
  {
    title: "Newsletter 05",
    client: "",
    kind: "Newsletter",
    category: "newsletters",
    image: "/gallery/newsletter-5.jpeg",
  },
  {
    title: "Newsletter 06",
    client: "",
    kind: "Newsletter",
    category: "newsletters",
    image: "/gallery/newsletter-6.jpeg",
  },
  {
    title: "Newsletter 07",
    client: "",
    kind: "Newsletter",
    category: "newsletters",
    image: "/gallery/newsletter-7.jpeg",
  },
  {
    title: "Newsletter 08",
    client: "",
    kind: "Newsletter",
    category: "newsletters",
    image: "/gallery/newsletter-8.jpeg",
  },
  {
    title: "Newsletter 09",
    client: "",
    kind: "Newsletter",
    category: "newsletters",
    image: "/gallery/newsletter-9.jpeg",
  },
  {
    title: "Poster 01",
    client: "",
    kind: "Poster",
    category: "posters",
    image: "/gallery/poster-1.jpeg",
  },
  {
    title: "Poster 02",
    client: "",
    kind: "Poster",
    category: "posters",
    image: "/gallery/poster-2.jpeg",
  },
  {
    title: "Poster 03",
    client: "",
    kind: "Poster",
    category: "posters",
    image: "/gallery/poster-3.jpeg",
  },
  {
    title: "Poster 04",
    client: "",
    kind: "Poster",
    category: "posters",
    image: "/gallery/poster-4.jpeg",
  },
  {
    title: "Poster 05",
    client: "",
    kind: "Poster",
    category: "posters",
    image: "/gallery/poster-5.jpeg",
  },
];

/**
 * PARKED, NOT DELETED.
 *
 * These came out of the portfolio PDF and were live on the site before the
 * per-category lists were handed over. Nothing renders them today — they sit
 * here so a decision to bring any of them back is a one-line change rather
 * than a re-hunt for URLs.
 */
export const archivedWriting: WritingItem[] = [
  { title: "Healthcare features & bylines", client: "IndiaMedToday", kind: "Feature writing", category: "articles", href: "https://sites.google.com/view/chithra-prakash/home" },
  { title: "Screen Interactiv & Happiest Health — selected work", client: "Screen Interactiv, Happiest Health", kind: "Social, scripts & campaigns", category: "social-media", href: "https://drive.google.com/drive/folders/1fiMS3PSeS0JxMu00KcQo_9oDk7J2Ptwf?usp=sharing" },
  { title: "Happiest Health", client: "Happiest Health", kind: "YouTube scripts", category: "social-media", href: "https://www.youtube.com/@happiesthealth" },
  { title: "Festive Decor Ideas with Kingsmen Wooden Flooring", client: "Kingsmen", kind: "Blog", category: "blogs", href: "https://www.kingsmen.in/blog/elevate-your-festive-decor-transform-your-home-with-kingsmen-wooden-flooring/" },
  { title: "Easy Wooden Floor Cleaning Tips by Kingsmen", client: "Kingsmen", kind: "Blog", category: "blogs", href: "https://www.kingsmen.in/blog/easy-to-clean-wooden-flooring-tips-and-tricks-for-hassle-free-celebrations/" },
  { title: "Tips to Enhance Wooden Floors for Festive Celebrations", client: "Kingsmen", kind: "Blog", category: "blogs", href: "https://www.kingsmen.in/blog/holiday-elegance-transform-your-wooden-floors-for-the-festive-season/" },
  { title: "Why Hardwood Flooring is Perfect for Your Dance Studio", client: "Kingsmen", kind: "Blog", category: "blogs", href: "https://www.kingsmen.in/blog/hardwood-vs-other-flooring-options-whats-best-for-your-dance-studio/" },
  { title: "How to Choose Wooden Flooring by Kingsmen", client: "Kingsmen", kind: "Blog", category: "blogs", href: "https://www.kingsmen.in/blog/how-to-choose-the-perfect-wooden-flooring-for-your-home/" },
  { title: "Top 5 Reasons Why Wooden Flooring Never Goes Out of Style", client: "Kingsmen", kind: "Blog", category: "blogs", href: "https://www.kingsmen.in/blog/top-5-reasons-why-wooden-flooring-never-goes-out-of-style/" },
  { title: "Why is Wooden Flooring the Best Choice for Modern Homes?", client: "Kingsmen", kind: "Blog", category: "blogs", href: "https://www.kingsmen.in/blog/sustainable-and-durable-why-wooden-flooring-is-the-best-choice-for-modern-homes/" },
  { title: "How to Clean and Maintain Hardwood Floors: Expert Tips", client: "Kingsmen", kind: "Blog", category: "blogs", href: "https://www.kingsmen.in/blog/how-to-clean-and-maintain-hardwood-floors-expert-tips-for-long-lasting-beauty/" },
  { title: "Wood Flooring in Kitchens by Kingsmen", client: "Kingsmen", kind: "Blog", category: "blogs", href: "https://www.kingsmen.in/blog/wood-flooring-in-kitchens-a-perfect-blend-of-style-and-functionality/" },
  { title: "Discover How Wooden Floors Enhance Wellness & Indoor Air Quality", client: "Kingsmen", kind: "Blog", category: "blogs", href: "https://www.kingsmen.in/blog/how-wooden-floors-elevate-wellness-and-indoor-air-quality/" },
  { title: "Wood Flooring Thickness Guide by Kingsmen", client: "Kingsmen", kind: "Blog", category: "blogs", href: "https://www.kingsmen.in/blog/wooden-flooring-thickness-in-mm-a-complete-guide-to-choosing-the-ideal-wood-floor/" },
  { title: "What is the disadvantage of herringbone flooring?", client: "Kingsmen", kind: "Blog", category: "blogs", href: "https://www.kingsmen.in/blog/what-is-the-disadvantage-of-herringbone-flooring/" },
  { title: "Timeless Solid Wood Flooring by Kingsmen", client: "Kingsmen", kind: "Blog", category: "blogs", href: "https://www.kingsmen.in/blog/crafting-luxury-that-lasts-why-solid-wood-flooring-will-never-go-out-of-style/" },
];

/**
 * THE CATEGORIES.
 *
 * The work isn't one undifferentiated pile — it's six kinds of writing, and
 * the homepage shows the kinds, not the pile. Order is deliberate: heaviest
 * body of work first, the ones still being filled in last.
 *
 * Newsletters and posters are separate categories, not one shared card: they
 * are different crafts (one is sequenced copy, one is a single composed
 * frame), and filing them together would mean the day one fills up, the
 * other's emptiness is hidden behind it.
 */
export type Category = { slug: string; name: string; note: string };

/** `note` names the actual clients or output — never a marketing line. */
export const categories: Category[] = [
  { slug: "blogs", name: "Blogs", note: "Amberstone, Kingsmen" },
  { slug: "website-content", name: "Website content", note: "Amberstone, Vamsiram" },
  { slug: "articles", name: "Articles", note: "IndiaMedToday, New Indian Express" },
  { slug: "social-media", name: "Social media", note: "Reels, carousels & campaigns" },
  { slug: "newsletters", name: "Newsletters", note: "Design & editorial" },
  { slug: "posters", name: "Posters", note: "Campaign artwork" },
];

/** Every category, in order, with its pieces — empty ones included. */
export function writingByCategory(): { category: Category; items: WritingItem[] }[] {
  return categories.map((category) => ({
    category,
    items: writing.filter((piece) => piece.category === category.slug),
  }));
}

/** One category by slug, or undefined — the /work/[slug] route's 404 check. */
export function categoryBySlug(slug: string): Category | undefined {
  return categories.find((category) => category.slug === slug);
}

/** A category's pieces, in the order they were handed over. */
export function writingIn(slug: string): WritingItem[] {
  return writing.filter((piece) => piece.category === slug);
}

/** Accounts she's written and managed — chips, not cards. Twenty cards is a wall. */
export const socialAccounts = [
  {
    label: "Happiest Health",
    href: "https://www.instagram.com/happiesthealthmagazine?igsh=MXI0dDlibmwzcXhxeA==",
  },
  {
    label: "Amberstone",
    href: "https://www.instagram.com/amberstonegroup?igsh=c2pxZWc1MnQxbmR5",
  },
  {
    label: "Sumuk",
    href: "https://www.instagram.com/_sumuk.projects_?igsh=MWswYXY0a3E2MmRqYQ==",
  },
  {
    label: "Kingsmen",
    href: "https://www.instagram.com/kingsmen_india?igsh=MTQ4ZGxsbjltNWk1ag==",
  },
  {
    label: "Tentuff",
    href: "https://www.instagram.com/tentuff_india?igsh=MWkybzZ3ZTdrcWNtbw==",
  },
  {
    label: "Screen Interactiv",
    href: "https://www.instagram.com/screen_interactiv?igsh=N3ZjZTk3YTBsMmRo",
  },
  {
    label: "Earthenhive",
    href: "https://www.instagram.com/earthenhivearchitects?igsh=eTdrejl1eHd2ODJr",
  },
  {
    label: "Prakaram Productions",
    href: "https://www.instagram.com/prakaram_productions_pvt_ltd?igsh=MTQwbXBkdDdpcml6eA==",
  },
];

/** The inverted marquee band — her capability list, in her own words. */
export const skills = [
  "Social media content and digital campaigns",
  "Copywriting and brand messaging",
  "Blogs, editorials and long form content",
  "Scripts, research and storytelling",
  "Client servicing and account management",
];

export const contact = {
  headline: [
    { text: "Let's Write Something" },
    { text: "Worth Reading", em: true },
  ],
  subhead:
    "Got a brand that needs a voice, or a story that needs telling? Reach out if you'd like to work together. I'd love to hear about it!",
};
