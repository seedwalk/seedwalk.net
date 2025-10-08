"use client";
import { About } from "@/components/about";
import { Experience } from "@/components/experience";
import { MySkills } from "@/components/my-skills";
import { Hero } from "@/components/hero";
import { Footer } from "@/components/footer";
import { useScrollSnap } from "@/hooks/useScrollSnap";

export default function Home() {
  const { currentSection, scrollToSection, isScrolling } = useScrollSnap({
    sections: ['hero', 'about', 'skills', 'experience']
  });

  return (
    <div className="pb-[400px]">
      <Hero />
      <About />
      <MySkills />
      <Experience />
      <Footer />
    </div>
  );
}
