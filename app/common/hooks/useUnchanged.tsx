// hooks/useUnchanged.tsx
"use client";

import { useCallback, useRef } from "react";

export default function useUnchanged() {
  const ref = useRef<string>("");

  const isUnChanged = useCallback((value: string) => {
    let isChanged = false;
    if (!ref.current) {
      isChanged = false;
    } else {
      isChanged = Boolean(ref.current === value);
    }

    ref.current = value;
    return isChanged;
  }, []);

  const setInitUnChangeValue = useCallback(() => {
    ref.current = "";
  }, []);

  return { isUnChanged, setInitUnChangeValue };
}
