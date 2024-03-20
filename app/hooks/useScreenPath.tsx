// app/hooks/useScreenPath.tsx
"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import useDictionary from "./useDictionary";

export default function useScreenPath() {
  const router = useRouter();
  const { lang } = useDictionary();

  const next = useCallback(
    (path: string) => {
      router.push(`/${lang}${path}`);
    },
    [lang, router]
  );

  return { next };
}
