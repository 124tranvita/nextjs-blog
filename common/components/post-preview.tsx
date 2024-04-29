// @common/components/post-preview.tsx
"use client";

import { useEffect } from "react";
import { PostPreview } from "@/common/lib/model";
import Typography from "./common/typography";
import { Article, Content } from "./common/container";
import { ViewImage } from "./view-image";

type Props = {
  previewData: PostPreview;
  onPreview: () => void;
};

export default function PostPreview({ previewData, onPreview }: Props) {
  useEffect(() => {
    onPreview();
  }, [onPreview]);

  return (
    <Article>
      <ViewImage
        cloudImg={previewData.cloudImg}
        localImg={previewData.localImg}
      />
      <Typography text={previewData.title} type="title" />
      <Content content={previewData.content} />
    </Article>
  );
}
