// hooks/useScreenPath.tsx
"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import useDictionary from "./useDictionary";

export default function useScreenPath() {
  const router = useRouter();
  const { lang } = useDictionary();

  const next = useCallback(
    (path: string) => {
      router.push(`${path}?lang=${lang}`);
    },
    [router, lang]
  );

  const back = useCallback(() => {
    router.back();
  }, [router]);

  const nextPathName = useCallback(
    (pathName: string, quertOpts?: string) => {
      if (quertOpts) {
        return `${pathName}?lang=${lang}${quertOpts}`;
      }

      return `${pathName}?lang=${lang}`;
    },
    [lang]
  );

  return { next, back, nextPathName };
}
