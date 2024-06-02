"use client";

import { useRef, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import useLoader from "@/app/common/hooks/useLoader";

export function NavigationEvents() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { hideLoader } = useLoader();

  const ref = useRef<string>(pathname);

  /** Hide loader when pathname already changed */
  useEffect(() => {
    const url = `${pathname}?${searchParams}`;

    if (url !== ref.current) {
      hideLoader();
    }

    ref.current = url;
  }, [hideLoader, pathname, searchParams]);

  return null;
}
