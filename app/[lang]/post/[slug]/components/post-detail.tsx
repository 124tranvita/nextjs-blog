"use client";

import dynamic from "next/dynamic";
import { PencilIcon, TrashIcon } from "@heroicons/react/20/solid";
import PostReact from "@/components/post/post-react";
import { Post } from "@/app/lib/model";
import { deletePost } from "@/app/actions";
import { FloatIconWithTooltip } from "@/app/ui/button";
import { ContentLoading, HeaderLoading } from "@/app/[lang]/loader";

const PostHeader = dynamic(() => import("@/components/post/post-header"), {
  loading: () => <HeaderLoading />,
  ssr: false,
});

const PostContent = dynamic(() => import("@/components/post/post-content"), {
  loading: () => <ContentLoading />,
  ssr: false,
});

type Props = {
  post: Post;
};

export default function PostDetail({ post }: Props) {
  const { title, content, coverImgFileId, createdAt, updatedAt, _id, author } =
    post;

  return (
    <section className="relative mb-12">
      <PostReact />
      <PostHeader
        _id={_id}
        title={title}
        coverImgFileId={coverImgFileId}
        createdAt={createdAt}
        updatedAt={updatedAt}
        author={author || "Author"}
      />
      <PostContent content={content} />
    </section>
  );
}
