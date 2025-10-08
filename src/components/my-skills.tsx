"use client";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { motion } from "motion/react";
import { useInView } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useScrollSnap } from "@/hooks/useScrollSnap";

const skills = [
    { name: "HTML5", filename: "html-5.png", backgroundColor: "white" },
    { name: "JavaScript", filename: "js.png", backgroundColor: "transparent" },
    { name: "TypeScript", filename: "typescript.png", backgroundColor: "transparent" },
    { name: "Sass", filename: "sass.png", backgroundColor: "white" },
    { name: "Emotion", filename: "emotion.png", backgroundColor: "white" },
    { name: "Styled Components", filename: "styled-components.png", backgroundColor: "white" },
    { name: "JSS", filename: "jss.png", backgroundColor: "white" },
    { name: "Tailwind CSS", filename: "tailwind.png", backgroundColor: "white" },
    { name: "Node.js", filename: "node.svg", backgroundColor: "white" },
    { name: "NestJS", filename: "nestjs.svg", backgroundColor: "white" },
    { name: "Next.js", filename: "nextjs.png", backgroundColor: "white" },
    { name: "React", filename: "react.png", backgroundColor: "white" },
    { name: "React Native", filename: "react.png", backgroundColor: "black" },
    { name: "Redux", filename: "redux.png", backgroundColor: "white" },
    { name: "GraphQL", filename: "graphql.png", backgroundColor: "white" },
    { name: "Apollo", filename: "apollo.png", backgroundColor: "white" },
    { name: "React Query", filename: "react-query.svg", backgroundColor: "white" },
    { name: "MySQL", filename: "mysql.svg", backgroundColor: "white" },
    { name: "PostgreSQL", filename: "postgresql.svg", backgroundColor: "white" },
    { name: "PHP", filename: "php.svg", backgroundColor: "white" },
    { name: "Unity", filename: "unity.svg", backgroundColor: "white" },
    { name: "Laravel", filename: "laravel.svg", backgroundColor: "white" },
    { name: "Docker", filename: "docker.svg", backgroundColor: "white" }
  ];

const SkillBox = ({ skill, index, isInView }: { skill: { name: string; filename: string; backgroundColor: string }, index: number, isInView: boolean }) => (
    <motion.div 
      style={{
        backgroundColor: "var(--bg-2)",
        borderRadius: "10px"
      }} 
      className="flex flex-col items-center gap-2 hover:scale-105 transition-transform justify-around w-[100px] h-[100px] sm:w-[110px] sm:h-[110px] md:w-[120px] md:h-[120px] p-3 sm:p-3 md:p-4"
      initial={{ opacity: 0, y: 30, scale: 0.8 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.8 }}
      transition={{ 
        duration: 0.5, 
        ease: [0.25, 0.1, 0.25, 1], 
        delay: index * 0.05 
      }}
    >
      <div style={{
        backgroundColor: skill.backgroundColor, 
        borderRadius: '10px', 
        display: skill.backgroundColor === 'transparent' ? 'none' : 'block'
      }} className="p-1 sm:p-1.5 md:p-2">
        <Image
          src={`/assets/skills/${skill.filename}`}
          alt={skill.name}
          width={48}
          height={48}
          className="object-contain w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10"
        />
      </div>
      {skill.backgroundColor === 'transparent' && (
        <Image
          src={`/assets/skills/${skill.filename}`}
          alt={skill.name}
          width={48}
          height={48}
          className="object-contain w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10"
        />
      )}
      <span className="text-xs sm:text-xs md:text-sm text-center" style={{ color: "var(--text)" }}>
        {skill.name}
      </span>
    </motion.div>
  )
  
  
  export const MySkills = () => {
    const [isFixed, setIsFixed] = useState(false);
    const [shouldScroll, setShouldScroll] = useState(false);
    const [shouldAnimate, setShouldAnimate] = useState(false);
    const { scrollToSection } = useScrollSnap({
      sections: ['hero', 'about', 'skills', 'experience']
    });

    const handleContinue = () => {
      scrollToSection(3); // Navegar a Experience (índice 3)
    };

    useEffect(() => {
      const handleScroll = () => {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        
        // Cuando el scroll pasa la primera pantalla (Hero)
        const shouldBeFixed = scrollY >= windowHeight;
        
        // Cuando el scroll llega al final de About (Hero + About = 2 * windowHeight)
        const shouldStartScrolling = scrollY >= windowHeight * 2;
        
        setIsFixed(shouldBeFixed && !shouldStartScrolling);
        setShouldScroll(shouldStartScrolling);

        // Detectar cuando About está en viewport para animar Skills
        const sections = document.getElementsByTagName('section');
        if (sections.length >= 2) {
          const aboutSection = sections[1]; // About es el segundo section
          const aboutRect = aboutSection.getBoundingClientRect();
          const aboutHeight = aboutSection.offsetHeight;
          
          // Animar Skills cuando About está completamente visible
          // About está visible cuando su top está en la parte superior de la pantalla
          const isAboutInView = aboutRect.top <= 0 && aboutRect.bottom >= aboutHeight;
          
          // Invertir la lógica: animar cuando About NO está visible (Skills está visible)
          setShouldAnimate(!isAboutInView);
        }
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
      <section 
        className={`${isFixed ? 'fixed top-0 left-0' : shouldScroll ? 'relative' : ''}  w-full z-2`}
        style={{ backgroundColor: "var(--bg-1)" }}
      >
        <div className="flex flex-col items-center justify-center py-16 sm:py-24 md:py-32 lg:py-40 gap-6 sm:gap-8 md:gap-10 max-w-6xl mx-auto px-4">
          <motion.h1 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
          >
            Skills
          </motion.h1>
          {/* Desktop layout - mantiene el diseño original */}
          <div className="hidden sm:flex flex-wrap gap-4 w-full justify-center">
            {skills.map((skill, index) => (
              <SkillBox key={`${skill.name}-${index}`} skill={skill} index={index} isInView={shouldAnimate} />
            ))}
          </div>
          {/* Mobile layout - flex más compacto */}
          <div className="sm:hidden flex flex-wrap gap-3 w-full justify-center">
            {skills.map((skill, index) => (
              <SkillBox key={`${skill.name}-${index}`} skill={skill} index={index} isInView={shouldAnimate} />
            ))}
          </div>
        </div>
        
        {/* Continue button */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <button
            onClick={handleContinue}
            className="flex flex-col items-center gap-2 text-gray-400 hover:text-gray-300 cursor-pointer transition-colors group"
          >
            <span className="text-sm font-medium group-hover:text-gray-200 transition-colors">Continue</span>
            <ChevronDown size={24} />
          </button>
        </div>
      </section>
    );
  };