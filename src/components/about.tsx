"use client";
import { motion } from "motion/react";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ChevronDown } from "lucide-react";
import { useScrollSnap } from "@/hooks/useScrollSnap";

export const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollToSection } = useScrollSnap({
    sections: ['hero', 'about', 'skills', 'experience']
  });

  const handleContinue = () => {
    scrollToSection(2); // Navegar a Skills (índice 2)
  };

  return (
    <section className="relative z-3 h-screen mt-[100vh]" style={{ backgroundColor: "var(--bg-2)" }}>
      <div ref={ref} className="flex flex-col items-center justify-center h-full gap-6 sm:gap-8 md:gap-10 max-w-4xl mx-auto px-4">
        <motion.h1 
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
        >
          About Me
        </motion.h1>
        <motion.div 
          className="space-y-4 sm:space-y-6"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: 0.4 }}
        >
          <motion.p 
            className="text-sm sm:text-base md:text-lg leading-relaxed text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: 0.6 }}
          >
            I'm a multidisciplinary developer driven by curiosity and constant learning. I love exploring new technologies, understanding how things work beneath the surface, and finding elegant ways to solve complex problems. My work blends creativity and precision aiming for solutions that are not only functional but meaningful and well-crafted.
          </motion.p>
          <motion.p 
            className="text-sm sm:text-base md:text-lg leading-relaxed text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: 0.8 }}
          >
            I've always been a self-learner and an independent thinker, someone who enjoys turning ideas into reality through code. What motivates me most is the process itself: learning, experimenting, and creating experiences that connect people and technology in a simple, authentic way.
          </motion.p>
        </motion.div>
        
        {/* Continue button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: 1.0 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.button
            onClick={handleContinue}
            className="flex flex-col items-center gap-2 text-gray-400 hover:text-gray-300 cursor-pointer transition-colors group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-sm font-medium group-hover:text-gray-200 transition-colors">Continue</span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChevronDown size={24} />
            </motion.div>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};
