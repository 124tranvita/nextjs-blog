"use client";

import { useState, useEffect, useMemo } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import useDictionary from "@/app/hooks/useDictionary";

export default function LanguageToggle() {
  const pathname = usePathname();
  const { lang } = useDictionary();
  const [mounted, setMounted] = useState(false);

  // Check if is already mounted
  useEffect(() => setMounted(true), []);

  if (!mounted)
    return (
      <button className="mx-1 w-8 h-auto rounded-full p-1 duration-300"></button>
    );

  if (lang === "vi") {
    return (
      <Link href={pathname.replace(/^.{3}/g, "/en")}>
        <button className="mx-1 w-8 h-auto rounded-full p-1 text-slate-800 dark:text-slate-50 hover:bg-slate-800 hover:text-slate-50 duration-300">
          <span>Vi</span>
        </button>
      </Link>
    );
  }

  if (lang === "en") {
    return (
      <Link href={pathname.replace(/^.{3}/g, "/vi")}>
        <button className="mx-1 w-8 h-auto rounded-full p-1 text-slate-800 dark:text-slate-50 hover:bg-slate-800 hover:text-slate-50 duration-300">
          <span>En</span>
        </button>
      </Link>
    );
  }
}

// https://dirask.com/posts/JavaScript-replace-first-3-characters-in-string-pBB29p
