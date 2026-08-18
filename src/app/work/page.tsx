import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/nav";
import Reveal from "@/components/reveal";
import CategoryCard from "@/components/category-card";
import Footer from "@/components/footer";
import { writing, writingByCategory } from "@/lib/content";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Published writing by Chithra Prakash — blogs, website content, articles, social media, newsletters and posters.",
};

/**
 * THE INDEX. Six doors, no pieces.
 *
 * Everything used to live on this one page, which meant landing here dumped
 * twenty-odd links on you at once. Now each category owns a page and this one
 * only has to answer "what kinds of writing are there?" — the same cards as
 * the homepage, so arriving here feels like the same room.
 */
export default function WorkPage() {
  const groups = writingByCategory();

  return (
    <>
      {/* solid: there's no hero to sit transparently over on this page */}
      <Nav solid />
      <main>
        <section className="section-x pt-[clamp(112px,18vw,160px)] pb-[clamp(48px,8vw,96px)]">
          <div className="mx-auto max-w-6xl text-center">
            <Reveal>
              {/*
                The heading is for screen readers and search engines only. On
                screen the cards already say what this page is — a title above
                them was labelling the obvious, so it went. The count stays:
                that's the one thing the cards can't say collectively.
              */}
              <h1 className="sr-only">Published writing</h1>
              <p className="label text-accent-muted">{writing.length} pieces</p>
            </Reveal>

            <div className="mt-10 grid grid-cols-1 gap-5 text-left sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {groups.map(({ category, items }, i) => (
                <Reveal key={category.slug} delay={Math.min(i, 5) * 0.06}>
                  <CategoryCard category={category} count={items.length} />
                </Reveal>
              ))}
            </div>

            <div className="mt-14">
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
