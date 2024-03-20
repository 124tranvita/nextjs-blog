// app/hooks/useDictionary.tsx
"use client";

import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Locale, i18n } from "@/i18n";
import { getDictionary } from "../dictionaries";
import { getPathValue, hasPath } from "./_lib/utils";

export default function useDictionary() {
  const params = useParams();
  const lang = params.lang as Locale;

  const [dict, setDict] = useState<Awaited<ReturnType<typeof getDictionary>>>();

  useEffect(() => {
    const getDict = async (lang: Locale) => {
      const dict = await getDictionary(lang);
      setDict(dict);
    };

    getDict(lang ? lang : i18n.defaultLocale);
  }, [lang]);

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
