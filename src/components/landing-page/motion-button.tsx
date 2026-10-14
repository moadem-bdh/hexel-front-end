"use client";

import { CSSProperties, FC } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  label: string;
  bgColor?: string;
  color?: string;
  textColor?: string;
  textHoverColor?: string;
  iconColor?: string;
  classes?: string;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  fullWidth?: boolean;
  icon?: React.ReactNode;
}

const MotionButton: FC<Props> = ({
  label,
  bgColor = "#ffffff",
  color,
  textColor,
  textHoverColor = "#ffffff",
  iconColor = "#ffffff",
  classes,
  href,
  onClick,
  type = "button",
  fullWidth = false,
  icon,
}) => {
  const accent = color ?? "var(--color-greenx, #004d41)";
  const labelColor = textColor ?? accent;

  const cssVars = {
    "--mb-accent": accent,
    "--mb-bg": bgColor,
    "--mb-label": labelColor,
    "--mb-label-hover": textHoverColor,
  } as CSSProperties;

  const inner = (
    <span
      style={cssVars}
      className={cn(
        "group relative inline-flex h-14 cursor-pointer items-center rounded-full p-1 border shadow-sm outline-none",
        fullWidth ? "w-full" : "w-52",
        "bg-(--mb-bg) border-(--mb-accent)",
        classes,
      )}
    >
      {/* sliding fill circle with icon */}
      <span
        className="relative block h-11 w-11 shrink-0 overflow-hidden rounded-full duration-500 group-hover:w-full bg-(--mb-accent)"
        aria-hidden="true"
      >
        <span className="absolute top-1/2 -translate-y-1/2 right-1/2 translate-x-1/2 duration-500 group-hover:translate-x-0 group-hover:right-3">
          {icon || <ArrowRight className="size-5" style={{ color: iconColor }} />}
        </span>
      </span>
      {/* label — CSS custom properties let group-hover work with arbitrary colors */}
      <span className="pointer-events-none absolute left-1/2 top-1/2 ml-3 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-rubik text-base font-semibold tracking-tight duration-500 text-(--mb-label) group-hover:text-(--mb-label-hover)">
        {label}
      </span>
    </span>
  );

  if (href) {
    return <a href={href} className={cn("inline-flex", fullWidth && "w-full")}>{inner}</a>;
  }

  return (
    <button type={type} onClick={onClick} className={cn("inline-flex", fullWidth && "w-full")}>
      {inner}
    </button>
  );
};

export default MotionButton;
