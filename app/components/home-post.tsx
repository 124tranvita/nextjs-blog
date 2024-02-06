"use client";

import { FC } from "react";
import Link from "next/link";
import { Post } from "@/app/lib/model";
import { truncateText } from "@/app/lib/utils";
import PostHeader from "@/components/post/post-header";
import PostContent from "@/components/post/post-content";
import PostReact from "@/components/post/post-react";

type Props = {
  post: Post;
};

const HomePost: FC<Props> = ({ post }) => {
  const { title, content, cover, createdAt, _id, author, updatedAt } = post;
  return (
    <section className="relative mb-12">
      <PostReact />
      <PostHeader
        _id={_id}
        title={title}
        cover={cover}
        createdAt={createdAt}
        updatedAt={updatedAt}
        author={author || "Author"}
      />
      <PostContent content={truncateText(content, 250)} />
      <Link href={`/post/${_id}`}>
        <p className="font-normal text-center text-gray-500 dark:text-gray-400 underline underline-offset-2">
          Read more
        </p>
      </Link>
      <hr className="w-48 mx-auto my-4 bg-gray-500 border-0 rounded md:my-10 dark:bg-gray-700" />
    </section>
  );
};

export default HomePost;
