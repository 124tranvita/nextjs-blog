"use client";

import { useState, useEffect, useMemo } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import useDictionary from "@/hooks/useDictionary";

export default function LanguageToggle() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams.get("q");
  const { lang } = useDictionary();
  const [mounted, setMounted] = useState(false);

  const standardizedPathname = useMemo(() => {
    // Regex: string not contain `search` word
    const reg = /^((?!search).)*$/gm;

    // If not a `search` url, return original pathname
    if (reg.test(pathname)) {
      return pathname;
    }

    // Add search params to the `search` pathname
    return `${pathname}?q=${search}`;
  }, [pathname, search]);

  /** Check if is already mounted */
  useEffect(() => setMounted(true), []);

  if (!mounted)
    return (
      <button className="mx-1 w-8 h-auto rounded-full p-1 duration-300"></button>
    );

  if (lang === "vi") {
    return (
      <Link href={standardizedPathname.replace(/^.{3}/g, "/en")}>
        <button className="mx-1 w-8 h-auto rounded-full p-1 text-slate-800 dark:text-slate-50 hover:bg-slate-800 hover:text-slate-50 duration-300">
          <span className="font-semibold">Vi</span>
        </button>
      </Link>
    );
  }

  if (lang === "en") {
    return (
      <Link href={standardizedPathname.replace(/^.{3}/g, "/vi")}>
        <button className="mx-1 w-8 h-auto rounded-full p-1 text-slate-800 dark:text-slate-50 hover:bg-slate-800 hover:text-slate-50 duration-300">
          <span className="font-semibold">En</span>
        </button>
      </Link>
    );
  }
}

// https://dirask.com/posts/JavaScript-replace-first-3-characters-in-string-pBB29p
