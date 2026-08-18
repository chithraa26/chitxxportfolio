import Nav from "@/components/nav";
import Hero from "@/components/hero";
import About from "@/components/about";
import Work from "@/components/work";
import Writing from "@/components/writing";
import SkillsStrip from "@/components/skills-strip";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />

        {/*
          THE OVERLAP.

          The hero is sticky at z-0; everything below rides in one slab at
          z-10 with its own opaque background, so the page slides up OVER the
          photograph instead of pushing it away. The rounded top edge and the
          shadow above it are what make the move readable — without them the
          slab just looks like the next section.
        */}
        <div className="relative z-10 rounded-t-[28px] bg-paper pt-[clamp(56px,9vw,112px)] shadow-[0_-24px_60px_rgba(0,0,0,0.18)] md:rounded-t-[36px]">
          <About />
          <Work />
          <Writing />
          <SkillsStrip />
          <Footer />
        </div>
      </main>
    </>
  );
}
