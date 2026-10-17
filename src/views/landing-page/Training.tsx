"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { FiArrowUpRight, FiBarChart2, FiClock } from "react-icons/fi";

type Program = {
  id: string;
  title: string;
  category: string;
  description: string;
  duration: string;
  level: string;
  image: string;
  href: string;
};

// Placeholder content and images: replace with your real programs
const programs: Program[] = [
  {
    id: "01",
    title: "Web Development",
    category: "Frontend & Backend",
    description:
      "Build real websites and apps with HTML, CSS, JavaScript, React and Node.js, step by step.",
    duration: "12 weeks",
    level: "Beginner",
    image: "/assets/images/about-test-1.png",
    href: "#contact",
  },
  {
    id: "02",
    title: "UI/UX Design",
    category: "Product Design",
    description:
      "Research, wireframe and design interfaces that people actually enjoy using.",
    duration: "8 weeks",
    level: "Beginner",
    image: "/assets/images/about-test-2.png",
    href: "#contact",
  },
  {
    id: "03",
    title: "Logo & Branding",
    category: "Visual Identity",
    description:
      "Create memorable logos and full brand identities, from first sketch to final files.",
    duration: "6 weeks",
    level: "All levels",
    image: "/assets/images/about-test-3.png",
    href: "#contact",
  },
  {
    id: "04",
    title: "Mobile Apps",
    category: "iOS & Android",
    description:
      "Take your web skills further and ship cross-platform apps to both stores.",
    duration: "10 weeks",
    level: "Intermediate",
    image: "/assets/images/hero-image.png",
    href: "#contact",
  },
  {
    id: "05",
    title: "Video Editing",
    category: "Content Creation",
    description:
      "Cut, color and tell stories with video, from short reels to full productions.",
    duration: "6 weeks",
    level: "Beginner",
    image: "/assets/images/about-test-3.png",
    href: "#contact",
  },
  {
    id: "06",
    title: "Digital Marketing",
    category: "Growth",
    description:
      "Learn social media, ads and analytics to grow a brand and measure what works.",
    duration: "8 weeks",
    level: "All levels",
    image: "/assets/images/about-test-1.png",
    href: "#contact",
  },
];

/* ------------------------------------------------------------------ */
/* Canvas with moving lines. Only runs while the card is hovered.      */
/* ------------------------------------------------------------------ */

type Line = {
  x: number;
  y: number;
  speed: number;
  angle: number;
  length: number;
  alpha: number;
};

const LinesCanvas = ({ active }: { active: boolean }) => {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    // clear when not hovered, and never animate for reduced motion
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!active || reduce) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      return;
    }

    // match the real size (setting width also clears the canvas)
    const { width, height } = canvas.getBoundingClientRect();
    canvas.width = width;
    canvas.height = height;

    const spawn = (): Line => ({
      x: Math.random() * width,
      y: Math.random() * height,
      speed: Math.random() * 0.5 + 0.1,
      angle: Math.random() * Math.PI * 2,
      length: Math.random() * 20 + 5,
      alpha: Math.random() * 0.3 + 0.15, // fixed per line = no flicker
    });

    const lines = Array.from({ length: 30 }, spawn);
    let frame = 0;

    const tick = () => {
      ctx.clearRect(0, 0, width, height);
      for (const l of lines) {
        l.x += Math.cos(l.angle) * l.speed;
        l.y += Math.sin(l.angle) * l.speed;

        if (l.x < 0 || l.x > width || l.y < 0 || l.y > height) {
          Object.assign(l, spawn());
        }

        ctx.beginPath();
        ctx.moveTo(l.x, l.y);
        ctx.lineTo(
          l.x - Math.cos(l.angle) * l.length,
          l.y - Math.sin(l.angle) * l.length,
        );
        ctx.strokeStyle = `rgba(255, 255, 255, ${l.alpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
      frame = requestAnimationFrame(tick);
    };
    tick();

    return () => cancelAnimationFrame(frame);
  }, [active]);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
};

/* ------------------------------------------------------------------ */
/* Card with 3D tilt (same shape as the original gallery card)         */
/* ------------------------------------------------------------------ */

const TrainingCard = ({
  program,
  index,
}: {
  program: Program;
  index: number;
}) => {
  const reduceMotion = useReducedMotion();
  const [hovered, setHovered] = useState(false);
  const [imgFailed, setImgFailed] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setHovered(false);
  };

  return (
    <motion.div
      initial={reduceMotion ? false : { y: 50, opacity: 0 }}
      whileInView={{
        y: 0,
        opacity: 1,
        transition: {
          type: "spring",
          bounce: 0.4,
          duration: 0.8,
          delay: (index % 3) * 0.1, // stagger per row
        },
      }}
      viewport={{ once: true, amount: 0.5 }}
      className="perspective-[1000px]"
    >
      <motion.a
        href={program.href}
        aria-label={`${program.title} training`}
        onMouseMove={reduceMotion ? undefined : handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
        style={
          reduceMotion
            ? undefined
            : { rotateX, rotateY, transformStyle: "preserve-3d" }
        }
        className="group relative block h-88 w-full rounded-xl border border-slate-800 bg-slate-900 no-underline outline-none focus-visible:ring-2 focus-visible:ring-black"
      >
        <div
          style={
            reduceMotion
              ? undefined
              : { transform: "translateZ(50px)", transformStyle: "preserve-3d" }
          }
          className="absolute inset-4 overflow-hidden rounded-lg"
        >
          {/* image (no tint) */}
          {!imgFailed && (
            <Image
              src={program.image}
              alt=""
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
              className="object-cover object-center transition-transform duration-500 group-hover:scale-110"
              onError={() => setImgFailed(true)}
            />
          )}

          <LinesCanvas active={hovered} />

          {/* gradient: dark at the bottom so the writing is always readable */}
          <div className="absolute inset-0 [background:linear-gradient(to_top,rgba(0,0,0,0.92),rgba(0,0,0,0.55)_50%,rgba(0,0,0,0.1))]" />

          {/* content */}
          <div className="absolute inset-0 flex flex-col justify-between p-5">
            {/* top row */}
            <div className="flex items-start justify-between">
              <span className="rounded-full border-2 border-white/50 px-3 py-1 font-gilroy text-sm font-extrabold tracking-widest text-white">
                {program.id}
              </span>
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black transition-all duration-300 group-hover:-rotate-45 group-hover:bg-black group-hover:text-white">
                <FiArrowUpRight size={20} />
              </span>
            </div>

            {/* bottom: info */}
            <div>
              <p className="font-rubik text-sm font-semibold uppercase tracking-wide text-slate-300">
                {program.category}
              </p>
              <h3 className="mt-1 font-rubik text-2xl font-extrabold leading-tight text-white">
                {program.title}
              </h3>

              {/* description: always open on small screens, reveals on hover on desktop */}
              <div className="grid grid-rows-[1fr] transition-[grid-template-rows] duration-500 lg:grid-rows-[0fr] lg:group-focus-visible:grid-rows-[1fr] lg:group-hover:grid-rows-[1fr]">
                <div className="overflow-hidden">
                  <p className="pt-3 font-rubik text-sm leading-6 text-white/85">
                    {program.description}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2 font-rubik text-sm">
                <span className="flex items-center gap-1.5 rounded-full border-2 border-white/40 px-3 py-1 text-white">
                  <FiClock size={14} /> {program.duration}
                </span>
                <span className="flex items-center gap-1.5 rounded-full border-2 border-white/40 px-3 py-1 text-white">
                  <FiBarChart2 size={14} /> {program.level}
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.a>
    </motion.div>
  );
};

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */

export default function Training() {
  return (
    <section
      id="training"
      aria-labelledby="training-title"
      className="relative z-10 w-full overflow-hidden  py-18 text-black"
    >
      {/* ---------- Content ---------- */}
      <div className="relative z-10 w-full px-8 md:px-14 lg:px-16">
        {/* header (centered, compact) */}
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <h2
              id="training-title"
              className="font-gilroy text-5xl font-extrabold uppercase tracking-[0.2em] text-greenx md:text-6xl"
            >
              Our Training
            </h2>
          </div>

          <p className="mt-4 font-rubik text-2xl font-extrabold leading-[0.95] text-black md:text-3xl">
            Pick a path. Build real skills.
          </p>
          <p className="mt-4 font-rubik text-base leading-7 text-black md:text-lg">
            Every HEXEL program is practical, project-based and guided by people
            who work in the field.
          </p>
        </div>

        {/* grid */}
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {programs.map((program, index) => (
            <TrainingCard key={program.id} program={program} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}