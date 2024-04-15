// /app/hook/useCookies.tsx

"use client";
import { useCallback, useEffect, useState } from "react";
import { cookieParse, cookieSerialize, isObjectEmpty } from "./_lib/utils";
import { cookieOptions } from "./_lib/types";

export default function useCookies() {
  const [value, setValue] = useState("");
  const [mounted, setMounted] = useState(false);

  /** Check if is already mounted */
  useEffect(() => setMounted(true), []);

  const getCookie = useCallback(
    (name: string): string => {
      if (!mounted) return "";

      // Convert cookies into array
      const documentCookies = document.cookie
        ? document.cookie.split("; ")
        : [];

      // Parse into object
      const cookies = cookieParse(documentCookies);

      // Get cookie value base on given name
      if (!isObjectEmpty(cookies)) {
        return cookies[name];
      }

      // Return empty if not have any
      return "";
    },
    [mounted]
  );

  const setCookie = useCallback(
    (key: string, value: string, options: cookieOptions) => {
      if (!mounted) return "";

      // Get cookie string
      const cookieString = cookieSerialize(key, value, options);

      console.log({ cookieString });

      // Set cookie
      document.cookie = cookieString;
    },
    [mounted]
  );

  const deleteCookie = useCallback(
    (name: string) => {
      if (!mounted) return "";

      // Set cookie immediately expired
      setCookie(name, "", {
        maxAge: -1,
      });
    },
    [mounted, setCookie]
  );

  return { value, getCookie, setCookie, deleteCookie };
}
/**
 * Ref:
 * https://javascript.info/cookie
 */
