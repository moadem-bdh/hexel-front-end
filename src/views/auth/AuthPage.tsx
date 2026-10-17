"use client";

import React from "react";
import Link from "next/link";
import { AuthForm } from "@/components/auth-page/premium-auth";
import { House } from "lucide-react";
import Particles from "@/components/landing-page/Particles";

export default function AuthPage() {
  return (
    <div className="min-h-screen w-full flex flex-col overflow-hidden justify-center items-center px-4 py-8 relative">
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

      {/* Back to Home */}
      {/* Home button */}
      <Link
        href="/"
        aria-label="Back to home"
        className="group absolute top-5 left-5 z-30 inline-flex items-center gap-2 rounded-full border-2 border-greenx bg-white px-4 py-2 text-sm font-semibold text-greenx shadow-sm transition-all duration-200 hover:bg-greenx hover:text-white hover:shadow-md active:scale-95"
      >
        <House className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5" />
        Home
      </Link>

      {/* Card */}
      <div className="w-full max-w-lg z-10">
        <div className="bg-white border border-neutral-200/80 shadow-2xl rounded-3xl overflow-hidden">
          <AuthForm />
        </div>
      </div>
    </div>
  );
}
