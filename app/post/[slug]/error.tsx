"use client"; // Error components must be Client Components

import useDictionary from "@/app/common/hooks/useDictionary";
import useToastMsg from "@/app/common/hooks/useToastMsg";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { d } = useDictionary();
  const { showToast } = useToastMsg();

  useEffect(() => {
    // Log the error to an error reporting service
    showToast("error", d("errorCode.ERROR500"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, d]);

  return <></>;
}
