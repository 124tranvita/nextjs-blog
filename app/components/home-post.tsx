"use client";

import { FC } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import PostReact from "@/components/post/post-react";
import { Post } from "@/app/lib/model";
import { ContentLoading, HeaderLoading } from "../loader";

const PostHeader = dynamic(() => import("@/components/post/post-header"), {
  loading: () => <HeaderLoading />,
  ssr: false,
});

const PostSummary = dynamic(() => import("@/components/post/post-summary"), {
  loading: () => <ContentLoading />,
  ssr: false,
});

type Props = {
  post: Post;
};

const HomePost: FC<Props> = ({ post }) => {
  const { title, content, coverImgFileId, createdAt, _id, author, updatedAt } =
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
      <PostSummary id={_id} content={content} />
    </section>
  );
};

export default HomePost;
