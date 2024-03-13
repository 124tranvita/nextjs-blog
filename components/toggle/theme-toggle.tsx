"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "@heroicons/react/20/solid";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  // Check if is already mounted
  useEffect(() => setMounted(true), []);

  if (!mounted)
    return (
      <button className="mx-1 w-8 h-auto rounded-full p-1 duration-300"></button>
    );

  if (resolvedTheme === "dark") {
    return (
      <div>
        <button
          className="mx-1 w-8 h-auto rounded-full p-1  text-slate-50 hover:bg-slate-800 hover:text-slate-50 duration-300"
          onClick={() => setTheme("light")}
        >
          <SunIcon />
        </button>
      </div>
    );
  }

  if (resolvedTheme === "light") {
    return (
      <div>
        <button
          className="mx-1 w-8 h-auto rounded-full p-1  text-slate-800 hover:bg-slate-200 hover:text-slate-800 duration-300"
          onClick={() => setTheme("dark")}
        >
          <MoonIcon />
        </button>
      </div>
    );
  }
}
