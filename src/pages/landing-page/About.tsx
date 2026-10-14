"use client";

import { ContainerScroll } from "@/components/landing-page/container-scroll-animation";
import Image from "next/image";

const LOGO = "/assets/icons/logo-color.svg";

const aboutImages = [
  "/assets/images/about-test-1.png",
  "/assets/images/about-test-2.png",
  "/assets/images/about-test-3.png",
  "/assets/images/hero-image.png",
  "/assets/images/about-test-3.png",
  "/assets/images/about-test-1.png",
];

const socialLinks = [
  {
    href: "https://instagram.com",
    label: "Instagram",
    icon: "/assets/icons/instagram.svg",
  },
  {
    href: "https://linkedin.com",
    label: "LinkedIn",
    icon: "/assets/icons/linkedin.svg",
  },
  { href: "https://x.com", label: "X", icon: "/assets/icons/x.svg" },
  {
    href: "mailto:hello@hexel.com",
    label: "Email HEXEL",
    icon: "/assets/icons/facebook.svg",
  },
];

export default function About() {
  return (
    <section
      id="about"
      className="relative z-10 w-full overflow-hidden  px-6 py-10 md:px-10 lg:px-20"
    >

      <div className="relative z-10 flex flex-col items-center gap-10 lg:flex-row lg:justify-between lg:gap-16">
        <div className="w-full max-w-2xl lg:max-w-200">
          <ContainerScroll titleComponent={null}>
            <div className="grid h-full w-full grid-cols-2 grid-rows-3 gap-2 p-2 md:grid-cols-3 md:grid-rows-2 md:gap-3 md:p-3">
              {aboutImages.map((src, index) => (
                <div
                  key={`${src}-${index}`}
                  className="relative overflow-hidden rounded-xl border-2 border-black"
                >
                  <Image
                    src={src}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 320px, 50vw"
                    className="object-cover"
                    draggable={false}
                  />
                </div>
              ))}
            </div>
          </ContainerScroll>
        </div>

        <div className="flex flex-col justify-center lg:-mt-20">
          <p className="font-gilroy text-4xl font-extrabold uppercase tracking-[0.16em] text-greenx md:text-6xl">
            About HEXEL
          </p>
          <h2 className="mt-4 font-rubik text-2xl font-extrabold leading-[0.95] text-black md:text-4xl">
            Learning should open doors.
          </h2>
          <h3 className="mt-5 font-rubik text-lg font-extrabold text-black md:text-xl">
            Learn by building.
          </h3>
          <p className="mt-2 font-rubik text-base leading-7 text-black/75 md:text-lg">
            HEXEL helps curious people turn modern skills into real momentum.
            Our practical programs combine clear guidance, hands-on projects,
            and focused feedback so every lesson becomes something useful you
            can see, test, and share.
          </p>

          <h3 className="mt-6 font-rubik text-lg font-extrabold text-black md:text-xl">
            Grow with momentum.
          </h3>
          <p className="mt-2 font-rubik text-base leading-7 text-black/75 md:text-lg">
            Whether you are starting fresh or sharpening your next advantage, we
            meet you where you are and help you build what comes next. You leave
            with stronger skills, a clearer direction, and work that proves how
            far you have come.
          </p>

          <div
            className="mt-5 flex items-center gap-2"
            aria-label="HEXEL social media links"
          >
            <hr className="mr-2 h-1 w-full rounded-full border-0 bg-black" />
            {socialLinks.map(({ href, label, icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noreferrer" : undefined}
                aria-label={label}
                title={label}
                className="group flex min-h-12 min-w-12 items-center justify-center rounded-full border-[3px] border-black text-black transition-all hover:border-black hover:bg-black"
              >
                <Image
                  src={icon}
                  alt={label}
                  width={22}
                  height={22}
                  className="h-5.5 w-5.5 object-contain transition-all group-hover:brightness-0 group-hover:invert"
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
