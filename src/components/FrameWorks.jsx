import { OrbitingCircles } from "./OrbitingCircles";

export function Frameworks() {
  const skills = [
    "css3",
    "git",
    "html5",
    "javascript",
    "react",
    "mysql",
    "mongodb",
    "threejs",
    "tailwindcss",
    "vitejs",
    "motion",
    "render",
    "vercel"
  ];
  return (
    <div className="relative flex h-[15rem] w-full flex-col items-center justify-center">
      <OrbitingCircles iconSize={40}>
        {skills.map((skill, index) => (
          <Icon key={index} src={`assets/logos/${skill}.svg`} />
        ))}
      </OrbitingCircles>
      <OrbitingCircles iconSize={25} radius={100} reverse speed={2}>
        {skills.reverse().map((skill, index) => (
          <Icon key={index} src={`assets/logos/${skill}.svg`} />
        ))}
      </OrbitingCircles>
    </div>
  );
}

const Icon = ({ src }) => (
  <img src={src} style={{ filter: "drop-shadow(2px 2px 2px rgba(0, 225, 225, 0.5))" }}
className="duration-200 rounded-sm hover:scale-110" />
);