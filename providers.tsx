"use client";

import { ReactNode } from "react";
import { ThemeProvider } from "next-themes";
import { ToastMsgProvider } from "@/app/common/context/toast-msg-context";
import { LoaderProvider } from "@/app/common/context/loader-context";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <ToastMsgProvider>
        <LoaderProvider>{children}</LoaderProvider>
      </ToastMsgProvider>
    </ThemeProvider>
  );
}
