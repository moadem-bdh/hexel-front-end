"use client";

import TechText from "@/components/landing-page/TechText";
import dynamic from "next/dynamic";

const Logo3D = dynamic(() => import("@/components/landing-page/Logo3D"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-100 lg:min-h-125 flex items-center justify-center">
      <div className="w-16 h-16 border-4 border-[#004d41]/20 border-t-[#004d41] rounded-full animate-spin" />
    </div>
  ),
});

export default function HeroSection() {
  return (
    <section className="relative w-full px-6 md:px-12 flex justify-between items-center lg:px-20 pt-10 pb-24 lg:pt-16 lg:pb-28 min-h-120 overflow-x-hidden h-screen ">
      <div className="flex flex-col lg:flex-row lg-min-150 items-center justify-between gap-14 lg:gap-12 w-full z-10">
        {/*  Left Content  */}
        <div className="min-w-175 flex flex-col gap-0 max-w-xl lg:max-w-2xl animate-fade-in-up lg:top-40">
          <div className="flex flex-col md:min-w-160 relative overflow-visible">
            <div className="h-52 sm:h-60 md:h-72 lg:h-80 overflow-visible">
              <TechText
                text={"Master modern\nskills with HEXEL"}
                fontWeight={700}
                fontSize={160}
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
          </div>
          <p className="font-rubik font-semibold text-[#4c4c4c] text-sm md:text-xl max-w-150 -mt-14">
Practical training programs designed to help you develop the skills, confidence, and experience needed to succeed in today's world.
          </p>

          {/* Horizontal Line Divider */}
          <hr className="w-80/100 border-2 border-[#000000]  my-6  rounded-full"  />

          {/* Action Buttons */}
          <div className="flex items-center gap-4 flex-wrap pt-1">
            <a
              href="#training"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-[#004d41] text-white text-base font-rubik font-bold shadow-md"
            >
              <span className="flex items-center gap-2">
                Explore Programs
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </a>

            <a
              href="#contact"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-full border-2 border-[#004d41] text-[#004d41] text-base font-rubik font-bold shadow-sm"
            >
              Contact Us
            </a>
          </div>
        </div>

        {/* Right Content - 3D Logo */}
        <div className="flex-1 w-full h-full overflow-visible lg:max-w-xl animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
          <Logo3D />
        </div>
      </div>
    </section>
  );
}
