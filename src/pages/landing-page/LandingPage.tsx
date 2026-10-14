"use client";
import HeroSection from "@/pages/landing-page/HeroSection";
import OurDomains from "@/pages/landing-page/OurDomains";
import About from "@/pages/landing-page/About";
import Training from "@/pages/landing-page/Training";
import FAQ from "./FAQ";
import Particles from "@/components/landing-page/Particles";
import ErosionTrail from "@/components/landing-page/background";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col relative">
      {/* Topographic contour background — full page */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <ErosionTrail
          className="h-full"
          minorColor="rgba(0,0,0,0.06)"
          majorColor="rgba(0,0,0,0.14)"
          driftSpeed={Math.PI * 2 / 40}
          showReadout={false}
        />
      </div>
      {/* Particles layer */}
      <div className="absolute inset-0 z-0 w-full h-screen">
        <Particles
          particleColors={["#004d41", "#000000"]}
          particleCount={150}
          particleSpread={10}
          speed={0.2}
          particleBaseSize={80}
          moveParticlesOnHover={false}
          alphaParticles={false}
          disableRotation={false}
          pixelRatio={1}
        />
      </div>
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
