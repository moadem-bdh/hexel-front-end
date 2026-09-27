"use client";
import Navbar from "@/pages/landing-page/Navbar";
import HeroSection from "@/pages/landing-page/HeroSection";
import Particles from "@/components/landing-page/Particles";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col relative">
      {/* Full-screen Particles Background */}
      <div className="absolute inset-0 z-0 w-screen h-screen">
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
      <Navbar />
      <main className="flex-1 flex flex-col">
        <HeroSection />
      </main>
    </div>
  );
}
