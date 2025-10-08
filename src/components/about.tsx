export const About = () => (
<section className="relative z-3 h-screen mt-[100vh]" style={{ backgroundColor: "var(--bg-2)" }}>
    <div className="flex flex-col items-center justify-center h-full gap-6 sm:gap-8 md:gap-10 max-w-4xl mx-auto px-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-center">About Me</h1>
        <div className="space-y-4 sm:space-y-6">
            <p className="text-sm sm:text-base md:text-lg leading-relaxed text-center">I’m a multidisciplinary developer driven by curiosity and constant learning. I love exploring new technologies, understanding how things work beneath the surface, and finding elegant ways to solve complex problems. My work blends creativity and precision aiming for solutions that are not only functional but meaningful and well-crafted.</p>
            <p className="text-sm sm:text-base md:text-lg leading-relaxed text-center">I’ve always been a self-learner and an independent thinker, someone who enjoys turning ideas into reality through code. What motivates me most is the process itself: learning, experimenting, and creating experiences that connect people and technology in a simple, authentic way.</p>
        </div>
    </div>
</section>
);
