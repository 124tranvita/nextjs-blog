"use client";

import { FC } from "react";
import Link from "next/link";
import { Post } from "../lib/model";
import PostHeading from "../lib/components/post-heading";
import { createMarkup, truncateText } from "../lib/utils";

type Props = {
  post: Post;
};

const HomePost: FC<Props> = ({ post }) => {
  const { title, content, cover, createdAt, _id, author, updatedAt } = post;
  return (
    <section className="mb-12">
      <PostHeading
        _id={_id}
        title={title}
        cover={cover}
        createdAt={createdAt}
        updatedAt={updatedAt}
        author={author || "Author"}
      />
      <div className="block antialiased font-sans text-base leading-relaxed text-gray-700 font-normal mb-4">
        <article
          className="m-0 prose prose-slate mx-auto lg:prose-md max-w-full"
          dangerouslySetInnerHTML={createMarkup(truncateText(content, 250))}
        />
      </div>
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
