"use client";

import * as React from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Mail, Lock, User, Shield, Phone, AlertTriangle } from "lucide-react";

type AuthMode = "login" | "signup";

interface AuthFormProps {
  initialMode?: AuthMode;
  className?: string;
}

// ----------------------------------------------------------------------------
// ERRORS  <-- fill this in later (validation / backend)
// An empty object = no errors shown. Put a message to show it, e.g.
//   email: "Enter a valid email address"
// Later: replace this with state, e.g. const [errors, setErrors] = useState<FormErrors>({})
// ----------------------------------------------------------------------------
type FormErrors = Partial<
  Record<
    "name" | "phone" | "email" | "password" | "confirmPassword" | "agreeToTerms" | "general",
    string
  >
>;

const errors: FormErrors = {
  // general: "Wrong email or password",
  // name: "Name is required",
  // phone: "Invalid phone number",
  // email: "Enter a valid email address",
  // password: "At least 8 characters",
  // confirmPassword: "Passwords don't match",
  // agreeToTerms: "You must agree to the terms",
};

// ----------------------------------------------------------------------------
// ANIMATION
// ----------------------------------------------------------------------------
const EASE = [0.22, 1, 0.36, 1] as const;

const formVariants: Variants = {
  enter: (dir: number) => ({ x: dir * 48, opacity: 0, filter: "blur(6px)" }),
  center: {
    x: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.4,
      ease: EASE,
      staggerChildren: 0.05,
      delayChildren: 0.04,
    },
  },
  exit: (dir: number) => ({
    x: dir * -48,
    opacity: 0,
    filter: "blur(6px)",
    transition: { duration: 0.2, ease: "easeIn" },
  }),
};

const rowVariants: Variants = {
  enter: { opacity: 0, y: 12 },
  center: { opacity: 1, y: 0, transition: { duration: 0.35, ease: EASE } },
};

// Animates the container's height so the card never "jumps" (errors included).
function useMeasure() {
  const ref = React.useRef<HTMLDivElement>(null);
  const [height, setHeight] = React.useState<number | "auto">("auto");

  React.useEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(([entry]) => {
      const h = entry.contentRect.height;
      if (h > 0) setHeight(h); // ignore the empty frame between exit and enter
    });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);

  return [ref, height] as const;
}

// ----------------------------------------------------------------------------
// SMALL PIECES
// ----------------------------------------------------------------------------
const OAuthButton: React.FC<{ provider: "google" | "github" }> = ({ provider }) => {
  const configs = {
    google: {
      label: "Google",
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
        </svg>
      ),
    },
    github: {
      label: "GitHub",
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
          <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
        </svg>
      ),
    },
  };
  const { label, icon } = configs[provider];
  return (
    <button
      type="button"
      className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 border border-neutral-200 rounded-xl text-sm font-medium text-neutral-700 bg-white hover:bg-neutral-50 hover:border-neutral-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20"
    >
      {icon}
      {label}
    </button>
  );
};

const Divider: React.FC<{ label?: string }> = ({ label = "or continue with" }) => (
  <div className="flex items-center gap-3 my-1">
    <div className="flex-1 h-px bg-neutral-200" />
    <span className="text-xs text-muted-foreground whitespace-nowrap">{label}</span>
    <div className="flex-1 h-px bg-neutral-200" />
  </div>
);

const baseInput =
  "w-full py-2.5 pl-9 pr-3 bg-neutral-50 border rounded-xl text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:bg-white transition-all";

// Props for every input: red border/ring + accessibility hooks.
// aria-invalid tells screen readers the field is wrong; aria-describedby links
// the input to its error message so it's read out with the field.
const fieldProps = (name: string, error?: string) => ({
  id: name,
  "aria-invalid": !!error,
  "aria-describedby": error ? `${name}-error` : undefined,
  className: cn(
    baseInput,
    error
      ? "border-destructive focus:ring-destructive/20"
      : "border-neutral-200 focus:ring-primary/20",
  ),
});

// Inline error under a field: expands (height 0 -> auto) and fades in.
// Renders nothing when there's no message. The card's own height animation
// follows, so nothing jumps.
const ErrorText: React.FC<{ id: string; message?: string }> = ({ id, message }) => (
  <AnimatePresence initial={false}>
    {message && (
      <motion.div
        key={message}
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.2, ease: EASE }}
        className="overflow-hidden"
      >
        <p
          id={`${id}-error`}
          role="alert"
          className="text-destructive text-xs pt-1 flex items-start gap-1"
        >
          <AlertTriangle className="h-3 w-3 mt-0.5 shrink-0" />
          {message}
        </p>
      </motion.div>
    )}
  </AnimatePresence>
);

const Field: React.FC<{
  name: string;
  icon: React.ReactNode;
  error?: string;
  children: React.ReactNode;
}> = ({ name, icon, error, children }) => (
  <div>
    <div className="relative">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
        {icon}
      </div>
      {children}
    </div>
    <ErrorText id={name} message={error} />
  </div>
);

// ----------------------------------------------------------------------------
// AUTH FORM
// ----------------------------------------------------------------------------
export function AuthForm({ initialMode = "login", className }: AuthFormProps) {
  const [mode, setMode] = React.useState<AuthMode>(initialMode);
  const [direction, setDirection] = React.useState(1); // 1 = login -> signup
  const [measureRef, height] = useMeasure();

  const switchMode = (next: AuthMode) => {
    if (next === mode) return;
    setDirection(next === "signup" ? 1 : -1);
    setMode(next);
  };

  const isLogin = mode === "login";

  return (
    <div className={cn("p-5 sm:p-6", className)}>
      {/* Logo (outside AnimatePresence so it never re-animates) */}
      <div className="w-full flex justify-center items-center mb-3">
        <Image
          src="/assets/icons/logo-color.svg"
          height={500}
          width={500}
          className="h-16 w-auto"
          alt="Hexel logo"
          priority
        />
      </div>

      {/* Title */}
      <div className="mb-4 min-h-13">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={mode}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="flex flex-col items-center text-center"
          >
            <h2 className="text-2xl font-bold">
              {isLogin ? "Welcome back" : "Create your account"}
            </h2>
            <p className="text-sm text-muted-foreground mt-0.5">
              {isLogin ? "Sign in to continue to Hexel" : "Join the Hexel community today"}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Tabs (the white pill slides between Login and Sign Up) */}
      <div className="relative flex bg-neutral-100 rounded-xl p-1 mb-3">
        {(["login", "signup"] as const).map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => switchMode(tab)}
            className={cn(
              "relative flex-1 py-1.5 px-4 rounded-lg text-sm font-medium transition-colors",
              mode === tab ? "text-neutral-900" : "text-neutral-500 hover:text-neutral-700",
            )}
          >
            {mode === tab && (
              <motion.span
                layoutId="auth-tab-pill"
                className="absolute inset-0 rounded-lg bg-white shadow-sm"
                transition={{ type: "spring", stiffness: 500, damping: 36 }}
              />
            )}
            <span className="relative z-10">{tab === "login" ? "Login" : "Sign Up"}</span>
          </button>
        ))}
      </div>

      {/* OAuth */}
      <div className="flex gap-2 mb-3">
        <OAuthButton provider="google" />
        <OAuthButton provider="github" />
      </div>

      <Divider />

      {/* Form area: height animates, content slides */}
      <motion.div
        className="overflow-hidden -mx-1 px-1 -my-1 py-1 mt-2"
        initial={false}
        // +8 = the wrapper's py-1 (4px top + 4px bottom). Tailwind uses border-box,
        // so without it the content area is 8px short and the button gets clipped.
        animate={{ height: typeof height === "number" ? height + 8 : height }}
        transition={{ duration: 0.25, ease: EASE }}
      >
        <div ref={measureRef}>
          <AnimatePresence mode="wait" initial={false} custom={direction}>
            <motion.form
              key={mode}
              custom={direction}
              variants={formVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="space-y-3"
              // TODO (backend): add action / onSubmit
            >
              {/* General error banner (e.g. "Wrong email or password") */}
              <AnimatePresence initial={false}>
                {errors.general && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2, ease: EASE }}
                    className="overflow-hidden"
                  >
                    <div
                      role="alert"
                      className="p-2.5 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-xs text-red-700"
                    >
                      <AlertTriangle className="h-3.5 w-3.5 text-red-500 shrink-0" />
                      {errors.general}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {isLogin ? (
                <>
                  <motion.div variants={rowVariants}>
                    <Field name="email" icon={<Mail className="h-4 w-4" />} error={errors.email}>
                      <input
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder="Email address"
                        {...fieldProps("email", errors.email)}
                      />
                    </Field>
                  </motion.div>

                  <motion.div variants={rowVariants}>
                    <Field name="password" icon={<Lock className="h-4 w-4" />} error={errors.password}>
                      <input
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        placeholder="Password"
                        {...fieldProps("password", errors.password)}
                      />
                    </Field>
                  </motion.div>

                  <motion.div variants={rowVariants} className="flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        name="remember"
                        type="checkbox"
                        className="w-4 h-4 rounded accent-primary"
                      />
                      <span className="text-xs text-muted-foreground">Remember me</span>
                    </label>
                    <button
                      type="button"
                      className="text-xs text-primary hover:text-primary/80 transition-colors"
                    >
                      Forgot password?
                    </button>
                  </motion.div>
                </>
              ) : (
                <>
                  <motion.div variants={rowVariants} className="grid grid-cols-2 gap-3">
                    <Field name="name" icon={<User className="h-4 w-4" />} error={errors.name}>
                      <input
                        name="name"
                        type="text"
                        autoComplete="name"
                        placeholder="Full name"
                        {...fieldProps("name", errors.name)}
                      />
                    </Field>
                    <Field name="phone" icon={<Phone className="h-4 w-4" />} error={errors.phone}>
                      <input
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        placeholder="Phone (optional)"
                        {...fieldProps("phone", errors.phone)}
                      />
                    </Field>
                  </motion.div>

                  <motion.div variants={rowVariants}>
                    <Field name="email" icon={<Mail className="h-4 w-4" />} error={errors.email}>
                      <input
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder="Email address"
                        {...fieldProps("email", errors.email)}
                      />
                    </Field>
                  </motion.div>

                  <motion.div variants={rowVariants} className="grid grid-cols-2 gap-3">
                    <Field name="password" icon={<Lock className="h-4 w-4" />} error={errors.password}>
                      <input
                        name="password"
                        type="password"
                        autoComplete="new-password"
                        placeholder="Password"
                        {...fieldProps("password", errors.password)}
                      />
                    </Field>
                    <Field name="confirmPassword" icon={<Shield className="h-4 w-4" />} error={errors.confirmPassword}>
                      <input
                        name="confirmPassword"
                        type="password"
                        autoComplete="new-password"
                        placeholder="Confirm password"
                        {...fieldProps("confirmPassword", errors.confirmPassword)}
                      />
                    </Field>
                  </motion.div>

                  <motion.div variants={rowVariants}>
                    <label className="flex items-start gap-2 cursor-pointer">
                      <input
                        name="agreeToTerms"
                        id="agreeToTerms"
                        type="checkbox"
                        aria-invalid={!!errors.agreeToTerms}
                        aria-describedby={errors.agreeToTerms ? "agreeToTerms-error" : undefined}
                        className="w-4 h-4 mt-0.5 rounded accent-primary shrink-0"
                      />
                      <span className="text-xs text-muted-foreground leading-relaxed">
                        I agree to the{" "}
                        <a href="#" className="text-primary hover:underline">
                          Terms of Service
                        </a>{" "}
                        and{" "}
                        <a href="#" className="text-primary hover:underline">
                          Privacy Policy
                        </a>
                      </span>
                    </label>
                    <ErrorText id="agreeToTerms" message={errors.agreeToTerms} />
                  </motion.div>
                </>
              )}

              <motion.div variants={rowVariants}>
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground font-semibold py-2.5 px-6 rounded-xl hover:opacity-90 active:scale-[0.99] transition-all text-sm"
                >
                  {isLogin ? "Sign In" : "Create Account"}
                </button>
              </motion.div>
            </motion.form>
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Footer toggle */}
      <p className="text-center text-xs text-muted-foreground mt-3">
        {isLogin ? "Don't have an account? " : "Already have an account? "}
        <button
          type="button"
          onClick={() => switchMode(isLogin ? "signup" : "login")}
          className="text-primary hover:text-primary/80 font-medium transition-colors"
        >
          {isLogin ? "Sign up" : "Sign in"}
        </button>
      </p>
    </div>
  );
}