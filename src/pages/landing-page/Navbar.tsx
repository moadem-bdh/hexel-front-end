"use client";
import Image from "next/image";

const navItems = [
  { label: "Home", href: "#" },
  { label: "About", href: "#about" },
  { label: "Our Training", href: "#training" },
  { label: "Trainers", href: "#trainers" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  return (
    <nav className="w-full  px-6 md:px-12 lg:px-20 py-4 flex items-center justify-between absolute top-0 z-50 h-24 bg-transparent backdrop-blur-md">
      {/* Left side: Main Logo */}
   
        <Image 
          className="w-40 object-contain -mb-2"
          src="/assets/icons/logo-long.svg" 
          alt="Hexel" 
          width={160} 
          height={60}
          priority
        />
     

      {/* Middle: Simple Nav Menu */}
      <ul className="hidden md:flex items-center gap-1 list-none m-0 p-1 rounded-full bg-[#004d41]">
        {navItems.map((item) => (
          <li key={item.href}>
            <a
              href={item.href}
              className="inline-block px-5 py-2 rounded-full text-sm font-rubik font-semibold uppercase tracking-wide text-white no-underline transition-all duration-300 hover:bg-white hover:text-[#004d41]"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>

      {/* Right side: Actions */}
      <div className="hidden lg:flex items-center gap-4 z-10">
        {/* Language Button */}
        <button
          aria-label="Change language"
          className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-black text-sm font-rubik font-semibold hover:bg-gray-50 hover:border-gray-300 hover:scale-105 transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)] shadow-sm hover:shadow"
        >
          عA
        </button>

        {/* Join Us Button */}
        <a
          href="#join"
          className="group relative inline-flex items-center justify-center px-7 py-2.5 rounded-full bg-black text-white text-sm font-rubik font-bold overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:scale-105 hover:shadow-[0_8px_20px_rgba(0,0,0,0.15)] active:scale-95"
        >
          <span className="relative z-10 flex items-center gap-2">
            Join Us
            {/* Arrow icon that moves slightly on hover */}
            <svg 
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </span>
          {/* Sweep effect on hover */}
          <div className="absolute inset-0 h-full w-full bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-[150%] transition-transform duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)]" />
        </a>
      </div>
    </nav>
  );
}
