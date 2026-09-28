"use client";

import LogoLoop from "@/components/landing-page/LogoLoop";
import { 
  SiReact, 
  SiNextdotjs, 
  SiTypescript, 
  SiTailwindcss, 
  SiNodedotjs, 
  SiPython, 
  SiFigma, 
  SiDocker, 
  SiGit 
} from "react-icons/si";

const techLogos = [
  { node: <SiReact className="text-black" />, title: "React", href: "https://react.dev" },
  { node: <SiNextdotjs className="text-black" />, title: "Next.js", href: "https://nextjs.org" },
  { node: <SiTypescript className="text-black" />, title: "TypeScript", href: "https://www.typescriptlang.org" },
  { node: <SiTailwindcss className="text-black" />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
  { node: <SiNodedotjs className="text-black" />, title: "Node.js", href: "https://nodejs.org" },
  { node: <SiPython className="text-black" />, title: "Python", href: "https://python.org" },
  { node: <SiFigma className="text-black" />, title: "Figma", href: "https://figma.com" },
  { node: <SiDocker className="text-black" />, title: "Docker", href: "https://docker.com" },
  { node: <SiGit className="text-black" />, title: "Git", href: "https://git-scm.com" },
];

export default function OurDomains() {
  return (
    <section className="w-full flex flex-col items-center justify-between  px-6 md:px-12 lg:px-20 z-10 bg-white overflow-hidden">


      <div className="w-full relative z-20">
        <LogoLoop
          logos={techLogos}
          speed={100}
          direction="left"
          logoHeight={75}
          gap={50}
          hoverSpeed={40}
          scaleOnHover
          fadeOut
          fadeOutColor="#ffffff"
          ariaLabel="Technology stack"
        />
      </div>
    </section>
  );
}
