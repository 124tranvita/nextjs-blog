"use client";

import Image from "next/image";
import { createMarkup } from "@/app/lib/utils";
import { useEffect } from "react";
import { Post } from "../model";
import noImage from "../../../public/image_not_available.png";
import PostContent from "./post-content";

type Props = {
  previewData: Pick<Post, "title" | "cover" | "content">;
  onPreview: () => void;
};

export default function PostPreview({ previewData, onPreview }: Props) {
  useEffect(() => {
    onPreview();
  }, [onPreview]);
  console.log({ previewData });
  return (
    <section className="w-full mb-8">
      <div className="relative max-w-full mb-8 rounded-t-md overflow-hidden h-512">
        <Image
          src={previewData.cover ? previewData.cover : noImage}
          alt={`${previewData.title}_image`}
          fill={true}
          sizes="100vw"
          style={{ objectFit: "cover" }}
        />
      </div>

      <div className="lg:flex lg:items-center lg:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-4xl font-bold mb-3 sm:leading-7 md:leading-9 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            {previewData.title || "Untitle"}
          </h2>
        </div>
      </div>
      <PostContent content={previewData.content} />
    </section>
  );
}
