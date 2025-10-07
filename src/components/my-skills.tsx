import Image from "next/image";

const skills = [
    { name: "HTML5", filename: "html-5.png", backgroundColor: "white" },
    { name: "JavaScript", filename: "js.png", backgroundColor: "transparent" },
    { name: "TypeScript", filename: "typescript.png", backgroundColor: "transparent" },
    { name: "Sass", filename: "sass.png", backgroundColor: "white" },
    { name: "Emotion", filename: "emotion.png", backgroundColor: "white" },
    { name: "Styled Components", filename: "styled-components.png", backgroundColor: "white" },
    { name: "JSS", filename: "jss.png", backgroundColor: "white" },
    { name: "Tailwind CSS", filename: "tailwind.png", backgroundColor: "white" },
    { name: "Node.js", filename: "node.svg", backgroundColor: "white" },
    { name: "NestJS", filename: "nestjs.svg", backgroundColor: "white" },
    { name: "Next.js", filename: "nextjs.png", backgroundColor: "white" },
    { name: "React", filename: "react.png", backgroundColor: "white" },
    { name: "React Native", filename: "react.png", backgroundColor: "black" },
    { name: "Redux", filename: "redux.png", backgroundColor: "white" },
    { name: "GraphQL", filename: "graphql.png", backgroundColor: "white" },
    { name: "Apollo", filename: "apollo.png", backgroundColor: "white" },
    { name: "React Query", filename: "react-query.svg", backgroundColor: "white" },
    { name: "MySQL", filename: "mysql.svg", backgroundColor: "white" },
    { name: "PostgreSQL", filename: "postgresql.svg", backgroundColor: "white" },
    { name: "PHP", filename: "php.svg", backgroundColor: "white" },
    { name: "Unity", filename: "unity.svg", backgroundColor: "white" },
    { name: "Laravel", filename: "laravel.svg", backgroundColor: "white" },
    { name: "Docker", filename: "docker.svg", backgroundColor: "white" }
  ];

const SkillBox = ({ skill }: { skill: { name: string; filename: string; backgroundColor: string } }) => (
    <div style={
      {
        width: 130,
        height: 130,
        backgroundColor: "var(--bg-2)",
        borderRadius: "10px",
        padding: "16px"
      }} 
      className="flex flex-col items-center gap-2 hover:scale-105 transition-transform justify-around">
      <div style={{
        backgroundColor: skill.backgroundColor, 
        borderRadius: '10px', 
        padding: '8px',
        display: skill.backgroundColor === 'transparent' ? 'none' : 'block'
      }}>
        <Image
          src={`/assets/skills/${skill.filename}`}
          alt={skill.name}
          width={48}
          height={48}
          className="object-contain"
        />
      </div>
      {skill.backgroundColor === 'transparent' && (
        <Image
          src={`/assets/skills/${skill.filename}`}
          alt={skill.name}
          width={48}
          height={48}
          className="object-contain"
        />
      )}
      <span className="text-sm text-center" style={{ color: "var(--text)" }}>
        {skill.name}
      </span>
    </div>
  )
  
  
  export const MySkills = () => {
    return (
      <section style={{ backgroundColor: "var(--bg-1)" }}>
        <div className="flex flex-col items-center justify-center py-40 gap-10 max-w-3xl mx-auto">
          <h1 className="text-7xl">Skills</h1>
          <div className="flex flex-wrap gap-4 w-full px-4 justify-center">
            {skills.map((skill, index) => (
              <SkillBox key={`${skill.name}-${index}`} skill={skill} />
            ))}
          </div>
        </div>
      </section>
    );
  };