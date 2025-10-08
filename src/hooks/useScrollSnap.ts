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
    let targetScrollY = sectionIndex * windowHeight;
    
    // Para Experience (índice 3), agregar 20px extra para evitar espacio negro
    if (sectionIndex === 3) {
      targetScrollY += 20;
    }
    
    // Para MySkills (índice 2), asegurar que se posicione correctamente
    // cuando se viene desde Experience
    if (sectionIndex === 2) {
      const currentScrollY = window.scrollY;
      // Si venimos desde Experience (scrollY >= 3 * windowHeight)
      if (currentScrollY >= windowHeight * 3) {
        // Ir a la posición exacta de MySkills
        targetScrollY = windowHeight * 2;
      }
    }
    
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
    
    // Si estamos scrolleando automáticamente, prevenir todo scroll nativo
    if (isScrolling) {
      e.preventDefault();
      return;
    }

    // Calcular la sección actual considerando el offset de Experience
    let currentSectionIndex = Math.round(currentScrollY / windowHeight);
    if (currentScrollY >= windowHeight * 3) {
      currentSectionIndex = Math.round((currentScrollY - 20) / windowHeight);
    }

    // Si estamos en Experience (índice 3 o más), permitir scroll normal
    if (currentScrollY >= windowHeight * 3) {
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
    
    // Calcular la sección actual
    let newSectionIndex;
    
    if (currentScrollY >= windowHeight * 3) {
      // En Experience o más allá - permitir scroll libre
      newSectionIndex = Math.round((currentScrollY - 20) / windowHeight);
    } else {
      // En las primeras 3 secciones (Hero, About, Skills)
      newSectionIndex = Math.round(currentScrollY / windowHeight);
    }
    
    // Asegurar que el índice esté dentro del rango válido
    newSectionIndex = Math.max(0, Math.min(newSectionIndex, sections.length - 1));
    
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
