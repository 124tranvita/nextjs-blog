// app/components/custom-link.tsx
//https://github.com/vercel/next.js/discussions/41934#discussioncomment-8996669
"use client";

import useDictionary from "@/common/hooks/useDictionary";
import useLoader from "@/common/hooks/useLoader";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useTransition } from "react";

export function Link({
  href,
  children,
  replace,
  ...rest
}: Parameters<typeof NextLink>[0]) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const { showLoader, hideLoader } = useLoader();
  const { d } = useDictionary();

  useEffect(() => {
    if (isPending) {
      showLoader(d("loader.processing"));
    } else {
      hideLoader();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPending, d]);

  return (
    <NextLink
      href={href}
      onClick={(e) => {
        e.preventDefault();
        startTransition(() => {
          const url = href.toString();
          if (replace) {
            router.replace(url);
          } else {
            router.push(url);
          }
        });
      }}
      {...rest}
    >
      {children}
    </NextLink>
  );
}
