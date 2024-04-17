// @common/components/post-preview.tsx
"use client";

import { useEffect } from "react";
import { PostPreview } from "@/common/lib/model";
import { ViewImage } from "./view-image";
import Typography from "./common/typography";
import { Article, Content } from "./common/container";

type Props = {
  previewData: PostPreview;
  onPreview: () => void;
};

export default function PostPreview({ previewData, onPreview }: Props) {
  useEffect(() => {
    onPreview();
  }, [onPreview]);

  console.log({ previewData });

  return (
    <Article>
      <ViewImage src={previewData.cover} />
      <Typography text={previewData.title} type="title" />
      <Content content={previewData.content} />
    </Article>
  );
}
