"use client";
import { About } from "@/components/about";
import { Experience } from "@/components/experience";
import { MySkills } from "@/components/my-skills";
import { Hero } from "@/components/hero";
import { Footer } from "@/components/footer";
import { useScrollSnap } from "@/hooks/useScrollSnap";
import { useEffect } from "react";

export default function Home() {
  const { currentSection, scrollToSection, isScrolling } = useScrollSnap({
    sections: ['hero', 'about', 'skills', 'experience']
  });

  // Reset scroll to top on page refresh/load
  useEffect(() => {
    // Reset scroll position instantly without smooth scrolling
    window.scrollTo(0, 0);
    
    // Also reset the scroll behavior to ensure no smooth scrolling
    document.documentElement.style.scrollBehavior = 'auto';
    
    // Cleanup: restore smooth scrolling after a brief moment
    const timer = setTimeout(() => {
      document.documentElement.style.scrollBehavior = 'smooth';
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

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
