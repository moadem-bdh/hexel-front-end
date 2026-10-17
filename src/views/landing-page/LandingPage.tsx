"use client";
import HeroSection from "@/views/landing-page/HeroSection";
import OurDomains from "@/views/landing-page/OurDomains";
import About from "@/views/landing-page/About";
import Training from "@/views/landing-page/Training";
import FAQ from "./FAQ";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col relative">
      <div className="flex-1 flex flex-col relative z-10">
        <HeroSection />
        <OurDomains />
        <About />
        <Training />
        <FAQ />
      </div>
    </div>
  );
}
