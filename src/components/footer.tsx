"use client";
import { Github, Linkedin, Mail } from "lucide-react";
import { useEffect, useState } from "react";

const SocialIcons = () => {
    return (
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-8" style={{ color: "var(--text)" }}>
        <a href="mailto:hola@tu.com" aria-label="Email" className="text-text hover:text-highlight flex items-center gap-2">
          <Mail size={20} strokeWidth={1.75} />
        </a>
        <a href="https://github.com/seedwalk" aria-label="GitHub" className="text-text hover:text-highlight flex items-center gap-2">
          <Github size={20} strokeWidth={1.75} />
        </a>
        <a href="https://www.linkedin.com/in/federico-caramelli" aria-label="LinkedIn" className="text-text hover:text-highlight flex items-center gap-2">
          <Linkedin size={20} strokeWidth={1.75} />
        </a>
      </div>
    );
  };

export const Footer = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;
            
            // El footer se hace visible cuando se pasan las 2 pantallas iniciales (Hero + About)
            // Esto sucede cuando el scroll pasa las 2 pantallas iniciales
            const shouldBeVisible = scrollY >= windowHeight * 2;
            
            setIsVisible(shouldBeVisible);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section 
            className={`fixed bottom-0 left-0 w-full z-3 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
            style={{ 
                backgroundColor: "var(--bg-1)",
                display: isVisible ? 'block' : 'none'
            }}
        >
            <div className="flex flex-col items-center justify-center py-16 sm:py-24 md:py-32 lg:py-40 gap-6 sm:gap-8 md:gap-10 max-w-3xl mx-auto px-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center">Thank you for your time!</h1>
              <p className="text-center text-sm sm:text-base md:text-lg">If you have any questions or would like to get in touch, please feel free to contact me.</p>
              <SocialIcons />
            </div>
        </section>
    );
};
