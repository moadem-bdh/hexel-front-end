"use client";

import React from "react";

const stats = [
  { value: "500+", label: "Graduates Trained" },
  { value: "95%", label: "Career Placement Rate" },
  { value: "50+", label: "Hiring Partners" },
  { value: "4.9/5", label: "Student Rating" },
];

const highlights = [
  {
    title: "Practical Hands-on Learning",
    description: "Build real-world products and software projects that build confidence and a standout portfolio.",
    icon: (
      <svg className="w-6 h-6 text-[#004d41]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
  {
    title: "Mentorship by Experts",
    description: "Learn directly from experienced senior engineers, designers, and industry professionals.",
    icon: (
      <svg className="w-6 h-6 text-[#004d41]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  },
  {
    title: "Career Acceleration",
    description: "Comprehensive support from resume building and technical interview prep to job placement.",
    icon: (
      <svg className="w-6 h-6 text-[#004d41]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
];

export default function About() {
  return (
    <section id="about" className="w-full py-20 px-6 md:px-12 lg:px-20 relative z-10 bg-white">
      <div className="max-w-6xl mx-auto flex flex-col gap-16">
        {/* Header Content */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-2xl flex flex-col gap-4">
            <span className="text-xs sm:text-sm font-rubik font-bold uppercase tracking-widest text-[#004d41] px-4 py-1.5 rounded-full bg-[#004d41]/10 w-fit">
              About HEXEL
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-gilroy font-bold text-[#000000] leading-tight">
              Bridging the gap between ambitious learners & high-impact tech careers.
            </h2>
          </div>
          <p className="font-rubik text-base md:text-lg text-[#5e706a] max-w-xl">
            HEXEL was founded with a clear mission: to provide practical, outcome-focused tech education designed for the modern digital economy. We empower students with high-demand skills, mentorship, and real project experience.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8 border-y border-gray-100">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col gap-1 text-center md:text-left">
              <span className="text-4xl md:text-5xl font-gilroy font-extrabold text-[#004d41]">
                {stat.value}
              </span>
              <span className="font-rubik text-sm font-semibold text-[#5e706a]">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {highlights.map((item, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-[#f8faf9] border border-[#004d41]/10 flex flex-col gap-4 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-[#004d41]/30"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#004d41]/10 flex items-center justify-center">
                {item.icon}
              </div>
              <h3 className="text-xl font-gilroy font-bold text-[#000000]">
                {item.title}
              </h3>
              <p className="font-rubik text-sm text-[#5e706a] leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
