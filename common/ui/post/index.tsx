// @common/ui/post.post.tsx
"use client";

import { Suspense } from "react";
import { Post } from "@/common/lib/model";
import { PostViewLoader } from "@/app/loader";
import PostView from "../../components/post-view";

type Props = {
  post: Post;
};

export default function PostDetail({ post }: Props) {
  return (
    <Suspense fallback={<PostViewLoader />}>
      <PostView post={post} />
    </Suspense>
  );
}
