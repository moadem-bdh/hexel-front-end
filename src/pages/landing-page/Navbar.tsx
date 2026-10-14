"use client";

import Image from "next/image";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

const navItems = [
  { label: "Home", href: "#" },
  { label: "About", href: "#about" },
  { label: "Our Training", href: "#training" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white/98">
      <nav
        aria-label="Main navigation"
        className="flex h-20 w-full items-center justify-between px-6 md:px-12 lg:px-20"
      >
        {/* Logo */}
        <a href="#" aria-label="Hexel home" onClick={() => setOpen(false)}>
          <Image
            className="w-36 object-contain"
            src="/assets/icons/logo-long.svg"
            alt="Hexel"
            width={160}
            height={60}
            priority
          />
        </a>

        {/* Desktop links */}
        <ul className="m-0 hidden list-none items-center gap-8 p-0 lg:flex">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="font-rubik text-sm font-bold uppercase tracking-wide text-black no-underline transition-colors duration-200 hover:text-greenx"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop button */}
        <a
          href="#join"
          className="hidden h-11 items-center rounded-full bg-greenx px-7 font-rubik text-sm font-bold text-white no-underline transition-colors duration-200 hover:bg-black lg:inline-flex"
        >
          Join Us
        </a>

        {/* Hamburger */}
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
          className="flex h-11 w-11 items-center justify-center rounded-full text-black transition-colors hover:bg-black/5 lg:hidden"
        >
          {open ? <FiX size={26} /> : <FiMenu size={26} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div
          id="mobile-menu"
          className="max-h-[calc(100vh-5rem)] overflow-y-auto px-6 pb-6 md:px-12 lg:hidden"
        >
          <ul className="m-0 flex list-none flex-col p-0">
            {navItems.map((item) => (
              <li key={item.href} className="border-t border-black/10">
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block py-4 font-rubik text-base font-bold uppercase tracking-wide text-black no-underline hover:text-greenx"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#join"
            onClick={() => setOpen(false)}
            className="mt-2 flex h-12 items-center justify-center rounded-full bg-greenx font-rubik text-sm font-bold text-white no-underline"
          >
            Join Us
          </a>
        </div>
      )}
    </header>
  );
}
