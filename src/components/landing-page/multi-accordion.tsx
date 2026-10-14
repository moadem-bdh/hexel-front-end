"use client";
import React, { ReactNode, isValidElement, useId } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiPlus } from "react-icons/fi";
import { cn } from "@/lib/utils";

type AccordionContextType = {
  isActive: boolean;
  value: string;
  panelId: string;
  onChangeIndex: (value: string) => void;
};

const AccordionContext = React.createContext<AccordionContextType>({
  isActive: false,
  value: "",
  panelId: "",
  onChangeIndex: () => {},
});

const useAccordion = () => React.useContext(AccordionContext);

export function AccordionWrapper({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn("flex flex-col gap-3", className)}>{children}</div>;
}

export function Accordion({
  children,
  multiple,
  defaultValue,
}: {
  children: ReactNode;
  multiple?: boolean;
  defaultValue?: string | string[];
}) {
  const baseId = useId();
  const initial = defaultValue
    ? Array.isArray(defaultValue)
      ? multiple
        ? defaultValue
        : [defaultValue[0]]
      : [defaultValue]
    : [];

  const [activeIndex, setActiveIndex] = React.useState<string[]>(initial);

  function onChangeIndex(value: string) {
    setActiveIndex((current) => {
      if (!multiple) return value === current[0] ? [] : [value];
      return current.includes(value)
        ? current.filter((i) => i !== value)
        : [...current, value];
    });
  }

  return (
    <>
      {React.Children.map(children, (child, i) => {
        if (!isValidElement<{ value?: string }>(child)) return null;
        const value = child.props.value ?? "";
        const isActive = multiple
          ? activeIndex.includes(value)
          : activeIndex[0] === value;

        return (
          <AccordionContext.Provider
            value={{
              isActive,
              value,
              panelId: `${baseId}-${i}`,
              onChangeIndex,
            }}
          >
            {child}
          </AccordionContext.Provider>
        );
      })}
    </>
  );
}

export function AccordionItem({
  children,
  value,
  className,
}: {
  children: ReactNode;
  value: string;
  className?: string;
}) {
  const { isActive } = useAccordion();
  return (
    <div
      data-active={isActive || undefined}
      data-value={value}
      className={cn(
        "overflow-hidden rounded-2xl border-2 border-zinc-700 bg-white transition-all duration-300 cursor-pointer",
        isActive
          ? "bg-greenx/4 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.15)]"
          : "hover:border-zinc-900",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function AccordionHeader({
  children,
  index,
  customIcon,
  className,
}: {
  children: ReactNode;
  index?: number;
  customIcon?: boolean;
  className?: string;
}) {
  const { isActive, value, panelId, onChangeIndex } = useAccordion();

  return (
    <button
      type="button"
      aria-expanded={isActive}
      aria-controls={panelId}
      onClick={() => onChangeIndex(value)}
      className={cn(
        "group flex w-full cursor-pointer items-center gap-4 px-5 py-5 text-left outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-greenx md:px-6",
        className,
      )}
    >
      {index !== undefined && (
        <span
          className={cn(
            "font-gilroy text-sm font-extrabold tabular-nums transition-colors",
            "text-greenx",
          )}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
      )}
      <span className="flex-1 font-rubik text-base font-medium text-black md:text-lg">
        {children}
      </span>
      {!customIcon && (
        <span
          className={cn(
            "grid size-8 shrink-0 place-items-center rounded-full transition-all duration-300",
            isActive
              ? "rotate-45 bg-greenx text-white"
              : "bg-black/5 text-black group-hover:bg-black/10",
          )}
        >
          <FiPlus size={16} />
        </span>
      )}
    </button>
  );
}

export function AccordionPanel({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const { isActive, panelId } = useAccordion();

  return (
    <AnimatePresence initial={false}>
      {isActive && (
        <motion.div
          id={panelId}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ type: "spring", duration: 0.35, bounce: 0 }}
          className="overflow-hidden"
        >
          <p
            className={cn(
              "px-5 pb-6 font-rubik text-sm leading-7 text-black/65 md:pl-15 md:pr-16 md:text-base",
              className,
            )}
          >
            {children}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
