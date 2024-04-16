// hooks/useDictionary.tsx
"use client";

import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Locale, i18n } from "@/i18n";
import { getDictionary } from "@/app/dictionaries";
import { getPathValue, hasPath } from "./_lib/utils";
import useCookies from "./useCookies";

export default function useDictionary() {
  const searchParams = useSearchParams();
  const lang = searchParams.get("lang") as Locale;
  const { setCookie } = useCookies();

  const [dict, setDict] = useState<Awaited<ReturnType<typeof getDictionary>>>();

  useEffect(() => {
    const getDict = async (lang: Locale) => {
      const dict = await getDictionary(lang);
      setDict(dict);

      // set lang to cookie
      setCookie("lang", lang, { path: "/" });
    };

    getDict(lang ? lang : i18n.defaultLocale);
  }, [lang, setCookie]);

  const d = useCallback(
    (key: string) => {
      if (!key) return "";

      const keyArr = key.split(".");

      if (dict) {
        const isPathValid = hasPath(dict, keyArr);

        if (isPathValid) {
          return getPathValue(dict, keyArr);
        }
      }

      return "";
    },
    [dict]
  );

  return { d, lang };
}
