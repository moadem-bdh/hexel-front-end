import Navbar from "@/pages/landing-page/Navbar";
import HeroSection from "@/pages/landing-page/HeroSection";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col">
        <HeroSection />
      </main>
    </div>
  );
}
