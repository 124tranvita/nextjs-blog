// @common/ui/post.post.tsx
"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";
import { PostViewLoader } from "@/app/loader";
import { Post } from "@/common/lib/model";

type Props = {
  post: Post;
};

const PostView = dynamic(() => import("@/common/components/post-view"), {
  loading: () => <PostViewLoader />,
  ssr: false,
});

export default function PostDetail({ post }: Props) {
  return (
    <Suspense fallback={null}>
      <PostView post={post} />
    </Suspense>
  );
}
