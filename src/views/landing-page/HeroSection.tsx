"use client";

import { useEffect, useState } from "react";
import TechText from "@/components/landing-page/TechText";
import dynamic from "next/dynamic";
import MotionButton from "@/components/landing-page/motion-button";
import { ArrowRight } from "lucide-react";

const Logo3D = dynamic(() => import("@/components/landing-page/Logo3D"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full min-h-72 w-full items-center justify-center">
      <div className="h-16 w-16 animate-spin rounded-full border-4 border-greenx/20 border-t-greenx" />
    </div>
  ),
});

function useHeroFontSize() {
  const [size, setSize] = useState(160);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setSize(w < 480 ? 72 : w < 640 ? 90 : w < 1024 ? 120 : 160);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return size;
}

export default function HeroSection() {
  const fontSize = useHeroFontSize();

  return (
    <section className="relative flex h-screen max-h-200 w-full items-center overflow-x-clip overflow-y-visible px-6 py-10 md:px-12 lg:px-20 lg:py-16">
      <div className="z-10 flex w-full flex-col items-center justify-between gap-10 lg:flex-row lg:gap-12">
        {/* Left content */}
        <div className="animate-fade-in-up flex w-full min-w-0 max-w-xl flex-col lg:max-w-2xl">
          <div className="h-44 w-full overflow-visible sm:h-56 md:h-64 lg:h-72 xl:h-80">
            <TechText
              text={"Master modern\nskills with HEXEL"}
              fontWeight={700}
              fontSize={fontSize}
              reveal={"letter"}
              highlightText="HEXEL"
              highlightColor="#000000"
              dashLength={4}
              dashGap={2}
              specks={15}
              fontFamily="Gilroy"
              color="#004d41"
              accentColor="#000000"
              letterSpacing={-0.05}
              reach={200}
              softness={0.7}
              strokeWidth={1.5}
              speed={0.2}
              lineStyle="dashed"
              selection
              draggable
              labels={false}
              sweep
              textAlign="left"
            />
          </div>

          <p className="-mt-6 max-w-xl font-rubik text-sm font-semibold leading-6 text-[#4c4c4c] md:-mt-10 md:text-xl md:leading-8 lg:-mt-14">
            Practical training programs designed to help you develop the skills,
            confidence, and experience needed to succeed in today&apos;s world.
          </p>

          <hr className="my-6 w-full max-w-md rounded-full border-3 border-black" />

          <div className="flex flex-wrap items-center gap-4">
            <MotionButton
              label="Explore Programs"
              href="#training"
              bgColor="#000"
              color="#fff"
              textColor="#fff"
              textHoverColor="#000"
              iconColor="#000"
              classes="w-60 md:w-64"
            />

            <a
              href="#contact"
              className="group relative inline-flex items-center gap-2 justify-between rounded-full border-2 border-greenx bg-greenx px-6 py-3 font-rubik text-base font-bold text-white transition-all duration-300 hover:bg-white hover:text-greenx active:scale-95 md:px-8 md:py-3.5"
            >
              Contact Us
              <ArrowRight className="size-5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </div>

        {/* Right content: 3D logo */}
        <div
          className="animate-fade-in-up relative h-[45svh] min-h-72 w-full overflow-visible sm:min-h-96 lg:h-auto lg:min-h-112 lg:max-w-xl lg:flex-1"
          style={{ animationDelay: "0.3s" }}
        >
          <Logo3D />
        </div>
      </div>
    </section>
  );
}