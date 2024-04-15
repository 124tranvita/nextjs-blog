"use client";
import { useMemo } from "react";
import Link from "next/link";
import { createMarkup, truncateText } from "@/app/lib/utils";
import useDictionary from "@/hooks/useDictionary";
import { joditPlaintextConverter } from "../jodit-editor";

type Props = {
  id: string;
  content: string;
  onClick?: () => void;
};

export default function PostSummary({ id, content, onClick }: Props) {
  const { d, lang } = useDictionary();

  const plaintext = useMemo(() => {
    const clearHtmlTags = joditPlaintextConverter(content);
    return truncateText(joditPlaintextConverter(clearHtmlTags), 250);
  }, [content]);

  return (
    <>
      <section>
        <div className="block antialiased font-sans text-base leading-relaxed font-normal mb-4">
          <article
            className="max-w-full m-0 mx-auto prose prose-slate lg:prose-lg dark:prose-invert"
            dangerouslySetInnerHTML={createMarkup(plaintext)}
          />
        </div>
        <Link href={`/${lang}/post/${id}`} onClick={onClick}>
          <p className="font-normal text-center text-gray-500 dark:text-gray-400 underline underline-offset-2">
            {d("readMore")}
          </p>
        </Link>
        <hr className="w-48 mx-auto my-4 bg-gray-500 border-0 rounded md:my-10 dark:bg-gray-700" />
      </section>
    </>
  );
}
