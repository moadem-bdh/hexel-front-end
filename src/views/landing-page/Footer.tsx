"use client";

import Image from "next/image";
import { FaInstagram, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { FiSend } from "react-icons/fi";
import MotionButton from "@/components/landing-page/motion-button";

const EMAIL = "hello@hexel.com";

const sections = [
  {
    title: "Explore",
    links: [
      { name: "Home", href: "#" },
      { name: "About", href: "#about" },
      { name: "Programs", href: "#training" },
      { name: "FAQ", href: "#faq" },
    ],
  },
  {
    title: "Connect",
    links: [
      { name: "Instagram", href: "https://instagram.com" },
      { name: "LinkedIn", href: "https://linkedin.com" },
      { name: "X / Twitter", href: "https://x.com" },
      { name: EMAIL, href: `mailto:${EMAIL}` },
    ],
  },
];

const socialLinks = [
  { icon: <FaInstagram className="size-5" />, href: "https://instagram.com", label: "Instagram" },
  { icon: <FaXTwitter className="size-5" />, href: "https://x.com", label: "X" },
  { icon: <FaLinkedin className="size-5" />, href: "https://linkedin.com", label: "LinkedIn" },
];

const legalLinks = [
  { name: "Terms and Conditions", href: "#" },
  { name: "Privacy Policy", href: "#" },
];

export default function Footer() {
  // TODO: wire up form state and submission logic here

  return (
    <footer id="contact" className="relative z-10 w-full mt-50 bg-greenx text-white">
      <div className="w-full pt-16">
        {/* Main row */}
        <div className="flex w-full md:px-10 lg:px-16 flex-col justify-between lg:flex-row lg:items-start">
          {/* Brand */}
          <div className="flex h-full justify-between w-full flex-col gap-5 lg:max-w-xs">
            <div className="flex flex-col items-center">
              <a href="#" aria-label="HEXEL home" className="inline-block">
                <Image
                  src="/assets/icons/logo-animated.svg"
                  alt="HEXEL"
                  width={120}
                  height={120}
                  unoptimized
                  className="h-auto w-40 brightness-0 invert lg:w-56"
                />
              </a>
            </div>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-10 md:gap-20">
            {sections.map((section) => (
              <div key={section.title}>
                <h3 className="font-gilroy text-xs font-extrabold uppercase tracking-[0.2em] text-white">
                  {section.title}
                </h3>
                <ul className="mt-4 space-y-3">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        target={link.href.startsWith("http") ? "_blank" : undefined}
                        rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                        className="font-rubik text-sm text-white/70 transition-colors hover:text-white hover:underline hover:underline-offset-4"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Contact form */}
          <form className="w-full lg:max-w-sm">
            <h3 className="font-rubik text-lg font-extrabold text-white">
              Send us a message
            </h3>
            <p className="mt-1 font-rubik text-sm text-white/60">
              Tell us what you want to learn.
            </p>
            <div className="mt-4 flex flex-col gap-3">
              <div className="flex gap-3">
                <input
                  id="footer-name"
                  name="name"
                  type="text"
                  required
                  placeholder="Your name"
                  className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 font-rubik text-sm text-white outline-none transition-colors"
                />
                <input
                  id="footer-email"
                  name="email"
                  type="email"
                  required
                  placeholder="Your email"
                  className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 font-rubik text-sm placeholder:text-white/40 outline-none transition-colors"
                />
              </div>
              <input
                id="footer-subject"
                name="subject"
                type="text"
                required
                placeholder="Subject"
                className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 font-rubik text-sm placeholder:text-white/40 outline-none transition-colors"
              />
              <textarea
                id="footer-message"
                name="message"
                rows={3}
                required
                placeholder="Write your message..."
                className="w-full resize-none rounded-xl border border-white/20 bg-white/10 px-4 py-3 font-rubik text-sm text-white outline-none transition-colors"
              />
            </div>
            <MotionButton
              label="Send message"
              type="submit"
              fullWidth
              bgColor="rgba(255,255,255,0.1)"
              color="#ffffff"
              textColor="#fff"
              textHoverColor="#004d41"
              iconColor="#004d41"
              classes="mt-3"
              icon={<FiSend className="text-greenx transition-colors duration-500" size={18} />}
            />
          </form>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 py-2 flex flex-col gap-4 relative md:flex-row md:items-center md:justify-between md:px-10 lg:px-6">
          <hr className="border-white/40 border-[0.01px] rounded right-3 left-3 absolute top-0" />
          <p className="font-rubik text-xs text-white/40">
            © {new Date().getFullYear()} HEXEL. All rights reserved.
          </p>
          <ul className="flex items-center justify-center lg:justify-start gap-4">
            {socialLinks.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  aria-label={s.label}
                  target="_blank"
                  rel="noreferrer"
                  className="grid size-5 place-items-center text-white"
                >
                  {s.icon}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex flex-col md:flex-row items-center gap-5 md:gap-8">
            <ul className="flex gap-5">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="font-rubik text-xs text-white/80 transition-colors hover:text-white"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
