"use client";

import { ReactNode } from "react";
import { ThemeProvider } from "next-themes";
import { LoaderProvider } from "@/common/context/loader-context";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <LoaderProvider>{children}</LoaderProvider>
    </ThemeProvider>
  );
}
