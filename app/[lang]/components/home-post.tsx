// app/[lang]/components/home-post.tsx
"use client";

import { FC, useState } from "react";
import dynamic from "next/dynamic";
import PostReact from "@/components/post/post-react";
import { Article } from "@/components/common";
import { Post } from "@/app/lib/model";
import { ContentLoading, HeaderLoading } from "@/app/[lang]/loader";

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

  const [isMoveNext, setIsMoveNext] = useState(false);

  return (
    <>
      <Article isMoveNext={isMoveNext}>
        <PostReact />
        <PostHeader
          _id={_id}
          title={title}
          coverImgFileId={coverImgFileId}
          createdAt={createdAt}
          updatedAt={updatedAt}
          author={author || "Anonymous"}
          onClick={() => setIsMoveNext(true)}
        />
        <PostSummary
          id={_id}
          content={content}
          onClick={() => setIsMoveNext(true)}
        />
      </Article>
    </>
  );
};

export default HomePost;
