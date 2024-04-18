// @/common/components/toggle/aut-tggle.tsx

"use client";

import { useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import { logout } from "@/actions";
import useCookies from "@/common/hooks/useCookies";
import { Options } from "@/common/lib/constants";
import {
  ArrowLeftStartOnRectangleIcon,
  ArrowRightEndOnRectangleIcon,
} from "@heroicons/react/20/solid";
import useScreenPath from "@/common/hooks/useScreenPath";
import { Link } from "../custom-link";

export default function AuthToggle() {
  const { getCookie, deleteCookie } = useCookies();
  const { nextPathName } = useScreenPath();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  /** Check if is already mounted */
  useEffect(() => setMounted(true), []);

  const isSignedIn = getCookie("isSignedIn");

  const handleLogout = useCallback(async () => {
    setIsLoading(true);
    deleteCookie("isSignedIn");
    const res = await logout();

    if (res.status === "success") {
      setIsLoading(false);
    }
  }, [deleteCookie]);

  if (!mounted)
    return (
      <button className="mx-1 w-8 h-auto rounded-full p-1 duration-300"></button>
    );

  if (isLoading) {
    return (
      <div className="animate-spin  text-slate-800 dark:text-slate-50">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-arrow-clockwise"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"
          />
          <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466" />
        </svg>
      </div>
    );
  }

  if (!isSignedIn || isSignedIn === Options.No) {
    return (
      <Link href={nextPathName("/login", `&prev=${pathname}`)}>
        <button className="mx-1 w-8 h-auto rounded-full p-[5px] text-slate-800 dark:text-slate-50 hover:bg-slate-800 hover:text-slate-50 duration-300">
          <ArrowLeftStartOnRectangleIcon />
        </button>
      </Link>
    );
  }

  if (isSignedIn && isSignedIn === Options.Yes) {
    return (
      <button
        onClick={handleLogout}
        className="mx-1 w-8 h-auto rounded-full p-[5px] text-slate-800 dark:text-slate-50 hover:bg-slate-800 hover:text-slate-50 duration-300"
      >
        <ArrowRightEndOnRectangleIcon />
      </button>
    );
  }
}
