// @common/ui/post/index.tsx
"use client";

import { Suspense } from "react";
import { PostViewLoader } from "@/app/loader";
import { Post } from "@/app/common/lib/model";
import { PostDetailView } from "@/app/common/components/post-view/container";

type Props = {
  post: Post;
};

export default function PostDetail({ post }: Props) {
  return (
    <Suspense fallback={<PostViewLoader />}>
      <PostDetailView post={post} view="detail" />
    </Suspense>
  );
}
