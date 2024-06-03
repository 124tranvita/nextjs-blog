// @/common/components/post-view/container.tsx
"use client";

import noImagePlaceholder from "@/public/no-image-placeholder.webp";

import { FC, useMemo } from "react";
import { Post } from "@/app/common/lib/model";
import { truncateText, stripHtmlTags } from "@/app/common/lib/utils";
import { Article, Content, PostHeaderWrapper } from "../common/container";
import { PostInfo } from "./post-info";

type Props = {
  post: Post;
  view: "home" | "detail" | "preview";
  articleSize?: "small" | "medium" | "full";
};

export const PostDetailView: FC<Props> = ({ post, view, articleSize }) => {
  const {
    _id,
    title,
    author,
    content,
    createdAt,
    updatedAt,
    cloudImg,
    localImg,
  } = post;

  const postContent = useMemo(() => {
    return view === "detail"
      ? content
      : truncateText(stripHtmlTags(content), 250);
  }, [content, view]);

  /** Get image's src from post's data */
  const imgSrc = useMemo(() => {
    if (view === "preview") return cloudImg || localImg;

    if (localImg) {
      return process.env.NEXT_PUBLIC_GOOGLE_IMG_URL
        ? process.env.NEXT_PUBLIC_GOOGLE_IMG_URL.replace("<IMAGEURL>", localImg)
        : "";
    }

    if (cloudImg) {
      return cloudImg;
    }

    return noImagePlaceholder;
  }, [cloudImg, localImg, view]);

  return (
    <Article width={articleSize}>
      <PostHeaderWrapper
        view={view}
        title={title}
        imgSrc={imgSrc}
        imgAlt={`${title}_image`}
        pathName={`/post/${_id}`}
        postInfo={
          <PostInfo
            author={author}
            createdAt={createdAt}
            updatedAt={updatedAt}
          />
        }
      />
      <Content content={postContent} width="half" />
    </Article>
  );
};
