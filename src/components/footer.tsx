"use client";
import { Github, Linkedin, Mail } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "motion/react";

const SocialIcons = ({ showIcons }: { showIcons: boolean }) => {
    const icons = [
        { href: "mailto:hola@tu.com", label: "Email", icon: Mail },
        { href: "https://github.com/seedwalk", label: "GitHub", icon: Github },
        { href: "https://www.linkedin.com/in/federico-caramelli", label: "LinkedIn", icon: Linkedin }
    ];

    return (
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-8" style={{ color: "var(--text)" }}>
        {icons.map(({ href, label, icon: Icon }, index) => (
            <motion.a
                key={label}
                href={href}
                aria-label={label}
                className="text-text hover:text-highlight flex items-center gap-2"
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={showIcons ? { 
                    opacity: 1, 
                    y: 0, 
                    scale: 1,
                    transition: {
                        delay: index * 0.2,
                        duration: 0.5,
                        ease: "easeOut"
                    }
                } : { opacity: 0, y: 20, scale: 0.8 }}
                whileHover={{ 
                    scale: 1.1,
                    transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.95 }}
            >
                <Icon size={20} strokeWidth={1.75} />
            </motion.a>
        ))}
      </div>
    );
  };

const RevealedText = ({ text, revealedChars, className }: { text: string; revealedChars: number; className: string }) => {
    return (
        <span className={className}>
            {text.split('').map((char, index) => (
                <span
                    key={index}
                    style={{
                        color: index < revealedChars ? 'var(--text)' : 'var(--bg-1)',
                        transition: 'color 0.1s ease-in-out'
                    }}
                >
                    {char === ' ' ? '\u00A0' : char}
                </span>
            ))}
        </span>
    );
};

export const Footer = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [revealedChars, setRevealedChars] = useState(0);
    const [revealedSubChars, setRevealedSubChars] = useState(0);
    const [isRevealing, setIsRevealing] = useState(false);
    const [isRevealingSubText, setIsRevealingSubText] = useState(false);
    const [showSocialIcons, setShowSocialIcons] = useState(false);
    
    const fullText = "Thank you for your time!";
    const subText = "If you have any questions or would like to get in touch, please feel free to contact me.";

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            
            // El footer se hace visible cuando el scroll llega cerca del fondo del documento
            // Usamos un threshold de 100px antes del final para que se active suavemente
            const shouldBeVisible = scrollY + windowHeight >= documentHeight - 100;
            
            setIsVisible(shouldBeVisible);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (isVisible) {
            console.log("Footer is visible, starting reveal effect");
            setIsRevealing(true);
            setRevealedChars(0);
            setRevealedSubChars(0);
            
            // Pequeño delay para que sea más visible
            setTimeout(() => {
                let currentIndex = 0;
                const revealInterval = setInterval(() => {
                    if (currentIndex < fullText.length) {
                        setRevealedChars(currentIndex + 1);
                        currentIndex++;
                    } else {
                        clearInterval(revealInterval);
                        setIsRevealing(false);
                        
                        // Iniciar el segundo reveal después de un pequeño delay
                        setTimeout(() => {
                            setIsRevealingSubText(true);
                            let subCurrentIndex = 0;
                            const subRevealInterval = setInterval(() => {
                                if (subCurrentIndex < subText.length) {
                                    setRevealedSubChars(subCurrentIndex + 1);
                                    subCurrentIndex++;
                                } else {
                                    clearInterval(subRevealInterval);
                                    setIsRevealingSubText(false);
                                    
                                    // Mostrar los social icons después de que termine el segundo texto
                                    setTimeout(() => {
                                        setShowSocialIcons(true);
                                    }, 300);
                                }
                            }, 30); // Velocidad más rápida para el subtítulo
                        }, 500); // Delay de 500ms entre textos
                    }
                }, 100); // Velocidad de revelado: 100ms por carácter
            }, 300); // Delay inicial de 300ms
        }
    }, [isVisible, fullText, subText]);

    return (
        <section 
            className={`fixed bottom-0 left-0 w-full z-3 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
            style={{ 
                backgroundColor: "var(--bg-1)",
                display: isVisible ? 'block' : 'none'
            }}
        >
            <div className="flex flex-col items-center justify-center py-16 sm:py-24 md:py-32 lg:py-40 gap-6 sm:gap-8 md:gap-10 max-w-3xl mx-auto px-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center min-h-[1.2em]">
                <RevealedText 
                    text={fullText} 
                    revealedChars={revealedChars} 
                    className=""
                />
              </h1>
              <p className="text-center text-sm sm:text-base md:text-lg min-h-[1.5em]">
                <RevealedText 
                    text={subText} 
                    revealedChars={revealedSubChars} 
                    className=""
                />
              </p>
              <SocialIcons showIcons={showSocialIcons} />
            </div>
        </section>
    );
};
