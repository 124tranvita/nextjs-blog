import { useCallback, useRef } from "react";

export default function useUnchanged() {
  const ref = useRef<string>("");

  const isUnChanged = useCallback((value: string) => {
    console.log({ value, ref: ref.current });
    let isChanged = false;
    if (!ref.current) {
      isChanged = false;
    } else {
      isChanged = Boolean(ref.current === value);
    }

    ref.current = value;
    return isChanged;
  }, []);

  return { isUnChanged };
}
