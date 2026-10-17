import type { Metadata } from "next";
import AuthPage from "@/views/auth/AuthPage";

export const metadata: Metadata = {
  title: "Authentication | Hexel",
  description:
    "Sign in or create an account with Hexel to access exclusive robotics, engineering, and tech training tracks.",
};

export default function Page() {
  return <AuthPage />;
}
