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
    const [revealedSub1Chars, setRevealedSub1Chars] = useState(0);
    const [revealedSub2Chars, setRevealedSub2Chars] = useState(0);
    const [isRevealing, setIsRevealing] = useState(false);
    const [isRevealingSub1, setIsRevealingSub1] = useState(false);
    const [isRevealingSub2, setIsRevealingSub2] = useState(false);
    const [showSocialIcons, setShowSocialIcons] = useState(false);
    
    const fullText = "Thank you for your time!";
    const subText1 = "If you have any questions or would like to get in touch";
    const subText2 = "feel free to contact me.";

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
            setRevealedSub1Chars(0);
            setRevealedSub2Chars(0);
            
            // Pequeño delay para que sea más visible
            setTimeout(() => {
                // 1. Revelar fullText
                let currentIndex = 0;
                const revealInterval = setInterval(() => {
                    if (currentIndex < fullText.length) {
                        setRevealedChars(currentIndex + 1);
                        currentIndex++;
                    } else {
                        clearInterval(revealInterval);
                        setIsRevealing(false);
                        
                        // 2. Iniciar subText1 después de un delay
                        setTimeout(() => {
                            setIsRevealingSub1(true);
                            let sub1CurrentIndex = 0;
                            const sub1RevealInterval = setInterval(() => {
                                if (sub1CurrentIndex < subText1.length) {
                                    setRevealedSub1Chars(sub1CurrentIndex + 1);
                                    sub1CurrentIndex++;
                                } else {
                                    clearInterval(sub1RevealInterval);
                                    setIsRevealingSub1(false);
                                    
                                    // 3. Iniciar subText2 después de un delay
                                    setTimeout(() => {
                                        setIsRevealingSub2(true);
                                        let sub2CurrentIndex = 0;
                                        const sub2RevealInterval = setInterval(() => {
                                            if (sub2CurrentIndex < subText2.length) {
                                                setRevealedSub2Chars(sub2CurrentIndex + 1);
                                                sub2CurrentIndex++;
                                            } else {
                                                clearInterval(sub2RevealInterval);
                                                setIsRevealingSub2(false);
                                                
                                                // 4. Mostrar los social icons después de que termine todo
                                                setTimeout(() => {
                                                    setShowSocialIcons(true);
                                                }, 300);
                                            }
                                        }, 30); // Velocidad para subText2
                                    }, 500); // Delay entre subText1 y subText2
                                }
                            }, 30); // Velocidad para subText1
                        }, 500); // Delay entre fullText y subText1
                    }
                }, 100); // Velocidad de revelado para fullText: 100ms por carácter
            }, 300); // Delay inicial de 300ms
        }
    }, [isVisible, fullText, subText1, subText2]);

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
                     text={subText1} 
                     revealedChars={revealedSub1Chars} 
                     className=""
                 />
                 <br />
                 <RevealedText 
                     text={subText2} 
                     revealedChars={revealedSub2Chars} 
                     className=""
                 />
                </p>
              <SocialIcons showIcons={showSocialIcons} />
            </div>
        </section>
    );
};
