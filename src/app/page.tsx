import { About } from "@/components/about";
import { Experience } from "@/components/experience";
import { MySkills } from "@/components/my-skills";
import { Hero } from "@/components/hero";
import { Mail, Github, Linkedin } from "lucide-react";

const SocialIcons = () => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 sm:gap-8" style={{ color: "var(--text)" }}>
      <a href="mailto:hola@tu.com" aria-label="Email" className="text-text hover:text-highlight flex items-center gap-2">
        <Mail style={{ color: "var(--text)" }} size={20} strokeWidth={1.75} />
        <span>fede@seedwalk.net</span>
      </a>
      <a href="https://github.com/tu" aria-label="GitHub" className="text-text hover:text-highlight flex items-center gap-2">
        <Github size={20} strokeWidth={1.75} /> seedwalk
      </a>
      <a href="https://linkedin.com/in/tu" aria-label="LinkedIn" className="text-text hover:text-highlight flex items-center gap-2">
        <Linkedin size={20} strokeWidth={1.75} />federico-caranmelli
      </a>
    </div>
  );
};



export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <MySkills />
      <Experience />
      <section style={{ backgroundColor: "var(--bg-1)" }}>
        <div className="flex flex-col items-center justify-center py-16 sm:py-24 md:py-32 lg:py-40 gap-6 sm:gap-8 md:gap-10 max-w-3xl mx-auto px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center">Thank you for your time!</h1>
          <p className="text-center text-sm sm:text-base md:text-lg">If you have any questions or would like to get in touch, please feel free to contact me.</p>
          <SocialIcons />
        </div>
      </section>
    </>
  );
}
