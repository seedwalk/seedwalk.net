"use client";
import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { useScrollSnap } from "@/hooks/useScrollSnap";

export const Hero = () => {
  const { scrollToSection, currentSection } = useScrollSnap({
    sections: ['hero', 'about', 'skills', 'experience']
  });

  const handleScrollDown = () => {
    scrollToSection(1); // Navegar a About (índice 1)
  };

  // Ocultar cuando hayamos pasado 2 secciones (skills = índice 2, experience = índice 3)
  const shouldHide = currentSection >= 2;

  return (
    <motion.section
      initial={{ backgroundColor: "var(--bg-3)" }}
      animate={{ 
        backgroundColor: "var(--bg-1)",
        opacity: shouldHide ? 0 : 1,
        visibility: shouldHide ? "hidden" : "visible"
      }}
      transition={{ 
        duration: 1.5, 
        ease: [0.25, 0.1, 0.25, 1],
        opacity: { duration: 0.5, ease: "easeInOut" },
        visibility: { duration: 0 }
      }}
      className="min-h-screen fixed top-0 left-0 w-full z-1"
    >
      <div className="flex flex-col items-center justify-center h-screen p-8 sm:p-16 md:p-24 lg:p-40 gap-6 sm:gap-8 md:gap-10">
        <div className="flex flex-col items-center justify-center gap-8 text-center px-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: 1.8 }}
            >
              Federico
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: 2.3 }}
            >
              {" "}Caramelli
            </motion.span>
          </h1>
          <div className="relative">
            <h2 className="text-2xl sm:text-3xl md:text-4xl">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: 2.8 }}
              >
                Full
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: 3.2 }}
              >
                {" "}Stack
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: 3.7 }}
              >
                {" "}Developer
              </motion.span>
            </h2>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: 4.0 }}
              className="absolute -bottom-2 left-0 h-1 bg-[#e82e22]"
            />
          </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: 5.0 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2 text-gray-400 hover:text-gray-300 cursor-pointer transition-colors"
            onClick={handleScrollDown}
          >
            <span className="text-sm font-medium">Scroll</span>
            <ChevronDown size={24} />
          </motion.div>
        </motion.div>
      </motion.section>
    );
  };
