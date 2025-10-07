"use client";

import { Badge } from "./ui/badge";

// Estructura de datos para las experiencias laborales
interface ExperienceItem {
    id: string;
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    description: string;
    responsibilities: string[];
    logo?: string; // URL del logo de la empresa
}

// Experiencias laborales ordenadas de más nuevo a más viejo
const experiences: ExperienceItem[] = [
    {
        id: "1",
        company: "Mevuelo",
        position: "Senior Full Stack Developer",
        startDate: "2024-01",
        endDate: "Present",
        description: "Desarrollo de aplicaciones web escalables y sistemas de gestión para la industria de viajes. Liderazgo técnico en proyectos críticos.",
        responsibilities: [
            "Desarrollo full-stack con tecnologías modernas",
            "Arquitectura de microservicios",
            "Mentoría a desarrolladores junior",
            "Optimización de performance",
            "Integración de APIs de terceros"
        ],
        logo: "/assets/experience/mevuelo.jpeg"
        //logo: "/assets/experience/overactive.jpeg"
    },
    {
        id: "2",
        company: "Nowsta",
        position: "Senior Full Stack Developer",
        startDate: "Feb 2022",
        endDate: "2023-12",
        description: "As a Senior Full Stack Developer at Nowsta, I led a team of 4 developers in the creation of DeepRate, an internal solution that encompassed various critical functions such as rates repository management, timecards to invoice processing, timecards to billing processing, and configuration of key applications. Additionally, I was part of a team responsible for modernizing legacy React applications, updating them to current industry practices. Key responsibilities included:",
        responsibilities: [
            "Leading a team of 4 developers in the end-to-end development of the DeepRate solution, ensuring adherence to coding standards, best practices, and project timelines.",
            "Architecting and developing robust full stack applications using technologies such as React, Redux, Node.js (with NestJS framework), and databases like PostgreSQL.",
            "Utilizing React and ReactQuery to create intuitive and responsive user interfaces, delivering seamless user experiences and efficient state management.",
            "Implementing RESTful APIs and backend services using Node.js and NestJS framework, ensuring reliable data retrieval, manipulation, and storage.",
            "Designing and optimizing database schemas and queries to ensure efficient data storage, retrieval, and processing.",
            "Collaborating with cross-functional teams, including frontend developers, backend developers, and designers, to ensure seamless integration and functionality across the application.",
            "Conducting code reviews, ensuring adherence to coding standards, best practices, and security guidelines, and providing constructive feedback to enhance code quality.",
            "Implementing automated testing processes, including unit testing and integration testing, to ensure high-quality software delivery.",
            "Working closely with DevOps and deployment teams to facilitate continuous integration and deployment using tools like argoCD, Docker, and AWS.",
            "Troubleshooting and resolving technical issues, performing root cause analysis, and implementing solutions to ensure smooth system operation.",
            "Staying updated with the latest technologies, industry trends, and best practices, and incorporating them into the development process to drive innovation and efficiency.",
            "Mentoring and providing guidance to junior developers, fostering their professional growth and promoting a collaborative and knowledge-sharing environment.",

        ],
        logo: "/assets/experience/nowsta.png"
    },
    {
        id: "3",
        company: "Loop Studio",
        position: "Senior Full Stack Developer",
        startDate: "Aug 2020",
        endDate: "Jan 2022",
        description: "At LoopStudio, I served as the Technical Lead for several teams. I collaborated with customers such as Looking Glass Cyber, Alphawave, Bluebat Games, and others. My responsibilities included:",
        responsibilities: [
            "Leading and coordinating the activities of development teams, ensuring adherence to project timelines, coding standards, and best practices.",
            "Collaborating closely with customers to gather requirements, understand their business needs, and translate them into technical solutions.",
            "Designing and developing full stack applications using technologies such as React, Redux, Node.js (with NestJS framework), and databases like MongoDB or PostgreSQL.",
            "Implementing efficient and scalable RESTful APIs and backend services to support the functionality of the applications.",
            "Collaborating with designers to implement intuitive and visually appealing user interfaces, ensuring a seamless user experience.",
            "Conducting code reviews, providing feedback, and ensuring code quality and consistency within the team.",
            "Troubleshooting and resolving technical issues, performing bug fixes, and ensuring smooth operation of the applications.",
            "Keeping up-to-date with the latest technologies and industry trends, and incorporating them into the development process to drive innovation and efficiency.",
            "Mentoring and supporting junior developers, fostering their professional growth and promoting a collaborative and knowledge-sharing environment.",
        ],
        logo: "/assets/experience/loopstudio.jpeg"
    },
    {
        id: "4",
        company: "Overactive",
        position: "Senior UI Software Designer",
        startDate: "Jun 2919",
        endDate: "Jul 2020",
        description: "As a Senior UI Software Designer at Overactive, I was responsible for designing solutions for customers. I worked on two successful projects, Experian Health’s Patient Simple app and MedicalSolutions portal. Key responsibilities included:",
        responsibilities: [
            "Collaborating closely with product managers to understand project requirements, user needs, and design goals.",
            "Conducting user research, usability testing, and gathering feedback to inform the design process and make data-driven design decisions.",
            "Translating complex user flows and requirements into wireframes, mockups, and interactive prototypes.",
            "Creating intuitive and visually appealing user interfaces for web and mobile applications, ensuring a seamless user experience.",
            "Collaborating with front-end developers to ensure accurate implementation of the designs, providing design assets and specifications.",
            "Working closely with developers to ensure the seamless integration of design elements, maintaining brand consistency and visual integrity.",
            "Keeping up-to-date with the latest design trends, best practices, and emerging technologies, and incorporating them into the design process to drive innovation.",
            "Participating in design reviews and discussions, providing constructive feedback and contributing to a collaborative design culture.",
        ],
        logo: "/assets/experience/overactive.jpeg"
    },
    {
        id: "5",
        company: "Blue Trail Software",
        position: "Senior Frontend Developer",
        startDate: "Sep 2018",
        endDate: "Jul 2019",
        description: "As a Senior Frontend Developer at Blue Trail Software, my role involved working with clients and delivering custom-made solutions. I collaborated with clients such as Abbot, Amgen, Astellas, Bayer, and Merck. Key responsibilities included:",
        responsibilities: [
            "Architecting and developing front-end solutions using technologies such as React, Redux, and TypeScript.",
            "Collaborating closely with clients to understand their business requirements and translate them into technical specifications.",
            "Implementing efficient and scalable front-end architectures, ensuring high performance and responsive user interfaces.",
            "Utilizing Redux for state management, enhancing the maintainability and reusability of the codebase.",
            "Working closely with designers to implement intuitive and visually appealing user interfaces, adhering to brand guidelines.",
            "Collaborating with backend developers to integrate front-end interfaces with RESTful APIs and backend services.",
            "Conducting code reviews and implementing best practices to ensure code quality, performance, and scalability.",
            "Participating in Agile development processes, attending sprint planning meetings and providing accurate estimations for tasks.",
            "Troubleshooting and resolving technical issues, ensuring smooth operation of the applications.",
            "Keeping up-to-date with the latest front-end technologies, frameworks, and industry trends, and incorporating them into the development process.",
        ],
        logo: "/assets/experience/bluetrailsoftware.jpeg"
    },
    {
        id: "6",
        company: "Endava",
        position: "Web UI Developer",
        startDate: "Oct 2017",
        endDate: "Sep 2018",
        description: "At Endava, I worked as a Web UI Developer, collaborating with the customer GumGum. I developed a React application using technologies such as Redux, styled components, and Storybook. Key responsibilities included:",
        responsibilities: [
            "Developing front-end web applications using React, Redux, and other related technologies.",
            "Collaborating closely with the customer, understanding their requirements, and translating them into technical solutions.",
            "Implementing efficient and scalable user interfaces, ensuring a seamless user experience.",
            "Utilizing styled components to create reusable UI components, promoting code reusability and maintainability.",
            "Implementing Redux for state management, ensuring effective data flow and consistent application state.",
            "Collaborating with designers to implement visually appealing and intuitive user interfaces.",
            "Utilizing Storybook to develop and showcase UI components in an isolated and interactive environment.",
            "Participating in code reviews, ensuring adherence to coding standards, best practices, and security guidelines.",
            "Collaborating with backend developers to integrate front-end interfaces with RESTful APIs and backend services.",
            "Conducting unit testing and integration testing to ensure the reliability and quality of the developed applications.",
            "Troubleshooting and resolving technical issues, performing bug fixes, and ensuring smooth operation of the applications.",
            "Staying updated with the latest front-end technologies, frameworks, and industry trends, and incorporating them into the development process.",
        ],
        logo: "/assets/experience/endava.png"
    },
    {
        id: "7",
        company: "Anima",
        position: "Web Development Teacher",
        startDate: "Jan 2017",
        endDate: "Jan 2018",
        description: "At Anima, I had the privilege of serving as a Web Development Teacher, guiding and inspiring high school students in their journey to learn HTML and web development. Key responsibilities included:",
        responsibilities: [
            "Designing and delivering engaging lessons to students aged 15 and 16, introducing them to the fundamentals of HTML and web development.",
            "Creating a positive and inclusive learning environment, fostering students' curiosity, creativity, and problem-solving skills.",
            "Developing lesson plans and instructional materials that catered to different learning styles and abilities, ensuring an inclusive educational experience.",
            "Providing individualized guidance and support to students, helping them overcome challenges and encouraging their growth as web developers.",
            "Organizing and facilitating hands - on coding exercises, projects, and group activities to enhance students' practical skills and teamwork.",
            "Assessing and evaluating students' progress, providing constructive feedback, and identifying areas for improvement.",
            "Collaborating with fellow educators and administrators to contribute to the overall development of the curriculum and educational programs.",
            "Staying updated with the latest advancements in web development technologies and pedagogical approaches, integrating them into the teaching practices to foster a dynamic and relevant learning experience.",
        ],
        logo: "/assets/experience/anima.png"
    },
    {
        id: "8",
        company: "Globant",
        position: "Web UI Developer",
        startDate: "Nov 2016",
        endDate: "Dev 2017",
        description: "As a Software Developer at Globant, I worked on various projects for clients such as Google, Disney, and Rockwell Automation. Key responsibilities included:",
        responsibilities: [
            "Collaborating closely with cross-functional teams, including product managers, designers, and backend developers, to understand project requirements and deliver high-quality software solutions.",
            "Developing front-end interfaces using technologies such as React, Angular, and TypeScript.",
            "Implementing efficient and scalable user interfaces, ensuring a seamless user experience across different devices and platforms.",
            "Collaborating with designers to implement visually appealing and intuitive user interfaces, adhering to brand guidelines.",
            "Utilizing state management libraries like Redux and NgRx to manage application state and ensure efficient data flow.",
            "Conducting code reviews and implementing best practices to ensure code quality, performance, and maintainability.",
            "Participating in Agile development processes, attending daily stand-ups, sprint planning meetings, and retrospectives.",
            "Troubleshooting and resolving technical issues, performing bug fixes, and ensuring smooth operation of the applications.",
            "Keeping up-to-date with the latest front-end technologies, frameworks, and industry trends, and incorporating them into the development process to drive innovation.",
        ],
        logo: "/assets/experience/globant.png"
    },
    {
        id: "9",
        company: "The Story Room",
        position: "Full Stack Developer",
        startDate: "Apr 2016",
        endDate: "Oct 2016",
        description: "As a Full Stack Developer at The Story Room, I played a pivotal role in developing custom solutions for clients. Key responsibilities included:",
        responsibilities: [
            "Collaborating closely with clients to understand their business requirements and translating them into technical solutions.",
            "Developing full stack applications using technologies such as React, Node.js, and databases like MongoDB or PostgreSQL.",
            "Implementing RESTful APIs and backend services to support the functionality of the applications.",
            "Utilizing modern frontend frameworks like React and Angular to create intuitive and responsive user interfaces.",
            "Collaborating with designers to implement visually appealing and user-friendly interfaces, ensuring a seamless user experience.",
            "Conducting code reviews, ensuring adherence to coding standards, best practices, and security guidelines.",
            "Troubleshooting and resolving technical issues, performing bug fixes, and ensuring smooth operation of the applications.",
            "Keeping up-to-date with the latest technologies and industry trends, and incorporating them into the development process to drive innovation.",
            "Collaborating with cross-functional teams to ensure seamless integration and functionality across the application.",
        ],
        logo: "/assets/experience/thestoryroom.jpeg"
    },
    {
        id: "10",
        company: "Yamagroup",
        position: "Full Stack Developer",
        startDate: "Dec 2014",
        endDate: "Mar 2016",
        description: "As a Software Developer at Yamagroup, I worked on developing web applications for clients in various industries. Key responsibilities included:",
        responsibilities: [
            "Collaborating with clients to gather requirements, understand their business needs, and translate them into technical solutions.",
            "Developing front-end interfaces using technologies such as HTML, CSS, JavaScript, and frameworks like React and Angular.",
            "Implementing backend functionalities using languages such as Java, Python, or PHP, and frameworks like Spring or Django.",
            "Designing and optimizing databases to ensure efficient data storage, retrieval, and processing.",
            "Conducting code reviews, ensuring adherence to coding standards, best practices, and security guidelines.",
            "Troubleshooting and resolving technical issues, performing bug fixes, and ensuring smooth operation of the applications.",
            "Collaborating with cross-functional teams to ensure seamless integration and functionality across the application.",
            "Keeping up-to-date with the latest technologies and industry trends, and incorporating them into the development process to drive innovation.",
        ],
        logo: "/assets/experience/yamagroup.jpeg"
    },
    {
        id: "11",
        company: "Innvenio",
        position: "Web Developer",
        startDate: "Apr 2013",
        endDate: "Jan 2014",
        description: "As a Full Stack Developer at Innvenio, I was involved in developing and maintaining web applications for clients. Key responsibilities included:",
        responsibilities: [
            "Collaborating with clients to understand their requirements, objectives, and business needs.",
            "Developing full stack applications using technologies such as React, Node.js, and databases like MongoDB or MySQL.",
            "Implementing RESTful APIs and backend services to support the functionality of the applications.",
            "Creating intuitive and visually appealing user interfaces using HTML, CSS, and JavaScript frameworks.",
            "Conducting code reviews, ensuring adherence to coding standards, best practices, and security guidelines.",
            "Troubleshooting and resolving technical issues, performing bug fixes, and ensuring smooth operation of the applications.",
            "Collaborating with cross-functional teams to ensure seamless integration and functionality across the application.",
            "Keeping up-to-date with the latest technologies and industry trends, and incorporating them into the development process to drive innovation.",
        ],
        logo: "/assets/experience/innvenio.png"
    },
    {
        id: "12",
        company: "Travelocity Business",
        position: "JavaScript Developer",
        startDate: "May 2010",
        endDate: "Apr 2013",
        description: "At Travelocity Business, I worked as a JavaScript Developer focused on delivering customized travel experiences for corporate clients. My role involved collaborating closely with the Sales and Product teams to identify each client’s unique needs and implementing front-end customizations to the existing Travelocity tools and web platforms.",
        responsibilities: [
            "Coordinating with Sales and Account teams to analyze client requirements and define tailored front-end solutions.",
            "Implementing DOM manipulations and JavaScript-based customizations to adapt Travelocity’s internal tools for specific client use cases.",
            "Enhancing and extending existing web interfaces to deliver personalized experiences aligned with client expectations.",
            "Collaborating with UI and Product teams to ensure seamless integration of custom scripts and interface modifications.",
            "Troubleshooting front-end issues, ensuring stability and compatibility across browsers and environments.",
            "Maintaining a focus on usability and client satisfaction while ensuring code efficiency and maintainability.",
        ],
        logo: "/assets/experience/travelocity.png"
    },
    {
        id: "13",
        company: "GetThere",
        position: "Product Support Specialist",
        startDate: "May 2008",
        endDate: "May 2010",
        description: "As a Product Support Specialist at GetThere, my primary role was to provide first-level support to customers. I received and analyzed cases, troubleshooted issues, and attempted to resolve them in a timely manner. Key responsibilities included:",
        responsibilities: [
            "Providing first-level support to customers through various channels such as email, phone, or ticketing systems.",
            "Analyzing and troubleshooting customer-reported issues related to the product or service.",
            "Collaborating with internal teams, including development and operations, to resolve customer issues effectively.",
            "Documenting customer interactions and technical issues in a support ticketing system.",
            "Communicating with customers in a professional and friendly manner, ensuring high customer satisfaction.",
            "Escalating complex issues to appropriate teams for further investigation and resolution.",
            "Keeping up-to-date with product knowledge and new releases, ensuring accurate and effective support.",
            "Providing feedback and suggestions to the product team based on customer insights and common support cases.",
            "Contributing to the knowledge base and internal documentation to facilitate self-service support for customers.",
        ],
        logo: "/assets/experience/getthere.png"
    }
];

export const Experience = () => {
    return (
        <section style={{ backgroundColor: "var(--bg-2)" }}>
            <div className="flex flex-col items-center justify-center py-20 gap-10">
                <h1 className="text-7xl">Experience</h1>

                {/* Timeline */}
                <div className="w-full flex flex-col items-center justify-center">
                    {experiences.map((exp, index) => (
                        <div key={exp.id} className="w-full" style={{ backgroundColor: index % 2 === 0 ? "var(--bg-2)" : "var(--bg-3" }}>
                            <div className="max-w-4xl mx-auto">
                                <div className="flex gap-8 mb-12 pb-12 relative" style={{marginTop: '-41px'}}>
                                     {/* Línea vertical de la timeline */}
                                     {index < experiences.length - 1 && (
                                         <div className="absolute left-10 top-16 w-0.5 bg-gray-300" style={{ height: index === experiences.length - 2 ? '100%' : 'calc(100% + 3rem)' }}></div>
                                     )}

                                    {/* Fecha */}
                                    <div className="flex-shrink-0 w-24">
                                        <Badge className="text-sm font-medium" style={{position: 'relative', top: 11}}>
                                            <div className="flex flex-col items-center justify-center gap-2 p-1">
                                            <span>{exp.startDate}</span>
                                            
                                             <span>{exp.endDate}</span>
                                            </div>
                                        </Badge>
                                    </div>

                                    {/* Contenido */}
                                    <div className="flex-1  px-6 flex flex-col gap-4">
                                        {/* Logo de la empresa */}
                                        {exp.logo && (
                                            <div className="flex gap-4" style={{ height: '80px' }}>
                                                <img
                                                    src={exp.logo}
                                                    alt={`${exp.company} logo`}
                                                    className="w-20 rounded-md  object-contain"
                                                    onError={(e) => {

                                                        console.log('Error loading image:', exp.logo);
                                                        e.currentTarget.style.display = 'none';
                                                    }}
                                                    onLoad={() => {
                                                        console.log('Successfully loaded image:', exp.logo);
                                                    }}
                                                />
                                                <div className="flex flex-col justify-end">
                                                    <h3 className="text-xl font-bold mb-1">{exp.company}</h3>
                                                    <p className="text-lg font-semibold mb-2">
                                                        {exp.position} / {exp.startDate} - {exp.endDate}
                                                    </p>
                                                </div>

                                            </div>
                                        )}


                                        {/* Descripción */}
                                        <p className=" mb-4 leading-relaxed">
                                            {exp.description}
                                        </p>

                                        {/* Responsabilidades */}
                                        <div>
                                            <h4 className="font-semibold mb-2">Responsabilities:</h4>
                                            <ul className="list-none list-outside pl-6 space-y-3">
                                                {exp.responsibilities.map((responsibility, idx) => (
                                                    <li key={idx} className="relative before:content-['–'] before:absolute before:-left-4 text-sm">
                                                        {responsibility}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};