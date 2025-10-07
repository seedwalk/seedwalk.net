import { About } from "@/components/about";
import { Experience } from "@/components/experience";
import { MySkills } from "@/components/my-skills";
import { Mail, Github, Linkedin } from "lucide-react";

const SocialIcons = () => {
  return (
    <div className="flex gap-8" style={{ color: "var(--text)" }}>
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
      <section style={{ backgroundColor: "var(--bg-1)" }}>
        <div className="flex flex-col items-center justify-center p-40 gap-10">
          <div className="flex flex-col items-center justify-center gap-2">
            <h1 className="text-7xl">Federico Caramelli</h1>
            <h2 className="text-4xl">Full-Stack Developer</h2>
          </div>
        </div>
      </section>
      <About />
      <MySkills />
      <Experience />
      <section style={{ backgroundColor: "var(--bg-1)" }}>
        <div className="flex flex-col items-center justify-center py-40 gap-10 max-w-3xl mx-auto">
          <h1 className="text-6xl">Thank you for your time!</h1>
          <p>If you have any questions or would like to get in touch, please feel free to contact me.</p>
          <SocialIcons />
        </div>
      </section>
    </>
  );
}
