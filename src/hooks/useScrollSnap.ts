"use client";
import { useEffect, useRef, useState } from 'react';

interface ScrollSnapConfig {
  sections: string[];
  snapThreshold?: number;
}

export const useScrollSnap = ({ sections, snapThreshold = 50 }: ScrollSnapConfig) => {
  const [currentSection, setCurrentSection] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const lastScrollY = useRef(0);

  const scrollToSection = (sectionIndex: number) => {
    if (sectionIndex < 0 || sectionIndex >= sections.length) return;
    
    setIsScrolling(true);
    const windowHeight = window.innerHeight;
    const targetScrollY = sectionIndex * windowHeight;
    
    window.scrollTo({
      top: targetScrollY,
      behavior: 'smooth'
    });

    setCurrentSection(sectionIndex);
    
    // Reset scrolling state after animation
    setTimeout(() => {
      setIsScrolling(false);
    }, 800);
  };

  const handleWheel = (e: WheelEvent) => {
    const currentScrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const currentSectionIndex = Math.round(currentScrollY / windowHeight);

    // Si estamos scrolleando automáticamente, prevenir todo scroll nativo
    if (isScrolling) {
      e.preventDefault();
      return;
    }

    // Si estamos en Experience (índice 3 o más), permitir scroll normal
    if (currentSectionIndex >= 3) {
      return;
    }

    // Prevenir scroll nativo en las secciones con snap (0, 1, 2)
    e.preventDefault();

    const deltaY = e.deltaY;

    if (deltaY > 0) {
      // Scrolling down
      if (currentSectionIndex < 3) { // Permitir hasta Experience (índice 3)
        scrollToSection(currentSectionIndex + 1);
      }
    } else {
      // Scrolling up
      if (currentSectionIndex > 0) {
        scrollToSection(currentSectionIndex - 1);
      }
    }
  };

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const newSectionIndex = Math.round(currentScrollY / windowHeight);
    
    if (newSectionIndex !== currentSection) {
      setCurrentSection(newSectionIndex);
    }
    
    lastScrollY.current = currentScrollY;
  };

  useEffect(() => {
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isScrolling, currentSection]);

  return {
    currentSection,
    scrollToSection,
    isScrolling
  };
};
