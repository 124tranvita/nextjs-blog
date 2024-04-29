// app/components/post/post-view.tsx
"use client";

import { CalendarIcon, PencilIcon, UserIcon } from "@heroicons/react/20/solid";
import { Post } from "@/common/lib/model";
import { formatDate, stripHtmlTags, truncateText } from "@/common/lib/utils";
import useDictionary from "../hooks/useDictionary";
import { Article, Content } from "./common/container";
import { ViewImage } from "./view-image";
import Typography from "./common/typography";
import PostReact from "./post-react";
import { useMemo } from "react";
import { Link } from "./custom-link";

type Props = {
  post: Post;
  isSummary?: boolean;
};

export function PostInfo({
  author,
  createdAt,
  updatedAt,
}: Pick<Post, "author" | "createdAt" | "updatedAt">) {
  return (
    <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
      <div className="mt-2 flex items-center text-sm text-gray-500">
        <UserIcon
          className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
          aria-hidden="true"
        />
        {author}
      </div>

      <div className="mt-2 flex items-center text-sm text-gray-500">
        <CalendarIcon
          className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
          aria-hidden="true"
        />
        {formatDate(createdAt)}
      </div>
      {updatedAt && (
        <div className="mt-2 flex items-center text-sm text-gray-500">
          <PencilIcon
            className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
            aria-hidden="true"
          />
          {formatDate(updatedAt)}
        </div>
      )}
    </div>
  );
}

export default function PostView({ post, isSummary = false }: Props) {
  const {
    title,
    author,
    cloudImg,
    localImg,
    createdAt,
    updatedAt,
    content,
    _id,
  } = post;

  const parsedContent = useMemo(() => {
    return isSummary ? truncateText(stripHtmlTags(content), 250) : content;
  }, [content, isSummary]);

  return (
    <Article>
      <div className="relative">
        <PostReact />
        <ViewImage
          cloudImg={cloudImg}
          localImg={localImg}
          pathname={`/post/${_id}`}
        />
      </div>
      <Link href={`/post/${_id}`}>
        <Typography text={title} type="title" />
        <PostInfo author={author} createdAt={createdAt} updatedAt={updatedAt} />
        <Content content={parsedContent} />
      </Link>
    </Article>
  );
}
