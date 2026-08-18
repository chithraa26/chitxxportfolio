import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Nav from "@/components/nav";
import Reveal from "@/components/reveal";
import Footer from "@/components/footer";
import CategoryCard from "@/components/category-card";
import PreviewGrid, { ExternalArrow } from "@/components/preview-grid";
import SocialGrid from "@/components/social-grid";
import GalleryGrid from "@/components/gallery-grid";
import { CATEGORY_ART } from "@/components/category-art";
import {
  categories,
  categoryBySlug,
  site,
  socialAccounts,
  writingByCategory,
  writingIn,
} from "@/lib/content";

/** Six pages, all known at build time — nothing here is dynamic at runtime. */
export function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = categoryBySlug(slug);
  if (!category) return {};
  return {
    title: category.name,
    description: `${category.name} by ${site.name}.`,
  };
}

/**
 * ONE CATEGORY, ONE PAGE.
 *
 * You clicked Blogs, so the page is blogs — nothing else competing for the
 * scroll. The other categories return at the bottom as the same cards you
 * arrived through, which is what makes this a browse rather than a dead end:
 * finish reading, pick the next door, no back button required.
 */
export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = categoryBySlug(slug);
  if (!category) notFound();

  const items = writingIn(slug);
  const others = writingByCategory().filter((group) => group.category.slug !== slug);
  const Art = CATEGORY_ART[slug];
  const isSocial = slug === "social-media";
  // Design work has no destination — it opens in place instead of a new tab
  const isGallery = slug === "newsletters" || slug === "posters";

  return (
    <>
      <Nav solid />
      <main>
        <section className="section-x pt-[clamp(112px,18vw,160px)] pb-[clamp(40px,6vw,72px)]">
          <div className="mx-auto max-w-6xl text-center">
            <Reveal>
              {/* The sticker comes with you, so the page you land on is
                  visibly the one you clicked */}
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border-2 border-ink bg-card p-2">
                <Art />
              </span>
              <h1 className="mt-6 font-display text-[clamp(1.75rem,6vw,3.5rem)] leading-[1.1] tracking-[-0.01em]">
                {category.name}
              </h1>
              <p className="label mt-4 text-accent-muted">
                {items.length} {items.length === 1 ? "piece" : "pieces"}
              </p>
            </Reveal>
          </div>
        </section>

        <section className="section-x pb-[clamp(56px,9vw,112px)]">
          <div className="mx-auto max-w-6xl">
            {items.length === 0 ? (
              <Reveal>
                <p className="mx-auto max-w-[52ch] text-center text-[16px] leading-[1.6] text-ink-soft">
                  {category.name} are being collected — links coming shortly.
                </p>
              </Reveal>
            ) : isSocial ? (
              <Reveal>
                <SocialGrid items={items} />
              </Reveal>
            ) : isGallery ? (
              <Reveal>
                <GalleryGrid items={items} />
              </Reveal>
            ) : (
              <Reveal>
                <PreviewGrid items={items} />
              </Reveal>
            )}

            {/* Accounts belong with social, not stranded at the page bottom */}
            {isSocial && (
              <Reveal delay={0.08}>
                <div className="mt-16 text-center">
                  <p className="label text-accent-muted">Accounts written for</p>
                  <ul className="mt-5 flex flex-wrap justify-center gap-2">
                    {socialAccounts.map((account) => (
                      <li key={account.href}>
                        <a
                          href={account.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="label group flex items-center gap-2 rounded-full border border-line px-3 py-1.5 text-ink-soft transition-colors duration-150 ease-default hover:border-accent hover:text-accent"
                        >
                          {account.label}
                          <ExternalArrow />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            )}
          </div>
        </section>

        {/* The way onward */}
        <section className="section-x border-t border-line py-[clamp(56px,9vw,112px)]">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <h2 className="text-center font-display text-[clamp(1.25rem,4vw,2rem)] leading-[1.2]">
                More work
              </h2>
            </Reveal>
            <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {others.map((group, i) => (
                <Reveal key={group.category.slug} delay={Math.min(i, 4) * 0.05}>
                  <CategoryCard
                    category={group.category}
                    count={group.items.length}
                    compact
                  />
                </Reveal>
              ))}
            </div>

            <div className="mt-14 text-center">
              <Link
                href="/"
                className="label text-ink-soft transition-colors duration-150 ease-default hover:text-accent"
              >
                ← Back home
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
