import { useEffect, useRef, useState } from 'react';

export const useInViewport = <T extends HTMLElement = HTMLDivElement>(options?: IntersectionObserverInit) => {
  const ref = useRef<T>(null);
  const [isInViewport, setIsInViewport] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInViewport(entry.isIntersecting);
      },
      {
        threshold: 0.1, // Se activa cuando el 10% del elemento es visible
        rootMargin: '0px 0px -50px 0px', // Se activa un poco antes de que esté completamente visible
        ...options,
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [options]);

  return { ref, isInViewport };
};
